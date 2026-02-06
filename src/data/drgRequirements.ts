export interface DRGRequirement {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  mandatory: boolean;
  category: 'provider' | 'payer' | 'rcm' | 'physician' | 'coder' | 'cds';
}

export const providerRequirements: DRGRequirement[] = [
  {
    id: 'drg-ready-his',
    nameAr: 'نظام معلومات صحي جاهز للحزم التشخيصية',
    nameEn: 'DRG-ready HIS',
    descriptionAr: 'نظام معلومات صحي يدعم حقول وأكواد الحزم التشخيصية ونظام التجميع',
    descriptionEn: 'HIS that supports DRG fields, codes, and grouping system integration',
    mandatory: true,
    category: 'provider'
  },
  {
    id: 'grouping-software',
    nameAr: 'برنامج التجميع (Grouper)',
    nameEn: 'Grouping Software (Grouper)',
    descriptionAr: 'برنامج تجميع AR-DRG معتمد من مجلس الضمان الصحي (CHI). يقوم هذا البرنامج بتحليل أكواد التشخيص (ICD-10-AM) والإجراءات (SBS) وبيانات المريض لتحديد الحزمة التشخيصية المناسبة والوزن النسبي. يجب أن يكون البرنامج محدثاً وفق أحدث إصدار من منطق التجميع المعتمد',
    descriptionEn: 'CHI-approved AR-DRG grouper software. This system analyzes diagnosis codes (ICD-10-AM), procedure codes (SBS), and patient data to assign the appropriate DRG and relative weight. Must be updated to the latest CHI-approved grouping logic version',
    mandatory: true,
    category: 'provider'
  },
  {
    id: 'certified-coders',
    nameAr: 'مرمزون معتمدون',
    nameEn: 'Certified Coders',
    descriptionAr: 'مرمزون معتمدون بشهادات ICD-10-AM و ACS و SBS ومعايير الترميز',
    descriptionEn: 'Adequate certified coders with ICD-10-AM, ACS, SBS, and SBS Coding Standards Certification',
    mandatory: true,
    category: 'provider'
  },
  {
    id: 'coding-audits',
    nameAr: 'تدقيق الترميز',
    nameEn: 'Coding Audits',
    descriptionAr: 'إجراء تدقيق داخلي وخارجي لضمان جودة البيانات',
    descriptionEn: 'Conduct internal and external audits to ensure data quality',
    mandatory: true,
    category: 'provider'
  },
  {
    id: 'nphies-integration',
    nameAr: 'التكامل مع نفيس',
    nameEn: 'NPHIES Integration',
    descriptionAr: 'مواءمة تقديم المطالبات مع المعايير الوطنية والتبادل الإلكتروني',
    descriptionEn: 'Align claim submission to national standards and electronic exchange',
    mandatory: true,
    category: 'provider'
  },
  {
    id: 'drg-contracting',
    nameAr: 'التعاقد بالحزم التشخيصية',
    nameEn: 'DRG Contracting',
    descriptionAr: 'عملية الدفع والتسوية المبنية على الحزم التشخيصية',
    descriptionEn: 'DRG-based payment and reconciliation process',
    mandatory: true,
    category: 'provider'
  },
  {
    id: 'staff-training',
    nameAr: 'تدريب الموظفين',
    nameEn: 'Staff Training',
    descriptionAr: 'جلسات تدريبية منتظمة على الحزم التشخيصية والترميز',
    descriptionEn: 'Regular DRG and coding refresher sessions',
    mandatory: true,
    category: 'provider'
  },
  {
    id: 'cdi-program',
    nameAr: 'برنامج تحسين التوثيق السريري',
    nameEn: 'CDI Program',
    descriptionAr: 'تحسين دقة التوثيق من خلال التعاون بين الطبيب والمرمز',
    descriptionEn: 'Improve documentation accuracy through physician–coder collaboration',
    mandatory: true,
    category: 'provider'
  },
  {
    id: 'case-mix-index',
    nameAr: 'مؤشر مزيج الحالات (CMI)',
    nameEn: 'Case Mix Index (CMI)',
    descriptionAr: 'مؤشر يقيس متوسط تعقيد الحالات في المنشأة الصحية. يُحسب بقسمة مجموع الأوزان النسبية لجميع الحالات على عدد الحالات. CMI أعلى يعني حالات أكثر تعقيداً وتكلفة. يُستخدم لـ: (1) مقارنة أداء المستشفيات، (2) التخطيط المالي والميزانيات، (3) تحليل اتجاهات الخدمات، (4) مراقبة جودة الترميز',
    descriptionEn: 'Index measuring the average complexity of cases in a healthcare facility. Calculated by dividing total relative weights by number of cases. Higher CMI indicates more complex and costly cases. Used for: (1) Hospital benchmarking, (2) Financial planning, (3) Service trend analysis, (4) Coding quality monitoring',
    mandatory: true,
    category: 'provider'
  },
  {
    id: 'quality-tracking',
    nameAr: 'تتبع الجودة والنتائج',
    nameEn: 'Quality and Outcome Tracking',
    descriptionAr: 'قياس مدة الإقامة وإعادة الدخول ومؤشرات الجودة لكل حزمة',
    descriptionEn: 'Measure LOS, readmissions, and quality KPIs per DRG',
    mandatory: true,
    category: 'provider'
  }
];

export const payerRequirements: DRGRequirement[] = [
  {
    id: 'drg-validation',
    nameAr: 'التحقق من الحزم التشخيصية',
    nameEn: 'DRG Validation',
    descriptionAr: 'استخدام نظام تجميع AR-DRG معتمد وقواعد التحقق لفحص مطالبات مقدمي الخدمة',
    descriptionEn: 'Use of a certified AR-DRG grouper and validation rules to check provider claims',
    mandatory: true,
    category: 'payer'
  },
  {
    id: 'coding-standards-adoption',
    nameAr: 'تبني معايير الترميز',
    nameEn: 'Coding Standards Adoption',
    descriptionAr: 'التحقق من ترميز ICD-10-AM/SBS وفق معايير ACS و SBSCS',
    descriptionEn: 'Validate ICD-10-AM/SBS coding per ACS and SBSCS conventions',
    mandatory: true,
    category: 'payer'
  },
  {
    id: 'claim-adjudication',
    nameAr: 'فصل المطالبات',
    nameEn: 'Claim Adjudication',
    descriptionAr: 'تطبيق السداد بناءً على الحزم التشخيصية المجمعة وليس البنود الفردية',
    descriptionEn: 'Apply reimbursement based on grouped DRGs, not line items',
    mandatory: true,
    category: 'payer'
  },
  {
    id: 'audit-reconciliation',
    nameAr: 'التدقيق والتسوية',
    nameEn: 'Audit & Reconciliation',
    descriptionAr: 'مراجعة الفروقات وحل النزاعات مع مقدمي الخدمة',
    descriptionEn: 'Review variances and resolve disputes with providers',
    mandatory: true,
    category: 'payer'
  },
  {
    id: 'contracting-framework',
    nameAr: 'إطار التعاقد',
    nameEn: 'Contracting Framework',
    descriptionAr: 'تطبيق التسعير المبني على الحزم التشخيصية والأسعار المعدلة حسب مزيج الحالات',
    descriptionEn: 'Implement DRG-based pricing and case-mix adjusted rates',
    mandatory: true,
    category: 'payer'
  },
  {
    id: 'analytics-benchmarking',
    nameAr: 'التحليلات والمقارنة المرجعية',
    nameEn: 'Analytics & Benchmarking',
    descriptionAr: 'مقارنة اتجاهات التكلفة والنتائج للحزم التشخيصية بين مقدمي الخدمة',
    descriptionEn: 'Compare DRG cost/outcome trends across providers',
    mandatory: true,
    category: 'payer'
  },
  {
    id: 'training-knowledge',
    nameAr: 'التدريب ومشاركة المعرفة',
    nameEn: 'Training & Knowledge Sharing',
    descriptionAr: 'تثقيف موظفي المطالبات والطب حول منطق الحزم التشخيصية',
    descriptionEn: 'Educate claims and medical staff on DRG logic',
    mandatory: true,
    category: 'payer'
  }
];

export const coderRequirements: DRGRequirement[] = [
  {
    id: 'mastery-coding',
    nameAr: 'إتقان معايير الترميز',
    nameEn: 'Mastery of ICD-10-AM, SBS & ACS',
    descriptionAr: 'تطبيق معايير الترميز الصحيحة وفق قواعد AR-DRG',
    descriptionEn: 'Apply correct coding standards and conventions per AR-DRG rules',
    mandatory: true,
    category: 'coder'
  },
  {
    id: 'grouping-software-use',
    nameAr: 'استخدام برنامج التجميع',
    nameEn: 'Use of Grouping Software',
    descriptionAr: 'التحقق من تعيين الحزمة التشخيصية والتحقق من التناقضات',
    descriptionEn: 'Validate DRG assignment and check for discrepancies',
    mandatory: true,
    category: 'coder'
  },
  {
    id: 'documentation-review',
    nameAr: 'مراجعة التوثيق',
    nameEn: 'Documentation Review',
    descriptionAr: 'تقييم اكتمال ودقة توثيق الطبيب قبل الترميز',
    descriptionEn: 'Assess completeness and accuracy of physician documentation before coding',
    mandatory: true,
    category: 'coder'
  },
  {
    id: 'coding-quality-audits',
    nameAr: 'تدقيق جودة الترميز',
    nameEn: 'Coding Quality Audits',
    descriptionAr: 'المشاركة في التدقيق الداخلي للحفاظ على دقة أعلى من 95%',
    descriptionEn: 'Participate in peer and internal audits to maintain accuracy >95%',
    mandatory: true,
    category: 'coder'
  },
  {
    id: 'continuous-education',
    nameAr: 'التعليم المستمر',
    nameEn: 'Continuous Education',
    descriptionAr: 'حضور ورش العمل والتحديثات على الحزم التشخيصية ومتطلبات نفيس',
    descriptionEn: 'Attend workshops and updates on DRG, ACS revisions, and NPHIES requirements',
    mandatory: true,
    category: 'coder'
  },
  {
    id: 'drg-logic-understanding',
    nameAr: 'فهم منطق الحزم التشخيصية',
    nameEn: 'Understanding DRG Logic',
    descriptionAr: 'معرفة كيف تؤثر التشخيصات والإجراءات على التجميع ومؤشر CMI والإيرادات',
    descriptionEn: 'Know how diagnoses/procedures affect DRG grouping, CMI, and revenue',
    mandatory: true,
    category: 'coder'
  },
  {
    id: 'query-generation',
    nameAr: 'إنشاء الاستعلامات',
    nameEn: 'Query Generation',
    descriptionAr: 'رفع استعلامات الترميز عندما تكون المعلومات غير مكتملة أو غامضة',
    descriptionEn: 'Raise coding queries when information is incomplete or ambiguous',
    mandatory: true,
    category: 'coder'
  },
  {
    id: 'data-validation',
    nameAr: 'التحقق من البيانات',
    nameEn: 'Data Validation',
    descriptionAr: 'مراجعة البيانات المرمزة مقابل السجلات السريرية والفواتير',
    descriptionEn: 'Cross-check coded data against clinical and billing records for integrity',
    mandatory: true,
    category: 'coder'
  },
  {
    id: 'ethical-compliance',
    nameAr: 'الامتثال الأخلاقي',
    nameEn: 'Ethical Compliance',
    descriptionAr: 'الحفاظ على سرية البيانات وأخلاقيات الترميز',
    descriptionEn: 'Maintain data confidentiality and coding ethics',
    mandatory: true,
    category: 'coder'
  }
];

export const physicianRequirements: DRGRequirement[] = [
  {
    id: 'accurate-documentation',
    nameAr: 'التوثيق الدقيق',
    nameEn: 'Accurate Documentation',
    descriptionAr: 'توفير توثيق واضح وكامل ومحدد للتشخيصات والإجراءات',
    descriptionEn: 'Provide clear, complete, and specific diagnoses and procedures documentation',
    mandatory: true,
    category: 'physician'
  },
  {
    id: 'drg-impact-awareness',
    nameAr: 'الوعي بتأثير الحزم التشخيصية',
    nameEn: 'Awareness of DRG Impact',
    descriptionAr: 'فهم كيف يؤثر التوثيق على السداد والجودة للمستشفى',
    descriptionEn: 'Understand how documentation affects hospital reimbursement and quality',
    mandatory: true,
    category: 'physician'
  },
  {
    id: 'discharge-summary-review',
    nameAr: 'مراجعة ملخص الخروج',
    nameEn: 'Review of Discharge Summaries',
    descriptionAr: 'التأكد من التقاط جميع التشخيصات والإجراءات قبل التوقيع',
    descriptionEn: 'Ensure all diagnoses/procedures are captured before sign-off',
    mandatory: true,
    category: 'physician'
  },
  {
    id: 'feedback-engagement',
    nameAr: 'المشاركة في التغذية الراجعة',
    nameEn: 'Engagement in Feedback',
    descriptionAr: 'التجاوب مع استعلامات التوثيق أو نتائج التدقيق',
    descriptionEn: 'Act on documentation queries or audit findings',
    mandatory: true,
    category: 'physician'
  },
  {
    id: 'physician-training',
    nameAr: 'التدريب المستمر',
    nameEn: 'Continuous Training',
    descriptionAr: 'حضور ورش عمل التوعية بالحزم التشخيصية والتوثيق',
    descriptionEn: 'Attend DRG awareness and documentation workshops',
    mandatory: true,
    category: 'physician'
  },
  {
    id: 'cdi-participation',
    nameAr: 'المشاركة في برنامج CDI',
    nameEn: 'Participation in CDI',
    descriptionAr: 'التعاون مع المرمزين لتحسين التوثيق',
    descriptionEn: 'Collaborate with coders for documentation improvement',
    mandatory: true,
    category: 'physician'
  }
];

export const cdsRequirements: DRGRequirement[] = [
  {
    id: 'clinical-coding-knowledge',
    nameAr: 'المعرفة السريرية والترميزية',
    nameEn: 'Clinical & Coding Knowledge',
    descriptionAr: 'امتلاك فهم قوي للعمليات المرضية وقواعد الترميز',
    descriptionEn: 'Possess strong understanding of disease processes and coding rules',
    mandatory: true,
    category: 'cds'
  },
  {
    id: 'cdi-program-lead',
    nameAr: 'قيادة برنامج تحسين التوثيق',
    nameEn: 'Documentation Improvement Program',
    descriptionAr: 'قيادة مبادرات CDI لتعزيز الوضوح والتخصيص واكتمال السجلات',
    descriptionEn: 'Lead CDI initiatives to enhance clarity, specificity, and completeness of records',
    mandatory: true,
    category: 'cds'
  },
  {
    id: 'physician-education',
    nameAr: 'تثقيف الأطباء',
    nameEn: 'Physician Education',
    descriptionAr: 'تدريب الأطباء على أفضل ممارسات التوثيق وتأثير الحزم التشخيصية',
    descriptionEn: 'Train clinicians on documentation best practices and DRG impact',
    mandatory: true,
    category: 'cds'
  },
  {
    id: 'query-management',
    nameAr: 'إدارة الاستعلامات',
    nameEn: 'Query Management',
    descriptionAr: 'تطوير استعلامات متوافقة وغير موجهة لتوضيح التشخيصات أو الإجراءات',
    descriptionEn: 'Develop compliant, non-leading queries to clarify diagnoses or procedures',
    mandatory: true,
    category: 'cds'
  },
  {
    id: 'cds-drg-awareness',
    nameAr: 'الوعي بالحزم التشخيصية',
    nameEn: 'DRG Awareness',
    descriptionAr: 'فهم منطق التجميع لتحديد فجوات التوثيق التي تؤثر على تعيين الحزمة',
    descriptionEn: 'Understand grouping logic to identify documentation gaps that affect DRG assignment',
    mandatory: true,
    category: 'cds'
  },
  {
    id: 'cds-audit-participation',
    nameAr: 'المشاركة في التدقيق',
    nameEn: 'Audit Participation',
    descriptionAr: 'مراجعة نتائج التدقيق لمعالجة أوجه القصور المتكررة في التوثيق',
    descriptionEn: 'Review audit results to address recurrent documentation deficiencies',
    mandatory: true,
    category: 'cds'
  },
  {
    id: 'coder-collaboration',
    nameAr: 'التعاون مع المرمزين',
    nameEn: 'Collaboration with Coders',
    descriptionAr: 'العمل كجسر بين الفرق السريرية وفرق الترميز',
    descriptionEn: 'Act as bridge between clinical and coding teams',
    mandatory: true,
    category: 'cds'
  },
  {
    id: 'performance-monitoring',
    nameAr: 'مراقبة الأداء',
    nameEn: 'Performance Monitoring',
    descriptionAr: 'تتبع مقاييس مثل معدل الاستجابة للاستعلامات ومشاركة الأطباء',
    descriptionEn: 'Track metrics like query response rate and physician engagement',
    mandatory: true,
    category: 'cds'
  }
];

export const drgBenefits = [
  {
    id: 'value-based',
    titleAr: 'الدفع المبني على القيمة',
    titleEn: 'Value-Based Payment',
    descriptionAr: 'التحول من الدفع مقابل الخدمة إلى الدفع المبني على النتائج والقيمة',
    descriptionEn: 'Transition from fee-for-service to outcome and value-based payment',
    icon: 'TrendingUp'
  },
  {
    id: 'inflation-control',
    titleAr: 'ضبط التضخم الصحي',
    titleEn: 'Control Healthcare Inflation',
    descriptionAr: 'السيطرة على ارتفاع تكاليف الرعاية الصحية من خلال التسعير الموحد',
    descriptionEn: 'Control rising healthcare costs through standardized pricing',
    icon: 'Shield'
  },
  {
    id: 'quality',
    titleAr: 'جودة الرعاية الصحية',
    titleEn: 'Healthcare Quality',
    descriptionAr: 'تحسين جودة الخدمات من خلال معايير موحدة ومؤشرات أداء',
    descriptionEn: 'Improve service quality through standardized criteria and performance indicators',
    icon: 'Award'
  },
  {
    id: 'rejections',
    titleAr: 'تقليل الرفض',
    titleEn: 'Reduce Rejections',
    descriptionAr: 'تقليل رفض المطالبات من خلال التوثيق والترميز الدقيق',
    descriptionEn: 'Reduce claim rejections through accurate documentation and coding',
    icon: 'CheckCircle'
  },
  {
    id: 'reporting',
    titleAr: 'تحسين التقارير',
    titleEn: 'Improve Reporting',
    descriptionAr: 'إنتاج تقارير دقيقة ومتسقة للتخطيط واتخاذ القرارات',
    descriptionEn: 'Produce accurate and consistent reports for planning and decision-making',
    icon: 'BarChart3'
  },
  {
    id: 'outcomes',
    titleAr: 'نتائج أفضل للمرضى',
    titleEn: 'Better Patient Outcomes',
    descriptionAr: 'تحسين النتائج الصحية من خلال رعاية موحدة وفعالة',
    descriptionEn: 'Improve health outcomes through standardized and efficient care',
    icon: 'Heart'
  },
  {
    id: 'resources',
    titleAr: 'توزيع الموارد والتخطيط',
    titleEn: 'Resources Allocation & Planning',
    descriptionAr: 'تحسين توزيع الموارد والتخطيط بناءً على بيانات دقيقة',
    descriptionEn: 'Optimize resource allocation and planning based on accurate data',
    icon: 'Target'
  }
];

export type ReadinessCategory = 'provider' | 'payer' | 'coder' | 'physician' | 'cds';

export function getRequirementsByCategory(category: ReadinessCategory): DRGRequirement[] {
  switch (category) {
    case 'provider':
      return providerRequirements;
    case 'payer':
      return payerRequirements;
    case 'coder':
      return coderRequirements;
    case 'physician':
      return physicianRequirements;
    case 'cds':
      return cdsRequirements;
    default:
      return providerRequirements;
  }
}

export function calculateReadinessScore(completedItems: string[], category: ReadinessCategory): {
  score: number;
  total: number;
  percentage: number;
  level: 'low' | 'medium' | 'high' | 'ready';
} {
  const requirements = getRequirementsByCategory(category);
  const total = requirements.length;
  const score = completedItems.filter(id => requirements.some(r => r.id === id)).length;
  const percentage = Math.round((score / total) * 100);
  
  let level: 'low' | 'medium' | 'high' | 'ready';
  if (percentage >= 90) level = 'ready';
  else if (percentage >= 70) level = 'high';
  else if (percentage >= 50) level = 'medium';
  else level = 'low';
  
  return { score, total, percentage, level };
}
