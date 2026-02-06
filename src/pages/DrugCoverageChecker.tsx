import { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Pill, 
  Search, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  FileText,
  Info,
  Clock,
  ShieldCheck,
  ShieldX,
  Loader2,
  Sparkles,
  Lightbulb
} from 'lucide-react';
import { trackServiceUsage } from '@/lib/serviceTracking';

interface DrugResult {
  nameAr: string;
  nameEn: string;
  category: string;
  requiresPA: boolean;
  indication?: string;
  matchConfidence: 'high' | 'medium' | 'low';
  covered?: boolean;
  coverageType?: string;
  maxQuantity?: number;
  notes?: string;
  icd10Codes?: string[];
  alternatives?: string[];
}

interface AISearchResponse {
  found: boolean;
  drugs?: DrugResult[];
  suggestions?: string[];
  error?: string;
}

const categoryLabels: Record<string, { ar: string; en: string; color: string }> = {
  biological: { ar: 'بيولوجي', en: 'Biological', color: 'bg-purple-100 text-purple-700' },
  diabetes: { ar: 'السكري', en: 'Diabetes', color: 'bg-orange-100 text-orange-700' },
  anticoagulant: { ar: 'مضاد تخثر', en: 'Anticoagulant', color: 'bg-red-100 text-red-700' },
  oncology: { ar: 'الأورام', en: 'Oncology', color: 'bg-indigo-100 text-indigo-700' },
  hepatitis: { ar: 'الكبد', en: 'Hepatitis', color: 'bg-yellow-100 text-yellow-700' },
  ms: { ar: 'التصلب المتعدد', en: 'MS', color: 'bg-teal-100 text-teal-700' },
  psychiatric: { ar: 'النفسية', en: 'Psychiatric', color: 'bg-cyan-100 text-cyan-700' },
  cardiovascular: { ar: 'القلب', en: 'Cardiovascular', color: 'bg-rose-100 text-rose-700' },
  gastrointestinal: { ar: 'الجهاز الهضمي', en: 'GI', color: 'bg-amber-100 text-amber-700' },
  respiratory: { ar: 'الجهاز التنفسي', en: 'Respiratory', color: 'bg-sky-100 text-sky-700' },
  dermatology: { ar: 'الجلدية', en: 'Dermatology', color: 'bg-pink-100 text-pink-700' },
  pain: { ar: 'المسكنات', en: 'Pain', color: 'bg-slate-100 text-slate-700' },
  antibiotic: { ar: 'مضاد حيوي', en: 'Antibiotic', color: 'bg-green-100 text-green-700' },
  hypertension: { ar: 'الضغط', en: 'Hypertension', color: 'bg-blue-100 text-blue-700' },
  cholesterol: { ar: 'الكوليسترول', en: 'Cholesterol', color: 'bg-lime-100 text-lime-700' },
  hormone: { ar: 'الهرمونات', en: 'Hormone', color: 'bg-fuchsia-100 text-fuchsia-700' },
  equipment: { ar: 'الأجهزة', en: 'Equipment', color: 'bg-gray-100 text-gray-700' },
};

const DrugCoverageChecker = () => {
  const { language, isRTL } = useLanguage();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<DrugResult[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedDrug, setSelectedDrug] = useState<DrugResult | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setHasSearched(true);
    setResults([]);
    setSuggestions([]);
    setSelectedDrug(null);

    try {
      const { data, error } = await supabase.functions.invoke('prior-auth-search', {
        body: { query: searchQuery, type: 'drug' }
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

      setResults(response.drugs || []);
      
      // Normalize suggestions to strings
      const normalizedSuggestions = (response.suggestions || []).map((s: any) => 
        typeof s === 'string' ? s : (s.nameAr || s.nameEn || s.name || String(s))
      );
      setSuggestions(normalizedSuggestions);

      if (response.drugs && response.drugs.length > 0) {
        setSelectedDrug(response.drugs[0]);
      }

      trackServiceUsage({ serviceName: 'drug_coverage_ai', serviceCategory: 'checker' });

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

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      {/* Hero */}
      <section className="relative py-8 overflow-hidden gradient-hero">
        <div className="absolute inset-0 chi-pattern" />
        <div className="container mx-auto px-4 relative">
          <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="p-3 rounded-xl bg-primary-foreground/10">
              <Pill className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h1 className="text-2xl sm:text-3xl font-bold text-primary-foreground">
                {isRTL ? 'فاحص تغطية الأدوية' : 'Drug Coverage Checker'}
              </h1>
              <p className="text-sm text-primary-foreground/70 mt-1">
                {isRTL ? 'اكتب اسم الدواء بلغة بسيطة والذكاء الاصطناعي سيجد المعلومات' : 'Type drug name in simple language and AI will find the information'}
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
            {isRTL 
              ? 'يمكنك البحث بالاسم التجاري أو العلمي أو وصف الاستخدام (مثل: "دواء سكري"، "علاج روماتيزم"، "أوزمبك")'
              : 'Search by brand name, generic name, or usage description (e.g., "diabetes drug", "rheumatoid treatment", "Ozempic")'}
          </AlertDescription>
        </Alert>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6`}>
          {/* Search Panel */}
          <div className={`space-y-4 ${isRTL ? 'lg:order-1' : ''}`}>
            <Card>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 text-lg ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                  <Sparkles className="h-5 w-5 text-primary" />
                  {isRTL ? 'البحث الذكي' : 'Smart Search'}
                </CardTitle>
                <CardDescription className={isRTL ? 'text-right' : ''}>
                  {isRTL ? 'اكتب اسم الدواء أو الحالة المرضية' : 'Type drug name or medical condition'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Input
                    placeholder={isRTL ? 'ابحث بالاسم أو المادة الفعالة...' : 'Search by name or active ingredient...'}
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
                <div className={`flex flex-wrap gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-xs text-muted-foreground">
                    {isRTL ? 'أمثلة:' : 'Examples:'}
                  </span>
                  {['هيوميرا', 'أوزمبك', 'دواء ضغط', 'علاج سرطان', 'مضاد حيوي'].map((example, i) => (
                    <Badge 
                      key={i}
                      variant="outline" 
                      className="cursor-pointer hover:bg-primary/10"
                      onClick={() => setSearchQuery(example)}
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
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-2 pr-4">
                        {results.map((drug, index) => (
                          <div
                            key={index}
                            onClick={() => setSelectedDrug(drug)}
                            className={`p-3 rounded-lg border cursor-pointer transition-all hover:border-primary ${
                              selectedDrug === drug ? 'border-primary bg-primary/5' : 'border-border'
                            } ${isRTL ? 'text-right' : 'text-left'}`}
                          >
                            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <div>
                                <p className="font-medium text-sm">
                                  {isRTL ? drug.nameAr : drug.nameEn}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {isRTL ? drug.nameEn : drug.nameAr}
                                </p>
                              </div>
                              <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                {categoryLabels[drug.category] && (
                                  <Badge className={categoryLabels[drug.category].color} variant="secondary">
                                    {isRTL ? categoryLabels[drug.category].ar : categoryLabels[drug.category].en}
                                  </Badge>
                                )}
                                {drug.requiresPA ? (
                                  <AlertTriangle className="h-4 w-4 text-warning" />
                                ) : (
                                  <ShieldCheck className="h-4 w-4 text-success" />
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  ) : (
                    <div className="text-center py-8">
                      <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-2" />
                      <p className="text-muted-foreground text-sm">
                        {isRTL ? 'لم يتم العثور على نتائج' : 'No results found'}
                      </p>
                      {suggestions.length > 0 && (
                        <div className="mt-4">
                          <p className="text-xs text-muted-foreground mb-2">
                            {isRTL ? 'هل تقصد:' : 'Did you mean:'}
                          </p>
                          <div className={`flex flex-wrap justify-center gap-2`}>
                            {suggestions.map((suggestion, i) => (
                              <Badge 
                                key={i}
                                variant="outline" 
                                className="cursor-pointer hover:bg-primary/10"
                                onClick={() => setSearchQuery(suggestion)}
                              >
                                {suggestion}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Details Panel */}
          <div className={isRTL ? 'lg:order-2' : ''}>
            {selectedDrug ? (
              <Card>
                <CardHeader className={`border-b ${!selectedDrug.requiresPA ? 'bg-success/5' : 'bg-warning/5'}`}>
                  <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Pill className="h-5 w-5 text-primary" />
                      {isRTL ? selectedDrug.nameAr : selectedDrug.nameEn}
                    </CardTitle>
                    {getConfidenceBadge(selectedDrug.matchConfidence)}
                  </div>
                  <CardDescription className="mt-2">
                    {isRTL ? selectedDrug.nameEn : selectedDrug.nameAr}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-6">
                  {/* Coverage Status */}
                  <div className={`flex items-center gap-2 p-3 rounded-lg ${!selectedDrug.requiresPA ? 'bg-success/10' : 'bg-warning/10'} ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {selectedDrug.requiresPA ? (
                      <>
                        <AlertTriangle className="h-5 w-5 text-warning" />
                        <span className="text-sm font-medium">
                          {isRTL ? 'يتطلب موافقة مسبقة من شركة التأمين' : 'Requires prior authorization from insurer'}
                        </span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-5 w-5 text-success" />
                        <span className="text-sm font-medium">
                          {isRTL ? 'لا يتطلب موافقة مسبقة' : 'No prior authorization required'}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Category */}
                  {selectedDrug.category && categoryLabels[selectedDrug.category] && (
                    <div className={isRTL ? 'text-right' : ''}>
                      <p className="text-xs text-muted-foreground mb-1">
                        {isRTL ? 'الفئة العلاجية' : 'Therapeutic Category'}
                      </p>
                      <Badge className={categoryLabels[selectedDrug.category].color}>
                        {isRTL ? categoryLabels[selectedDrug.category].ar : categoryLabels[selectedDrug.category].en}
                      </Badge>
                    </div>
                  )}

                  {/* Indication */}
                  {selectedDrug.indication && (
                    <div>
                      <h3 className={`font-semibold text-sm mb-2 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <FileText className="h-4 w-4 text-primary" />
                        {isRTL ? 'دواعي الاستعمال' : 'Indication'}
                      </h3>
                      <p className={`text-sm text-muted-foreground ${isRTL ? 'text-right' : ''}`}>
                        {selectedDrug.indication}
                      </p>
                    </div>
                  )}

                  {/* Max Quantity */}
                  {selectedDrug.maxQuantity && (
                    <div className={`flex items-center gap-2 p-3 rounded-lg bg-info/10 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Clock className="h-5 w-5 text-info" />
                      <span className="text-sm">
                        {isRTL ? `الحد الأقصى: ${selectedDrug.maxQuantity} وحدات شهرياً` : `Max quantity: ${selectedDrug.maxQuantity} units/month`}
                      </span>
                    </div>
                  )}

                  {/* Notes */}
                  {selectedDrug.notes && (
                    <div>
                      <h3 className={`font-semibold text-sm mb-2 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Info className="h-4 w-4 text-primary" />
                        {isRTL ? 'ملاحظات' : 'Notes'}
                      </h3>
                      <p className={`text-sm text-muted-foreground ${isRTL ? 'text-right' : ''}`}>
                        {selectedDrug.notes}
                      </p>
                    </div>
                  )}

                  {/* ICD-10 Codes */}
                  {selectedDrug.icd10Codes && selectedDrug.icd10Codes.length > 0 && (
                    <div>
                      <h3 className={`font-semibold text-sm mb-2 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <FileText className="h-4 w-4 text-primary" />
                        {isRTL ? 'أكواد التشخيص المعتمدة' : 'Approved Diagnosis Codes'}
                      </h3>
                      <div className={`flex flex-wrap gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        {selectedDrug.icd10Codes.map((code, i) => (
                          <Badge key={i} variant="outline" className="font-mono">
                            {code}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Alternatives */}
                  {selectedDrug.alternatives && selectedDrug.alternatives.length > 0 && (
                    <div>
                      <h3 className={`font-semibold text-sm mb-2 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Lightbulb className="h-4 w-4 text-primary" />
                        {isRTL ? 'البدائل المتاحة' : 'Available Alternatives'}
                      </h3>
                      <div className={`flex flex-wrap gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        {selectedDrug.alternatives.map((alt, i) => (
                          <Badge 
                            key={i} 
                            variant="secondary"
                            className="cursor-pointer hover:bg-primary/10"
                            onClick={() => setSearchQuery(alt)}
                          >
                            {alt}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <Pill className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {isRTL ? 'ابحث عن دواء لعرض تفاصيل التغطية' : 'Search for a drug to view coverage details'}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DrugCoverageChecker;