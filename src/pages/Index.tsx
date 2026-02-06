// Daman AI Platform - Homepage
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { CHIRegulationsChat } from '@/components/CHIRegulationsChat';
import PWAInstallButton from '@/components/PWAInstallButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calculator, Users, Heart, Network, Shield, Package, 
  Stethoscope, FileCheck, Building, UserCheck, Hospital, Briefcase,
  User, Calendar, Check, ArrowLeft, ArrowRight, CreditCard, 
  ClipboardCheck, Activity, Pill, ScrollText, FileCode, 
  BadgeCheck, BarChart3, Database, type LucideIcon
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

import { 
  preventiveServices, 
  beneficiaryTypes,
  checkEligibility,
  type BeneficiaryType 
} from '@/data/preventiveServices';

const insuranceStats = [
  { valueAr: '13.84', valueEn: '13.84', unitAr: 'مليون', unitEn: 'M', labelAr: 'مؤمن لهم من أصحاب العمل', labelEn: 'Employer-Insured Beneficiaries', icon: Users },
  { valueAr: '4.51', valueEn: '4.51', unitAr: 'مليون', unitEn: 'M', labelAr: 'مستفيدين سعوديين', labelEn: 'Saudi Beneficiaries', icon: UserCheck },
  { valueAr: '+170', valueEn: '170+', unitAr: '', unitEn: '', labelAr: 'مؤشر للكفاءة والجودة', labelEn: 'Efficiency & Quality Indicators', icon: Building },
  { valueAr: '4,500+', valueEn: '4,500+', unitAr: '', unitEn: '', labelAr: 'مقدم خدمة معتمد', labelEn: 'Approved Providers', icon: Hospital },
];

const Index = () => {
  const { language, isRTL } = useLanguage();
  const [age, setAge] = useState<number>(35);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [beneficiaryType, setBeneficiaryType] = useState<BeneficiaryType>('private_sector');
  
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const selectedBeneficiaryInfo = beneficiaryTypes.find(b => b.type === beneficiaryType);
  
  const eligibleCount = useMemo(() => {
    if (!selectedBeneficiaryInfo?.preventiveCovered) return 0;
    return preventiveServices.filter(service => {
      const result = checkEligibility(service, age, gender, []);
      return result.eligible && selectedBeneficiaryInfo.coverageTypes.includes(service.coverage);
    }).length;
  }, [age, gender, beneficiaryType, selectedBeneficiaryInfo]);

  // Service categories matching header navigation
  const serviceCategories = {
    beneficiaries: {
      labelAr: 'المستفيدين',
      labelEn: 'Beneficiaries',
      icon: Users,
      services: [
        { to: '/insurance-eligibility', titleAr: 'أهلية العلاج', titleEn: 'Eligibility Check', icon: BadgeCheck, descAr: 'تحقق من حالة تأمينك الصحي', descEn: 'Verify your health insurance status' },
        { to: '/benefits-package', titleAr: 'حزمة المنافع', titleEn: 'Benefits Package', icon: Package, descAr: 'استعرض المنافع والحدود القصوى', descEn: 'View benefits and maximum limits' },
        { to: '/preventive-services', titleAr: 'الخدمات الوقائية', titleEn: 'Preventive Services', icon: Shield, descAr: 'الفحوصات والتطعيمات المغطاة', descEn: 'Covered screenings and vaccinations' },
        { to: '/beneficiary-health', titleAr: 'صحة المستفيدين', titleEn: 'Population Health', icon: Heart, descAr: 'برنامج إدارة صحة السكان', descEn: 'Population health management program' },
        { to: '/insurance-categories', titleAr: 'التغطية الإلزامية', titleEn: 'Coverage Types', icon: CreditCard, descAr: 'أنواع التأمين والفئات المشمولة', descEn: 'Insurance types and covered categories' },
        { to: '/prior-auth-checker', titleAr: 'فاحص الموافقة والأدوية', titleEn: 'Prior Auth & Drug Check', icon: Pill, descAr: 'تحقق من تغطية الأدوية والموافقات', descEn: 'Check drug coverage and approvals' },
      ]
    },
    employers: {
      labelAr: 'أصحاب العمل',
      labelEn: 'Employers',
      icon: Briefcase,
      services: [
        { to: '/employer-assistant', titleAr: 'مساعد صاحب العمل', titleEn: 'Employer Assistant', icon: Calculator, descAr: 'مساعد ذكي لأصحاب العمل', descEn: 'AI assistant for employers' },
        { to: '/fines-calculator', titleAr: 'حاسبة غرامات عدم الالتزام', titleEn: 'Non-Compliance Fines', icon: ScrollText, descAr: 'احسب غرامات مخالفة التأمين', descEn: 'Calculate insurance violation fines' },
        { to: '/compliance-report', titleAr: 'استعلام نسبة الامتثال', titleEn: 'Compliance Inquiry', icon: ClipboardCheck, descAr: 'استعلم عن نسبة امتثال منشأتك', descEn: 'Check your facility compliance rate' },
      ]
    },
    providers: {
      labelAr: 'مقدمي الخدمة',
      labelEn: 'Providers',
      icon: Stethoscope,
      services: [
        { to: '/primary-care', titleAr: 'الرعاية الأولية', titleEn: 'Primary Care', icon: Activity, descAr: 'معايير تصنيف مقدمي الرعاية الأولية', descEn: 'Primary care provider classification' },
        { to: '/drg-implementation', titleAr: 'الحزم التشخيصية', titleEn: 'DRG System', icon: FileCode, descAr: 'نظام الدفع بالحزم التشخيصية', descEn: 'Diagnostic-related groups payment' },
        { to: '/prior-authorization', titleAr: 'الموافقات المسبقة', titleEn: 'Prior Authorization', icon: FileCheck, descAr: 'متطلبات وأكواد الموافقة المسبقة', descEn: 'Prior auth requirements and codes' },
        { to: '/medical-coding-assistant', titleAr: 'مساعد الترميز الطبي', titleEn: 'Medical Coding', icon: ScrollText, descAr: 'تحقق من أكواد ICD-10 و SBS', descEn: 'Verify ICD-10 and SBS codes' },
        { to: '/practitioner-verification', titleAr: 'التحقق من الممارس الصحي', titleEn: 'Practitioner Verification', icon: UserCheck, descAr: 'التحقق من بيانات الممارسين', descEn: 'Verify practitioner credentials' },
        { to: '/physician-privileges', titleAr: 'صلاحيات الممارسين', titleEn: 'Physician Privileges', icon: BadgeCheck, descAr: 'الخدمات حسب التخصص الطبي', descEn: 'Services by medical specialty' },
        { to: '/daman-intelligence', titleAr: 'ضمان انتلجنس', titleEn: 'Daman Intelligence', icon: BarChart3, descAr: 'تحليلات أداء مقدم الخدمة', descEn: 'Provider performance analytics' },
      ]
    },
    naphies: {
      labelAr: 'منصة نفيس',
      labelEn: 'NAPHIES',
      icon: Network,
      services: [
        { to: '/nafees-platform', titleAr: 'منصة نفيس', titleEn: 'NAPHIES Platform', icon: Database, descAr: 'منصة تبادل المعلومات الصحية', descEn: 'Health information exchange platform' },
      ]
    },
  };

  return (
    <div className={`min-h-screen min-h-[100dvh] bg-background overflow-x-hidden ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Experimental Platform Alert */}
      <Alert className="rounded-none border-x-0 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <AlertDescription className={`text-amber-800 dark:text-amber-200 text-xs sm:text-sm ${isRTL ? 'text-right mr-2' : 'text-left ml-2'}`}>
          {language === 'ar' 
            ? 'هذه المنصة تجريبية وليست رسمية، وهي نموذج أولي لمبادرات قادمة من مجلس الضمان الصحي'
            : 'This platform is experimental and not official. It is a prototype for upcoming initiatives from the Council of Health Insurance'}
        </AlertDescription>
      </Alert>
      
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="absolute inset-0 chi-pattern" />
        
        <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 relative">
          <div className={`max-w-2xl ${isRTL ? 'mr-0 ml-auto text-right' : 'ml-0 mr-auto text-left'}`}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-3 leading-tight">
              {language === 'ar' ? 'ضمان للذكاء الاصطناعي' : 'Daman AI'}
            </h1>
            <p className="text-sm sm:text-base text-primary-foreground/90 leading-relaxed max-w-2xl whitespace-nowrap">
              {language === 'ar' 
                ? 'منصة ذكية للاستفسار عن خدمات التغطية الصحية الخاصة وتوقع الأثر الاقتصادي'
                : 'Smart platform to inquire about private health coverage and predict economic impact'}
            </p>
          </div>
        </div>
      </section>

      {/* Insurance Stats */}
      <section className="container mx-auto px-3 sm:px-4 -mt-4 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-4xl mx-auto">
          {insuranceStats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <Card key={idx} className="border-border shadow-md bg-card">
                <CardContent className="p-3 text-center">
                  <IconComponent className="h-5 w-5 text-primary mx-auto mb-1" />
                  <div className="text-lg sm:text-xl font-bold text-primary">
                    {language === 'ar' ? stat.valueAr : stat.valueEn}
                    <span className="text-xs font-normal text-muted-foreground mr-0.5">
                      {language === 'ar' ? stat.unitAr : stat.unitEn}
                    </span>
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-muted-foreground">
                    {language === 'ar' ? stat.labelAr : stat.labelEn}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-2 sm:px-4 py-3 sm:py-6 max-w-4xl">
        <div className="flex flex-col gap-4 sm:gap-6">
          
          {/* Chat Section */}
          <CHIRegulationsChat />

          {/* Preventive Services Eligibility Tool */}
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader className="pb-2 px-3 sm:px-4">
              <CardTitle className="text-sm sm:text-base flex items-center gap-2 w-full">
                <Shield className="h-4 w-4 text-primary" />
                {language === 'ar' ? 'فحص أهلية الخدمات الوقائية المغطاة بوثيقة مجلس الضمان الصحي' : 'Preventive Services Eligibility Check - CHI Policy'}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 sm:px-4 pb-4">
              <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4`} dir={isRTL ? 'rtl' : 'ltr'}>
                <div>
                  <Label className="text-[10px] sm:text-xs mb-1 block">
                    {language === 'ar' ? 'نوع التغطية' : 'Coverage Type'}
                  </Label>
                  <Select value={beneficiaryType} onValueChange={(v) => setBeneficiaryType(v as BeneficiaryType)} dir={isRTL ? 'rtl' : 'ltr'}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {beneficiaryTypes.map(b => (
                        <SelectItem key={b.type} value={b.type} className="text-xs">
                          {language === 'ar' ? b.nameAr : b.nameEn}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-[10px] sm:text-xs mb-1 block">
                    {language === 'ar' ? 'العمر' : 'Age'}
                  </Label>
                  <Input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="h-8 text-xs"
                    min={0}
                    max={120}
                  />
                </div>
                <div>
                  <Label className="text-[10px] sm:text-xs mb-1 block">
                    {language === 'ar' ? 'الجنس' : 'Gender'}
                  </Label>
                  <Select value={gender} onValueChange={(v) => setGender(v as 'male' | 'female')} dir={isRTL ? 'rtl' : 'ltr'}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male" className="text-xs">
                        {language === 'ar' ? 'ذكر' : 'Male'}
                      </SelectItem>
                      <SelectItem value="female" className="text-xs">
                        {language === 'ar' ? 'أنثى' : 'Female'}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col justify-end">
                  <div className={`p-2 rounded-lg bg-primary/10 border border-primary/20 text-center`}>
                    <div className="text-lg font-bold text-primary">{eligibleCount}</div>
                    <div className="text-[9px] text-muted-foreground">
                      {language === 'ar' ? 'خدمة مؤهلة' : 'Eligible Services'}
                    </div>
                  </div>
                </div>
              </div>
              
              {!selectedBeneficiaryInfo?.preventiveCovered && (
                <div className={`text-xs text-amber-600 bg-amber-50 dark:bg-amber-950/30 p-2 rounded mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {language === 'ar' 
                    ? 'هذا النوع من التغطية لا يشمل الخدمات الوقائية (حالات الطوارئ فقط)'
                    : 'This coverage type does not include preventive services (emergency only)'}
                </div>
              )}
              
              <Link to="/preventive-services">
                <Button size="sm" className={`w-full gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {language === 'ar' ? 'عرض جميع الخدمات الوقائية' : 'View All Preventive Services'}
                  <ArrowIcon className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Services by Category - Icon Grid */}
          <Card className="border-border shadow-md">
            <CardHeader className="pb-2 px-3 sm:px-4">
              <CardTitle className={`text-sm sm:text-base ${isRTL ? 'text-right' : 'text-left'}`}>
                {language === 'ar' ? 'خدمات المنصة' : 'Platform Services'}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 sm:px-4">
              <div className="space-y-6">
                {Object.entries(serviceCategories).map(([key, category]) => {
                  const CategoryIcon = category.icon;
                  return (
                    <div key={key}>
                      <div className={`flex items-center gap-2 mb-3 pb-2 border-b border-border ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                        <CategoryIcon className="h-4 w-4 text-primary" />
                        <h3 className={`text-xs sm:text-sm font-semibold text-primary ${isRTL ? 'text-right' : 'text-left'}`}>
                          {language === 'ar' ? category.labelAr : category.labelEn}
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                        {category.services.map((service) => {
                          const ServiceIcon = service.icon;
                          return (
                            <Link key={service.to} to={service.to}>
                              <div className="flex flex-col items-center p-3 sm:p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group h-full text-center">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                                  <ServiceIcon className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                                </div>
                                <span className="text-xs sm:text-sm font-semibold leading-tight mb-1 w-full text-center">
                                  {language === 'ar' ? service.titleAr : service.titleEn}
                                </span>
                                <span className="text-[10px] sm:text-xs text-muted-foreground leading-snug w-full text-center">
                                  {language === 'ar' ? service.descAr : service.descEn}
                                </span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* PWA Install Prompt */}
      <PWAInstallButton />

      {/* Footer */}
      <footer className="border-t border-border bg-card py-4 mt-4">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <div className="flex justify-center gap-4 mb-3">
            <Link 
              to="/sitemap" 
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              {language === 'ar' ? 'خريطة الموقع' : 'Site Map'}
            </Link>
          </div>
          <p className="text-[9px] sm:text-xs text-muted-foreground">
            {language === 'ar' 
              ? 'هذه الأداة للأغراض التعليمية والتحليلية فقط. للتأكد من المعلومات، يرجى التواصل مع مجلس الضمان الصحي.'
              : 'This tool is for educational and analytical purposes only. Please contact CHI for confirmation.'}
          </p>
          <p className="text-[8px] sm:text-[10px] text-muted-foreground mt-1">
            {language === 'ar' 
              ? '© 2024 ضمان للذكاء الاصطناعي • المملكة العربية السعودية'
              : '© 2024 Daman AI • Kingdom of Saudi Arabia'}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
