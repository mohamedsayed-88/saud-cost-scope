import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  ArrowLeft, ArrowRight, Heart, Stethoscope, Users, Building2, 
  CheckCircle2, XCircle, Info, Award, DollarSign, Shield,
  Activity, Laptop, UserCheck, ClipboardCheck, FileCheck, Mail, 
  Calendar, FileText, Upload, Eye, MapPin, ExternalLink
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  primaryCareServices, 
  classificationCriteria, 
  copaymentStructure,
  getCriteriaByDomain,
  calculateClassification,
  classificationScoring
} from '@/data/primaryCareData';
import saudiRiyalSymbol from '@/assets/saudi-riyal-symbol.png';

// Saudi Riyal Symbol Component
const SARSymbol = ({ className = "h-4 w-4" }: { className?: string }) => (
  <img src={saudiRiyalSymbol} alt="SAR" className={`inline-block ${className}`} />
);

const PrimaryCare = () => {
  const { language, isRTL } = useLanguage();
  const [selectedCriteria, setSelectedCriteria] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('overview');

  const toggleCriteria = (id: string) => {
    setSelectedCriteria(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const classification = calculateClassification(selectedCriteria);

  const getDomainIcon = (domain: string) => {
    switch (domain) {
      case 'services': return Activity;
      case 'workforce': return Users;
      case 'technology': return Laptop;
      case 'quality': return ClipboardCheck;
      default: return CheckCircle2;
    }
  };

  const getDomainLabel = (domain: string) => {
    const labels: Record<string, { ar: string; en: string }> = {
      services: { ar: 'نطاق الخدمات', en: 'Scope of Services' },
      workforce: { ar: 'القوى العاملة', en: 'Workforce' },
      technology: { ar: 'التقنية', en: 'Technology' },
      quality: { ar: 'الجودة والوصول', en: 'Quality & Access' }
    };
    return language === 'ar' ? labels[domain]?.ar : labels[domain]?.en;
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
              <Stethoscope className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-primary-foreground">
              {language === 'ar' ? 'تعزيز الرعاية الأولية' : 'Enhanced Primary Care'}
            </h1>
          </div>
          
          <p className={`text-xs sm:text-sm text-primary-foreground/85 max-w-2xl ${isRTL ? 'text-right ml-auto' : 'text-left'}`}>
            {language === 'ar' 
              ? 'مبادرة مجلس الضمان الصحي لتعزيز الرعاية الأولية في القطاع الخاص وتصنيف مقدمي الخدمة واعتمادهم'
              : "CHI's initiative to enhance primary care in the private sector through provider classification and accreditation"}
          </p>
        </div>
      </section>

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-5xl">

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 w-full mb-4" style={isRTL ? { direction: 'rtl' } : {}}>
            <TabsTrigger value="overview" className="text-xs flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5" />
              {language === 'ar' ? 'نظرة عامة' : 'Overview'}
            </TabsTrigger>
            <TabsTrigger value="copayment" className="text-xs flex items-center gap-1.5">
              <DollarSign className="h-3.5 w-3.5" />
              {language === 'ar' ? 'نسب التحمل' : 'Copayment'}
            </TabsTrigger>
            <TabsTrigger value="classification" className="text-xs flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5" />
              {language === 'ar' ? 'التصنيف' : 'Classification'}
            </TabsTrigger>
            <TabsTrigger value="accreditation" className="text-xs flex items-center gap-1.5">
              <FileCheck className="h-3.5 w-3.5" />
              {language === 'ar' ? 'إجراءات الاعتماد' : 'Accreditation'}
            </TabsTrigger>
            <TabsTrigger value="assessment" className="text-xs flex items-center gap-1.5">
              <ClipboardCheck className="h-3.5 w-3.5" />
              {language === 'ar' ? 'تقييم الجاهزية' : 'Assessment'}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            {/* Definition Card */}
            <Card className="border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className={`text-base flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Heart className="h-4 w-4 text-destructive" />
                  {language === 'ar' ? 'ما هي الرعاية الأولية؟' : 'What is Primary Care?'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-sm text-muted-foreground leading-relaxed ${isRTL ? 'text-right' : ''}`}>
                  {language === 'ar' 
                    ? 'الرعاية الأولية هي نقطة الاتصال الأولى للأفراد مع النظام الصحي، يقودها طبيب طب الأسرة، وتقدم رعاية شاملة تشمل إدارة الأمراض الحادة والمزمنة، والفحوصات الوقائية، والتطعيمات، والتثقيف الصحي، مع تنسيق الرعاية والإحالات عند الحاجة.'
                    : 'Primary care is the first contact point for individuals with the healthcare system, led by a Family Medicine physician, offering holistic care including acute and chronic disease management, preventive screenings, immunizations, and health education, with care coordination and referrals.'}
                </p>
              </CardContent>
            </Card>

            {/* Why Primary Care */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base w-full">
                  {language === 'ar' ? 'لماذا الرعاية الأولية؟' : 'Why Primary Care?'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert className="mb-4 border-primary/30 bg-primary/5">
                  <Info className="h-4 w-4" />
                  <AlertDescription className="text-xs font-medium">
                    {language === 'ar' 
                      ? '80% من المستخدمين الذين يحتاجون رعاية صحية يمكن تلبية احتياجاتهم بالكامل من خلال الرعاية الأولية'
                      : '80% of users who need healthcare can have their needs fully met through primary care'}
                  </AlertDescription>
                </Alert>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-4 bg-primary/10 rounded-lg border-2 border-primary/30">
                    <div className="text-3xl font-bold text-primary">80%</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {language === 'ar' ? 'يكفيهم الرعاية الأولية' : 'Primary care sufficient'}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-3xl font-bold text-muted-foreground">20%</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {language === 'ar' ? 'يحتاجون رعاية تخصصية أو ثالثية' : 'Need specialist/tertiary care'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Global Statistics on Primary Care Needs */}
            <Card className="border-info/20 bg-info/5">
              <CardHeader className="pb-2">
                <CardTitle className={`text-base flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Activity className="h-4 w-4 text-info" />
                  {language === 'ar' ? 'توزيع الاحتياجات الصحية عالمياً' : 'Global Healthcare Needs Distribution'}
                </CardTitle>
                <CardDescription className={isRTL ? 'text-right' : 'text-left'}>
                  {language === 'ar' 
                    ? 'بناءً على دراسات منظمة الصحة العالمية والأبحاث الطبية المعتمدة'
                    : 'Based on WHO studies and peer-reviewed medical research'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Distribution Chart */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="font-medium text-success">
                        {language === 'ar' ? 'الرعاية الأولية' : 'Primary Care'}
                      </span>
                      <span className="font-bold text-success">80-85%</span>
                    </div>
                    <Progress value={82.5} className="h-3 bg-muted" />
                    <p className={`text-xs text-muted-foreground ${isRTL ? 'text-right' : ''}`}>
                      {language === 'ar' 
                        ? 'الأمراض الشائعة، الحالات المزمنة، الوقاية، التثقيف الصحي'
                        : 'Common illnesses, chronic conditions, prevention, health education'}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="font-medium text-warning">
                        {language === 'ar' ? 'الرعاية التخصصية' : 'Specialist Care'}
                      </span>
                      <span className="font-bold text-warning">10-15%</span>
                    </div>
                    <Progress value={12.5} className="h-3 bg-muted" />
                    <p className={`text-xs text-muted-foreground ${isRTL ? 'text-right' : ''}`}>
                      {language === 'ar' 
                        ? 'الحالات المعقدة التي تتطلب تدخل متخصص'
                        : 'Complex cases requiring specialist intervention'}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="font-medium text-destructive">
                        {language === 'ar' ? 'الرعاية الثالثية/المستشفيات' : 'Tertiary/Hospital Care'}
                      </span>
                      <span className="font-bold text-destructive">3-5%</span>
                    </div>
                    <Progress value={4} className="h-3 bg-muted" />
                    <p className={`text-xs text-muted-foreground ${isRTL ? 'text-right' : ''}`}>
                      {language === 'ar' 
                        ? 'الحالات الحرجة، العمليات الجراحية الكبرى، العناية المركزة'
                        : 'Critical cases, major surgeries, intensive care'}
                    </p>
                  </div>
                </div>

                {/* Source Citation */}
                <div className={`p-3 rounded-lg bg-background/50 border ${isRTL ? 'text-right' : ''}`}>
                  <p className="text-xs font-semibold text-foreground mb-2">
                    {language === 'ar' ? 'المصادر العلمية:' : 'Scientific Sources:'}
                  </p>
                  <ul className={`text-xs text-muted-foreground space-y-1 ${isRTL ? 'pr-4' : 'pl-4'}`}>
                    <li className={`flex items-start gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-primary">•</span>
                      <span>
                        {language === 'ar' 
                          ? 'منظمة الصحة العالمية (WHO): تقرير الرعاية الصحية الأولية 2018 - "Declaration of Astana"'
                          : 'World Health Organization (WHO): Primary Health Care Report 2018 - "Declaration of Astana"'}
                      </span>
                    </li>
                    <li className={`flex items-start gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-primary">•</span>
                      <span>
                        {language === 'ar' 
                          ? 'Starfield B, et al. (2005): "Contribution of Primary Care to Health Systems and Health" - Milbank Quarterly'
                          : 'Starfield B, et al. (2005): "Contribution of Primary Care to Health Systems and Health" - Milbank Quarterly'}
                      </span>
                    </li>
                    <li className={`flex items-start gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-primary">•</span>
                      <span>
                        {language === 'ar' 
                          ? 'Green LA, et al. (2001): "The Ecology of Medical Care Revisited" - New England Journal of Medicine'
                          : 'Green LA, et al. (2001): "The Ecology of Medical Care Revisited" - New England Journal of Medicine'}
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Key Finding */}
                <Alert className="border-success/30 bg-success/5">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <AlertDescription className={`text-xs ${isRTL ? 'text-right mr-2' : 'ml-2'}`}>
                    {language === 'ar' 
                      ? 'وجدت دراسة Green et al. أنه من كل 1000 شخص شهرياً: 800 يعانون من أعراض، 327 يفكرون في زيارة طبيب، 217 يزورون طبيب، فقط 8 يحتاجون تنويم بالمستشفى، و1 فقط يحتاج مركز طبي متخصص.'
                      : "Green et al. study found that per 1000 people monthly: 800 experience symptoms, 327 consider visiting a doctor, 217 visit a physician, only 8 need hospital admission, and only 1 needs a specialized medical center."}
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Services Grid */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base w-full">
                  {language === 'ar' ? 'خدمات الرعاية الأولية' : 'Primary Care Services'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {['clinical', 'prevention', 'population', 'ancillary'].map(category => {
                    const categoryServices = primaryCareServices.filter(s => s.category === category);
                    const categoryLabels: Record<string, { ar: string; en: string; color: string }> = {
                      clinical: { ar: 'الخدمات السريرية', en: 'Clinical Services', color: 'bg-info' },
                      prevention: { ar: 'الوقاية والعافية', en: 'Prevention & Wellness', color: 'bg-success' },
                      population: { ar: 'إدارة صحة السكان', en: 'Population Health', color: 'bg-warning' },
                      ancillary: { ar: 'الخدمات المساندة', en: 'Ancillary Services', color: 'bg-secondary' }
                    };
                    return (
                      <div key={category} className={`border rounded-lg p-3 ${isRTL ? 'text-right' : ''}`}>
                        <Badge className={`${categoryLabels[category].color} text-primary-foreground mb-2`}>
                          {language === 'ar' ? categoryLabels[category].ar : categoryLabels[category].en}
                        </Badge>
                        <ul className="space-y-1">
                          {categoryServices.map(service => (
                            <li key={service.id} className={`text-xs text-muted-foreground flex items-start gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <CheckCircle2 className="h-3 w-3 text-success mt-0.5 shrink-0" />
                              {language === 'ar' ? service.nameAr : service.nameEn}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Users, ar: 'للمستفيدين', en: 'For Beneficiaries', descAr: 'تنسيق أفضل للرعاية وأوقات انتظار أقل', descEn: 'Better care coordination and reduced waiting times' },
                { icon: Building2, ar: 'لمقدمي الخدمة', en: 'For Providers', descAr: 'استبقاء أعلى للمرضى ورضا وظيفي', descEn: 'Higher patient retention and job satisfaction' },
                { icon: Shield, ar: 'لشركات التأمين', en: 'For Payors', descAr: 'خفض التكاليف عبر الرعاية الوقائية', descEn: 'Cost reduction through preventive care' },
                { icon: Building2, ar: 'لأصحاب العمل', en: 'For Employers', descAr: 'قوى عاملة أكثر صحة وإنتاجية', descEn: 'Healthier and more productive workforce' }
              ].map((benefit, index) => (
                <Card key={index}>
                  <CardContent className="pt-4 pb-3 flex flex-col items-center justify-center text-center">
                    <benefit.icon className="h-6 w-6 mb-2 text-primary" />
                    <p className="text-xs font-medium w-full text-center">{language === 'ar' ? benefit.ar : benefit.en}</p>
                    <p className="text-[10px] text-muted-foreground mt-1 w-full text-center">
                      {language === 'ar' ? benefit.descAr : benefit.descEn}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Copayment Tab */}
          <TabsContent value="copayment" className="space-y-4">
            <Alert className={`border-primary/30 bg-primary/5 ${isRTL ? 'text-right' : ''}`}>
              <Info className="h-4 w-4" />
              <AlertTitle className={`text-sm ${isRTL ? 'text-right' : ''}`}>
                {language === 'ar' ? 'تعديل نسب التحمل' : 'Copayment Modification'}
              </AlertTitle>
              <AlertDescription className={`text-xs ${isRTL ? 'text-right' : ''}`}>
                {language === 'ar' 
                  ? 'يهدف المجلس لتعديل نسب التحمل لتشجيع المستفيدين على استخدام الرعاية الأولية أولاً، مما يخفف الضغط على المستشفيات ويحسن كفاءة النظام الصحي.'
                  : 'CHI aims to modify copayment structure to encourage beneficiaries to use primary care first, reducing strain on hospitals and improving healthcare system efficiency.'}
              </AlertDescription>
            </Alert>

            <div className="grid gap-3">
              {copaymentStructure.map((item, index) => (
                <Card key={index} className={`${
                  item.copaymentPercentage === 0 ? 'border-success/30 bg-success/5' : 
                  item.copaymentPercentage >= 20 ? 'border-destructive/30 bg-destructive/5' : ''
                }`}>
                  <CardContent className="py-4">
                    <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className={`p-2 rounded-lg ${
                          item.copaymentPercentage === 0 ? 'bg-success/20' : 'bg-destructive/20'
                        }`}>
                          <DollarSign className={`h-5 w-5 ${
                            item.copaymentPercentage === 0 ? 'text-success' : 'text-destructive'
                          }`} />
                        </div>
                        <div className={isRTL ? 'text-right' : 'text-left'}>
                          <p className="text-sm font-medium">
                            {language === 'ar' ? item.nameAr : item.nameEn}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {language === 'ar' ? item.descriptionAr : item.descriptionEn}
                          </p>
                        </div>
                      </div>
                      <Badge variant={item.copaymentPercentage === 0 ? 'default' : 'destructive'} className="text-lg px-3 py-1">
                        {item.copaymentPercentage}%
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Illustrative Example */}
            <Card className="border-primary/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2 w-full">
                  <Activity className="h-4 w-4 text-primary" />
                  {language === 'ar' ? 'مثال توضيحي: حالة آلام الظهر' : 'Example: Back Pain Case'}
                </CardTitle>
                <CardDescription className={isRTL ? 'text-right' : ''}>
                  {language === 'ar' 
                    ? 'مقارنة التكلفة بين مسارين مختلفين للعلاج'
                    : 'Cost comparison between two different treatment pathways'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Scenario 1: Direct to Specialist */}
                  <div className="p-4 rounded-lg border-2 border-destructive/30 bg-destructive/5">
                  <h4 className={`font-bold text-destructive mb-3 flex items-center gap-2 w-full ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                    <XCircle className="h-4 w-4" />
                    {language === 'ar' ? 'المسار الأول: الذهاب مباشرة للتخصصي' : 'Path 1: Direct to Specialist'}
                  </h4>
                  <div className={`space-y-2 text-sm ${isRTL ? 'text-right' : ''}`}>
                    <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span>{language === 'ar' ? 'استشارة طبيب عظام' : 'Orthopedic consultation'}</span>
                      <span className="font-mono">300 {language === 'ar' ? 'ر.س' : 'SAR'}</span>
                    </div>
                    <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span>{language === 'ar' ? 'أشعة سينية' : 'X-Ray'}</span>
                      <span className="font-mono">200 {language === 'ar' ? 'ر.س' : 'SAR'}</span>
                    </div>
                    <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span>{language === 'ar' ? 'أشعة رنين مغناطيسي' : 'MRI Scan'}</span>
                      <span className="font-mono">1,500 {language === 'ar' ? 'ر.س' : 'SAR'}</span>
                    </div>
                    <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span>{language === 'ar' ? 'أدوية (مسكنات + مرخي عضلات)' : 'Medications'}</span>
                      <span className="font-mono">250 {language === 'ar' ? 'ر.س' : 'SAR'}</span>
                    </div>
                    <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span>{language === 'ar' ? 'جلسات علاج طبيعي (6 جلسات)' : 'Physical therapy (6 sessions)'}</span>
                      <span className="font-mono">900 {language === 'ar' ? 'ر.س' : 'SAR'}</span>
                    </div>
                    <div className={`flex justify-between pt-2 border-t border-destructive/30 font-bold ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span>{language === 'ar' ? 'إجمالي التكلفة' : 'Total Cost'}</span>
                      <span className="font-mono">3,150 {language === 'ar' ? 'ر.س' : 'SAR'}</span>
                    </div>
                    <div className={`flex justify-between text-destructive font-bold ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span>{language === 'ar' ? 'نسبة التحمل (20%)' : 'Copayment (20%)'}</span>
                      <span className="font-mono">630 {language === 'ar' ? 'ر.س' : 'SAR'}</span>
                    </div>
                  </div>
                </div>

                {/* Scenario 2: Primary Care First */}
                <div className="p-4 rounded-lg border-2 border-success/30 bg-success/5">
                  <h4 className={`font-bold text-success mb-3 flex items-center gap-2 w-full ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                    <CheckCircle2 className="h-4 w-4" />
                    {language === 'ar' ? 'المسار الثاني: البدء بالرعاية الأولية' : 'Path 2: Start with Primary Care'}
                  </h4>
                  
                  {/* Sub-scenario A */}
                  <div className={`mb-4 p-3 bg-success/10 rounded-lg ${isRTL ? 'text-right' : ''}`}>
                    <p className="text-xs font-medium text-success mb-2">
                      {language === 'ar' ? 'السيناريو أ: الحالة بسيطة (80% من الحالات)' : 'Scenario A: Simple case (80% of cases)'}
                    </p>
                    <div className="space-y-1 text-sm">
                      <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span>{language === 'ar' ? 'استشارة طبيب أسرة' : 'Family doctor consultation'}</span>
                        <span className="font-mono">100 {language === 'ar' ? 'ر.س' : 'SAR'}</span>
                      </div>
                      <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span>{language === 'ar' ? 'أدوية' : 'Medications'}</span>
                        <span className="font-mono">150 {language === 'ar' ? 'ر.س' : 'SAR'}</span>
                      </div>
                      <div className={`flex justify-between pt-1 border-t border-success/30 font-bold ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span>{language === 'ar' ? 'إجمالي التكلفة' : 'Total Cost'}</span>
                        <span className="font-mono">250 {language === 'ar' ? 'ر.س' : 'SAR'}</span>
                      </div>
                      <div className={`flex justify-between text-success font-bold ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span>{language === 'ar' ? 'نسبة التحمل (0%)' : 'Copayment (0%)'}</span>
                        <span className="font-mono">0 {language === 'ar' ? 'ر.س' : 'SAR'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Sub-scenario B */}
                  <div className={`p-3 bg-info/10 rounded-lg ${isRTL ? 'text-right' : ''}`}>
                    <p className="text-xs font-medium text-info mb-2">
                      {language === 'ar' ? 'السيناريو ب: تحويل للتخصصي (20% من الحالات)' : 'Scenario B: Referral needed (20% of cases)'}
                    </p>
                    <div className="space-y-1 text-sm">
                      <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span>{language === 'ar' ? 'استشارة رعاية أولية' : 'Primary care consultation'}</span>
                        <span className="font-mono">100 {language === 'ar' ? 'ر.س' : 'SAR'}</span>
                      </div>
                      <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span>{language === 'ar' ? 'تحويل + استشارة تخصصية' : 'Referral + Specialist'}</span>
                        <span className="font-mono">300 {language === 'ar' ? 'ر.س' : 'SAR'}</span>
                      </div>
                      <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span>{language === 'ar' ? 'فحوصات (بناءً على الحاجة)' : 'Tests (as needed)'}</span>
                        <span className="font-mono">500 {language === 'ar' ? 'ر.س' : 'SAR'}</span>
                      </div>
                      <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span>{language === 'ar' ? 'أدوية' : 'Medications'}</span>
                        <span className="font-mono">200 {language === 'ar' ? 'ر.س' : 'SAR'}</span>
                      </div>
                      <div className={`flex justify-between pt-1 border-t border-info/30 font-bold ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span>{language === 'ar' ? 'إجمالي التكلفة' : 'Total Cost'}</span>
                        <span className="font-mono">1,100 {language === 'ar' ? 'ر.س' : 'SAR'}</span>
                      </div>
                      <div className={`flex justify-between text-info font-bold ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span>{language === 'ar' ? 'نسبة التحمل (0% رعاية أولية + 10% تخصصي)' : 'Copayment (0% PC + 10% specialist)'}</span>
                        <span className="font-mono">80 {language === 'ar' ? 'ر.س' : 'SAR'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                </div>

                {/* Comparison Summary */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-center">
                    <p className="text-xs text-muted-foreground mb-1">
                      {language === 'ar' ? 'تحمل المريض (مباشر للتخصصي)' : 'Patient pays (Direct)'}
                    </p>
                    <p className="text-2xl font-bold text-destructive font-mono">630</p>
                    <div className="flex items-center justify-center">
                      <SARSymbol className="h-3.5 w-3.5 opacity-60" />
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-success/10 border border-success/30 text-center">
                    <p className="text-xs text-muted-foreground mb-1">
                      {language === 'ar' ? 'تحمل المريض (رعاية أولية أولاً)' : 'Patient pays (PC First)'}
                    </p>
                    <p className="text-2xl font-bold text-success font-mono">0-80</p>
                    <div className="flex items-center justify-center">
                      <SARSymbol className="h-3.5 w-3.5 opacity-60" />
                    </div>
                  </div>
                </div>

                <div className={`p-3 rounded-lg bg-primary/10 border border-primary/30 ${isRTL ? 'text-right' : ''}`}>
                  <p className="text-sm font-medium text-primary flex items-center gap-1 flex-wrap justify-center">
                    {language === 'ar' 
                      ? <>💡 الخلاصة: المريض يوفر 550-630 <SARSymbol className="h-3 w-3 inline" />، وشركة التأمين توفر 2,050-2,900 <SARSymbol className="h-3 w-3 inline" />، مع تجنب فحوصات غير ضرورية!</>
                      : <>💡 Summary: Patient saves 550-630 <SARSymbol className="h-3 w-3 inline" />, Insurance saves 2,050-2,900 <SARSymbol className="h-3 w-3 inline" />, while avoiding unnecessary tests!</>}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/30">
              <CardContent className="py-4">
                <h3 className="text-sm font-medium mb-2 w-full">
                  {language === 'ar' ? 'الهدف من تعديل نسب التحمل' : 'Goal of Copayment Modification'}
                </h3>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                    <CheckCircle2 className="h-3.5 w-3.5 text-success mt-0.5 shrink-0" />
                    {language === 'ar' 
                      ? 'توجيه المستفيدين لأنسب مستوى رعاية'
                      : 'Guide beneficiaries to the most suitable level of care'}
                  </li>
                  <li className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                    <CheckCircle2 className="h-3.5 w-3.5 text-success mt-0.5 shrink-0" />
                    {language === 'ar' 
                      ? 'تخفيف الضغط على المستشفيات والطوارئ'
                      : 'Reduce strain on hospitals and emergency rooms'}
                  </li>
                  <li className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                    <CheckCircle2 className="h-3.5 w-3.5 text-success mt-0.5 shrink-0" />
                    {language === 'ar' 
                      ? 'تعزيز الرعاية الوقائية والتدخل المبكر'
                      : 'Promote preventive care and early intervention'}
                  </li>
                  <li className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                    <CheckCircle2 className="h-3.5 w-3.5 text-success mt-0.5 shrink-0" />
                    {language === 'ar' 
                      ? 'تحسين كفاءة التكلفة في النظام الصحي'
                      : 'Improve cost-efficiency in the healthcare system'}
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Classification Tab */}
          <TabsContent value="classification" className="space-y-4">
            <Alert>
              <Award className="h-4 w-4" />
              <AlertTitle className="text-sm">
                {language === 'ar' ? 'إطار تصنيف الرعاية الأولية' : 'Primary Care Classification Framework'}
              </AlertTitle>
              <AlertDescription className="text-xs">
                {language === 'ar' 
                  ? 'يقوم المجلس باعتماد وتصنيف مقدمي الرعاية الأولية بالقطاع الخاص إلى فئتين (A و A+) لدعمهم وجذب المرضى إليهم.'
                  : 'CHI accredits and classifies private sector primary care providers into two tiers (A and A+) to support them and attract patients.'}
              </AlertDescription>
            </Alert>

            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="border-info/30">
                <CardHeader className="pb-2">
                  <Badge className="w-fit bg-info">
                    {language === 'ar' ? 'التصنيف A - الأساسي' : 'Classification A - Basic'}
                  </Badge>
                </CardHeader>
                <CardContent className={isRTL ? 'text-right' : ''}>
                  <p className="text-xs text-muted-foreground mb-3">
                    {language === 'ar' 
                      ? 'مقدم الرعاية الأولية الأساسي الذي يقدم الخدمات الأساسية مثل متابعة الأمراض المزمنة، التطعيمات، متابعة نمو الأطفال، ومتابعة الحمل.'
                      : 'Basic primary care provider offering essential services like chronic disease follow-up, vaccinations, child growth monitoring, and pregnancy follow-up.'}
                  </p>
                  <div className="space-y-1 text-xs">
                    <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span>{language === 'ar' ? 'نطاق الخدمات' : 'Services'}</span>
                      <span>0-55 {language === 'ar' ? 'نقطة' : 'points'}</span>
                    </div>
                    <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span>{language === 'ar' ? 'القوى العاملة' : 'Workforce'}</span>
                      <span>0-35 {language === 'ar' ? 'نقطة' : 'points'}</span>
                    </div>
                    <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span>{language === 'ar' ? 'التقنية' : 'Technology'}</span>
                      <span>0-45 {language === 'ar' ? 'نقطة' : 'points'}</span>
                    </div>
                    <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span>{language === 'ar' ? 'الجودة' : 'Quality'}</span>
                      <span>0-10 {language === 'ar' ? 'نقطة' : 'points'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-success/30">
                <CardHeader className="pb-2">
                  <Badge className="w-fit bg-success">
                    {language === 'ar' ? 'التصنيف A+ - المتقدم' : 'Classification A+ - Advanced'}
                  </Badge>
                </CardHeader>
                <CardContent className={isRTL ? 'text-right' : ''}>
                  <p className="text-xs text-muted-foreground mb-3">
                    {language === 'ar' 
                      ? 'مقدم الرعاية الأولية المتقدم الذي يقدم خدمات إضافية متقدمة مع بنية تحتية وتقنيات وكوادر متطورة.'
                      : 'Advanced primary care provider offering additional services with advanced infrastructure, technology, and qualified staff.'}
                  </p>
                  <div className="space-y-1 text-xs">
                    <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span>{language === 'ar' ? 'نطاق الخدمات' : 'Services'}</span>
                      <span>60-120 {language === 'ar' ? 'نقطة' : 'points'}</span>
                    </div>
                    <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span>{language === 'ar' ? 'القوى العاملة' : 'Workforce'}</span>
                      <span>40-80 {language === 'ar' ? 'نقطة' : 'points'}</span>
                    </div>
                    <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span>{language === 'ar' ? 'التقنية' : 'Technology'}</span>
                      <span>50-100 {language === 'ar' ? 'نقطة' : 'points'}</span>
                    </div>
                    <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span>{language === 'ar' ? 'الجودة' : 'Quality'}</span>
                      <span>15-25 {language === 'ar' ? 'نقطة' : 'points'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Four Domains */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base w-full">
                  {language === 'ar' ? 'محاور التصنيف الأربعة' : 'Four Classification Domains'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(['services', 'workforce', 'technology', 'quality'] as const).map(domain => {
                    const Icon = getDomainIcon(domain);
                    const scoring = classificationScoring[domain];
                    return (
                      <div key={domain} className="flex flex-col items-center justify-center text-center p-3 border rounded-lg">
                        <Icon className="h-6 w-6 mb-2 text-primary" />
                        <p className="text-xs font-medium text-center w-full">{getDomainLabel(domain)}</p>
                        <p className="text-[10px] text-muted-foreground text-center w-full">
                          {language === 'ar' ? 'الحد الأقصى' : 'Max'}: {scoring.maxAPlus}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Accreditation Tab */}
          <TabsContent value="accreditation" className="space-y-4">
            <Alert className="border-primary/30 bg-primary/5">
              <FileCheck className="h-4 w-4" />
              <AlertTitle className="text-sm">
                {language === 'ar' ? 'دليل اعتماد مقدمي الرعاية الأولية' : 'Primary Care Provider Accreditation Guide'}
              </AlertTitle>
              <AlertDescription className="text-xs">
                {language === 'ar' 
                  ? 'يجب على مقدم الخدمة الصحية أن يكون حاصلاً على اعتماد مجلس الضمان الصحي للتقديم على تصنيف الرعاية الأولية.'
                  : 'Healthcare providers must be accredited by CHI before applying for primary care classification.'}
              </AlertDescription>
            </Alert>

            {/* Target Providers */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className={`text-base flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Building2 className="h-4 w-4 text-primary" />
                  {language === 'ar' ? 'مقدمي الخدمة المستهدفين' : 'Target Service Providers'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-xs text-muted-foreground mb-3 ${isRTL ? 'text-right' : ''}`}>
                  {language === 'ar' 
                    ? 'يمكن لأي من مقدمي الخدمات الصحية الذين تتوافر لديهم المتطلبات الأساسية الواردة في إطار التصنيف التقديم:'
                    : 'Any healthcare provider meeting the basic requirements in the classification framework can apply:'}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { ar: 'مراكز الرعاية الأولية', en: 'Primary Care Centers' },
                    { ar: 'المستشفيات', en: 'Hospitals' },
                    { ar: 'المجمعات الطبية', en: 'Medical Complexes' },
                    { ar: 'الطب الاتصالي', en: 'Telemedicine' },
                    { ar: 'الصيدليات', en: 'Pharmacies' },
                    { ar: 'العيادات', en: 'Clinics' }
                  ].map((provider, idx) => (
                    <div key={idx} className={`flex items-center gap-2 p-2 border rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                      <span className="text-xs">{language === 'ar' ? provider.ar : provider.en}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Application Process Steps */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className={`text-base flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <FileText className="h-4 w-4 text-primary" />
                  {language === 'ar' ? 'إجراءات التقديم على اعتماد مركز الرعاية الأولية' : 'Application Process for Primary Care Accreditation'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      step: 1,
                      icon: Eye,
                      titleAr: 'الاطلاع على إطار التصنيف',
                      titleEn: 'Review Classification Framework',
                      descAr: 'الاطلاع على إطار تصنيف الرعاية الأولية لغرض التقييم الذاتي والتأكد من مدى تحقيق المعايير',
                      descEn: 'Review the primary care classification framework for self-assessment and criteria verification'
                    },
                    {
                      step: 2,
                      icon: ClipboardCheck,
                      titleAr: 'التقييم الذاتي',
                      titleEn: 'Self-Assessment',
                      descAr: 'يتضمن الإطار معايير إلزامية يجب توفرها جميعاً للحصول على التصنيف',
                      descEn: 'The framework includes must-have criteria that all must be met for classification'
                    },
                    {
                      step: 3,
                      icon: Mail,
                      titleAr: 'التواصل مع المجلس',
                      titleEn: 'Contact CHI',
                      descAr: 'في حال تحقيق جميع المعايير الإلزامية، يتم التواصل مع المجلس عبر البريد الإلكتروني MD@chi.gov.sa',
                      descEn: 'If all mandatory criteria are met, contact CHI via email at MD@chi.gov.sa'
                    },
                    {
                      step: 4,
                      icon: Calendar,
                      titleAr: 'حضور الاجتماع التعريفي',
                      titleEn: 'Attend Orientation Meeting',
                      descAr: 'يتم إرسال دعوة للمدير الطبي وممثل الرعاية الأولية لحضور الاجتماع التعريفي بإطار تصنيف الرعاية الأولية',
                      descEn: 'An invitation is sent to the Medical Director and PC representative for the orientation meeting'
                    },
                    {
                      step: 5,
                      icon: Upload,
                      titleAr: 'رفع المستندات الداعمة',
                      titleEn: 'Upload Supporting Documents',
                      descAr: 'يتم مشاركة مجلد خاص بمقدم الرعاية الأولية لرفع المستندات الداعمة لمعايير التصنيف',
                      descEn: 'A dedicated folder is shared for uploading supporting documents for classification criteria'
                    },
                    {
                      step: 6,
                      icon: Eye,
                      titleAr: 'مراجعة المستندات',
                      titleEn: 'Document Review',
                      descAr: 'يتم مراجعة المستندات الداعمة من قبل فريق مجلس الضمان الصحي',
                      descEn: 'Supporting documents are reviewed by the CHI team'
                    },
                    {
                      step: 7,
                      icon: MapPin,
                      titleAr: 'الزيارة الميدانية',
                      titleEn: 'Site Visit',
                      descAr: 'يتم تحديد موعد الزيارة الميدانية لمقر الجهة مع إمكانية طلب مستندات إضافية خلال 10 أيام',
                      descEn: 'Site visit is scheduled with possibility of requesting additional documents within 10 days'
                    },
                    {
                      step: 8,
                      icon: Award,
                      titleAr: 'منح الاعتماد',
                      titleEn: 'Grant Accreditation',
                      descAr: 'بعد استيفاء جميع المتطلبات، يتم منح شهادة اعتماد مقدم الرعاية الأولية',
                      descEn: 'After meeting all requirements, primary care provider accreditation certificate is granted'
                    }
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className={`flex items-start gap-3 p-3 border rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="flex flex-col items-center shrink-0">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                            {item.step}
                          </div>
                          {idx < 7 && <div className="w-0.5 h-4 bg-primary/20 mt-1" />}
                        </div>
                        <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
                          <div className={`flex items-center gap-2 mb-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Icon className="h-4 w-4 text-primary shrink-0" />
                            <h4 className="text-sm font-medium">
                              {language === 'ar' ? item.titleAr : item.titleEn}
                            </h4>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {language === 'ar' ? item.descAr : item.descEn}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="py-4">
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="p-3 rounded-lg bg-primary/20">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
                    <h3 className="text-sm font-medium mb-1">
                      {language === 'ar' ? 'للتقديم على تصنيف الرعاية الأولية' : 'Apply for Primary Care Classification'}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      {language === 'ar' 
                        ? 'تواصل معنا عبر البريد الإلكتروني مع توضيح اسم مقدم الخدمة ورقم الاعتماد'
                        : 'Contact us via email with provider name and accreditation number'}
                    </p>
                    <a 
                      href="mailto:MD@chi.gov.sa" 
                      className={`inline-flex items-center gap-2 text-primary font-medium text-sm hover:underline ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      MD@chi.gov.sa
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Classification Categories Summary */}
            <div className="grid sm:grid-cols-2 gap-3">
              <Card className="border-info/30">
                <CardHeader className="pb-2">
                  <Badge className="w-fit bg-info">A</Badge>
                </CardHeader>
                <CardContent className={isRTL ? 'text-right' : ''}>
                  <h4 className="text-sm font-medium mb-1">
                    {language === 'ar' ? 'رعاية أولية أساسية' : 'Basic Primary Care'}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {language === 'ar' 
                      ? 'ينطبق على مقدمي الخدمات الذين استوفوا جميع "المعايير الفرعية الإلزامية"'
                      : 'Applies to providers who have met all "Must-Have Sub-criteria"'}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-success/30">
                <CardHeader className="pb-2">
                  <Badge className="w-fit bg-success">A+</Badge>
                </CardHeader>
                <CardContent className={isRTL ? 'text-right' : ''}>
                  <h4 className="text-sm font-medium mb-1">
                    {language === 'ar' ? 'رعاية أولية متقدمة' : 'Advanced Primary Care'}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {language === 'ar' 
                      ? 'ينطبق على مقدمي الخدمات الذين حصلوا على ما لا يقل عن 50% من درجات المعايير المتقدمة في المجالات الأربعة'
                      : 'Applies to providers scoring at least 50% of advanced criteria across all four domains'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Assessment Tab */}
          <TabsContent value="assessment" className="space-y-4">
            <Alert className="border-info/30 bg-info/5">
              <UserCheck className="h-4 w-4" />
              <AlertTitle className="text-sm">
                {language === 'ar' ? 'أداة التقييم الذاتي' : 'Self-Assessment Tool'}
              </AlertTitle>
              <AlertDescription className="text-xs">
                {language === 'ar' 
                  ? 'استخدم هذه الأداة لتقييم جاهزية مركزك للحصول على اعتماد مقدم رعاية أولية من مجلس الضمان الصحي.'
                  : 'Use this tool to assess your facility readiness for CHI primary care provider accreditation.'}
              </AlertDescription>
            </Alert>

            {/* Results Summary */}
            <Card className={`${
              classification.overall === 'A+' ? 'border-success bg-success/5' :
              classification.overall === 'A' ? 'border-info bg-info/5' :
              'border-destructive/30 bg-destructive/5'
            }`}>
              <CardContent className="py-4">
                <div className={`flex items-center justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <h3 className="text-sm font-medium">
                    {language === 'ar' ? 'نتيجة التقييم' : 'Assessment Result'}
                  </h3>
                  <Badge variant={classification.overall.includes('A') ? 'default' : 'destructive'} className="text-lg px-3">
                    {classification.overall}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['services', 'workforce', 'technology', 'quality'] as const).map(domain => {
                    const result = classification[domain];
                    const scoring = classificationScoring[domain];
                    return (
                      <div key={domain} className="text-center p-2 bg-background rounded border">
                        <p className="text-[10px] text-muted-foreground">{getDomainLabel(domain)}</p>
                        <p className="text-sm font-bold">{result.score}/{scoring.maxAPlus}</p>
                        <div className="flex items-center justify-center gap-1 mt-1">
                          {result.passedMustHave ? (
                            <CheckCircle2 className="h-3 w-3 text-success" />
                          ) : (
                            <XCircle className="h-3 w-3 text-destructive" />
                          )}
                          <span className="text-[9px]">{result.classification}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Criteria Checklist */}
            <div className="grid sm:grid-cols-2 gap-4">
              {(['services', 'workforce', 'technology', 'quality'] as const).map(domain => {
                const domainCriteria = getCriteriaByDomain(domain);
                const mustHave = domainCriteria.filter(c => c.isMustHave);
                const weighted = domainCriteria.filter(c => !c.isMustHave);
                const Icon = getDomainIcon(domain);
                
                return (
                  <Card key={domain}>
                    <CardHeader className="pb-2">
                      <CardTitle className={`text-sm flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Icon className="h-4 w-4" />
                        {getDomainLabel(domain)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className={isRTL ? 'text-right' : ''}>
                      <ScrollArea className={`h-[250px] ${isRTL ? 'pl-3' : 'pr-3'}`}>
                        {mustHave.length > 0 && (
                          <>
                            <p className="text-[10px] font-medium text-destructive mb-2">
                              {language === 'ar' ? 'متطلبات إلزامية' : 'Must-Have Requirements'}
                            </p>
                            <div className="space-y-2 mb-3">
                              {mustHave.map(criteria => (
                                <div key={criteria.id} className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                  <Checkbox 
                                    id={criteria.id}
                                    checked={selectedCriteria.includes(criteria.id)}
                                    onCheckedChange={() => toggleCriteria(criteria.id)}
                                  />
                                  <Label htmlFor={criteria.id} className="text-xs cursor-pointer">
                                    {language === 'ar' ? criteria.nameAr : criteria.nameEn}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                        
                        {weighted.length > 0 && (
                          <>
                            <p className="text-[10px] font-medium text-muted-foreground mb-2">
                              {language === 'ar' ? 'معايير إضافية (نقاط)' : 'Additional Criteria (Points)'}
                            </p>
                            <div className="space-y-2">
                              {weighted.map(criteria => (
                                <div key={criteria.id} className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                  <Checkbox 
                                    id={criteria.id}
                                    checked={selectedCriteria.includes(criteria.id)}
                                    onCheckedChange={() => toggleCriteria(criteria.id)}
                                  />
                                  <Label htmlFor={criteria.id} className="text-xs cursor-pointer flex-1">
                                    {language === 'ar' ? criteria.nameAr : criteria.nameEn}
                                    <Badge variant="outline" className="ms-1 text-[9px]">
                                      +{criteria.points}
                                    </Badge>
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </ScrollArea>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="flex justify-center">
              <Button 
                variant="outline" 
                onClick={() => setSelectedCriteria([])}
                className="text-xs"
              >
                {language === 'ar' ? 'إعادة التقييم' : 'Reset Assessment'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-4 mt-4">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <p className="text-[9px] sm:text-xs text-muted-foreground">
            {language === 'ar' 
              ? 'المصدر: الورقة البيضاء لتعزيز الرعاية الأولية - مجلس الضمان الصحي • دليل اعتماد مقدمي الرعاية الأولية'
              : 'Source: Enhanced Primary Care White Paper - CHI • Primary Care Provider Accreditation Guide'}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PrimaryCare;
