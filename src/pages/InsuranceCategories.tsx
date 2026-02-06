import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Building2, Users, Heart, Baby, UserPlus, AlertTriangle, 
  Plane, Globe, Star, Building, Briefcase, Shield, 
  Check, X, ArrowLeft, Info, FileText, TrendingUp, Home, Stethoscope,
  ClipboardList, Database, FileCheck, CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const InsuranceCategories = () => {
  const { language, isRTL } = useLanguage();

  // Statistics from CHI Open Data (chi.gov.sa)
  const statistics = {
    totalBeneficiaries: 13.84,
    saudiBeneficiaries: 4.51,
    nonSaudiBeneficiaries: 9.33,
    primaryBeneficiaries: 9.9,
    dependents: 3.95,
    approvedProviders: 4500,
    insuranceCompanies: 26,
  };

  // Nationality distribution data for pie chart
  const nationalityData = [
    { name: 'سعودي', nameEn: 'Saudi', value: 4.51, color: 'hsl(var(--primary))' },
    { name: 'غير سعودي', nameEn: 'Non-Saudi', value: 9.33, color: 'hsl(var(--info))' },
  ];

  // Primary vs Dependent distribution
  const beneficiaryTypeData = [
    { name: 'رئيسي', nameEn: 'Primary', value: 9.9, color: 'hsl(var(--success))' },
    { name: 'تابع', nameEn: 'Dependent', value: 3.95, color: 'hsl(var(--warning))' },
  ];

  const mandatoryCategories = [
    {
      icon: Users,
      titleAr: 'الموظفين',
      titleEn: 'Employees',
      descAr: 'جميع موظفي القطاع الخاص مشمولون بالتغطية الإلزامية',
      descEn: 'All private sector employees are covered by mandatory insurance',
      color: 'bg-primary'
    },
    {
      icon: Heart,
      titleAr: 'الأزواج',
      titleEn: 'Spouses',
      descAr: 'زوج أو زوجة الموظف مشمولون بالتغطية الإلزامية',
      descEn: 'Employee spouses are included in mandatory coverage',
      color: 'bg-destructive'
    },
    {
      icon: Baby,
      titleAr: 'الأبناء',
      titleEn: 'Children',
      descAr: 'الأولاد حتى سن 25 سنة، والبنات بدون حد للسن حتى الزواج أو التوظف',
      descEn: 'Sons until age 25, daughters without age limit until marriage or employment',
      color: 'bg-success'
    },
  ];

  const optionalCategories = [
    {
      icon: UserPlus,
      titleAr: 'الوالدين',
      titleEn: 'Parents',
      descAr: 'تغطية اختيارية، متوفرة عادةً في الشركات الكبرى والوثائق الحكومية',
      descEn: 'Optional coverage, usually available in large companies and government policies',
      examples: language === 'ar' 
        ? ['الشركات الكبرى', 'هيئة كفاءة الإنفاق', 'القطاع الحكومي']
        : ['Large corporations', 'Govt Efficiency Authority', 'Government sector']
    },
  ];

  const specialPolicies = [
    {
      icon: Plane,
      titleAr: 'تأمين السياح',
      titleEn: 'Tourist Insurance',
      descAr: 'يغطي الحالات الطارئة المصنفة ضمن درجة خطورة 1-3 فقط',
      descEn: 'Covers emergency cases classified as severity levels 1-3 only',
      badgeAr: 'طوارئ فقط',
      badgeEn: 'Emergency Only',
      color: 'bg-warning'
    },
    {
      icon: Globe,
      titleAr: 'تأمين الزوار',
      titleEn: 'Visitor Insurance',
      descAr: 'للزوار القادمين للمملكة - يغطي الحالات الطارئة فقط (درجة 1-3)',
      descEn: 'For visitors to Saudi Arabia - covers emergencies only (levels 1-3)',
      badgeAr: 'طوارئ فقط',
      badgeEn: 'Emergency Only',
      color: 'bg-info'
    },
    {
      icon: Star,
      titleAr: 'تأمين العمرة',
      titleEn: 'Umrah Insurance',
      descAr: 'للمعتمرين - يغطي الحالات الطارئة فقط (درجة 1-3)',
      descEn: 'For Umrah performers - covers emergencies only (levels 1-3)',
      badgeAr: 'طوارئ فقط',
      badgeEn: 'Emergency Only',
      color: 'bg-primary'
    },
    {
      icon: Building,
      titleAr: 'تأمين الإقامة المميزة',
      titleEn: 'Premium Residency Insurance',
      descAr: 'لحاملي الإقامة المميزة في المملكة',
      descEn: 'For Premium Residency holders in Saudi Arabia',
      badgeAr: 'إقامة مميزة',
      badgeEn: 'Premium Residency',
      color: 'bg-success'
    },
    {
      icon: Star,
      titleAr: 'تأمين الحجاج',
      titleEn: 'Hajj Insurance',
      descAr: 'قريباً - تأمين مخصص للحجاج',
      descEn: 'Coming Soon - Insurance for Hajj pilgrims',
      badgeAr: 'قريباً',
      badgeEn: 'Coming Soon',
      color: 'bg-muted'
    },
    {
      icon: Home,
      titleAr: 'تأمين العمالة المنزلية',
      titleEn: 'Domestic Worker Insurance',
      descAr: 'إلزامي لأصحاب العمل الذين لديهم أكثر من 4 عمال منزليين',
      descEn: 'Mandatory for employers with more than 4 domestic workers',
      badgeAr: '+4 عمال',
      badgeEn: '4+ Workers',
      color: 'bg-destructive'
    },
  ];

  // Domestic Worker Insurance Benefits (from CHI official news 2024-7-1)
  const domesticWorkerBenefits = [
    { ar: 'الرعاية الأولية', en: 'Primary Care', icon: Stethoscope },
    { ar: 'الصحة العامة والحالات الطارئة', en: 'General Health & Emergencies', icon: AlertTriangle },
    { ar: 'التنويم في المستشفى بدون تحمل', en: 'Hospital Admission (No Deductible)', icon: Building2 },
    { ar: 'زيارات طوارئ غير محدودة', en: 'Unlimited Emergency Visits', icon: Heart },
    { ar: 'التطعيمات والفحوصات', en: 'Vaccinations & Examinations', icon: Check },
  ];

  // Emergency Classification Levels (5 levels total)
  const emergencyLevels = [
    { 
      level: '1', 
      nameAr: 'حرجة', 
      nameEn: 'Critical',
      descAr: 'تهديد مباشر للحياة - يحتاج تدخل فوري', 
      descEn: 'Direct life threat - Immediate intervention needed',
      examplesAr: ['توقف القلب', 'نزيف حاد', 'صعوبة تنفس شديدة'],
      examplesEn: ['Cardiac arrest', 'Severe bleeding', 'Severe respiratory distress'],
      color: 'bg-destructive',
      covered: true
    },
    { 
      level: '2', 
      nameAr: 'طارئة', 
      nameEn: 'Emergent',
      descAr: 'حالة خطيرة تحتاج تدخل عاجل', 
      descEn: 'Serious condition requiring urgent intervention',
      examplesAr: ['كسور مفتوحة', 'ألم صدر حاد', 'جلطة دماغية'],
      examplesEn: ['Open fractures', 'Acute chest pain', 'Stroke'],
      color: 'bg-warning',
      covered: true
    },
    { 
      level: '3', 
      nameAr: 'عاجلة', 
      nameEn: 'Urgent',
      descAr: 'تحتاج رعاية سريعة خلال ساعات', 
      descEn: 'Needs quick care within hours',
      examplesAr: ['حمى شديدة', 'جروح تحتاج خياطة', 'آلام بطن حادة'],
      examplesEn: ['High fever', 'Wounds needing stitches', 'Acute abdominal pain'],
      color: 'bg-info',
      covered: true
    },
    { 
      level: '4', 
      nameAr: 'أقل إلحاحاً', 
      nameEn: 'Less Urgent',
      descAr: 'يمكن الانتظار - تحتاج رعاية خلال 24-48 ساعة', 
      descEn: 'Can wait - Needs care within 24-48 hours',
      examplesAr: ['التهاب الحلق', 'آلام الظهر المزمنة', 'طفح جلدي خفيف'],
      examplesEn: ['Sore throat', 'Chronic back pain', 'Mild skin rash'],
      color: 'bg-muted',
      covered: false
    },
    { 
      level: '5', 
      nameAr: 'غير طارئة', 
      nameEn: 'Non-Emergency',
      descAr: 'حالات روتينية - يمكن جدولتها', 
      descEn: 'Routine cases - Can be scheduled',
      examplesAr: ['فحص دوري', 'تطعيمات', 'استشارة متابعة'],
      examplesEn: ['Routine checkup', 'Vaccinations', 'Follow-up consultation'],
      color: 'bg-muted',
      covered: false
    },
  ];

  const nonCHIPolicies = [
    {
      titleAr: 'الوثائق الفردية',
      titleEn: 'Individual Policies',
      descAr: 'وثائق تأمين اختيارية لا تخضع لمنافع وثيقة مجلس الضمان الصحي',
      descEn: 'Optional insurance policies not subject to CHI benefits package'
    },
    {
      titleAr: 'وثائق السفر',
      titleEn: 'Travel Policies',
      descAr: 'تغطيات محدودة للسفر خارج المملكة',
      descEn: 'Limited coverage for travel outside Saudi Arabia'
    },
  ];

  // CHI Beneficiary Growth Data (Historical)
  const beneficiaryGrowthData = [
    { year: '2006', beneficiaries: 1.2 },
    { year: '2008', beneficiaries: 2.5 },
    { year: '2010', beneficiaries: 3.8 },
    { year: '2012', beneficiaries: 5.2 },
    { year: '2014', beneficiaries: 6.8 },
    { year: '2016', beneficiaries: 8.5 },
    { year: '2018', beneficiaries: 10.2 },
    { year: '2020', beneficiaries: 11.5 },
    { year: '2022', beneficiaries: 12.8 },
    { year: '2024', beneficiaries: 13.84 },
  ];

  

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      {/* Hero Section - Standardized */}
      <section className="relative py-6 sm:py-8 overflow-hidden gradient-hero">
        <div className="absolute inset-0 chi-pattern" />
        <div className="container mx-auto px-3 sm:px-4 relative">
          <div className={`flex items-center gap-3 mb-3 w-fit ${isRTL ? 'ml-auto' : ''}`} style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <h1 className="text-xl sm:text-2xl font-bold text-primary-foreground">
              {language === 'ar' ? 'أنواع التغطية الصحية الإلزامية' : 'Mandatory Health Coverage Types'}
            </h1>
            <div className="p-2 rounded-lg bg-primary-foreground/10">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          
          <p className={`text-xs sm:text-sm text-primary-foreground/85 max-w-2xl ${isRTL ? 'ml-auto text-right' : ''}`}>
            {language === 'ar' 
              ? 'دليل شامل للفئات المشمولة بالتغطية الصحية الخاصة الإلزامية في المملكة العربية السعودية'
              : 'Comprehensive guide to categories covered by mandatory private health insurance in Saudi Arabia'}
          </p>
        </div>
      </section>

      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">

        {/* Statistics Section */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent mb-8">
          <CardHeader className="pb-2">
            <CardTitle className={`text-lg flex items-center gap-2 w-full ${isRTL ? 'justify-end' : ''}`} style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <span>{language === 'ar' ? 'إحصائيات التغطية الإلزامية' : 'Mandatory Coverage Statistics'}</span>
              <TrendingUp className="h-5 w-5 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className={`p-3 rounded-lg bg-background border border-border ${isRTL ? 'text-right' : 'text-center'}`}>
                <p className="text-2xl sm:text-3xl font-bold text-primary font-mono">{statistics.totalBeneficiaries}</p>
                <p className="text-xs text-muted-foreground">{language === 'ar' ? 'مليون مستفيد' : 'Million Beneficiaries'}</p>
              </div>
              <div className={`p-3 rounded-lg bg-background border border-border ${isRTL ? 'text-right' : 'text-center'}`}>
                <p className="text-2xl sm:text-3xl font-bold text-info font-mono">{statistics.saudiBeneficiaries}</p>
                <p className="text-xs text-muted-foreground">{language === 'ar' ? 'مليون سعودي' : 'Million Saudis'}</p>
              </div>
              <div className={`p-3 rounded-lg bg-background border border-border ${isRTL ? 'text-right' : 'text-center'}`}>
                <p className="text-2xl sm:text-3xl font-bold text-success font-mono">{statistics.primaryBeneficiaries}</p>
                <p className="text-xs text-muted-foreground">{language === 'ar' ? 'مليون رئيسي' : 'Million Primary'}</p>
              </div>
              <div className={`p-3 rounded-lg bg-background border border-border ${isRTL ? 'text-right' : 'text-center'}`}>
                <p className="text-2xl sm:text-3xl font-bold text-warning font-mono">{statistics.dependents}</p>
                <p className="text-xs text-muted-foreground">{language === 'ar' ? 'مليون تابع' : 'Million Dependents'}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className={`p-3 rounded-lg bg-primary/10 border border-primary/20 ${isRTL ? 'text-right' : 'text-center'}`}>
                <p className="text-xl font-bold text-primary font-mono">+{statistics.approvedProviders.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{language === 'ar' ? 'مقدم خدمة معتمد' : 'Approved Providers'}</p>
              </div>
              <div className={`p-3 rounded-lg bg-info/10 border border-info/20 ${isRTL ? 'text-right' : 'text-center'}`}>
                <p className="text-xl font-bold text-info font-mono">{statistics.insuranceCompanies}</p>
                <p className="text-xs text-muted-foreground">{language === 'ar' ? 'شركة تأمين مرخصة' : 'Licensed Insurers'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mandatory Coverage Types Section */}
        <div className="mb-8">
          <h2 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end text-right' : 'text-left'}`}>
            <FileText className="h-5 w-5 text-primary" />
            <span>{language === 'ar' ? 'أنواع التغطية الصحية الإلزامية الخاصة' : 'Mandatory Private Health Coverage Types'}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {mandatoryCategories.map((category, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/30 transition-colors">
                <CardContent className={`p-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <div className={`flex items-center gap-3 mb-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                    <div className={`w-10 h-10 rounded-full ${category.color} flex items-center justify-center flex-shrink-0`}>
                      <category.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className={`font-semibold text-sm ${isRTL ? 'text-right' : ''}`}>
                      {language === 'ar' ? category.titleAr : category.titleEn}
                    </h3>
                  </div>
                  <p className={`text-xs text-muted-foreground leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                    {language === 'ar' ? category.descAr : category.descEn}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Nationality Distribution Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Saudi vs Non-Saudi */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader className="pb-2">
              <CardTitle className={`text-base flex items-center gap-2 w-full ${isRTL ? 'justify-end' : ''}`} style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <span>{language === 'ar' ? 'توزيع المستفيدين حسب الجنسية' : 'Beneficiary Distribution by Nationality'}</span>
                <Users className="h-5 w-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={nationalityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                      label={false}
                      labelLine={false}
                    >
                      {nationalityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          const percentage = ((data.value / statistics.totalBeneficiaries) * 100).toFixed(1);
                          return (
                            <div className={`bg-background border border-border rounded-lg p-2 shadow-lg ${isRTL ? 'text-right' : 'text-left'}`}>
                              <p className="font-bold text-foreground">{language === 'ar' ? data.name : data.nameEn}</p>
                              <p className="text-sm font-mono">{data.value} {language === 'ar' ? 'مليون' : 'Million'}</p>
                              <p className="text-xs text-muted-foreground">{percentage}%</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="text-xs">{language === 'ar' ? 'سعودي' : 'Saudi'} ({((4.51/13.84)*100).toFixed(0)}%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-info"></div>
                  <span className="text-xs">{language === 'ar' ? 'غير سعودي' : 'Non-Saudi'} ({((9.33/13.84)*100).toFixed(0)}%)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Primary vs Dependent */}
          <Card className="border-success/20 bg-gradient-to-br from-success/5 to-transparent">
            <CardHeader className="pb-2">
              <CardTitle className={`text-base flex items-center gap-2 w-full ${isRTL ? 'justify-end' : ''}`} style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <span>{language === 'ar' ? 'توزيع المستفيدين حسب النوع' : 'Beneficiary Distribution by Type'}</span>
                <Heart className="h-5 w-5 text-success" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={beneficiaryTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                      label={false}
                      labelLine={false}
                    >
                      {beneficiaryTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          const percentage = ((data.value / statistics.totalBeneficiaries) * 100).toFixed(1);
                          return (
                            <div className={`bg-background border border-border rounded-lg p-2 shadow-lg ${isRTL ? 'text-right' : 'text-left'}`}>
                              <p className="font-bold text-foreground">{language === 'ar' ? data.name : data.nameEn}</p>
                              <p className="text-sm font-mono">{data.value} {language === 'ar' ? 'مليون' : 'Million'}</p>
                              <p className="text-xs text-muted-foreground">{percentage}%</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <span className="text-xs">{language === 'ar' ? 'رئيسي' : 'Primary'} ({((9.9/13.84)*100).toFixed(0)}%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-warning"></div>
                  <span className="text-xs">{language === 'ar' ? 'تابع' : 'Dependent'} ({((3.95/13.84)*100).toFixed(0)}%)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Beneficiary Growth Chart */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent mb-8">
          <CardHeader className="pb-2">
            <CardTitle className={`text-lg flex items-center gap-2 w-full ${isRTL ? 'justify-end' : ''}`} style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <span>{language === 'ar' ? 'نمو أعداد المؤمن لهم منذ تأسيس المجلس' : 'Beneficiary Growth Since CHI Establishment'}</span>
              <TrendingUp className="h-5 w-5 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={beneficiaryGrowthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorBeneficiaries" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="year" 
                    tick={{ fontSize: 12 }}
                    className="text-muted-foreground"
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    className="text-muted-foreground"
                    tickFormatter={(value) => `${value}M`}
                  />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                            <p className="font-bold text-foreground">{label}</p>
                            <p className="text-primary font-mono">
                              {payload[0].value} {language === 'ar' ? 'مليون مستفيد' : 'Million beneficiaries'}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="beneficiaries" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorBeneficiaries)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-success/10 border border-success/20 text-center">
                <p className="text-lg font-bold text-success font-mono">1,053%</p>
                <p className="text-xs text-muted-foreground">{language === 'ar' ? 'نمو منذ التأسيس' : 'Growth since establishment'}</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-center">
                <p className="text-lg font-bold text-primary font-mono">~15%</p>
                <p className="text-xs text-muted-foreground">{language === 'ar' ? 'معدل النمو السنوي' : 'Annual growth rate'}</p>
              </div>
              <div className="p-3 rounded-lg bg-info/10 border border-info/20 text-center">
                <p className="text-lg font-bold text-info font-mono">{language === 'ar' ? '18 سنة' : '18 Years'}</p>
                <p className="text-xs text-muted-foreground">{language === 'ar' ? 'منذ التأسيس (2006-2024)' : 'Since establishment (2006-2024)'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Visual - Coverage Structure */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent mb-8">
          <CardHeader className="text-center pb-2">
            <CardTitle className={`text-lg sm:text-xl ${isRTL ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'هيكل التغطية الإلزامية' : 'Mandatory Coverage Structure'}
            </CardTitle>
            <CardDescription>
              {language === 'ar' ? 'التغطية الإلزامية على أصحاب العمل في القطاع الخاص' : 'Mandatory coverage requirements for private sector employers'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Visual Diagram */}
            <div className="relative py-6">
              {/* Center - Employer */}
              <div className="flex flex-col items-center mb-8">
                <div className="p-4 rounded-full bg-primary text-primary-foreground shadow-lg mb-3">
                  <Building2 className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-foreground text-center">
                  {language === 'ar' ? 'صاحب العمل' : 'Employer'}
                </h3>
                <p className="text-xs text-muted-foreground text-center max-w-[200px]">
                  {language === 'ar' ? 'المؤسسات والشركات الخاصة' : 'Private institutions and companies'}
                </p>
              </div>

              {/* Mandatory Coverage - Connected */}
              <div className="flex justify-center mb-4">
                <div className="h-8 w-0.5 bg-primary"></div>
              </div>
              
              <div className="bg-success/10 border-2 border-success/30 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Check className="h-5 w-5 text-success" />
                  <h4 className="font-bold text-success">
                    {language === 'ar' ? 'التغطية الإلزامية' : 'Mandatory Coverage'}
                  </h4>
                </div>
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  {[
                    { icon: Users, labelAr: 'الموظف', labelEn: 'Employee' },
                    { icon: Heart, labelAr: 'الزوج/ة', labelEn: 'Spouse' },
                    { icon: Baby, labelAr: 'الأبناء', labelEn: 'Children' },
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center p-3 bg-background rounded-lg border border-success/20">
                      <item.icon className="h-6 w-6 text-success mb-2" />
                      <span className="text-xs sm:text-sm font-medium text-center">
                        {language === 'ar' ? item.labelAr : item.labelEn}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Optional Coverage */}
              <div className="bg-warning/10 border-2 border-dashed border-warning/30 rounded-xl p-4">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Info className="h-5 w-5 text-warning" />
                  <h4 className="font-bold text-warning">
                    {language === 'ar' ? 'التغطية الاختيارية' : 'Optional Coverage'}
                  </h4>
                </div>
                <div className="flex justify-center">
                  <div className="flex flex-col items-center p-3 bg-background rounded-lg border border-warning/20 max-w-[200px]">
                    <UserPlus className="h-6 w-6 text-warning mb-2" />
                    <span className="text-xs sm:text-sm font-medium text-center">
                      {language === 'ar' ? 'الوالدين' : 'Parents'}
                    </span>
                    <span className="text-[10px] text-muted-foreground text-center mt-1">
                      {language === 'ar' ? 'متوفرة في الشركات الكبرى والجهات الحكومية' : 'Available in large companies and government entities'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mandatory Categories Grid */}
        <section className="mb-8">
          <div className="grid grid-cols-3 gap-3">
            {mandatoryCategories.map((cat, index) => (
              <Card key={index} className="border-success/30 hover:shadow-md transition-shadow">
                <CardContent className={`p-4 flex flex-col items-center text-center`}>
                  <div className={`p-3 rounded-full ${cat.color} text-primary-foreground mb-3`}>
                    <cat.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-sm mb-1 text-center">
                    {language === 'ar' ? cat.titleAr : cat.titleEn}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground text-center">
                    {language === 'ar' ? cat.descAr : cat.descEn}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Compliance Rate Section */}
        <Card className="border-warning/20 bg-gradient-to-br from-warning/5 to-transparent mb-8">
          <CardHeader className="pb-2">
            <CardTitle className={`text-lg flex items-center gap-2 w-full ${isRTL ? 'justify-end flex-row-reverse' : ''}`}>
              <Shield className="h-5 w-5 text-warning" />
              <span>{language === 'ar' ? 'نسبة الالتزام بالتأمين الصحي' : 'Health Insurance Compliance Rate'}</span>
            </CardTitle>
            <CardDescription className={isRTL ? 'text-right' : 'text-left'}>
              {language === 'ar' 
                ? 'نسبة التزام أصحاب العمل في القطاع الخاص بالتأمين الصحي الإلزامي'
                : 'Private sector employer compliance rate with mandatory health insurance'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              {/* Compliance Rate Display */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-success/20 to-success/5 border-2 border-success/30 text-center flex-shrink-0">
                <p className="text-4xl sm:text-5xl font-bold text-success font-mono">89%</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {language === 'ar' ? 'نسبة الالتزام المقدرة' : 'Estimated Compliance Rate'}
                </p>
              </div>
              
              {/* Challenges */}
              <div className="flex-1 space-y-3">
                <div className={`flex items-start gap-2 p-3 rounded-lg bg-warning/10 border border-warning/20 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                  <div className={isRTL ? 'text-right' : ''}>
                    <h4 className="font-semibold text-sm text-foreground">
                      {language === 'ar' ? 'تحديات قياس المؤشر' : 'Measurement Challenges'}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {language === 'ar' 
                        ? 'يواجه مؤشر نسبة الالتزام بعض التحديات التي تؤثر على دقته'
                        : 'The compliance rate indicator faces some challenges affecting its accuracy'}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className={`p-3 rounded-lg bg-muted/50 border border-border ${isRTL ? 'text-right' : ''}`}>
                    <div className={`flex items-center gap-2 mb-1 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                      <Database className="h-4 w-4 text-info" />
                      <span className="text-xs font-semibold">
                        {language === 'ar' ? 'ازدواجية التأمين' : 'Duplicate Insurance'}
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      {language === 'ar' 
                        ? 'بعض المستفيدين مسجلين بأكثر من وثيقة تأمين في وقت واحد'
                        : 'Some beneficiaries are registered with multiple insurance policies simultaneously'}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-muted/50 border border-border ${isRTL ? 'text-right' : ''}`}>
                    <div className={`flex items-center gap-2 mb-1 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                      <ClipboardList className="h-4 w-4 text-info" />
                      <span className="text-xs font-semibold">
                        {language === 'ar' ? 'تحديث البيانات' : 'Data Updates'}
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      {language === 'ar' 
                        ? 'تحديات في مطابقة البيانات مع الجهات ذات العلاقة (التأمينات، وزارة الموارد البشرية)'
                        : 'Challenges in matching data with related entities (GOSI, Ministry of Human Resources)'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Special Insurance Types */}
        <section className="mb-8">
          <h2 className={`text-xl font-bold text-foreground mb-4 flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
            <FileText className="h-5 w-5 text-info" />
            <span>{language === 'ar' ? 'أنواع التغطية الصحية الإلزامية الخاصة' : 'Special Mandatory Health Coverage Types'}</span>
          </h2>
          <p className={`text-sm text-muted-foreground mb-4 ${isRTL ? 'text-right' : ''}`}>
            {language === 'ar' ? 'وثائق تأمين مخصصة لفئات معينة بتغطيات محددة' : 'Insurance policies tailored for specific categories with defined coverage'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {specialPolicies.map((policy, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className={`p-4 ${isRTL ? 'text-right' : ''}`}>
                  <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`p-2 rounded-lg ${policy.color} text-primary-foreground shrink-0`}>
                      <policy.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`flex items-center gap-2 mb-1 flex-wrap ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                        <h3 className={`font-bold text-sm ${isRTL ? 'text-right' : ''}`}>
                          {language === 'ar' ? policy.titleAr : policy.titleEn}
                        </h3>
                        <Badge variant="secondary" className="text-[9px]">
                          {language === 'ar' ? policy.badgeAr : policy.badgeEn}
                        </Badge>
                      </div>
                      <p className={`text-xs text-muted-foreground ${isRTL ? 'text-right' : ''}`}>
                        {language === 'ar' ? policy.descAr : policy.descEn}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Domestic Worker Insurance Benefits */}
        <Card className="border-info/30 bg-info/5 mb-8">
          <CardHeader className="pb-2">
            <CardTitle className={`text-base flex items-center gap-2 w-full ${isRTL ? 'justify-end flex-row-reverse' : ''}`}>
              <Home className="h-5 w-5 text-info" />
              <span>{language === 'ar' ? 'منافع تأمين العمالة المنزلية' : 'Domestic Worker Insurance Benefits'}</span>
            </CardTitle>
            <CardDescription className={isRTL ? 'text-right' : ''}>
              {language === 'ar' 
                ? 'المصدر: مجلس الضمان الصحي - بدء التطبيق 1 يوليو 2024م'
                : 'Source: Council of Health Insurance - Effective July 1, 2024'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {domesticWorkerBenefits.map((benefit, index) => (
                <div key={index} className="p-3 rounded-lg bg-background border border-info/20 text-center">
                  <benefit.icon className="h-5 w-5 text-info mx-auto mb-2" />
                  <p className="text-xs font-medium">{language === 'ar' ? benefit.ar : benefit.en}</p>
                </div>
              ))}
            </div>
            <div className={`mt-4 p-3 rounded-lg bg-info/10 border border-info/20 ${isRTL ? 'text-right' : ''}`}>
              <p className="text-xs text-muted-foreground">
                <strong>{language === 'ar' ? 'اشتراطات التطبيق:' : 'Application Requirements:'}</strong> {language === 'ar' 
                  ? 'تقديم نموذج الإفصاح الطبي، والحصول على موافقة شركة التأمين، والتأمين على جميع العمالة المسجلة.'
                  : 'Submit medical disclosure form, obtain insurance company approval, and insure all registered workers.'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Premium Residency Policy - Different from Basic */}
        <Card className="border-warning/30 bg-warning/5 mb-8">
          <CardHeader className="pb-2">
            <CardTitle className={`text-base flex items-center gap-2 w-full ${isRTL ? 'justify-end flex-row-reverse' : ''}`}>
              <Star className="h-5 w-5 text-warning" />
              <span>{language === 'ar' ? 'فروقات وثيقة الإقامة المميزة' : 'Premium Residency Policy Differences'}</span>
            </CardTitle>
            <CardDescription className={isRTL ? 'text-right' : ''}>
              {language === 'ar' ? 'وثيقة الإقامة المميزة ليست متطابقة مع الوثيقة الأساسية' : 'Premium Residency policy differs from Basic CHI Policy'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`p-4 rounded-lg bg-warning/10 border border-warning/20 mb-4 ${isRTL ? 'text-right' : ''}`}>
              <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                <AlertTriangle className="h-5 w-5 text-warning" />
                <span className="font-semibold text-sm">
                  {language === 'ar' ? 'تختلف عن الوثيقة الأساسية في عدة نقاط' : 'Differs from Basic Policy in several areas'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {language === 'ar' 
                  ? 'وثيقة الإقامة المميزة تتضمن بعض الاختلافات عن وثيقة مجلس الضمان الصحي الأساسية.'
                  : 'The Premium Residency policy contains some differences from the CHI Basic Policy.'}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className={`p-3 rounded-lg bg-background border border-warning/20 ${isRTL ? 'text-right' : ''}`}>
                <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                  <FileCheck className="h-4 w-4 text-warning" />
                  <span className="text-xs font-semibold">{language === 'ar' ? 'حد الموافقات المسبقة' : 'Prior Authorization Limit'}</span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  {language === 'ar' 
                    ? 'حد أقصى مختلف للموافقات المسبقة مقارنة بالوثيقة الأساسية'
                    : 'Different maximum limit for prior authorizations compared to Basic Policy'}
                </p>
              </div>
              <div className={`p-3 rounded-lg bg-background border border-warning/20 ${isRTL ? 'text-right' : ''}`}>
                <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                  <CreditCard className="h-4 w-4 text-warning" />
                  <span className="text-xs font-semibold">{language === 'ar' ? 'نسبة التحمل' : 'Copayment Rate'}</span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  {language === 'ar' 
                    ? 'نسبة تحمل مختلفة عن الوثيقة الأساسية'
                    : 'Different copayment percentage compared to Basic Policy'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Spending Efficiency Authority (Expro) - Different from Basic */}
        <Card className="border-info/30 bg-info/5 mb-8">
          <CardHeader className="pb-2">
            <CardTitle className={`text-base flex items-center gap-2 w-full ${isRTL ? 'justify-end flex-row-reverse' : ''}`}>
              <Building className="h-5 w-5 text-info" />
              <span>{language === 'ar' ? 'فروقات وثيقة هيئة كفاءة الإنفاق (إكسبرو)' : 'Spending Efficiency Authority (Expro) Policy Differences'}</span>
            </CardTitle>
            <CardDescription className={isRTL ? 'text-right' : ''}>
              {language === 'ar' ? 'وثيقة إكسبرو تختلف عن الوثيقة الأساسية في بعض المنافع' : 'Expro policy differs from Basic CHI Policy in some benefits'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`p-4 rounded-lg bg-info/10 border border-info/20 mb-4 ${isRTL ? 'text-right' : ''}`}>
              <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                <AlertTriangle className="h-5 w-5 text-info" />
                <span className="font-semibold text-sm">
                  {language === 'ar' ? 'تختلف عن الوثيقة الأساسية في عدة نقاط' : 'Differs from Basic Policy in several areas'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {language === 'ar' 
                  ? 'وثيقة هيئة كفاءة الإنفاق والمشتريات الحكومية (إكسبرو) تتضمن اختلافات عن وثيقة مجلس الضمان الصحي الأساسية، خاصة في تغطية الوالدين وحدود بعض الخدمات.'
                  : 'The Spending Efficiency Authority (Expro) policy contains differences from the CHI Basic Policy, particularly in parents coverage and limits for certain services.'}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className={`p-3 rounded-lg bg-background border border-info/20 ${isRTL ? 'text-right' : ''}`}>
                <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                  <FileCheck className="h-4 w-4 text-info" />
                  <span className="text-xs font-semibold">{language === 'ar' ? 'حد الموافقات المسبقة' : 'Prior Authorization Limit'}</span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  {language === 'ar' 
                    ? 'حد أقصى مختلف للموافقات المسبقة'
                    : 'Different maximum limit for prior authorizations'}
                </p>
              </div>
              <div className={`p-3 rounded-lg bg-background border border-info/20 ${isRTL ? 'text-right' : ''}`}>
                <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                  <UserPlus className="h-4 w-4 text-info" />
                  <span className="text-xs font-semibold">{language === 'ar' ? 'تغطية الوالدين' : 'Parents Coverage'}</span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  {language === 'ar' 
                    ? 'شروط مختلفة لتغطية الوالدين عن الوثيقة الأساسية'
                    : 'Different conditions for parents coverage'}
                </p>
              </div>
              <div className={`p-3 rounded-lg bg-background border border-info/20 ${isRTL ? 'text-right' : ''}`}>
                <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                  <CreditCard className="h-4 w-4 text-info" />
                  <span className="text-xs font-semibold">{language === 'ar' ? 'نسبة التحمل' : 'Copayment Rate'}</span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  {language === 'ar' 
                    ? 'نسبة تحمل مختلفة عن الوثيقة الأساسية'
                    : 'Different copayment percentage'}
                </p>
              </div>
              <div className={`p-3 rounded-lg bg-background border border-info/20 ${isRTL ? 'text-right' : ''}`}>
                <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                  <Shield className="h-4 w-4 text-info" />
                  <span className="text-xs font-semibold">{language === 'ar' ? 'حد العدسات' : 'Eyeglasses Limit'}</span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  {language === 'ar' 
                    ? 'حد أقصى مختلف للنظارات والعدسات الطبية'
                    : 'Different limit for eyeglasses and lenses'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Classification - All 5 Levels */}
        <Card className="border-warning/30 bg-warning/5 mb-8">
          <CardHeader className="pb-2">
            <CardTitle className={`text-base flex items-center gap-2 w-full ${isRTL ? 'justify-end flex-row-reverse' : ''}`}>
              <AlertTriangle className="h-5 w-5 text-warning" />
              <span>{language === 'ar' ? 'تصنيف حالات الطوارئ (5 درجات)' : 'Emergency Classification (5 Levels)'}</span>
            </CardTitle>
            <CardDescription className={isRTL ? 'text-right' : ''}>
              {language === 'ar' 
                ? 'تأمين السياح والزوار والعمرة يغطي الحالات الطارئة فقط (درجة 1-3)'
                : 'Tourist, Visitor, and Umrah insurance covers emergency cases only (levels 1-3)'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {emergencyLevels.map((item, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border ${item.covered ? 'bg-success/5 border-success/30' : 'bg-muted/30 border-muted'}`}
                >
                  <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-10 h-10 rounded-full ${item.color} text-primary-foreground flex items-center justify-center font-bold shrink-0`}>
                      {item.level}
                    </div>
                    <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
                      <div className={`flex items-center gap-2 mb-1 flex-wrap ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                        <h4 className="font-bold text-sm">{language === 'ar' ? item.nameAr : item.nameEn}</h4>
                        {item.covered ? (
                          <Badge variant="default" className="text-[9px] bg-success">
                            {language === 'ar' ? 'مغطى' : 'Covered'}
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-[9px]">
                            {language === 'ar' ? 'غير مغطى' : 'Not Covered'}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {language === 'ar' ? item.descAr : item.descEn}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {(language === 'ar' ? item.examplesAr : item.examplesEn).map((example, i) => (
                          <Badge key={i} variant="outline" className="text-[9px]">
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={`mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 ${isRTL ? 'text-right' : ''}`}>
              <p className={`text-xs text-muted-foreground flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                <X className="h-4 w-4 text-destructive shrink-0" />
                <span>
                  <strong>{language === 'ar' ? 'هام:' : 'Important:'}</strong> {language === 'ar' 
                    ? 'الحالات المصنفة من 4-5 (غير طارئة) لا تُغطى بتأمين السياح والزوار والعمرة'
                    : 'Cases classified as levels 4-5 (non-emergency) are not covered by Tourist, Visitor, or Umrah insurance'}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
        {/* Non-CHI Policies */}
        <Card className="border-muted bg-muted/20 mb-8">
          <CardHeader className="pb-2">
            <CardTitle className={`text-base flex items-center gap-2 w-full ${isRTL ? 'justify-end flex-row-reverse' : ''}`}>
              <X className="h-5 w-5 text-muted-foreground" />
              <span>{language === 'ar' ? 'وثائق خارج نطاق مجلس الضمان' : 'Policies Outside CHI Scope'}</span>
            </CardTitle>
            <CardDescription className={isRTL ? 'text-right' : ''}>
              {language === 'ar' 
                ? 'وثائق تأمين اختيارية لا تخضع لمنافع وثيقة مجلس الضمان الصحي الأساسية'
                : 'Optional insurance policies not subject to CHI Basic Policy benefits'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {nonCHIPolicies.map((policy, index) => (
                <div key={index} className={`p-3 rounded-lg bg-background border border-border ${isRTL ? 'text-right' : ''}`}>
                  <h4 className="font-medium text-sm mb-1">
                    {language === 'ar' ? policy.titleAr : policy.titleEn}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {language === 'ar' ? policy.descAr : policy.descEn}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Points Summary */}
        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className={`text-base flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end text-right' : ''}`}>
              <FileText className="h-5 w-5 text-primary" />
              <span>{language === 'ar' ? 'النقاط الرئيسية' : 'Key Points'}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className={`space-y-2 text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
              {(language === 'ar' ? [
                'القطاع الخاص ملزم بتوفير التأمين الصحي للموظفين والأزواج والأبناء',
                'تغطية الوالدين اختيارية وليست إلزامية',
                'الوثائق الفردية لا تخضع لمنافع وثيقة مجلس الضمان',
                'تأمين السياح والزوار والعمرة يغطي الطوارئ فقط (درجة 1-3)',
                'تأمين العمالة المنزلية إلزامي لمن لديه أكثر من 4 عمال',
                'هناك 5 درجات للحالات الطارئة والمغطى فقط الدرجات 1-3',
                'الموافقات المسبقة تتطلب الحد الأدنى من البيانات الطبية',
              ] : [
                'Private sector must provide health insurance for employees, spouses, and children',
                'Parent coverage is optional, not mandatory',
                'Individual policies are not subject to CHI policy benefits',
                'Tourist, Visitor, and Umrah insurance covers emergencies only (levels 1-3)',
                'Domestic worker insurance is mandatory for employers with more than 4 workers',
                'There are 5 emergency levels, only levels 1-3 are covered',
                'Prior authorizations require minimum medical data set',
              ]).map((point, index) => (
                <li key={index} className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-4 mt-8">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <p className="text-[10px] sm:text-xs text-muted-foreground">
            {language === 'ar' ? 'المصدر: مجلس الضمان الصحي chi.gov.sa' : 'Source: Council of Health Insurance chi.gov.sa'}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default InsuranceCategories;