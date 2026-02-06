import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Package, FileText, CheckCircle2,
  Shield, Stethoscope, Activity, Check, Infinity,
  Baby, Brain, Eye, Ear, HeartPulse, Pill, Scissors, Ambulance,
  XCircle, AlertTriangle
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatCurrency } from '@/data/healthServices';
import { chiExclusions } from '@/data/chiExclusions';

const BenefitsPackage = () => {
  const { language, isRTL } = useLanguage();

  // Covered Services Data
  const coveredServicesUnlimited = [
    { nameAr: 'التنويم والعمليات الجراحية', nameEn: 'Hospitalization & Surgeries', icon: Scissors },
    { nameAr: 'الطوارئ والإسعاف', nameEn: 'Emergency & Ambulance', icon: Ambulance },
    { nameAr: 'العيادات الخارجية', nameEn: 'Outpatient Clinics', icon: Stethoscope },
    { nameAr: 'الأدوية الموصوفة', nameEn: 'Prescription Drugs', icon: Pill },
    { nameAr: 'التحاليل والأشعة', nameEn: 'Labs & Radiology', icon: Activity },
    { nameAr: 'الأمراض المزمنة', nameEn: 'Chronic Diseases', icon: HeartPulse },
  ];

  const coveredServicesWithLimits = [
    { nameAr: 'الحد الأقصى السنوي', nameEn: 'Annual Maximum', limitSAR: 1000000, icon: Shield },
    { nameAr: 'الحمل والولادة', nameEn: 'Pregnancy & Delivery', limitSAR: 15000, icon: Baby },
    { nameAr: 'رعاية الأسنان الأساسية (كشف، حشوات، تنظيف، خلع، لثة)', nameEn: 'Basic Dental (exam, fillings, cleaning, extraction, gum)', limitSAR: 1200, icon: Check },
    { nameAr: 'علاج الجذور وطوارئ الأسنان', nameEn: 'Root Canal & Dental Emergency', limitSAR: 800, copay: 20, icon: Check },
    { nameAr: 'غسيل الكلى', nameEn: 'Dialysis', limitSAR: 180000, icon: Activity },
    { nameAr: 'زراعة الكلى', nameEn: 'Kidney Transplant', limitSAR: 250000, icon: HeartPulse },
    { nameAr: 'العلاج النفسي', nameEn: 'Psychiatric Treatment', limitSAR: 50000, icon: Brain },
    { nameAr: 'سماعات الأذن الطبية', nameEn: 'Hearing Aids', limitSAR: 6000, icon: Ear },
    { nameAr: 'النظارات (أقل من 14 سنة)', nameEn: 'Spectacles (<14 years)', limitSAR: 400, icon: Eye },
    { nameAr: 'اضطراب طيف التوحد', nameEn: 'Autism Spectrum', limitSAR: 50000, icon: Brain },
    { nameAr: 'جراحة السمنة (BMI>40 أو >35 مع مضاعفات)', nameEn: 'Bariatric Surgery (BMI>40 or >35 w/complication)', limitSAR: 15000, copay: 20, icon: Scissors },
    { nameAr: 'فحص حديثي الولادة', nameEn: 'Newborn Screening', limitSAR: 100000, icon: Baby },
    { nameAr: 'ختان الذكور (حد محدود)', nameEn: 'Male Circumcision (limited)', limitSAR: 500, icon: Check },
    { nameAr: 'موانع الحمل (هرمونية واللولب)', nameEn: 'Contraception (hormonal & IUD)', limitSAR: 1500, icon: Baby },
    { nameAr: 'أمراض صمامات القلب المكتسبة', nameEn: 'Acquired Valvular Heart Disease', limitSAR: 150000, icon: HeartPulse },
    { nameAr: 'مرض الزهايمر', nameEn: "Alzheimer's Disease", limitSAR: 15000, icon: Brain },
    { nameAr: 'تغطية الإعاقة', nameEn: 'Disability Coverage', limitSAR: 100000, icon: Shield },
    { nameAr: 'نقل المتوفى للوطن', nameEn: 'Deceased Repatriation', limitSAR: 10000, icon: Shield },
  ];

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-6 sm:py-8 overflow-hidden bg-[hsl(var(--header))]">
        <div className="container mx-auto px-3 sm:px-4 relative">
          <div className={`flex items-center gap-3 mb-3 w-fit ${isRTL ? 'ml-auto' : ''}`} style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <h1 className="text-xl sm:text-2xl font-bold text-primary-foreground">
              {language === 'ar' ? 'حزمة المنافع الأساسية' : 'Basic Benefits Package'}
            </h1>
            <div className="p-2 rounded-lg bg-primary-foreground/10">
              <Package className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          
          <p className={`text-xs sm:text-sm text-primary-foreground/85 max-w-2xl ${isRTL ? 'text-right ml-auto' : 'text-left'}`}>
            {language === 'ar' 
              ? 'الخدمات الصحية المغطاة بوثيقة التغطية الصحية الخاصة الإلزامية حسب مجلس الضمان الصحي'
              : 'Health services covered under mandatory private health coverage policy per CHI regulations'}
          </p>
        </div>
      </section>

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-4xl">
        <div className="flex flex-col gap-4 sm:gap-6">

          {/* Covered Services Section */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader className="pb-2">
            <CardTitle className={`text-sm sm:text-base flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end w-full' : ''}`}>
              <span>{language === 'ar' ? 'الخدمات المغطاة' : 'Covered Services'}</span>
              <CheckCircle2 className="h-4 w-4 text-success" />
            </CardTitle>
              <CardDescription className={isRTL ? 'text-right' : 'text-left'}>
                {language === 'ar' 
                  ? 'الخدمات الصحية المشمولة بالوثيقة الأساسية حسب مجلس الضمان الصحي'
                  : 'Health services covered under the basic policy per CHI regulations'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Unlimited Services */}
              <div>
                <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                  <h3 className="text-xs font-semibold text-foreground">
                    {language === 'ar' ? 'خدمات بدون حد أقصى (ضمن الحد السنوي)' : 'Unlimited Services (within annual max)'}
                  </h3>
                  <Infinity className="h-4 w-4 text-primary" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {coveredServicesUnlimited.map((service, index) => (
                    <div
                      key={index}
                      dir={isRTL ? 'rtl' : 'ltr'}
                      className={`flex items-center gap-2 p-2 rounded-lg bg-success/10 border border-success/20 ${isRTL ? 'justify-end text-right' : 'justify-start text-left'}`}
                    >
                      <div className="flex items-center gap-2 w-full">
                        {isRTL ? (
                          <>
                            <service.icon className="h-3 w-3 text-success shrink-0" />
                            <span className="text-[10px] sm:text-xs text-foreground flex-1 text-right">
                              {service.nameAr}
                            </span>
                          </>
                        ) : (
                          <>
                            <service.icon className="h-3 w-3 text-success shrink-0" />
                            <span className="text-[10px] sm:text-xs text-foreground flex-1 text-left">
                              {service.nameEn}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}


                </div>
              </div>

              {/* Services with Limits */}
              <div>
                <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                  <h3 className="text-xs font-semibold text-foreground">
                    {language === 'ar' ? 'خدمات لها حد أقصى سنوي' : 'Services with Annual Limits'}
                  </h3>
                  <Shield className="h-4 w-4 text-info" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {coveredServicesWithLimits.map((service, index) => (
                    <div
                      key={index}
                      dir={isRTL ? 'rtl' : 'ltr'}
                      className="flex items-center justify-between gap-2 p-2 rounded-lg bg-background border border-border"
                    >
                      {/* Name + icon (right side in Arabic) */}
                      <div className={`flex items-center gap-2 flex-1 ${isRTL ? 'justify-end text-right' : 'justify-start text-left'}`}>
                        <div className="flex items-center gap-2 w-full">
                          {isRTL ? (
                            <>
                              <service.icon className="h-3 w-3 text-info shrink-0" />
                              <span className="text-[10px] sm:text-xs text-foreground flex-1 text-right">
                                {service.nameAr}
                              </span>
                            </>
                          ) : (
                            <>
                              <service.icon className="h-3 w-3 text-info shrink-0" />
                              <span className="text-[10px] sm:text-xs text-foreground flex-1 text-left">
                                {service.nameEn}
                              </span>
                            </>
                          )}
                        </div>
                      </div>



                      {/* Amount (left side in Arabic) */}
                      <div className={`flex items-center gap-1 shrink-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        {service.copay && (
                          <Badge variant="outline" className="text-[9px]">
                            {service.copay}% {language === 'ar' ? 'تحمل' : 'copay'}
                          </Badge>
                        )}
                        <Badge variant="secondary" className="text-[9px] font-mono">
                          {formatCurrency(service.limitSAR)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Exclusions Section */}
          <Card className="border-destructive/20 bg-gradient-to-br from-destructive/5 to-transparent">
            <CardHeader className="pb-2">
              <CardTitle className={`text-sm sm:text-base flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end w-full' : ''}`}>
                <span>{language === 'ar' ? 'الاستثناءات (غير مغطاة)' : 'Exclusions (Not Covered)'}</span>
                <XCircle className="h-4 w-4 text-destructive" />
              </CardTitle>
              <CardDescription className={isRTL ? 'text-right' : 'text-left'}>
                {language === 'ar' 
                  ? 'الخدمات والإجراءات المستثناة من التغطية الأساسية حسب الوثيقة الموحدة'
                  : 'Services and procedures excluded from basic coverage per unified policy'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {chiExclusions.map((exclusion, index) => (
                  <div key={index} className={`flex items-center gap-2 p-2 rounded-lg bg-destructive/5 border border-destructive/20 ${isRTL ? 'justify-end text-right' : 'justify-start text-left'}`}>
                    <div className="flex items-center gap-2 w-full">
                      {isRTL ? (
                        <>
                          <AlertTriangle className="h-3 w-3 text-destructive shrink-0" />
                          <span className="text-[10px] sm:text-xs text-foreground flex-1 text-right">
                            {exclusion.nameAr}
                          </span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="h-3 w-3 text-destructive shrink-0" />
                          <span className="text-[10px] sm:text-xs text-foreground flex-1 text-left">
                            {exclusion.name}
                          </span>
                        </>
                      )}
                    </div>
                  </div>


                ))}
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="border-info/30 bg-info/5">
            <CardContent className="py-4">
              <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <h4 className={`font-semibold text-sm mb-1 flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                    <span>{language === 'ar' ? 'عن حزمة المنافع الأساسية' : 'About Basic Benefits Package'}</span>
                    <FileText className="h-4 w-4 text-info shrink-0" />
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {language === 'ar' 
                      ? 'حزمة المنافع الأساسية هي الحد الأدنى من الخدمات الصحية التي يجب أن تغطيها وثيقة التغطية الصحية الخاصة الإلزامية في المملكة العربية السعودية. تحدد هذه الحزمة من قبل مجلس الضمان الصحي وتشمل الخدمات الوقائية والعلاجية والتشخيصية.'
                      : 'The Basic Benefits Package is the minimum health services that must be covered by the mandatory private health coverage policy in Saudi Arabia. This package is defined by CHI and includes preventive, therapeutic, and diagnostic services.'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-4 mt-4">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <p className="text-[9px] sm:text-xs text-muted-foreground">
            {language === 'ar' 
              ? 'هذه الأداة للأغراض التعليمية والتحليلية فقط. للتأكد من المعلومات، يرجى التواصل مع مجلس الضمان الصحي.'
              : 'This tool is for educational and analytical purposes only. Please contact CHI for confirmation.'}
          </p>
          <p className="text-[8px] sm:text-[10px] text-muted-foreground mt-1">
            {language === 'ar' 
              ? '© 2024 أداة تحليل حزمة منافع التغطية الصحية الخاصة • المملكة العربية السعودية'
              : '© 2024 Private Health Coverage Benefits Analysis Tool • Kingdom of Saudi Arabia'}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BenefitsPackage;
