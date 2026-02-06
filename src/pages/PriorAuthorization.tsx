import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, ArrowRight, FileCheck, Database, AlertTriangle, 
  CheckCircle2, XCircle, Clock, FileText, Shield, Stethoscope,
  ClipboardList, Activity, DollarSign, Users, Building2, Info,
  Workflow, ChevronRight, AlertCircle
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  mdsFields, 
  authorizationSteps, 
  rejectionReasons, 
  rejectionCodes,
  rejectionCodeCategories,
  servicesRequiringPA,
  mdsStatistics,
  categoryLabels
} from '@/data/priorAuthorizationData';

const PriorAuthorization = () => {
  const { language, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'demographic': return Users;
      case 'clinical': return Stethoscope;
      case 'service': return Activity;
      case 'financial': return DollarSign;
      default: return FileText;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'demographic': return 'bg-info';
      case 'clinical': return 'bg-success';
      case 'service': return 'bg-warning';
      case 'financial': return 'bg-destructive';
      default: return 'bg-primary';
    }
  };

  const groupedFields = mdsFields.reduce((acc, field) => {
    if (!acc[field.category]) {
      acc[field.category] = [];
    }
    acc[field.category].push(field);
    return acc;
  }, {} as Record<string, typeof mdsFields>);

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-6 sm:py-8 overflow-hidden gradient-hero">
        <div className="absolute inset-0 chi-pattern" />
        <div className="container mx-auto px-3 sm:px-4 relative">
          <div className={`flex items-center gap-3 mb-3 w-fit ${isRTL ? 'ml-auto' : ''}`}>
            <div className="p-2 rounded-lg bg-primary-foreground/10">
              <FileCheck className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-primary-foreground">
              {language === 'ar' ? 'الموافقات المسبقة والحد الأدنى من البيانات' : 'Prior Authorization & MDS'}
            </h1>
          </div>
          
          <p className={`text-xs sm:text-sm text-primary-foreground/85 max-w-2xl ${isRTL ? 'text-right ml-auto' : 'text-left'}`}>
            {language === 'ar' 
              ? 'دليل شامل لمتطلبات الموافقة المسبقة والحد الأدنى من البيانات (MDS) في نظام التأمين الصحي السعودي'
              : 'Comprehensive guide to prior authorization requirements and Minimum Data Set (MDS) in Saudi health insurance'}
          </p>
        </div>
      </section>

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-5xl">
        {/* Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-3 flex flex-col items-center justify-center text-center">
              <Database className="h-5 w-5 mb-1 text-primary" />
              <p className="text-xl font-bold text-primary w-full text-center">{mdsStatistics.healthcareProviders.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground w-full text-center">
                {language === 'ar' ? 'مقدم خدمة صحية' : 'Healthcare Providers'}
              </p>
            </CardContent>
          </Card>
          <Card className="border-info/20 bg-info/5">
            <CardContent className="p-3 flex flex-col items-center justify-center text-center">
              <Building2 className="h-5 w-5 mb-1 text-info" />
              <p className="text-xl font-bold text-info w-full text-center">{mdsStatistics.insuranceCompanies}</p>
              <p className="text-[10px] text-muted-foreground w-full text-center">
                {language === 'ar' ? 'شركة تأمين' : 'Insurance Companies'}
              </p>
            </CardContent>
          </Card>
          <Card className="border-success/20 bg-success/5">
            <CardContent className="p-3 flex flex-col items-center justify-center text-center">
              <ClipboardList className="h-5 w-5 mb-1 text-success" />
              <p className="text-xl font-bold text-success w-full text-center">{mdsFields.length}</p>
              <p className="text-[10px] text-muted-foreground w-full text-center">
                {language === 'ar' ? 'حقل بيانات' : 'Data Fields'}
              </p>
            </CardContent>
          </Card>
          <Card className="border-warning/20 bg-warning/5">
            <CardContent className="p-3 flex flex-col items-center justify-center text-center">
              <Clock className="h-5 w-5 mb-1 text-warning" />
              <p className="text-xl font-bold text-warning w-full text-center">{mdsStatistics.implementationYear}</p>
              <p className="text-[10px] text-muted-foreground w-full text-center">
                {language === 'ar' ? 'سنة التطبيق' : 'Implementation Year'}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid grid-cols-4 w-full mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <TabsTrigger value="rejections" className="text-xs">
              {language === 'ar' ? 'الرفض' : 'Rejections'}
            </TabsTrigger>
            <TabsTrigger value="process" className="text-xs">
              {language === 'ar' ? 'الإجراءات' : 'Process'}
            </TabsTrigger>
            <TabsTrigger value="mds" className="text-xs">
              {language === 'ar' ? 'الحد الأدنى' : 'MDS'}
            </TabsTrigger>
            <TabsTrigger value="overview" className="text-xs">
              {language === 'ar' ? 'نظرة عامة' : 'Overview'}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <Card className="border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className={`text-base flex items-center gap-2 w-full ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <FileCheck className="h-4 w-4 text-primary" />
                  {language === 'ar' ? 'ما هي الموافقة المسبقة؟' : 'What is Prior Authorization?'}
                </CardTitle>
              </CardHeader>
              <CardContent className={isRTL ? 'text-right' : 'text-left'}>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {language === 'ar' 
                    ? 'الموافقة المسبقة هي عملية الحصول على موافقة شركة التأمين قبل تقديم خدمات صحية محددة للمستفيد. تهدف هذه العملية إلى التأكد من أن الخدمة المطلوبة ضرورية طبياً ومغطاة بموجب وثيقة التأمين.'
                    : 'Prior authorization is the process of obtaining insurance company approval before providing specific health services to the beneficiary. This process aims to ensure that the requested service is medically necessary and covered under the insurance policy.'}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                    <CheckCircle2 className="h-5 w-5 text-success mb-2" />
                    <h4 className="font-semibold text-sm mb-1">
                      {language === 'ar' ? 'فوائد للمستفيد' : 'Benefits for Beneficiary'}
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• {language === 'ar' ? 'ضمان التغطية قبل العلاج' : 'Coverage assurance before treatment'}</li>
                      <li>• {language === 'ar' ? 'معرفة التكلفة المتوقعة' : 'Know expected costs'}</li>
                      <li>• {language === 'ar' ? 'تجنب المفاجآت المالية' : 'Avoid financial surprises'}</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded-lg bg-info/10 border border-info/20">
                    <Shield className="h-5 w-5 text-info mb-2" />
                    <h4 className="font-semibold text-sm mb-1">
                      {language === 'ar' ? 'فوائد للنظام' : 'Benefits for System'}
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• {language === 'ar' ? 'ضبط الاستخدام المناسب' : 'Appropriate utilization control'}</li>
                      <li>• {language === 'ar' ? 'منع الخدمات غير الضرورية' : 'Prevent unnecessary services'}</li>
                      <li>• {language === 'ar' ? 'تحسين جودة الرعاية' : 'Improve care quality'}</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What is MDS */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className={`text-base flex items-center gap-2 w-full ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Database className="h-4 w-4 text-primary" />
                  {language === 'ar' ? 'ما هو الحد الأدنى من البيانات (MDS)؟' : 'What is Minimum Data Set (MDS)?'}
                </CardTitle>
              </CardHeader>
              <CardContent className={isRTL ? 'text-right' : 'text-left'}>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {language === 'ar' 
                    ? 'الحد الأدنى من البيانات (MDS) هو مجموعة البيانات الأساسية المطلوبة لمعالجة المطالبات وطلبات الموافقة المسبقة في نظام التأمين الصحي. يهدف المشروع إلى توحيد البيانات وتحسين جودتها لتقليل رفض المطالبات.'
                    : 'Minimum Data Set (MDS) is the essential data required for processing claims and prior authorization requests in the health insurance system. The project aims to standardize data and improve quality to reduce claim rejections.'}
                </p>
                
                <div className="p-3 rounded-lg bg-muted/50 border">
                  <h4 className={`font-semibold text-sm mb-2 flex items-center gap-2 w-full ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Info className="h-4 w-4 text-warning" />
                    {language === 'ar' ? 'أهداف مشروع MDS' : 'MDS Project Goals'}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { ar: 'تفعيل الترميز الطبي المعتمد', en: 'Activate approved medical coding' },
                      { ar: 'تجهيز القطاع للتحول الرقمي', en: 'Prepare sector for digital transformation' },
                      { ar: 'قياس مؤشرات الأداء', en: 'Measure performance indicators' },
                      { ar: 'تحسين جودة وكفاءة الخدمات', en: 'Improve service quality and efficiency' }
                    ].map((goal, idx) => (
                      <div key={idx} className={`flex items-start gap-1.5 text-xs ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                        <CheckCircle2 className="h-3.5 w-3.5 text-success mt-0.5 shrink-0" />
                        <span>{language === 'ar' ? goal.ar : goal.en}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services Requiring PA */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className={`text-base flex items-center gap-2 w-full ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <ClipboardList className="h-4 w-4 text-primary" />
                  {language === 'ar' ? 'الخدمات التي تتطلب موافقة مسبقة' : 'Services Requiring Prior Authorization'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {servicesRequiringPA.map((category, idx) => (
                    <div key={idx} className="p-3 rounded-lg border bg-card">
                      <h4 className={`font-semibold text-sm mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {language === 'ar' ? category.categoryAr : category.categoryEn}
                      </h4>
                      <ul className="space-y-1">
                        {category.examples.map((example, exIdx) => (
                          <li key={exIdx} className={`text-xs text-muted-foreground flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <ChevronRight className="h-3 w-3 text-primary" />
                            {language === 'ar' ? example.ar : example.en}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* MDS Tab */}
          <TabsContent value="mds" className="space-y-4">
            {Object.entries(groupedFields).map(([category, fields]) => {
              const CategoryIcon = getCategoryIcon(category);
              const label = categoryLabels[category as keyof typeof categoryLabels];
              return (
                <Card key={category}>
                  <CardHeader className="pb-2">
                    <CardTitle className={`text-base flex items-center gap-2 w-full ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className={`p-1.5 rounded ${getCategoryColor(category)}`}>
                        <CategoryIcon className="h-4 w-4 text-primary-foreground" />
                      </div>
                      {language === 'ar' ? label.ar : label.en}
                      <Badge variant="outline" className="text-[10px]">
                        {fields.length} {language === 'ar' ? 'حقل' : 'fields'}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      {fields.map((field) => (
                        <div 
                          key={field.id} 
                          className={`p-3 rounded-lg border ${field.required ? 'border-destructive/30 bg-destructive/5' : 'border-border bg-muted/30'}`}
                        >
                          <div className={`flex items-center justify-between mb-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <span className="font-medium text-sm">
                              {language === 'ar' ? field.nameAr : field.nameEn}
                            </span>
                            {field.required ? (
                              <Badge variant="destructive" className="text-[10px]">
                                {language === 'ar' ? 'إلزامي' : 'Required'}
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="text-[10px]">
                                {language === 'ar' ? 'اختياري' : 'Optional'}
                              </Badge>
                            )}
                          </div>
                          <p className={`text-xs text-muted-foreground ${isRTL ? 'text-right' : 'text-left'}`}>
                            {language === 'ar' ? field.descriptionAr : field.descriptionEn}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          {/* Process Tab */}
          <TabsContent value="process" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className={`text-base flex items-center gap-2 w-full ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Workflow className="h-4 w-4 text-primary" />
                  {language === 'ar' ? 'خطوات عملية الموافقة المسبقة' : 'Prior Authorization Process Steps'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {authorizationSteps.map((step, idx) => (
                    <div key={step.id} className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                          {step.id}
                        </div>
                        {idx < authorizationSteps.length - 1 && (
                          <div className="w-0.5 h-full bg-primary/30 my-1" />
                        )}
                      </div>
                      <div className={`flex-1 pb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                        <h4 className="font-semibold text-sm">
                          {language === 'ar' ? step.titleAr : step.titleEn}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {language === 'ar' ? step.descriptionAr : step.descriptionEn}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-info/30 bg-info/5">
              <CardContent className="py-4">
                <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Info className="h-5 w-5 text-info shrink-0 mt-0.5" />
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <h4 className="font-semibold text-sm mb-1">
                      {language === 'ar' ? 'منصة نفيس' : 'Nafees Platform'}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {language === 'ar' 
                        ? 'جميع طلبات الموافقة المسبقة يجب أن تُقدم عبر منصة نفيس. المنصة ترفض الطلبات غير المكتملة تلقائياً وتتطلب استيفاء الحد الأدنى من البيانات.'
                        : 'All prior authorization requests must be submitted through Nafees platform. The platform automatically rejects incomplete requests and requires minimum data set compliance.'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rejections Tab - Enhanced with Detailed Codes */}
          <TabsContent value="rejections" className="space-y-4">
            {/* Summary Statistics */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className={`text-base flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  {language === 'ar' ? 'أكثر أسباب الرفض شيوعاً' : 'Most Common Rejection Reasons'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {rejectionReasons.map((reason) => (
                    <div key={reason.id} className="p-3 rounded-lg border">
                      <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <XCircle className="h-4 w-4 text-destructive" />
                          <span className="font-medium text-sm">
                            {language === 'ar' ? reason.nameAr : reason.nameEn}
                          </span>
                        </div>
                        <Badge variant="destructive" className="text-xs">
                          {language === 'ar' ? reason.percentageAr : reason.percentageEn}
                        </Badge>
                      </div>
                      <div className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <CheckCircle2 className="h-3.5 w-3.5 text-success mt-0.5 shrink-0" />
                        <p className={`text-xs text-muted-foreground ${isRTL ? 'text-right' : 'text-left'}`}>
                          <span className="font-medium text-success">
                            {language === 'ar' ? 'الحل: ' : 'Solution: '}
                          </span>
                          {language === 'ar' ? reason.solutionAr : reason.solutionEn}
                        </p>
                      </div>
                      <Progress value={parseInt(reason.percentageAr)} className="h-1.5 mt-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Detailed Rejection Codes */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className={`text-base flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <FileText className="h-4 w-4 text-primary" />
                  {language === 'ar' ? 'دليل رموز الرفض التفصيلي' : 'Detailed Rejection Codes Guide'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Clickable Category Badges */}
                <div className={`flex flex-wrap gap-2 mb-4 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                  <Badge 
                    variant={selectedCategory === null ? "default" : "outline"} 
                    className="cursor-pointer text-[10px] hover:bg-primary/20 transition-colors"
                    onClick={() => setSelectedCategory(null)}
                  >
                    {language === 'ar' ? 'الكل' : 'All'}
                  </Badge>
                  {Object.entries(rejectionCodeCategories).map(([key, cat]) => (
                    <Badge 
                      key={key} 
                      variant="outline" 
                      className={`cursor-pointer text-[10px] transition-all ${
                        selectedCategory === key 
                          ? `${cat.color} text-primary-foreground ring-2 ring-offset-1` 
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => setSelectedCategory(key)}
                    >
                      {language === 'ar' ? cat.ar : cat.en}
                    </Badge>
                  ))}
                </div>

                {/* Filtered Rejection Codes */}
                <div className="space-y-2">
                  {rejectionCodes
                    .filter(code => selectedCategory === null || code.category === selectedCategory)
                    .map((code) => {
                      const catInfo = rejectionCodeCategories[code.category];
                      return (
                        <div 
                          key={code.code} 
                          className={`p-3 rounded-lg border ${
                            code.category === 'clinical' ? 'border-destructive/20 bg-destructive/5' :
                            code.category === 'administrative' ? 'border-warning/20 bg-warning/5' :
                            code.category === 'coverage' ? 'border-info/20 bg-info/5' :
                            'border-secondary/20 bg-secondary/5'
                          }`}
                        >
                          <div className={`flex items-center justify-between mb-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <span className={`font-mono text-xs font-bold ${
                              code.category === 'clinical' ? 'text-destructive' :
                              code.category === 'administrative' ? 'text-warning' :
                              code.category === 'coverage' ? 'text-info' :
                              'text-secondary-foreground'
                            }`}>{code.code}</span>
                            <span className="font-medium text-xs">{language === 'ar' ? code.nameAr : code.nameEn}</span>
                          </div>
                          <p className={`text-[10px] text-muted-foreground mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                            {language === 'ar' ? code.descriptionAr : code.descriptionEn}
                          </p>
                          
                          {/* Example */}
                          {code.exampleAr && (
                            <div className={`mb-2 p-2 rounded bg-muted/50 border border-muted ${isRTL ? 'text-right' : 'text-left'}`}>
                              <span className="text-[9px] font-semibold text-muted-foreground">
                                {language === 'ar' ? 'مثال: ' : 'Example: '}
                              </span>
                              <span className="text-[9px] text-muted-foreground italic">
                                {language === 'ar' ? code.exampleAr : code.exampleEn}
                              </span>
                            </div>
                          )}
                          
                          <div className={`flex items-start gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <CheckCircle2 className="h-3 w-3 text-success mt-0.5 shrink-0" />
                            <p className={`text-[10px] text-success ${isRTL ? 'text-right' : 'text-left'}`}>
                              {language === 'ar' ? code.solutionAr : code.solutionEn}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="border-success/30 bg-success/5">
              <CardContent className="py-4">
                <h4 className={`font-semibold text-sm mb-2 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  {language === 'ar' ? 'نصائح لتجنب الرفض' : 'Tips to Avoid Rejection'}
                </h4>
                <ul className={`space-y-2 text-xs text-muted-foreground ${isRTL ? 'text-right' : 'text-left'}`}>
                  {[
                    { ar: 'تأكد من إدخال جميع الحقول الإلزامية في MDS', en: 'Ensure all mandatory MDS fields are filled' },
                    { ar: 'استخدم رموز ICD-10-AM و SBS V3 الصحيحة', en: 'Use correct ICD-10-AM and SBS V3 codes' },
                    { ar: 'قدم مبرراً طبياً مفصلاً وواضحاً', en: 'Provide detailed and clear medical justification' },
                    { ar: 'أرفق نتائج الفحوصات والتحاليل ذات الصلة', en: 'Attach relevant examination and test results' },
                    { ar: 'تحقق من صلاحية وثيقة التأمين والتغطية المتاحة', en: 'Verify insurance policy validity and available coverage' },
                  ].map((tip, idx) => (
                    <li key={idx} className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-success font-bold">{idx + 1}.</span>
                      {language === 'ar' ? tip.ar : tip.en}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default PriorAuthorization;
