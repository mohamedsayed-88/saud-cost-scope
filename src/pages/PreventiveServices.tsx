import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { generatePreventiveEligibilityReport } from '@/utils/pdfExport';
import { useToast } from '@/hooks/use-toast';
import {
  Shield, 
  Stethoscope, 
  Syringe, 
  MessageSquare, 
  ClipboardCheck,
  ArrowRight,
  ArrowLeft,
  Check,
  X,
  User,
  Calendar,
  Activity,
  FileText,
  Code,
  AlertTriangle,
  Info,
  BadgeCheck,
  XCircle,
  Briefcase,
  Download
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  preventiveServices, 
  conditions, 
  categories, 
  coverageFilters,
  beneficiaryTypes,
  checkEligibility,
  getCoverageInfo,
  type PreventiveService,
  type CoverageType,
  type BeneficiaryType
} from '@/data/preventiveServices';

const PreventiveServices = () => {
  const { language, isRTL } = useLanguage();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCoverage, setSelectedCoverage] = useState('all');
  const [age, setAge] = useState<number>(35);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [showEligibleOnly, setShowEligibleOnly] = useState(false);
  const [beneficiaryType, setBeneficiaryType] = useState<BeneficiaryType>('private_sector');
  const [isExporting, setIsExporting] = useState(false);

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const selectedBeneficiaryInfo = beneficiaryTypes.find(b => b.type === beneficiaryType);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'screening': return Stethoscope;
      case 'vaccination': return Syringe;
      case 'counseling': return MessageSquare;
      case 'checkup': return ClipboardCheck;
      default: return Shield;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'screening': return 'bg-blue-500';
      case 'vaccination': return 'bg-green-500';
      case 'counseling': return 'bg-purple-500';
      case 'checkup': return 'bg-orange-500';
      default: return 'bg-primary';
    }
  };

  const getCoverageColor = (coverage: CoverageType) => {
    switch (coverage) {
      case 'chi_basic': return 'bg-green-100 text-green-700 border-green-300 dark:bg-green-950/50 dark:text-green-400 dark:border-green-800';
      case 'government': return 'bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-950/50 dark:text-purple-400 dark:border-purple-800';
      case 'not_covered': return 'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getCoverageLabel = (coverage: CoverageType) => {
    switch (coverage) {
      case 'chi_basic':
        return language === 'ar' ? 'وثيقة الضمان' : 'CHI Policy';
      case 'government':
        return language === 'ar' ? 'حكومي' : 'Government';
      case 'not_covered':
        return language === 'ar' ? 'غير مغطاة (وزارة الصحة للسعوديين)' : 'Not Covered (MOH for Saudis)';
      default:
        return '';
    }
  };

  // Check if a service is covered based on beneficiary type
  const isServiceCoveredForBeneficiary = (service: PreventiveService) => {
    if (!selectedBeneficiaryInfo) return false;
    if (!selectedBeneficiaryInfo.preventiveCovered) return false;
    return selectedBeneficiaryInfo.coverageTypes.includes(service.coverage);
  };

  const filteredServices = useMemo(() => {
    let services = preventiveServices;
    
    if (selectedCategory !== 'all') {
      services = services.filter(s => s.category === selectedCategory);
    }

    if (selectedCoverage !== 'all') {
      services = services.filter(s => s.coverage === selectedCoverage);
    }

    if (showEligibleOnly) {
      services = services.filter(s => {
        const result = checkEligibility(s, age, gender, selectedConditions);
        return result.eligible;
      });
    }

    return services;
  }, [selectedCategory, selectedCoverage, showEligibleOnly, age, gender, selectedConditions]);

  const eligibilityResults = useMemo(() => {
    return preventiveServices.map(service => ({
      service,
      ...checkEligibility(service, age, gender, selectedConditions),
      coveredByBeneficiary: isServiceCoveredForBeneficiary(service)
    }));
  }, [age, gender, selectedConditions, beneficiaryType]);

  const eligibleCount = eligibilityResults.filter(r => r.eligible && r.coveredByBeneficiary).length;
  const coveredCount = preventiveServices.filter(s => s.coverage === 'chi_basic').length;
  const notCoveredCount = preventiveServices.filter(s => s.coverage === 'not_covered').length;

  const toggleCondition = (conditionId: string) => {
    setSelectedConditions(prev => 
      prev.includes(conditionId) 
        ? prev.filter(c => c !== conditionId)
        : [...prev, conditionId]
    );
  };

  const handleExportPDF = async () => {
    if (!selectedBeneficiaryInfo) return;
    
    setIsExporting(true);
    try {
      const eligibleServices = eligibilityResults
        .filter(r => r.eligible && r.coveredByBeneficiary)
        .map(r => ({
          nameAr: r.service.nameAr,
          nameEn: r.service.nameEn,
          category: r.service.category,
          coverage: r.service.coverage === 'chi_basic' ? 'CHI Policy' : r.service.coverage === 'government' ? 'Government' : 'Not Covered (MOH)',
          coverageAr: r.service.coverage === 'chi_basic' ? 'وثيقة الضمان' : r.service.coverage === 'government' ? 'حكومية' : 'غير مغطاة (وزارة الصحة)',
          icd10Codes: r.service.icd10Codes,
          sbsCodes: r.service.sbsCodes,
          frequency: r.service.eligibility.frequency,
          frequencyEn: r.service.eligibility.frequencyEn
        }));

      const selectedConditionNames = conditions
        .filter(c => selectedConditions.includes(c.id))
        .map(c => c.nameAr);
      
      const selectedConditionNamesEn = conditions
        .filter(c => selectedConditions.includes(c.id))
        .map(c => c.nameEn);

      await generatePreventiveEligibilityReport({
        beneficiaryType: selectedBeneficiaryInfo.nameAr,
        beneficiaryTypeEn: selectedBeneficiaryInfo.nameEn,
        age,
        gender,
        conditions: selectedConditionNames,
        conditionsEn: selectedConditionNamesEn,
        eligibleServices,
        preventiveCovered: selectedBeneficiaryInfo.preventiveCovered,
        language
      });

      toast({
        title: language === 'ar' ? 'تم التصدير بنجاح' : 'Export Successful',
        description: language === 'ar' ? 'تم تحميل تقرير الأهلية' : 'Eligibility report downloaded',
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: language === 'ar' ? 'خطأ في التصدير' : 'Export Error',
        description: language === 'ar' ? 'فشل في تصدير التقرير' : 'Failed to export report',
        variant: 'destructive'
      });
    } finally {
      setIsExporting(false);
    }
  };

  const ServiceCard = ({ service, showEligibility = true }: { service: PreventiveService; showEligibility?: boolean }) => {
    const result = checkEligibility(service, age, gender, selectedConditions);
    const CategoryIcon = getCategoryIcon(service.category);
    const isIndividualPolicy = selectedBeneficiaryInfo?.isIndividualPolicy;
    
    // For individual policies, don't show eligibility styling
    const cardClass = isIndividualPolicy 
      ? 'border-border' 
      : (result.eligible ? 'border-green-500/50 bg-green-50/30 dark:bg-green-950/20' : 'border-border');
    
    return (
      <Card className={`border transition-all ${cardClass}`}>
        <CardContent className="p-3 sm:p-4">
          <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`p-2 rounded-lg ${getCategoryColor(service.category)} shrink-0`}>
              <CategoryIcon className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className={`flex items-center gap-2 mb-1 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                <h3 className={`font-semibold text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
                  {language === 'ar' ? service.nameAr : service.nameEn}
                </h3>
                {/* Only show eligibility badges if not an individual policy */}
                {showEligibility && !isIndividualPolicy && (
                  result.eligible ? (
                    <Badge className="bg-green-500 text-white text-[10px]">
                      <Check className="h-3 w-3 mr-0.5" />
                      {language === 'ar' ? 'مؤهل' : 'Eligible'}
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-[10px]">
                      <X className="h-3 w-3 mr-0.5" />
                      {language === 'ar' ? 'غير مؤهل' : 'Not Eligible'}
                    </Badge>
                  )
                )}
                {/* For individual policies, show a neutral badge */}
                {isIndividualPolicy && (
                  <Badge variant="outline" className="text-[10px] bg-muted">
                    <Info className="h-3 w-3 mr-0.5" />
                    {language === 'ar' ? 'راجع وثيقتك' : 'Check your policy'}
                  </Badge>
                )}
              </div>
              <p className={`text-xs text-muted-foreground mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                {language === 'ar' ? service.descriptionAr : service.descriptionEn}
              </p>

              {/* Coverage Badge */}
              <div className={`mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                <Badge variant="outline" className={`text-[10px] ${getCoverageColor(service.coverage)}`}>
                  {service.coverage === 'chi_basic' ? (
                    <BadgeCheck className="h-3 w-3 mr-1" />
                  ) : (
                    <Info className="h-3 w-3 mr-1" />
                  )}
                  {getCoverageLabel(service.coverage)}
                </Badge>
                {service.coverageNoteAr && !isIndividualPolicy && (
                  <p className="text-[10px] text-muted-foreground mt-1">
                    {language === 'ar' ? service.coverageNoteAr : service.coverageNoteEn}
                  </p>
                )}
                {isIndividualPolicy && (
                  <p className="text-[10px] text-muted-foreground mt-1">
                    {language === 'ar' 
                      ? 'التغطية تعتمد على شروط وثيقتك الخاصة'
                      : 'Coverage depends on your specific policy terms'}
                  </p>
                )}
              </div>
              
              {/* Codes Section */}
              <div className="space-y-1.5">
                <div className={`flex items-center gap-2 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-[10px] font-medium text-muted-foreground flex items-center gap-1">
                    <Code className="h-3 w-3" />
                    ICD-10:
                  </span>
                  {service.icd10Codes.map(code => (
                    <Badge key={code} variant="outline" className="text-[10px] font-mono bg-blue-50 dark:bg-blue-950/30">
                      {code}
                    </Badge>
                  ))}
                </div>
                <div className={`flex items-center gap-2 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-[10px] font-medium text-muted-foreground flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    SBS:
                  </span>
                  {service.sbsCodes.map(code => (
                    <Badge key={code} variant="outline" className="text-[10px] font-mono bg-green-50 dark:bg-green-950/30">
                      {code}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Frequency */}
              <div className={`mt-2 pt-2 border-t border-border/50 ${isRTL ? 'text-right' : 'text-left'}`}>
                <span className="text-[10px] text-muted-foreground">
                  {language === 'ar' ? 'التكرار: ' : 'Frequency: '}
                  <span className="font-medium text-foreground">
                    {language === 'ar' ? service.eligibility.frequency : service.eligibility.frequencyEn}
                  </span>
                </span>
              </div>

              {/* Eligibility Reason - only show if not individual policy */}
              {!isIndividualPolicy && (
                <p className={`text-[10px] mt-1 ${result.eligible ? 'text-green-600' : 'text-muted-foreground'} ${isRTL ? 'text-right' : 'text-left'}`}>
                  {language === 'ar' ? result.reason : result.reasonEn}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />

      {/* Hero Section - Standardized */}
      <section className="relative py-6 sm:py-8 overflow-hidden gradient-hero">
        <div className="absolute inset-0 chi-pattern" />
        <div className="container mx-auto px-3 sm:px-4 relative">
          <div className={`flex items-center gap-3 mb-3 w-fit ${isRTL ? 'ml-auto' : ''}`}>
            <div className="p-2 rounded-lg bg-primary-foreground/10">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-primary-foreground">
              {language === 'ar' ? 'الخدمات الوقائية' : 'Preventive Services'}
            </h1>
          </div>
          
          <p className={`text-xs sm:text-sm text-primary-foreground/85 max-w-2xl ${isRTL ? 'text-right ml-auto' : 'text-left'}`}>
            {language === 'ar' 
              ? 'دليل شامل للخدمات الوقائية المغطاة وغير المغطاة بوثيقة مجلس الضمان الصحي'
              : 'Comprehensive guide to preventive services covered and not covered by CHI policy'}
          </p>
        </div>
      </section>

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-5xl">

        {/* Important Notice */}
        <Alert className="mb-4 border-amber-300 bg-amber-50 dark:bg-amber-950/30">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertTitle className={`text-amber-800 dark:text-amber-400 ${isRTL ? 'text-right' : 'text-left'}`}>
            {language === 'ar' ? 'ملاحظات مهمة حول التغطية' : 'Important Coverage Notes'}
          </AlertTitle>
          <AlertDescription className={`text-xs text-amber-700 dark:text-amber-300 space-y-1 ${isRTL ? 'text-right' : 'text-left'}`}>
            <p>
              {language === 'ar' 
                ? '• وثائق تأمين السياح والزوار والعمرة لا تغطي الخدمات الوقائية (تغطي الحالات الطارئة فقط)'
                : '• Tourist, Visitor, and Umrah policies do not cover preventive services (emergency cases only)'}
            </p>
            <p>
              {language === 'ar' 
                ? '• الوثائق الحكومية تخضع لوثيقة هيئة كفاءة الإنفاق وقد تختلف التغطية'
                : '• Government policies are subject to Spending Efficiency Authority and coverage may vary'}
            </p>
            <p>
              {language === 'ar' 
                ? '• بعض الخدمات تتطلب موافقة مسبقة أو تكون محدودة بعدد معين سنوياً'
                : '• Some services require prior authorization or are limited to a certain number annually'}
            </p>
          </AlertDescription>
        </Alert>

        {/* Coverage Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <Card className="border-green-200 dark:border-green-900 bg-green-50/50 dark:bg-green-950/20">
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-green-600">{coveredCount}</div>
              <div className="text-[10px] text-muted-foreground">
                {language === 'ar' ? 'خدمة مغطاة' : 'Covered Services'}
              </div>
            </CardContent>
          </Card>
          <Card className="border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-950/20">
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-red-600">{notCoveredCount}</div>
              <div className="text-[10px] text-muted-foreground">
                {language === 'ar' ? 'غير مغطاة' : 'Not Covered'}
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/20">
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-blue-600">{preventiveServices.length}</div>
              <div className="text-[10px] text-muted-foreground">
                {language === 'ar' ? 'إجمالي الخدمات' : 'Total Services'}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="eligibility" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4" style={isRTL ? { direction: 'rtl' } : {}}>
            <TabsTrigger value="eligibility" className="text-xs sm:text-sm flex items-center gap-2">
              <User className="h-4 w-4" />
              {language === 'ar' ? 'فحص الأهلية' : 'Eligibility Check'}
            </TabsTrigger>
            <TabsTrigger value="services" className="text-xs sm:text-sm flex items-center gap-2">
              <Shield className="h-4 w-4" />
              {language === 'ar' ? 'جميع الخدمات' : 'All Services'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="eligibility" className="space-y-4">
            {/* Eligibility Form */}
            <Card className="border-primary/30 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className={`text-base sm:text-lg flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Activity className="h-5 w-5 text-primary" />
                  {language === 'ar' ? 'أدخل معلوماتك الصحية' : 'Enter Your Health Information'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Beneficiary Type Selection */}
                <div className="space-y-2">
                  <Label className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Briefcase className="h-4 w-4" />
                    {language === 'ar' ? 'نوع التغطية الصحية' : 'Health Coverage Type'}
                  </Label>
                  <Select value={beneficiaryType} onValueChange={(v) => setBeneficiaryType(v as BeneficiaryType)}>
                    <SelectTrigger className={`${isRTL ? 'text-right [&>span]:text-right [&>span]:w-full' : 'text-left'}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={isRTL ? '[&_*]:text-right' : ''}>
                      {beneficiaryTypes.map(type => (
                        <SelectItem key={type.type} value={type.type} className={isRTL ? 'flex-row-reverse' : ''}>
                          {language === 'ar' ? type.nameAr : type.nameEn}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedBeneficiaryInfo && (
                    <p className={`text-[10px] text-muted-foreground ${isRTL ? 'text-right' : 'text-left'}`}>
                      {language === 'ar' ? selectedBeneficiaryInfo.descriptionAr : selectedBeneficiaryInfo.descriptionEn}
                    </p>
                  )}
                </div>

                {/* Warning for visitors/tourists */}
                {!selectedBeneficiaryInfo?.preventiveCovered && (
                  <Alert variant="destructive" className="py-2">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      {language === 'ar' 
                        ? 'وثيقة الزيارة والسياحة لا تغطي الخدمات الوقائية - تغطي حالات الطوارئ فقط (درجة 1-3)'
                        : 'Visitor/Tourist insurance does not cover preventive services - only emergency cases (severity 1-3)'}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Warning for individual policies */}
                {selectedBeneficiaryInfo?.isIndividualPolicy && (
                  <Alert className="py-2 border-info bg-info/10">
                    <Info className="h-4 w-4 text-info" />
                    <AlertTitle className={`text-info text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
                      {language === 'ar' ? 'ملاحظة هامة عن الوثائق الفردية' : 'Important Note About Individual Policies'}
                    </AlertTitle>
                    <AlertDescription className={`text-xs text-muted-foreground ${isRTL ? 'text-right' : 'text-left'}`}>
                      {language === 'ar' 
                        ? 'الوثائق الفردية لا تخضع لوثيقة مجلس الضمان الصحي، ولها قوانين خاصة حسب اتفاق شركة التأمين مع صاحب الوثيقة. يُعرض أدناه جميع الخدمات الوقائية للاطلاع، لكن التغطية الفعلية تختلف من وثيقة لأخرى. يُرجى مراجعة وثيقتك أو التواصل مع شركة التأمين للتأكد من التغطية.'
                        : 'Individual policies are not subject to CHI regulations and have their own terms per the agreement between the insurance company and policyholder. All preventive services are shown below for reference, but actual coverage varies from policy to policy. Please review your policy or contact your insurance company to confirm coverage.'}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Age Input */}
                  <div className="space-y-2">
                    <Label className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Calendar className="h-4 w-4" />
                      {language === 'ar' ? 'العمر' : 'Age'}
                    </Label>
                    <Input 
                      type="number" 
                      value={age} 
                      onChange={(e) => setAge(Number(e.target.value))}
                      min={0}
                      max={120}
                      className={isRTL ? 'text-right' : 'text-left'}
                    />
                  </div>

                  {/* Gender Select */}
                  <div className="space-y-2">
                    <Label className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <User className="h-4 w-4" />
                      {language === 'ar' ? 'الجنس' : 'Gender'}
                    </Label>
                    <Select value={gender} onValueChange={(v) => setGender(v as 'male' | 'female')}>
                      <SelectTrigger className={`${isRTL ? 'text-right [&>span]:text-right [&>span]:w-full' : 'text-left'}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className={isRTL ? '[&_*]:text-right' : ''}>
                        <SelectItem value="male" className={isRTL ? 'flex-row-reverse' : ''}>
                          {language === 'ar' ? 'ذكر' : 'Male'}
                        </SelectItem>
                        <SelectItem value="female" className={isRTL ? 'flex-row-reverse' : ''}>
                          {language === 'ar' ? 'أنثى' : 'Female'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Conditions */}
                <div className="space-y-2">
                  <Label className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Stethoscope className="h-4 w-4" />
                    {language === 'ar' ? 'الحالات الصحية وعوامل الخطر' : 'Health Conditions & Risk Factors'}
                  </Label>
                  <ScrollArea className="h-[180px] border rounded-lg p-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                      {conditions.map(condition => (
                        <label 
                          key={condition.id} 
                          htmlFor={`condition-${condition.id}`}
                          className={`flex items-center gap-3 p-3 min-h-[44px] rounded-md hover:bg-muted/50 cursor-pointer transition-colors select-none active:bg-muted ${isRTL ? 'flex-row-reverse' : ''} ${selectedConditions.includes(condition.id) ? 'bg-primary/10' : ''}`}
                        >
                          <Checkbox 
                            id={`condition-${condition.id}`}
                            checked={selectedConditions.includes(condition.id)}
                            onCheckedChange={() => toggleCondition(condition.id)}
                            className="shrink-0"
                          />
                          <span className={`text-sm leading-tight ${isRTL ? 'text-right' : 'text-left'}`}>
                            {language === 'ar' ? condition.nameAr : condition.nameEn}
                          </span>
                        </label>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                {/* Results Summary */}
                <div className={`p-4 rounded-lg ${selectedBeneficiaryInfo?.preventiveCovered ? (selectedBeneficiaryInfo?.isIndividualPolicy ? 'bg-info/5 border border-info/20' : 'bg-primary/5 border border-primary/20') : 'bg-destructive/5 border border-destructive/20'} ${isRTL ? 'text-right' : 'text-left'}`}>
                  {selectedBeneficiaryInfo?.isIndividualPolicy ? (
                    // Individual policy - show all services but no eligibility determination
                    <>
                      <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Info className="h-5 w-5 text-info" />
                        <span className="font-semibold text-info">
                          {language === 'ar' 
                            ? `${preventiveServices.length} خدمة وقائية متاحة للاطلاع`
                            : `${preventiveServices.length} preventive services available for reference`}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {language === 'ar'
                          ? 'الأهلية تعتمد على شروط وثيقتك الخاصة - راجع وثيقتك أو تواصل مع شركة التأمين للتأكد'
                          : 'Eligibility depends on your specific policy terms - review your policy or contact your insurer to confirm'}
                      </p>
                    </>
                  ) : selectedBeneficiaryInfo?.preventiveCovered ? (
                    <>
                      <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <Check className="h-5 w-5 text-green-500" />
                          <span className="font-semibold">
                            {language === 'ar' 
                              ? `أنت مؤهل لـ ${eligibleCount} خدمة وقائية`
                              : `You are eligible for ${eligibleCount} preventive services`}
                          </span>
                        </div>
                        <Button
                          onClick={handleExportPDF}
                          disabled={isExporting || eligibleCount === 0}
                          size="sm"
                          variant="outline"
                          className="gap-1.5 text-xs"
                        >
                          <Download className="h-3.5 w-3.5" />
                          {isExporting 
                            ? (language === 'ar' ? 'جاري التصدير...' : 'Exporting...')
                            : (language === 'ar' ? 'تصدير PDF' : 'Export PDF')}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {language === 'ar'
                          ? `بناءً على نوع التأمين (${selectedBeneficiaryInfo.nameAr}) - راجع القائمة لمعرفة الخدمات المغطاة`
                          : `Based on your insurance type (${selectedBeneficiaryInfo.nameEn}) - review the list for covered services`}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <XCircle className="h-5 w-5 text-destructive" />
                        <span className="font-semibold text-destructive">
                          {language === 'ar' 
                            ? 'الخدمات الوقائية غير مغطاة'
                            : 'Preventive Services Not Covered'}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {language === 'ar'
                          ? 'وثيقة الزيارة والسياحة تغطي حالات الطوارئ فقط (درجة الخطورة 1-3) ولا تشمل الخدمات الوقائية'
                          : 'Visitor/Tourist insurance covers emergency cases only (severity 1-3) and does not include preventive services'}
                      </p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Coverage Filter */}
            <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : 'justify-start'}`}>
              {coverageFilters.map(filter => (
                <Button
                  key={filter.id}
                  variant={selectedCoverage === filter.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCoverage(filter.id)}
                  className="text-xs gap-1.5"
                >
                  {language === 'ar' ? filter.nameAr : filter.nameEn}
                </Button>
              ))}
            </div>

            {/* Eligible Services List */}
            <div className="space-y-3">
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <h2 className="text-sm font-semibold">
                  {language === 'ar' ? 'الخدمات المتاحة لك' : 'Services Available to You'}
                </h2>
                <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Checkbox 
                    checked={showEligibleOnly}
                    onCheckedChange={(checked) => setShowEligibleOnly(checked as boolean)}
                    id="eligible-only"
                  />
                  <Label htmlFor="eligible-only" className="text-xs cursor-pointer">
                    {language === 'ar' ? 'إظهار المؤهل فقط' : 'Show eligible only'}
                  </Label>
                </div>
              </div>

              <div className="grid gap-3">
                {filteredServices.map(service => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-4">
            {/* Category and Coverage Filters */}
            <div className="space-y-3">
              <div className={`flex flex-wrap items-center gap-2 ${isRTL ? 'flex-row-reverse justify-start' : 'justify-start'}`}>
                <span className={`text-xs font-medium text-muted-foreground ${isRTL ? 'order-first' : ''}`}>
                  {language === 'ar' ? 'الفئة:' : 'Category:'}
                </span>
                {categories.map(cat => {
                  const CategoryIcon = getCategoryIcon(cat.id);
                  return (
                    <Button
                      key={cat.id}
                      variant={selectedCategory === cat.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(cat.id)}
                      className="text-xs gap-1.5"
                    >
                      <CategoryIcon className="h-3.5 w-3.5" />
                      {language === 'ar' ? cat.nameAr : cat.nameEn}
                    </Button>
                  );
                })}
              </div>
              <div className={`flex flex-wrap items-center gap-2 ${isRTL ? 'flex-row-reverse justify-start' : 'justify-start'}`}>
                <span className={`text-xs font-medium text-muted-foreground ${isRTL ? 'order-first' : ''}`}>
                  {language === 'ar' ? 'التغطية:' : 'Coverage:'}
                </span>
                {coverageFilters.map(filter => (
                  <Button
                    key={filter.id}
                    variant={selectedCoverage === filter.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCoverage(filter.id)}
                    className="text-xs gap-1.5"
                  >
                    {language === 'ar' ? filter.nameAr : filter.nameEn}
                  </Button>
                ))}
              </div>
            </div>

            {/* All Services Grid */}
            <div className="grid gap-3">
              {filteredServices.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-8">
                <Info className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'لا توجد خدمات تطابق الفلاتر المحددة' : 'No services match the selected filters'}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-4 mt-4">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <p className="text-[9px] sm:text-xs text-muted-foreground">
            {language === 'ar' 
              ? 'المعلومات مبنية على وثيقة مجلس الضمان الصحي وإرشادات منظمة الصحة العالمية'
              : 'Information based on CHI Policy and WHO guidelines'}
          </p>
          <p className="text-[8px] sm:text-[10px] text-muted-foreground mt-1">
            {language === 'ar' 
              ? '© 2024 دليل الخدمات الوقائية • مجلس الضمان الصحي • المملكة العربية السعودية'
              : '© 2024 Preventive Services Guide • CHI • Kingdom of Saudi Arabia'}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PreventiveServices;
