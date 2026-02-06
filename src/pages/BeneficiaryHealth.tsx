import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Heart, Users, Activity, Target, TrendingUp, 
  FileText, CheckCircle2, BarChart3, PieChart, Stethoscope,
  Shield, Lightbulb, Database, Brain, ClipboardList
} from 'lucide-react';
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const BeneficiaryHealth = () => {
  const { language, isRTL } = useLanguage();

  // Beneficiary distribution data - Updated based on CHI statistics
  // Note: Domestic worker insurance became mandatory July 2024 only for employers with 4+ workers
  const beneficiaryDistribution = [
    { name: language === 'ar' ? 'موظفو القطاع الخاص' : 'Private Sector Employees', value: 8500000, color: '#1B6B4D' },
    { name: language === 'ar' ? 'مرافقو الموظفين' : 'Employee Dependents', value: 3200000, color: '#2E8B67' },
    { name: language === 'ar' ? 'العمالة المنزلية' : 'Domestic Workers', value: 380000, color: '#45A77D' },
    { name: language === 'ar' ? 'الإقامة المميزة' : 'Premium Residency', value: 150000, color: '#5CC394' },
    { name: language === 'ar' ? 'الزوار والمعتمرون' : 'Visitors & Umrah', value: 2000000, color: '#73D9AB' },
  ];

  const totalBeneficiaries = beneficiaryDistribution.reduce((sum, item) => sum + item.value, 0);

  // Health conditions priority data
  const healthConditions = [
    { name: language === 'ar' ? 'السكري' : 'Diabetes', prevalence: 24.7, cost: 35 },
    { name: language === 'ar' ? 'ارتفاع ضغط الدم' : 'Hypertension', prevalence: 28.6, cost: 20 },
    { name: language === 'ar' ? 'السمنة' : 'Obesity', prevalence: 35.4, cost: 25 },
    { name: language === 'ar' ? 'أمراض القلب' : 'Heart Disease', prevalence: 8.2, cost: 40 },
    { name: language === 'ar' ? 'الصحة النفسية' : 'Mental Health', prevalence: 15.3, cost: 15 },
  ];

  // PHM Cycle stages
  const phmCycle = [
    {
      stage: language === 'ar' ? 'التحديد' : 'Identification',
      description: language === 'ar' ? 'تحديد الفئات السكانية والحالات الصحية ذات الأولوية' : 'Identify priority population groups and health conditions',
      icon: Target,
      details: language === 'ar' 
        ? ['تحليل بيانات المطالبات', 'تجزئة السكان حسب المخاطر', 'تحديد الفجوات في الرعاية']
        : ['Claims data analysis', 'Risk-based population segmentation', 'Care gap identification']
    },
    {
      stage: language === 'ar' ? 'التصنيف' : 'Classification',
      description: language === 'ar' ? 'تصنيف المستفيدين حسب مستوى المخاطر الصحية' : 'Classify beneficiaries by health risk level',
      icon: BarChart3,
      details: language === 'ar'
        ? ['منخفض المخاطر: وقاية وتعزيز الصحة', 'متوسط المخاطر: إدارة الأمراض المزمنة', 'مرتفع المخاطر: رعاية مكثفة']
        : ['Low risk: Prevention & health promotion', 'Medium risk: Chronic disease management', 'High risk: Intensive care']
    },
    {
      stage: language === 'ar' ? 'التدخل' : 'Intervention',
      description: language === 'ar' ? 'تصميم وتنفيذ برامج التدخل المناسبة' : 'Design and implement appropriate intervention programs',
      icon: Activity,
      details: language === 'ar'
        ? ['برامج إدارة الأمراض المزمنة', 'التثقيف الصحي والوقاية', 'المتابعة الدورية']
        : ['Chronic disease management programs', 'Health education & prevention', 'Regular follow-up']
    },
    {
      stage: language === 'ar' ? 'القياس' : 'Measurement',
      description: language === 'ar' ? 'قياس النتائج الصحية والتكاليف' : 'Measure health outcomes and costs',
      icon: TrendingUp,
      details: language === 'ar'
        ? ['مؤشرات الأداء الرئيسية', 'قياس جودة الحياة', 'تحليل فعالية التكلفة']
        : ['Key performance indicators', 'Quality of life measurement', 'Cost-effectiveness analysis']
    },
  ];

  // Key initiatives
  const initiatives = [
    {
      title: language === 'ar' ? 'برنامج صحة مستفيدي مجلس الضمان الصحي (PHM)' : 'CHI Beneficiary Health Program (PHM)',
      description: language === 'ar' ? 'بناء برنامج شامل لصحة مستفيدي مجلس الضمان الصحي يتماشى مع أفضل الممارسات العالمية' : 'Building a comprehensive beneficiary health program aligned with global best practices',
      icon: Heart,
      features: language === 'ar' 
        ? ['تطوير دليل إرشادي للبرنامج', 'خطة اتصال داعمة', 'خارطة طريق استراتيجية']
        : ['Program guidebook development', 'Supporting communication plan', 'Strategic roadmap']
    },
    {
      title: language === 'ar' ? 'بيانات وتحليلات صحة المستفيدين' : 'Beneficiary Health Data & Analytics',
      description: language === 'ar' ? 'تطوير قدرات تحليل البيانات لدعم قرارات الرعاية الصحية' : 'Developing data analytics capabilities to support healthcare decisions',
      icon: Database,
      features: language === 'ar'
        ? ['تقييم جودة البيانات', 'تحليلات تجزئة السكان', 'لوحات معلومات ديناميكية']
        : ['Data quality assessment', 'Population segmentation analytics', 'Dynamic dashboards']
    },
    {
      title: language === 'ar' ? 'الدفع المبني على القيمة' : 'Value-Based Payment',
      description: language === 'ar' ? 'ربط المدفوعات بنتائج الرعاية الصحية بدلاً من حجم الخدمات' : 'Linking payments to healthcare outcomes rather than service volume',
      icon: Target,
      features: language === 'ar'
        ? ['عقود قائمة على النتائج', 'حزم دفع مجمعة', 'حوافز متوائمة']
        : ['Outcome-based contracts', 'Bundled payment packages', 'Aligned incentives']
    },
    {
      title: language === 'ar' ? 'تحسين التوثيق السريري (CDI)' : 'Clinical Documentation Improvement (CDI)',
      description: language === 'ar' ? 'ضمان توثيق دقيق وشامل لرعاية المرضى' : 'Ensuring accurate and comprehensive patient care documentation',
      icon: ClipboardList,
      features: language === 'ar'
        ? ['ترميز ICD-10 AM محسّن', 'تقليل رفض المطالبات', 'دعم القرارات السريرية']
        : ['Enhanced ICD-10 AM coding', 'Reduced claim rejections', 'Clinical decision support']
    },
  ];

  // PROMS and PREMS measures
  const patientMeasures = [
    {
      type: 'PROM',
      title: language === 'ar' ? 'مقاييس نتائج المرضى المبلغ عنها' : 'Patient-Reported Outcome Measures',
      description: language === 'ar' ? 'تقييم الحالة الصحية من منظور المريض' : 'Assessing health status from the patient perspective',
      examples: language === 'ar' 
        ? ['جودة الحياة', 'مستوى الألم', 'القدرة الوظيفية', 'الصحة النفسية']
        : ['Quality of life', 'Pain level', 'Functional capacity', 'Mental health']
    },
    {
      type: 'PREM',
      title: language === 'ar' ? 'مقاييس تجربة المرضى المبلغ عنها' : 'Patient-Reported Experience Measures',
      description: language === 'ar' ? 'تقييم تجربة المريض مع نظام الرعاية الصحية' : 'Evaluating patient experience with the healthcare system',
      examples: language === 'ar'
        ? ['رضا المريض', 'التواصل مع مقدم الخدمة', 'سهولة الوصول', 'وقت الانتظار']
        : ['Patient satisfaction', 'Provider communication', 'Accessibility', 'Wait time']
    },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-foreground">{payload[0].name}</p>
          <p className="text-muted-foreground text-sm">
            {payload[0].value.toLocaleString(language === 'ar' ? 'ar-SA' : 'en-US')} {language === 'ar' ? 'مستفيد' : 'beneficiaries'}
          </p>
          <p className="text-primary text-sm font-medium">
            {((payload[0].value / totalBeneficiaries) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
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
              <Heart className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-primary-foreground">
              {language === 'ar' ? 'صحة مستفيدي مجلس الضمان الصحي' : 'Population Health'}
            </h1>
          </div>
          
          <p className={`text-xs sm:text-sm text-primary-foreground/85 max-w-2xl ${isRTL ? 'text-right ml-auto' : ''}`}>
            {language === 'ar' 
              ? 'برنامج شامل يهدف إلى تحسين النتائج الصحية للمستفيدين من خلال الرعاية الوقائية وإدارة الأمراض المزمنة والتركيز على القيمة بدلاً من حجم الخدمات'
              : 'A comprehensive program aimed at improving health outcomes for beneficiaries through preventive care, chronic disease management, and focusing on value rather than service volume'}
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">

        {/* Program Goals */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg w-full">
              <Target className="h-5 w-5 text-primary" />
              {language === 'ar' ? 'أهداف برنامج صحة المستفيدين' : 'Beneficiary Health Program Goals'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className={`text-muted-foreground leading-relaxed ${isRTL ? 'text-right' : ''}`}>
              {language === 'ar' 
                ? 'يهدف البرنامج إلى رفع مستوى الوعي الصحي وتحسين جودة الرعاية من خلال التركيز على المحاور التالية:'
                : 'The program aims to raise health awareness and improve care quality by focusing on the following pillars:'}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border bg-card flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center shrink-0">
                  <Shield className="h-5 w-5 text-success" />
                </div>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <h4 className="font-semibold text-foreground mb-1">{language === 'ar' ? 'الخدمات الوقائية' : 'Preventive Services'}</h4>
                  <p className="text-sm text-muted-foreground">{language === 'ar' ? 'التوعية بأهمية الفحوصات الدورية والتطعيمات والكشف المبكر عن الأمراض' : 'Awareness of regular checkups, vaccinations, and early disease detection'}</p>
                </div>
              </div>
              <div className="p-4 rounded-lg border bg-card flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center shrink-0">
                  <Activity className="h-5 w-5 text-info" />
                </div>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <h4 className="font-semibold text-foreground mb-1">{language === 'ar' ? 'إدارة الأمراض المزمنة' : 'Chronic Disease Management'}</h4>
                  <p className="text-sm text-muted-foreground">{language === 'ar' ? 'برامج متكاملة لإدارة السكري وارتفاع الضغط وأمراض القلب والسمنة' : 'Integrated programs for managing diabetes, hypertension, heart disease, and obesity'}</p>
                </div>
              </div>
              <div className="p-4 rounded-lg border bg-card flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center shrink-0">
                  <Stethoscope className="h-5 w-5 text-warning" />
                </div>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <h4 className="font-semibold text-foreground mb-1">{language === 'ar' ? 'الفحص المبكر' : 'Early Screening'}</h4>
                  <p className="text-sm text-muted-foreground">{language === 'ar' ? 'تشجيع الفحص المبكر للأمراض مثل سرطان الثدي والقولون والسكري' : 'Encouraging early screening for diseases like breast cancer, colon cancer, and diabetes'}</p>
                </div>
              </div>
              <div className="p-4 rounded-lg border bg-card flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Database className="h-5 w-5 text-primary" />
                </div>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <h4 className="font-semibold text-foreground mb-1">{language === 'ar' ? 'توحيد تعاريف المرضى' : 'Unified Patient Definitions'}</h4>
                  <p className="text-sm text-muted-foreground">{language === 'ar' ? 'استخدام بيانات نفيس لتوحيد تصنيف المرضى حسب التوجه الوطني وتحسين جودة البيانات الصحية' : 'Using NAPHIES data to unify patient classification according to national guidelines and improve health data quality'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <Card className="text-center p-4 border-primary/20 bg-primary/5">
            <p className="text-2xl sm:text-3xl font-bold text-primary">{(totalBeneficiaries / 1000000).toFixed(1)}M+</p>
            <p className="text-xs sm:text-sm text-muted-foreground">{language === 'ar' ? 'إجمالي المستفيدين' : 'Total Beneficiaries'}</p>
          </Card>
          <Card className="text-center p-4 border-info/20 bg-info/5">
            <p className="text-2xl sm:text-3xl font-bold text-info">25</p>
            <p className="text-xs sm:text-sm text-muted-foreground">{language === 'ar' ? 'شركة تأمين' : 'Insurance Companies'}</p>
          </Card>
          <Card className="text-center p-4 border-success/20 bg-success/5">
            <p className="text-2xl sm:text-3xl font-bold text-success">2,500+</p>
            <p className="text-xs sm:text-sm text-muted-foreground">{language === 'ar' ? 'مقدم رعاية صحية' : 'Healthcare Providers'}</p>
          </Card>
          <Card className="text-center p-4 border-warning/20 bg-warning/5">
            <p className="text-2xl sm:text-3xl font-bold text-warning">5</p>
            <p className="text-xs sm:text-sm text-muted-foreground">{language === 'ar' ? 'حالات صحية ذات أولوية' : 'Priority Health Conditions'}</p>
          </Card>
        </div>

        {/* Beneficiary Distribution Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <PieChart className="h-5 w-5 text-primary" />
                {language === 'ar' ? 'توزيع المستفيدين حسب الفئة' : 'Beneficiary Distribution by Category'}
              </CardTitle>
              <CardDescription>
                {language === 'ar' 
                  ? `إجمالي ${(totalBeneficiaries / 1000000).toFixed(1)} مليون مستفيد`
                  : `Total ${(totalBeneficiaries / 1000000).toFixed(1)} million beneficiaries`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 sm:h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie>
                    <Pie
                      data={beneficiaryDistribution}
                      cx="50%"
                      cy="35%"
                      innerRadius={40}
                      outerRadius={65}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {beneficiaryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      verticalAlign="bottom" 
                      wrapperStyle={{ paddingTop: '10px', fontSize: '10px' }}
                      formatter={(value) => <span className="text-[8px] sm:text-xs leading-tight">{value}</span>}
                    />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <BarChart3 className="h-5 w-5 text-primary" />
                {language === 'ar' ? 'الحالات الصحية ذات الأولوية 2024-2025' : 'Priority Health Conditions 2024-2025'}
              </CardTitle>
              <CardDescription className={isRTL ? 'text-right' : ''}>
                {language === 'ar' ? 'معدل الانتشار (%) وتكلفة الرعاية النسبية' : 'Prevalence rate (%) and relative care cost'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72 sm:h-96" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={healthConditions} 
                    layout="vertical" 
                    margin={{ left: 0, right: 10, top: 5, bottom: 40 }}
                  >
                    <XAxis 
                      type="number" 
                      domain={[0, 50]} 
                      tick={{ fontSize: 8, fill: '#6b7280' }} 
                      tickLine={false}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      width={70}
                      tick={{ fontSize: 9, fill: '#374151', fontWeight: 500 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      formatter={(value, name) => [
                        `${value}%`,
                        name === 'prevalence' 
                          ? (language === 'ar' ? 'معدل الانتشار' : 'Prevalence Rate')
                          : (language === 'ar' ? 'تكلفة الرعاية' : 'Care Cost')
                      ]}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        fontSize: '10px'
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ paddingTop: '10px' }}
                      formatter={(value) => (
                        <span className="text-[8px] sm:text-sm mx-1">
                          {value === 'prevalence' 
                            ? (language === 'ar' ? 'معدل الانتشار' : 'Prevalence')
                            : (language === 'ar' ? 'تكلفة الرعاية' : 'Care Cost')}
                        </span>
                      )}
                    />
                    <Bar 
                      dataKey="prevalence" 
                      name="prevalence" 
                      fill="#1B6B4D" 
                      radius={[0, 4, 4, 0]}
                      barSize={12}
                    />
                    <Bar 
                      dataKey="cost" 
                      name="cost" 
                      fill="#73D9AB" 
                      radius={[0, 4, 4, 0]}
                      barSize={12}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* PHM Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              {language === 'ar' ? 'ما هي صحة مستفيدي مجلس الضمان الصحي (PHM)؟' : 'What is Population Health Management (PHM)?'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className={`text-muted-foreground leading-relaxed ${isRTL ? 'text-right' : ''}`}>
              {language === 'ar' 
                ? 'صحة مستفيدي مجلس الضمان الصحي (Population Health Management) هي نهج شامل يركز على تحسين النتائج الصحية لمجموعة سكانية محددة من خلال:'
                : 'Population Health Management (PHM) is a comprehensive approach focused on improving health outcomes for a defined population through:'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className={`p-4 rounded-lg bg-primary/5 border border-primary/20 ${isRTL ? 'text-right' : ''}`}>
                <Shield className={`h-6 w-6 text-primary mb-2 ${isRTL ? 'mr-auto ml-0' : ''}`} />
                <h4 className="font-semibold mb-1">{language === 'ar' ? 'الوقاية والتعزيز' : 'Prevention & Promotion'}</h4>
                <p className="text-sm text-muted-foreground">{language === 'ar' ? 'برامج وقائية للحد من الأمراض قبل حدوثها' : 'Preventive programs to reduce diseases before they occur'}</p>
              </div>
              <div className={`p-4 rounded-lg bg-info/5 border border-info/20 ${isRTL ? 'text-right' : ''}`}>
                <Activity className={`h-6 w-6 text-info mb-2 ${isRTL ? 'mr-auto ml-0' : ''}`} />
                <h4 className="font-semibold mb-1">{language === 'ar' ? 'إدارة الأمراض المزمنة' : 'Chronic Disease Management'}</h4>
                <p className="text-sm text-muted-foreground">{language === 'ar' ? 'متابعة فعالة للمرضى المزمنين وتقليل المضاعفات' : 'Effective follow-up for chronic patients and reducing complications'}</p>
              </div>
              <div className={`p-4 rounded-lg bg-success/5 border border-success/20 ${isRTL ? 'text-right' : ''}`}>
                <TrendingUp className={`h-6 w-6 text-success mb-2 ${isRTL ? 'mr-auto ml-0' : ''}`} />
                <h4 className="font-semibold mb-1">{language === 'ar' ? 'تحسين القيمة' : 'Value Improvement'}</h4>
                <p className="text-sm text-muted-foreground">{language === 'ar' ? 'ربط الدفع بالنتائج الصحية بدلاً من حجم الخدمات' : 'Linking payment to health outcomes rather than service volume'}</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 rounded-lg bg-muted/50 border">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-warning" />
                {language === 'ar' ? 'معادلة القيمة في الرعاية الصحية' : 'Healthcare Value Equation'}
              </h4>
              <div className="flex items-center justify-center gap-4 text-center py-4">
                <div className="p-3 rounded-lg bg-background border">
                  <p className="font-bold text-lg text-primary">{language === 'ar' ? 'القيمة' : 'Value'}</p>
                </div>
                <span className="text-2xl font-bold">=</span>
                <div className="p-3 rounded-lg bg-background border">
                  <p className="text-sm text-muted-foreground">{language === 'ar' ? 'النتائج الصحية التي تهم المرضى' : 'Health outcomes that matter to patients'}</p>
                  <div className="border-t my-2"></div>
                  <p className="text-sm text-muted-foreground">{language === 'ar' ? 'تكلفة تقديم الرعاية الصحية' : 'Cost of delivering healthcare'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bridges to Health Framework */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              {language === 'ar' ? 'إطار الجسور للصحة - تصنيف الحالات' : 'Bridges to Health Framework - Case Classification'}
            </CardTitle>
            <CardDescription className={isRTL ? 'text-right' : ''}>
              {language === 'ar' 
                ? 'نموذج تقسيم السكان حسب الحالة الصحية وعوامل الخطر (Bridges to Health Framework)'
                : 'Population segmentation model based on health status and risk factors'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Main Categories */}
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Header - Whole Population */}
                <div className="bg-muted/50 border rounded-t-lg p-3 text-center">
                  <span className="font-bold text-foreground">{language === 'ar' ? 'إجمالي السكان (Whole Population)' : 'Whole Population'}</span>
                </div>
                
                {/* Risk Factors Row */}
                <div className="border-x border-b border-dashed p-2 text-center text-sm text-muted-foreground">
                  {language === 'ar' ? 'عوامل الخطر (قابلة للتعديل / غير قابلة للتعديل)' : 'Risk Factors (Modifiable / Non-modifiable)'}
                </div>
                
                {/* Main Categories Grid */}
                <div className="grid grid-cols-9 gap-1 p-2 border-x border-b bg-background">
                  {/* Category 0 */}
                  <div className="bg-muted/30 border rounded p-2 text-center">
                    <Badge variant="outline" className="mb-1">0</Badge>
                    <p className="text-[10px] text-muted-foreground">{language === 'ar' ? 'غير مسجلين' : 'Unregistered'}</p>
                  </div>
                  
                  {/* Category 1 - Healthy */}
                  <div className="col-span-2 bg-primary/5 border border-primary/20 rounded p-2">
                    <Badge variant="outline" className="mb-1 bg-primary/10">1</Badge>
                    <p className="text-xs font-semibold text-primary mb-2">{language === 'ar' ? 'أصحاء (Healthy)' : 'Healthy'}</p>
                    <div className="space-y-1 text-[10px]">
                      <div className="bg-background/50 rounded p-1">{language === 'ar' ? '1.a أصحاء' : '1.a Healthy'}</div>
                      <div className="bg-background/50 rounded p-1">{language === 'ar' ? '1.b كبار السن' : '1.b Elderly'}</div>
                      <div className="bg-background/50 rounded p-1">{language === 'ar' ? '1.c معرضون للخطر' : '1.c At Risk'}</div>
                      <div className="bg-background/50 rounded p-1">{language === 'ar' ? '1.d رضع' : '1.d Infants'}</div>
                      <div className="bg-background/50 rounded p-1">{language === 'ar' ? '1.e صحة الأم' : '1.e Maternal Health'}</div>
                    </div>
                  </div>
                  
                  {/* Category 2 - Acute */}
                  <div className="bg-info/5 border border-info/20 rounded p-2">
                    <Badge variant="outline" className="mb-1 bg-info/10">2</Badge>
                    <p className="text-xs font-semibold text-info mb-2">{language === 'ar' ? 'للمريض المحتاج إلى عناية حالاً' : 'Acute Care Needed'}</p>
                    <p className="text-[10px] text-muted-foreground">{language === 'ar' ? 'مرض حاد أو غير مصنف' : 'Acute or unclassified illness'}</p>
                  </div>
                  
                  {/* Category 3 - Chronic */}
                  <div className="col-span-2 bg-warning/5 border border-warning/20 rounded p-2">
                    <Badge variant="outline" className="mb-1 bg-warning/10">3</Badge>
                    <p className="text-xs font-semibold text-warning mb-2">{language === 'ar' ? 'أمراض مزمنة' : 'Chronic Diseases'}</p>
                    <div className="grid grid-cols-2 gap-1 text-[10px]">
                      <div className="bg-background/50 rounded p-1">{language === 'ar' ? '3.a متلازمة أيضية' : '3.a Metabolic'}</div>
                      <div className="bg-background/50 rounded p-1">{language === 'ar' ? '3.b قلب وأوعية' : '3.b Cardiovascular'}</div>
                      <div className="bg-background/50 rounded p-1">{language === 'ar' ? '3.c دم' : '3.c Blood'}</div>
                      <div className="bg-background/50 rounded p-1">{language === 'ar' ? '3.d أعصاب' : '3.d Neurological'}</div>
                      <div className="bg-background/50 rounded p-1">{language === 'ar' ? '3.e تنفسي' : '3.e Respiratory'}</div>
                      <div className="bg-background/50 rounded p-1">{language === 'ar' ? '3.f عضلي هيكلي' : '3.f Musculoskeletal'}</div>
                      <div className="bg-background/50 rounded p-1">{language === 'ar' ? '3.g هضمي' : '3.g Digestive'}</div>
                      <div className="bg-background/50 rounded p-1">{language === 'ar' ? '3.h هشاشة وخرف' : '3.h Frailty/Dementia'}</div>
                      <div className="bg-background/50 rounded p-1">{language === 'ar' ? '3.i غدة درقية' : '3.i Thyroid'}</div>
                      <div className="bg-background/50 rounded p-1">{language === 'ar' ? '3.j حالات شديدة' : '3.j Severe Cases'}</div>
                    </div>
                  </div>
                  
                  {/* Category 4 */}
                  <div className="bg-destructive/5 border border-destructive/20 rounded p-2">
                    <Badge variant="outline" className="mb-1 bg-destructive/10">4</Badge>
                    <p className="text-xs font-semibold text-destructive mb-2">{language === 'ar' ? 'نفسية وسلوكية' : 'Mental & Behavioral'}</p>
                  </div>
                  
                  {/* Category 5 */}
                  <div className="bg-secondary/50 border rounded p-2">
                    <Badge variant="outline" className="mb-1">5</Badge>
                    <p className="text-xs font-semibold mb-2">{language === 'ar' ? 'أورام' : 'Oncology'}</p>
                  </div>
                  
                  {/* Categories 6-8 */}
                  <div className="bg-muted/30 border rounded p-2">
                    <div className="space-y-2">
                      <div className="text-center">
                        <Badge variant="outline" className="mb-1">6</Badge>
                        <p className="text-[10px]">{language === 'ar' ? 'حالات خلقية نادرة' : 'Rare Congenital'}</p>
                      </div>
                      <div className="text-center border-t pt-2">
                        <Badge variant="outline" className="mb-1">7</Badge>
                        <p className="text-[10px]">{language === 'ar' ? 'إعاقة' : 'Disability'}</p>
                      </div>
                      <div className="text-center border-t pt-2">
                        <Badge variant="outline" className="mb-1 bg-muted">8</Badge>
                        <p className="text-[10px]">{language === 'ar' ? 'مرحلة نهائية' : 'End Stage'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Bottom Labels */}
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="bg-primary/10 border border-primary/30 rounded p-2 text-center">
                    <span className="text-sm font-semibold text-primary">{language === 'ar' ? 'أصحاء ومحتاجين عناية حالاً' : 'Healthy & Acute Care'}</span>
                  </div>
                  <div className="bg-info/10 border border-info/30 rounded p-2 text-center">
                    <span className="text-sm font-semibold text-info">{language === 'ar' ? 'الفئات المستهدفة' : 'Target Groups'}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Age Groups Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div className="p-3 rounded-lg bg-muted/30 border text-center">
                <p className="font-bold text-primary">0-14</p>
                <p className="text-xs text-muted-foreground">{language === 'ar' ? 'الأطفال' : 'Children'}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/30 border text-center">
                <p className="font-bold text-primary">15-60</p>
                <p className="text-xs text-muted-foreground">{language === 'ar' ? 'البالغون' : 'Adults'}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/30 border text-center">
                <p className="font-bold text-primary">60+</p>
                <p className="text-xs text-muted-foreground">{language === 'ar' ? 'كبار السن' : 'Elderly'}</p>
              </div>
            </div>
            
            {/* Key Points */}
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-warning" />
                {language === 'ar' ? 'أهمية التصنيف' : 'Importance of Classification'}
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  <span>{language === 'ar' ? 'يساعد في تحديد الفئات الأكثر احتياجاً للتدخلات الصحية' : 'Helps identify groups most in need of health interventions'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  <span>{language === 'ar' ? 'يُمكّن من تخصيص الموارد بشكل أكثر فعالية' : 'Enables more effective resource allocation'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  <span>{language === 'ar' ? 'يدعم تصميم برامج الرعاية الوقائية والعلاجية المناسبة لكل فئة' : 'Supports designing appropriate preventive and therapeutic care programs for each group'}</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* PHM Cycle */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              {language === 'ar' ? 'دورة صحة مستفيدي مجلس الضمان الصحي' : 'CHI Population Health Cycle'}
            </CardTitle>
            <CardDescription className={isRTL ? 'text-right' : ''}>
              {language === 'ar' 
                ? 'المراحل الأربع الرئيسية لتطبيق برنامج صحة مستفيدي مجلس الضمان الصحي'
                : 'The four main stages for implementing the CHI Population Health Program'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {phmCycle.map((phase, index) => (
                <div key={index} className="relative">
                  <div className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <phase.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className={isRTL ? 'text-right' : ''}>
                        <Badge variant="outline" className="mb-1">{index + 1}</Badge>
                        <h4 className="font-bold">{phase.stage}</h4>
                      </div>
                    </div>
                    <p className={`text-sm text-muted-foreground mb-3 ${isRTL ? 'text-right' : ''}`}>{phase.description}</p>
                    <ul className="space-y-1">
                      {phase.details.map((detail, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-start gap-1">
                          <CheckCircle2 className="h-3 w-3 text-success mt-0.5 shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {index < phmCycle.length - 1 && (
                    <div className={`hidden lg:block absolute top-1/2 transform -translate-y-1/2 text-muted-foreground ${isRTL ? '-right-2' : '-left-2'}`}>
                      {isRTL ? '→' : '←'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Initiatives */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              {language === 'ar' ? 'المبادرات الرئيسية' : 'Key Initiatives'}
            </CardTitle>
            <CardDescription className={isRTL ? 'text-right' : ''}>
              {language === 'ar' 
                ? 'برامج مجلس الضمان الصحي لتطبيق الرعاية الصحية المبنية على الكفاءة والجودة'
                : 'CHI programs for implementing efficiency and quality-based healthcare'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {initiatives.map((initiative, index) => (
                <div key={index} className="p-4 rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                      <initiative.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className={isRTL ? 'text-right' : ''}>
                      <h4 className="font-bold text-sm sm:text-base">{initiative.title}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">{initiative.description}</p>
                    </div>
                  </div>
                  <div className={`flex flex-wrap gap-2 ${isRTL ? 'mr-11' : 'ml-11'}`}>
                    {initiative.features.map((feature, i) => (
                      <Badge key={i} variant="secondary" className="text-[10px] sm:text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Patient Reported Measures */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              {language === 'ar' ? 'صوت المريض في الرعاية الصحية' : 'Patient Voice in Healthcare'}
            </CardTitle>
            <CardDescription className={isRTL ? 'text-right' : ''}>
              {language === 'ar' 
                ? 'مقاييس نتائج وتجربة المرضى المبلغ عنها لتحسين جودة الرعاية'
                : 'Patient-reported outcome and experience measures to improve care quality'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {patientMeasures.map((measure, index) => (
                <div key={index} className={`p-4 rounded-lg border bg-muted/20 ${isRTL ? 'text-right' : ''}`}>
                  <Badge className={`mb-2 ${isRTL ? 'block w-fit mr-auto ml-0' : ''}`} variant={index === 0 ? 'default' : 'secondary'}>
                    {measure.type}
                  </Badge>
                  <h4 className="font-bold mb-1">{measure.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{measure.description}</p>
                  <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : ''}`}>
                    {measure.examples.map((example, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded bg-background border">
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              {language === 'ar' ? 'مصادر ووثائق' : 'Resources & Documents'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <a 
                href="https://www.chi.gov.sa/knowledge-center/InitiativesDocuments/CHI_PHM_Guidebook.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg border hover:border-primary hover:shadow-md transition-all flex items-center gap-3"
              >
                <FileText className="h-8 w-8 text-primary shrink-0" />
                <div className={isRTL ? 'text-right' : ''}>
                  <h4 className="font-semibold text-sm">{language === 'ar' ? 'دليل صحة مستفيدي مجلس الضمان الصحي' : 'CHI Population Health Guidebook'}</h4>
                  <p className="text-xs text-muted-foreground">PHM Guidebook - PDF</p>
                </div>
              </a>
              <a 
                href="https://www.chi.gov.sa/knowledge-center/InitiativesDocuments/CHI%20Population%20Health%20whitepaper.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg border hover:border-primary hover:shadow-md transition-all flex items-center gap-3"
              >
                <FileText className="h-8 w-8 text-primary shrink-0" />
                <div className={isRTL ? 'text-right' : ''}>
                  <h4 className="font-semibold text-sm">{language === 'ar' ? 'الورقة العلمية لصحة المستفيدين' : 'Population Health Whitepaper'}</h4>
                  <p className="text-xs text-muted-foreground">Population Health Whitepaper</p>
                </div>
              </a>
              <a 
                href="https://www.chi.gov.sa/knowledge-center/InitiativesDocuments/VBHC%20White%20Paper%20Version%20Final.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg border hover:border-primary hover:shadow-md transition-all flex items-center gap-3"
              >
                <FileText className="h-8 w-8 text-primary shrink-0" />
                <div className={isRTL ? 'text-right' : ''}>
                  <h4 className="font-semibold text-sm">{language === 'ar' ? 'ورقة الرعاية المبنية على القيمة' : 'Value-Based Healthcare White Paper'}</h4>
                  <p className="text-xs text-muted-foreground">VBHC White Paper</p>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="py-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10 shrink-0">
                <Stethoscope className="h-6 w-6 text-primary" />
              </div>
              <div className={isRTL ? 'text-right' : ''}>
                <h3 className="font-bold text-lg mb-2">{language === 'ar' ? 'الخلاصة' : 'Summary'}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {language === 'ar' 
                    ? 'يمثل برنامج صحة مستفيدي مجلس الضمان الصحي تحولاً استراتيجياً في منظومة التأمين الصحي بالمملكة، حيث يركز على تحقيق أفضل النتائج الصحية بأقل التكاليف من خلال الوقاية وإدارة الأمراض المزمنة وربط الدفع بالقيمة. يهدف البرنامج إلى تحسين جودة حياة أكثر من 17 مليون مستفيد وتعزيز استدامة النظام الصحي.'
                    : 'The CHI Population Health Program represents a strategic transformation in the Kingdom\'s health insurance system, focusing on achieving the best health outcomes at the lowest costs through prevention, chronic disease management, and value-based payment. The program aims to improve the quality of life for over 17 million beneficiaries and enhance healthcare system sustainability.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-6 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground">
            {language === 'ar' ? 'المصدر: مجلس الضمان الصحي chi.gov.sa • مبادرة الكفاءة والجودة' : 'Source: Council of Health Insurance chi.gov.sa • Efficiency & Quality Initiative'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {language === 'ar' ? '© 2024 أداة تحليل حزمة منافع الضمان الصحي • المملكة العربية السعودية' : '© 2024 Health Insurance Benefits Analysis Tool • Kingdom of Saudi Arabia'}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BeneficiaryHealth;
