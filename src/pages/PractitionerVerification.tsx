import { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  UserCheck, ExternalLink, Search, IdCard, FileText, 
  Stethoscope, Award, Calendar, AlertCircle, Info, Shield
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const PractitionerVerification = () => {
  const { language, isRTL } = useLanguage();
  const [searchType, setSearchType] = useState('national_id');
  const [searchValue, setSearchValue] = useState('');
  const [nationality, setNationality] = useState('');

  const searchTypes = [
    { value: 'national_id', labelAr: 'رقم الهوية الوطنية', labelEn: 'National ID' },
    { value: 'iqama', labelAr: 'رقم الإقامة', labelEn: 'Iqama Number' },
    { value: 'scfhs_file', labelAr: 'رقم ملف الهيئة', labelEn: 'SCFHS File Number' },
    { value: 'passport', labelAr: 'رقم جواز السفر', labelEn: 'Passport Number' },
  ];

  const handleVerify = () => {
    window.open('https://scfhs.org.sa/ar/E-Services/regvaliddescription', '_blank');
  };

  const verificationResults = [
    { labelAr: 'اسم الممارس', labelEn: 'Practitioner Name', icon: UserCheck },
    { labelAr: 'التخصص الرئيسي', labelEn: 'Primary Specialty', icon: Stethoscope },
    { labelAr: 'الرتبة المهنية', labelEn: 'Professional Rank', icon: Award },
    { labelAr: 'حالة التسجيل', labelEn: 'Registration Status', icon: Shield },
    { labelAr: 'تاريخ انتهاء التسجيل', labelEn: 'Registration Expiry', icon: Calendar },
    { labelAr: 'رقم ملف الهيئة', labelEn: 'SCFHS File Number', icon: FileText },
  ];

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-6 sm:py-8 overflow-hidden gradient-hero">
        <div className="absolute inset-0 chi-pattern" />
        <div className="container mx-auto px-3 sm:px-4 relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-primary-foreground/10">
              <UserCheck className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-primary-foreground">
              {language === 'ar' ? 'التحقق من تسجيل الممارس الصحي' : 'Healthcare Practitioner Verification'}
            </h1>
          </div>
          
          <p className={`text-xs sm:text-sm text-primary-foreground/85 max-w-2xl ${isRTL ? 'text-right ml-auto' : 'text-left'}`}>
            {language === 'ar' 
              ? 'التحقق من صلاحية التسجيل المهني للممارس الصحي في الهيئة السعودية للتخصصات الصحية (SCFHS)'
              : 'Verify healthcare practitioner professional registration validity with Saudi Commission for Health Specialties (SCFHS)'}
          </p>
        </div>
      </section>

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-4xl">
        {/* Info Alert */}
        <Alert className={`mb-4 border-info/30 bg-info/10 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Info className={`h-4 w-4 text-info shrink-0 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <AlertDescription className={`text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
            {language === 'ar' 
              ? 'هذه الخدمة تتيح لك التحقق من صلاحية تسجيل الممارس الصحي عبر الموقع الرسمي لهيئة التخصصات الصحية'
              : 'This service allows you to verify healthcare practitioner registration through the official SCFHS website'}
          </AlertDescription>
        </Alert>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Search Form */}
          <Card className="border-primary/20">
            <CardHeader className={`pb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
              <CardTitle className="text-base flex items-center gap-2">
                <Search className="h-4 w-4 text-primary" />
                {language === 'ar' ? 'بيانات البحث' : 'Search Details'}
              </CardTitle>
              <CardDescription>
                {language === 'ar' 
                  ? 'أدخل بيانات الممارس الصحي للتحقق من حالة التسجيل'
                  : 'Enter practitioner details to verify registration status'}
              </CardDescription>
            </CardHeader>
            <CardContent className={`space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className="space-y-2">
                <Label className="text-sm block">
                  {language === 'ar' ? 'نوع البحث' : 'Search Type'}
                </Label>
                <Select value={searchType} onValueChange={setSearchType}>
                  <SelectTrigger className={isRTL ? 'text-right' : ''}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {searchTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value} className={isRTL ? 'text-right' : ''}>
                        {language === 'ar' ? type.labelAr : type.labelEn}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {searchType === 'passport' && (
                <div className="space-y-2">
                  <Label className="text-sm block">
                    {language === 'ar' ? 'الجنسية' : 'Nationality'}
                  </Label>
                  <Input
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    placeholder={language === 'ar' ? 'أدخل الجنسية' : 'Enter nationality'}
                    className={isRTL ? 'text-right' : ''}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label className="text-sm block">
                  {language === 'ar' 
                    ? searchTypes.find(t => t.value === searchType)?.labelAr 
                    : searchTypes.find(t => t.value === searchType)?.labelEn}
                </Label>
                <Input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={language === 'ar' ? 'أدخل الرقم' : 'Enter number'}
                  className={isRTL ? 'text-right' : ''}
                />
              </div>

              <Button 
                onClick={handleVerify}
                className="w-full gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                {language === 'ar' ? 'التحقق عبر موقع الهيئة' : 'Verify via SCFHS Website'}
              </Button>

              <p className="text-xs text-muted-foreground">
                {language === 'ar' 
                  ? 'سيتم توجيهك للموقع الرسمي لهيئة التخصصات الصحية لإكمال عملية التحقق'
                  : 'You will be redirected to the official SCFHS website to complete verification'}
              </p>
            </CardContent>
          </Card>

          {/* Information Results */}
          <Card>
            <CardHeader className={`pb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                {language === 'ar' ? 'البيانات المتاحة' : 'Available Information'}
              </CardTitle>
              <CardDescription>
                {language === 'ar' 
                  ? 'البيانات التي يمكنك الحصول عليها من خدمة التحقق'
                  : 'Information you can obtain from the verification service'}
              </CardDescription>
            </CardHeader>
            <CardContent className={isRTL ? 'text-right' : 'text-left'}>
              <div className="space-y-2">
                {verificationResults.map((item, idx) => {
                  const IconComponent = item.icon;
                  return (
                    <div 
                      key={idx}
                      className="flex items-center gap-2 p-2 rounded-lg bg-muted/50"
                    >
                      <IconComponent className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm">
                        {language === 'ar' ? item.labelAr : item.labelEn}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <Card className="mt-4">
          <CardHeader className={`pb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-warning" />
              {language === 'ar' ? 'معلومات مهمة' : 'Important Information'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className={`p-3 rounded-lg border bg-card ${isRTL ? 'text-right' : 'text-left'}`}>
                <h4 className="font-semibold text-sm mb-2">
                  {language === 'ar' ? 'ما هي هيئة التخصصات الصحية؟' : 'What is SCFHS?'}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {language === 'ar' 
                    ? 'الهيئة السعودية للتخصصات الصحية هي الجهة المسؤولة عن تصنيف وتسجيل الممارسين الصحيين في المملكة العربية السعودية'
                    : 'Saudi Commission for Health Specialties is the authority responsible for classifying and registering healthcare practitioners in Saudi Arabia'}
                </p>
              </div>

              <div className={`p-3 rounded-lg border bg-card ${isRTL ? 'text-right' : 'text-left'}`}>
                <h4 className="font-semibold text-sm mb-2">
                  {language === 'ar' ? 'لماذا التحقق مهم؟' : 'Why is Verification Important?'}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {language === 'ar' 
                    ? 'التحقق من تسجيل الممارس الصحي يضمن أن الشخص مؤهل ومرخص لتقديم الخدمات الصحية'
                    : 'Verifying practitioner registration ensures the person is qualified and licensed to provide healthcare services'}
                </p>
              </div>

              <div className={`p-3 rounded-lg border bg-card ${isRTL ? 'text-right' : 'text-left'}`}>
                <h4 className="font-semibold text-sm mb-2">
                  {language === 'ar' ? 'التخصصات المشمولة' : 'Covered Specialties'}
                </h4>
                <div className={`flex flex-wrap gap-1 mt-1 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                  {(language === 'ar' 
                    ? ['طب', 'تمريض', 'صيدلة', 'أسنان', 'علوم طبية', 'تأهيل']
                    : ['Medicine', 'Nursing', 'Pharmacy', 'Dentistry', 'Medical Sciences', 'Rehab']
                  ).map((spec, i) => (
                    <Badge key={i} variant="secondary" className="text-[10px]">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className={`p-3 rounded-lg border bg-card ${isRTL ? 'text-right' : 'text-left'}`}>
                <h4 className="font-semibold text-sm mb-2">
                  {language === 'ar' ? 'حالات التسجيل' : 'Registration Statuses'}
                </h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    <span className="text-xs">{language === 'ar' ? 'ساري' : 'Active'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-warning" />
                    <span className="text-xs">{language === 'ar' ? 'منتهي' : 'Expired'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-destructive" />
                    <span className="text-xs">{language === 'ar' ? 'موقوف' : 'Suspended'}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Direct Link */}
        <div className="mt-4 text-center">
          <a 
            href="https://scfhs.org.sa/ar/E-Services/regvaliddescription" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline text-sm"
          >
            <ExternalLink className="h-4 w-4" />
            {language === 'ar' ? 'الذهاب مباشرة لموقع الهيئة' : 'Go directly to SCFHS website'}
          </a>
        </div>
      </main>
    </div>
  );
};

export default PractitionerVerification;
