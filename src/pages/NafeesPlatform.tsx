import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IPhoneMockup } from '@/components/IPhoneMockup';
import ibnAlNafisImage from '@/assets/ibn-al-nafis-nafees.png';
import anaaSplash from '@/assets/anaa-splash.png';
import anaaNafees from '@/assets/anaa-nafees.png';
import sehhatySplash from '@/assets/sehhaty-splash.png';
import sehhatyFile from '@/assets/sehhaty-file.png';
import sehhatyShare from '@/assets/sehhaty-share.png';
import sehhatyBluetooth from '@/assets/sehhaty-bluetooth.png';
import { 
  Network, 
  FileCheck, 
  CreditCard, 
  Bell, 
  FileText, 
  Users, 
  Shield, 
  Brain,
  ArrowRight,
  ArrowLeft,
  Building2,
  Stethoscope,
  Pill,
  ClipboardList,
  Activity,
  Syringe,
  FileImage,
  FlaskConical,
  Heart,
  Smartphone,
  QrCode,
  Share2,
  CheckCircle2,
  Bluetooth,
  LogIn,
  Palette
} from 'lucide-react';
import nafeesLogo from '@/assets/nafees-logo.png';

const NafeesPlatform = () => {
  const { language, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const financialUseCases = [
    {
      number: 1,
      titleAr: 'أهلية العلاج',
      titleEn: 'Treatment Eligibility',
      descAr: 'التأكد لحظيًا من تغطية المريض التأمينية ومنافع وثيقته والحدود المستهلكة',
      descEn: 'Real-time verification of patient insurance coverage, policy benefits, and consumed limits',
      icon: Shield
    },
    {
      number: 2,
      titleAr: 'الموافقة المسبقة',
      titleEn: 'Prior Authorization',
      descAr: 'رفع الطلبات الطبية (عمليات، أدوية، أشعة) والحصول على موافقة إلكترونية من شركة التأمين',
      descEn: 'Submit medical requests (surgeries, medications, imaging) and receive electronic approval from insurance',
      icon: FileCheck
    },
    {
      number: 3,
      titleAr: 'المطالبة المالية',
      titleEn: 'Financial Claim',
      descAr: 'إرسال الفواتير الطبية إلكترونيًا لضمان سرعة ودقة استرداد المستحقات',
      descEn: 'Send medical invoices electronically for fast and accurate reimbursement',
      icon: CreditCard
    },
    {
      number: 4,
      titleAr: 'التنبيه بالدفع',
      titleEn: 'Payment Notification',
      descAr: 'إشعار مقدم الخدمة بإتمام الدفع من الممول وتوثيق العملية',
      descEn: 'Notify service provider of payment completion and document the transaction',
      icon: Bell
    }
  ];

  const healthUseCases = [
    { titleAr: 'الهوية الطبية الموحدة', titleEn: 'Unified Medical Identity', icon: Users },
    { titleAr: 'بيانات التنويم والخروج', titleEn: 'Admission & Discharge Data', icon: Building2 },
    { titleAr: 'الإحالة الطبية', titleEn: 'Medical Referrals', icon: FileText },
    { titleAr: 'التدوين الطبي للعيادات', titleEn: 'Outpatient Clinical Notes', icon: Stethoscope },
    { titleAr: 'التدوين الطبي للتنويم', titleEn: 'Inpatient Clinical Notes', icon: ClipboardList },
    { titleAr: 'بيانات صحة المرأة', titleEn: 'Women\'s Health Data', icon: Activity },
    { titleAr: 'بيانات حديثي الولادة', titleEn: 'Newborn Data', icon: Users },
    { titleAr: 'الوصفة الطبية', titleEn: 'Prescriptions', icon: Pill },
    { titleAr: 'صرف الدواء', titleEn: 'Medication Dispensing', icon: Pill },
    { titleAr: 'طلب التصوير الطبي', titleEn: 'Imaging Requests', icon: FileImage },
    { titleAr: 'نتائج التصوير', titleEn: 'Imaging Results', icon: FileImage },
    { titleAr: 'طلب التحليل المخبري', titleEn: 'Lab Test Requests', icon: FlaskConical },
    { titleAr: 'نتائج التحاليل', titleEn: 'Lab Results', icon: FlaskConical },
    { titleAr: 'بيانات التطعيمات', titleEn: 'Vaccination Data', icon: Syringe },
    { titleAr: 'العلامات الحيوية', titleEn: 'Vital Signs', icon: Activity }
  ];

  const benefits = [
    {
      titleAr: 'تسريع رحلة المريض',
      titleEn: 'Faster Patient Journey',
      descAr: 'تقليل التعقيدات الإدارية وتسريع الإجراءات',
      descEn: 'Reduced administrative complexity and faster procedures'
    },
    {
      titleAr: 'دقة تبادل البيانات',
      titleEn: 'Data Exchange Accuracy',
      descAr: 'تقليل الأخطاء الطبية والمالية',
      descEn: 'Reduced medical and financial errors'
    },
    {
      titleAr: 'الشفافية',
      titleEn: 'Transparency',
      descAr: 'شفافية كاملة بين شركات التأمين ومقدمي الخدمة',
      descEn: 'Full transparency between insurers and providers'
    },
    {
      titleAr: 'التحليلات المتقدمة',
      titleEn: 'Advanced Analytics',
      descAr: 'تمهيد لاستخدام الذكاء الاصطناعي في التخطيط الصحي',
      descEn: 'Enabling AI and advanced analytics in health planning'
    }
  ];

  return (
    <div className={`min-h-screen min-h-[100dvh] bg-gradient-to-b from-background to-muted/30 ${isRTL ? 'rtl font-arabic' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      {/* Hero Section - Standardized */}
      <section className="relative py-6 sm:py-8 overflow-hidden gradient-hero">
        <div className="absolute inset-0 chi-pattern" />
        <div className="container mx-auto px-3 sm:px-4 relative">
          <div className={`flex items-center gap-3 mb-3 w-fit ${isRTL ? 'ml-auto' : ''}`}>
            <div className="p-2 rounded-lg bg-primary-foreground/10">
              <Network className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-primary-foreground">
              {language === 'ar' ? 'نفيس' : 'Nafees'}
            </h1>
          </div>
          
          <p className={`text-xs sm:text-sm text-primary-foreground/85 max-w-2xl ${isRTL ? 'text-right ml-auto' : 'text-left'}`}>
            {language === 'ar' 
              ? 'البنية التحتية الوطنية لتبادل المعلومات الصحية في المملكة العربية السعودية'
              : 'The National Health Information Exchange Infrastructure in Saudi Arabia'}
          </p>
        </div>
      </section>

      <main className={`container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-7xl ${isRTL ? 'text-right' : 'text-left'}`}>
        {/* Nafees Structure Diagram */}
        <Card className="mb-8 border-primary/20 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              {/* Nafees Logo */}
              <img 
                src={nafeesLogo} 
                alt="Nafees نفيس" 
                className="h-16 sm:h-20 w-auto object-contain mb-6"
              />
              {/* Two Parts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {/* Financial Services */}
                <Card className="border-2 border-info/30 bg-info/5">
                  <CardContent className="p-6 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-info/20 flex items-center justify-center mb-4">
                      <CreditCard className="h-8 w-8 text-info" />
                    </div>
                    <h4 className="text-lg font-bold text-info mb-2 text-center">
                      {language === 'ar' ? 'الخدمات المالية' : 'Financial Services'}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4 text-center">
                      {language === 'ar' 
                        ? 'التعاملات المالية بين شركات التأمين ومقدمي الخدمات'
                        : 'Financial transactions between insurers and providers'}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <Badge variant="outline" className="text-xs bg-info/10 border-info/30">
                        {language === 'ar' ? 'أهلية العلاج' : 'Eligibility'}
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-info/10 border-info/30">
                        {language === 'ar' ? 'الموافقة المسبقة' : 'Prior Auth'}
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-info/10 border-info/30">
                        {language === 'ar' ? 'المطالبات' : 'Claims'}
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-info/10 border-info/30">
                        {language === 'ar' ? 'الدفع' : 'Payment'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Health Services */}
                <Card className="border-2 border-success/30 bg-success/5">
                  <CardContent className="p-6 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mb-4">
                      <Heart className="h-8 w-8 text-success" />
                    </div>
                    <h4 className="text-lg font-bold text-success mb-2 text-center">
                      {language === 'ar' ? 'الخدمات الصحية' : 'Health Services'}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4 text-center">
                      {language === 'ar' 
                        ? 'الملف الطبي الموحد وتبادل البيانات الصحية'
                        : 'Unified medical record and health data exchange'}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <Badge variant="outline" className="text-xs bg-success/10 border-success/30">
                        {language === 'ar' ? 'السجل الطبي' : 'Medical Record'}
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-success/10 border-success/30">
                        {language === 'ar' ? 'الوصفات' : 'Prescriptions'}
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-success/10 border-success/30">
                        {language === 'ar' ? 'التحاليل' : 'Lab Results'}
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-success/10 border-success/30">
                        {language === 'ar' ? 'الإحالات' : 'Referrals'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What is Nafees */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl w-full">
              <Network className="h-8 w-8 text-primary" />
              {language === 'ar' ? 'ما هي منصة نفيس؟' : 'What is Nafees Platform?'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p className="text-lg leading-relaxed">
              {language === 'ar' 
                ? 'نفيس هي حجر الأساس للتحول الرقمي في القطاع الصحي السعودي. نفيس ليست تطبيقًا ولا موقعًا يدخله المريض مباشرة، بل هي منصة خلفية تربط بين أنظمة المستشفيات والعيادات والصيدليات وشركات التأمين، بحيث يتم تبادل البيانات بشكل آمن وفوري وفق معايير موحدة.'
                : "Nafees is the cornerstone of digital transformation in Saudi healthcare. It's not an app or website patients access directly, but a backend platform connecting hospital systems, clinics, pharmacies, and insurance companies for secure, real-time data exchange according to unified standards."}
            </p>
          </CardContent>
        </Card>

        {/* Ibn al-Nafis - Origin of Name */}
        <Card className="mb-8 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl w-full">
              <Heart className="h-8 w-8 text-destructive" />
              {language === 'ar' ? 'سبب التسمية - ابن النفيس' : 'Origin of the Name - Ibn al-Nafis'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="order-2 md:order-1">
                <img 
                  src={ibnAlNafisImage} 
                  alt={language === 'ar' ? 'ابن النفيس - العالم العربي' : 'Ibn al-Nafis - Arab Scholar'}
                  className="rounded-lg shadow-lg w-full max-w-md mx-auto"
                />
              </div>
              <div className="order-1 md:order-2 space-y-4">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {language === 'ar' 
                    ? 'سُميت نفيس تيمنًا بالعالم العربي المسلم ابن النفيس (1213-1288م)، الطبيب والعالم الموسوعي الذي كان أول من اكتشف الدورة الدموية الصغرى (الدورة الرئوية) قبل قرون من اعتراف أوروبا بها.'
                    : 'Nafees is named after the Arab Muslim scholar Ibn al-Nafis (1213-1288), a pioneering physician and polymath who first described the pulmonary circulation of blood, centuries before it was recognized in Europe.'}
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {language === 'ar' 
                    ? 'يرمز هذا الاسم إلى الريادة العربية في العلوم الطبية، وتدفق المعلومات الصحية بين مقدمي الخدمة كما يتدفق الدم في الجسم.'
                    : 'This name symbolizes Arab pioneering in medical sciences, and the flow of health information between providers, just as blood flows through the body.'}
                </p>
                
                {/* Logo Colors */}
                <div className="mt-6 p-4 rounded-lg bg-muted/50 border">
                  <div className="flex items-center gap-2 mb-3">
                    <Palette className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold text-foreground">
                      {language === 'ar' ? 'ألوان شعار نفيس' : 'Nafees Logo Colors'}
                    </h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' 
                      ? 'يعكس شعار نفيس ألوان الدورة الدموية: الأزرق للدم غير المؤكسج، والبنفسجي للدم المؤكسج، مما يرمز لتدفق البيانات الصحية وتبادلها بين مقدمي الخدمة.'
                      : 'The Nafees logo reflects the colors of blood circulation: blue for deoxygenated blood and purple for oxygenated blood, symbolizing the flow and exchange of health data between providers.'}
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-600"></div>
                      <span className="text-xs text-muted-foreground">{language === 'ar' ? 'أزرق' : 'Blue'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-purple-600"></div>
                      <span className="text-xs text-muted-foreground">{language === 'ar' ? 'بنفسجي' : 'Purple'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Use Cases */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3 w-full">
            <CreditCard className="h-7 w-7 text-primary" />
            {language === 'ar' ? 'نفيس التعاملات المالية' : 'Nafees Financial Transactions'}
          </h2>
          <p className={`text-muted-foreground mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
            {language === 'ar'
              ? '4 حالات استخدام مالية تتوافق مع رحلة المريض بالقطاع الصحي الخاص'
              : '4 financial use cases aligned with the patient journey in private healthcare'}
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {financialUseCases.map((useCase) => (
              <Card key={useCase.number} className="hover:shadow-lg transition-shadow border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <useCase.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {useCase.number}
                        </Badge>
                        <h3 className="font-semibold text-foreground">
                          {language === 'ar' ? useCase.titleAr : useCase.titleEn}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {language === 'ar' ? useCase.descAr : useCase.descEn}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Health Use Cases */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3 w-full">
            <FileText className="h-7 w-7 text-primary" />
            {language === 'ar' ? 'نفيس الملف الطبي الموحد' : 'Nafees Unified Medical Record'}
          </h2>
          <p className={`text-muted-foreground mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
            {language === 'ar'
              ? '15 حالة استخدام لتبادل المعلومات الصحية بين مقدمي الخدمة'
              : '15 use cases for health information exchange between providers'}
          </p>
          
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {healthUseCases.map((useCase, index) => (
                  <div 
                    key={index} 
                    className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors flex flex-col items-center"
                  >
                    <useCase.icon className="h-6 w-6 text-primary mb-2" />
                    <p className="text-xs font-medium text-foreground text-center">
                      {language === 'ar' ? useCase.titleAr : useCase.titleEn}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className={`text-sm text-muted-foreground ${isRTL ? 'text-right' : 'text-left'}`}>
                  {language === 'ar'
                    ? 'يمكن للممارس الصحي الاطلاع على هذه البيانات من خلال نظام المستشفى أو تطبيق أناة، بينما يستطيع المريض متابعتها عبر تطبيق صحتي.'
                    : 'Healthcare practitioners can access this data through hospital systems or the Anaa app, while patients can track it through the Sehhaty app.'}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Access Methods for Unified Medical Record */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3 w-full">
            <LogIn className="h-7 w-7 text-primary" />
            {language === 'ar' ? 'آلية الدخول للملف الطبي الموحد' : 'Accessing the Unified Medical Record'}
          </h2>
          <p className={`text-muted-foreground mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
            {language === 'ar'
              ? 'تمكّن خدمة مشاركة الملف الصحي الموحد عبر تطبيق أناة الممارسين الصحيين المرخصين من الاطلاع على معلومات المستفيد الصحية بخطوات بسيطة'
              : 'The unified health record sharing service through the Anaa app enables licensed healthcare practitioners to access beneficiary health information in simple steps'}
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* For Healthcare Practitioners */}
            <Card className="border-2 border-info/30 bg-info/5">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg w-full">
                  <div className="w-10 h-10 rounded-full bg-info/20 flex items-center justify-center">
                    <Stethoscope className="h-5 w-5 text-info" />
                  </div>
                  {language === 'ar' ? 'الممارس الصحي - عبر تطبيق أناة' : 'Healthcare Practitioner - Via Anaa App'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge className="bg-info text-info-foreground">1</Badge>
                  <span className="text-sm">{language === 'ar' ? 'فتح تطبيق أناة' : 'Open Anaa app'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-info text-info-foreground">2</Badge>
                  <span className="text-sm">{language === 'ar' ? 'اختيار أيقونة نفيس' : 'Select Nafees icon'}</span>
                </div>
                
                <div className="p-4 rounded-lg bg-muted/50 border">
                  <p className="text-sm font-medium mb-3">
                    {language === 'ar' ? 'يمكن للممارس الصحي استلام الملف الصحي بإحدى الطريقتين:' : 'The practitioner can receive the health record in two ways:'}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Bluetooth className="h-4 w-4 text-info" />
                      <span className="text-sm">{language === 'ar' ? 'استخدام خاصية السحب للاتصال عبر البلوتوث' : 'Use pull feature to connect via Bluetooth'}</span>
                    </div>
                    <div className="text-center text-xs text-muted-foreground">{language === 'ar' ? 'أو' : 'or'}</div>
                    <div className="flex items-center gap-2">
                      <QrCode className="h-4 w-4 text-info" />
                      <span className="text-sm">{language === 'ar' ? 'مسح رمز الوصول السريع (QR Code)' : 'Scan QR Code'}</span>
                    </div>
                  </div>
                </div>
                
                {/* Anaa App Screenshots */}
                <div className="mt-6 pt-4 border-t">
                  <p className="text-sm font-medium mb-4 text-center">{language === 'ar' ? 'صور من تطبيق أناة' : 'Screenshots from Anaa App'}</p>
                  <div className="flex justify-start sm:justify-center gap-3 sm:gap-4 overflow-x-auto pb-4 px-2 snap-x snap-mandatory" style={{ WebkitOverflowScrolling: 'touch' }}>
                    <IPhoneMockup src={anaaSplash} alt="Anaa Splash Screen" className="snap-center" />
                    <IPhoneMockup src={anaaNafees} alt="Anaa Nafees Screen" className="snap-center" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-success/30 bg-success/5">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg w-full">
                  <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                    <Users className="h-5 w-5 text-success" />
                  </div>
                  {language === 'ar' ? 'المستفيد - عبر تطبيق صحتي' : 'Beneficiary - Via Sehhaty App'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                  {language === 'ar' 
                    ? 'يمكن للمستفيد مشاركة ملفه الصحي الموحد باتباع الخطوات التالية:'
                    : 'The beneficiary can share their unified health record by following these steps:'}
                </p>
                
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{language === 'ar' ? 'الدخول إلى تطبيق صحتي' : 'Login to Sehhaty app'}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{language === 'ar' ? 'اختيار "ملفي"' : 'Select "My File"'}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{language === 'ar' ? 'الضغط على زر "مشاركة" في أعلى الصفحة' : 'Click "Share" button at top of page'}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{language === 'ar' ? 'الموافقة على مشاركة الملف الصحي' : 'Approve health file sharing'}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {language === 'ar' 
                        ? 'مع الممارس عبر البلوتوث أو مشاركة رمز الوصول السريع (QR Code)'
                        : 'With practitioner via Bluetooth or share QR Code'}
                    </p>
                  </div>
                </div>
                
                {/* Sehhaty App Screenshots */}
                <div className="mt-6 pt-4 border-t">
                  <p className="text-sm font-medium mb-4 text-center">{language === 'ar' ? 'صور من تطبيق صحتي' : 'Screenshots from Sehhaty App'}</p>
                  <div className="flex justify-start sm:justify-center gap-3 sm:gap-4 overflow-x-auto pb-4 px-2 snap-x snap-mandatory" style={{ WebkitOverflowScrolling: 'touch' }}>
                    <IPhoneMockup src={sehhatySplash} alt="Sehhaty Splash Screen" className="snap-center" />
                    <IPhoneMockup src={sehhatyFile} alt="Sehhaty Health File" className="snap-center" />
                    <IPhoneMockup src={sehhatyShare} alt="Sehhaty Share Screen" className="snap-center" />
                    <IPhoneMockup src={sehhatyBluetooth} alt="Sehhaty Bluetooth" className="snap-center" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Unified Medical Record Contents */}
          <Card className="mt-6 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 w-full">
                <FileText className="h-5 w-5 text-primary" />
                {language === 'ar' ? 'محتويات الملف الطبي الموحد' : 'Unified Medical Record Contents'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-muted/50 flex flex-col items-center text-center">
                  <Users className="h-6 w-6 text-primary mb-2" />
                  <p className="text-sm font-medium text-center">{language === 'ar' ? 'ملخص المريض' : 'Patient Summary'}</p>
                  <p className="text-xs text-muted-foreground text-center">{language === 'ar' ? 'البيانات الأساسية' : 'Basic Information'}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50 flex flex-col items-center text-center">
                  <Activity className="h-6 w-6 text-primary mb-2" />
                  <p className="text-sm font-medium text-center">{language === 'ar' ? 'التاريخ المرضي' : 'Medical History'}</p>
                  <p className="text-xs text-muted-foreground text-center">{language === 'ar' ? 'الأمراض المزمنة والسابقة' : 'Chronic & Past Conditions'}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50 flex flex-col items-center text-center">
                  <Shield className="h-6 w-6 text-destructive mb-2" />
                  <p className="text-sm font-medium text-center">{language === 'ar' ? 'الحساسية' : 'Allergies'}</p>
                  <p className="text-xs text-muted-foreground text-center">{language === 'ar' ? 'الحساسية الدوائية والغذائية' : 'Drug & Food Allergies'}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50 flex flex-col items-center text-center">
                  <Pill className="h-6 w-6 text-primary mb-2" />
                  <p className="text-sm font-medium text-center">{language === 'ar' ? 'الأدوية' : 'Medications'}</p>
                  <p className="text-xs text-muted-foreground text-center">{language === 'ar' ? 'الأدوية الحالية' : 'Current Medications'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Benefits */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3 w-full">
            <Brain className="h-7 w-7 text-primary" />
            {language === 'ar' ? 'لماذا نفيس مهم؟' : 'Why is Nafees Important?'}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-border/50">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Arrow className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 text-center">
                    {language === 'ar' ? benefit.titleAr : benefit.titleEn}
                  </h3>
                  <p className="text-sm text-muted-foreground text-center">
                    {language === 'ar' ? benefit.descAr : benefit.descEn}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Conclusion */}
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <Network className="h-12 w-12 text-primary mx-auto mb-4" />
            <p className="text-lg text-foreground max-w-3xl mx-auto">
              {language === 'ar'
                ? 'نفيس ليست مجرد منصة تقنية، بل هي خطوة استراتيجية لتأسيس منظومة صحية مترابطة وذكية، تُسهّل حياة المرضى وتدعم متخذي القرار والممارسين الصحيين، وتمهد لمرحلة أوسع من التحول الرقمي والذكاء الاصطناعي في قطاع الصحة السعودي.'
                : 'Nafees is not just a technical platform, but a strategic step towards establishing an interconnected and intelligent health system that facilitates patient lives, supports decision-makers and healthcare practitioners, and paves the way for broader digital transformation and AI in the Saudi health sector.'}
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default NafeesPlatform;
