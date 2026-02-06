import { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  FileCheck, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  FileText,
  Info,
  ClipboardList,
  CircleDollarSign,
  Pill,
  Loader2,
  Sparkles,
  Syringe,
  TestTube,
  Scale,
  FileWarning,
  List
} from 'lucide-react';
import { trackServiceUsage } from '@/lib/serviceTracking';

interface DosageInfo {
  form?: string;
  frequency?: string;
  typicalDose?: string;
  maxQuantityPerMonth?: number;
  requiresDiagnosisCode?: boolean;
  requiresBodyWeight?: boolean;
  requiresLabResults?: string[];
  additionalRequirements?: string[];
}

interface SearchResult {
  type: 'service' | 'drug';
  code?: string;
  nameAr: string;
  nameEn: string;
  category: string;
  estimatedCost?: number;
  mrpMin?: number;
  mrpMax?: number;
  requiresPA: boolean;
  paReason?: string;
  indication?: string;
  icd10Codes?: string[];
  alternatives?: string[];
  notes?: string;
  dosageInfo?: DosageInfo;
  matchConfidence: 'high' | 'medium' | 'low';
}

interface AISearchResponse {
  found: boolean;
  results?: SearchResult[];
  suggestions?: string[];
  error?: string;
}

const categoryLabels: Record<string, { ar: string; en: string; color: string }> = {
  imaging: { ar: 'الأشعة', en: 'Imaging', color: 'bg-info/10 text-info' },
  surgery: { ar: 'الجراحة', en: 'Surgery', color: 'bg-destructive/10 text-destructive' },
  lab: { ar: 'المختبر', en: 'Lab', color: 'bg-warning/10 text-warning' },
  therapy: { ar: 'العلاج', en: 'Therapy', color: 'bg-success/10 text-success' },
  medication: { ar: 'الأدوية', en: 'Medication', color: 'bg-primary/10 text-primary' },
  equipment: { ar: 'الأجهزة', en: 'Equipment', color: 'bg-secondary text-secondary-foreground' },
  emergency: { ar: 'الطوارئ', en: 'Emergency', color: 'bg-destructive/10 text-destructive' },
  consultation: { ar: 'الاستشارات', en: 'Consultation', color: 'bg-muted text-muted-foreground' },
  dental: { ar: 'الأسنان', en: 'Dental', color: 'bg-accent text-accent-foreground' },
  maternity: { ar: 'الأمومة', en: 'Maternity', color: 'bg-pink-100 text-pink-700' },
  biological: { ar: 'بيولوجي', en: 'Biological', color: 'bg-purple-100 text-purple-700' },
  diabetes: { ar: 'السكري', en: 'Diabetes', color: 'bg-orange-100 text-orange-700' },
  anticoagulant: { ar: 'مضاد تخثر', en: 'Anticoagulant', color: 'bg-red-100 text-red-700' },
  oncology: { ar: 'الأورام', en: 'Oncology', color: 'bg-indigo-100 text-indigo-700' },
  hepatitis: { ar: 'الكبد', en: 'Hepatitis', color: 'bg-yellow-100 text-yellow-700' },
  ms: { ar: 'التصلب المتعدد', en: 'MS', color: 'bg-teal-100 text-teal-700' },
  psychiatric: { ar: 'النفسية', en: 'Psychiatric', color: 'bg-cyan-100 text-cyan-700' },
  cardiovascular: { ar: 'القلب', en: 'Cardiovascular', color: 'bg-rose-100 text-rose-700' },
  respiratory: { ar: 'الجهاز التنفسي', en: 'Respiratory', color: 'bg-sky-100 text-sky-700' },
  gastrointestinal: { ar: 'الجهاز الهضمي', en: 'GI', color: 'bg-amber-100 text-amber-700' },
  antibiotic: { ar: 'مضاد حيوي', en: 'Antibiotic', color: 'bg-lime-100 text-lime-700' },
  hormone: { ar: 'هرمونات', en: 'Hormone', color: 'bg-fuchsia-100 text-fuchsia-700' },
  pain: { ar: 'مسكنات', en: 'Pain', color: 'bg-stone-100 text-stone-700' },
};

const PriorAuthChecker = () => {
  const { language, isRTL } = useLanguage();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setHasSearched(true);
    setResults([]);
    setSuggestions([]);
    setSelectedResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('prior-auth-search', {
        body: { query: searchQuery, type: 'all' }
      });

      if (error) throw error;

      const response = data as AISearchResponse;
      
      if (response.error) {
        toast({
          title: isRTL ? 'خطأ' : 'Error',
          description: response.error,
          variant: 'destructive'
        });
        return;
      }

      const resultList = response.results || [];
      setResults(resultList);
      
      const normalizedSuggestions = (response.suggestions || []).map((s: any) => 
        typeof s === 'string' ? s : (s.nameAr || s.nameEn || s.name || String(s))
      );
      setSuggestions(normalizedSuggestions);

      if (resultList.length > 0) {
        setSelectedResult(resultList[0]);
      }

      // Log search to database for admin review
      const sessionId = localStorage.getItem('session_id') || crypto.randomUUID();
      localStorage.setItem('session_id', sessionId);
      
      supabase.from('prior_auth_searches' as any).insert({
        query: searchQuery,
        results_count: resultList.length,
        found_results: resultList,
        suggestions: normalizedSuggestions,
        session_id: sessionId,
        user_agent: navigator.userAgent
      } as any).then(() => {});

      trackServiceUsage({ serviceName: 'prior_auth_checker_unified', serviceCategory: 'checker' });

    } catch (err: any) {
      console.error('Search error:', err);
      toast({
        title: isRTL ? 'خطأ في البحث' : 'Search Error',
        description: err.message || (isRTL ? 'حدث خطأ أثناء البحث' : 'An error occurred during search'),
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getConfidenceBadge = (confidence: string) => {
    switch (confidence) {
      case 'high':
        return <Badge variant="default" className="bg-success">{isRTL ? 'تطابق عالي' : 'High Match'}</Badge>;
      case 'medium':
        return <Badge variant="secondary">{isRTL ? 'تطابق متوسط' : 'Medium Match'}</Badge>;
      default:
        return <Badge variant="outline">{isRTL ? 'تطابق منخفض' : 'Low Match'}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'drug' ? <Pill className="h-4 w-4" /> : <ClipboardList className="h-4 w-4" />;
  };

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      {/* Hero */}
      <section className="relative py-8 overflow-hidden gradient-hero">
        <div className="absolute inset-0 chi-pattern" />
        <div className="container mx-auto px-4 relative">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary-foreground/10">
              <FileCheck className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h1 className="text-2xl sm:text-3xl font-bold text-primary-foreground">
                {isRTL ? 'فاحص الموافقة المسبقة والأدوية' : 'Prior Authorization & Drug Checker'}
              </h1>
              <p className="text-sm text-primary-foreground/70 mt-1">
                {isRTL ? 'ابحث عن أي خدمة طبية أو دواء لمعرفة متطلبات الموافقة المسبقة والحد الأدنى من البيانات والأسعار' : 'Search for any medical service or medication to check prior authorization requirements, minimum data, and pricing'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-6">
        {/* Info Alert */}
        <Alert className={`mb-6 border-info/50 bg-info/5 ${isRTL ? 'text-right' : ''}`}>
          <Info className={`h-4 w-4 text-info ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <AlertDescription className="text-sm">
            <span className="font-semibold">
              {isRTL ? 'قاعدة الـ 500 ريال: ' : '500 SAR Rule: '}
            </span>
            {isRTL 
              ? 'الخدمات التي تقل تكلفتها عن 500 ريال لا تتطلب موافقة مسبقة حسب وثيقة مجلس الضمان الصحي، إلا إذا كان لها حد منفعة مخصص.'
              : 'Services costing less than 500 SAR do not require prior authorization per CHI policy, unless they have a dedicated sub-limit.'}
          </AlertDescription>
        </Alert>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6`}>
          {/* Search Panel */}
          <div className={`space-y-4 ${isRTL ? 'lg:order-1' : ''}`}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                  {isRTL ? 'البحث الذكي الموحد' : 'Unified Smart Search'}
                </CardTitle>
                <CardDescription className={isRTL ? 'text-right' : ''}>
                  {isRTL ? 'ابحث عن خدمات طبية أو أدوية باللغة العربية أو الإنجليزية' : 'Search for medical services or medications in Arabic or English'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder={isRTL ? 'اكتب اسم الخدمة أو الدواء... مثال: صورة رنين، سيمبيكورت، بوديسونيد' : 'Type service or drug name... e.g., MRI, Symbicort, Budesonide'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={isRTL ? 'text-right' : ''}
                  />
                  <Button onClick={handleSearch} disabled={isLoading || !searchQuery.trim()}>
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {/* Example searches */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-muted-foreground">
                    {isRTL ? 'أمثلة:' : 'Examples:'}
                  </span>
                  {['صورة رنين للركبة', 'سيمبيكورت', 'بوديسونيد', 'هيوميرا', 'عملية المرارة', 'دواء ضغط'].map((example, i) => (
                    <Badge 
                      key={i}
                      variant="outline" 
                      className="cursor-pointer hover:bg-primary/10"
                      onClick={() => {
                        setSearchQuery(example);
                      }}
                    >
                      {example}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Results List */}
            {hasSearched && (
              <Card>
                <CardHeader>
                  <CardTitle className={`text-base ${isRTL ? 'text-right' : ''}`}>
                    {isRTL ? `النتائج (${results.length})` : `Results (${results.length})`}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : results.length > 0 ? (
                    <div className="space-y-2 max-h-[400px] overflow-y-auto">
                      {results.map((result, index) => (
                        <div
                          key={index}
                          onClick={() => setSelectedResult(result)}
                          className={`p-3 rounded-lg border cursor-pointer transition-all hover:border-primary ${
                            selectedResult === result ? 'border-primary bg-primary/5' : 'border-border'
                          } ${isRTL ? 'text-right' : 'text-left'}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`p-1.5 rounded-md ${result.type === 'drug' ? 'bg-primary/10' : 'bg-info/10'}`}>
                                {getTypeIcon(result.type)}
                              </div>
                              <div className={isRTL ? 'text-right' : 'text-left'}>
                                <p className="font-medium text-sm">
                                  {isRTL ? result.nameAr : result.nameEn}
                                </p>
                                <div className="flex items-center gap-2 mt-1 flex-wrap">
                                  <Badge variant="outline" className="text-xs">
                                    {result.type === 'drug' ? (isRTL ? 'دواء' : 'Drug') : (isRTL ? 'خدمة' : 'Service')}
                                  </Badge>
                                  {result.code && (
                                    <span className="text-xs text-muted-foreground font-mono">{result.code}</span>
                                  )}
                                  {result.estimatedCost && (
                                    <span className="text-xs text-muted-foreground">~{result.estimatedCost} {isRTL ? 'ريال' : 'SAR'}</span>
                                  )}
                                  {result.requiresPA && (
                                    <Badge variant="destructive" className="text-xs">
                                      {isRTL ? 'موافقة مسبقة' : 'PA Required'}
                                    </Badge>
                                  )}
                                </div>
                                {/* Show minimum data requirements summary */}
                                {result.type === 'drug' && result.dosageInfo && (
                                  <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1 flex-wrap">
                                    {result.dosageInfo.requiresDiagnosisCode && (
                                      <Badge variant="secondary" className="text-[10px]">ICD-10</Badge>
                                    )}
                                    {result.dosageInfo.frequency && (
                                      <Badge variant="secondary" className="text-[10px]">{result.dosageInfo.frequency}</Badge>
                                    )}
                                    {result.dosageInfo.requiresLabResults && result.dosageInfo.requiresLabResults.length > 0 && (
                                      <Badge variant="secondary" className="text-[10px]">{isRTL ? 'تحاليل' : 'Labs'}</Badge>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {categoryLabels[result.category] && (
                                <Badge className={categoryLabels[result.category].color} variant="secondary">
                                  {isRTL ? categoryLabels[result.category].ar : categoryLabels[result.category].en}
                                </Badge>
                              )}
                              {result.requiresPA ? (
                                <AlertTriangle className="h-4 w-4 text-warning" />
                              ) : (
                                <CheckCircle2 className="h-4 w-4 text-success" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : suggestions.length > 0 ? (
                    <div className="py-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="h-5 w-5 text-primary" />
                        <p className="font-medium text-sm">
                          {isRTL ? 'لم نجد تطابقاً مباشراً، جرّب أحد الاقتراحات:' : 'No exact match found, try one of these suggestions:'}
                        </p>
                      </div>
                      <div className="space-y-2">
                        {suggestions.map((suggestion, i) => (
                          <div 
                            key={i}
                            className="p-3 rounded-lg border border-primary/30 bg-primary/5 cursor-pointer hover:bg-primary/10 transition-all"
                            onClick={() => {
                              setSearchQuery(suggestion);
                              handleSearch();
                            }}
                          >
                          <div className="flex items-center gap-2">
                            <Search className="h-4 w-4 text-primary" />
                            <span className="font-medium">{suggestion}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className={`py-8 ${isRTL ? 'text-right' : 'text-center'}`}>
                      <Search className={`h-12 w-12 text-muted-foreground/30 mb-2 ${isRTL ? 'mr-auto' : 'mx-auto'}`} />
                      <p className="text-muted-foreground text-sm">
                        {isRTL ? 'لم يتم العثور على نتائج مطابقة' : 'No matching results found'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {isRTL ? 'جرّب البحث بكلمات مختلفة' : 'Try searching with different keywords'}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Details Panel */}
          <div className={isRTL ? 'lg:order-2' : ''}>
            {selectedResult ? (
              <Card>
                <CardHeader className="bg-primary/5 border-b">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {selectedResult.type === 'drug' ? <Pill className="h-5 w-5 text-primary" /> : <ClipboardList className="h-5 w-5 text-primary" />}
                      {isRTL ? selectedResult.nameAr : selectedResult.nameEn}
                    </CardTitle>
                    {getConfidenceBadge(selectedResult.matchConfidence)}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">
                      {selectedResult.type === 'drug' ? (isRTL ? 'دواء' : 'Drug') : (isRTL ? 'خدمة طبية' : 'Medical Service')}
                    </Badge>
                    {selectedResult.code && (
                      <CardDescription className="font-mono text-sm">
                        {isRTL ? 'كود:' : 'Code:'} {selectedResult.code}
                      </CardDescription>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  {/* PA Status */}
                  <div className={`flex items-center gap-2 p-3 rounded-lg ${selectedResult.requiresPA ? 'bg-warning/10' : 'bg-success/10'}`}>
                    {selectedResult.requiresPA ? (
                      <AlertTriangle className="h-5 w-5 text-warning" />
                    ) : (
                      <CheckCircle2 className="h-5 w-5 text-success" />
                    )}
                    <div className={isRTL ? 'text-right' : ''}>
                      <span className="text-sm font-medium">
                        {selectedResult.requiresPA 
                          ? (isRTL ? 'تتطلب موافقة مسبقة' : 'Prior Authorization Required')
                          : (isRTL ? 'لا تتطلب موافقة مسبقة' : 'No Prior Authorization Required')}
                      </span>
                      {selectedResult.paReason && (
                        <p className="text-xs text-muted-foreground mt-1">{selectedResult.paReason}</p>
                      )}
                    </div>
                  </div>

                  {/* Cost & MRP Range */}
                  {selectedResult.estimatedCost && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                      <CircleDollarSign className="h-5 w-5 text-muted-foreground" />
                      <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
                        <span className="text-sm font-medium">
                          {isRTL ? 'التكلفة التقديرية: ' : 'Estimated Cost: '}{selectedResult.estimatedCost} {isRTL ? 'ريال' : 'SAR'}
                        </span>
                        {selectedResult.estimatedCost < 500 && selectedResult.type === 'service' && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {isRTL ? 'أقل من حد الـ 500 ريال' : 'Below 500 SAR threshold'}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* MRP Price Range */}
                  {(selectedResult.mrpMin || selectedResult.mrpMax) && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="p-1.5 rounded-full bg-primary/10">
                        <CircleDollarSign className="h-4 w-4 text-primary" />
                      </div>
                      <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
                        <span className="text-sm font-semibold text-primary">
                          {isRTL ? 'المدى السعري (MRP):' : 'MRP Price Range:'}
                        </span>
                        <p className="text-sm font-medium mt-0.5">
                          {selectedResult.mrpMin} - {selectedResult.mrpMax} {isRTL ? 'ريال' : 'SAR'}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Indication (for drugs) */}
                  {selectedResult.indication && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-info/10">
                      <Info className="h-5 w-5 text-info" />
                      <div className={isRTL ? 'text-right' : ''}>
                        <span className="text-sm font-medium">
                          {isRTL ? 'دواعي الاستعمال:' : 'Indication:'}
                        </span>
                        <p className="text-sm text-muted-foreground">{selectedResult.indication}</p>
                      </div>
                    </div>
                  )}

                  {/* ICD-10 Codes (for drugs) */}
                  {selectedResult.icd10Codes && selectedResult.icd10Codes.length > 0 && (
                    <div className={`p-3 rounded-lg bg-muted/30 ${isRTL ? 'text-right' : ''}`}>
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        {isRTL ? 'أكواد التشخيص (ICD-10):' : 'Diagnosis Codes (ICD-10):'}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedResult.icd10Codes.map((code, i) => (
                          <Badge key={i} variant="outline" className="font-mono text-xs">{code}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Drug Dosage Info - Minimum Data Set */}
                  {selectedResult.type === 'drug' && selectedResult.dosageInfo && (
                    <Card className="border-primary/30 bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <List className="h-4 w-4 text-primary" />
                          {isRTL ? 'الحد الأدنى من البيانات للوصفة' : 'Minimum Prescription Data'}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {/* Dosage Form */}
                        {selectedResult.dosageInfo.form && (
                          <div className="flex items-center gap-2">
                            <Syringe className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              <span className="font-medium">{isRTL ? 'الشكل الدوائي: ' : 'Form: '}</span>
                              {selectedResult.dosageInfo.form}
                            </span>
                          </div>
                        )}

                        {/* Frequency */}
                        {selectedResult.dosageInfo.frequency && (
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              <span className="font-medium">{isRTL ? 'التكرار: ' : 'Frequency: '}</span>
                              {selectedResult.dosageInfo.frequency}
                            </span>
                          </div>
                        )}

                        {/* Typical Dose */}
                        {selectedResult.dosageInfo.typicalDose && (
                          <div className="flex items-center gap-2">
                            <Scale className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              <span className="font-medium">{isRTL ? 'الجرعة النموذجية: ' : 'Typical Dose: '}</span>
                              {selectedResult.dosageInfo.typicalDose}
                            </span>
                          </div>
                        )}

                        {/* Max Quantity */}
                        {selectedResult.dosageInfo.maxQuantityPerMonth && (
                          <div className="flex items-center gap-2">
                            <ClipboardList className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              <span className="font-medium">{isRTL ? 'الحد الأقصى شهرياً: ' : 'Max Monthly Qty: '}</span>
                              {selectedResult.dosageInfo.maxQuantityPerMonth}
                            </span>
                          </div>
                        )}

                        {/* Required Data */}
                        <div className={`pt-2 border-t ${isRTL ? 'text-right' : ''}`}>
                          <h5 className="font-semibold text-xs mb-2 flex items-center gap-1">
                            <FileWarning className="h-3 w-3 text-warning" />
                            {isRTL ? 'البيانات المطلوبة للطلب:' : 'Required Request Data:'}
                          </h5>
                          <ul className={`text-xs space-y-1 text-muted-foreground ${isRTL ? 'mr-4' : 'ml-4'}`}>
                            {selectedResult.dosageInfo.requiresDiagnosisCode && (
                              <li className="flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3 text-success" />
                                {isRTL ? 'كود التشخيص (ICD-10)' : 'Diagnosis Code (ICD-10)'}
                              </li>
                            )}
                            {selectedResult.dosageInfo.requiresBodyWeight && (
                              <li className="flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3 text-success" />
                                {isRTL ? 'وزن المريض' : 'Patient Weight'}
                              </li>
                            )}
                            {selectedResult.dosageInfo.requiresLabResults && selectedResult.dosageInfo.requiresLabResults.length > 0 && (
                              <li className="flex items-center gap-1">
                                <TestTube className="h-3 w-3 text-info" />
                                {isRTL ? 'تحاليل: ' : 'Labs: '}{selectedResult.dosageInfo.requiresLabResults.join(', ')}
                              </li>
                            )}
                            {selectedResult.dosageInfo.additionalRequirements && selectedResult.dosageInfo.additionalRequirements.length > 0 && (
                              selectedResult.dosageInfo.additionalRequirements.map((req, i) => (
                                <li key={i} className="flex items-center gap-1">
                                  <AlertTriangle className="h-3 w-3 text-warning" />
                                  {req}
                                </li>
                              ))
                            )}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Alternatives */}
                  {selectedResult.alternatives && selectedResult.alternatives.length > 0 && (
                    <div className={`p-3 rounded-lg bg-muted/30 ${isRTL ? 'text-right' : ''}`}>
                      <h4 className={`font-semibold text-sm mb-2 ${isRTL ? 'text-right' : ''}`}>
                        {isRTL ? 'البدائل المتاحة:' : 'Available Alternatives:'}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedResult.alternatives.map((alt, i) => (
                          <Badge key={i} variant="outline">{alt}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  {selectedResult.notes && (
                    <Alert className={`border-muted bg-muted/30 ${isRTL ? 'text-right' : ''}`}>
                      <Info className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      <AlertDescription className="text-xs">
                        {selectedResult.notes}
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Category */}
                  {categoryLabels[selectedResult.category] && (
                    <div>
                      <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        {isRTL ? 'الفئة' : 'Category'}
                      </h3>
                      <Badge className={categoryLabels[selectedResult.category].color}>
                        {isRTL ? categoryLabels[selectedResult.category].ar : categoryLabels[selectedResult.category].en}
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className={`h-full min-h-[400px] flex items-center ${isRTL ? 'justify-end' : 'justify-center'}`}>
                <div className={`p-8 ${isRTL ? 'text-right' : 'text-center'}`}>
                  <Sparkles className={`h-16 w-16 text-muted-foreground/30 mb-4 ${isRTL ? 'mr-auto' : 'mx-auto'}`} />
                  <p className="text-muted-foreground">
                    {isRTL ? 'ابحث عن خدمة أو دواء لعرض التفاصيل' : 'Search for a service or drug to view details'}
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-2">
                    {isRTL ? 'الذكاء الاصطناعي سيفهم استفسارك بالعربية أو الإنجليزية' : 'AI will understand your query in Arabic or English'}
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PriorAuthChecker;
