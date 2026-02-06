import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Target, 
  Users, 
  Activity, 
  TrendingUp,
  Calculator,
  Info,
  ChevronRight,
  Heart,
  Stethoscope,
  Baby,
  Bone,
  Eye
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const PreventiveUtilizationIndicator = () => {
  const { language, isRTL } = useLanguage();

  // Population breakdown data
  const populationBreakdown = [
    {
      riskProfileAr: 'ذكور شباب (18-35)',
      riskProfileEn: 'Young Males (18–35)',
      population: 5500000,
      avgServices: 3,
      servicesDescAr: 'ضغط الدم، مؤشر كتلة الجسم، الأسنان',
      servicesDescEn: 'BP, BMI, Dental',
      totalEligible: 16500000,
      color: '#10b981'
    },
    {
      riskProfileAr: 'ذكور كبار (36-60)',
      riskProfileEn: 'Older Males (36–60)',
      population: 3600000,
      avgServices: 5,
      servicesDescAr: 'ضغط الدم، مؤشر كتلة الجسم، الأسنان، السكري، الدهون',
      servicesDescEn: 'BP, BMI, Dental, Diabetes, Lipids',
      totalEligible: 18000000,
      color: '#3b82f6'
    },
    {
      riskProfileAr: 'إناث شابات (18-39)',
      riskProfileEn: 'Young Females (18–39)',
      population: 2900000,
      avgServices: 4,
      servicesDescAr: 'ضغط الدم، مؤشر كتلة الجسم، الأسنان، عنق الرحم',
      servicesDescEn: 'BP, BMI, Dental, Cervical',
      totalEligible: 11600000,
      color: '#ec4899'
    },
    {
      riskProfileAr: 'إناث كبار (40-60)',
      riskProfileEn: 'Older Females (40–60)',
      population: 1000000,
      avgServices: 6,
      servicesDescAr: 'ضغط الدم، مؤشر كتلة الجسم، الأسنان، السكري، الثدي، عنق الرحم',
      servicesDescEn: 'BP, BMI, Dental, Diabetes, Mammo, Cervical',
      totalEligible: 6000000,
      color: '#f59e0b'
    },
  ];

  // Service breakdown data
  const serviceBreakdown = [
    {
      categoryAr: 'الفحوصات الشاملة',
      categoryEn: 'Universal Services',
      icon: Activity,
      services: [
        {
          nameAr: 'قياس ضغط الدم + مؤشر كتلة الجسم',
          nameEn: 'Blood Pressure & BMI',
          descAr: 'كل بالغ، كل سنة',
          descEn: 'Every adult, every year',
          volume: 26000000,
          color: '#10b981'
        },
        {
          nameAr: 'طب الأسنان الوقائي (تنظيف/تقشير)',
          nameEn: 'Dental Prevention (Cleaning/Scaling)',
          descAr: 'مغطى ضمن وثائق مجلس الضمان الصحي',
          descEn: 'Under CHI policies, basic preventive dental is covered',
          volume: 13000000,
          color: '#6366f1'
        }
      ]
    },
    {
      categoryAr: 'فحوصات السكري والأيض',
      categoryEn: 'Diabetes & Metabolic Screening',
      icon: Heart,
      saudiFactorAr: 'العامل السعودي: توصي إرشادات المركز السعودي الوطني للسكري بفحص جميع البالغين فوق 35 عامًا وأي بالغ مؤشر كتلة جسمه أكثر من 25',
      saudiFactorEn: 'The Saudi Difference: While US guidelines often wait until age 35 or 45, Saudi National Diabetes Center (SNDC) guidelines recommend screening all adults 35+ and any adult with BMI >25',
      services: [
        {
          nameAr: 'فحص السكري التراكمي أو الصيامي',
          nameEn: 'HbA1c or FPG tests',
          descAr: 'السكان المؤهلون: ~4.6 مليون (جميع من هم فوق 35 بالإضافة إلى الفئات عالية الخطورة)',
          descEn: 'Eligible Population: ~4.6 Million (All 35+ plus high-risk younger)',
          volume: 4600000,
          color: '#ef4444'
        },
        {
          nameAr: 'فحص الدهون (Lipid Profile)',
          nameEn: 'Lipid Profile Screening',
          descAr: 'البالغون 40+ سنوياً، أو 20+ مع عوامل خطر (سمنة، سكري، ضغط، تاريخ عائلي)',
          descEn: 'Adults 40+ annually, or 20+ with risk factors (obesity, diabetes, hypertension, family history)',
          volume: 4600000,
          eligibleAr: '~4.6 مليون سنوياً',
          eligibleEn: '~4.6M annually',
          color: '#f59e0b'
        }
      ]
    },
    {
      categoryAr: 'فحوصات الصحة النفسية والعظام',
      categoryEn: 'Mental Health & Bone Health Screenings',
      icon: Bone,
      services: [
        {
          nameAr: 'فحص هشاشة العظام (DEXA)',
          nameEn: 'Osteoporosis Screening (DEXA)',
          descAr: 'النساء 65+ أو ما بعد سن اليأس مع عوامل خطر، الرجال 70+',
          descEn: 'Women 65+ or postmenopausal with risk factors, Men 70+',
          volume: 350000,
          eligibleAr: '~700,000 / سنتين',
          eligibleEn: '~700K / 2 years',
          color: '#78716c'
        },
        {
          nameAr: 'فحص الاكتئاب (PHQ-9)',
          nameEn: 'Depression Screening (PHQ-9)',
          descAr: 'جميع البالغين 18+ سنوياً، مع التركيز على الفئات عالية الخطورة',
          descEn: 'All adults 18+ annually, with focus on high-risk groups',
          volume: 13000000,
          eligibleAr: '13 مليون سنوياً',
          eligibleEn: '13M annually',
          color: '#8b5cf6'
        }
      ]
    },
    {
      categoryAr: 'فحوصات السرطان',
      categoryEn: 'Cancer Screenings',
      icon: Stethoscope,
      services: [
        {
          nameAr: 'الماموجرام (سرطان الثدي)',
          nameEn: 'Breast Cancer (Mammography)',
          descAr: 'الإرشادات السعودية: البدء من سن 40 (أصغر من المعيار الأمريكي 50) - كل سنتين',
          descEn: 'Saudi Guideline: Start at age 40 (Younger than US standard of 50) - every 2 years',
          volume: 500000,
          eligibleAr: 'النساء 40-60 (~1 مليون)',
          eligibleEn: 'Women 40–60 (~1M women)',
          color: '#ec4899'
        },
        {
          nameAr: 'مسحة عنق الرحم (سرطان عنق الرحم)',
          nameEn: 'Cervical Cancer (Pap Smear)',
          descAr: 'النساء المتزوجات أو النشطات جنسياً 21-65 كل 3 سنوات',
          descEn: 'Married/Sexually active women 21–65 every 3 years',
          volume: 1100000,
          eligibleAr: '~3.5 مليون / 3',
          eligibleEn: '~3.5M women / 3',
          color: '#a855f7'
        },
        {
          nameAr: 'منظار القولون (سرطان القولون والمستقيم)',
          nameEn: 'Colorectal Cancer (Colonoscopy)',
          descAr: 'البالغون من سن 45-75، كل 10 سنوات (أو فحص البراز سنوياً)',
          descEn: 'Adults 45-75, every 10 years (or annual stool test)',
          volume: 460000,
          eligibleAr: '~4.6 مليون / 10',
          eligibleEn: '~4.6M adults / 10',
          color: '#14b8a6'
        },
        {
          nameAr: 'فحص سرطان البروستاتا (PSA)',
          nameEn: 'Prostate Cancer Screening (PSA)',
          descAr: 'الرجال 50-70 عاماً، اختياري بعد المناقشة مع الطبيب',
          descEn: 'Men 50-70 years, optional after physician discussion',
          volume: 300000,
          eligibleAr: '~3 مليون / 10 (اختياري)',
          eligibleEn: '~3M men / 10 (optional)',
          color: '#3b82f6'
        }
      ]
    }
  ];

  // Chart data for population distribution
  const populationChartData = populationBreakdown.map(item => ({
    name: isRTL ? item.riskProfileAr : item.riskProfileEn,
    value: item.population,
    color: item.color
  }));

  // Chart data for services distribution
  const servicesChartData = populationBreakdown.map(item => ({
    name: isRTL ? item.riskProfileAr : item.riskProfileEn,
    services: item.totalEligible / 1000000,
    color: item.color
  }));

  // Strategic segments
  const strategicSegments = [
    {
      nameAr: 'الصحة العامة والعلامات الحيوية',
      nameEn: 'Wellness/Vital Signs',
      volumeTypeAr: 'حجم عالي',
      volumeTypeEn: 'High Volume',
      servicesAr: ['ضغط الدم', 'مؤشر كتلة الجسم', 'تنظيف الأسنان'],
      servicesEn: ['Blood Pressure', 'BMI', 'Dental Cleaning'],
      impactAr: 'يشكل 75% من إجمالي الخدمات المؤهلة',
      impactEn: 'Represents 75% of total eligible services',
      color: 'bg-success/10 text-success border-success/20'
    },
    {
      nameAr: 'الفحوصات السريرية للأمراض',
      nameEn: 'Clinical Disease Screening',
      volumeTypeAr: 'قيمة عالية',
      volumeTypeEn: 'High Value',
      servicesAr: ['ماموجرام', 'مسحة عنق الرحم', 'منظار القولون'],
      servicesEn: ['Mammography', 'Pap Smear', 'Colonoscopy'],
      impactAr: '70% من السكان (الذكور الشباب) غير مؤهلين لها',
      impactEn: '70% of population (Young Males) is not eligible for them',
      color: 'bg-warning/10 text-warning border-warning/20'
    }
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + (isRTL ? ' مليون' : 'M');
    }
    return num.toLocaleString(isRTL ? 'ar-SA' : 'en-US');
  };

  const totalEligibleServices = populationBreakdown.reduce((acc, item) => acc + item.totalEligible, 0);
  const totalPopulation = populationBreakdown.reduce((acc, item) => acc + item.population, 0);
  const avgServicesPerPerson = (totalEligibleServices / totalPopulation).toFixed(1);

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-8 sm:py-12 overflow-hidden gradient-hero">
        <div className="absolute inset-0 chi-pattern" />
        <div className="container mx-auto px-4 relative">
          <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="p-3 rounded-xl bg-primary-foreground/10">
              <Target className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h1 className="text-2xl sm:text-3xl font-bold text-primary-foreground">
                {isRTL ? 'مؤشر استخدام الخدمات الوقائية' : 'Preventive Services Utilization Indicator'}
              </h1>
              <p className="text-sm text-primary-foreground/70 mt-1">
                {isRTL 
                  ? 'مؤشر استراتيجي لقياس معدل تقديم الخدمات الوقائية للسكان المؤمن عليهم'
                  : 'Strategic indicator measuring preventive services delivery rate for insured population'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">
        {/* The Key Number */}
        <Card className="mb-8 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="pt-6">
            <div className="text-center">
              <Badge variant="outline" className="mb-4 text-sm">
                {isRTL ? 'الرقم الاستراتيجي' : 'The Strategic Number'}
              </Badge>
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-5xl sm:text-7xl font-bold text-primary">64</span>
                <span className="text-2xl sm:text-3xl font-medium text-primary/70">
                  {isRTL ? 'مليون' : 'Million'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                {isRTL 
                  ? 'فرص الخدمات الوقائية المؤهلة سنوياً'
                  : 'Eligible Preventive Service Opportunities Annually'}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {isRTL 
                  ? 'هذا يعني أن نظامك يجب أن يسجل مثالياً 64 مليون إجراء وقائي مميز (فحوصات، تحاليل، أو جلسات استشارية) سنوياً لتحقيق نسبة استخدام 100%'
                  : 'This means your system should ideally register 64 million distinct preventive actions (tests, screenings, or counseling sessions) per year to achieve 100% utilization'}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              <div className="text-center p-4 rounded-lg bg-background/50">
                <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">{formatNumber(totalPopulation)}</p>
                <p className="text-xs text-muted-foreground">
                  {isRTL ? 'إجمالي السكان' : 'Total Population'}
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-background/50">
                <Activity className="h-6 w-6 mx-auto mb-2 text-success" />
                <p className="text-2xl font-bold">{avgServicesPerPerson}</p>
                <p className="text-xs text-muted-foreground">
                  {isRTL ? 'متوسط الخدمات للفرد' : 'Avg Services/Person'}
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-background/50">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-warning" />
                <p className="text-2xl font-bold">70%</p>
                <p className="text-xs text-muted-foreground">
                  {isRTL ? 'نسبة الذكور' : 'Male Ratio'}
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-background/50">
                <Calculator className="h-6 w-6 mx-auto mb-2 text-info" />
                <p className="text-2xl font-bold">18-60</p>
                <p className="text-xs text-muted-foreground">
                  {isRTL ? 'الفئة العمرية' : 'Age Range'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Methodology Tabs */}
        <Tabs defaultValue="breakdown" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="breakdown">
              {isRTL ? 'تفصيل السكان' : 'Population Breakdown'}
            </TabsTrigger>
            <TabsTrigger value="services">
              {isRTL ? 'أنواع الخدمات' : 'Service Types'}
            </TabsTrigger>
            <TabsTrigger value="strategy">
              {isRTL ? 'الرؤية الاستراتيجية' : 'Strategic Insight'}
            </TabsTrigger>
          </TabsList>

          {/* Population Breakdown Tab */}
          <TabsContent value="breakdown" className="space-y-6">
            <Card>
              <CardHeader className={isRTL ? 'text-right' : 'text-left'}>
                <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                  <Users className="h-5 w-5 text-primary" />
                  {isRTL ? 'تفصيل المقام (لكل شخص/سنة)' : 'The Denominator Breakdown (Per Person/Year)'}
                </CardTitle>
                <CardDescription className={isRTL ? 'text-right' : 'text-left'}>
                  {isRTL 
                    ? 'تم تعديل المعايير الدولية لتتوافق مع الإرشادات الوطنية السعودية، والتي تعتبر أكثر صرامة من إرشادات الولايات المتحدة/أوروبا للسكري وسرطان الثدي بسبب معدلات الانتشار المحلية'
                    : 'International benchmarks were adjusted to fit Saudi National Guidelines, which are more aggressive than US/EU guidelines for Diabetes and Breast Cancer due to local prevalence rates'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className={isRTL ? 'text-right' : 'text-left'}>
                          {isRTL ? 'الفئة المخاطر' : 'Risk Profile'}
                        </TableHead>
                        <TableHead className={isRTL ? 'text-right' : 'text-left'}>
                          {isRTL ? 'تقدير السكان' : 'Population Est.'}
                        </TableHead>
                        <TableHead className={isRTL ? 'text-right' : 'text-left'}>
                          {isRTL ? 'متوسط الخدمات المطلوبة' : 'Avg. Services Needed'}
                        </TableHead>
                        <TableHead className={isRTL ? 'text-right' : 'text-left'}>
                          {isRTL ? 'إجمالي الخدمات المؤهلة' : 'Total Eligible Services'}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {populationBreakdown.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell className={`font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
                            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: row.color }}
                              />
                              {isRTL ? row.riskProfileAr : row.riskProfileEn}
                            </div>
                            <p className={`text-xs text-muted-foreground mt-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                              {isRTL ? row.servicesDescAr : row.servicesDescEn}
                            </p>
                          </TableCell>
                          <TableCell className={isRTL ? 'text-right' : 'text-left'}>{formatNumber(row.population)}</TableCell>
                          <TableCell className={isRTL ? 'text-right' : 'text-left'}>
                            <Badge variant="secondary">{row.avgServices}</Badge>
                          </TableCell>
                          <TableCell className={`font-semibold text-primary ${isRTL ? 'text-right' : 'text-left'}`}>
                            {formatNumber(row.totalEligible)}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-muted/50 font-bold">
                        <TableCell className={isRTL ? 'text-right' : 'text-left'}>{isRTL ? 'الإجمالي' : 'TOTAL'}</TableCell>
                        <TableCell className={isRTL ? 'text-right' : 'text-left'}>{formatNumber(totalPopulation)}</TableCell>
                        <TableCell className={isRTL ? 'text-right' : 'text-left'}>
                          <Badge>{avgServicesPerPerson}</Badge>
                          <span className="text-xs text-muted-foreground ms-1">
                            {isRTL ? '(المرجح)' : '(Weighted)'}
                          </span>
                        </TableCell>
                        <TableCell className={`text-primary ${isRTL ? 'text-right' : 'text-left'}`}>
                          ~{formatNumber(totalEligibleServices)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* Charts */}
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div>
                    <h4 className="font-medium mb-4 text-center">
                      {isRTL ? 'توزيع السكان' : 'Population Distribution'}
                    </h4>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={populationChartData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                        >
                          {populationChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => formatNumber(value)} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div>
                    <h4 className="font-medium mb-4 text-center">
                      {isRTL ? 'الخدمات المؤهلة (بالمليون)' : 'Eligible Services (Millions)'}
                    </h4>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={servicesChartData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 10 }} />
                        <Tooltip formatter={(value: number) => `${value}M`} />
                        <Bar dataKey="services" fill="hsl(var(--primary))">
                          {servicesChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Service Types Tab */}
          <TabsContent value="services" className="space-y-6">
            {serviceBreakdown.map((category, catIndex) => (
              <Card key={catIndex}>
                <CardHeader className={isRTL ? 'text-right' : 'text-left'}>
                  <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                    <category.icon className="h-5 w-5 text-primary" />
                    {isRTL ? category.categoryAr : category.categoryEn}
                  </CardTitle>
                  {category.saudiFactorAr && (
                    <div className={`flex items-start gap-2 p-3 rounded-lg bg-warning/10 border border-warning/20 mt-2 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                      <Info className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                      <p className="text-sm text-warning-foreground">
                        {isRTL ? category.saudiFactorAr : category.saudiFactorEn}
                      </p>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.services.map((service, svcIndex) => (
                      <div 
                        key={svcIndex} 
                        className="p-4 rounded-lg border bg-muted/30"
                      >
                        <div className={`flex items-start justify-between gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <div className={isRTL ? 'text-right' : 'text-left'}>
                            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: service.color }}
                              />
                              <h4 className="font-medium">
                                {isRTL ? service.nameAr : service.nameEn}
                              </h4>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {isRTL ? service.descAr : service.descEn}
                            </p>
                            {service.eligibleAr && (
                              <p className="text-xs text-muted-foreground mt-1">
                                <span className="font-medium">
                                  {isRTL ? 'المؤهلون: ' : 'Eligible: '}
                                </span>
                                {isRTL ? service.eligibleAr : service.eligibleEn}
                              </p>
                            )}
                          </div>
                          <div className={`text-${isRTL ? 'left' : 'right'} shrink-0`}>
                            <p className="text-2xl font-bold text-primary">
                              {formatNumber(service.volume)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {isRTL ? 'سنوياً' : 'annually'}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Volume Summary */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="grid sm:grid-cols-5 gap-4 text-center">
                  <div className="p-4 rounded-lg bg-background">
                    <Activity className="h-8 w-8 mx-auto mb-2 text-success" />
                    <p className="text-2xl font-bold">39M</p>
                    <p className="text-sm text-muted-foreground">
                      {isRTL ? 'الخدمات الشاملة' : 'Universal Services'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {isRTL ? '(ضغط + BMI + أسنان)' : '(BP + BMI + Dental)'}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-background">
                    <Heart className="h-8 w-8 mx-auto mb-2 text-destructive" />
                    <p className="text-2xl font-bold">9.2M</p>
                    <p className="text-sm text-muted-foreground">
                      {isRTL ? 'فحوصات الأيض' : 'Metabolic Screening'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {isRTL ? '(سكري + دهون)' : '(Diabetes + Lipids)'}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-background">
                    <Bone className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                    <p className="text-2xl font-bold">13.4M</p>
                    <p className="text-sm text-muted-foreground">
                      {isRTL ? 'الصحة النفسية والعظام' : 'Mental & Bone Health'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {isRTL ? '(اكتئاب + هشاشة)' : '(Depression + DEXA)'}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-background">
                    <Stethoscope className="h-8 w-8 mx-auto mb-2 text-pink-500" />
                    <p className="text-2xl font-bold">2.4M</p>
                    <p className="text-sm text-muted-foreground">
                      {isRTL ? 'فحوصات السرطان' : 'Cancer Screenings'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {isRTL ? '(ثدي + عنق الرحم + قولون + بروستاتا)' : '(Breast + Cervical + Colon + Prostate)'}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-primary/10 border-2 border-primary/30">
                    <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold text-primary">64M</p>
                    <p className="text-sm text-muted-foreground font-medium">
                      {isRTL ? 'الإجمالي' : 'Total'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Strategic Insight Tab */}
          <TabsContent value="strategy" className="space-y-6">
            <Card>
              <CardHeader className={isRTL ? 'text-right' : 'text-left'}>
                <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                  <TrendingUp className="h-5 w-5 text-primary" />
                  {isRTL ? 'الرؤية الاستراتيجية للوحة المعلومات' : 'Strategic Insight for Your Dashboard'}
                </CardTitle>
                <CardDescription className={isRTL ? 'text-right' : 'text-left'}>
                  {isRTL 
                    ? 'بما أن لديك سكان شباب وغالبيتهم ذكور، فإن معدل الاستخدام سيعتمد بشكل كبير على ثلاثة مقاييس "منخفضة التعقيد"'
                    : 'Since you have a young, male-heavy population, your utilization rate will be heavily dependent on three "Low Complexity" metrics'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {strategicSegments.map((segment, index) => (
                    <div 
                      key={index} 
                      className={`p-6 rounded-xl border-2 ${segment.color}`}
                    >
                      <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <h3 className="font-bold text-lg">
                          {isRTL ? segment.nameAr : segment.nameEn}
                        </h3>
                        <Badge variant="outline" className={segment.color}>
                          {isRTL ? segment.volumeTypeAr : segment.volumeTypeEn}
                        </Badge>
                      </div>
                      
                      <div className={`space-y-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                        <div>
                          <p className="text-sm font-medium mb-2">
                            {isRTL ? 'الخدمات:' : 'Services:'}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {(isRTL ? segment.servicesAr : segment.servicesEn).map((service, sIdx) => (
                              <Badge key={sIdx} variant="secondary" className="text-xs">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                          <ChevronRight className="h-4 w-4 shrink-0 mt-0.5" />
                          <p className="text-sm">
                            {isRTL ? segment.impactAr : segment.impactEn}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recommendation */}
                <div className="mt-6 p-4 rounded-lg bg-info/10 border border-info/20">
                  <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                    <Info className="h-5 w-5 text-info shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-info-foreground mb-1">
                        {isRTL ? 'التوصية' : 'Recommendation'}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {isRTL 
                          ? 'قسّم تقاريرك إلى "الصحة العامة/العلامات الحيوية" (حجم عالي) مقابل "الفحوصات السريرية للأمراض" (قيمة عالية) لتجنب تشويه البيانات. إذا تتبعت "الفحوصات الطبية" فقط (مثل المنظار أو الماموجرام)، سيبدو معدلك منخفضاً بشكل مصطنع لأن 70% من سكانك (الذكور الشباب) غير مؤهلين لها أصلاً.'
                          : 'Segment your reporting into "Wellness/Vital Signs" (High Volume) vs. "Clinical Disease Screening" (High Value) to avoid skewing the data. If you only track "Medical Screenings" (like Colonoscopy or Mammography), your rate will look artificially low because 70% of your population (Young Males) isn\'t even eligible for them.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid sm:grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <p className="text-4xl font-bold text-success">75%</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {isRTL ? 'من الخدمات: صحة عامة' : 'of services: Wellness'}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <p className="text-4xl font-bold text-warning">25%</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {isRTL ? 'من الخدمات: فحوصات سريرية' : 'of services: Clinical'}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <p className="text-4xl font-bold text-primary">4.0</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {isRTL ? 'متوسط الخدمات/شخص/سنة' : 'Avg. Services/Person/Year'}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Formula Card */}
            <Card className="bg-muted/50">
              <CardHeader className={isRTL ? 'text-right' : 'text-left'}>
                <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                  <Calculator className="h-5 w-5 text-primary" />
                  {isRTL ? 'معادلة حساب المؤشر' : 'Indicator Calculation Formula'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-6 rounded-lg bg-background border text-center">
                  <p className="text-lg font-mono">
                    {isRTL ? (
                      <>
                        <span className="text-primary font-bold">معدل الاستخدام</span>
                        {' = '}
                        <span className="text-success">(الخدمات المقدمة فعلياً)</span>
                        {' ÷ '}
                        <span className="text-warning">(64 مليون فرصة مؤهلة)</span>
                        {' × 100%'}
                      </>
                    ) : (
                      <>
                        <span className="text-primary font-bold">Utilization Rate</span>
                        {' = '}
                        <span className="text-success">(Services Actually Delivered)</span>
                        {' ÷ '}
                        <span className="text-warning">(64M Eligible Opportunities)</span>
                        {' × 100%'}
                      </>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground mt-4">
                    {isRTL 
                      ? 'مثال: إذا قدمت 32 مليون خدمة وقائية، فإن معدل الاستخدام = 50%'
                      : 'Example: If you delivered 32 million preventive services, Utilization Rate = 50%'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default PreventiveUtilizationIndicator;
