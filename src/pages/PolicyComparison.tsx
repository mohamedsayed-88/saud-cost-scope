import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import saudiRiyalSymbol from '@/assets/saudi-riyal-symbol.png';
import { 
  FileText, Check, X, Equal, Building, Shield,
  Baby, Brain, Eye, Ear, Pill, Scissors, Ambulance, Heart,
  Stethoscope, Activity, Users, Clock, FileCheck, Glasses, 
  UserPlus, Dumbbell, Sparkles, AlertCircle, Globe, Home,
  Syringe, Bone, HeartPulse, Accessibility, Star
} from 'lucide-react';

const PolicyComparison = () => {
  const { language, isRTL } = useLanguage();

  // منافع الموظف/ة وعائلته - فئة VIP
  const employeeBenefits = [
    // المنافع مع التفريق بين الشركات الصغيرة والكبيرة
    {
      categoryAr: 'الحد السنوي الإجمالي للوثيقة',
      categoryEn: 'Annual Maximum Limit',
      smeValue: '1,000,000',
      largeValue: '1,000,000',
      exproValue: '500,000',
      status: 'chi-better',
      icon: Shield,
      noteAr: 'تم رفع الحد لجميع الشركات إلى مليون ريال',
      noteEn: 'Limit raised to 1M for all companies'
    },
    {
      categoryAr: 'شبكة مزودي الخدمة',
      categoryEn: 'Provider Network',
      smeValue: language === 'ar' ? 'الشبكة المعتمدة' : 'Approved Network',
      largeValue: language === 'ar' ? 'الشبكة المعتمدة' : 'Approved Network',
      exproValue: language === 'ar' ? 'شبكة عالية + إقليمية' : 'Premium + Regional',
      status: 'expro-better',
      icon: Globe,
      noteAr: 'اكسبرو: تغطية في الخليج والأردن ومصر',
      noteEn: 'EXPRO: Coverage in GCC, Jordan, Egypt'
    },
    {
      categoryAr: 'تغطية الوالدين',
      categoryEn: 'Parents Coverage',
      smeValue: language === 'ar' ? 'غير مشمول' : 'Not Covered',
      largeValue: language === 'ar' ? 'اختياري' : 'Optional',
      exproValue: language === 'ar' ? 'مشمول' : 'Covered',
      status: 'expro-better',
      icon: UserPlus,
      noteAr: 'الشركات الكبيرة يمكنها إضافة الوالدين اختيارياً',
      noteEn: 'Large companies can optionally add parents'
    },
    {
      categoryAr: 'الحد الأعلى للحمل والولادة',
      categoryEn: 'Maternity Maximum',
      smeValue: '10,000',
      largeValue: '10,000',
      exproValue: '15,000',
      status: 'expro-better',
      icon: Baby,
      noteAr: 'اكسبرو: + مضاعفات حتى حد الوثيقة',
      noteEn: 'EXPRO: + complications to policy limit'
    },
    {
      categoryAr: 'الولادة القيصرية ومضاعفاتها',
      categoryEn: 'C-Section & Complications',
      smeValue: language === 'ar' ? 'ضمن حد الأمومة' : 'Within maternity',
      largeValue: language === 'ar' ? 'ضمن حد الأمومة' : 'Within maternity',
      exproValue: language === 'ar' ? 'حد الوثيقة' : 'Policy max',
      status: 'expro-better',
      icon: HeartPulse,
      noteAr: '',
      noteEn: ''
    },
    {
      categoryAr: 'تكاليف الحالات النفسية',
      categoryEn: 'Mental Health Costs',
      smeValue: '15,000',
      largeValue: '15,000',
      exproValue: '50,000',
      status: 'expro-better',
      icon: Brain,
      noteAr: '',
      noteEn: ''
    },
    {
      categoryAr: 'حالات التأهيل والأطراف الصناعية',
      categoryEn: 'Rehabilitation & Prosthetics',
      smeValue: language === 'ar' ? 'ضمن الحد' : 'Within limit',
      largeValue: language === 'ar' ? 'ضمن الحد' : 'Within limit',
      exproValue: '100,000',
      status: 'expro-better',
      icon: Accessibility,
      noteAr: '',
      noteEn: ''
    },
    {
      categoryAr: 'استبدال المفاصل (الركبة والحوض)',
      categoryEn: 'Knee-Hip Replacement',
      smeValue: language === 'ar' ? 'حسب الضرورة' : 'As needed',
      largeValue: language === 'ar' ? 'حسب الضرورة' : 'As needed',
      exproValue: '50,000',
      status: 'equal',
      icon: Bone,
      noteAr: 'حسب المعايير الطبية المعتمدة',
      noteEn: 'Per approved medical criteria'
    },
    {
      categoryAr: 'حالات التوحد',
      categoryEn: 'Autism Cases',
      smeValue: language === 'ar' ? 'مغطى' : 'Covered',
      largeValue: language === 'ar' ? 'مغطى' : 'Covered',
      exproValue: '50,000',
      status: 'expro-better',
      icon: Brain,
      noteAr: 'اكسبرو: حد مستقل',
      noteEn: 'EXPRO: Separate limit'
    },
    {
      categoryAr: 'تغطية البصريات للبالغين',
      categoryEn: 'Adult Optical Coverage',
      smeValue: language === 'ar' ? 'الأطفال فقط' : 'Children only',
      largeValue: language === 'ar' ? 'الأطفال فقط' : 'Children only',
      exproValue: '2,000',
      status: 'expro-better',
      icon: Glasses,
      noteAr: '',
      noteEn: ''
    },
    {
      categoryAr: 'تنظيم الأسرة ووسائل منع الحمل',
      categoryEn: 'Family Planning & Contraception',
      smeValue: language === 'ar' ? 'غير مغطى' : 'Not Covered',
      largeValue: language === 'ar' ? 'غير مغطى' : 'Not Covered',
      exproValue: '1,500',
      status: 'expro-better',
      icon: Heart,
      noteAr: '',
      noteEn: ''
    },
    {
      categoryAr: 'الختان للذكور',
      categoryEn: 'Male Circumcision',
      smeValue: language === 'ar' ? 'غير مغطى' : 'Not Covered',
      largeValue: language === 'ar' ? 'غير مغطى' : 'Not Covered',
      exproValue: '500',
      status: 'expro-better',
      icon: Scissors,
      noteAr: '',
      noteEn: ''
    },
    // المنافع الجديدة في وثيقة CHI
    {
      categoryAr: 'التشوهات الخلقية',
      categoryEn: 'Congenital Anomalies',
      smeValue: language === 'ar' ? 'مغطى' : 'Covered',
      largeValue: language === 'ar' ? 'مغطى' : 'Covered',
      exproValue: language === 'ar' ? 'مغطى' : 'Covered',
      status: 'equal',
      icon: HeartPulse,
      noteAr: 'حالات حالية ومستقبلية',
      noteEn: 'Current and future conditions'
    },
    {
      categoryAr: 'الرعاية المنزلية',
      categoryEn: 'Homecare',
      smeValue: language === 'ar' ? 'مغطى' : 'Covered',
      largeValue: language === 'ar' ? 'مغطى' : 'Covered',
      exproValue: language === 'ar' ? 'مغطى' : 'Covered',
      status: 'equal',
      icon: Home,
      noteAr: 'جروح، أدوية وريدية، قسطرة',
      noteEn: 'Wound care, IV meds, catheters'
    },
    {
      categoryAr: 'الطب عن بعد',
      categoryEn: 'Telemedicine',
      smeValue: language === 'ar' ? 'مغطى' : 'Covered',
      largeValue: language === 'ar' ? 'مغطى' : 'Covered',
      exproValue: language === 'ar' ? 'مغطى' : 'Covered',
      status: 'equal',
      icon: Globe,
      noteAr: '',
      noteEn: ''
    },
    // نسب التحمل
    {
      categoryAr: 'نسبة التحمل للرعاية الأولية',
      categoryEn: 'Primary Care Copay',
      smeValue: language === 'ar' ? '0.5% (25 ر.س)' : '0.5% (25 SAR)',
      largeValue: language === 'ar' ? '0.5% (25 ر.س)' : '0.5% (25 SAR)',
      exproValue: language === 'ar' ? '20% (100 ر.س)' : '20% (100 SAR)',
      status: 'chi-better',
      icon: Stethoscope,
      noteAr: '',
      noteEn: ''
    },
    {
      categoryAr: 'نسبة التحمل للتخصصية (بإحالة)',
      categoryEn: 'Specialist Copay (with referral)',
      smeValue: language === 'ar' ? '0.10% (75 ر.س)' : '0.10% (75 SAR)',
      largeValue: language === 'ar' ? '0.10% (75 ر.س)' : '0.10% (75 SAR)',
      exproValue: language === 'ar' ? '20% (100 ر.س)' : '20% (100 SAR)',
      status: 'chi-better',
      icon: Stethoscope,
      noteAr: '',
      noteEn: ''
    },
    {
      categoryAr: 'نسبة التحمل للتخصصية (بدون إحالة)',
      categoryEn: 'Specialist Copay (no referral)',
      smeValue: language === 'ar' ? '0.5% (500 ر.س)' : '0.5% (500 SAR)',
      largeValue: language === 'ar' ? '0.5% (500 ر.س)' : '0.5% (500 SAR)',
      exproValue: language === 'ar' ? '20% (100 ر.س)' : '20% (100 SAR)',
      status: 'expro-better',
      icon: Stethoscope,
      noteAr: '',
      noteEn: ''
    },
    {
      categoryAr: 'تغطية الأسنان',
      categoryEn: 'Dental Coverage',
      smeValue: language === 'ar' ? 'مغطى' : 'Covered',
      largeValue: language === 'ar' ? 'مغطى' : 'Covered',
      exproValue: '5,000',
      status: 'equal',
      icon: Sparkles,
      noteAr: 'وقائية وأساسية',
      noteEn: 'Preventive and essential'
    },
    {
      categoryAr: 'غرفة الإقامة',
      categoryEn: 'Room & Board',
      smeValue: language === 'ar' ? 'غرفة خاصة' : 'Private room',
      largeValue: language === 'ar' ? 'غرفة خاصة' : 'Private room',
      exproValue: language === 'ar' ? 'غرفة خاصة' : 'Private room',
      status: 'equal',
      icon: Home,
      noteAr: '',
      noteEn: ''
    },
    {
      categoryAr: 'علاج السمنة',
      categoryEn: 'Bariatric Surgery',
      smeValue: '20,000',
      largeValue: '20,000',
      exproValue: '20,000',
      status: 'equal',
      icon: Activity,
      noteAr: '',
      noteEn: ''
    },
    {
      categoryAr: 'غسيل الكلى',
      categoryEn: 'Dialysis',
      smeValue: '180,000',
      largeValue: '180,000',
      exproValue: '180,000',
      status: 'equal',
      icon: Heart,
      noteAr: '',
      noteEn: ''
    },
    {
      categoryAr: 'زراعة الكلى',
      categoryEn: 'Kidney Transplant',
      smeValue: '250,000',
      largeValue: '250,000',
      exproValue: '250,000',
      status: 'equal',
      icon: Heart,
      noteAr: '',
      noteEn: ''
    },
    {
      categoryAr: 'صمامات القلب',
      categoryEn: 'Heart Valves',
      smeValue: '150,000',
      largeValue: '150,000',
      exproValue: '150,000',
      status: 'equal',
      icon: HeartPulse,
      noteAr: '',
      noteEn: ''
    },
    {
      categoryAr: 'التبرع بالأعضاء',
      categoryEn: 'Organ Donation',
      smeValue: '50,000',
      largeValue: '50,000',
      exproValue: '50,000',
      status: 'equal',
      icon: Heart,
      noteAr: '',
      noteEn: ''
    },
    {
      categoryAr: 'الزهايمر',
      categoryEn: 'Alzheimer',
      smeValue: '15,000',
      largeValue: '15,000',
      exproValue: '15,000',
      status: 'equal',
      icon: Brain,
      noteAr: '',
      noteEn: ''
    },
    {
      categoryAr: 'السماعات الطبية',
      categoryEn: 'Hearing Aids',
      smeValue: '6,000',
      largeValue: '6,000',
      exproValue: '6,000',
      status: 'equal',
      icon: Ear,
      noteAr: '',
      noteEn: ''
    },
    {
      categoryAr: 'إعادة رفات المتوفى',
      categoryEn: 'Repatriation',
      smeValue: '10,000',
      largeValue: '10,000',
      exproValue: '10,000',
      status: 'equal',
      icon: FileText,
      noteAr: '',
      noteEn: ''
    },
  ];

  // منافع الوالدين - فئة VIP
  const parentsBenefits = [
    { categoryAr: 'الحد السنوي الإجمالي', categoryEn: 'Annual Maximum', value: '500,000', icon: Shield, noteAr: '', noteEn: '' },
    { categoryAr: 'شبكة مزودي الخدمة', categoryEn: 'Provider Network', value: language === 'ar' ? 'شبكة عالية' : 'Premium Network', icon: Globe, noteAr: '', noteEn: '' },
    { categoryAr: 'تكاليف الحالات النفسية', categoryEn: 'Mental Health', value: '50,000', icon: Brain, noteAr: '', noteEn: '' },
    { categoryAr: 'نسبة التحمل للعيادات الخارجية', categoryEn: 'Outpatient Copay', value: language === 'ar' ? '20% (100 ر.س)' : '20% (100 SAR)', icon: Stethoscope, noteAr: '', noteEn: '' },
    { categoryAr: 'تغطية الأسنان', categoryEn: 'Dental Coverage', value: language === 'ar' ? 'جميع الشبكات' : 'All networks', icon: Sparkles, noteAr: '', noteEn: '' },
    { categoryAr: 'تغطية البصريات', categoryEn: 'Optical Coverage', value: '2,000', icon: Glasses, noteAr: '', noteEn: '' },
    { categoryAr: 'غرفة الإقامة', categoryEn: 'Room & Board', value: language === 'ar' ? 'غرفة خاصة' : 'Private room', icon: Home, noteAr: '', noteEn: '' },
    { categoryAr: 'الأمراض المزمنة', categoryEn: 'Chronic Diseases', value: language === 'ar' ? 'مغطى' : 'Covered', icon: HeartPulse, noteAr: '', noteEn: '' },
    { categoryAr: 'استبدال المفاصل', categoryEn: 'Joint Replacement', value: '50,000', icon: Bone, noteAr: '', noteEn: '' },
    { categoryAr: 'الزهايمر', categoryEn: 'Alzheimer', value: '15,000', icon: Brain, noteAr: '', noteEn: '' },
    { categoryAr: 'حالات التأهيل والأطراف', categoryEn: 'Rehab & Prosthetics', value: '100,000', icon: Accessibility, noteAr: '', noteEn: '' },
    { categoryAr: 'حالات التوحد', categoryEn: 'Autism Cases', value: '50,000', icon: Brain, noteAr: '', noteEn: '' },
    { categoryAr: 'علاج السمنة', categoryEn: 'Bariatric Surgery', value: '20,000', icon: Activity, noteAr: '', noteEn: '' },
    { categoryAr: 'غسيل الكلى', categoryEn: 'Dialysis', value: '180,000', icon: Heart, noteAr: '', noteEn: '' },
    { categoryAr: 'زراعة الكلى', categoryEn: 'Kidney Transplant', value: '250,000', icon: Heart, noteAr: '', noteEn: '' },
    { categoryAr: 'صمامات القلب', categoryEn: 'Heart Valves', value: '150,000', icon: HeartPulse, noteAr: '', noteEn: '' },
    { categoryAr: 'التبرع بالأعضاء', categoryEn: 'Organ Donation', value: '50,000', icon: Heart, noteAr: '', noteEn: '' },
    { categoryAr: 'السماعات الطبية', categoryEn: 'Hearing Aids', value: '6,000', icon: Ear, noteAr: '', noteEn: '' },
    { categoryAr: 'إعادة رفات المتوفى', categoryEn: 'Repatriation', value: '10,000', icon: FileText, noteAr: '', noteEn: '' },
  ];

  // المنافع غير المغطاة للوالدين
  const parentsNotCovered = [
    { ar: 'الحمل والولادة', en: 'Maternity' },
    { ar: 'الولادة القيصرية', en: 'C-Section' },
    { ar: 'الأطفال الخدج', en: 'Premature Babies' },
    { ar: 'تغطية المواليد الجدد', en: 'Newborn Coverage' },
    { ar: 'الفحص المبكر لحديثي الولادة', en: 'Newborn Screening' },
    { ar: 'تطعيمات الأطفال', en: 'Children Vaccinations' },
    { ar: 'تنظيم الأسرة', en: 'Family Planning' },
    { ar: 'الختان', en: 'Circumcision' },
    { ar: 'تخريم الأذان', en: 'Ear Piercing' },
    { ar: 'التعويض خارج المملكة (غير طارئ)', en: 'Non-emergency abroad reimbursement' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'equal':
        return <Badge variant="secondary" className="text-[9px]"><Equal className="h-3 w-3" /></Badge>;
      case 'expro-better':
        return <Badge className="bg-success text-[9px]">{language === 'ar' ? 'اكسبرو أفضل' : 'EXPRO Better'}</Badge>;
      case 'chi-better':
        return <Badge className="bg-primary text-[9px]">{language === 'ar' ? 'CHI أفضل' : 'CHI Better'}</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      {/* Hero */}
      <section className="relative py-8 overflow-hidden gradient-hero">
        <div className="absolute inset-0 chi-pattern" />
        <div className="container mx-auto px-4 relative">
          <div className={`flex items-center gap-4 w-fit ${isRTL ? 'mr-0 ml-auto' : 'ml-0 mr-auto'}`}>
            {isRTL ? (
              <>
                <div className="p-3 rounded-xl bg-primary-foreground/10">
                  <FileText className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="text-right">
                  <h1 className="text-2xl sm:text-3xl font-bold text-primary-foreground">
                    مقارنة الوثائق الصحية
                  </h1>
                  <p className="text-sm text-primary-foreground/70 mt-1">
                    مقارنة بين وثائق مجلس الضمان الصحي للشركات ووثيقة اكسبرو الحكومية
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="p-3 rounded-xl bg-primary-foreground/10">
                  <FileText className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="text-left">
                  <h1 className="text-2xl sm:text-3xl font-bold text-primary-foreground">
                    Health Policy Comparison
                  </h1>
                  <p className="text-sm text-primary-foreground/70 mt-1">
                    Compare CHI policies for companies with EXPRO Government Policy
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-6">
        {/* Policy Headers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Shield className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-bold text-sm">{isRTL ? 'وثيقة الشركات الصغيرة والمتوسطة' : 'SME Policy'}</h3>
              <p className="text-xs text-muted-foreground">{isRTL ? 'أقل من 500 موظف' : 'Less than 500 employees'}</p>
              <div className="flex items-center gap-1 mt-2">
                <p className="text-lg font-bold text-primary">1,000,000</p>
                <img src={saudiRiyalSymbol} alt="SAR" className="h-4 w-4" />
              </div>
              <p className="text-xs text-muted-foreground">{isRTL ? '/سنة' : '/year'}</p>
            </CardContent>
          </Card>
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Shield className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-bold text-sm">{isRTL ? 'وثيقة الشركات الكبيرة' : 'Large Company Policy'}</h3>
              <p className="text-xs text-muted-foreground">{isRTL ? '500 موظف فأكثر' : '500+ employees'}</p>
              <div className="flex items-center gap-1 mt-2">
                <p className="text-lg font-bold text-primary">1,000,000</p>
                <img src={saudiRiyalSymbol} alt="SAR" className="h-4 w-4" />
              </div>
              <p className="text-xs text-muted-foreground">{isRTL ? '/سنة' : '/year'}</p>
            </CardContent>
          </Card>
          <Card className="border-success/30 bg-success/5">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Building className="h-8 w-8 text-success mb-2" />
              <h3 className="font-bold text-sm">{isRTL ? 'وثيقة اكسبرو الحكومية' : 'EXPRO Government Policy'}</h3>
              <p className="text-xs text-muted-foreground">{isRTL ? 'القطاع الحكومي' : 'Government Sector'}</p>
              <div className="flex items-center gap-1 mt-2">
                <p className="text-lg font-bold text-success">500,000</p>
                <img src={saudiRiyalSymbol} alt="SAR" className="h-4 w-4" />
              </div>
              <p className="text-xs text-muted-foreground">{isRTL ? '/سنة' : '/year'}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="employee" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="employee" className="text-xs sm:text-sm">
              {isRTL ? 'الموظف/ة وعائلته' : 'Employee & Family'}
            </TabsTrigger>
            <TabsTrigger value="parents" className="text-xs sm:text-sm">
              {isRTL ? 'منافع الوالدين' : 'Parents Benefits'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="employee">
            {/* Comparison Table */}
            <Card>
              <CardHeader className={isRTL ? 'text-right' : ''}>
                <CardTitle className="text-base flex items-center gap-2 w-full" style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: isRTL ? 'flex-start' : 'flex-start' }}>
                  <Users className="h-5 w-5 text-primary" />
                  {isRTL ? 'مقارنة منافع الموظف/ة وعائلته' : 'Employee & Family Benefits Comparison'}
                </CardTitle>
                <CardDescription className={isRTL ? 'text-right' : ''}>
                  {isRTL ? 'المبالغ بالريال السعودي - المنافع التي فيها اكسبرو أفضل في البداية' : 'Amounts in SAR - EXPRO advantages listed first'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" dir={isRTL ? 'rtl' : 'ltr'}>
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className={`p-2 font-semibold ${isRTL ? 'text-right' : 'text-left'}`}>
                          {isRTL ? 'المنفعة' : 'Benefit'}
                        </th>
                        <th className="p-2 font-semibold text-center text-primary text-[10px]">
                          {isRTL ? 'صغيرة/متوسطة' : 'SME'}
                        </th>
                        <th className="p-2 font-semibold text-center text-primary text-[10px]">
                          {isRTL ? 'كبيرة' : 'Large'}
                        </th>
                        <th className="p-2 font-semibold text-center text-success text-[10px]">
                          {isRTL ? 'اكسبرو' : 'EXPRO'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeBenefits.map((item, index) => (
                        <tr key={index} className={`border-b hover:bg-muted/30 transition-colors ${item.status === 'expro-better' ? 'bg-success/5' : item.status === 'chi-better' ? 'bg-primary/5' : ''}`}>
                          <td className={`p-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                            <div className={`flex items-center gap-2`}>
                              {isRTL ? (
                                <>
                                  <div className="text-right flex-1">
                                    <span className="font-medium text-xs">{item.categoryAr}</span>
                                    {item.noteAr && (
                                      <p className="text-[9px] text-muted-foreground mt-0.5">
                                        {item.noteAr}
                                      </p>
                                    )}
                                  </div>
                                  <item.icon className="h-4 w-4 text-muted-foreground shrink-0" />
                                </>
                              ) : (
                                <>
                                  <item.icon className="h-4 w-4 text-muted-foreground shrink-0" />
                                  <div className="text-left">
                                    <span className="font-medium text-xs">{item.categoryEn}</span>
                                    {item.noteEn && (
                                      <p className="text-[9px] text-muted-foreground mt-0.5">
                                        {item.noteEn}
                                      </p>
                                    )}
                                  </div>
                                </>
                              )}
                            </div>
                          </td>
                          <td className="p-2 text-center font-mono text-[10px]">{item.smeValue}</td>
                          <td className="p-2 text-center font-mono text-[10px]">{item.largeValue}</td>
                          <td className="p-2 text-center font-mono text-[10px]">{item.exproValue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="parents">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Parents Benefits */}
              <Card className="lg:col-span-2">
                <CardHeader className={isRTL ? 'text-right' : ''}>
                  <CardTitle className="text-base flex items-center gap-2 w-full" style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: isRTL ? 'flex-start' : 'flex-start' }}>
                    <UserPlus className="h-5 w-5 text-success" />
                    {isRTL ? 'منافع الوالدين في وثيقة اكسبرو' : 'Parents Benefits in EXPRO Policy'}
                  </CardTitle>
                  <CardDescription className={isRTL ? 'text-right' : ''}>
                    {isRTL ? 'الوالدين غير مغطيين في وثيقة مجلس الضمان الأساسية' : 'Parents are NOT covered in CHI Basic Policy'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {parentsBenefits.map((item, index) => (
                      <div key={index} className={`flex items-center gap-3 p-3 bg-success/5 rounded-lg border border-success/20 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <item.icon className="h-5 w-5 text-success shrink-0" />
                        <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                          <p className="font-medium text-xs">{isRTL ? item.categoryAr : item.categoryEn}</p>
                          <p className="text-sm font-bold text-success">{item.value}</p>
                          {(isRTL ? item.noteAr : item.noteEn) && (
                            <p className="text-[10px] text-muted-foreground">{isRTL ? item.noteAr : item.noteEn}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Not Covered for Parents */}
              <Card className="border-destructive/30">
                <CardHeader className={isRTL ? 'text-right' : ''}>
                  <CardTitle className={`text-base flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                    <X className="h-5 w-5 text-destructive" />
                    {isRTL ? 'غير مغطى للوالدين' : 'Not Covered for Parents'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {parentsNotCovered.map((item, index) => (
                      <div key={index} className={`flex items-center gap-2 p-2 bg-destructive/5 rounded ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <X className="h-4 w-4 text-destructive shrink-0" />
                        <span className="text-xs">{isRTL ? item.ar : item.en}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Key Differences Summary */}
        <Card className="mt-6 border-warning/30 bg-warning/5">
          <CardContent className="p-4">
            <h3 className={`font-bold text-sm mb-3 flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
              <AlertCircle className="h-4 w-4 text-warning" />
              {isRTL ? 'أهم الفروقات بين الوثيقتين' : 'Key Differences Between Policies'}
            </h3>
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs ${isRTL ? 'text-right' : ''}`}>
              <div className={`flex items-start gap-2 p-2 bg-background rounded-lg`}>
                {isRTL ? (
                  <>
                    <div className="text-right flex-1">
                      <p className="font-medium">الحد الأقصى السنوي</p>
                      <p className="text-muted-foreground">مليون لجميع الشركات، 500 ألف لاكسبرو</p>
                    </div>
                    <Shield className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Annual Maximum</p>
                      <p className="text-muted-foreground">1M for all companies, 500K for EXPRO</p>
                    </div>
                  </>
                )}
              </div>
              <div className={`flex items-start gap-2 p-2 bg-background rounded-lg`}>
                {isRTL ? (
                  <>
                    <div className="text-right flex-1">
                      <p className="font-medium">نسب التحمل الجديدة</p>
                      <p className="text-muted-foreground">رعاية أولية 0.5% وتخصصية 0.10% مع إحالة</p>
                    </div>
                    <Stethoscope className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  </>
                ) : (
                  <>
                    <Stethoscope className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">New Copay Structure</p>
                      <p className="text-muted-foreground">Primary 0.5%, Specialist 0.10% with referral</p>
                    </div>
                  </>
                )}
              </div>
              <div className={`flex items-start gap-2 p-2 bg-background rounded-lg`}>
                {isRTL ? (
                  <>
                    <div className="text-right flex-1">
                      <p className="font-medium">الرعاية المنزلية</p>
                      <p className="text-muted-foreground">جروح، أدوية وريدية، قسطرة بولية</p>
                    </div>
                    <Home className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  </>
                ) : (
                  <>
                    <Home className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Homecare</p>
                      <p className="text-muted-foreground">Wound care, IV meds, urinary catheters</p>
                    </div>
                  </>
                )}
              </div>
              <div className={`flex items-start gap-2 p-2 bg-background rounded-lg`}>
                {isRTL ? (
                  <>
                    <div className="text-right flex-1">
                      <p className="font-medium">تغطية الوالدين</p>
                      <p className="text-muted-foreground">اكسبرو تغطي الوالدين بوثيقة منفصلة</p>
                    </div>
                    <UserPlus className="h-4 w-4 text-success shrink-0 mt-0.5" />
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Parents Coverage</p>
                      <p className="text-muted-foreground">EXPRO covers parents in separate policy</p>
                    </div>
                  </>
                )}
              </div>
              <div className={`flex items-start gap-2 p-2 bg-background rounded-lg`}>
                {isRTL ? (
                  <>
                    <div className="text-right flex-1">
                      <p className="font-medium">الطب عن بعد</p>
                      <p className="text-muted-foreground">مغطى في كلا الوثيقتين</p>
                    </div>
                    <Globe className="h-4 w-4 text-success shrink-0 mt-0.5" />
                  </>
                ) : (
                  <>
                    <Globe className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Telemedicine</p>
                      <p className="text-muted-foreground">Covered in both policies</p>
                    </div>
                  </>
                )}
              </div>
              <div className={`flex items-start gap-2 p-2 bg-background rounded-lg`}>
                {isRTL ? (
                  <>
                    <div className="text-right flex-1">
                      <p className="font-medium">التشوهات الخلقية</p>
                      <p className="text-muted-foreground">حالية ومستقبلية مغطاة</p>
                    </div>
                    <HeartPulse className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  </>
                ) : (
                  <>
                    <HeartPulse className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Congenital Anomalies</p>
                      <p className="text-muted-foreground">Current and future covered</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Benefits Info */}
        <Card className="mt-6">
          <CardHeader className={isRTL ? 'text-right' : ''}>
            <CardTitle className={`text-base flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
              <Check className="h-5 w-5 text-success" />
              {isRTL ? 'إيضاحات وتغطيات إضافية في اكسبرو' : 'Additional EXPRO Clarifications & Coverage'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 text-xs ${isRTL ? 'text-right' : ''}`}>
              <div className={`flex items-start gap-2 p-3 bg-muted/50 rounded-lg ${isRTL ? 'flex-row' : ''}`}>
                {isRTL ? (
                  <>
                    <div className="text-right flex-1">
                      <p className="font-medium">تطعيمات الأطفال RSV</p>
                      <p className="text-muted-foreground">حسب جدول وزارة الصحة</p>
                    </div>
                    <Syringe className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  </>
                ) : (
                  <>
                    <Syringe className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">RSV Vaccinations</p>
                      <p className="text-muted-foreground">Per MOH schedule</p>
                    </div>
                  </>
                )}
              </div>
              <div className={`flex items-start gap-2 p-3 bg-muted/50 rounded-lg ${isRTL ? 'flex-row' : ''}`}>
                {isRTL ? (
                  <>
                    <div className="text-right flex-1">
                      <p className="font-medium">علاج الصدفية</p>
                      <p className="text-muted-foreground">مغطى بالكامل</p>
                    </div>
                    <Activity className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  </>
                ) : (
                  <>
                    <Activity className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Psoriasis Treatment</p>
                      <p className="text-muted-foreground">Fully covered</p>
                    </div>
                  </>
                )}
              </div>
              <div className={`flex items-start gap-2 p-3 bg-muted/50 rounded-lg ${isRTL ? 'flex-row' : ''}`}>
                {isRTL ? (
                  <>
                    <div className="text-right flex-1">
                      <p className="font-medium">الرعاية المنزلية</p>
                      <p className="text-muted-foreground">الرعاية الطبية والتمريضية في المنزل</p>
                    </div>
                    <Home className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  </>
                ) : (
                  <>
                    <Home className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Home Care</p>
                      <p className="text-muted-foreground">Medical and nursing care at home</p>
                    </div>
                  </>
                )}
              </div>
              <div className={`flex items-start gap-2 p-3 bg-muted/50 rounded-lg ${isRTL ? 'flex-row' : ''}`}>
                {isRTL ? (
                  <>
                    <div className="text-right flex-1">
                      <p className="font-medium">المكملات الغذائية والفيتامينات</p>
                      <p className="text-muted-foreground">شريطة أن تكون ضرورية ومسجلة بـ SFDA</p>
                    </div>
                    <Pill className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  </>
                ) : (
                  <>
                    <Pill className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Supplements & Vitamins</p>
                      <p className="text-muted-foreground">If essential and SFDA registered</p>
                    </div>
                  </>
                )}
              </div>
              <div className={`flex items-start gap-2 p-3 bg-muted/50 rounded-lg ${isRTL ? 'flex-row' : ''}`}>
                {isRTL ? (
                  <>
                    <div className="text-right flex-1">
                      <p className="font-medium">التطبيب عن بُعد</p>
                      <p className="text-muted-foreground">مغطى بالكامل</p>
                    </div>
                    <Stethoscope className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  </>
                ) : (
                  <>
                    <Stethoscope className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Telemedicine</p>
                      <p className="text-muted-foreground">Fully covered</p>
                    </div>
                  </>
                )}
              </div>
              <div className={`flex items-start gap-2 p-3 bg-muted/50 rounded-lg ${isRTL ? 'flex-row' : ''}`}>
                {isRTL ? (
                  <>
                    <div className="text-right flex-1">
                      <p className="font-medium">تعزيز صحة المرأة</p>
                      <p className="text-muted-foreground">علاج انقطاع الطمث والعلاج الهرموني</p>
                    </div>
                    <Heart className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  </>
                ) : (
                  <>
                    <Heart className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Women's Health</p>
                      <p className="text-muted-foreground">Menopause and hormone therapy</p>
                    </div>
                  </>
                )}
              </div>
              <div className={`flex items-start gap-2 p-3 bg-muted/50 rounded-lg ${isRTL ? 'flex-row' : ''}`}>
                {isRTL ? (
                  <>
                    <div className="text-right flex-1">
                      <p className="font-medium">الفحوصات الوقائية</p>
                      <p className="text-muted-foreground">حسب الدليل الوطني لهيئة الصحة العامة</p>
                    </div>
                    <FileCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  </>
                ) : (
                  <>
                    <FileCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Preventive Exams</p>
                      <p className="text-muted-foreground">Per National Public Health Guide</p>
                    </div>
                  </>
                )}
              </div>
              <div className={`flex items-start gap-2 p-3 bg-muted/50 rounded-lg ${isRTL ? 'flex-row' : ''}`}>
                {isRTL ? (
                  <>
                    <div className="text-right flex-1">
                      <p className="font-medium">الأمراض الجنسية المعدية</p>
                      <p className="text-muted-foreground">مغطاة أياً كانت طريقة العدوى</p>
                    </div>
                    <AlertCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">STDs</p>
                      <p className="text-muted-foreground">Covered regardless of transmission</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PolicyComparison;
