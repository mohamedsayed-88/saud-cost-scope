export type CoverageType = 'chi_basic' | 'government' | 'not_covered';

export type BeneficiaryType = 'private_sector' | 'visitor_tourist' | 'umrah' | 'government_individual' | 'government_efficiency' | 'domestic_worker';

export interface BeneficiaryTypeInfo {
  type: BeneficiaryType;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  coverageTypes: CoverageType[];
  preventiveCovered: boolean;
  isIndividualPolicy?: boolean; // Flag for individual policies that have their own terms
}

export const beneficiaryTypes: BeneficiaryTypeInfo[] = [
  {
    type: 'private_sector',
    nameAr: 'موظف قطاع خاص',
    nameEn: 'Private Sector Employee',
    descriptionAr: 'موظف بشركة خاصة مؤمن عليه بوثيقة الضمان الصحي',
    descriptionEn: 'Employee in private company with CHI insurance',
    coverageTypes: ['chi_basic'],
    preventiveCovered: true
  },
  {
    type: 'visitor_tourist',
    nameAr: 'زائر أو سائح',
    nameEn: 'Visitor or Tourist',
    descriptionAr: 'حامل تأشيرة زيارة أو سياحة - الطوارئ فقط',
    descriptionEn: 'Visitor or tourist visa holder - Emergency only',
    coverageTypes: ['not_covered'],
    preventiveCovered: false
  },
  {
    type: 'umrah',
    nameAr: 'معتمر',
    nameEn: 'Umrah Pilgrim',
    descriptionAr: 'حامل تأشيرة عمرة - الطوارئ فقط',
    descriptionEn: 'Umrah visa holder - Emergency only',
    coverageTypes: ['not_covered'],
    preventiveCovered: false
  },
  {
    type: 'government_individual',
    nameAr: 'وثيقة فردية',
    nameEn: 'Individual Policy',
    descriptionAr: 'الوثائق الفردية لا تخضع لوثيقة المجلس ولها قوانين خاصة حسب اتفاق شركة التأمين مع صاحب الوثيقة',
    descriptionEn: 'Individual policies are not subject to CHI regulations and have their own terms per the agreement between the insurance company and policyholder',
    coverageTypes: ['chi_basic', 'government', 'not_covered'], // show all services
    preventiveCovered: true, // show eligibility section
    isIndividualPolicy: true // new flag to indicate special handling
  },
  {
    type: 'government_efficiency',
    nameAr: 'قطاع حكومي - هيئة كفاءة الإنفاق',
    nameEn: 'Government - Spending Efficiency',
    descriptionAr: 'موظف حكومي بوثيقة هيئة كفاءة الإنفاق',
    descriptionEn: 'Government employee under Spending Efficiency Authority',
    coverageTypes: ['government'],
    preventiveCovered: true
  },
  {
    type: 'domestic_worker',
    nameAr: 'عمالة منزلية',
    nameEn: 'Domestic Worker',
    descriptionAr: 'عامل منزلي مؤمن عليه من صاحب العمل',
    descriptionEn: 'Domestic worker insured by employer',
    coverageTypes: ['chi_basic'],
    preventiveCovered: true
  }
];

export interface PolicyCoverage {
  type: CoverageType;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
}

export const policyCoverages: PolicyCoverage[] = [
  {
    type: 'chi_basic',
    nameAr: 'وثيقة الضمان الصحي',
    nameEn: 'CHI Policy',
    descriptionAr: 'مغطاة بوثيقة مجلس الضمان الصحي للقطاع الخاص',
    descriptionEn: 'Covered by CHI policy for private sector'
  },
  {
    type: 'government',
    nameAr: 'الوثائق الحكومية',
    nameEn: 'Government Policies',
    descriptionAr: 'تخضع لوثيقة هيئة كفاءة الإنفاق والتغطية الحكومية',
    descriptionEn: 'Subject to Spending Efficiency Authority and government coverage'
  },
  {
    type: 'not_covered',
    nameAr: 'غير مغطاة بالتأمين الخاص',
    nameEn: 'Not Covered by Private Insurance',
    descriptionAr: 'غير مغطاة بوثيقة الضمان الصحي - مغطاة للسعوديين عبر وزارة الصحة',
    descriptionEn: 'Not covered by CHI policy - covered for Saudi nationals through MOH'
  }
];

export interface PreventiveService {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icd10Codes: string[];
  sbsCodes: string[];
  eligibility: {
    minAge?: number;
    maxAge?: number;
    gender?: 'male' | 'female' | 'all';
    conditions?: string[];
    frequency: string;
    frequencyEn: string;
  };
  category: 'screening' | 'vaccination' | 'counseling' | 'checkup';
  coverage: CoverageType;
  coverageNoteAr?: string;
  coverageNoteEn?: string;
}

export const preventiveServices: PreventiveService[] = [
  // Screenings - Covered by CHI Basic
  {
    id: 'diabetes-screening',
    nameAr: 'فحص السكري',
    nameEn: 'Diabetes Screening',
    descriptionAr: 'فحص مستوى السكر في الدم للكشف المبكر عن مرض السكري',
    descriptionEn: 'Blood glucose test for early detection of diabetes',
    icd10Codes: ['Z13.1', 'R73.09'],
    sbsCodes: ['82947', '82950', '82951'],
    eligibility: {
      minAge: 35,
      gender: 'all',
      conditions: ['obesity', 'family_history_diabetes', 'hypertension'],
      frequency: 'سنوياً',
      frequencyEn: 'Annually'
    },
    category: 'screening',
    coverage: 'chi_basic',
    coverageNoteAr: 'مغطى كجزء من الفحوصات الوقائية الأساسية',
    coverageNoteEn: 'Covered as part of basic preventive screenings'
  },
  {
    id: 'hypertension-screening',
    nameAr: 'فحص ضغط الدم',
    nameEn: 'Blood Pressure Screening',
    descriptionAr: 'قياس ضغط الدم للكشف عن ارتفاع ضغط الدم',
    descriptionEn: 'Blood pressure measurement to detect hypertension',
    icd10Codes: ['Z13.6', 'R03.0'],
    sbsCodes: ['99000'],
    eligibility: {
      minAge: 18,
      gender: 'all',
      frequency: 'سنوياً',
      frequencyEn: 'Annually'
    },
    category: 'screening',
    coverage: 'chi_basic',
    coverageNoteAr: 'مغطى ضمن زيارات الرعاية الأولية',
    coverageNoteEn: 'Covered within primary care visits'
  },
  {
    id: 'cholesterol-screening',
    nameAr: 'فحص الكوليسترول',
    nameEn: 'Cholesterol Screening',
    descriptionAr: 'فحص مستوى الدهون في الدم',
    descriptionEn: 'Lipid panel test for cardiovascular risk assessment',
    icd10Codes: ['Z13.220', 'E78.00'],
    sbsCodes: ['80061', '82465', '83718', '83721'],
    eligibility: {
      minAge: 20,
      gender: 'all',
      conditions: ['obesity', 'diabetes', 'family_history_heart'],
      frequency: 'كل 5 سنوات (سنوياً لمن لديهم عوامل خطر)',
      frequencyEn: 'Every 5 years (annually for high-risk)'
    },
    category: 'screening',
    coverage: 'chi_basic',
    coverageNoteAr: 'مغطى للفئات المعرضة للخطر',
    coverageNoteEn: 'Covered for at-risk populations'
  },
  {
    id: 'breast-cancer-screening',
    nameAr: 'فحص سرطان الثدي',
    nameEn: 'Breast Cancer Screening',
    descriptionAr: 'تصوير الثدي بالأشعة (الماموغرام) للكشف المبكر',
    descriptionEn: 'Mammography for early breast cancer detection',
    icd10Codes: ['Z12.31', 'Z12.39'],
    sbsCodes: ['77067', '77066', '77065'],
    eligibility: {
      minAge: 40,
      maxAge: 74,
      gender: 'female',
      conditions: ['family_history_breast_cancer'],
      frequency: 'كل سنتين',
      frequencyEn: 'Every 2 years'
    },
    category: 'screening',
    coverage: 'chi_basic',
    coverageNoteAr: 'مغطى للنساء من 40 سنة فأكثر',
    coverageNoteEn: 'Covered for women 40 years and older'
  },
  {
    id: 'cervical-cancer-screening',
    nameAr: 'فحص سرطان عنق الرحم',
    nameEn: 'Cervical Cancer Screening',
    descriptionAr: 'مسحة عنق الرحم (باب سمير) للكشف المبكر',
    descriptionEn: 'Pap smear test for early cervical cancer detection',
    icd10Codes: ['Z12.4', 'Z12.72'],
    sbsCodes: ['88141', '88142', '88143', '88175'],
    eligibility: {
      minAge: 21,
      maxAge: 65,
      gender: 'female',
      frequency: 'كل 3 سنوات',
      frequencyEn: 'Every 3 years'
    },
    category: 'screening',
    coverage: 'chi_basic',
    coverageNoteAr: 'مغطى للنساء المتزوجات',
    coverageNoteEn: 'Covered for married women'
  },
  {
    id: 'colorectal-cancer-screening',
    nameAr: 'فحص سرطان القولون',
    nameEn: 'Colorectal Cancer Screening',
    descriptionAr: 'فحص الدم الخفي في البراز أو المنظار للكشف المبكر',
    descriptionEn: 'Fecal occult blood test or colonoscopy for early detection',
    icd10Codes: ['Z12.11', 'Z12.12'],
    sbsCodes: ['82270', '82274', '45378', '45380'],
    eligibility: {
      minAge: 45,
      maxAge: 75,
      gender: 'all',
      conditions: ['family_history_colorectal'],
      frequency: 'سنوياً (FOBT) أو كل 10 سنوات (منظار)',
      frequencyEn: 'Annually (FOBT) or every 10 years (colonoscopy)'
    },
    category: 'screening',
    coverage: 'chi_basic',
    coverageNoteAr: 'FOBT مغطى، المنظار عند وجود عوامل خطر',
    coverageNoteEn: 'FOBT covered, colonoscopy with risk factors'
  },
  {
    id: 'prostate-screening',
    nameAr: 'فحص البروستاتا',
    nameEn: 'Prostate Cancer Screening',
    descriptionAr: 'فحص مستضد البروستاتا النوعي (PSA)',
    descriptionEn: 'PSA test for prostate cancer screening',
    icd10Codes: ['Z12.5'],
    sbsCodes: ['84153', '84154'],
    eligibility: {
      minAge: 50,
      maxAge: 70,
      gender: 'male',
      conditions: ['family_history_prostate'],
      frequency: 'سنوياً (بعد استشارة الطبيب)',
      frequencyEn: 'Annually (after physician consultation)'
    },
    category: 'screening',
    coverage: 'not_covered',
    coverageNoteAr: 'غير مغطى بالوثيقة - مغطى للسعوديين عبر وزارة الصحة',
    coverageNoteEn: 'Not covered by CHI - covered for Saudis through MOH'
  },
  {
    id: 'osteoporosis-screening',
    nameAr: 'فحص هشاشة العظام',
    nameEn: 'Osteoporosis Screening',
    descriptionAr: 'قياس كثافة العظام (DEXA)',
    descriptionEn: 'Bone density measurement (DEXA scan)',
    icd10Codes: ['Z13.820', 'M81.0'],
    sbsCodes: ['77080', '77081', '77085'],
    eligibility: {
      minAge: 65,
      gender: 'female',
      conditions: ['menopause', 'steroid_use'],
      frequency: 'كل سنتين',
      frequencyEn: 'Every 2 years'
    },
    category: 'screening',
    coverage: 'chi_basic',
    coverageNoteAr: 'مغطى للنساء بعد انقطاع الطمث',
    coverageNoteEn: 'Covered for postmenopausal women'
  },
  // Additional Screenings - Not covered
  {
    id: 'vision-screening',
    nameAr: 'فحص النظر',
    nameEn: 'Vision Screening',
    descriptionAr: 'فحص شامل للعين وحدة البصر',
    descriptionEn: 'Comprehensive eye exam and visual acuity test',
    icd10Codes: ['Z13.5', 'Z01.00'],
    sbsCodes: ['92002', '92004', '92012', '92014'],
    eligibility: {
      minAge: 40,
      gender: 'all',
      conditions: ['diabetes'],
      frequency: 'سنوياً لمرضى السكري، كل سنتين للآخرين',
      frequencyEn: 'Annually for diabetics, every 2 years for others'
    },
    category: 'screening',
    coverage: 'not_covered',
    coverageNoteAr: 'غير مغطى بالوثيقة - مغطى للسعوديين عبر وزارة الصحة',
    coverageNoteEn: 'Not covered by CHI - covered for Saudis through MOH'
  },
  {
    id: 'hearing-screening',
    nameAr: 'فحص السمع',
    nameEn: 'Hearing Screening',
    descriptionAr: 'فحص السمع واختبار قياس السمع',
    descriptionEn: 'Hearing test and audiometry',
    icd10Codes: ['Z13.5', 'Z01.10'],
    sbsCodes: ['92551', '92552', '92553'],
    eligibility: {
      minAge: 50,
      gender: 'all',
      conditions: ['elderly'],
      frequency: 'كل 3 سنوات',
      frequencyEn: 'Every 3 years'
    },
    category: 'screening',
    coverage: 'not_covered',
    coverageNoteAr: 'غير مغطى كفحص وقائي، مغطى عند وجود أعراض',
    coverageNoteEn: 'Not covered as preventive, covered when symptomatic'
  },
  {
    id: 'thyroid-screening',
    nameAr: 'فحص الغدة الدرقية',
    nameEn: 'Thyroid Screening',
    descriptionAr: 'فحص وظائف الغدة الدرقية (TSH)',
    descriptionEn: 'Thyroid function test (TSH)',
    icd10Codes: ['Z13.29', 'E03.9'],
    sbsCodes: ['84443', '84436', '84439'],
    eligibility: {
      minAge: 35,
      gender: 'all',
      conditions: ['family_history_thyroid'],
      frequency: 'كل 5 سنوات',
      frequencyEn: 'Every 5 years'
    },
    category: 'screening',
    coverage: 'not_covered',
    coverageNoteAr: 'غير مغطى كفحص وقائي روتيني',
    coverageNoteEn: 'Not covered as routine preventive screening'
  },
  {
    id: 'skin-cancer-screening',
    nameAr: 'فحص سرطان الجلد',
    nameEn: 'Skin Cancer Screening',
    descriptionAr: 'فحص الجلد للكشف عن الآفات المشبوهة',
    descriptionEn: 'Skin examination for suspicious lesions',
    icd10Codes: ['Z12.83'],
    sbsCodes: ['99201', '99202'],
    eligibility: {
      minAge: 30,
      gender: 'all',
      conditions: ['fair_skin', 'sun_exposure'],
      frequency: 'سنوياً',
      frequencyEn: 'Annually'
    },
    category: 'screening',
    coverage: 'not_covered',
    coverageNoteAr: 'غير مغطى كفحص وقائي في السعودية',
    coverageNoteEn: 'Not covered as preventive screening in Saudi Arabia'
  },
  {
    id: 'lung-cancer-screening',
    nameAr: 'فحص سرطان الرئة',
    nameEn: 'Lung Cancer Screening',
    descriptionAr: 'أشعة مقطعية منخفضة الجرعة للمدخنين',
    descriptionEn: 'Low-dose CT scan for smokers',
    icd10Codes: ['Z12.2'],
    sbsCodes: ['71271'],
    eligibility: {
      minAge: 50,
      maxAge: 80,
      gender: 'all',
      conditions: ['smoker', 'former_smoker'],
      frequency: 'سنوياً',
      frequencyEn: 'Annually'
    },
    category: 'screening',
    coverage: 'not_covered',
    coverageNoteAr: 'غير مغطى حالياً، قد يضاف مستقبلاً للمدخنين',
    coverageNoteEn: 'Not currently covered, may be added for smokers'
  },
  // Vaccinations - Mixed coverage
  {
    id: 'flu-vaccine',
    nameAr: 'لقاح الإنفلونزا',
    nameEn: 'Influenza Vaccine',
    descriptionAr: 'التطعيم السنوي ضد الإنفلونزا الموسمية',
    descriptionEn: 'Annual seasonal influenza vaccination',
    icd10Codes: ['Z23'],
    sbsCodes: ['90686', '90688', '90756'],
    eligibility: {
      minAge: 6,
      gender: 'all',
      conditions: ['diabetes', 'heart_disease', 'respiratory_disease', 'elderly'],
      frequency: 'سنوياً',
      frequencyEn: 'Annually'
    },
    category: 'vaccination',
    coverage: 'chi_basic',
    coverageNoteAr: 'مغطى للفئات المعرضة للخطر وكبار السن',
    coverageNoteEn: 'Covered for at-risk groups and elderly'
  },
  {
    id: 'pneumonia-vaccine',
    nameAr: 'لقاح الالتهاب الرئوي',
    nameEn: 'Pneumonia Vaccine',
    descriptionAr: 'التطعيم ضد المكورات الرئوية',
    descriptionEn: 'Pneumococcal vaccination',
    icd10Codes: ['Z23'],
    sbsCodes: ['90670', '90732'],
    eligibility: {
      minAge: 65,
      gender: 'all',
      conditions: ['diabetes', 'heart_disease', 'respiratory_disease', 'immunocompromised'],
      frequency: 'مرة واحدة أو حسب توصية الطبيب',
      frequencyEn: 'Once or as recommended by physician'
    },
    category: 'vaccination',
    coverage: 'chi_basic',
    coverageNoteAr: 'مغطى لكبار السن والفئات المعرضة',
    coverageNoteEn: 'Covered for elderly and at-risk groups'
  },
  {
    id: 'hepatitis-b-vaccine',
    nameAr: 'لقاح التهاب الكبد ب',
    nameEn: 'Hepatitis B Vaccine',
    descriptionAr: 'التطعيم ضد فيروس التهاب الكبد الوبائي ب',
    descriptionEn: 'Hepatitis B virus vaccination',
    icd10Codes: ['Z23'],
    sbsCodes: ['90740', '90746', '90747'],
    eligibility: {
      minAge: 0,
      gender: 'all',
      conditions: ['healthcare_worker', 'diabetes'],
      frequency: '3 جرعات',
      frequencyEn: '3 doses'
    },
    category: 'vaccination',
    coverage: 'chi_basic',
    coverageNoteAr: 'مغطى كجزء من برنامج التطعيمات الأساسية',
    coverageNoteEn: 'Covered as part of basic immunization program'
  },
  {
    id: 'hpv-vaccine',
    nameAr: 'لقاح فيروس الورم الحليمي (HPV)',
    nameEn: 'HPV Vaccine',
    descriptionAr: 'التطعيم ضد فيروس الورم الحليمي البشري للوقاية من سرطان عنق الرحم',
    descriptionEn: 'Human papillomavirus vaccination for cervical cancer prevention',
    icd10Codes: ['Z23'],
    sbsCodes: ['90649', '90650', '90651'],
    eligibility: {
      minAge: 9,
      maxAge: 26,
      gender: 'female',
      frequency: '2-3 جرعات حسب العمر',
      frequencyEn: '2-3 doses depending on age'
    },
    category: 'vaccination',
    coverage: 'not_covered',
    coverageNoteAr: 'غير مغطى بوثيقة الضمان الصحي، متاح بمراكز الصحة العامة',
    coverageNoteEn: 'Not covered by CHI policy, available at public health centers'
  },
  {
    id: 'shingles-vaccine',
    nameAr: 'لقاح الحزام الناري',
    nameEn: 'Shingles Vaccine',
    descriptionAr: 'التطعيم ضد فيروس الحزام الناري (Herpes Zoster)',
    descriptionEn: 'Herpes Zoster vaccination for shingles prevention',
    icd10Codes: ['Z23'],
    sbsCodes: ['90736', '90750'],
    eligibility: {
      minAge: 50,
      gender: 'all',
      conditions: ['elderly', 'immunocompromised'],
      frequency: 'جرعتان',
      frequencyEn: '2 doses'
    },
    category: 'vaccination',
    coverage: 'not_covered',
    coverageNoteAr: 'غير مغطى، يمكن الحصول عليه بتكلفة خاصة',
    coverageNoteEn: 'Not covered, available at personal expense'
  },
  // Counseling
  {
    id: 'nutrition-counseling',
    nameAr: 'استشارة التغذية',
    nameEn: 'Nutrition Counseling',
    descriptionAr: 'استشارة غذائية للوقاية من الأمراض المزمنة',
    descriptionEn: 'Dietary counseling for chronic disease prevention',
    icd10Codes: ['Z71.3', 'Z71.89'],
    sbsCodes: ['97802', '97803', '97804'],
    eligibility: {
      minAge: 18,
      gender: 'all',
      conditions: ['obesity', 'diabetes', 'hypertension', 'hyperlipidemia'],
      frequency: 'حسب الحاجة',
      frequencyEn: 'As needed'
    },
    category: 'counseling',
    coverage: 'chi_basic',
    coverageNoteAr: 'مغطى للمرضى المصابين بأمراض مزمنة',
    coverageNoteEn: 'Covered for patients with chronic diseases'
  },
  {
    id: 'smoking-cessation',
    nameAr: 'برنامج الإقلاع عن التدخين',
    nameEn: 'Smoking Cessation Program',
    descriptionAr: 'برنامج دعم للإقلاع عن التدخين',
    descriptionEn: 'Support program for quitting smoking',
    icd10Codes: ['Z71.6', 'F17.200'],
    sbsCodes: ['99406', '99407'],
    eligibility: {
      minAge: 18,
      gender: 'all',
      conditions: ['smoker'],
      frequency: 'حسب الحاجة',
      frequencyEn: 'As needed'
    },
    category: 'counseling',
    coverage: 'chi_basic',
    coverageNoteAr: 'الاستشارة مغطاة، الأدوية قد تحتاج موافقة مسبقة',
    coverageNoteEn: 'Counseling covered, medications may need prior authorization'
  },
  {
    id: 'mental-health-screening',
    nameAr: 'فحص الصحة النفسية',
    nameEn: 'Mental Health Screening',
    descriptionAr: 'فحص الاكتئاب والقلق',
    descriptionEn: 'Depression and anxiety screening',
    icd10Codes: ['Z13.31', 'Z13.32'],
    sbsCodes: ['96127', '96156'],
    eligibility: {
      minAge: 12,
      gender: 'all',
      frequency: 'سنوياً',
      frequencyEn: 'Annually'
    },
    category: 'counseling',
    coverage: 'not_covered',
    coverageNoteAr: 'غير مغطى بالوثيقة - مغطى للسعوديين عبر وزارة الصحة',
    coverageNoteEn: 'Not covered by CHI - covered for Saudis through MOH'
  },
  // Checkups
  {
    id: 'well-child-visit',
    nameAr: 'زيارة الطفل السليم',
    nameEn: 'Well-Child Visit',
    descriptionAr: 'فحص دوري شامل للأطفال مع التطعيمات',
    descriptionEn: 'Comprehensive periodic examination for children with vaccinations',
    icd10Codes: ['Z00.129', 'Z00.121'],
    sbsCodes: ['99381', '99382', '99391', '99392'],
    eligibility: {
      minAge: 0,
      maxAge: 17,
      gender: 'all',
      frequency: 'حسب جدول التطعيمات',
      frequencyEn: 'Per vaccination schedule'
    },
    category: 'checkup',
    coverage: 'chi_basic',
    coverageNoteAr: 'مغطى كاملاً مع التطعيمات الأساسية',
    coverageNoteEn: 'Fully covered with basic vaccinations'
  },
  {
    id: 'prenatal-care',
    nameAr: 'رعاية ما قبل الولادة',
    nameEn: 'Prenatal Care',
    descriptionAr: 'متابعة الحمل والفحوصات الدورية',
    descriptionEn: 'Pregnancy monitoring and periodic examinations',
    icd10Codes: ['Z34.00', 'Z34.90'],
    sbsCodes: ['59400', '59425', '59426'],
    eligibility: {
      gender: 'female',
      conditions: ['pregnant'],
      frequency: 'حسب مراحل الحمل',
      frequencyEn: 'Per pregnancy stages'
    },
    category: 'checkup',
    coverage: 'chi_basic',
    coverageNoteAr: 'مغطى ضمن منافع الأمومة بحد أقصى 60,000 ر.س',
    coverageNoteEn: 'Covered under maternity benefits up to SAR 60,000'
  },
  {
    id: 'annual-physical',
    nameAr: 'الفحص السنوي الشامل',
    nameEn: 'Annual Physical Examination',
    descriptionAr: 'فحص طبي شامل سنوي للبالغين',
    descriptionEn: 'Comprehensive annual medical examination for adults',
    icd10Codes: ['Z00.00', 'Z00.01'],
    sbsCodes: ['99385', '99386', '99395', '99396'],
    eligibility: {
      minAge: 18,
      gender: 'all',
      frequency: 'سنوياً',
      frequencyEn: 'Annually'
    },
    category: 'checkup',
    coverage: 'chi_basic',
    coverageNoteAr: 'مغطى كفحص وقائي سنوي',
    coverageNoteEn: 'Covered as annual preventive examination'
  },
  {
    id: 'dental-checkup',
    nameAr: 'فحص الأسنان الدوري',
    nameEn: 'Dental Checkup',
    descriptionAr: 'فحص وتنظيف الأسنان الدوري',
    descriptionEn: 'Periodic dental examination and cleaning',
    icd10Codes: ['Z01.20', 'Z01.21'],
    sbsCodes: ['D0120', 'D0150', 'D1110'],
    eligibility: {
      minAge: 3,
      gender: 'all',
      frequency: 'كل 6 أشهر',
      frequencyEn: 'Every 6 months'
    },
    category: 'checkup',
    coverage: 'chi_basic',
    coverageNoteAr: 'مغطى ضمن منافع الأسنان بحد أقصى 10,000 ر.س سنوياً',
    coverageNoteEn: 'Covered under dental benefits up to SAR 10,000 annually'
  }
];

export const conditions = [
  { id: 'obesity', nameAr: 'السمنة', nameEn: 'Obesity' },
  { id: 'diabetes', nameAr: 'السكري', nameEn: 'Diabetes' },
  { id: 'hypertension', nameAr: 'ارتفاع ضغط الدم', nameEn: 'Hypertension' },
  { id: 'hyperlipidemia', nameAr: 'ارتفاع الكوليسترول', nameEn: 'High Cholesterol' },
  { id: 'heart_disease', nameAr: 'أمراض القلب', nameEn: 'Heart Disease' },
  { id: 'respiratory_disease', nameAr: 'أمراض الجهاز التنفسي', nameEn: 'Respiratory Disease' },
  { id: 'family_history_diabetes', nameAr: 'تاريخ عائلي للسكري', nameEn: 'Family History of Diabetes' },
  { id: 'family_history_heart', nameAr: 'تاريخ عائلي لأمراض القلب', nameEn: 'Family History of Heart Disease' },
  { id: 'family_history_breast_cancer', nameAr: 'تاريخ عائلي لسرطان الثدي', nameEn: 'Family History of Breast Cancer' },
  { id: 'family_history_colorectal', nameAr: 'تاريخ عائلي لسرطان القولون', nameEn: 'Family History of Colorectal Cancer' },
  { id: 'family_history_prostate', nameAr: 'تاريخ عائلي لسرطان البروستاتا', nameEn: 'Family History of Prostate Cancer' },
  { id: 'family_history_thyroid', nameAr: 'تاريخ عائلي لأمراض الغدة الدرقية', nameEn: 'Family History of Thyroid Disease' },
  { id: 'smoker', nameAr: 'مدخن', nameEn: 'Smoker' },
  { id: 'former_smoker', nameAr: 'مدخن سابق', nameEn: 'Former Smoker' },
  { id: 'menopause', nameAr: 'انقطاع الطمث', nameEn: 'Menopause' },
  { id: 'steroid_use', nameAr: 'استخدام الكورتيزون', nameEn: 'Steroid Use' },
  { id: 'immunocompromised', nameAr: 'ضعف المناعة', nameEn: 'Immunocompromised' },
  { id: 'healthcare_worker', nameAr: 'عامل صحي', nameEn: 'Healthcare Worker' },
  { id: 'pregnant', nameAr: 'حامل', nameEn: 'Pregnant' },
  { id: 'elderly', nameAr: 'كبار السن', nameEn: 'Elderly (65+)' },
  { id: 'fair_skin', nameAr: 'البشرة الفاتحة', nameEn: 'Fair Skin' },
  { id: 'sun_exposure', nameAr: 'التعرض للشمس', nameEn: 'Sun Exposure' }
];

export const categories = [
  { id: 'all', nameAr: 'جميع الخدمات', nameEn: 'All Services' },
  { id: 'screening', nameAr: 'الفحوصات', nameEn: 'Screenings' },
  { id: 'vaccination', nameAr: 'التطعيمات', nameEn: 'Vaccinations' },
  { id: 'counseling', nameAr: 'الاستشارات', nameEn: 'Counseling' },
  { id: 'checkup', nameAr: 'الفحوصات الدورية', nameEn: 'Checkups' }
];

export const coverageFilters = [
  { id: 'all', nameAr: 'جميع التغطيات', nameEn: 'All Coverage Types' },
  { id: 'chi_basic', nameAr: 'وثيقة الضمان', nameEn: 'CHI Policy' },
  { id: 'government', nameAr: 'الوثائق الحكومية', nameEn: 'Government' },
  { id: 'not_covered', nameAr: 'غير مغطاة (مغطاة للسعوديين بوزارة الصحة)', nameEn: 'Not Covered (MOH for Saudis)' }
];

export function checkEligibility(
  service: PreventiveService,
  age: number,
  gender: 'male' | 'female',
  userConditions: string[]
): { eligible: boolean; reason: string; reasonEn: string } {
  // Check age
  if (service.eligibility.minAge !== undefined && age < service.eligibility.minAge) {
    return {
      eligible: false,
      reason: `العمر المطلوب ${service.eligibility.minAge} سنة فأكثر`,
      reasonEn: `Required age is ${service.eligibility.minAge}+ years`
    };
  }
  
  if (service.eligibility.maxAge !== undefined && age > service.eligibility.maxAge) {
    return {
      eligible: false,
      reason: `العمر المطلوب أقل من ${service.eligibility.maxAge} سنة`,
      reasonEn: `Required age is under ${service.eligibility.maxAge} years`
    };
  }

  // Check gender
  if (service.eligibility.gender && service.eligibility.gender !== 'all' && service.eligibility.gender !== gender) {
    return {
      eligible: false,
      reason: service.eligibility.gender === 'female' ? 'للنساء فقط' : 'للرجال فقط',
      reasonEn: service.eligibility.gender === 'female' ? 'For females only' : 'For males only'
    };
  }

  // Check conditions (if service requires specific conditions, check if user has at least one)
  const hasMatchingCondition = service.eligibility.conditions 
    ? service.eligibility.conditions.some(c => userConditions.includes(c))
    : true;

  // Services that require conditions but user doesn't have any
  if (service.eligibility.conditions && service.eligibility.conditions.length > 0 && !hasMatchingCondition) {
    // Some services are still eligible by age/gender even without conditions
    const isEligibleByAgeGender = 
      (service.eligibility.minAge === undefined || age >= service.eligibility.minAge) &&
      (service.eligibility.maxAge === undefined || age <= service.eligibility.maxAge) &&
      (service.eligibility.gender === 'all' || service.eligibility.gender === gender);
    
    if (isEligibleByAgeGender) {
      return {
        eligible: true,
        reason: 'مؤهل حسب العمر والجنس',
        reasonEn: 'Eligible by age and gender'
      };
    }
  }

  if (hasMatchingCondition && service.eligibility.conditions) {
    return {
      eligible: true,
      reason: 'مؤهل بسبب وجود عوامل خطر',
      reasonEn: 'Eligible due to risk factors'
    };
  }

  return {
    eligible: true,
    reason: 'مؤهل للخدمة',
    reasonEn: 'Eligible for service'
  };
}

export function getCoverageInfo(coverage: CoverageType) {
  return policyCoverages.find(p => p.type === coverage);
}
