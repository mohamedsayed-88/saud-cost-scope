import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  TrendingDown, 
  PiggyBank, 
  Award, 
  BarChart3, 
  MessageSquareMore,
  Network,
  Target,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Building2,
  Percent,
  ClipboardList,
  HeartPulse
} from 'lucide-react';

interface EmployerQuestion {
  id: string;
  questionAr: string;
  questionEn: string;
  answerAr: string[];
  answerEn: string[];
  icon: React.ElementType;
  savingsRange?: string;
}

const employerQuestions: EmployerQuestion[] = [
  {
    id: 'reduce-premium',
    questionAr: 'كيف أخفض القسط التأميني؟',
    questionEn: 'How can I reduce insurance premiums?',
    icon: TrendingDown,
    savingsRange: '5-20%',
    answerAr: [
      'اختر شبكة مقدمي خدمة أقل تكلفة مع الحفاظ على جودة الخدمة',
      'تفاوض على نسب تحمل أعلى للخدمات غير الأساسية',
      'اطلب تقرير استهلاك الموظفين من شركة التأمين لتحديد الخدمات الأكثر تكلفة',
      'ادرس إمكانية وضع حدود سعرية للخدمات عالية التكلفة',
      'قارن عروض شركات التأمين المختلفة سنوياً',
      'اطلب خصم عند التجديد المبكر أو الدفع المقدم',
    ],
    answerEn: [
      'Choose a lower-cost provider network while maintaining service quality',
      'Negotiate higher copayment rates for non-essential services',
      'Request employee consumption reports from the insurer to identify high-cost services',
      'Study the possibility of setting price limits for high-cost services',
      'Compare quotes from different insurance companies annually',
      'Request discounts for early renewal or advance payment',
    ],
  },
  {
    id: 'reduce-consumption',
    questionAr: 'كيف أقلل استهلاك الخدمات الصحية؟',
    questionEn: 'How can I reduce healthcare service consumption?',
    icon: BarChart3,
    savingsRange: '10-30%',
    answerAr: [
      'طبق برامج الصحة الوقائية والتوعية للموظفين',
      'شجع استخدام الطب الاتصالي للاستشارات البسيطة',
      'وجّه الموظفين لمراكز الرعاية الأولية بدلاً من الطوارئ للحالات غير الطارئة',
      'اطلب تقارير تحليلية شهرية لمراقبة أنماط الاستهلاك',
      'حدد خدمات تحتاج موافقة مسبقة لتقليل الاستخدام غير الضروري',
      'نفذ برامج إدارة الأمراض المزمنة لتقليل المضاعفات',
    ],
    answerEn: [
      'Implement preventive health and awareness programs for employees',
      'Encourage use of telemedicine for simple consultations',
      'Direct employees to primary care centers instead of ER for non-emergencies',
      'Request monthly analytical reports to monitor consumption patterns',
      'Require prior authorization for certain services to reduce unnecessary use',
      'Implement chronic disease management programs to reduce complications',
    ],
  },
  {
    id: 'vbhc-support',
    questionAr: 'كيف أدعم مبادرات الدفع بالكفاءة والجودة (VBHC)؟',
    questionEn: 'How can I support Value-Based Healthcare (VBHC) initiatives?',
    icon: Award,
    savingsRange: '15-35%',
    answerAr: [
      'اطلب من شركة التأمين عقود تعتمد على النتائج الصحية وليس عدد الخدمات',
      'اختر مقدمي خدمة مصنفين A أو A+ من مجلس الضمان الصحي',
      'ادعم برامج إدارة صحة السكان (PHM) التي تركز على الوقاية',
      'اشترط وجود مؤشرات أداء (KPIs) صحية في العقد مع شركة التأمين',
      'شجع استخدام الحزم العلاجية (DRG) بدلاً من الدفع مقابل كل خدمة',
      'اطلب تقارير نتائج العلاج (Outcomes) وليس فقط تقارير المطالبات',
    ],
    answerEn: [
      'Request contracts based on health outcomes, not service volume',
      'Choose providers classified A or A+ by CHI',
      'Support Population Health Management (PHM) programs focused on prevention',
      'Require health performance KPIs in contracts with insurers',
      'Encourage use of DRG bundles instead of fee-for-service',
      'Request treatment outcome reports, not just claims reports',
    ],
  },
  {
    id: 'savings-estimate',
    questionAr: 'كم نسبة التوفير المتوقعة؟',
    questionEn: 'What are the expected savings percentages?',
    icon: Percent,
    answerAr: [
      'تخفيض القسط: 5-20% من خلال التفاوض واختيار الشبكة المناسبة',
      'تقليل الاستهلاك: 10-30% عبر برامج الوقاية والتوعية',
      'الدفع بالجودة: 15-35% على المدى المتوسط والطويل',
      'إدارة الأمراض المزمنة: 20-40% تقليل في تكاليف المضاعفات',
      'الطب الاتصالي: 50-70% توفير في تكلفة الاستشارة مقارنة بالزيارة المباشرة',
      'الرعاية الأولية: 30-50% توفير مقارنة بالتوجه المباشر للأخصائي',
    ],
    answerEn: [
      'Premium reduction: 5-20% through negotiation and network selection',
      'Consumption reduction: 10-30% via prevention and awareness programs',
      'Value-based payment: 15-35% medium to long-term savings',
      'Chronic disease management: 20-40% reduction in complication costs',
      'Telemedicine: 50-70% savings on consultation cost vs in-person visits',
      'Primary care: 30-50% savings compared to direct specialist visits',
    ],
  },
  {
    id: 'insurance-followup',
    questionAr: 'كيف أتابع وأسأل شركة التأمين؟',
    questionEn: 'How do I follow up and communicate with the insurer?',
    icon: MessageSquareMore,
    answerAr: [
      'اطلب تقرير استهلاك شهري مفصل حسب نوع الخدمة والمستفيد',
      'اطلب تحليل أعلى 10 خدمات تكلفة وأعلى 10 مقدمي خدمة',
      'ناقش معدل الخسارة (Loss Ratio) وتأثيره على تجديد القسط',
      'اسأل عن برامج الوقاية والتوعية المتاحة لموظفيك',
      'استفسر عن خيارات تخصيص الشبكة أو تقييدها',
      'اطلب مقارنة أدائك مع معدلات السوق (Benchmarking)',
      'ناقش إمكانية ربط القسط بنتائج برامج الصحة',
    ],
    answerEn: [
      'Request detailed monthly consumption report by service type and beneficiary',
      'Request analysis of top 10 cost services and top 10 providers',
      'Discuss loss ratio and its impact on premium renewal',
      'Ask about available prevention and awareness programs for employees',
      'Inquire about network customization or restriction options',
      'Request comparison of your performance with market benchmarks',
      'Discuss linking premium to health program outcomes',
    ],
  },
  {
    id: 'consumption-tools',
    questionAr: 'ما الأدوات المتاحة لمعرفة استهلاك الخدمات؟',
    questionEn: 'What tools are available to monitor service consumption?',
    icon: ClipboardList,
    answerAr: [
      'بوابة صاحب العمل الإلكترونية من شركة التأمين',
      'تقارير الاستهلاك الشهرية والربعية',
      'لوحات المؤشرات (Dashboards) التفاعلية',
      'تحليلات الذكاء الاصطناعي للتنبؤ بالاستهلاك',
      'تقارير المقارنة المعيارية (Benchmarking)',
      'تقارير معدل الخسارة ومعدل الاستخدام',
      'منصة ضمان للذكاء الاصطناعي للتحليل والتوصيات',
    ],
    answerEn: [
      'Employer portal from the insurance company',
      'Monthly and quarterly consumption reports',
      'Interactive dashboards',
      'AI analytics for consumption prediction',
      'Benchmarking comparison reports',
      'Loss ratio and utilization rate reports',
      'Daman Intelligence platform for analysis and recommendations',
    ],
  },
  {
    id: 'network-selection',
    questionAr: 'كيف أختار شبكة أقل استهلاكاً؟',
    questionEn: 'How do I choose a lower-consumption network?',
    icon: Network,
    answerAr: [
      'اطلب تقرير أداء مقدمي الخدمة من شركة التأمين',
      'قارن متوسط تكلفة الزيارة بين المستشفيات',
      'اختر مقدمي خدمة معتمدين ومصنفين من مجلس الضمان',
      'فضّل المستشفيات التي تطبق برامج إدارة الاستخدام',
      'اختر شبكات تضم مراكز رعاية أولية قوية',
      'تجنب المستشفيات ذات معدلات الإحالة العالية غير المبررة',
      'اسأل عن مؤشرات الجودة وليس فقط الأسعار',
    ],
    answerEn: [
      'Request provider performance report from the insurer',
      'Compare average visit cost between hospitals',
      'Choose CHI-accredited and classified providers',
      'Prefer hospitals implementing utilization management programs',
      'Choose networks with strong primary care centers',
      'Avoid hospitals with high unjustified referral rates',
      'Ask about quality indicators, not just prices',
    ],
  },
  {
    id: 'service-limits',
    questionAr: 'كيف أضع حدود سعرية للخدمات؟',
    questionEn: 'How do I set price limits for services?',
    icon: Target,
    answerAr: [
      'راجع جدول أسعار الخدمات الصحية من مجلس الضمان (MRP)',
      'تفاوض على أسعار ثابتة للخدمات الأكثر استخداماً',
      'اطلب تطبيق الحزم السعرية (Bundle Pricing) للعمليات',
      'حدد سقف سنوي لبعض الخدمات غير الأساسية',
      'اشترط الموافقة المسبقة للخدمات عالية التكلفة',
      'استخدم نظام التحمل التصاعدي لتقليل الإفراط في الاستخدام',
    ],
    answerEn: [
      'Review CHI health services price schedule (MRP)',
      'Negotiate fixed prices for most-used services',
      'Request bundle pricing for procedures',
      'Set annual caps for certain non-essential services',
      'Require prior authorization for high-cost services',
      'Use tiered copayment to reduce overutilization',
    ],
  },
];

export const EmployerCostReductionGuide = () => {
  const { language, isRTL } = useLanguage();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader className="pb-3">
        <CardTitle className={`text-lg flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
          <span>{isRTL ? 'دليل خفض تكاليف التأمين لأصحاب العمل' : 'Employer Insurance Cost Reduction Guide'}</span>
          <Building2 className="h-5 w-5 text-primary" />
        </CardTitle>
        <CardDescription className={isRTL ? 'text-right' : ''}>
          {isRTL 
            ? 'أسئلة شائعة واستراتيجيات لتخفيض القسط التأميني وتحسين كفاءة الإنفاق'
            : 'Common questions and strategies to reduce insurance premiums and improve spending efficiency'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className={`p-3 rounded-lg bg-success/10 border border-success/20 ${isRTL ? 'text-right' : 'text-center'}`}>
            <TrendingDown className={`h-5 w-5 text-success mb-1 ${isRTL ? 'mr-auto' : 'mx-auto'}`} />
            <p className="text-lg font-bold text-success font-mono">5-20%</p>
            <p className="text-[10px] text-muted-foreground">{isRTL ? 'تخفيض القسط' : 'Premium Reduction'}</p>
          </div>
          <div className={`p-3 rounded-lg bg-info/10 border border-info/20 ${isRTL ? 'text-right' : 'text-center'}`}>
            <BarChart3 className={`h-5 w-5 text-info mb-1 ${isRTL ? 'mr-auto' : 'mx-auto'}`} />
            <p className="text-lg font-bold text-info font-mono">10-30%</p>
            <p className="text-[10px] text-muted-foreground">{isRTL ? 'تقليل الاستهلاك' : 'Usage Reduction'}</p>
          </div>
          <div className={`p-3 rounded-lg bg-warning/10 border border-warning/20 ${isRTL ? 'text-right' : 'text-center'}`}>
            <Award className={`h-5 w-5 text-warning mb-1 ${isRTL ? 'mr-auto' : 'mx-auto'}`} />
            <p className="text-lg font-bold text-warning font-mono">15-35%</p>
            <p className="text-[10px] text-muted-foreground">{isRTL ? 'الدفع بالجودة' : 'VBHC Savings'}</p>
          </div>
          <div className={`p-3 rounded-lg bg-primary/10 border border-primary/20 ${isRTL ? 'text-right' : 'text-center'}`}>
            <HeartPulse className={`h-5 w-5 text-primary mb-1 ${isRTL ? 'mr-auto' : 'mx-auto'}`} />
            <p className="text-lg font-bold text-primary font-mono">20-40%</p>
            <p className="text-[10px] text-muted-foreground">{isRTL ? 'إدارة المزمنة' : 'Chronic Mgmt'}</p>
          </div>
        </div>

        {/* Questions Accordion */}
        <Accordion type="multiple" value={expandedItems} onValueChange={setExpandedItems} className="space-y-2">
          {employerQuestions.map((q) => (
            <AccordionItem key={q.id} value={q.id} className="border rounded-lg px-4 bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
              <AccordionTrigger className="hover:no-underline">
                <div className={`flex items-center gap-3 w-full ${isRTL ? 'justify-start' : ''}`}>
                  <q.icon className="h-5 w-5 text-primary shrink-0" />
                  <span className="font-medium text-sm flex-1">
                    {isRTL ? q.questionAr : q.questionEn}
                  </span>
                  {q.savingsRange && (
                    <Badge variant="secondary" className="text-[10px] shrink-0">
                      {q.savingsRange} {isRTL ? 'توفير' : 'savings'}
                    </Badge>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 py-2">
                  {(isRTL ? q.answerAr : q.answerEn).map((answer, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{answer}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Pro Tips */}
        <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="h-5 w-5 text-primary" />
            <h4 className="font-semibold text-sm">{isRTL ? 'نصائح ذهبية' : 'Pro Tips'}</h4>
          </div>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li className="flex items-start gap-2">
              <ArrowRight className={`h-3 w-3 text-primary shrink-0 mt-0.5 ${isRTL ? 'rotate-180' : ''}`} />
              <span>
                {isRTL 
                  ? 'ابدأ بطلب تقرير الاستهلاك من شركة التأمين - هذا أساس كل القرارات'
                  : 'Start by requesting a consumption report from your insurer - this is the basis for all decisions'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className={`h-3 w-3 text-primary shrink-0 mt-0.5 ${isRTL ? 'rotate-180' : ''}`} />
              <span>
                {isRTL 
                  ? 'التوفير الحقيقي يأتي من الوقاية وليس من تقليل المنافع'
                  : 'Real savings come from prevention, not from reducing benefits'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className={`h-3 w-3 text-primary shrink-0 mt-0.5 ${isRTL ? 'rotate-180' : ''}`} />
              <span>
                {isRTL 
                  ? 'قارن 3 عروض على الأقل عند التجديد السنوي'
                  : 'Compare at least 3 quotes during annual renewal'}
              </span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployerCostReductionGuide;
