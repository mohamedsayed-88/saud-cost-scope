import { useState } from 'react';
import { Header } from '@/components/Header';
import { ParameterInputs } from '@/components/ParameterInputs';
import { ExclusionsList } from '@/components/ExclusionsList';
import { SubLimitCalculator } from '@/components/SubLimitCalculator';
import { PDFExportButton } from '@/components/PDFExportButton';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { 
  Sliders, Calculator, 
  Lightbulb, AlertCircle,
  ClipboardCheck, Shield, Stethoscope, Activity, Heart
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const EconomicAnalysis = () => {
  const [memberCount, setMemberCount] = useState(10000);
  const [basePremium, setBasePremium] = useState(5000);
  const [activeTab, setActiveTab] = useState('exclusions');
  const { language, isRTL } = useLanguage();

  const services = [
    {
      id: 'exclusions',
      icon: Calculator,
      titleAr: 'توقع الأثر الاقتصادي',
      titleEn: 'Predict Economic Impact',
      color: 'bg-destructive',
      badge: language === 'ar' ? 'تحليل مالي' : 'Financial',
      tab: 'exclusions'
    },
    {
      id: 'sublimits',
      icon: Sliders,
      titleAr: 'محاكي الحدود الفرعية',
      titleEn: 'Sub-Limit Simulator',
      color: 'bg-info',
      badge: language === 'ar' ? 'محاكاة' : 'Simulator',
      tab: 'sublimits'
    },
  ];

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-6 sm:py-8 overflow-hidden gradient-hero">
        <div className="absolute inset-0 chi-pattern" />
        <div className="container mx-auto px-3 sm:px-4 relative">
          <div className={`flex items-center gap-3 mb-3 w-fit ${isRTL ? 'ml-auto' : ''}`} style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <h1 className="text-xl sm:text-2xl font-bold text-primary-foreground">
              {language === 'ar' ? 'أدوات التحليل الاقتصادي' : 'Economic Analysis Tools'}
            </h1>
            <div className="p-2 rounded-lg bg-primary-foreground/10">
              <Calculator className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          
          <p className={`text-xs sm:text-sm text-primary-foreground/85 max-w-2xl ${isRTL ? 'text-right ml-auto' : 'text-left'}`}>
            {language === 'ar' 
              ? 'توقع الأثر المالي والصحي لإضافة المنافع أو تعديل الحدود الفرعية لحزمة التغطية الصحية الخاصة الإلزامية'
              : 'Predict financial and health impact of adding benefits or modifying sub-limits for mandatory private health coverage'}
          </p>
        </div>
      </section>

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-4xl">
        <div className="flex flex-col gap-4 sm:gap-6">

          {/* Service Explanation Card */}
          <Card className="border-info/30 bg-info/5">
            <CardContent className="py-3 px-3 sm:px-4">
              <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                  <h3 className={`font-semibold text-sm mb-1 flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                    <span>{language === 'ar' ? 'كيف تعمل هذه الخدمة؟' : 'How does this service work?'}</span>
                    <Lightbulb className="h-4 w-4 text-info shrink-0" />
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {language === 'ar' 
                      ? 'تساعدك هذه الخدمة على توقع مبلغ وثيقة التأمين بناءً على عدد الموظفين وسعر الوثيقة لكل موظف. كما تمكنك من معرفة كم ستزيد قيمة الوثيقة الإجمالية عند إضافة منافع جديدة أو تعديل الحدود الفرعية للتغطية.'
                      : 'This service helps you predict the insurance policy amount based on the number of employees and the policy price per employee. It also shows how much the total policy value will increase when adding new benefits or modifying coverage sub-limits.'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Parameters */}
          <ParameterInputs 
            memberCount={memberCount} 
            setMemberCount={setMemberCount} 
            basePremium={basePremium} 
            setBasePremium={setBasePremium} 
          />

          {/* Economic Analysis Tools */}
          <Card className="border-border shadow-md">
            <CardHeader className="pb-2 px-3 sm:px-4">
              <CardTitle className="text-sm sm:text-base flex items-center gap-2 w-full">
                <Calculator className="h-4 w-4 text-primary" />
                {language === 'ar' ? 'أدوات التحليل الاقتصادي' : 'Economic Analysis Tools'}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 sm:px-4">
              <div className="grid grid-cols-2 gap-2 mb-4">
                {services.map((service) => {
                  const IconComponent = service.icon;
                  return (
                    <button
                      key={service.id}
                      onClick={() => setActiveTab(service.tab)}
                      className={`p-2 sm:p-3 rounded-lg border transition-all flex flex-col items-center justify-center ${
                        activeTab === service.tab 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border hover:border-primary/50 hover:bg-muted/50'
                      }`}
                    >
                      <div className={`p-1.5 sm:p-2 rounded-md ${service.color} mb-1`}>
                        <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
                      </div>
                      <p className="text-[10px] sm:text-xs font-medium truncate text-center">
                        {language === 'ar' ? service.titleAr : service.titleEn}
                      </p>
                      <Badge variant="outline" className="text-[8px] sm:text-[9px] mt-1">
                        {service.badge}
                      </Badge>
                    </button>
                  );
                })}
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsContent value="exclusions" className="mt-0">
                  <div className="border-t pt-3">
                    <p className={`text-[10px] sm:text-xs text-muted-foreground mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {language === 'ar' 
                        ? 'اختر من قائمة الخدمات غير المغطاة بالتغطية الصحية الخاصة لمعرفة تأثير تغطيتها'
                        : 'Select non-covered services to see coverage impact'}
                    </p>
                    <ExclusionsList basePremium={basePremium} />
                  </div>
                </TabsContent>

                <TabsContent value="sublimits" className="mt-0">
                  <div className="border-t pt-3">
                    <p className={`text-[10px] sm:text-xs text-muted-foreground mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {language === 'ar' 
                        ? 'عدّل الحدود الفرعية للتغطية الصحية الخاصة وشاهد تأثير القسط فوراً'
                        : 'Adjust sub-limits and see premium impact instantly'}
                    </p>
                    <SubLimitCalculator memberCount={memberCount} basePremium={basePremium} />
                  </div>
                </TabsContent>

              </Tabs>
            </CardContent>
          </Card>

          {/* PDF Export */}
          <Card className="border-border shadow-sm">
            <CardContent className="py-3 px-3 sm:px-4">
              <div className={`flex items-center justify-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <PDFExportButton 
                  selectedService={null} 
                  memberCount={memberCount} 
                  basePremium={basePremium}
                  className="h-8 text-xs"
                />
              </div>
              <p className={`text-[9px] sm:text-[10px] text-muted-foreground text-center flex items-center justify-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <AlertCircle className="h-3 w-3 shrink-0" />
                {language === 'ar' 
                  ? 'مصادر البيانات: مجلس الضمان الصحي chi.gov.sa • وزارة الصحة • دليل ضمان للأدوية'
                  : 'Sources: CHI chi.gov.sa • Saudi MOH • Daman Drug Formulary'}
              </p>
            </CardContent>
          </Card>

          {/* Employer Tips Card */}
          <Card className="border-success/30 bg-success/5" dir={isRTL ? 'rtl' : 'ltr'}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-success" />
                {language === 'ar' ? 'نصائح لصاحب العمل لتقليل استهلاك الوثيقة' : 'Tips for Employers to Reduce Policy Consumption'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Prior Authorization */}
                <div className="p-3 rounded-lg border border-border bg-background">
                  <div className="flex items-center gap-2 mb-2">
                    <ClipboardCheck className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold text-xs">
                      {language === 'ar' ? 'الموافقة المسبقة' : 'Prior Authorization'}
                    </h4>
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    {language === 'ar' 
                      ? 'تفعيل نظام الموافقة المسبقة للخدمات عالية التكلفة يقلل الاستخدام غير الضروري ويضمن الحصول على العلاج المناسب'
                      : 'Enabling prior authorization for high-cost services reduces unnecessary utilization and ensures appropriate treatment'}
                  </p>
                </div>

                {/* Co-payment */}
                <div className="p-3 rounded-lg border border-border bg-background">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-info" />
                    <h4 className="font-semibold text-xs">
                      {language === 'ar' ? 'نسبة التحمل' : 'Co-payment'}
                    </h4>
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    {language === 'ar' 
                      ? 'تطبيق نسبة تحمل مناسبة (10-20%) يشجع الموظفين على الاستخدام الرشيد للخدمات الصحية'
                      : 'Applying appropriate co-payment (10-20%) encourages employees to use health services wisely'}
                  </p>
                </div>

                {/* Preventive Services */}
                <div className="p-3 rounded-lg border border-border bg-background">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-4 w-4 text-destructive" />
                    <h4 className="font-semibold text-xs">
                      {language === 'ar' ? 'الخدمات الوقائية' : 'Preventive Services'}
                    </h4>
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    {language === 'ar' 
                      ? 'تشجيع الفحوصات الدورية والتطعيمات يقلل من تكاليف العلاج المستقبلية ويحسن صحة الموظفين'
                      : 'Encouraging regular checkups and vaccinations reduces future treatment costs and improves employee health'}
                  </p>
                </div>

                {/* Primary Care */}
                <div className="p-3 rounded-lg border border-border bg-background">
                  <div className="flex items-center gap-2 mb-2">
                    <Stethoscope className="h-4 w-4 text-warning" />
                    <h4 className="font-semibold text-xs">
                      {language === 'ar' ? 'الرعاية الأولية' : 'Primary Care'}
                    </h4>
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    {language === 'ar' 
                      ? 'توجيه الموظفين للرعاية الأولية أولاً يقلل التكاليف ويحسن جودة الرعاية من خلال التنسيق الأفضل'
                      : 'Directing employees to primary care first reduces costs and improves care quality through better coordination'}
                  </p>
                </div>

                {/* Value-Based Care */}
                <div className="p-3 rounded-lg border border-border bg-background sm:col-span-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-4 w-4 text-success" />
                    <h4 className="font-semibold text-xs">
                      {language === 'ar' ? 'دعم الرعاية المبنية على القيمة' : 'Support Value-Based Care'}
                    </h4>
                  </div>
                  <p className="text-[10px] text-muted-foreground mb-2">
                    {language === 'ar' 
                      ? 'دعم مبادرات مجلس الضمان الصحي للرعاية المبنية على القيمة مثل الحزم التشخيصية (DRG) ونظام الدفع المبني على النتائج يساهم في تحسين الكفاءة وتقليل التكاليف على المدى البعيد'
                      : 'Supporting CHI value-based care initiatives like DRGs and outcome-based payment systems contributes to improved efficiency and long-term cost reduction'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-[9px]">
                      {language === 'ar' ? 'الحزم التشخيصية DRG' : 'DRG Bundles'}
                    </Badge>
                    <Badge variant="outline" className="text-[9px]">
                      {language === 'ar' ? 'إدارة صحة السكان' : 'Population Health'}
                    </Badge>
                    <Badge variant="outline" className="text-[9px]">
                      {language === 'ar' ? 'الدفع المبني على الأداء' : 'Pay-for-Performance'}
                    </Badge>
                  </div>
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

export default EconomicAnalysis;
