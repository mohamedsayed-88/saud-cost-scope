import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<string, Record<Language, string>> = {
  // Header
  'header.title': { en: 'Actuarial Tool', ar: 'أداة اكتوارية' },
  'header.subtitle': { en: 'Premium Impact Calculator', ar: 'حاسبة تأثير الأقساط' },
  'header.badge': { en: 'Council of Health Insurance', ar: 'مجلس الضمان الصحي' },
  'header.official': { en: 'Official website of the Council of Health Insurance - Kingdom of Saudi Arabia', ar: 'موقع رسمي تابع لمجلس الضمان الصحي - المملكة العربية السعودية' },
  
  // Hero
  'hero.badge': { en: 'Council of Health Insurance', ar: 'مجلس الضمان الصحي' },
  'hero.title': { en: 'Towards a Sustainable Health Future', ar: 'نحو مستقبل صحي مستدام' },
  'hero.subtitle': { en: 'Health Insurance Premium Impact Calculator', ar: 'حاسبة تأثير أقساط التأمين الصحي' },
  'hero.description': { en: 'Accurately predict premium impact when adding health services to Saudi Arabia\'s Essential Benefits Package using local prevalence data and treatment costs.', ar: 'تنبؤ دقيق بتأثير الأقساط عند إضافة خدمات صحية لحزمة المنافع الأساسية في المملكة العربية السعودية باستخدام بيانات الانتشار المحلية وتكاليف العلاج.' },
  
  // Stats
  'stats.healthServices': { en: 'Health Services', ar: 'خدمة صحية' },
  'stats.saudiData': { en: 'Saudi Data', ar: 'بيانات سعودية' },
  'stats.accuracy': { en: 'Accuracy', ar: 'دقة التنبؤ' },
  'stats.categories': { en: 'Categories', ar: 'تصنيف' },
  
  // Service Selector
  'service.title': { en: 'Select Health Service', ar: 'اختر الخدمة الصحية' },
  'service.description': { en: 'Choose a health service to calculate its premium impact on your insurance portfolio', ar: 'اختر خدمة صحية لحساب تأثيرها على قسط التأمين في محفظتك' },
  'service.search': { en: 'Search health services...', ar: 'ابحث عن الخدمات الصحية...' },
  'service.noResults': { en: 'No services found matching your criteria', ar: 'لم يتم العثور على خدمات مطابقة' },
  'service.saudiData': { en: 'Saudi Data', ar: 'بيانات سعودية' },
  
  // Parameters
  'params.title': { en: 'Employer Insurance Portfolio Data', ar: 'بيانات المحفظة التأمينية لصاحب العمل' },
  'params.totalMembers': { en: 'Total Members', ar: 'إجمالي الأعضاء' },
  'params.basePremium': { en: 'Base Annual Premium', ar: 'القسط السنوي الأساسي' },
  'params.poolValue': { en: 'Employer Annual Premium', ar: 'ما يدفعه صاحب العمل سنوياً' },
  'params.monthlyMember': { en: 'Monthly per Member', ar: 'شهرياً للعضو' },
  
  // Results
  'results.title': { en: 'Premium Impact Analysis', ar: 'تحليل تأثير القسط' },
  'results.premiumIncrease': { en: 'Premium Increase', ar: 'زيادة القسط' },
  'results.totalAnnualCost': { en: 'Total Annual Cost', ar: 'التكلفة السنوية الإجمالية' },
  'results.forMembers': { en: 'For {count} members', ar: 'لـ {count} عضو' },
  'results.impactLevel': { en: 'Impact Level', ar: 'مستوى التأثير' },
  'results.newPremium': { en: 'New Premium Structure', ar: 'هيكل القسط الجديد' },
  'results.perMemberYear': { en: '/member/year', ar: '/عضو/سنة' },
  
  // Actuarial
  'actuarial.title': { en: 'Actuarial Parameters', ar: 'المعايير الاكتوارية' },
  'actuarial.prevalence': { en: 'Prevalence Rate', ar: 'معدل الانتشار' },
  'actuarial.treatmentCost': { en: 'Avg Treatment Cost', ar: 'متوسط تكلفة العلاج' },
  'actuarial.expectedClaims': { en: 'Expected Claims', ar: 'المطالبات المتوقعة' },
  'actuarial.riskLoading': { en: 'Risk Loading', ar: 'عامل المخاطر' },
  'actuarial.adminLoading': { en: 'Admin Loading', ar: 'التحميل الإداري' },
  
  // Recommendations
  'rec.title': { en: 'Analysis & Recommendations', ar: 'التحليل والتوصيات' },
  'rec.highImpact': { en: 'High Impact Benefit', ar: 'منفعة عالية التأثير' },
  'rec.highDesc': { en: 'Consider implementing cost-sharing mechanisms or annual limits to manage premium impact.', ar: 'يُنصح بتطبيق آليات تقاسم التكاليف أو حدود سنوية لإدارة تأثير القسط.' },
  'rec.mediumImpact': { en: 'Moderate Impact', ar: 'تأثير متوسط' },
  'rec.mediumDesc': { en: 'Benefit is viable with appropriate utilization management protocols.', ar: 'المنفعة قابلة للتطبيق مع بروتوكولات إدارة الاستخدام المناسبة.' },
  'rec.lowImpact': { en: 'Low Impact', ar: 'تأثير منخفض' },
  'rec.lowDesc': { en: 'Benefit can be added with minimal premium adjustment. Consider as priority inclusion.', ar: 'يمكن إضافة المنفعة مع تعديل بسيط في القسط. يُنصح بإعطائها الأولوية.' },
  'rec.regionalNote': { en: 'Regional Data Note', ar: 'ملاحظة البيانات الإقليمية' },
  'rec.regionalDesc': { en: 'Using {country} data. Actual Saudi prevalence may vary ±15%.', ar: 'يتم استخدام بيانات {country}. قد يختلف الانتشار الفعلي في السعودية بنسبة ±15%.' },
  
  // Service Details
  'details.title': { en: 'Service Details', ar: 'تفاصيل الخدمة' },
  'details.englishName': { en: 'English Name', ar: 'الاسم بالإنجليزية' },
  'details.arabicName': { en: 'Arabic Name', ar: 'الاسم بالعربية' },
  'details.description': { en: 'Description', ar: 'الوصف' },
  
  // Chart
  'chart.title': { en: 'Premium Cost Breakdown', ar: 'تفصيل تكلفة القسط' },
  'chart.purePremium': { en: 'Pure Premium', ar: 'القسط الصافي' },
  'chart.riskLoading': { en: 'Risk Loading', ar: 'عامل المخاطر' },
  'chart.adminLoading': { en: 'Admin Loading', ar: 'التحميل الإداري' },
  'chart.totalAdditional': { en: 'Total Additional Premium', ar: 'إجمالي القسط الإضافي' },
  
  // Data Sources
  'sources.title': { en: 'Data Sources', ar: 'مصادر البيانات' },
  'sources.moh': { en: 'Saudi Ministry of Health', ar: 'وزارة الصحة السعودية' },
  'sources.gcc': { en: 'GCC Health Statistics', ar: 'إحصاءات صحة دول الخليج' },
  'sources.chi': { en: 'CHI Annual Reports', ar: 'تقارير مجلس الضمان الصحي' },
  'sources.note': { en: 'When Saudi data is unavailable, we use demographically similar GCC countries as proxies with appropriate adjustments.', ar: 'عند عدم توفر بيانات سعودية، نستخدم بيانات دول الخليج المشابهة ديموغرافياً مع التعديلات المناسبة.' },
  
  // Footer
  'footer.disclaimer': { en: 'Actuarial calculations are estimates based on available data.', ar: 'الحسابات الاكتوارية هي تقديرات مبنية على البيانات المتاحة.' },
  'footer.copyright': { en: '© 2024 CHI Premium Calculator • Saudi Arabia Health Insurance Sector', ar: '© 2024 حاسبة أقساط مجلس الضمان الصحي • قطاع التأمين الصحي السعودي' },
  
  // Categories
  'cat.all': { en: 'All Categories', ar: 'جميع الفئات' },
  'cat.chronic': { en: 'Chronic Disease', ar: 'الأمراض المزمنة' },
  'cat.metabolic': { en: 'Metabolic', ar: 'الأيض' },
  'cat.fertility': { en: 'Fertility', ar: 'الخصوبة' },
  'cat.mental': { en: 'Mental Health', ar: 'الصحة النفسية' },
  
  // Impact levels
  'impact.low': { en: 'Low', ar: 'منخفض' },
  'impact.medium': { en: 'Medium', ar: 'متوسط' },
  'impact.high': { en: 'High', ar: 'مرتفع' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    // Check localStorage first (user explicit preference)
    const saved = localStorage.getItem('chi-language');
    if (saved === 'en' || saved === 'ar') {
      return saved;
    }
    // Detect browser/device language
    const browserLang = navigator.language || (navigator as any).userLanguage || '';
    // Check if browser language starts with 'ar' (Arabic)
    if (browserLang.toLowerCase().startsWith('ar')) {
      return 'ar';
    }
    // Default to Arabic for Saudi context
    return 'ar';
  });

  const isRTL = language === 'ar';

  useEffect(() => {
    localStorage.setItem('chi-language', language);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
