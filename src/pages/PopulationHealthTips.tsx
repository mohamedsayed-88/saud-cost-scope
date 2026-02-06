import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EmployerCostReductionGuide } from '@/components/EmployerCostReductionGuide';
import { 
  Heart, 
  Target, 
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  FileText,
  Stethoscope,
  Users
} from 'lucide-react';

const populationHealthTips = [
  {
    titleAr: 'برامج إدارة الأمراض المزمنة',
    titleEn: 'Chronic Disease Management Programs',
    descriptionAr: 'تطبيق برامج متابعة للموظفين المصابين بالسكري والضغط يقلل التكاليف بنسبة 15-25%',
    descriptionEn: 'Implementing follow-up programs for employees with diabetes and hypertension reduces costs by 15-25%',
    savingsPercent: 20,
    icon: Heart,
    category: 'chronic',
    sourceAr: 'مركز السيطرة على الأمراض والوقاية منها (CDC) - دراسة 2019: برامج إدارة الأمراض المزمنة تخفض تكاليف الرعاية الصحية بنسبة 15-25% وتقلل دخول المستشفيات بنسبة 30%',
    sourceEn: 'CDC 2019: Chronic disease management programs reduce healthcare costs by 15-25% and hospital admissions by 30%',
    sourceUrl: 'https://www.cdc.gov/chronicdisease'
  },
  {
    titleAr: 'تعزيز الرعاية الأولية',
    titleEn: 'Strengthen Primary Care',
    descriptionAr: 'توجيه الموظفين للرعاية الأولية أولاً يقلل زيارات الطوارئ غير الضرورية بنسبة 10-15%',
    descriptionEn: 'Directing employees to primary care first reduces unnecessary ER visits by 10-15%',
    savingsPercent: 12,
    icon: Stethoscope,
    category: 'primary',
    sourceAr: 'وكالة أبحاث جودة الرعاية الصحية (AHRQ): تحويل الحالات غير الطارئة للرعاية الأولية يوفر 10-15% من تكاليف الطوارئ',
    sourceEn: 'AHRQ: Routing non-emergency cases to primary care saves 10-15% of emergency costs',
    sourceUrl: 'https://www.ahrq.gov/research'
  },
  {
    titleAr: 'برامج الصحة الوقائية',
    titleEn: 'Preventive Health Programs',
    descriptionAr: 'الاستثمار في الفحوصات الدورية يكشف الأمراض مبكراً ويقلل تكاليف العلاج بنسبة 15-20%',
    descriptionEn: 'Investing in regular checkups detects diseases early and reduces treatment costs by 15-20%',
    savingsPercent: 18,
    icon: Target,
    category: 'preventive',
    sourceAr: 'منظمة الصحة العالمية (WHO) 2021: كل ريال يُستثمر في الوقاية يوفر 3-5 ريال في تكاليف العلاج المستقبلية',
    sourceEn: 'WHO 2021: Every $1 invested in prevention saves $3-5 in future treatment costs',
    sourceUrl: 'https://www.who.int/health-topics/health-promotion'
  },
  {
    titleAr: 'برامج الصحة النفسية',
    titleEn: 'Mental Health Programs',
    descriptionAr: 'دعم الصحة النفسية يقلل الغياب بنسبة 25% ويرفع الإنتاجية بنسبة 10-15%',
    descriptionEn: 'Mental health support reduces absenteeism by 25% and increases productivity by 10-15%',
    savingsPercent: 8,
    icon: Users,
    category: 'mental',
    sourceAr: 'منظمة الصحة العالمية 2022: كل ريال يُستثمر في الصحة النفسية يعود بـ 4 ريال في تحسن الإنتاجية وتقليل الغياب',
    sourceEn: 'WHO 2022: Every $1 invested in mental health returns $4 in improved productivity and reduced absenteeism',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/mental-health-at-work'
  }
];

const PopulationHealthTips = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-6 sm:py-8 overflow-hidden gradient-hero">
        <div className="absolute inset-0 chi-pattern" />
        <div className="container mx-auto px-3 sm:px-4 relative">
          <div className={`flex items-center gap-3 mb-3 w-fit ${isRTL ? 'ml-auto' : ''}`} style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <h1 className="text-xl sm:text-2xl font-bold text-primary-foreground">
              {isRTL ? 'نصائح الصحة السكانية' : 'Population Health Tips'}
            </h1>
            <div className="p-2 rounded-lg bg-primary-foreground/10">
              <Lightbulb className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          
          <p className={`text-xs sm:text-sm text-primary-foreground/85 max-w-2xl ${isRTL ? 'text-right ml-auto' : 'text-left'}`}>
            {isRTL 
              ? 'استراتيجيات مبنية على توجهات مجلس الضمان الصحي لتحسين صحة الموظفين وتقليل التكاليف'
              : 'Strategies based on CHI guidelines to improve employee health and reduce costs'}
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8 space-y-6">

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 w-full ${isRTL ? 'justify-end' : ''}`} style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <span>{isRTL ? 'توصيات الصحة السكانية' : 'Population Health Recommendations'}</span>
              <Target className="h-5 w-5 text-primary" />
            </CardTitle>
            <CardDescription className={isRTL ? 'text-right' : ''}>
              {isRTL 
                ? 'استراتيجيات مبنية على أبحاث علمية موثقة'
                : 'Strategies based on documented scientific research'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {populationHealthTips.map((tip, index) => {
                const Icon = tip.icon;
                
                return (
                  <div key={index} className={`p-4 rounded-lg border bg-card hover:shadow-md transition-shadow ${isRTL ? 'text-right' : 'text-left'}`}>
                    <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`flex-1`}>
                        <div className={`flex items-center gap-2 mb-1 w-full ${isRTL ? 'flex-row-reverse justify-end' : 'flex-row'}`}>
                          <Badge variant="secondary" className="bg-success/10 text-success">
                            {isRTL ? 'توفير ' : 'Save '}{tip.savingsPercent}%
                          </Badge>
                          <h4 className="font-medium">{isRTL ? tip.titleAr : tip.titleEn}</h4>
                          <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {isRTL ? tip.descriptionAr : tip.descriptionEn}
                        </p>
                        
                        <div className={`text-xs text-muted-foreground/70 bg-muted/30 rounded p-2 mb-3 ${isRTL ? 'border-r-2 border-primary/30' : 'border-l-2 border-primary/30'}`}>
                          <div className={`flex items-start gap-1 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                            <span>{isRTL ? tip.sourceAr : tip.sourceEn}</span>
                            <FileText className="h-3 w-3 mt-0.5 shrink-0" />
                          </div>
                          {tip.sourceUrl && (
                            <a href={tip.sourceUrl} target="_blank" rel="noopener noreferrer" className={`text-primary hover:underline mt-1 inline-block text-[10px] ${isRTL ? 'float-left' : ''}`}>
                              {isRTL ? 'المصدر ↗' : 'Source ↗'}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Best Practices */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 w-full ${isRTL ? 'justify-end' : ''}`} style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <span>{isRTL ? 'أفضل الممارسات' : 'Best Practices'}</span>
              <CheckCircle2 className="h-5 w-5 text-success" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className={`p-4 rounded-lg bg-success/5 border border-success/20 ${isRTL ? 'text-right' : 'text-left'}`}>
                <h4 className={`font-medium text-success mb-2 flex items-center gap-2 w-full ${isRTL ? 'justify-end' : ''}`} style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <span>{isRTL ? 'الالتزام بالحد الأدنى الإلزامي' : 'Comply with Mandatory Minimums'}</span>
                  <CheckCircle2 className="h-4 w-4" />
                </h4>
                <p className="text-sm text-muted-foreground">
                  {isRTL 
                    ? 'تأكد من أن وثيقتك تغطي جميع المنافع الأساسية المطلوبة من مجلس الضمان الصحي.'
                    : 'Ensure your policy covers all basic benefits required by CHI.'}
                </p>
              </div>

              <div className={`p-4 rounded-lg bg-primary/5 border border-primary/20 ${isRTL ? 'text-right' : 'text-left'}`}>
                <h4 className={`font-medium text-primary mb-2 flex items-center gap-2 w-full ${isRTL ? 'justify-end' : ''}`} style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <span>{isRTL ? 'تحسين بدلاً من التقليل' : 'Optimize Instead of Cut'}</span>
                  <Lightbulb className="h-4 w-4" />
                </h4>
                <p className="text-sm text-muted-foreground">
                  {isRTL 
                    ? 'ركز على تحسين استخدام الخدمات الوقائية والرعاية الأولية بدلاً من تقليل التغطية.'
                    : 'Focus on improving utilization of preventive and primary care services instead of reducing coverage.'}
                </p>
              </div>

              <div className={`p-4 rounded-lg bg-accent/50 border border-accent ${isRTL ? 'text-right' : 'text-left'}`}>
                <h4 className={`font-medium mb-2 flex items-center gap-2 w-full ${isRTL ? 'justify-end' : ''}`} style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <span>{isRTL ? 'الموازنة بين التكلفة والجودة' : 'Balance Cost and Quality'}</span>
                  <AlertCircle className="h-4 w-4" />
                </h4>
                <p className="text-sm text-muted-foreground">
                  {isRTL 
                    ? 'تقليل المنافع قد يوفر على المدى القصير، لكنه قد يؤدي لزيادة الغياب وانخفاض الإنتاجية.'
                    : 'Reducing benefits may save in the short term, but can lead to increased absenteeism and lower productivity.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Employer Cost Reduction Guide */}
        <EmployerCostReductionGuide />
      </main>
    </div>
  );
};

export default PopulationHealthTips;
