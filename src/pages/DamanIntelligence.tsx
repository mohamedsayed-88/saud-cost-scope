import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Building2,
  Users,
  FileCheck,
  XCircle,
  Target,
  Brain,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Lightbulb,
  Settings,
  LineChart,
  PieChart,
  Activity,
  LogIn
} from 'lucide-react';

const DamanIntelligence = () => {
  const { language, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const platformFeatures = [
    {
      titleAr: 'تحليل الموافقات المسبقة',
      titleEn: 'Prior Authorization Analysis',
      descAr: 'عرض إحصائيات شاملة لطلبات الموافقة المسبقة ونسب القبول والرفض',
      descEn: 'Comprehensive statistics on prior authorization requests and approval/rejection rates',
      icon: FileCheck
    },
    {
      titleAr: 'تحليل المطالبات المالية',
      titleEn: 'Claims Analysis',
      descAr: 'بيانات المطالبات المرفوعة لشركات التأمين وأسباب الرفض',
      descEn: 'Claims data submitted to insurance companies with rejection reasons',
      icon: BarChart3
    },
    {
      titleAr: 'البيانات الديموغرافية',
      titleEn: 'Demographic Data',
      descAr: 'تحليل البيانات بناءً على الفئات العمرية والجنس والمنطقة',
      descEn: 'Data analysis based on age groups, gender, and region',
      icon: Users
    },
    {
      titleAr: 'بيانات الحد الأدنى (MDS)',
      titleEn: 'Minimum Data Set (MDS)',
      descAr: 'تحليل جودة البيانات الصحية المرفوعة ومدى اكتمالها',
      descEn: 'Analysis of uploaded health data quality and completeness',
      icon: Activity
    }
  ];

  const rejectionInsights = [
    {
      reasonAr: 'بيانات التشخيص غير مكتملة',
      reasonEn: 'Incomplete Diagnosis Data',
      percentageAr: '35%',
      percentageEn: '35%',
      solutionAr: 'تدريب الأطباء على إدخال رموز ICD-10 الصحيحة',
      solutionEn: 'Train physicians on correct ICD-10 code entry',
      color: 'destructive'
    },
    {
      reasonAr: 'عدم تطابق الخدمة مع التشخيص',
      reasonEn: 'Service-Diagnosis Mismatch',
      percentageAr: '25%',
      percentageEn: '25%',
      solutionAr: 'مراجعة دورية لعلاقات التشخيص-الخدمة',
      solutionEn: 'Regular review of diagnosis-service relationships',
      color: 'warning'
    },
    {
      reasonAr: 'المبرر الطبي غير كافٍ',
      reasonEn: 'Insufficient Medical Justification',
      percentageAr: '20%',
      percentageEn: '20%',
      solutionAr: 'توحيد نماذج التبرير الطبي',
      solutionEn: 'Standardize medical justification templates',
      color: 'info'
    },
    {
      reasonAr: 'أخطاء إدارية',
      reasonEn: 'Administrative Errors',
      percentageAr: '20%',
      percentageEn: '20%',
      solutionAr: 'أتمتة التحقق من البيانات قبل الرفع',
      solutionEn: 'Automate data validation before submission',
      color: 'secondary'
    }
  ];

  const improvementSteps = [
    {
      stepAr: 'تحليل أسباب الرفض',
      stepEn: 'Analyze Rejection Reasons',
      descAr: 'دراسة التقارير الشهرية لفهم أنماط الرفض المتكررة',
      descEn: 'Study monthly reports to understand recurring rejection patterns',
      icon: BarChart3
    },
    {
      stepAr: 'وضع سياسات داخلية',
      stepEn: 'Establish Internal Policies',
      descAr: 'إنشاء إرشادات واضحة للأطباء والمرمزين',
      descEn: 'Create clear guidelines for physicians and coders',
      icon: Settings
    },
    {
      stepAr: 'تدريب الكوادر',
      stepEn: 'Staff Training',
      descAr: 'برامج تدريبية مستمرة على معايير الترميز والتوثيق',
      descEn: 'Continuous training programs on coding and documentation standards',
      icon: Users
    },
    {
      stepAr: 'المتابعة والتحسين',
      stepEn: 'Monitor & Improve',
      descAr: 'قياس نسب التحسن وتعديل السياسات حسب النتائج',
      descEn: 'Measure improvement rates and adjust policies based on results',
      icon: TrendingUp
    }
  ];

  const futureFeatures = [
    {
      titleAr: 'مقارنة الأداء مع السوق',
      titleEn: 'Market Performance Comparison',
      descAr: 'مقارنة أداء مقدم الخدمة مع أقرانه في نفس المنطقة والتخصص',
      descEn: 'Compare provider performance with peers in the same region and specialty',
      icon: LineChart,
      status: 'upcoming'
    },
    {
      titleAr: 'توقعات الذكاء الاصطناعي',
      titleEn: 'AI Predictions',
      descAr: 'تحليل تنبؤي لأثر التعديلات على الإيرادات',
      descEn: 'Predictive analysis of changes impact on revenue',
      icon: Brain,
      status: 'upcoming'
    },
    {
      titleAr: 'توصيات ذكية',
      titleEn: 'Smart Recommendations',
      descAr: 'اقتراحات مخصصة لتحسين الأداء بناءً على بيانات السوق',
      descEn: 'Customized suggestions for performance improvement based on market data',
      icon: Sparkles,
      status: 'upcoming'
    },
    {
      titleAr: 'تحليل الفجوات',
      titleEn: 'Gap Analysis',
      descAr: 'تحديد الخدمات ذات الفرص العالية في منطقتك',
      descEn: 'Identify high-opportunity services in your region',
      icon: Target,
      status: 'upcoming'
    }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-b from-background to-muted/30 ${isRTL ? 'rtl font-arabic' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-6 sm:py-8 overflow-hidden gradient-hero">
        <div className="absolute inset-0 chi-pattern" />
        <div className="container mx-auto px-3 sm:px-4 relative">
          <div className={`flex items-center gap-3 mb-3 w-fit ${isRTL ? 'ml-auto' : ''}`}>
            <div className="p-2 rounded-lg bg-primary-foreground/10">
              <BarChart3 className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-primary-foreground">
              {language === 'ar' ? 'ضمان انتلجنس' : 'Daman Intelligence'}
            </h1>
          </div>
          
          <p className={`text-xs sm:text-sm text-primary-foreground/85 max-w-2xl ${isRTL ? 'text-right ml-auto' : 'text-left'}`}>
            {language === 'ar' 
              ? 'منصة تحليلات ذكية لبيانات الموافقات المسبقة والمطالبات لتحسين أداء مقدمي الخدمات الصحية'
              : 'Smart analytics platform for prior authorizations and claims data to improve healthcare provider performance'}
          </p>
        </div>
      </section>

      <main className={`container mx-auto px-4 py-8 max-w-7xl`}>
        
        {/* What is Daman Intelligence */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
          <CardTitle className="flex items-center justify-center gap-3 text-xl w-full">
              <BarChart3 className="h-7 w-7 text-primary" />
              {language === 'ar' ? 'ما هي منصة ضمان انتلجنس؟' : 'What is Daman Intelligence?'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className={`text-muted-foreground leading-relaxed ${isRTL ? 'text-right' : ''}`}>
              {language === 'ar' 
                ? 'منصة ضمان (Daman Intelligence) هي منصة تحليلات متقدمة تعرض بيانات الموافقات المسبقة والمطالبات المالية المرفوعة من مقدمي الخدمة الصحية لشركات التأمين. تقدم المنصة إحصائيات وتحليلات شاملة بناءً على البيانات الديموغرافية والبيانات الصحية المرفوعة (الحد الأدنى من البيانات MDS).'
                : 'Daman Intelligence is an advanced analytics platform that displays prior authorization and financial claims data submitted by healthcare providers to insurance companies. The platform provides comprehensive statistics and analytics based on demographic data and uploaded health data (Minimum Data Set - MDS).'}
            </p>
            <p className={`text-muted-foreground leading-relaxed ${isRTL ? 'text-right' : ''}`}>
              {language === 'ar'
                ? 'من خلال المنصة، يستطيع مقدم الخدمة معرفة أسباب رفض الموافقات والمطالبات وتحليلها بعمق، مما يمكّنه من اتخاذ إجراءات تصحيحية فعّالة لتقليل نسب الرفض وتحسين جودة البيانات المرفوعة.'
                : 'Through the platform, service providers can identify rejection reasons for authorizations and claims and analyze them in depth, enabling them to take effective corrective actions to reduce rejection rates and improve the quality of submitted data.'}
            </p>
          </CardContent>
        </Card>

        {/* How to Access */}
        <Card className="mb-8 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-3 text-xl w-full">
              <LogIn className="h-7 w-7 text-primary" />
              {language === 'ar' ? 'كيف يمكنني الوصول والدخول إلى منصة ضمان إنتلجنس؟' : 'How Can I Access Daman Intelligence Platform?'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className={`text-muted-foreground leading-relaxed ${isRTL ? 'text-right' : ''}`}>
              {language === 'ar' 
                ? 'يتم الوصول إلى منصة ضمان إنتلجنس عن طريق ممثل نفيس بالمنشأة، حيث أن لكل منشأة صحية ممثل معتمد لنفيس.'
                : 'Access to Daman Intelligence platform is through the Nafees representative at your facility, as each healthcare facility has an authorized Nafees representative.'}
            </p>
            
            <div className={`p-4 rounded-lg bg-primary/5 border border-primary/20 ${isRTL ? 'text-right' : ''}`}>
              <h4 className="font-semibold text-foreground mb-3">
                {language === 'ar' ? 'خطوات الدخول:' : 'Access Steps:'}
              </h4>
              <ol className={`space-y-2 text-muted-foreground ${isRTL ? 'list-decimal list-inside' : 'list-decimal list-inside'}`}>
                <li>
                  {language === 'ar' 
                    ? <>الدخول إلى موقع <a href="https://nphies.sa" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">nphies.sa</a></>
                    : <>Visit <a href="https://nphies.sa" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">nphies.sa</a> website</>}
                </li>
                <li>
                  {language === 'ar' 
                    ? 'ستجد عدة تطبيقات متاحة منها: Transaction Viewer و Daman Intelligence'
                    : 'You will find several applications including: Transaction Viewer and Daman Intelligence'}
                </li>
                <li>
                  {language === 'ar' 
                    ? 'يستطيع ممثل نفيس إنشاء حسابات إضافية لموظفي مقدم الخدمة بصلاحيات مختلفة حسب دورهم بالمنشأة'
                    : 'The Nafees representative can create additional accounts for service provider staff with different permissions based on their role'}
                </li>
              </ol>
            </div>

            <div className={`p-4 rounded-lg bg-muted/50 ${isRTL ? 'text-right' : ''}`}>
              <h4 className="font-semibold text-foreground mb-3">
                {language === 'ar' ? 'الأدوار والصلاحيات المتاحة:' : 'Available Roles and Permissions:'}
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {language === 'ar' ? 'ممثل التأمين' : 'Insurance Representative'}
                </span>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {language === 'ar' ? 'المدير الطبي' : 'Medical Director'}
                </span>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {language === 'ar' ? 'مسؤول الحسابات' : 'Accounts Manager'}
                </span>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {language === 'ar' ? 'مسؤول إدارة دورة الإيرادات' : 'Revenue Cycle Manager'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Platform Features */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3 w-full">
            <PieChart className="h-6 w-6 text-primary" />
            {language === 'ar' ? 'مميزات المنصة' : 'Platform Features'}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {platformFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow border-border/50">
                <CardContent className={`p-5 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">
                        {language === 'ar' ? feature.titleAr : feature.titleEn}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {language === 'ar' ? feature.descAr : feature.descEn}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Practical Example */}
        <Card className="mb-10 border-2 border-success/30 bg-success/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-lg w-full">
              <Lightbulb className="h-6 w-6 text-success" />
              {language === 'ar' ? 'مثال عملي: كيف تستفيد المستشفيات من المنصة؟' : 'Practical Example: How Do Hospitals Benefit?'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className={`p-5 rounded-lg bg-background border ${isRTL ? 'text-right' : 'text-left'}`}>
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2 w-full">
                <Building2 className="h-5 w-5 text-primary" />
                {language === 'ar' ? 'السيناريو' : 'Scenario'}
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'ar'
                  ? 'مستشفى يلاحظ من خلال منصة ضمان أن 35% من مطالباته تُرفض بسبب "عدم تطابق رمز التشخيص مع الخدمة المقدمة". بتحليل البيانات، يكتشف أن القسم الأكثر تأثراً هو قسم الأشعة، وأن المشكلة تتركز في طلبات الرنين المغناطيسي.'
                  : 'A hospital notices through Daman platform that 35% of its claims are rejected due to "diagnosis code mismatch with provided service". By analyzing the data, they discover that the Radiology department is most affected, and the problem is concentrated in MRI requests.'}
              </p>
            </div>

            <div className={`p-5 rounded-lg bg-background border ${isRTL ? 'text-right' : 'text-left'}`}>
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2 w-full">
                <Settings className="h-5 w-5 text-primary" />
                {language === 'ar' ? 'الإجراء التصحيحي' : 'Corrective Action'}
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className={`flex items-start gap-2`}>
                  <CheckCircle2 className="h-4 w-4 text-success mt-1 shrink-0" />
                  <span>{language === 'ar' ? 'إنشاء سياسة داخلية تُلزم الأطباء بإرفاق التشخيص الدقيق قبل طلب الأشعة' : 'Create internal policy requiring physicians to attach accurate diagnosis before imaging requests'}</span>
                </li>
                <li className={`flex items-start gap-2`}>
                  <CheckCircle2 className="h-4 w-4 text-success mt-1 shrink-0" />
                  <span>{language === 'ar' ? 'تدريب المرمزين على العلاقات الصحيحة بين رموز ICD-10 وخدمات الأشعة' : 'Train coders on correct relationships between ICD-10 codes and imaging services'}</span>
                </li>
                <li className={`flex items-start gap-2`}>
                  <CheckCircle2 className="h-4 w-4 text-success mt-1 shrink-0" />
                  <span>{language === 'ar' ? 'إضافة نقطة تحقق في النظام قبل رفع الطلب للتأكد من التطابق' : 'Add validation checkpoint in the system before submission to verify matching'}</span>
                </li>
              </ul>
            </div>

            <div className={`p-5 rounded-lg bg-success/10 border border-success/30 ${isRTL ? 'text-right' : 'text-left'}`}>
              <h4 className="font-semibold text-success mb-3 flex items-center gap-2 w-full">
                <TrendingUp className="h-5 w-5" />
                {language === 'ar' ? 'النتيجة' : 'Result'}
              </h4>
              <p className="text-muted-foreground">
                {language === 'ar'
                  ? 'انخفضت نسبة الرفض من 35% إلى 8% خلال 3 أشهر، مما أدى إلى تحسين التدفق النقدي للمستشفى وتقليل وقت الانتظار للحصول على الموافقات.'
                  : 'Rejection rate dropped from 35% to 8% within 3 months, improving hospital cash flow and reducing wait time for approvals.'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Rejection Analysis Insights */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3 w-full">
            <AlertTriangle className="h-6 w-6 text-warning" />
            {language === 'ar' ? 'تحليل أسباب الرفض الشائعة' : 'Common Rejection Reasons Analysis'}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {rejectionInsights.map((insight, index) => (
              <Card key={index} className="border-border/50">
                <CardContent className={`p-5 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-destructive" />
                      <span className="font-semibold text-foreground">
                        {language === 'ar' ? insight.reasonAr : insight.reasonEn}
                      </span>
                    </div>
                    <Badge variant={insight.color as any}>
                      {language === 'ar' ? insight.percentageAr : insight.percentageEn}
                    </Badge>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      {language === 'ar' ? insight.solutionAr : insight.solutionEn}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Improvement Process */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3 w-full">
            <Target className="h-6 w-6 text-primary" />
            {language === 'ar' ? 'خطوات التحسين المستمر' : 'Continuous Improvement Steps'}
          </h2>
          
          <div className="grid md:grid-cols-4 gap-4">
            {improvementSteps.map((step, index) => (
              <Card key={index} className={`border-border/50 hover:shadow-md transition-shadow ${isRTL ? 'text-right' : 'text-center'}`}>
                <CardContent className="p-5">
                  <div className={`w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 ${isRTL ? 'mr-0 ml-auto' : 'mx-auto'}`}>
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="outline" className="mb-2">{index + 1}</Badge>
                  <h3 className="font-semibold text-foreground mb-2">
                    {language === 'ar' ? step.stepAr : step.stepEn}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {language === 'ar' ? step.descAr : step.descEn}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Current vs Future */}
        <section className="mb-10">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Current Version */}
            <Card className="border-2 border-info/30">
              <CardHeader className="bg-info/5">
                <CardTitle className="flex items-center gap-3 w-full">
                  <Badge className="bg-info text-info-foreground">{language === 'ar' ? 'الإصدار الحالي' : 'Current Version'}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className={`p-5 ${isRTL ? 'text-right' : 'text-left'}`}>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-info mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">
                      {language === 'ar' ? 'عرض أداء مقدم الخدمة الفردي' : 'Individual provider performance display'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-info mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">
                      {language === 'ar' ? 'إحصائيات الموافقات والمطالبات' : 'Authorization and claims statistics'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-info mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">
                      {language === 'ar' ? 'تحليل أسباب الرفض' : 'Rejection reasons analysis'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-info mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">
                      {language === 'ar' ? 'تقارير دورية' : 'Periodic reports'}
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Future Version */}
            <Card className="border-2 border-warning/30">
              <CardHeader className="bg-warning/5">
                <CardTitle className="flex items-center gap-3 w-full">
                  <Badge className="bg-warning text-warning-foreground">{language === 'ar' ? 'الإصدار القادم' : 'Upcoming Version'}</Badge>
                  <Sparkles className="h-5 w-5 text-warning" />
                </CardTitle>
              </CardHeader>
              <CardContent className={`p-5 ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="space-y-4">
                  {futureFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center shrink-0">
                        <feature.icon className="h-4 w-4 text-warning" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground text-sm">
                          {language === 'ar' ? feature.titleAr : feature.titleEn}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {language === 'ar' ? feature.descAr : feature.descEn}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Conclusion */}
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <BarChart3 className="h-12 w-12 text-primary mb-4 mx-auto" />
            <p className="text-lg text-foreground max-w-3xl mx-auto">
              {language === 'ar'
                ? 'منصة ضمان هي أداة أساسية لكل مقدم خدمة صحية يسعى لتحسين أدائه المالي وتقليل الهدر الناتج عن رفض الموافقات والمطالبات. من خلال التحليل المبني على البيانات، يمكن للمنشآت الصحية اتخاذ قرارات مدروسة وتحقيق تحسينات مستدامة.'
                : 'Daman platform is an essential tool for every healthcare provider seeking to improve financial performance and reduce waste from rejected authorizations and claims. Through data-driven analysis, healthcare facilities can make informed decisions and achieve sustainable improvements.'}
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DamanIntelligence;
