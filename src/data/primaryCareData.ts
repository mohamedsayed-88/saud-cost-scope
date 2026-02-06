export interface PrimaryCareService {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  category: 'clinical' | 'prevention' | 'population' | 'ancillary';
}

export interface ClassificationCriteria {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  domain: 'services' | 'workforce' | 'technology' | 'quality';
  isMustHave: boolean;
  points: number;
  evidenceAr: string;
  evidenceEn: string;
}

export interface CopaymentInfo {
  providerType: 'primary_a' | 'primary_a_plus' | 'specialist' | 'emergency';
  nameAr: string;
  nameEn: string;
  copaymentPercentage: number;
  descriptionAr: string;
  descriptionEn: string;
}

export const primaryCareServices: PrimaryCareService[] = [
  // Clinical Services
  {
    id: 'chronic_care',
    nameAr: 'إدارة الأمراض المزمنة',
    nameEn: 'Chronic Disease Management',
    descriptionAr: 'متابعة وإدارة الأمراض المزمنة كالسكري وارتفاع ضغط الدم بشكل مستمر ومنهجي',
    descriptionEn: 'Continuous management of chronic conditions like diabetes and hypertension',
    category: 'clinical'
  },
  {
    id: 'womens_health',
    nameAr: 'صحة المرأة',
    nameEn: "Women's Health",
    descriptionAr: 'رعاية ما قبل الحمل والرعاية أثناء الحمل ورعاية ما بعد الولادة',
    descriptionEn: 'Preconception, antenatal, and postpartum care',
    category: 'clinical'
  },
  {
    id: 'pediatrics',
    nameAr: 'طب الأطفال',
    nameEn: 'Pediatrics',
    descriptionAr: 'تعزيز صحة الطفل من خلال الإرشاد والفحص والتطعيم والمتابعة',
    descriptionEn: 'Child health through counseling, screening, immunization, and monitoring',
    category: 'clinical'
  },
  {
    id: 'acute_care',
    nameAr: 'الرعاية الحادة',
    nameEn: 'Acute Care',
    descriptionAr: 'علاج الأمراض الحادة الشائعة والإصابات البسيطة',
    descriptionEn: 'Treatment of common acute illnesses and minor injuries',
    category: 'clinical'
  },
  {
    id: 'geriatrics',
    nameAr: 'طب الشيخوخة',
    nameEn: 'Geriatrics',
    descriptionAr: 'رعاية كبار السن وتقييم مخاطر السقوط والصحة النفسية',
    descriptionEn: 'Care for older adults including fall risk assessment and mental health',
    category: 'clinical'
  },
  {
    id: 'dental',
    nameAr: 'الرعاية الأسنان',
    nameEn: 'Dental Care',
    descriptionAr: 'التثقيف بصحة الفم والفحوصات الأساسية وتنظيف الأسنان',
    descriptionEn: 'Oral health education, basic examinations, and dental cleaning',
    category: 'clinical'
  },
  // Prevention & Wellness
  {
    id: 'screenings',
    nameAr: 'الفحوصات الوقائية',
    nameEn: 'Health Screenings',
    descriptionAr: 'فحوصات روتينية لضغط الدم والكوليسترول وفحوصات السرطان',
    descriptionEn: 'Routine checkups including blood pressure, cholesterol, and cancer screenings',
    category: 'prevention'
  },
  {
    id: 'immunizations',
    nameAr: 'التطعيمات',
    nameEn: 'Immunizations',
    descriptionAr: 'توفير التطعيمات الموسمية وحملات التطعيم المستهدفة',
    descriptionEn: 'Seasonal vaccinations and targeted immunization campaigns',
    category: 'prevention'
  },
  {
    id: 'mental_health',
    nameAr: 'الصحة النفسية',
    nameEn: 'Mental Health',
    descriptionAr: 'فحص الأمراض النفسية وإدارة الحالات النفسية الشائعة',
    descriptionEn: 'Mental health screening and management of common psychiatric conditions',
    category: 'prevention'
  },
  {
    id: 'counseling',
    nameAr: 'الإرشاد الصحي',
    nameEn: 'Health Counseling',
    descriptionAr: 'إرشاد التغذية والنشاط البدني والإقلاع عن التدخين',
    descriptionEn: 'Nutrition, physical activity, and smoking cessation counseling',
    category: 'prevention'
  },
  // Population Health
  {
    id: 'chronic_tracking',
    nameAr: 'تتبع المرضى المزمنين',
    nameEn: 'Chronic Patient Tracking',
    descriptionAr: 'نظام لتتبع ومتابعة المرضى المصابين بأمراض مزمنة',
    descriptionEn: 'System to track and follow up patients with chronic conditions',
    category: 'population'
  },
  {
    id: 'care_plans',
    nameAr: 'خطط الرعاية الشخصية',
    nameEn: 'Personalized Care Plans',
    descriptionAr: 'خطط رعاية مخصصة للمرضى عالي المخاطر',
    descriptionEn: 'Personalized care plans for high-risk patients',
    category: 'population'
  },
  {
    id: 'risk_analytics',
    nameAr: 'تحليلات المخاطر',
    nameEn: 'Risk Analytics',
    descriptionAr: 'استخدام التحليلات لتصنيف المرضى حسب مستوى المخاطر',
    descriptionEn: 'Analytics to segment patients based on health risk profiles',
    category: 'population'
  },
  // Ancillary Services
  {
    id: 'laboratory',
    nameAr: 'خدمات المختبر',
    nameEn: 'Laboratory Services',
    descriptionAr: 'جمع العينات داخل المركز أو في المنزل',
    descriptionEn: 'In-house or home sample collection with laboratory analysis',
    category: 'ancillary'
  },
  {
    id: 'radiology',
    nameAr: 'خدمات الأشعة',
    nameEn: 'Radiology Services',
    descriptionAr: 'خدمات الأشعة الأساسية داخل المركز',
    descriptionEn: 'Basic radiology services within the facility',
    category: 'ancillary'
  },
  {
    id: 'pharmacy',
    nameAr: 'خدمات الصيدلية',
    nameEn: 'Pharmacy Services',
    descriptionAr: 'صيدلية داخل المركز أو خدمة توصيل الأدوية',
    descriptionEn: 'In-house pharmacy or medication delivery service',
    category: 'ancillary'
  }
];

export const classificationCriteria: ClassificationCriteria[] = [
  // Scope of Services - Must Have
  { id: 's1_1', nameAr: 'إدارة الأمراض المزمنة', nameEn: 'Chronic Care Management', descriptionAr: 'تقديم خدمات إدارة الأمراض المزمنة', descriptionEn: 'Provides chronic care management', domain: 'services', isMustHave: true, points: 0, evidenceAr: 'نطاق الخدمات المقدمة', evidenceEn: 'Provider scope of services' },
  { id: 's1_2', nameAr: 'صحة المرأة', nameEn: "Women's Health", descriptionAr: 'تقديم خدمات صحة المرأة', descriptionEn: "Provides women's health services", domain: 'services', isMustHave: true, points: 0, evidenceAr: 'نطاق الخدمات المقدمة', evidenceEn: 'Provider scope of services' },
  { id: 's1_3', nameAr: 'طب الأطفال', nameEn: 'Pediatrics', descriptionAr: 'تقديم خدمات طب الأطفال', descriptionEn: 'Provides pediatric services', domain: 'services', isMustHave: true, points: 0, evidenceAr: 'نطاق الخدمات المقدمة', evidenceEn: 'Provider scope of services' },
  { id: 's1_4', nameAr: 'الرعاية الحادة', nameEn: 'Acute Care', descriptionAr: 'تقديم الرعاية للحالات الحادة', descriptionEn: 'Provides acute care', domain: 'services', isMustHave: true, points: 0, evidenceAr: 'نطاق الخدمات المقدمة', evidenceEn: 'Provider scope of services' },
  { id: 's2_1', nameAr: 'الفحوصات الوقائية', nameEn: 'Health Screenings', descriptionAr: 'تقديم الفحوصات الوقائية والروتينية', descriptionEn: 'Provides health prevention screenings', domain: 'services', isMustHave: true, points: 0, evidenceAr: 'نطاق الخدمات المقدمة', evidenceEn: 'Provider scope of services' },
  { id: 's2_2', nameAr: 'التطعيمات', nameEn: 'Immunizations', descriptionAr: 'ترتيب وتقديم التطعيمات', descriptionEn: 'Arranges and delivers immunization', domain: 'services', isMustHave: true, points: 0, evidenceAr: 'برنامج التطعيم', evidenceEn: 'Immunization program' },
  { id: 's2_3', nameAr: 'الصحة النفسية', nameEn: 'Mental Health', descriptionAr: 'تقديم خدمات الصحة النفسية', descriptionEn: 'Provides mental health services', domain: 'services', isMustHave: true, points: 0, evidenceAr: 'نطاق الخدمات المقدمة', evidenceEn: 'Provider scope of services' },
  { id: 's2_4', nameAr: 'الإرشاد الصحي الشامل', nameEn: 'Holistic Counseling', descriptionAr: 'تقديم الإرشاد الصحي (تغذية، نشاط بدني، إقلاع عن التدخين)', descriptionEn: 'Provides holistic counseling (nutrition, physical activity, smoking cessation)', domain: 'services', isMustHave: true, points: 0, evidenceAr: 'نطاق الخدمات المقدمة', evidenceEn: 'Provider scope of services' },
  // Scope of Services - Weighted
  { id: 's1_5', nameAr: 'طب الشيخوخة', nameEn: 'Geriatrics Care', descriptionAr: 'تقديم رعاية كبار السن', descriptionEn: 'Provides geriatric care', domain: 'services', isMustHave: false, points: 5, evidenceAr: 'نطاق الخدمات المقدمة', evidenceEn: 'Provider scope of services' },
  { id: 's1_6', nameAr: 'رعاية الأسنان', nameEn: 'Dental Care', descriptionAr: 'تقديم رعاية صحة الفم والأسنان', descriptionEn: 'Provides dental care', domain: 'services', isMustHave: false, points: 5, evidenceAr: 'نطاق الخدمات المقدمة', evidenceEn: 'Provider scope of services' },
  { id: 's3_1', nameAr: 'تتبع المرضى المزمنين', nameEn: 'Chronic Patient Tracking', descriptionAr: 'نظام لتتبع المرضى المزمنين', descriptionEn: 'Process to track patients with chronic conditions', domain: 'services', isMustHave: false, points: 5, evidenceAr: 'نطاق الخدمات المقدمة', evidenceEn: 'Provider scope of services' },
  { id: 's3_2', nameAr: 'خطط الرعاية الشخصية', nameEn: 'Personalized Care Plans', descriptionAr: 'خطط رعاية مخصصة للمرضى عالي المخاطر', descriptionEn: 'Personalized care plans for high-risk patients', domain: 'services', isMustHave: false, points: 10, evidenceAr: 'نطاق الخدمات المقدمة', evidenceEn: 'Provider scope of services' },
  { id: 's3_3', nameAr: 'تحليلات تصنيف المخاطر', nameEn: 'Risk Segmentation Analytics', descriptionAr: 'استخدام التحليلات لتصنيف المرضى حسب المخاطر', descriptionEn: 'Analytics to segment patients based on risk', domain: 'services', isMustHave: false, points: 15, evidenceAr: 'سياسات وإجراءات إدارة صحة السكان', evidenceEn: 'Population health management policies' },
  { id: 's4_1', nameAr: 'خدمات المختبر', nameEn: 'Laboratory Services', descriptionAr: 'جمع العينات داخل المركز', descriptionEn: 'In-house sample collection', domain: 'services', isMustHave: false, points: 5, evidenceAr: 'نطاق الخدمات المقدمة', evidenceEn: 'Provider scope of services' },
  { id: 's4_2', nameAr: 'خدمات الأشعة', nameEn: 'Radiology Services', descriptionAr: 'خدمات الأشعة داخل المركز', descriptionEn: 'In-house radiology', domain: 'services', isMustHave: false, points: 10, evidenceAr: 'نطاق الخدمات المقدمة', evidenceEn: 'Provider scope of services' },
  { id: 's4_3', nameAr: 'الصيدلية', nameEn: 'Pharmacy', descriptionAr: 'صيدلية داخل المركز', descriptionEn: 'In-house pharmacy', domain: 'services', isMustHave: false, points: 10, evidenceAr: 'نطاق الخدمات المقدمة', evidenceEn: 'Provider scope of services' },
  // Workforce - Must Have
  { id: 'w1_1', nameAr: 'طبيب طب الأسرة', nameEn: 'Family Medicine Physician', descriptionAr: 'توظيف طبيب طب أسرة معتمد', descriptionEn: 'Employs family medicine physician', domain: 'workforce', isMustHave: true, points: 0, evidenceAr: 'الهيكل التنظيمي / إثبات التوظيف', evidenceEn: 'Organizational chart / Proof of employment' },
  { id: 'w1_5', nameAr: 'الممرضات', nameEn: 'Nurses', descriptionAr: 'توظيف ممرضات مؤهلات', descriptionEn: 'Employs qualified nurses', domain: 'workforce', isMustHave: true, points: 0, evidenceAr: 'الهيكل التنظيمي / إثبات التوظيف', evidenceEn: 'Organizational chart / Proof of employment' },
  // Workforce - Weighted
  { id: 'w1_2', nameAr: 'طبيب باطنية عام', nameEn: 'General Internal Medicine Physician', descriptionAr: 'توظيف طبيب باطنية عام', descriptionEn: 'Employs general internal medicine physician', domain: 'workforce', isMustHave: false, points: 10, evidenceAr: 'الهيكل التنظيمي', evidenceEn: 'Organizational chart' },
  { id: 'w1_3', nameAr: 'طبيب نساء وولادة', nameEn: 'General ObGyn Physician', descriptionAr: 'توظيف طبيب نساء وولادة', descriptionEn: 'Employs general ObGyn physician', domain: 'workforce', isMustHave: false, points: 10, evidenceAr: 'الهيكل التنظيمي', evidenceEn: 'Organizational chart' },
  { id: 'w1_4', nameAr: 'طبيب أطفال', nameEn: 'General Pediatrics Physician', descriptionAr: 'توظيف طبيب أطفال عام', descriptionEn: 'Employs general pediatrics physician', domain: 'workforce', isMustHave: false, points: 10, evidenceAr: 'الهيكل التنظيمي', evidenceEn: 'Organizational chart' },
  { id: 'w1_6', nameAr: 'مثقفين صحيين', nameEn: 'Health Coaches & Educators', descriptionAr: 'توظيف مثقفين صحيين', descriptionEn: 'Employs health coaches and educators', domain: 'workforce', isMustHave: false, points: 10, evidenceAr: 'الهيكل التنظيمي', evidenceEn: 'Organizational chart' },
  { id: 'w1_7', nameAr: 'منسقي الرعاية', nameEn: 'Care Coordinators', descriptionAr: 'توظيف منسقي رعاية', descriptionEn: 'Employs care coordinators', domain: 'workforce', isMustHave: false, points: 5, evidenceAr: 'الهيكل التنظيمي', evidenceEn: 'Organizational chart' },
  { id: 'w1_8', nameAr: 'أخصائي تغذية', nameEn: 'Clinical Dietitian', descriptionAr: 'توظيف أخصائي تغذية إكلينيكية', descriptionEn: 'Employs clinical dietitian', domain: 'workforce', isMustHave: false, points: 5, evidenceAr: 'الهيكل التنظيمي', evidenceEn: 'Organizational chart' },
  { id: 'w1_9', nameAr: 'أخصائي نفسي', nameEn: 'Psychologist', descriptionAr: 'توظيف أخصائي نفسي', descriptionEn: 'Employs psychologist', domain: 'workforce', isMustHave: false, points: 5, evidenceAr: 'الهيكل التنظيمي', evidenceEn: 'Organizational chart' },
  { id: 'w2_1', nameAr: 'التعليم المستمر', nameEn: 'Continuous Education', descriptionAr: 'توفير برامج تدريب وتعليم مستمر', descriptionEn: 'Provides continuous education programs', domain: 'workforce', isMustHave: false, points: 10, evidenceAr: 'إثبات البرامج / الشهادات', evidenceEn: 'Proof of programs / certifications' },
  // Technology - Must Have
  { id: 't1_1', nameAr: 'السجلات الطبية', nameEn: 'Medical Records', descriptionAr: 'تسجيل وحفظ السجلات الطبية', descriptionEn: 'Records and stores medical records', domain: 'technology', isMustHave: true, points: 0, evidenceAr: 'نموذج من السجلات الطبية', evidenceEn: 'Sample from medical records' },
  { id: 't1_2', nameAr: 'حماية البيانات', nameEn: 'Data Protection', descriptionAr: 'نظام حماية بيانات المرضى', descriptionEn: 'Data protection system for patient information', domain: 'technology', isMustHave: true, points: 0, evidenceAr: 'سياسات حماية البيانات', evidenceEn: 'Data protection policies' },
  // Technology - Weighted
  { id: 't1_1_e', nameAr: 'سجلات طبية إلكترونية', nameEn: 'Electronic Medical Records', descriptionAr: 'سجلات طبية إلكترونية كاملة', descriptionEn: 'Full electronic medical records', domain: 'technology', isMustHave: false, points: 10, evidenceAr: 'نموذج من السجلات الإلكترونية', evidenceEn: 'Sample from EMR' },
  { id: 't2_1', nameAr: 'الاستشارات عن بعد', nameEn: 'Virtual Consultations', descriptionAr: 'تقديم استشارات عن بعد (هاتف / فيديو)', descriptionEn: 'Provides virtual consultations (phone/video)', domain: 'technology', isMustHave: false, points: 10, evidenceAr: 'إثبات المنصة', evidenceEn: 'Proof of platform' },
  { id: 't2_2', nameAr: 'بوابة المريض', nameEn: 'Patient Portal', descriptionAr: 'السماح للمرضى بالوصول لسجلاتهم', descriptionEn: 'Allows patients to view health records', domain: 'technology', isMustHave: false, points: 10, evidenceAr: 'إثبات المنصة', evidenceEn: 'Proof of platform' },
  { id: 't2_3', nameAr: 'حجز المواعيد إلكترونياً', nameEn: 'Online Appointment Booking', descriptionAr: 'حجز المواعيد عبر التطبيق أو الموقع', descriptionEn: 'Appointment scheduling through app/website', domain: 'technology', isMustHave: false, points: 10, evidenceAr: 'إثبات المنصة', evidenceEn: 'Proof of platform' },
  { id: 't3_1', nameAr: 'طلب الأدوية إلكترونياً', nameEn: 'Online Medication Refills', descriptionAr: 'طلب إعادة صرف الأدوية إلكترونياً', descriptionEn: 'Request medication refills online', domain: 'technology', isMustHave: false, points: 5, evidenceAr: 'إثبات الخدمة', evidenceEn: 'Proof of service' },
  { id: 't3_2', nameAr: 'أجهزة المراقبة المنزلية', nameEn: 'Home Monitoring Devices', descriptionAr: 'توفير أجهزة مراقبة صحية للمنزل', descriptionEn: 'Provides health monitoring devices', domain: 'technology', isMustHave: false, points: 10, evidenceAr: 'نطاق الخدمات', evidenceEn: 'Provider scope' },
  // Quality & Access - Must Have
  { id: 'q2_1', nameAr: 'التثقيف الصحي', nameEn: 'Health Education', descriptionAr: 'تقديم برامج التثقيف الصحي', descriptionEn: 'Provides health education programs', domain: 'quality', isMustHave: true, points: 0, evidenceAr: 'برنامج التثقيف الصحي', evidenceEn: 'Health education program' },
  { id: 'q3_1', nameAr: 'مراقبة الجودة', nameEn: 'Quality Monitoring', descriptionAr: 'مراقبة مؤشرات الجودة والأداء', descriptionEn: 'Monitors quality metrics', domain: 'quality', isMustHave: true, points: 0, evidenceAr: 'قائمة المؤشرات', evidenceEn: 'List of key indicators' },
  // Quality & Access - Weighted
  { id: 'q1_1', nameAr: 'خدمة 24/7', nameEn: '24/7 Access', descriptionAr: 'توفير وصول للفريق الطبي على مدار الساعة', descriptionEn: 'Provides 24/7 access to medical team', domain: 'quality', isMustHave: false, points: 15, evidenceAr: 'ساعات العمل الرسمية', evidenceEn: 'Official opening hours' },
  { id: 'q2_2', nameAr: 'برامج المجتمع', nameEn: 'Community Outreach', descriptionAr: 'المشاركة في مبادرات التوعية المجتمعية', descriptionEn: 'Engages in community outreach initiatives', domain: 'quality', isMustHave: false, points: 10, evidenceAr: 'برنامج الخدمة المجتمعية', evidenceEn: 'Community service program' },
];

export const copaymentStructure: CopaymentInfo[] = [
  {
    providerType: 'primary_a_plus',
    nameAr: 'مقدم رعاية أولية معتمد (A+)',
    nameEn: 'Accredited Primary Care Provider (A+)',
    copaymentPercentage: 0,
    descriptionAr: 'بدون نسبة تحمل - المريض لا يدفع أي مبلغ عند زيارة مقدم الرعاية الأولية المعتمد من الفئة A+',
    descriptionEn: 'No copayment - Patient pays nothing when visiting A+ accredited primary care provider'
  },
  {
    providerType: 'primary_a',
    nameAr: 'مقدم رعاية أولية معتمد (A)',
    nameEn: 'Accredited Primary Care Provider (A)',
    copaymentPercentage: 0,
    descriptionAr: 'بدون نسبة تحمل أو نسبة مخفضة - تشجيع المرضى على استخدام الرعاية الأولية',
    descriptionEn: 'No or reduced copayment - Encouraging patients to use primary care'
  },
  {
    providerType: 'specialist',
    nameAr: 'الرعاية التخصصية المباشرة',
    nameEn: 'Direct Specialist Care',
    copaymentPercentage: 20,
    descriptionAr: 'نسبة تحمل 20% عند الذهاب مباشرة للرعاية التخصصية دون تحويل من الرعاية الأولية',
    descriptionEn: '20% copayment when going directly to specialist care without primary care referral'
  },
  {
    providerType: 'emergency',
    nameAr: 'الطوارئ',
    nameEn: 'Emergency Care',
    copaymentPercentage: 0,
    descriptionAr: 'بدون نسبة تحمل للحالات الطارئة الحقيقية',
    descriptionEn: 'No copayment for true emergency cases'
  }
];

export const classificationScoring = {
  services: { minA: 0, maxA: 55, minAPlus: 60, maxAPlus: 120 },
  workforce: { minA: 0, maxA: 35, minAPlus: 40, maxAPlus: 80 },
  technology: { minA: 0, maxA: 45, minAPlus: 50, maxAPlus: 100 },
  quality: { minA: 0, maxA: 10, minAPlus: 15, maxAPlus: 25 }
};

export const getCriteriaByDomain = (domain: ClassificationCriteria['domain']) => {
  return classificationCriteria.filter(c => c.domain === domain);
};

export const calculateClassification = (selectedCriteria: string[]): {
  services: { score: number; passedMustHave: boolean; classification: string };
  workforce: { score: number; passedMustHave: boolean; classification: string };
  technology: { score: number; passedMustHave: boolean; classification: string };
  quality: { score: number; passedMustHave: boolean; classification: string };
  overall: string;
} => {
  const domains: Array<ClassificationCriteria['domain']> = ['services', 'workforce', 'technology', 'quality'];
  
  const results: Record<string, { score: number; passedMustHave: boolean; classification: string }> = {};
  
  domains.forEach(domain => {
    const domainCriteria = classificationCriteria.filter(c => c.domain === domain);
    const mustHaveCriteria = domainCriteria.filter(c => c.isMustHave);
    const weightedCriteria = domainCriteria.filter(c => !c.isMustHave);
    
    const passedMustHave = mustHaveCriteria.every(c => selectedCriteria.includes(c.id));
    const score = weightedCriteria
      .filter(c => selectedCriteria.includes(c.id))
      .reduce((sum, c) => sum + c.points, 0);
    
    const scoring = classificationScoring[domain];
    let classification = 'غير مؤهل / Not Eligible';
    
    if (passedMustHave) {
      if (score >= scoring.minAPlus) {
        classification = 'A+';
      } else {
        classification = 'A';
      }
    }
    
    results[domain] = { score, passedMustHave, classification };
  });
  
  // Overall classification
  const allPassed = Object.values(results).every(r => r.passedMustHave);
  const allAPlus = Object.values(results).every(r => r.classification === 'A+');
  
  let overall = 'غير مؤهل للتصنيف / Not Eligible';
  if (allPassed) {
    overall = allAPlus ? 'A+' : 'A';
  }
  
  return {
    services: results.services,
    workforce: results.workforce,
    technology: results.technology,
    quality: results.quality,
    overall
  };
};
