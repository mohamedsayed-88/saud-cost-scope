import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Package, 
  ArrowRight,
  ArrowLeft,
  Check,
  X,
  Building2,
  Wallet,
  Code2,
  Stethoscope,
  FileText,
  TrendingUp,
  Shield,
  Award,
  CheckCircle,
  BarChart3,
  Heart,
  Target,
  Calendar,
  AlertTriangle,
  Info,
  ClipboardCheck,
  Calculator,
  DollarSign,
  Activity
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  providerRequirements,
  payerRequirements,
  coderRequirements,
  physicianRequirements,
  cdsRequirements,
  drgBenefits,
  getRequirementsByCategory,
  calculateReadinessScore,
  type ReadinessCategory,
  type DRGRequirement
} from '@/data/drgRequirements';

// DRG Examples Data
interface DRGExample {
  id: string;
  nameAr: string;
  nameEn: string;
  diagnosisCode: string;
  diagnosisAr: string;
  diagnosisEn: string;
  drgCode: string;
  relativeWeight: number;
  lengthOfStay: number;
  ffsBreakdown: {
    labelAr: string;
    labelEn: string;
    cost: number;
  }[];
  ffsTotal: number;
  drgBaseRate: number;
  drgPayment: number;
  hasSurgery: boolean;
  surgeryCodeAr?: string;
  surgeryCodeEn?: string;
}

const drgExamples: DRGExample[] = [
  {
    id: 'pneumonia',
    nameAr: 'التهاب رئوي حاد',
    nameEn: 'Acute Pneumonia',
    diagnosisCode: 'J18.9',
    diagnosisAr: 'التهاب رئوي غير محدد',
    diagnosisEn: 'Pneumonia, unspecified organism',
    drgCode: 'E62B',
    relativeWeight: 0.85,
    lengthOfStay: 5,
    ffsBreakdown: [
      { labelAr: 'رسوم الغرفة', labelEn: 'Room charges', cost: 4000 },
      { labelAr: 'المضادات الحيوية', labelEn: 'IV Antibiotics', cost: 3500 },
      { labelAr: 'أشعة الصدر', labelEn: 'Chest X-rays', cost: 900 },
      { labelAr: 'فحوصات مخبرية', labelEn: 'Lab tests', cost: 1800 },
      { labelAr: 'زيارات الطبيب', labelEn: 'Physician visits', cost: 1500 },
      { labelAr: 'أدوية إضافية', labelEn: 'Additional meds', cost: 800 },
    ],
    ffsTotal: 12500,
    drgBaseRate: 10000,
    drgPayment: 8500,
    hasSurgery: false
  },
  {
    id: 'diabetes',
    nameAr: 'داء السكري مع مضاعفات',
    nameEn: 'Diabetes with Complications',
    diagnosisCode: 'E11.65',
    diagnosisAr: 'داء السكري من النوع الثاني مع فرط سكر الدم',
    diagnosisEn: 'Type 2 diabetes mellitus with hyperglycemia',
    drgCode: 'K60B',
    relativeWeight: 0.72,
    lengthOfStay: 4,
    ffsBreakdown: [
      { labelAr: 'رسوم الغرفة', labelEn: 'Room charges', cost: 3200 },
      { labelAr: 'الأنسولين والأدوية', labelEn: 'Insulin & medications', cost: 2800 },
      { labelAr: 'فحوصات مخبرية متكررة', labelEn: 'Repeated lab tests', cost: 2400 },
      { labelAr: 'استشارة أخصائي غدد', labelEn: 'Endocrinologist consult', cost: 1200 },
      { labelAr: 'تثقيف المريض', labelEn: 'Patient education', cost: 600 },
      { labelAr: 'مستلزمات السكري', labelEn: 'Diabetes supplies', cost: 800 },
    ],
    ffsTotal: 11000,
    drgBaseRate: 10000,
    drgPayment: 7200,
    hasSurgery: false
  },
  {
    id: 'appendectomy',
    nameAr: 'استئصال الزائدة الدودية',
    nameEn: 'Appendectomy',
    diagnosisCode: 'K35.80',
    diagnosisAr: 'التهاب الزائدة الدودية الحاد',
    diagnosisEn: 'Acute appendicitis, unspecified',
    drgCode: 'G07B',
    relativeWeight: 1.15,
    lengthOfStay: 3,
    ffsBreakdown: [
      { labelAr: 'رسوم غرفة العمليات', labelEn: 'Operating room fees', cost: 8000 },
      { labelAr: 'التخدير', labelEn: 'Anesthesia', cost: 3500 },
      { labelAr: 'رسوم الجراح', labelEn: 'Surgeon fees', cost: 5000 },
      { labelAr: 'رسوم الغرفة', labelEn: 'Room charges', cost: 2400 },
      { labelAr: 'المضادات الحيوية', labelEn: 'Antibiotics', cost: 1500 },
      { labelAr: 'فحوصات ما قبل الجراحة', labelEn: 'Pre-op tests', cost: 1600 },
    ],
    ffsTotal: 22000,
    drgBaseRate: 10000,
    drgPayment: 11500,
    hasSurgery: true,
    surgeryCodeAr: '47.09 - استئصال الزائدة بالمنظار',
    surgeryCodeEn: '47.09 - Laparoscopic appendectomy'
  },
  {
    id: 'hip-replacement',
    nameAr: 'استبدال مفصل الورك',
    nameEn: 'Total Hip Replacement',
    diagnosisCode: 'M16.11',
    diagnosisAr: 'فصال الورك الأولي الأيمن',
    diagnosisEn: 'Primary osteoarthritis, right hip',
    drgCode: 'I03B',
    relativeWeight: 2.85,
    lengthOfStay: 7,
    ffsBreakdown: [
      { labelAr: 'المفصل الصناعي', labelEn: 'Hip prosthesis', cost: 35000 },
      { labelAr: 'رسوم غرفة العمليات', labelEn: 'Operating room fees', cost: 15000 },
      { labelAr: 'التخدير', labelEn: 'Anesthesia', cost: 6000 },
      { labelAr: 'رسوم الجراح', labelEn: 'Surgeon fees', cost: 12000 },
      { labelAr: 'رسوم الغرفة', labelEn: 'Room charges', cost: 5600 },
      { labelAr: 'العلاج الطبيعي', labelEn: 'Physical therapy', cost: 3500 },
    ],
    ffsTotal: 77100,
    drgBaseRate: 10000,
    drgPayment: 28500,
    hasSurgery: true,
    surgeryCodeAr: '81.51 - استبدال مفصل الورك الكامل',
    surgeryCodeEn: '81.51 - Total hip replacement'
  }
];

const DRGImplementation = () => {
  const { language, isRTL } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<ReadinessCategory>('provider');
  const [selectedExample, setSelectedExample] = useState<string>('pneumonia');
  const [completedItems, setCompletedItems] = useState<Record<ReadinessCategory, string[]>>({
    provider: [],
    payer: [],
    coder: [],
    physician: [],
    cds: []
  });

  const currentExample = drgExamples.find(e => e.id === selectedExample) || drgExamples[0];
  const savings = currentExample.ffsTotal - currentExample.drgPayment;
  const savingsPercentage = Math.round((savings / currentExample.ffsTotal) * 100);

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const getIconForBenefit = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp': return TrendingUp;
      case 'Shield': return Shield;
      case 'Award': return Award;
      case 'CheckCircle': return CheckCircle;
      case 'BarChart3': return BarChart3;
      case 'Heart': return Heart;
      case 'Target': return Target;
      default: return CheckCircle;
    }
  };

  const getCategoryIcon = (category: ReadinessCategory) => {
    switch (category) {
      case 'provider': return Building2;
      case 'payer': return Wallet;
      case 'coder': return Code2;
      case 'physician': return Stethoscope;
      case 'cds': return FileText;
    }
  };

  const getCategoryName = (category: ReadinessCategory) => {
    switch (category) {
      case 'provider':
        return language === 'ar' ? 'مقدم الخدمة' : 'Provider';
      case 'payer':
        return language === 'ar' ? 'الدافع (التأمين)' : 'Payer (Insurance)';
      case 'coder':
        return language === 'ar' ? 'المرمز السريري' : 'Clinical Coder';
      case 'physician':
        return language === 'ar' ? 'الطبيب' : 'Physician';
      case 'cds':
        return language === 'ar' ? 'أخصائي التوثيق السريري' : 'CDS Specialist';
    }
  };

  const toggleItem = (itemId: string) => {
    setCompletedItems(prev => ({
      ...prev,
      [selectedCategory]: prev[selectedCategory].includes(itemId)
        ? prev[selectedCategory].filter(id => id !== itemId)
        : [...prev[selectedCategory], itemId]
    }));
  };

  const currentRequirements = getRequirementsByCategory(selectedCategory);
  const readinessResult = calculateReadinessScore(completedItems[selectedCategory], selectedCategory);

  const getReadinessColor = (level: string) => {
    switch (level) {
      case 'ready': return 'text-green-600 bg-green-100 dark:bg-green-950/50';
      case 'high': return 'text-blue-600 bg-blue-100 dark:bg-blue-950/50';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-950/50';
      case 'low': return 'text-red-600 bg-red-100 dark:bg-red-950/50';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getReadinessLabel = (level: string) => {
    switch (level) {
      case 'ready':
        return language === 'ar' ? 'جاهز للتطبيق' : 'Ready for Implementation';
      case 'high':
        return language === 'ar' ? 'جاهزية عالية' : 'High Readiness';
      case 'medium':
        return language === 'ar' ? 'جاهزية متوسطة' : 'Medium Readiness';
      case 'low':
        return language === 'ar' ? 'جاهزية منخفضة' : 'Low Readiness';
      default:
        return '';
    }
  };

  const categories: ReadinessCategory[] = ['provider', 'payer', 'coder', 'physician', 'cds'];

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />

      {/* Hero Section - Standardized */}
      <section className="relative py-6 sm:py-8 overflow-hidden gradient-hero">
        <div className="absolute inset-0 chi-pattern" />
        <div className="container mx-auto px-3 sm:px-4 relative">
          <div className={`flex items-center gap-3 mb-3 w-fit ${isRTL ? 'ml-auto' : ''}`}>
            <div className="p-2 rounded-lg bg-primary-foreground/10">
              <Package className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-primary-foreground">
              {language === 'ar' ? 'دليل الحزم التشخيصية' : 'DRG Implementation Guide'}
            </h1>
          </div>
          
          <p className={`text-xs sm:text-sm text-primary-foreground/85 max-w-2xl ${isRTL ? 'text-right ml-auto' : 'text-left'}`}>
            {language === 'ar' 
              ? 'تعرف على نظام الحزم التشخيصية AR-DRG وكيفية الاستعداد لتطبيقه في منشأتك الصحية'
              : 'Learn about AR-DRG system and how to prepare for implementation in your healthcare facility'}
          </p>
        </div>
      </section>

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-5xl">

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className={`grid w-full grid-cols-4 mb-4 ${isRTL ? 'direction-rtl' : ''}`} style={isRTL ? { direction: 'rtl' } : {}}>
            <TabsTrigger value="overview" className={`text-xs sm:text-sm flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Info className="h-4 w-4" />
              {language === 'ar' ? 'نظرة عامة' : 'Overview'}
            </TabsTrigger>
            <TabsTrigger value="calculator" className={`text-xs sm:text-sm flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Wallet className="h-4 w-4" />
              {language === 'ar' ? 'حاسبة DRG' : 'DRG Calculator'}
            </TabsTrigger>
            <TabsTrigger value="requirements" className={`text-xs sm:text-sm flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <FileText className="h-4 w-4" />
              {language === 'ar' ? 'المتطلبات' : 'Requirements'}
            </TabsTrigger>
            <TabsTrigger value="readiness" className={`text-xs sm:text-sm flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <ClipboardCheck className="h-4 w-4" />
              {language === 'ar' ? 'اختبار الجاهزية' : 'Readiness Test'}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            {/* What is AR-DRG */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className={`text-base sm:text-lg flex items-center gap-2 w-full ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Package className="h-5 w-5 text-primary" />
                  {language === 'ar' ? 'ما هي الحزم التشخيصية؟ (AR-DRG)' : 'What are AR-DRGs?'}
                </CardTitle>
              </CardHeader>
              <CardContent className={`space-y-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {language === 'ar' 
                    ? 'الحزم التشخيصية المحسّنة الأسترالية (AR-DRG) هي نظام تصنيف يجمع حالات الدخول للمستشفيات في مجموعات متشابهة سريرياً ومالياً بناءً على التشخيصات والإجراءات والعمر وعوامل أخرى تمثل الموارد المستخدمة. كل حزمة تشخيصية تعكس كثافة الموارد المطلوبة للعلاج.'
                    : 'Australian Refined Diagnosis Related Groups (AR-DRG) classify admitted hospital episodes into clinically and financially similar groups based on diagnoses, procedures, age, and other factors which represent the resources used. Each DRG reflects the resource intensity required for treatment.'}
                </p>
              </CardContent>
            </Card>

            {/* Detailed Timeline */}
            <Card className="border-primary/30">
              <CardHeader className="pb-3">
                <CardTitle className={`text-base sm:text-lg flex items-center gap-2 w-full ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Calendar className="h-5 w-5 text-primary" />
                  {language === 'ar' ? 'الجدول الزمني لتطبيق الحزم التشخيصية' : 'AR-DRG Implementation Timeline'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-xs text-muted-foreground mb-4 ${isRTL ? 'text-right' : ''}`}>
                  {language === 'ar' 
                    ? 'يتطلب تطبيق الحزم التشخيصية نهجاً مرحلياً يشمل سلسلة من الاختبارات والتجارب، يليها الفوترة الظلية ثم التطبيق الكامل'
                    : 'AR-DRG implementation requires a phased approach with series of testing and pilots, followed by shadow billing and full implementation'}
                </p>
                
                {/* Timeline */}
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute top-6 left-0 right-0 h-1 bg-gradient-to-r from-primary via-warning to-success rounded-full hidden sm:block" />
                  
                  {/* Timeline Items */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {/* 2021 */}
                    <div className="relative">
                      <div className="flex flex-col items-center mb-2">
                        <span className="text-xs font-bold text-primary mb-1">2021</span>
                        <div className="w-3 h-3 rounded-full bg-primary border-2 border-background shadow-sm z-10" />
                      </div>
                      <div className={`p-2 rounded-lg bg-primary/10 border border-primary/30 ${isRTL ? 'text-right' : 'text-left'}`}>
                        <h4 className="font-semibold text-[10px] text-primary mb-1">
                          {language === 'ar' ? 'بداية المشروع' : 'Initiation'}
                        </h4>
                        <ul className="text-[9px] text-muted-foreground space-y-0.5">
                          <li>• SBS V1</li>
                          <li>• {language === 'ar' ? 'مادة 11 AR-DRG' : 'AR-DRG Article 11'}</li>
                          <li>• {language === 'ar' ? 'الحد الأدنى من البيانات' : 'Minimum Data Set'}</li>
                        </ul>
                      </div>
                    </div>
                    
                    {/* 2022 */}
                    <div className="relative">
                      <div className="flex flex-col items-center mb-2">
                        <span className="text-xs font-bold text-primary mb-1">2022</span>
                        <div className="w-3 h-3 rounded-full bg-primary border-2 border-background shadow-sm z-10" />
                      </div>
                      <div className={`p-2 rounded-lg bg-primary/10 border border-primary/30 ${isRTL ? 'text-right' : 'text-left'}`}>
                        <h4 className="font-semibold text-[10px] text-primary mb-1">
                          {language === 'ar' ? 'الاستراتيجية' : 'Strategy'}
                        </h4>
                        <ul className="text-[9px] text-muted-foreground space-y-0.5">
                          <li>• {language === 'ar' ? 'تحديث SBS و AR-DRG' : 'Updating SBS & AR-DRG'}</li>
                          <li>• {language === 'ar' ? 'تطوير HIM' : 'HIM development'}</li>
                          <li>• {language === 'ar' ? 'استراتيجية VBHC' : 'VBHC strategy'}</li>
                        </ul>
                      </div>
                    </div>
                    
                    {/* 2023 */}
                    <div className="relative">
                      <div className="flex flex-col items-center mb-2">
                        <span className="text-xs font-bold text-primary mb-1">2023</span>
                        <div className="w-3 h-3 rounded-full bg-primary border-2 border-background shadow-sm z-10" />
                      </div>
                      <div className={`p-2 rounded-lg bg-primary/10 border border-primary/30 ${isRTL ? 'text-right' : 'text-left'}`}>
                        <h4 className="font-semibold text-[10px] text-primary mb-1">
                          {language === 'ar' ? 'التوعية والتثقيف' : 'Education'}
                        </h4>
                        <ul className="text-[9px] text-muted-foreground space-y-0.5">
                          <li>• {language === 'ar' ? 'حملات التوعية' : 'Awareness campaigns'}</li>
                          <li>• {language === 'ar' ? 'السعر المرجعي' : 'Market Reference Price'}</li>
                          <li>• SBS V2</li>
                        </ul>
                      </div>
                    </div>
                    
                    {/* 2024-2025 - Current */}
                    <div className="relative">
                      <div className="flex flex-col items-center mb-2">
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold text-warning mb-1">2024-25</span>
                          <Badge variant="destructive" className="text-[8px] px-1 py-0 h-4">
                            {language === 'ar' ? 'الآن' : 'Now'}
                          </Badge>
                        </div>
                        <div className="w-4 h-4 rounded-full bg-warning border-2 border-background shadow-lg z-10 animate-pulse" />
                      </div>
                      <div className={`p-2 rounded-lg bg-warning/20 border-2 border-warning ${isRTL ? 'text-right' : 'text-left'}`}>
                        <h4 className="font-semibold text-[10px] text-warning mb-1">
                          {language === 'ar' ? 'جاهزية السوق' : 'Market Readiness'}
                        </h4>
                        <ul className="text-[9px] text-muted-foreground space-y-0.5">
                          <li>• {language === 'ar' ? 'الفوترة الظلية الاسترجاعية' : 'Retrospective shadow billing'}</li>
                          <li>• SBS V3</li>
                          <li>• {language === 'ar' ? 'مسح الجاهزية' : 'Readiness Survey'}</li>
                        </ul>
                      </div>
                    </div>
                    
                    {/* 2026 */}
                    <div className="relative">
                      <div className="flex flex-col items-center mb-2">
                        <span className="text-xs font-bold text-success/70 mb-1">2026</span>
                        <div className="w-3 h-3 rounded-full bg-success/50 border-2 border-background shadow-sm z-10" />
                      </div>
                      <div className={`p-2 rounded-lg bg-success/10 border border-success/30 border-dashed ${isRTL ? 'text-right' : 'text-left'}`}>
                        <h4 className="font-semibold text-[10px] text-success mb-1">
                          {language === 'ar' ? 'الفوترة الظلية' : 'Shadow Billing'}
                        </h4>
                        <ul className="text-[9px] text-muted-foreground space-y-0.5">
                          <li>• {language === 'ar' ? 'جاهزية NPHIES' : 'NPHIES Readiness'}</li>
                          <li>• {language === 'ar' ? 'الفوترة الظلية الحية' : 'Live Shadow billing'}</li>
                          <li>• {language === 'ar' ? 'تجارب VBP' : 'VBP pilots'}</li>
                        </ul>
                      </div>
                    </div>
                    
                    {/* 2027 */}
                    <div className="relative">
                      <div className="flex flex-col items-center mb-2">
                        <span className="text-xs font-bold text-success/70 mb-1">2027</span>
                        <div className="w-3 h-3 rounded-full bg-success/50 border-2 border-background shadow-sm z-10" />
                      </div>
                      <div className={`p-2 rounded-lg bg-success/10 border border-success/30 border-dashed ${isRTL ? 'text-right' : 'text-left'}`}>
                        <h4 className="font-semibold text-[10px] text-success mb-1">
                          {language === 'ar' ? 'التطبيق الفعلي' : 'Full Implementation'}
                        </h4>
                        <ul className="text-[9px] text-muted-foreground space-y-0.5">
                          <li>• {language === 'ar' ? 'الفوترة بالحزم' : 'DRG-based billing'}</li>
                          <li>• {language === 'ar' ? 'مراقبة الجودة' : 'Quality monitoring'}</li>
                          <li>• {language === 'ar' ? 'الصيانة والتحسين' : 'Maintenance'}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className={`text-base sm:text-lg flex items-center gap-2 w-full ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Award className="h-5 w-5 text-primary" />
                  {language === 'ar' ? 'فوائد تطبيق الحزم التشخيصية' : 'Benefits of DRG Implementation'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {drgBenefits.map(benefit => {
                    const IconComponent = getIconForBenefit(benefit.icon);
                    return (
                      <div key={benefit.id} className={`p-3 rounded-lg border border-border hover:border-primary/50 transition-colors ${isRTL ? 'text-right' : 'text-left'}`}>
                        <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <div className="p-1.5 rounded-md bg-primary/10">
                            <IconComponent className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                        <h4 className="font-medium text-xs mb-1">
                          {language === 'ar' ? benefit.titleAr : benefit.titleEn}
                        </h4>
                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                          {language === 'ar' ? benefit.descriptionAr : benefit.descriptionEn}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* DRG Calculator Tab */}
          <TabsContent value="calculator" className="space-y-4">
            <Card className="border-primary/30">
              <CardHeader className="pb-3">
                <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                  <CardTitle className={`text-base sm:text-lg flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Calculator className="h-5 w-5 text-primary" />
                    {language === 'ar' ? 'حاسبة مقارنة التكاليف' : 'Cost Comparison Calculator'}
                  </CardTitle>
                  
                  {/* Example Selector */}
                  <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : ''}`}>
                    {drgExamples.map(example => {
                      const exampleSavings = example.ffsTotal - example.drgPayment;
                      const exampleSavingsPercent = Math.round((exampleSavings / example.ffsTotal) * 100);
                      return (
                        <Button
                          key={example.id}
                          variant={selectedExample === example.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedExample(example.id)}
                          className={`text-xs flex flex-col items-center py-2 h-auto ${selectedExample === example.id ? '' : 'hover:bg-primary/10'}`}
                        >
                          <span className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            {example.hasSurgery && <Stethoscope className="h-3 w-3" />}
                            {language === 'ar' ? example.nameAr : example.nameEn}
                          </span>
                          <span className={`text-[10px] ${selectedExample === example.id ? 'text-primary-foreground/80' : 'text-success'} font-mono`}>
                            {language === 'ar' ? `توفير ${exampleSavingsPercent}%` : `${exampleSavingsPercent}% savings`}
                          </span>
                        </Button>
                      );
                    })}
                  </div>
                </div>
                <CardDescription className={isRTL ? 'text-right' : ''}>
                  {language === 'ar' 
                    ? 'مقارنة بين نظام الدفع مقابل الخدمة ونظام الحزم التشخيصية (DRG)'
                    : 'Comparison between Fee-for-Service and DRG payment systems'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Case Details */}
                <div className={`p-4 rounded-lg bg-muted/50 border ${isRTL ? 'text-right' : ''}`}>
                  <h4 className={`font-semibold mb-3 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Activity className="h-4 w-4 text-primary" />
                    {language === 'ar' ? 'تفاصيل الحالة' : 'Case Details'}
                    {currentExample.hasSurgery && (
                      <Badge variant="secondary" className="text-[10px]">
                        {language === 'ar' ? 'إجراء جراحي' : 'Surgical'}
                      </Badge>
                    )}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">{language === 'ar' ? 'التشخيص:' : 'Diagnosis:'}</span>
                      <p className="font-medium">{currentExample.diagnosisCode}</p>
                      <p className="text-xs text-muted-foreground">{language === 'ar' ? currentExample.diagnosisAr : currentExample.diagnosisEn}</p>
                    </div>
                    {currentExample.hasSurgery && (
                      <div>
                        <span className="text-muted-foreground">{language === 'ar' ? 'الإجراء:' : 'Procedure:'}</span>
                        <p className="font-medium text-xs">{language === 'ar' ? currentExample.surgeryCodeAr : currentExample.surgeryCodeEn}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-muted-foreground">{language === 'ar' ? 'مدة الإقامة:' : 'Length of Stay:'}</span>
                      <p className="font-medium">{currentExample.lengthOfStay} {language === 'ar' ? 'أيام' : 'days'}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">{language === 'ar' ? 'الحزمة التشخيصية:' : 'DRG Code:'}</span>
                      <p className="font-medium">{currentExample.drgCode}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">{language === 'ar' ? 'الوزن النسبي:' : 'Relative Weight:'}</span>
                      <p className="font-medium">{currentExample.relativeWeight}</p>
                    </div>
                  </div>
                </div>

                {/* Payment Comparison - Side by Side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Fee-for-Service Breakdown */}
                  <Card className="border-destructive/30 bg-destructive/5">
                    <CardHeader className="pb-2">
                    <CardTitle className={`text-sm flex items-center gap-2 text-destructive w-full ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <DollarSign className="h-4 w-4" />
                      {language === 'ar' ? 'الدفع مقابل الخدمة' : 'Fee-for-Service'}
                    </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1.5 text-xs">
                        {currentExample.ffsBreakdown.map((item, index) => (
                          <div key={index} className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <span>{language === 'ar' ? item.labelAr : item.labelEn}</span>
                            <span className="font-mono">{item.cost.toLocaleString()}</span>
                          </div>
                        ))}
                        <div className={`flex justify-between pt-2 border-t font-bold text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <span>{language === 'ar' ? 'الإجمالي' : 'Total'}</span>
                          <span className="font-mono text-destructive">{currentExample.ffsTotal.toLocaleString()} {language === 'ar' ? 'ر.س' : 'SAR'}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* DRG Payment */}
                  <Card className="border-success/30 bg-success/5">
                    <CardHeader className="pb-2">
                    <CardTitle className={`text-sm flex items-center gap-2 text-success w-full ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Package className="h-4 w-4" />
                      {language === 'ar' ? 'الحزمة التشخيصية' : 'DRG Payment'}
                    </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1.5 text-xs">
                        <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <span>{language === 'ar' ? 'السعر الأساسي للحزمة' : 'Base DRG Rate'}</span>
                          <span className="font-mono">{currentExample.drgBaseRate.toLocaleString()}</span>
                        </div>
                        <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <span>{language === 'ar' ? `الوزن النسبي (${currentExample.drgCode})` : `Relative Weight (${currentExample.drgCode})`}</span>
                          <span className="font-mono">× {currentExample.relativeWeight}</span>
                        </div>
                        <div className={`flex justify-between pt-2 border-t font-bold text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <span>{language === 'ar' ? 'الدفع الثابت' : 'Fixed Payment'}</span>
                          <span className="font-mono text-success">{currentExample.drgPayment.toLocaleString()} {language === 'ar' ? 'ر.س' : 'SAR'}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Comparison Summary */}
                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-center`}>
                    <p className="text-xs text-muted-foreground mb-1">
                      {language === 'ar' ? 'الدفع مقابل الخدمة' : 'Fee-for-Service'}
                    </p>
                    <p className="text-2xl font-bold text-destructive font-mono">{currentExample.ffsTotal.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{language === 'ar' ? 'ر.س' : 'SAR'}</p>
                  </div>
                  <div className={`p-4 rounded-lg bg-success/10 border border-success/30 text-center`}>
                    <p className="text-xs text-muted-foreground mb-1">
                      {language === 'ar' ? 'الحزمة التشخيصية' : 'DRG Payment'}
                    </p>
                    <p className="text-2xl font-bold text-success font-mono">{currentExample.drgPayment.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{language === 'ar' ? 'ر.س' : 'SAR'}</p>
                  </div>
                </div>

                {/* Savings */}
                <div className={`p-4 rounded-lg bg-primary/10 border border-primary/30 text-center`}>
                  <p className="text-sm font-medium mb-1">
                    {language === 'ar' ? 'التوفير المحتمل للدافع' : 'Potential Payer Savings'}
                  </p>
                  <p className="text-3xl font-bold text-primary font-mono">{savings.toLocaleString()} {language === 'ar' ? 'ر.س' : 'SAR'}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    ({savingsPercentage}% {language === 'ar' ? 'من تكلفة الدفع مقابل الخدمة' : 'of Fee-for-Service cost'})
                  </p>
                </div>

                {/* Key Insights */}
                <Card className="bg-muted/30">
                  <CardContent className="pt-4">
                    <h4 className={`font-medium mb-3 ${isRTL ? 'text-right' : ''}`}>
                      {language === 'ar' ? 'الفوائد الرئيسية' : 'Key Benefits'}
                    </h4>
                    <ul className="space-y-2 text-xs text-muted-foreground">
                      <li className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                        <CheckCircle className="h-3.5 w-3.5 text-success mt-0.5 shrink-0" />
                        {language === 'ar' 
                          ? 'دفع ثابت ومتوقع للمستشفى بغض النظر عن عدد الخدمات'
                          : 'Fixed, predictable payment regardless of services provided'}
                      </li>
                      <li className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                        <CheckCircle className="h-3.5 w-3.5 text-success mt-0.5 shrink-0" />
                        {language === 'ar' 
                          ? 'يحفز المستشفى على الكفاءة وتقليل الإقامة غير الضرورية'
                          : 'Incentivizes hospital efficiency and reduces unnecessary stays'}
                      </li>
                      <li className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                        <CheckCircle className="h-3.5 w-3.5 text-success mt-0.5 shrink-0" />
                        {language === 'ar' 
                          ? 'يقلل من الاستخدام المفرط للخدمات والفحوصات'
                          : 'Reduces overutilization of services and tests'}
                      </li>
                      <li className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                        <CheckCircle className="h-3.5 w-3.5 text-success mt-0.5 shrink-0" />
                        {language === 'ar' 
                          ? 'يسهل مقارنة الأداء بين المستشفيات'
                          : 'Facilitates performance benchmarking between hospitals'}
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Requirements Tab */}
          <TabsContent value="requirements" className="space-y-4">
            {/* Category Selector */}
            <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : 'justify-start'}`}>
              {categories.map(cat => {
                const CategoryIcon = getCategoryIcon(cat);
                return (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                    className="text-xs gap-1.5"
                  >
                    <CategoryIcon className="h-3.5 w-3.5" />
                    {getCategoryName(cat)}
                  </Button>
                );
              })}
            </div>

            {/* Requirements List */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className={`text-base sm:text-lg flex items-center gap-2 w-full ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {(() => {
                    const Icon = getCategoryIcon(selectedCategory);
                    return <Icon className="h-5 w-5 text-primary" />;
                  })()}
                  {language === 'ar' ? `متطلبات ${getCategoryName(selectedCategory)}` : `${getCategoryName(selectedCategory)} Requirements`}
                </CardTitle>
                <CardDescription>
                  {language === 'ar' 
                    ? 'جميع المتطلبات التالية إلزامية للاستعداد لتطبيق الحزم التشخيصية'
                    : 'All following requirements are mandatory for DRG implementation readiness'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentRequirements.map(req => (
                    <div 
                      key={req.id} 
                      className={`p-3 rounded-lg border border-border hover:border-primary/30 transition-colors ${isRTL ? 'text-right' : 'text-left'}`}
                    >
                      <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="p-1.5 rounded-md bg-primary/10 mt-0.5">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm mb-1">
                            {language === 'ar' ? req.nameAr : req.nameEn}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {language === 'ar' ? req.descriptionAr : req.descriptionEn}
                          </p>
                          <Badge variant="outline" className="mt-2 text-[10px]">
                            {req.mandatory 
                              ? (language === 'ar' ? 'إلزامي' : 'Mandatory')
                              : (language === 'ar' ? 'اختياري' : 'Optional')}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Readiness Test Tab */}
          <TabsContent value="readiness" className="space-y-4">
            <Card className="border-primary/30">
              <CardHeader className="pb-3">
                <CardTitle className={`text-base sm:text-lg flex items-center gap-2 w-full ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <ClipboardCheck className="h-5 w-5 text-primary" />
                  {language === 'ar' ? 'اختبار جاهزية تطبيق الحزم التشخيصية' : 'DRG Implementation Readiness Test'}
                </CardTitle>
                <CardDescription>
                  {language === 'ar' 
                    ? 'حدد المتطلبات المكتملة في منشأتك لمعرفة مستوى الجاهزية'
                    : 'Select completed requirements in your facility to determine readiness level'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Category Selector */}
                <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                  {categories.map(cat => {
                    const CategoryIcon = getCategoryIcon(cat);
                    const catResult = calculateReadinessScore(completedItems[cat], cat);
                    return (
                      <Button
                        key={cat}
                        variant={selectedCategory === cat ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedCategory(cat)}
                        className="text-xs gap-1.5"
                      >
                        <CategoryIcon className="h-3.5 w-3.5" />
                        {getCategoryName(cat)}
                        <Badge variant="secondary" className="text-[9px] ml-1">
                          {catResult.percentage}%
                        </Badge>
                      </Button>
                    );
                  })}
                </div>

                {/* Readiness Score */}
                <div className={`p-4 rounded-lg ${getReadinessColor(readinessResult.level)}`}>
                  <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="font-semibold">
                      {language === 'ar' ? 'مستوى الجاهزية:' : 'Readiness Level:'}
                    </span>
                    <Badge className={getReadinessColor(readinessResult.level)}>
                      {getReadinessLabel(readinessResult.level)}
                    </Badge>
                  </div>
                  <Progress value={readinessResult.percentage} className="h-3 mb-2" />
                  <p className={`text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
                    {language === 'ar' 
                      ? `${readinessResult.score} من ${readinessResult.total} متطلب مكتمل (${readinessResult.percentage}%)`
                      : `${readinessResult.score} of ${readinessResult.total} requirements completed (${readinessResult.percentage}%)`}
                  </p>
                </div>

                {/* Checklist */}
                <ScrollArea className="h-[400px] border rounded-lg p-3">
                  <div className="space-y-2">
                    {currentRequirements.map(req => (
                      <div 
                        key={req.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          completedItems[selectedCategory].includes(req.id)
                            ? 'border-green-500 bg-green-50/50 dark:bg-green-950/20'
                            : 'border-border hover:border-primary/30'
                        }`}
                        onClick={() => toggleItem(req.id)}
                      >
                        <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <Checkbox 
                            checked={completedItems[selectedCategory].includes(req.id)}
                            onCheckedChange={() => toggleItem(req.id)}
                            className="mt-0.5"
                          />
                          <div className="flex-1">
                            <h4 className={`font-medium text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
                              {language === 'ar' ? req.nameAr : req.nameEn}
                            </h4>
                            <p className={`text-xs text-muted-foreground mt-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                              {language === 'ar' ? req.descriptionAr : req.descriptionEn}
                            </p>
                          </div>
                          {completedItems[selectedCategory].includes(req.id) && (
                            <Check className="h-5 w-5 text-green-500 shrink-0" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Summary */}
                {readinessResult.percentage < 100 && (
                  <div className={`p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      <span className="font-semibold text-yellow-700 dark:text-yellow-400">
                        {language === 'ar' ? 'متطلبات غير مكتملة' : 'Incomplete Requirements'}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {language === 'ar' 
                        ? `يجب إكمال ${readinessResult.total - readinessResult.score} متطلب إضافي للوصول إلى الجاهزية الكاملة. مرحلة الفوترة الظلية تبدأ في 2026.`
                        : `${readinessResult.total - readinessResult.score} more requirements need to be completed for full readiness. Shadow billing phase starts in 2026.`}
                    </p>
                  </div>
                )}

                {readinessResult.percentage === 100 && (
                  <div className={`p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-semibold text-green-700 dark:text-green-400">
                        {language === 'ar' ? 'جاهز للتطبيق!' : 'Ready for Implementation!'}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {language === 'ar' 
                        ? 'تهانينا! منشأتك جاهزة لتطبيق الحزم التشخيصية في هذه الفئة.'
                        : 'Congratulations! Your facility is ready for DRG implementation in this category.'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-4 mt-4">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <p className="text-[9px] sm:text-xs text-muted-foreground">
            {language === 'ar' 
              ? 'المعلومات مبنية على دليل تطبيق AR-DRG للقطاع الصحي السعودي - مجلس الضمان الصحي'
              : 'Information based on AR-DRG Implementation Guide for the Saudi Healthcare Sector - CHI'}
          </p>
          <p className="text-[8px] sm:text-[10px] text-muted-foreground mt-1">
            {language === 'ar' 
              ? '© 2024 دليل الحزم التشخيصية • المملكة العربية السعودية'
              : '© 2024 DRG Implementation Guide • Kingdom of Saudi Arabia'}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DRGImplementation;
