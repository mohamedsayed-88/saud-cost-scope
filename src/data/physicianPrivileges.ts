// Physician Specialties and their associated SBS service codes
// Based on Saudi Commission for Health Specialties (SCFHS) classifications

export interface ServicePrivilege {
  sbsCode: string;
  serviceNameAr: string;
  serviceNameEn: string;
  privilegeType: 'core' | 'extended' | 'requires_training';
  trainingRequirementAr?: string;
  trainingRequirementEn?: string;
}

export interface PhysicianSpecialty {
  id: string;
  nameAr: string;
  nameEn: string;
  categoryAr: string;
  categoryEn: string;
  description: {
    ar: string;
    en: string;
  };
  services: ServicePrivilege[];
}

export const specialtyCategories = [
  { id: 'internal', nameAr: 'الطب الباطني', nameEn: 'Internal Medicine' },
  { id: 'surgery', nameAr: 'الجراحة', nameEn: 'Surgery' },
  { id: 'pediatrics', nameAr: 'طب الأطفال', nameEn: 'Pediatrics' },
  { id: 'obgyn', nameAr: 'النساء والتوليد', nameEn: 'OB/GYN' },
  { id: 'emergency', nameAr: 'طب الطوارئ', nameEn: 'Emergency Medicine' },
  { id: 'family', nameAr: 'طب الأسرة', nameEn: 'Family Medicine' },
  { id: 'radiology', nameAr: 'الأشعة', nameEn: 'Radiology' },
  { id: 'anesthesia', nameAr: 'التخدير', nameEn: 'Anesthesiology' },
  { id: 'psychiatry', nameAr: 'الطب النفسي', nameEn: 'Psychiatry' },
  { id: 'dermatology', nameAr: 'الجلدية', nameEn: 'Dermatology' },
  { id: 'orthopedics', nameAr: 'العظام', nameEn: 'Orthopedics' },
  { id: 'cardiology', nameAr: 'القلب', nameEn: 'Cardiology' },
  { id: 'neurology', nameAr: 'الأعصاب', nameEn: 'Neurology' },
  { id: 'ophthalmology', nameAr: 'العيون', nameEn: 'Ophthalmology' },
  { id: 'ent', nameAr: 'الأنف والأذن والحنجرة', nameEn: 'ENT' },
  { id: 'urology', nameAr: 'المسالك البولية', nameEn: 'Urology' },
  { id: 'nephrology', nameAr: 'الكلى', nameEn: 'Nephrology' },
  { id: 'gastro', nameAr: 'الجهاز الهضمي', nameEn: 'Gastroenterology' },
  { id: 'pulmonology', nameAr: 'الصدرية', nameEn: 'Pulmonology' },
  { id: 'endocrinology', nameAr: 'الغدد الصماء', nameEn: 'Endocrinology' },
  { id: 'sleep-medicine', nameAr: 'طب النوم', nameEn: 'Sleep Medicine' },
];

export const physicianSpecialties: PhysicianSpecialty[] = [
  {
    id: 'general-surgery',
    nameAr: 'الجراحة العامة',
    nameEn: 'General Surgery',
    categoryAr: 'الجراحة',
    categoryEn: 'Surgery',
    description: {
      ar: 'تشمل جراحة البطن والجهاز الهضمي والغدد الصماء والأنسجة الرخوة',
      en: 'Includes abdominal, GI tract, endocrine, and soft tissue surgery'
    },
    services: [
      { sbsCode: '30001', serviceNameAr: 'استشارة جراحية', serviceNameEn: 'Surgical Consultation', privilegeType: 'core' },
      { sbsCode: '30002', serviceNameAr: 'متابعة جراحية', serviceNameEn: 'Surgical Follow-up', privilegeType: 'core' },
      { sbsCode: '30375', serviceNameAr: 'استئصال المرارة بالمنظار', serviceNameEn: 'Laparoscopic Cholecystectomy', privilegeType: 'core' },
      { sbsCode: '30376', serviceNameAr: 'استئصال الزائدة الدودية', serviceNameEn: 'Appendectomy', privilegeType: 'core' },
      { sbsCode: '30390', serviceNameAr: 'إصلاح فتق إربي', serviceNameEn: 'Inguinal Hernia Repair', privilegeType: 'core' },
      { sbsCode: '30391', serviceNameAr: 'إصلاح فتق سري', serviceNameEn: 'Umbilical Hernia Repair', privilegeType: 'core' },
      { sbsCode: '30400', serviceNameAr: 'استئصال جزئي للقولون', serviceNameEn: 'Partial Colectomy', privilegeType: 'extended' },
      { sbsCode: '30405', serviceNameAr: 'استئصال المعدة', serviceNameEn: 'Gastrectomy', privilegeType: 'extended' },
      { sbsCode: '30410', serviceNameAr: 'جراحة السمنة - تكميم المعدة', serviceNameEn: 'Bariatric Surgery - Sleeve Gastrectomy', privilegeType: 'requires_training', trainingRequirementAr: 'زمالة جراحة السمنة', trainingRequirementEn: 'Bariatric Surgery Fellowship' },
      { sbsCode: '30415', serviceNameAr: 'جراحة السمنة - تحويل المسار', serviceNameEn: 'Bariatric Surgery - Gastric Bypass', privilegeType: 'requires_training', trainingRequirementAr: 'زمالة جراحة السمنة', trainingRequirementEn: 'Bariatric Surgery Fellowship' },
      { sbsCode: '30500', serviceNameAr: 'استئصال الغدة الدرقية', serviceNameEn: 'Thyroidectomy', privilegeType: 'extended' },
      { sbsCode: '30510', serviceNameAr: 'استئصال الطحال', serviceNameEn: 'Splenectomy', privilegeType: 'core' },
    ]
  },
  {
    id: 'cardiology',
    nameAr: 'أمراض القلب',
    nameEn: 'Cardiology',
    categoryAr: 'الطب الباطني',
    categoryEn: 'Internal Medicine',
    description: {
      ar: 'تشخيص وعلاج أمراض القلب والأوعية الدموية',
      en: 'Diagnosis and treatment of cardiovascular diseases'
    },
    services: [
      { sbsCode: '11505', serviceNameAr: 'استشارة قلب', serviceNameEn: 'Cardiology Consultation', privilegeType: 'core' },
      { sbsCode: '11506', serviceNameAr: 'متابعة قلب', serviceNameEn: 'Cardiology Follow-up', privilegeType: 'core' },
      { sbsCode: '11520', serviceNameAr: 'تخطيط القلب الكهربائي', serviceNameEn: 'ECG/EKG', privilegeType: 'core' },
      { sbsCode: '11530', serviceNameAr: 'إيكو القلب', serviceNameEn: 'Echocardiography', privilegeType: 'core' },
      { sbsCode: '11535', serviceNameAr: 'إيكو القلب بالجهد', serviceNameEn: 'Stress Echocardiography', privilegeType: 'core' },
      { sbsCode: '11540', serviceNameAr: 'هولتر 24 ساعة', serviceNameEn: '24-hour Holter Monitoring', privilegeType: 'core' },
      { sbsCode: '11550', serviceNameAr: 'اختبار الجهد', serviceNameEn: 'Exercise Stress Test', privilegeType: 'core' },
      { sbsCode: '11600', serviceNameAr: 'قسطرة القلب التشخيصية', serviceNameEn: 'Diagnostic Cardiac Catheterization', privilegeType: 'requires_training', trainingRequirementAr: 'زمالة القسطرة التداخلية', trainingRequirementEn: 'Interventional Cardiology Fellowship' },
      { sbsCode: '11610', serviceNameAr: 'تركيب دعامة قلبية', serviceNameEn: 'Coronary Stent Placement', privilegeType: 'requires_training', trainingRequirementAr: 'زمالة القسطرة التداخلية', trainingRequirementEn: 'Interventional Cardiology Fellowship' },
      { sbsCode: '11620', serviceNameAr: 'زرع منظم ضربات القلب', serviceNameEn: 'Pacemaker Implantation', privilegeType: 'requires_training', trainingRequirementAr: 'زمالة الفيسيولوجيا الكهربائية', trainingRequirementEn: 'Electrophysiology Fellowship' },
      { sbsCode: '11625', serviceNameAr: 'زرع مزيل الرجفان', serviceNameEn: 'ICD Implantation', privilegeType: 'requires_training', trainingRequirementAr: 'زمالة الفيسيولوجيا الكهربائية', trainingRequirementEn: 'Electrophysiology Fellowship' },
      { sbsCode: '11630', serviceNameAr: 'دراسة الفيسيولوجيا الكهربائية', serviceNameEn: 'Electrophysiology Study', privilegeType: 'requires_training', trainingRequirementAr: 'زمالة الفيسيولوجيا الكهربائية', trainingRequirementEn: 'Electrophysiology Fellowship' },
    ]
  },
  {
    id: 'orthopedics',
    nameAr: 'جراحة العظام',
    nameEn: 'Orthopedic Surgery',
    categoryAr: 'الجراحة',
    categoryEn: 'Surgery',
    description: {
      ar: 'جراحة الجهاز العضلي الهيكلي والمفاصل والعمود الفقري',
      en: 'Surgery of musculoskeletal system, joints, and spine'
    },
    services: [
      { sbsCode: '47001', serviceNameAr: 'استشارة عظام', serviceNameEn: 'Orthopedic Consultation', privilegeType: 'core' },
      { sbsCode: '47002', serviceNameAr: 'متابعة عظام', serviceNameEn: 'Orthopedic Follow-up', privilegeType: 'core' },
      { sbsCode: '47100', serviceNameAr: 'تثبيت كسر بسيط', serviceNameEn: 'Simple Fracture Fixation', privilegeType: 'core' },
      { sbsCode: '47110', serviceNameAr: 'تثبيت كسر معقد', serviceNameEn: 'Complex Fracture Fixation', privilegeType: 'core' },
      { sbsCode: '47200', serviceNameAr: 'منظار الركبة التشخيصي', serviceNameEn: 'Diagnostic Knee Arthroscopy', privilegeType: 'core' },
      { sbsCode: '47210', serviceNameAr: 'إصلاح الغضروف الهلالي بالمنظار', serviceNameEn: 'Arthroscopic Meniscus Repair', privilegeType: 'core' },
      { sbsCode: '47220', serviceNameAr: 'إعادة بناء الرباط الصليبي', serviceNameEn: 'ACL Reconstruction', privilegeType: 'extended' },
      { sbsCode: '47300', serviceNameAr: 'استبدال مفصل الركبة الكامل', serviceNameEn: 'Total Knee Replacement', privilegeType: 'requires_training', trainingRequirementAr: 'زمالة جراحة المفاصل', trainingRequirementEn: 'Joint Replacement Fellowship' },
      { sbsCode: '47310', serviceNameAr: 'استبدال مفصل الورك الكامل', serviceNameEn: 'Total Hip Replacement', privilegeType: 'requires_training', trainingRequirementAr: 'زمالة جراحة المفاصل', trainingRequirementEn: 'Joint Replacement Fellowship' },
      { sbsCode: '47400', serviceNameAr: 'جراحة العمود الفقري - استئصال القرص', serviceNameEn: 'Spine Surgery - Discectomy', privilegeType: 'requires_training', trainingRequirementAr: 'زمالة جراحة العمود الفقري', trainingRequirementEn: 'Spine Surgery Fellowship' },
      { sbsCode: '47410', serviceNameAr: 'تثبيت الفقرات', serviceNameEn: 'Spinal Fusion', privilegeType: 'requires_training', trainingRequirementAr: 'زمالة جراحة العمود الفقري', trainingRequirementEn: 'Spine Surgery Fellowship' },
      { sbsCode: '47500', serviceNameAr: 'جراحة اليد', serviceNameEn: 'Hand Surgery', privilegeType: 'requires_training', trainingRequirementAr: 'زمالة جراحة اليد', trainingRequirementEn: 'Hand Surgery Fellowship' },
    ]
  },
  {
    id: 'internal-medicine',
    nameAr: 'الطب الباطني العام',
    nameEn: 'Internal Medicine',
    categoryAr: 'الطب الباطني',
    categoryEn: 'Internal Medicine',
    description: {
      ar: 'تشخيص وعلاج الأمراض الباطنية للبالغين',
      en: 'Diagnosis and treatment of adult internal diseases'
    },
    services: [
      { sbsCode: '11001', serviceNameAr: 'استشارة طبية باطنية', serviceNameEn: 'Internal Medicine Consultation', privilegeType: 'core' },
      { sbsCode: '11002', serviceNameAr: 'متابعة طبية', serviceNameEn: 'Medical Follow-up', privilegeType: 'core' },
      { sbsCode: '11010', serviceNameAr: 'إدارة الأمراض المزمنة', serviceNameEn: 'Chronic Disease Management', privilegeType: 'core' },
      { sbsCode: '11020', serviceNameAr: 'تفسير تحاليل المختبر', serviceNameEn: 'Lab Results Interpretation', privilegeType: 'core' },
      { sbsCode: '11030', serviceNameAr: 'تفسير الأشعة الأساسية', serviceNameEn: 'Basic Imaging Interpretation', privilegeType: 'core' },
      { sbsCode: '11100', serviceNameAr: 'بزل الصدر', serviceNameEn: 'Thoracentesis', privilegeType: 'extended' },
      { sbsCode: '11110', serviceNameAr: 'بزل البطن', serviceNameEn: 'Paracentesis', privilegeType: 'extended' },
      { sbsCode: '11120', serviceNameAr: 'البزل القطني', serviceNameEn: 'Lumbar Puncture', privilegeType: 'extended' },
    ]
  },
  {
    id: 'gastroenterology',
    nameAr: 'أمراض الجهاز الهضمي',
    nameEn: 'Gastroenterology',
    categoryAr: 'الطب الباطني',
    categoryEn: 'Internal Medicine',
    description: {
      ar: 'تشخيص وعلاج أمراض الجهاز الهضمي والكبد',
      en: 'Diagnosis and treatment of GI and liver diseases'
    },
    services: [
      { sbsCode: '11201', serviceNameAr: 'استشارة جهاز هضمي', serviceNameEn: 'GI Consultation', privilegeType: 'core' },
      { sbsCode: '11202', serviceNameAr: 'متابعة جهاز هضمي', serviceNameEn: 'GI Follow-up', privilegeType: 'core' },
      { sbsCode: '11210', serviceNameAr: 'التنظير العلوي التشخيصي', serviceNameEn: 'Diagnostic Upper Endoscopy', privilegeType: 'core' },
      { sbsCode: '11220', serviceNameAr: 'تنظير القولون التشخيصي', serviceNameEn: 'Diagnostic Colonoscopy', privilegeType: 'core' },
      { sbsCode: '11230', serviceNameAr: 'ربط دوالي المريء', serviceNameEn: 'Esophageal Variceal Ligation', privilegeType: 'extended' },
      { sbsCode: '11240', serviceNameAr: 'استئصال سليلة بالمنظار', serviceNameEn: 'Endoscopic Polypectomy', privilegeType: 'extended' },
      { sbsCode: '11250', serviceNameAr: 'ERCP تشخيصي', serviceNameEn: 'Diagnostic ERCP', privilegeType: 'requires_training', trainingRequirementAr: 'تدريب ERCP متقدم', trainingRequirementEn: 'Advanced ERCP Training' },
      { sbsCode: '11260', serviceNameAr: 'ERCP علاجي', serviceNameEn: 'Therapeutic ERCP', privilegeType: 'requires_training', trainingRequirementAr: 'تدريب ERCP متقدم', trainingRequirementEn: 'Advanced ERCP Training' },
      { sbsCode: '11270', serviceNameAr: 'فيبروسكان الكبد', serviceNameEn: 'Liver Fibroscan', privilegeType: 'core' },
      { sbsCode: '11280', serviceNameAr: 'خزعة الكبد', serviceNameEn: 'Liver Biopsy', privilegeType: 'extended' },
    ]
  },
  {
    id: 'neurology',
    nameAr: 'طب الأعصاب',
    nameEn: 'Neurology',
    categoryAr: 'الطب الباطني',
    categoryEn: 'Internal Medicine',
    description: {
      ar: 'تشخيص وعلاج أمراض الجهاز العصبي',
      en: 'Diagnosis and treatment of nervous system disorders'
    },
    services: [
      { sbsCode: '11301', serviceNameAr: 'استشارة أعصاب', serviceNameEn: 'Neurology Consultation', privilegeType: 'core' },
      { sbsCode: '11302', serviceNameAr: 'متابعة أعصاب', serviceNameEn: 'Neurology Follow-up', privilegeType: 'core' },
      { sbsCode: '11310', serviceNameAr: 'تخطيط الدماغ الكهربائي', serviceNameEn: 'EEG', privilegeType: 'core' },
      { sbsCode: '11320', serviceNameAr: 'تخطيط العضلات والأعصاب', serviceNameEn: 'EMG/NCV', privilegeType: 'core' },
      { sbsCode: '11330', serviceNameAr: 'البزل القطني', serviceNameEn: 'Lumbar Puncture', privilegeType: 'core' },
      { sbsCode: '11340', serviceNameAr: 'حقن البوتوكس للصداع النصفي', serviceNameEn: 'Botox for Migraine', privilegeType: 'extended' },
      { sbsCode: '11350', serviceNameAr: 'تقييم السكتة الدماغية الحادة', serviceNameEn: 'Acute Stroke Assessment', privilegeType: 'core' },
      { sbsCode: '11360', serviceNameAr: 'إعطاء مذيب الجلطة الدماغية', serviceNameEn: 'IV Thrombolysis for Stroke', privilegeType: 'requires_training', trainingRequirementAr: 'شهادة السكتة الدماغية الحادة', trainingRequirementEn: 'Acute Stroke Certification' },
    ]
  },
  {
    id: 'pulmonology',
    nameAr: 'أمراض الصدر',
    nameEn: 'Pulmonology',
    categoryAr: 'الطب الباطني',
    categoryEn: 'Internal Medicine',
    description: {
      ar: 'تشخيص وعلاج أمراض الجهاز التنفسي',
      en: 'Diagnosis and treatment of respiratory diseases'
    },
    services: [
      { sbsCode: '11401', serviceNameAr: 'استشارة صدرية', serviceNameEn: 'Pulmonology Consultation', privilegeType: 'core' },
      { sbsCode: '11402', serviceNameAr: 'متابعة صدرية', serviceNameEn: 'Pulmonology Follow-up', privilegeType: 'core' },
      { sbsCode: '11410', serviceNameAr: 'قياس التنفس', serviceNameEn: 'Spirometry', privilegeType: 'core' },
      { sbsCode: '11420', serviceNameAr: 'اختبار وظائف الرئة الكامل', serviceNameEn: 'Full Pulmonary Function Test', privilegeType: 'core' },
      { sbsCode: '11430', serviceNameAr: 'منظار القصبات الهوائية', serviceNameEn: 'Bronchoscopy', privilegeType: 'core' },
      { sbsCode: '11440', serviceNameAr: 'بزل الصدر', serviceNameEn: 'Thoracentesis', privilegeType: 'core' },
      { sbsCode: '11450', serviceNameAr: 'تركيب أنبوب صدري', serviceNameEn: 'Chest Tube Insertion', privilegeType: 'extended' },
      { sbsCode: '11480', serviceNameAr: 'خزعة الرئة بالمنظار', serviceNameEn: 'Bronchoscopic Lung Biopsy', privilegeType: 'extended' },
    ]
  },
  {
    id: 'nephrology',
    nameAr: 'أمراض الكلى',
    nameEn: 'Nephrology',
    categoryAr: 'الطب الباطني',
    categoryEn: 'Internal Medicine',
    description: {
      ar: 'تشخيص وعلاج أمراض الكلى والغسيل الكلوي',
      en: 'Diagnosis and treatment of kidney diseases and dialysis'
    },
    services: [
      { sbsCode: '11701', serviceNameAr: 'استشارة كلى', serviceNameEn: 'Nephrology Consultation', privilegeType: 'core' },
      { sbsCode: '11702', serviceNameAr: 'متابعة كلى', serviceNameEn: 'Nephrology Follow-up', privilegeType: 'core' },
      { sbsCode: '11710', serviceNameAr: 'إدارة مرض الكلى المزمن', serviceNameEn: 'CKD Management', privilegeType: 'core' },
      { sbsCode: '11720', serviceNameAr: 'غسيل الكلى الدموي', serviceNameEn: 'Hemodialysis', privilegeType: 'core' },
      { sbsCode: '11730', serviceNameAr: 'غسيل الكلى البريتوني', serviceNameEn: 'Peritoneal Dialysis', privilegeType: 'core' },
      { sbsCode: '11740', serviceNameAr: 'تركيب قسطرة غسيل مؤقتة', serviceNameEn: 'Temporary Dialysis Catheter', privilegeType: 'core' },
      { sbsCode: '11750', serviceNameAr: 'خزعة الكلى', serviceNameEn: 'Kidney Biopsy', privilegeType: 'extended' },
      { sbsCode: '11760', serviceNameAr: 'إدارة ما بعد زراعة الكلى', serviceNameEn: 'Post-Transplant Management', privilegeType: 'requires_training', trainingRequirementAr: 'تدريب زراعة الكلى', trainingRequirementEn: 'Transplant Nephrology Training' },
    ]
  },
  {
    id: 'dermatology',
    nameAr: 'الأمراض الجلدية',
    nameEn: 'Dermatology',
    categoryAr: 'الجلدية',
    categoryEn: 'Dermatology',
    description: {
      ar: 'تشخيص وعلاج أمراض الجلد والشعر والأظافر',
      en: 'Diagnosis and treatment of skin, hair, and nail disorders'
    },
    services: [
      { sbsCode: '14001', serviceNameAr: 'استشارة جلدية', serviceNameEn: 'Dermatology Consultation', privilegeType: 'core' },
      { sbsCode: '14002', serviceNameAr: 'متابعة جلدية', serviceNameEn: 'Dermatology Follow-up', privilegeType: 'core' },
      { sbsCode: '14010', serviceNameAr: 'خزعة جلدية', serviceNameEn: 'Skin Biopsy', privilegeType: 'core' },
      { sbsCode: '14020', serviceNameAr: 'استئصال آفة جلدية', serviceNameEn: 'Skin Lesion Excision', privilegeType: 'core' },
      { sbsCode: '14030', serviceNameAr: 'الكي الكهربائي', serviceNameEn: 'Electrocautery', privilegeType: 'core' },
      { sbsCode: '14040', serviceNameAr: 'العلاج بالتبريد', serviceNameEn: 'Cryotherapy', privilegeType: 'core' },
      { sbsCode: '14050', serviceNameAr: 'حقن الكورتيزون داخل الآفة', serviceNameEn: 'Intralesional Corticosteroid', privilegeType: 'core' },
      { sbsCode: '14060', serviceNameAr: 'العلاج الضوئي', serviceNameEn: 'Phototherapy', privilegeType: 'core' },
      { sbsCode: '14070', serviceNameAr: 'إزالة الشعر بالليزر', serviceNameEn: 'Laser Hair Removal', privilegeType: 'extended' },
      { sbsCode: '14080', serviceNameAr: 'علاج الندبات بالليزر', serviceNameEn: 'Laser Scar Treatment', privilegeType: 'requires_training', trainingRequirementAr: 'تدريب الليزر التجميلي', trainingRequirementEn: 'Cosmetic Laser Training' },
      { sbsCode: '14090', serviceNameAr: 'جراحة موس', serviceNameEn: 'Mohs Surgery', privilegeType: 'requires_training', trainingRequirementAr: 'زمالة جراحة موس', trainingRequirementEn: 'Mohs Surgery Fellowship' },
    ]
  },
  {
    id: 'ophthalmology',
    nameAr: 'طب العيون',
    nameEn: 'Ophthalmology',
    categoryAr: 'العيون',
    categoryEn: 'Ophthalmology',
    description: {
      ar: 'تشخيص وعلاج أمراض العين وجراحتها',
      en: 'Diagnosis and treatment of eye diseases and surgery'
    },
    services: [
      { sbsCode: '42001', serviceNameAr: 'استشارة عيون', serviceNameEn: 'Ophthalmology Consultation', privilegeType: 'core' },
      { sbsCode: '42002', serviceNameAr: 'متابعة عيون', serviceNameEn: 'Ophthalmology Follow-up', privilegeType: 'core' },
      { sbsCode: '42010', serviceNameAr: 'فحص العين الشامل', serviceNameEn: 'Comprehensive Eye Exam', privilegeType: 'core' },
      { sbsCode: '42020', serviceNameAr: 'قياس ضغط العين', serviceNameEn: 'Tonometry', privilegeType: 'core' },
      { sbsCode: '42030', serviceNameAr: 'فحص قاع العين', serviceNameEn: 'Fundoscopy', privilegeType: 'core' },
      { sbsCode: '42040', serviceNameAr: 'تصوير قاع العين', serviceNameEn: 'Fundus Photography', privilegeType: 'core' },
      { sbsCode: '42050', serviceNameAr: 'OCT الشبكية', serviceNameEn: 'Retinal OCT', privilegeType: 'core' },
      { sbsCode: '42100', serviceNameAr: 'جراحة الساد (الماء الأبيض)', serviceNameEn: 'Cataract Surgery', privilegeType: 'core' },
      { sbsCode: '42110', serviceNameAr: 'جراحة الجلوكوما', serviceNameEn: 'Glaucoma Surgery', privilegeType: 'extended' },
      { sbsCode: '42120', serviceNameAr: 'حقن داخل العين', serviceNameEn: 'Intravitreal Injection', privilegeType: 'core' },
      { sbsCode: '42130', serviceNameAr: 'جراحة الشبكية', serviceNameEn: 'Retinal Surgery', privilegeType: 'requires_training', trainingRequirementAr: 'زمالة جراحة الشبكية', trainingRequirementEn: 'Retina Surgery Fellowship' },
      { sbsCode: '42140', serviceNameAr: 'تصحيح النظر بالليزر', serviceNameEn: 'LASIK', privilegeType: 'requires_training', trainingRequirementAr: 'تدريب جراحة الانكسار', trainingRequirementEn: 'Refractive Surgery Training' },
    ]
  },
  {
    id: 'ent',
    nameAr: 'الأنف والأذن والحنجرة',
    nameEn: 'ENT / Otolaryngology',
    categoryAr: 'الأنف والأذن والحنجرة',
    categoryEn: 'ENT',
    description: {
      ar: 'تشخيص وعلاج أمراض الأنف والأذن والحنجرة',
      en: 'Diagnosis and treatment of ear, nose, and throat disorders'
    },
    services: [
      { sbsCode: '41001', serviceNameAr: 'استشارة أنف وأذن', serviceNameEn: 'ENT Consultation', privilegeType: 'core' },
      { sbsCode: '41002', serviceNameAr: 'متابعة أنف وأذن', serviceNameEn: 'ENT Follow-up', privilegeType: 'core' },
      { sbsCode: '41010', serviceNameAr: 'تنظير الأنف', serviceNameEn: 'Nasal Endoscopy', privilegeType: 'core' },
      { sbsCode: '41020', serviceNameAr: 'تنظير الحنجرة', serviceNameEn: 'Laryngoscopy', privilegeType: 'core' },
      { sbsCode: '41030', serviceNameAr: 'اختبار السمع', serviceNameEn: 'Audiometry', privilegeType: 'core' },
      { sbsCode: '41040', serviceNameAr: 'فحص التوازن', serviceNameEn: 'Vestibular Testing', privilegeType: 'core' },
      { sbsCode: '41100', serviceNameAr: 'استئصال اللوزتين', serviceNameEn: 'Tonsillectomy', privilegeType: 'core' },
      { sbsCode: '41110', serviceNameAr: 'استئصال اللحمية', serviceNameEn: 'Adenoidectomy', privilegeType: 'core' },
      { sbsCode: '41120', serviceNameAr: 'أنابيب الأذن', serviceNameEn: 'Ear Tube Insertion', privilegeType: 'core' },
      { sbsCode: '41130', serviceNameAr: 'جراحة الجيوب الأنفية بالمنظار', serviceNameEn: 'Endoscopic Sinus Surgery', privilegeType: 'extended' },
      { sbsCode: '41140', serviceNameAr: 'تجميل الحاجز الأنفي', serviceNameEn: 'Septoplasty', privilegeType: 'core' },
      { sbsCode: '41150', serviceNameAr: 'زراعة القوقعة', serviceNameEn: 'Cochlear Implant', privilegeType: 'requires_training', trainingRequirementAr: 'زمالة جراحة الأذن', trainingRequirementEn: 'Otology Fellowship' },
      { sbsCode: '41160', serviceNameAr: 'جراحة الرأس والرقبة الأورام', serviceNameEn: 'Head & Neck Oncologic Surgery', privilegeType: 'requires_training', trainingRequirementAr: 'زمالة جراحة الرأس والرقبة', trainingRequirementEn: 'Head & Neck Surgery Fellowship' },
    ]
  },
  {
    id: 'obgyn',
    nameAr: 'النساء والتوليد',
    nameEn: 'Obstetrics & Gynecology',
    categoryAr: 'النساء والتوليد',
    categoryEn: 'OB/GYN',
    description: {
      ar: 'رعاية الحمل والولادة وأمراض النساء',
      en: 'Pregnancy care, delivery, and gynecological diseases'
    },
    services: [
      { sbsCode: '35001', serviceNameAr: 'استشارة نساء وتوليد', serviceNameEn: 'OB/GYN Consultation', privilegeType: 'core' },
      { sbsCode: '35002', serviceNameAr: 'متابعة حمل', serviceNameEn: 'Prenatal Follow-up', privilegeType: 'core' },
      { sbsCode: '35010', serviceNameAr: 'فحص الحوض', serviceNameEn: 'Pelvic Exam', privilegeType: 'core' },
      { sbsCode: '35020', serviceNameAr: 'مسحة عنق الرحم', serviceNameEn: 'Pap Smear', privilegeType: 'core' },
      { sbsCode: '35030', serviceNameAr: 'سونار الحمل', serviceNameEn: 'Obstetric Ultrasound', privilegeType: 'core' },
      { sbsCode: '35040', serviceNameAr: 'تخطيط نبض الجنين', serviceNameEn: 'Fetal Heart Monitoring', privilegeType: 'core' },
      { sbsCode: '35100', serviceNameAr: 'ولادة طبيعية', serviceNameEn: 'Vaginal Delivery', privilegeType: 'core' },
      { sbsCode: '35110', serviceNameAr: 'ولادة قيصرية', serviceNameEn: 'Cesarean Section', privilegeType: 'core' },
      { sbsCode: '35120', serviceNameAr: 'تنظير الرحم', serviceNameEn: 'Hysteroscopy', privilegeType: 'core' },
      { sbsCode: '35130', serviceNameAr: 'منظار البطن النسائي', serviceNameEn: 'Gynecologic Laparoscopy', privilegeType: 'core' },
      { sbsCode: '35140', serviceNameAr: 'استئصال الرحم', serviceNameEn: 'Hysterectomy', privilegeType: 'extended' },
      { sbsCode: '35150', serviceNameAr: 'علاج العقم', serviceNameEn: 'Infertility Treatment', privilegeType: 'requires_training', trainingRequirementAr: 'زمالة طب الإنجاب', trainingRequirementEn: 'Reproductive Endocrinology Fellowship' },
      { sbsCode: '35160', serviceNameAr: 'أطفال الأنابيب IVF', serviceNameEn: 'IVF', privilegeType: 'requires_training', trainingRequirementAr: 'زمالة طب الإنجاب', trainingRequirementEn: 'Reproductive Endocrinology Fellowship' },
      { sbsCode: '35170', serviceNameAr: 'جراحة سرطان النساء', serviceNameEn: 'Gynecologic Oncology Surgery', privilegeType: 'requires_training', trainingRequirementAr: 'زمالة أورام النساء', trainingRequirementEn: 'Gynecologic Oncology Fellowship' },
    ]
  },
  {
    id: 'pediatrics',
    nameAr: 'طب الأطفال',
    nameEn: 'Pediatrics',
    categoryAr: 'طب الأطفال',
    categoryEn: 'Pediatrics',
    description: {
      ar: 'رعاية صحة الأطفال منذ الولادة وحتى المراهقة',
      en: 'Healthcare for children from birth to adolescence'
    },
    services: [
      { sbsCode: '50001', serviceNameAr: 'استشارة أطفال', serviceNameEn: 'Pediatric Consultation', privilegeType: 'core' },
      { sbsCode: '50002', serviceNameAr: 'متابعة أطفال', serviceNameEn: 'Pediatric Follow-up', privilegeType: 'core' },
      { sbsCode: '50010', serviceNameAr: 'فحص حديثي الولادة', serviceNameEn: 'Newborn Examination', privilegeType: 'core' },
      { sbsCode: '50020', serviceNameAr: 'التطعيمات', serviceNameEn: 'Vaccinations', privilegeType: 'core' },
      { sbsCode: '50030', serviceNameAr: 'متابعة النمو والتطور', serviceNameEn: 'Growth & Development Monitoring', privilegeType: 'core' },
      { sbsCode: '50040', serviceNameAr: 'البزل القطني للأطفال', serviceNameEn: 'Pediatric Lumbar Puncture', privilegeType: 'extended' },
      { sbsCode: '50050', serviceNameAr: 'تركيب أنبوب تغذية', serviceNameEn: 'NG Tube Insertion', privilegeType: 'core' },
      { sbsCode: '50060', serviceNameAr: 'إنعاش حديثي الولادة', serviceNameEn: 'Neonatal Resuscitation', privilegeType: 'requires_training', trainingRequirementAr: 'شهادة NRP', trainingRequirementEn: 'NRP Certification' },
    ]
  },
  {
    id: 'emergency-medicine',
    nameAr: 'طب الطوارئ',
    nameEn: 'Emergency Medicine',
    categoryAr: 'طب الطوارئ',
    categoryEn: 'Emergency Medicine',
    description: {
      ar: 'تقييم وعلاج الحالات الطارئة والحرجة',
      en: 'Evaluation and treatment of acute and critical conditions'
    },
    services: [
      { sbsCode: '10001', serviceNameAr: 'تقييم طوارئ', serviceNameEn: 'Emergency Assessment', privilegeType: 'core' },
      { sbsCode: '10010', serviceNameAr: 'إنعاش قلبي رئوي', serviceNameEn: 'CPR', privilegeType: 'core' },
      { sbsCode: '10020', serviceNameAr: 'تأمين مجرى الهواء', serviceNameEn: 'Airway Management', privilegeType: 'core' },
      { sbsCode: '10030', serviceNameAr: 'التنبيب الرغامي', serviceNameEn: 'Endotracheal Intubation', privilegeType: 'core' },
      { sbsCode: '10040', serviceNameAr: 'تركيب خط وريدي مركزي', serviceNameEn: 'Central Line Placement', privilegeType: 'core' },
      { sbsCode: '10050', serviceNameAr: 'بزل الصدر الطارئ', serviceNameEn: 'Emergency Thoracentesis', privilegeType: 'core' },
      { sbsCode: '10060', serviceNameAr: 'أنبوب الصدر الطارئ', serviceNameEn: 'Emergency Chest Tube', privilegeType: 'core' },
      { sbsCode: '10070', serviceNameAr: 'خياطة الجروح', serviceNameEn: 'Wound Suturing', privilegeType: 'core' },
      { sbsCode: '10080', serviceNameAr: 'تثبيت الكسور المبدئي', serviceNameEn: 'Initial Fracture Stabilization', privilegeType: 'core' },
      { sbsCode: '10090', serviceNameAr: 'سونار طوارئ FAST', serviceNameEn: 'FAST Ultrasound', privilegeType: 'core' },
      { sbsCode: '10100', serviceNameAr: 'التخدير الإجرائي', serviceNameEn: 'Procedural Sedation', privilegeType: 'extended' },
      { sbsCode: '10110', serviceNameAr: 'فتح مجرى هوائي جراحي', serviceNameEn: 'Surgical Airway', privilegeType: 'extended' },
    ]
  },
  {
    id: 'family-medicine',
    nameAr: 'طب الأسرة',
    nameEn: 'Family Medicine',
    categoryAr: 'طب الأسرة',
    categoryEn: 'Family Medicine',
    description: {
      ar: 'الرعاية الصحية الأولية الشاملة لجميع الأعمار',
      en: 'Comprehensive primary care for all ages'
    },
    services: [
      { sbsCode: '12001', serviceNameAr: 'استشارة طب أسرة', serviceNameEn: 'Family Medicine Consultation', privilegeType: 'core' },
      { sbsCode: '12002', serviceNameAr: 'متابعة طب أسرة', serviceNameEn: 'Family Medicine Follow-up', privilegeType: 'core' },
      { sbsCode: '12010', serviceNameAr: 'الفحص الدوري', serviceNameEn: 'Periodic Health Exam', privilegeType: 'core' },
      { sbsCode: '12020', serviceNameAr: 'إدارة الأمراض المزمنة', serviceNameEn: 'Chronic Disease Management', privilegeType: 'core' },
      { sbsCode: '12030', serviceNameAr: 'التطعيمات', serviceNameEn: 'Vaccinations', privilegeType: 'core' },
      { sbsCode: '12040', serviceNameAr: 'إجراءات العيادة البسيطة', serviceNameEn: 'Minor Office Procedures', privilegeType: 'core' },
      { sbsCode: '12050', serviceNameAr: 'رعاية الحمل منخفض الخطورة', serviceNameEn: 'Low-Risk Prenatal Care', privilegeType: 'extended' },
      { sbsCode: '12060', serviceNameAr: 'رعاية حديثي الولادة', serviceNameEn: 'Newborn Care', privilegeType: 'extended' },
      { sbsCode: '12070', serviceNameAr: 'الإرشاد الصحي', serviceNameEn: 'Health Counseling', privilegeType: 'core' },
    ]
  },
  {
    id: 'urology',
    nameAr: 'جراحة المسالك البولية',
    nameEn: 'Urology',
    categoryAr: 'المسالك البولية',
    categoryEn: 'Urology',
    description: {
      ar: 'تشخيص وعلاج أمراض الجهاز البولي والتناسلي الذكري',
      en: 'Diagnosis and treatment of urinary tract and male reproductive system'
    },
    services: [
      { sbsCode: '36001', serviceNameAr: 'استشارة مسالك بولية', serviceNameEn: 'Urology Consultation', privilegeType: 'core' },
      { sbsCode: '36002', serviceNameAr: 'متابعة مسالك بولية', serviceNameEn: 'Urology Follow-up', privilegeType: 'core' },
      { sbsCode: '36010', serviceNameAr: 'تنظير المثانة', serviceNameEn: 'Cystoscopy', privilegeType: 'core' },
      { sbsCode: '36020', serviceNameAr: 'تركيب قسطرة بولية', serviceNameEn: 'Urinary Catheterization', privilegeType: 'core' },
      { sbsCode: '36030', serviceNameAr: 'دراسة ديناميكية البول', serviceNameEn: 'Urodynamic Study', privilegeType: 'core' },
      { sbsCode: '36100', serviceNameAr: 'استئصال البروستاتا بالمنظار', serviceNameEn: 'TURP', privilegeType: 'core' },
      { sbsCode: '36110', serviceNameAr: 'تفتيت الحصى بالمنظار', serviceNameEn: 'Ureteroscopic Lithotripsy', privilegeType: 'core' },
      { sbsCode: '36120', serviceNameAr: 'تفتيت الحصى بالموجات', serviceNameEn: 'ESWL', privilegeType: 'core' },
      { sbsCode: '36130', serviceNameAr: 'استئصال الكلية', serviceNameEn: 'Nephrectomy', privilegeType: 'extended' },
      { sbsCode: '36140', serviceNameAr: 'استئصال البروستاتا الجذري', serviceNameEn: 'Radical Prostatectomy', privilegeType: 'requires_training', trainingRequirementAr: 'زمالة أورام المسالك', trainingRequirementEn: 'Urologic Oncology Fellowship' },
      { sbsCode: '36150', serviceNameAr: 'جراحة المسالك بالروبوت', serviceNameEn: 'Robotic Urologic Surgery', privilegeType: 'requires_training', trainingRequirementAr: 'تدريب الجراحة الروبوتية', trainingRequirementEn: 'Robotic Surgery Training' },
    ]
  },
  {
    id: 'psychiatry',
    nameAr: 'الطب النفسي',
    nameEn: 'Psychiatry',
    categoryAr: 'الطب النفسي',
    categoryEn: 'Psychiatry',
    description: {
      ar: 'تشخيص وعلاج الاضطرابات النفسية والسلوكية',
      en: 'Diagnosis and treatment of mental and behavioral disorders'
    },
    services: [
      { sbsCode: '16001', serviceNameAr: 'استشارة نفسية', serviceNameEn: 'Psychiatric Consultation', privilegeType: 'core' },
      { sbsCode: '16002', serviceNameAr: 'متابعة نفسية', serviceNameEn: 'Psychiatric Follow-up', privilegeType: 'core' },
      { sbsCode: '16010', serviceNameAr: 'التقييم النفسي الشامل', serviceNameEn: 'Comprehensive Psychiatric Assessment', privilegeType: 'core' },
      { sbsCode: '16020', serviceNameAr: 'إدارة الأدوية النفسية', serviceNameEn: 'Psychotropic Medication Management', privilegeType: 'core' },
      { sbsCode: '16030', serviceNameAr: 'العلاج النفسي الفردي', serviceNameEn: 'Individual Psychotherapy', privilegeType: 'core' },
      { sbsCode: '16040', serviceNameAr: 'العلاج النفسي الجماعي', serviceNameEn: 'Group Psychotherapy', privilegeType: 'core' },
      { sbsCode: '16050', serviceNameAr: 'تقييم الخطورة', serviceNameEn: 'Risk Assessment', privilegeType: 'core' },
      { sbsCode: '16060', serviceNameAr: 'العلاج بالصدمات الكهربائية', serviceNameEn: 'ECT', privilegeType: 'requires_training', trainingRequirementAr: 'تدريب ECT', trainingRequirementEn: 'ECT Training' },
      { sbsCode: '16070', serviceNameAr: 'طب نفسي الأطفال', serviceNameEn: 'Child & Adolescent Psychiatry', privilegeType: 'requires_training', trainingRequirementAr: 'زمالة طب نفسي الأطفال', trainingRequirementEn: 'Child Psychiatry Fellowship' },
      { sbsCode: '16080', serviceNameAr: 'طب الإدمان', serviceNameEn: 'Addiction Medicine', privilegeType: 'requires_training', trainingRequirementAr: 'تدريب طب الإدمان', trainingRequirementEn: 'Addiction Medicine Training' },
    ]
  },
  {
    id: 'anesthesiology',
    nameAr: 'التخدير',
    nameEn: 'Anesthesiology',
    categoryAr: 'التخدير',
    categoryEn: 'Anesthesiology',
    description: {
      ar: 'التخدير وإدارة الألم ورعاية المرضى الحرجة',
      en: 'Anesthesia, pain management, and critical care'
    },
    services: [
      { sbsCode: '20001', serviceNameAr: 'تقييم ما قبل التخدير', serviceNameEn: 'Pre-anesthetic Assessment', privilegeType: 'core' },
      { sbsCode: '20010', serviceNameAr: 'تخدير عام', serviceNameEn: 'General Anesthesia', privilegeType: 'core' },
      { sbsCode: '20020', serviceNameAr: 'تخدير نصفي', serviceNameEn: 'Spinal Anesthesia', privilegeType: 'core' },
      { sbsCode: '20030', serviceNameAr: 'تخدير فوق الجافية', serviceNameEn: 'Epidural Anesthesia', privilegeType: 'core' },
      { sbsCode: '20040', serviceNameAr: 'إحصار عصبي طرفي', serviceNameEn: 'Peripheral Nerve Block', privilegeType: 'core' },
      { sbsCode: '20050', serviceNameAr: 'التخدير الموضعي المراقب', serviceNameEn: 'Monitored Anesthesia Care', privilegeType: 'core' },
      { sbsCode: '20060', serviceNameAr: 'إدارة مجرى الهواء الصعب', serviceNameEn: 'Difficult Airway Management', privilegeType: 'extended' },
      { sbsCode: '20070', serviceNameAr: 'تخدير القلب المفتوح', serviceNameEn: 'Cardiac Anesthesia', privilegeType: 'requires_training', trainingRequirementAr: 'زمالة تخدير القلب', trainingRequirementEn: 'Cardiac Anesthesia Fellowship' },
      { sbsCode: '20080', serviceNameAr: 'تخدير الأطفال', serviceNameEn: 'Pediatric Anesthesia', privilegeType: 'requires_training', trainingRequirementAr: 'زمالة تخدير الأطفال', trainingRequirementEn: 'Pediatric Anesthesia Fellowship' },
      { sbsCode: '20090', serviceNameAr: 'إدارة الألم التداخلية', serviceNameEn: 'Interventional Pain Management', privilegeType: 'requires_training', trainingRequirementAr: 'زمالة علاج الألم', trainingRequirementEn: 'Pain Medicine Fellowship' },
    ]
  },
  {
    id: 'radiology',
    nameAr: 'الأشعة التشخيصية',
    nameEn: 'Diagnostic Radiology',
    categoryAr: 'الأشعة',
    categoryEn: 'Radiology',
    description: {
      ar: 'التصوير الطبي وتشخيص الأمراض بالأشعة',
      en: 'Medical imaging and radiological diagnosis'
    },
    services: [
      { sbsCode: '60001', serviceNameAr: 'استشارة أشعة', serviceNameEn: 'Radiology Consultation', privilegeType: 'core' },
      { sbsCode: '60010', serviceNameAr: 'تفسير الأشعة السينية', serviceNameEn: 'X-Ray Interpretation', privilegeType: 'core' },
      { sbsCode: '60020', serviceNameAr: 'تفسير الأشعة المقطعية', serviceNameEn: 'CT Interpretation', privilegeType: 'core' },
      { sbsCode: '60030', serviceNameAr: 'تفسير الرنين المغناطيسي', serviceNameEn: 'MRI Interpretation', privilegeType: 'core' },
      { sbsCode: '60040', serviceNameAr: 'تفسير الموجات فوق الصوتية', serviceNameEn: 'Ultrasound Interpretation', privilegeType: 'core' },
      { sbsCode: '60050', serviceNameAr: 'تصوير الثدي الشعاعي', serviceNameEn: 'Mammography Interpretation', privilegeType: 'core' },
      { sbsCode: '60100', serviceNameAr: 'خزعة موجهة بالأشعة', serviceNameEn: 'Image-Guided Biopsy', privilegeType: 'extended' },
      { sbsCode: '60110', serviceNameAr: 'الأشعة التداخلية - الأوعية', serviceNameEn: 'Interventional Radiology - Vascular', privilegeType: 'requires_training', trainingRequirementAr: 'زمالة الأشعة التداخلية', trainingRequirementEn: 'Interventional Radiology Fellowship' },
      { sbsCode: '60120', serviceNameAr: 'قسطرة الشريان الكبدي', serviceNameEn: 'Hepatic Artery Embolization', privilegeType: 'requires_training', trainingRequirementAr: 'زمالة الأشعة التداخلية', trainingRequirementEn: 'Interventional Radiology Fellowship' },
    ]
  },
  {
    id: 'endocrinology',
    nameAr: 'الغدد الصماء والسكري',
    nameEn: 'Endocrinology & Diabetes',
    categoryAr: 'الغدد الصماء',
    categoryEn: 'Endocrinology',
    description: {
      ar: 'تشخيص وعلاج أمراض الغدد الصماء والسكري',
      en: 'Diagnosis and treatment of endocrine disorders and diabetes'
    },
    services: [
      { sbsCode: '11801', serviceNameAr: 'استشارة غدد صماء', serviceNameEn: 'Endocrinology Consultation', privilegeType: 'core' },
      { sbsCode: '11802', serviceNameAr: 'متابعة غدد صماء', serviceNameEn: 'Endocrinology Follow-up', privilegeType: 'core' },
      { sbsCode: '11810', serviceNameAr: 'إدارة مرض السكري', serviceNameEn: 'Diabetes Management', privilegeType: 'core' },
      { sbsCode: '11820', serviceNameAr: 'تركيب مضخة الأنسولين', serviceNameEn: 'Insulin Pump Setup', privilegeType: 'core' },
      { sbsCode: '11830', serviceNameAr: 'المراقبة المستمرة للسكر', serviceNameEn: 'Continuous Glucose Monitoring', privilegeType: 'core' },
      { sbsCode: '11840', serviceNameAr: 'إدارة أمراض الغدة الدرقية', serviceNameEn: 'Thyroid Disease Management', privilegeType: 'core' },
      { sbsCode: '11850', serviceNameAr: 'خزعة الغدة الدرقية بالإبرة', serviceNameEn: 'Thyroid FNA Biopsy', privilegeType: 'extended' },
      { sbsCode: '11860', serviceNameAr: 'إدارة هشاشة العظام', serviceNameEn: 'Osteoporosis Management', privilegeType: 'core' },
      { sbsCode: '11870', serviceNameAr: 'اختبارات تحفيز الغدد', serviceNameEn: 'Endocrine Stimulation Tests', privilegeType: 'core' },
    ]
  },
  {
    id: 'sleep-medicine',
    nameAr: 'طب اضطرابات النوم',
    nameEn: 'Sleep Medicine',
    categoryAr: 'طب النوم',
    categoryEn: 'Sleep Medicine',
    description: {
      ar: 'تشخيص وعلاج اضطرابات النوم المختلفة',
      en: 'Diagnosis and treatment of various sleep disorders'
    },
    services: [
      { sbsCode: '11901', serviceNameAr: 'استشارة طب النوم', serviceNameEn: 'Sleep Medicine Consultation', privilegeType: 'core' },
      { sbsCode: '11902', serviceNameAr: 'متابعة طب النوم', serviceNameEn: 'Sleep Medicine Follow-up', privilegeType: 'core' },
      { sbsCode: '11460', serviceNameAr: 'دراسة اضطرابات النوم (Polysomnography)', serviceNameEn: 'Sleep Study (Polysomnography)', privilegeType: 'core' },
      { sbsCode: '11470', serviceNameAr: 'معايرة جهاز CPAP', serviceNameEn: 'CPAP Titration', privilegeType: 'core' },
      { sbsCode: '11910', serviceNameAr: 'اختبار النوم المنزلي', serviceNameEn: 'Home Sleep Testing', privilegeType: 'core' },
      { sbsCode: '11920', serviceNameAr: 'اختبار كمون النوم المتعدد (MSLT)', serviceNameEn: 'Multiple Sleep Latency Test (MSLT)', privilegeType: 'core' },
      { sbsCode: '11930', serviceNameAr: 'اختبار الحفاظ على اليقظة (MWT)', serviceNameEn: 'Maintenance of Wakefulness Test (MWT)', privilegeType: 'core' },
      { sbsCode: '11940', serviceNameAr: 'تقييم انقطاع التنفس أثناء النوم', serviceNameEn: 'Sleep Apnea Assessment', privilegeType: 'core' },
      { sbsCode: '11950', serviceNameAr: 'إدارة الأرق المزمن', serviceNameEn: 'Chronic Insomnia Management', privilegeType: 'core' },
      { sbsCode: '11960', serviceNameAr: 'علاج اضطرابات إيقاع الساعة البيولوجية', serviceNameEn: 'Circadian Rhythm Disorder Treatment', privilegeType: 'extended' },
    ]
  },
];

// Helper function to get all services across all specialties
export const getAllServices = (): ServicePrivilege[] => {
  const allServices: ServicePrivilege[] = [];
  physicianSpecialties.forEach(specialty => {
    specialty.services.forEach(service => {
      if (!allServices.find(s => s.sbsCode === service.sbsCode)) {
        allServices.push(service);
      }
    });
  });
  return allServices;
};

// Helper function to find specialties that can perform a specific service
export const findSpecialtiesForService = (sbsCode: string): { specialty: PhysicianSpecialty; privilege: ServicePrivilege }[] => {
  const results: { specialty: PhysicianSpecialty; privilege: ServicePrivilege }[] = [];
  physicianSpecialties.forEach(specialty => {
    const service = specialty.services.find(s => s.sbsCode === sbsCode);
    if (service) {
      results.push({ specialty, privilege: service });
    }
  });
  return results;
};
