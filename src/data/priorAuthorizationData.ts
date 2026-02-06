// Prior Authorization and Minimum Data Set (MDS) Data

export interface MDSField {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  required: boolean;
  category: 'demographic' | 'clinical' | 'service' | 'financial';
}

export interface AuthorizationStep {
  id: number;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
}

export interface RejectionReason {
  id: string;
  nameAr: string;
  nameEn: string;
  percentageAr: string;
  percentageEn: string;
  solutionAr: string;
  solutionEn: string;
}

// MDS Fields for Claims and Prior Authorization (Comprehensive CHI List)
export const mdsFields: MDSField[] = [
  // Demographic Data - البيانات الديموغرافية
  { id: 'patient_id', nameAr: 'رقم هوية المريض', nameEn: 'Patient ID', descriptionAr: 'رقم الهوية الوطنية أو الإقامة', descriptionEn: 'National ID or Iqama number', required: true, category: 'demographic' },
  { id: 'patient_name', nameAr: 'اسم المريض الرباعي', nameEn: 'Full Patient Name', descriptionAr: 'الاسم الرباعي للمريض كما في الهوية', descriptionEn: 'Full patient name as per ID', required: true, category: 'demographic' },
  { id: 'date_of_birth', nameAr: 'تاريخ الميلاد', nameEn: 'Date of Birth', descriptionAr: 'تاريخ ميلاد المريض (هجري/ميلادي)', descriptionEn: 'Patient date of birth (Hijri/Gregorian)', required: true, category: 'demographic' },
  { id: 'gender', nameAr: 'الجنس', nameEn: 'Gender', descriptionAr: 'جنس المريض (ذكر/أنثى)', descriptionEn: 'Patient gender (Male/Female)', required: true, category: 'demographic' },
  { id: 'nationality', nameAr: 'الجنسية', nameEn: 'Nationality', descriptionAr: 'جنسية المريض', descriptionEn: 'Patient nationality', required: true, category: 'demographic' },
  { id: 'marital_status', nameAr: 'الحالة الاجتماعية', nameEn: 'Marital Status', descriptionAr: 'الحالة الاجتماعية للمريض', descriptionEn: 'Patient marital status', required: false, category: 'demographic' },
  { id: 'contact_number', nameAr: 'رقم الجوال', nameEn: 'Mobile Number', descriptionAr: 'رقم جوال المريض للتواصل', descriptionEn: 'Patient mobile number for contact', required: true, category: 'demographic' },
  { id: 'email', nameAr: 'البريد الإلكتروني', nameEn: 'Email Address', descriptionAr: 'البريد الإلكتروني للمريض', descriptionEn: 'Patient email address', required: false, category: 'demographic' },
  { id: 'national_address', nameAr: 'العنوان الوطني', nameEn: 'National Address', descriptionAr: 'العنوان الوطني المسجل في البريد السعودي', descriptionEn: 'National address registered with Saudi Post', required: true, category: 'demographic' },
  { id: 'insurance_policy', nameAr: 'رقم وثيقة التأمين', nameEn: 'Insurance Policy Number', descriptionAr: 'رقم وثيقة التأمين الصحي النشطة', descriptionEn: 'Active health insurance policy number', required: true, category: 'demographic' },
  { id: 'insurance_company', nameAr: 'شركة التأمين', nameEn: 'Insurance Company', descriptionAr: 'اسم شركة التأمين المعتمدة', descriptionEn: 'Licensed insurance company name', required: true, category: 'demographic' },
  { id: 'policy_class', nameAr: 'فئة الوثيقة', nameEn: 'Policy Class', descriptionAr: 'فئة الوثيقة التأمينية (VIP/A/B/C)', descriptionEn: 'Insurance policy class (VIP/A/B/C)', required: true, category: 'demographic' },
  { id: 'policy_start_date', nameAr: 'تاريخ بداية الوثيقة', nameEn: 'Policy Start Date', descriptionAr: 'تاريخ بداية سريان الوثيقة', descriptionEn: 'Policy effective start date', required: true, category: 'demographic' },
  { id: 'policy_end_date', nameAr: 'تاريخ انتهاء الوثيقة', nameEn: 'Policy End Date', descriptionAr: 'تاريخ انتهاء صلاحية الوثيقة', descriptionEn: 'Policy expiration date', required: true, category: 'demographic' },
  { id: 'employer_name', nameAr: 'اسم صاحب العمل', nameEn: 'Employer Name', descriptionAr: 'اسم جهة العمل المؤمنة', descriptionEn: 'Insuring employer name', required: true, category: 'demographic' },
  { id: 'employer_cr', nameAr: 'رقم السجل التجاري', nameEn: 'Commercial Registration', descriptionAr: 'رقم السجل التجاري لصاحب العمل', descriptionEn: 'Employer commercial registration number', required: true, category: 'demographic' },
  { id: 'beneficiary_type', nameAr: 'نوع المستفيد', nameEn: 'Beneficiary Type', descriptionAr: 'نوع المستفيد (أصيل/تابع)', descriptionEn: 'Beneficiary type (Primary/Dependent)', required: true, category: 'demographic' },
  { id: 'relationship', nameAr: 'صلة القرابة', nameEn: 'Relationship', descriptionAr: 'صلة القرابة بالمؤمن له الأصيل', descriptionEn: 'Relationship to primary insured', required: false, category: 'demographic' },

  // Clinical Data - البيانات السريرية
  { id: 'chief_complaint', nameAr: 'الشكوى الرئيسية', nameEn: 'Chief Complaint', descriptionAr: 'الشكوى الرئيسية التي يعاني منها المريض', descriptionEn: 'Main complaint the patient is presenting with', required: true, category: 'clinical' },
  { id: 'present_illness', nameAr: 'تاريخ المرض الحالي', nameEn: 'History of Present Illness', descriptionAr: 'وصف تفصيلي لتطور الحالة المرضية الحالية', descriptionEn: 'Detailed description of current illness progression', required: true, category: 'clinical' },
  { id: 'diagnosis_code', nameAr: 'رمز التشخيص الرئيسي (ICD-10)', nameEn: 'Primary Diagnosis Code (ICD-10)', descriptionAr: 'رمز التشخيص الرئيسي حسب تصنيف ICD-10-AM', descriptionEn: 'Primary diagnosis code per ICD-10-AM classification', required: true, category: 'clinical' },
  { id: 'secondary_diagnosis', nameAr: 'التشخيصات الثانوية', nameEn: 'Secondary Diagnoses', descriptionAr: 'رموز التشخيصات الثانوية المصاحبة', descriptionEn: 'Secondary accompanying diagnosis codes', required: false, category: 'clinical' },
  { id: 'diagnosis_description', nameAr: 'وصف التشخيص', nameEn: 'Diagnosis Description', descriptionAr: 'وصف نصي للتشخيص الطبي', descriptionEn: 'Text description of medical diagnosis', required: true, category: 'clinical' },
  { id: 'medical_history', nameAr: 'التاريخ المرضي السابق', nameEn: 'Past Medical History', descriptionAr: 'ملخص التاريخ الطبي السابق للمريض', descriptionEn: 'Summary of patient past medical history', required: true, category: 'clinical' },
  { id: 'surgical_history', nameAr: 'التاريخ الجراحي', nameEn: 'Surgical History', descriptionAr: 'العمليات الجراحية السابقة', descriptionEn: 'Previous surgical procedures', required: false, category: 'clinical' },
  { id: 'family_history', nameAr: 'التاريخ العائلي', nameEn: 'Family History', descriptionAr: 'التاريخ المرضي للعائلة ذو الصلة', descriptionEn: 'Relevant family medical history', required: false, category: 'clinical' },
  { id: 'allergies', nameAr: 'الحساسية', nameEn: 'Allergies', descriptionAr: 'الحساسية المعروفة للمريض (أدوية/طعام/أخرى)', descriptionEn: 'Known allergies (medications/food/other)', required: true, category: 'clinical' },
  { id: 'current_medications', nameAr: 'الأدوية الحالية', nameEn: 'Current Medications', descriptionAr: 'قائمة الأدوية الحالية التي يتناولها المريض', descriptionEn: 'List of current medications patient is taking', required: true, category: 'clinical' },
  { id: 'vital_signs', nameAr: 'العلامات الحيوية', nameEn: 'Vital Signs', descriptionAr: 'العلامات الحيوية (ضغط الدم، النبض، الحرارة، التنفس)', descriptionEn: 'Vital signs (BP, pulse, temperature, respiration)', required: true, category: 'clinical' },
  { id: 'clinical_examination', nameAr: 'نتائج الفحص السريري', nameEn: 'Clinical Examination Findings', descriptionAr: 'نتائج الفحص البدني والسريري التفصيلية', descriptionEn: 'Detailed physical and clinical examination findings', required: true, category: 'clinical' },
  { id: 'lab_results', nameAr: 'نتائج الفحوصات المخبرية', nameEn: 'Laboratory Results', descriptionAr: 'نتائج التحاليل والفحوصات المخبرية ذات الصلة', descriptionEn: 'Relevant laboratory test results', required: false, category: 'clinical' },
  { id: 'radiology_results', nameAr: 'نتائج الأشعة', nameEn: 'Radiology Results', descriptionAr: 'نتائج الفحوصات الإشعاعية والتقارير', descriptionEn: 'Radiology examination results and reports', required: false, category: 'clinical' },
  { id: 'pathology_results', nameAr: 'نتائج علم الأمراض', nameEn: 'Pathology Results', descriptionAr: 'نتائج الخزعات والفحوصات المرضية', descriptionEn: 'Biopsy and pathology examination results', required: false, category: 'clinical' },
  { id: 'treatment_plan', nameAr: 'خطة العلاج المقترحة', nameEn: 'Proposed Treatment Plan', descriptionAr: 'الخطة العلاجية المقترحة للمريض بالتفصيل', descriptionEn: 'Detailed proposed treatment plan for patient', required: true, category: 'clinical' },
  { id: 'medical_justification', nameAr: 'المبرر الطبي', nameEn: 'Medical Justification', descriptionAr: 'المبرر الطبي للخدمة المطلوبة مع الأدلة السريرية', descriptionEn: 'Medical justification for requested service with clinical evidence', required: true, category: 'clinical' },
  { id: 'previous_treatments', nameAr: 'العلاجات السابقة', nameEn: 'Previous Treatments', descriptionAr: 'العلاجات السابقة المجربة ونتائجها', descriptionEn: 'Previous treatments tried and their outcomes', required: false, category: 'clinical' },
  { id: 'clinical_notes', nameAr: 'الملاحظات السريرية', nameEn: 'Clinical Notes', descriptionAr: 'ملاحظات سريرية إضافية من الطبيب المعالج', descriptionEn: 'Additional clinical notes from treating physician', required: false, category: 'clinical' },
  { id: 'prognosis', nameAr: 'التنبؤ بمسار المرض', nameEn: 'Prognosis', descriptionAr: 'التنبؤ بتطور الحالة والنتائج المتوقعة', descriptionEn: 'Expected disease progression and outcomes', required: false, category: 'clinical' },
  { id: 'comorbidities', nameAr: 'الأمراض المصاحبة', nameEn: 'Comorbidities', descriptionAr: 'الأمراض المزمنة المصاحبة للمريض', descriptionEn: 'Chronic conditions accompanying the patient', required: false, category: 'clinical' },
  { id: 'severity_level', nameAr: 'مستوى الشدة', nameEn: 'Severity Level', descriptionAr: 'مستوى شدة الحالة (خفيف/متوسط/شديد/حرج)', descriptionEn: 'Condition severity level (mild/moderate/severe/critical)', required: true, category: 'clinical' },

  // Service Data - بيانات الخدمة
  { id: 'service_code', nameAr: 'رمز الخدمة (SBS V3)', nameEn: 'Service Code (SBS V3)', descriptionAr: 'رمز الخدمة حسب تصنيف SBS V3 المعتمد', descriptionEn: 'Service code per approved SBS V3 classification', required: true, category: 'service' },
  { id: 'service_description', nameAr: 'وصف الخدمة', nameEn: 'Service Description', descriptionAr: 'وصف تفصيلي للخدمة المطلوبة', descriptionEn: 'Detailed description of requested service', required: true, category: 'service' },
  { id: 'service_category', nameAr: 'فئة الخدمة', nameEn: 'Service Category', descriptionAr: 'فئة الخدمة (تشخيصية/علاجية/جراحية/أخرى)', descriptionEn: 'Service category (diagnostic/therapeutic/surgical/other)', required: true, category: 'service' },
  { id: 'service_quantity', nameAr: 'كمية الخدمة', nameEn: 'Service Quantity', descriptionAr: 'عدد الوحدات أو الجلسات المطلوبة', descriptionEn: 'Number of units or sessions required', required: true, category: 'service' },
  { id: 'service_date', nameAr: 'تاريخ الخدمة المتوقع', nameEn: 'Expected Service Date', descriptionAr: 'التاريخ المتوقع لتقديم الخدمة', descriptionEn: 'Expected date for service delivery', required: true, category: 'service' },
  { id: 'service_urgency', nameAr: 'درجة الاستعجال', nameEn: 'Urgency Level', descriptionAr: 'درجة استعجال الخدمة (طارئ/عاجل/روتيني)', descriptionEn: 'Service urgency (emergency/urgent/routine)', required: true, category: 'service' },
  { id: 'provider_id', nameAr: 'رقم مقدم الخدمة', nameEn: 'Provider ID', descriptionAr: 'رقم تعريف مقدم الخدمة الصحية في نفيس', descriptionEn: 'Healthcare provider NAPHIES identification number', required: true, category: 'service' },
  { id: 'provider_name', nameAr: 'اسم مقدم الخدمة', nameEn: 'Provider Name', descriptionAr: 'اسم المنشأة الصحية مقدمة الخدمة', descriptionEn: 'Healthcare facility providing the service', required: true, category: 'service' },
  { id: 'provider_type', nameAr: 'نوع مقدم الخدمة', nameEn: 'Provider Type', descriptionAr: 'نوع المنشأة (مستشفى/مركز/عيادة)', descriptionEn: 'Facility type (hospital/center/clinic)', required: true, category: 'service' },
  { id: 'physician_id', nameAr: 'رقم الطبيب المعالج', nameEn: 'Treating Physician ID', descriptionAr: 'رقم ترخيص الطبيب المعالج في الهيئة', descriptionEn: 'Treating physician license number', required: true, category: 'service' },
  { id: 'physician_name', nameAr: 'اسم الطبيب المعالج', nameEn: 'Treating Physician Name', descriptionAr: 'الاسم الكامل للطبيب المعالج', descriptionEn: 'Full name of treating physician', required: true, category: 'service' },
  { id: 'physician_specialty', nameAr: 'تخصص الطبيب', nameEn: 'Physician Specialty', descriptionAr: 'التخصص الطبي للطبيب المعالج', descriptionEn: 'Medical specialty of treating physician', required: true, category: 'service' },
  { id: 'referral_source', nameAr: 'مصدر التحويل', nameEn: 'Referral Source', descriptionAr: 'الجهة المحولة للمريض (إن وجدت)', descriptionEn: 'Referring entity (if applicable)', required: false, category: 'service' },
  { id: 'encounter_type', nameAr: 'نوع الزيارة', nameEn: 'Encounter Type', descriptionAr: 'نوع الزيارة (خارجية/طوارئ/تنويم)', descriptionEn: 'Visit type (outpatient/emergency/inpatient)', required: true, category: 'service' },
  { id: 'admission_date', nameAr: 'تاريخ الدخول', nameEn: 'Admission Date', descriptionAr: 'تاريخ دخول المريض للمنشأة', descriptionEn: 'Patient admission date to facility', required: false, category: 'service' },
  { id: 'expected_los', nameAr: 'مدة الإقامة المتوقعة', nameEn: 'Expected Length of Stay', descriptionAr: 'مدة الإقامة المتوقعة بالأيام', descriptionEn: 'Expected length of stay in days', required: false, category: 'service' },
  { id: 'procedure_code', nameAr: 'رمز الإجراء', nameEn: 'Procedure Code', descriptionAr: 'رمز الإجراء الجراحي أو التداخلي', descriptionEn: 'Surgical or interventional procedure code', required: false, category: 'service' },
  { id: 'anesthesia_type', nameAr: 'نوع التخدير', nameEn: 'Anesthesia Type', descriptionAr: 'نوع التخدير المطلوب (موضعي/عام/نصفي)', descriptionEn: 'Required anesthesia type (local/general/spinal)', required: false, category: 'service' },

  // Financial Data - البيانات المالية
  { id: 'estimated_cost', nameAr: 'التكلفة التقديرية', nameEn: 'Estimated Cost', descriptionAr: 'التكلفة التقديرية الإجمالية للخدمة بالريال', descriptionEn: 'Total estimated cost of service in SAR', required: true, category: 'financial' },
  { id: 'unit_price', nameAr: 'سعر الوحدة', nameEn: 'Unit Price', descriptionAr: 'سعر الوحدة الواحدة من الخدمة', descriptionEn: 'Price per unit of service', required: true, category: 'financial' },
  { id: 'copayment', nameAr: 'نسبة التحمل', nameEn: 'Copayment Percentage', descriptionAr: 'نسبة تحمل المستفيد من التكلفة (%)', descriptionEn: 'Beneficiary cost sharing percentage', required: true, category: 'financial' },
  { id: 'copayment_amount', nameAr: 'مبلغ التحمل', nameEn: 'Copayment Amount', descriptionAr: 'المبلغ المتوقع تحمله من المستفيد بالريال', descriptionEn: 'Expected amount to be paid by beneficiary in SAR', required: true, category: 'financial' },
  { id: 'deductible', nameAr: 'مبلغ الخصم', nameEn: 'Deductible Amount', descriptionAr: 'مبلغ الخصم المطبق على الخدمة', descriptionEn: 'Deductible amount applied to service', required: false, category: 'financial' },
  { id: 'coverage_limit', nameAr: 'حد التغطية', nameEn: 'Coverage Limit', descriptionAr: 'الحد الأقصى للتغطية لهذا النوع من الخدمات', descriptionEn: 'Maximum coverage limit for this service type', required: false, category: 'financial' },
  { id: 'remaining_limit', nameAr: 'الرصيد المتبقي', nameEn: 'Remaining Limit', descriptionAr: 'الرصيد المتبقي من حد التغطية', descriptionEn: 'Remaining coverage limit balance', required: false, category: 'financial' },
  { id: 'currency', nameAr: 'العملة', nameEn: 'Currency', descriptionAr: 'عملة المبالغ (ريال سعودي)', descriptionEn: 'Currency of amounts (Saudi Riyal)', required: true, category: 'financial' },
  { id: 'invoice_number', nameAr: 'رقم الفاتورة', nameEn: 'Invoice Number', descriptionAr: 'رقم الفاتورة أو التقدير', descriptionEn: 'Invoice or estimate number', required: false, category: 'financial' },
  { id: 'payment_method', nameAr: 'طريقة الدفع', nameEn: 'Payment Method', descriptionAr: 'طريقة دفع حصة المستفيد', descriptionEn: 'Beneficiary payment method', required: false, category: 'financial' }
];

// Authorization Process Steps
export const authorizationSteps: AuthorizationStep[] = [
  {
    id: 1,
    titleAr: 'تقييم الحالة',
    titleEn: 'Case Assessment',
    descriptionAr: 'يقوم الطبيب المعالج بتقييم حالة المريض وتحديد الحاجة للخدمة',
    descriptionEn: 'The treating physician assesses the patient condition and determines the need for service'
  },
  {
    id: 2,
    titleAr: 'جمع البيانات',
    titleEn: 'Data Collection',
    descriptionAr: 'تجميع الحد الأدنى من البيانات المطلوبة (MDS) شاملة التشخيص والمبرر الطبي',
    descriptionEn: 'Collect minimum data set (MDS) including diagnosis and medical justification'
  },
  {
    id: 3,
    titleAr: 'إرسال الطلب',
    titleEn: 'Submit Request',
    descriptionAr: 'إرسال طلب الموافقة المسبقة عبر منصة نفيس',
    descriptionEn: 'Submit prior authorization request through Nafees platform'
  },
  {
    id: 4,
    titleAr: 'مراجعة الطلب',
    titleEn: 'Request Review',
    descriptionAr: 'مراجعة الطلب من قبل شركة التأمين والتحقق من استيفاء الشروط',
    descriptionEn: 'Insurance company reviews the request and verifies requirements'
  },
  {
    id: 5,
    titleAr: 'القرار',
    titleEn: 'Decision',
    descriptionAr: 'إصدار قرار الموافقة أو الرفض مع إبداء الأسباب',
    descriptionEn: 'Issue approval or rejection decision with reasons'
  },
  {
    id: 6,
    titleAr: 'تقديم الخدمة',
    titleEn: 'Service Delivery',
    descriptionAr: 'تقديم الخدمة للمريض بعد الحصول على الموافقة',
    descriptionEn: 'Provide service to patient after obtaining approval'
  }
];

// Detailed Rejection Codes (CHI Standard)
export interface RejectionCode {
  code: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  category: 'clinical' | 'administrative' | 'coverage' | 'technical';
  solutionAr: string;
  solutionEn: string;
  exampleAr?: string;
  exampleEn?: string;
}

export const rejectionCodes: RejectionCode[] = [
  // Clinical Rejections
  { code: 'CL001', nameAr: 'رمز التشخيص غير صالح', nameEn: 'Invalid Diagnosis Code', descriptionAr: 'رمز ICD-10 غير موجود أو غير صحيح', descriptionEn: 'ICD-10 code does not exist or is incorrect', category: 'clinical', solutionAr: 'التحقق من صحة رمز ICD-10-AM واستخدام النسخة المحدثة', solutionEn: 'Verify ICD-10-AM code validity and use updated version', exampleAr: 'استخدام رمز Z99.99 غير موجود بدلاً من Z99.9', exampleEn: 'Using code Z99.99 which does not exist instead of Z99.9' },
  { code: 'CL002', nameAr: 'عدم تطابق التشخيص مع الخدمة', nameEn: 'Diagnosis-Service Mismatch', descriptionAr: 'رمز الخدمة لا يتوافق مع رمز التشخيص المقدم', descriptionEn: 'Service code does not match the provided diagnosis code', category: 'clinical', solutionAr: 'مراجعة العلاقة بين التشخيص والخدمة المطلوبة', solutionEn: 'Review relationship between diagnosis and requested service', exampleAr: 'طلب أشعة مقطعية للركبة مع تشخيص التهاب اللوزتين', exampleEn: 'Requesting knee CT scan with tonsillitis diagnosis' },
  { code: 'CL003', nameAr: 'المبرر الطبي غير كافٍ', nameEn: 'Insufficient Medical Justification', descriptionAr: 'لم يتم توفير مبرر طبي كافٍ للخدمة المطلوبة', descriptionEn: 'Insufficient medical justification provided for requested service', category: 'clinical', solutionAr: 'إرفاق تقرير طبي مفصل يوضح الضرورة الطبية', solutionEn: 'Attach detailed medical report explaining medical necessity', exampleAr: 'طلب رنين مغناطيسي بدون ذكر الأعراض أو نتائج الفحص السريري', exampleEn: 'MRI request without mentioning symptoms or clinical findings' },
  { code: 'CL004', nameAr: 'التاريخ المرضي مفقود', nameEn: 'Missing Medical History', descriptionAr: 'لم يتم إرفاق التاريخ المرضي ذو الصلة', descriptionEn: 'Relevant medical history not attached', category: 'clinical', solutionAr: 'إرفاق ملخص التاريخ المرضي والعلاجات السابقة', solutionEn: 'Attach medical history summary and previous treatments', exampleAr: 'طلب جراحة قلب مفتوح بدون ذكر الأمراض المزمنة السابقة', exampleEn: 'Open heart surgery request without mentioning previous chronic conditions' },
  { code: 'CL005', nameAr: 'نتائج الفحوصات مفقودة', nameEn: 'Missing Test Results', descriptionAr: 'لم يتم إرفاق نتائج الفحوصات المخبرية أو الأشعة', descriptionEn: 'Laboratory or radiology results not attached', category: 'clinical', solutionAr: 'إرفاق نتائج الفحوصات الداعمة للتشخيص', solutionEn: 'Attach supporting diagnostic test results', exampleAr: 'طلب علاج كيميائي بدون إرفاق تقرير الخزعة', exampleEn: 'Chemotherapy request without attaching biopsy report' },
  { code: 'CL006', nameAr: 'العلاج التحفظي غير مستوفى', nameEn: 'Conservative Treatment Not Exhausted', descriptionAr: 'لم يتم استنفاد خيارات العلاج التحفظي أولاً', descriptionEn: 'Conservative treatment options not exhausted first', category: 'clinical', solutionAr: 'توثيق محاولات العلاج التحفظي السابقة وفشلها', solutionEn: 'Document previous conservative treatment attempts and failures', exampleAr: 'طلب جراحة انزلاق غضروفي مباشرة دون تجربة العلاج الطبيعي', exampleEn: 'Direct disc surgery request without trying physical therapy first' },
  { code: 'CL007', nameAr: 'الخدمة غير ملائمة للعمر', nameEn: 'Service Not Age-Appropriate', descriptionAr: 'الخدمة المطلوبة غير مناسبة لعمر المستفيد', descriptionEn: 'Requested service not appropriate for beneficiary age', category: 'clinical', solutionAr: 'مراجعة شروط العمر للخدمة المطلوبة', solutionEn: 'Review age requirements for requested service', exampleAr: 'طلب فحص ماموجرام لمريضة عمرها 20 سنة', exampleEn: 'Mammogram request for a 20-year-old patient' },
  { code: 'CL008', nameAr: 'الخدمة غير ملائمة للجنس', nameEn: 'Service Not Gender-Appropriate', descriptionAr: 'الخدمة المطلوبة غير مناسبة لجنس المستفيد', descriptionEn: 'Requested service not appropriate for beneficiary gender', category: 'clinical', solutionAr: 'التحقق من ملاءمة الخدمة لجنس المستفيد', solutionEn: 'Verify service appropriateness for beneficiary gender', exampleAr: 'طلب فحص PSA للبروستاتا لمريضة أنثى', exampleEn: 'PSA prostate test request for female patient' },
  
  // Administrative Rejections
  { code: 'AD001', nameAr: 'بيانات المستفيد غير مكتملة', nameEn: 'Incomplete Beneficiary Data', descriptionAr: 'بيانات المستفيد ناقصة أو غير صحيحة', descriptionEn: 'Beneficiary data incomplete or incorrect', category: 'administrative', solutionAr: 'التحقق من صحة واكتمال بيانات المستفيد', solutionEn: 'Verify beneficiary data accuracy and completeness', exampleAr: 'عدم إدخال رقم الهوية أو إدخاله بشكل خاطئ', exampleEn: 'Missing or incorrectly entered national ID number' },
  { code: 'AD002', nameAr: 'رقم الوثيقة غير صالح', nameEn: 'Invalid Policy Number', descriptionAr: 'رقم وثيقة التأمين غير صحيح أو منتهي', descriptionEn: 'Insurance policy number incorrect or expired', category: 'administrative', solutionAr: 'التحقق من رقم الوثيقة وتاريخ صلاحيتها', solutionEn: 'Verify policy number and validity date', exampleAr: 'استخدام رقم وثيقة قديمة انتهت صلاحيتها', exampleEn: 'Using an old expired policy number' },
  { code: 'AD003', nameAr: 'مقدم الخدمة غير معتمد', nameEn: 'Non-Accredited Provider', descriptionAr: 'مقدم الخدمة غير معتمد لدى شركة التأمين', descriptionEn: 'Service provider not accredited by insurance company', category: 'administrative', solutionAr: 'التأكد من اعتماد مقدم الخدمة في شبكة التأمين', solutionEn: 'Confirm provider accreditation in insurance network', exampleAr: 'تقديم طلب من مستشفى غير ضمن شبكة شركة التأمين', exampleEn: 'Request from hospital not in insurance network' },
  { code: 'AD004', nameAr: 'طلب مكرر', nameEn: 'Duplicate Request', descriptionAr: 'تم تقديم طلب مماثل سابقاً', descriptionEn: 'Similar request previously submitted', category: 'administrative', solutionAr: 'مراجعة الطلبات السابقة وتجنب التكرار', solutionEn: 'Review previous requests and avoid duplication', exampleAr: 'إرسال نفس طلب الموافقة المسبقة مرتين', exampleEn: 'Submitting same prior authorization request twice' },
  { code: 'AD005', nameAr: 'انتهاء صلاحية الموافقة', nameEn: 'Approval Expired', descriptionAr: 'انتهت صلاحية الموافقة المسبقة', descriptionEn: 'Prior authorization has expired', category: 'administrative', solutionAr: 'تقديم طلب موافقة جديد', solutionEn: 'Submit new authorization request', exampleAr: 'موافقة صادرة قبل 60 يوم ولم يتم تنفيذ الخدمة', exampleEn: 'Approval issued 60 days ago without service delivery' },
  { code: 'AD006', nameAr: 'رقم الطبيب غير صالح', nameEn: 'Invalid Physician ID', descriptionAr: 'رقم تعريف الطبيب المعالج غير صحيح', descriptionEn: 'Treating physician ID is incorrect', category: 'administrative', solutionAr: 'التحقق من رقم تسجيل الطبيب في الهيئة', solutionEn: 'Verify physician registration number', exampleAr: 'إدخال رقم ترخيص طبيب منتهي أو غير مسجل', exampleEn: 'Entering expired or unregistered physician license' },
  
  // Coverage Rejections
  { code: 'CV001', nameAr: 'الخدمة غير مغطاة', nameEn: 'Service Not Covered', descriptionAr: 'الخدمة المطلوبة غير مشمولة في وثيقة التأمين', descriptionEn: 'Requested service not covered in insurance policy', category: 'coverage', solutionAr: 'مراجعة قائمة الخدمات المغطاة في الوثيقة', solutionEn: 'Review covered services list in policy', exampleAr: 'طلب عملية تجميلية غير مغطاة بالوثيقة الأساسية', exampleEn: 'Cosmetic surgery request not covered in basic policy' },
  { code: 'CV002', nameAr: 'تجاوز الحد الأقصى السنوي', nameEn: 'Annual Limit Exceeded', descriptionAr: 'تم تجاوز الحد الأقصى السنوي للتغطية', descriptionEn: 'Annual coverage limit has been exceeded', category: 'coverage', solutionAr: 'التحقق من الرصيد المتبقي قبل تقديم الطلب', solutionEn: 'Check remaining balance before submitting request', exampleAr: 'طلب علاج بقيمة 50,000 ر.س والرصيد المتبقي 20,000', exampleEn: 'Treatment request for 50,000 SAR with 20,000 remaining' },
  { code: 'CV003', nameAr: 'فترة الانتظار لم تنتهِ', nameEn: 'Waiting Period Not Complete', descriptionAr: 'لم تنتهِ فترة الانتظار المطلوبة للخدمة', descriptionEn: 'Required waiting period for service not complete', category: 'coverage', solutionAr: 'الانتظار حتى انتهاء فترة الانتظار المحددة', solutionEn: 'Wait until specified waiting period ends', exampleAr: 'طلب ولادة بعد شهرين من بداية الوثيقة (فترة الانتظار 10 أشهر)', exampleEn: 'Delivery request 2 months after policy start (10-month waiting period)' },
  { code: 'CV004', nameAr: 'حالة مستبعدة', nameEn: 'Excluded Condition', descriptionAr: 'الحالة المرضية مستبعدة من التغطية', descriptionEn: 'Medical condition is excluded from coverage', category: 'coverage', solutionAr: 'مراجعة قائمة الاستثناءات في الوثيقة', solutionEn: 'Review exclusions list in policy', exampleAr: 'علاج العقم مستبعد من التغطية الأساسية', exampleEn: 'Infertility treatment excluded from basic coverage' },
  { code: 'CV005', nameAr: 'تجاوز حد الخدمة', nameEn: 'Service Limit Exceeded', descriptionAr: 'تم تجاوز الحد المسموح لهذه الخدمة', descriptionEn: 'Service-specific limit has been exceeded', category: 'coverage', solutionAr: 'التحقق من عدد مرات استخدام الخدمة', solutionEn: 'Check number of times service has been used', exampleAr: 'طلب جلسة علاج طبيعي رقم 13 والحد 12 جلسة سنوياً', exampleEn: 'Request for 13th physiotherapy session with 12-session annual limit' },
  { code: 'CV006', nameAr: 'الدواء غير مدرج', nameEn: 'Drug Not Listed', descriptionAr: 'الدواء المطلوب غير مدرج في قائمة الأدوية المعتمدة', descriptionEn: 'Requested drug not listed in approved formulary', category: 'coverage', solutionAr: 'استخدام بديل مدرج في دليل ضمان للأدوية', solutionEn: 'Use alternative listed in Daman Drug Formulary', exampleAr: 'صرف دواء جديد غير مضاف لقائمة ضمان الدوائية', exampleEn: 'Dispensing new drug not added to Daman formulary' },
  
  // Technical Rejections
  { code: 'TC001', nameAr: 'خطأ في صيغة البيانات', nameEn: 'Data Format Error', descriptionAr: 'صيغة البيانات المدخلة غير صحيحة', descriptionEn: 'Entered data format is incorrect', category: 'technical', solutionAr: 'مراجعة صيغة البيانات المطلوبة', solutionEn: 'Review required data format', exampleAr: 'إدخال التاريخ بصيغة DD/MM/YYYY بدلاً من YYYY-MM-DD', exampleEn: 'Entering date in DD/MM/YYYY instead of YYYY-MM-DD format' },
  { code: 'TC002', nameAr: 'فشل التحقق الإلكتروني', nameEn: 'Electronic Verification Failed', descriptionAr: 'فشل التحقق الإلكتروني من البيانات', descriptionEn: 'Electronic data verification failed', category: 'technical', solutionAr: 'إعادة إرسال الطلب بعد التحقق من البيانات', solutionEn: 'Resubmit request after verifying data', exampleAr: 'فشل التحقق من رقم الهوية عبر نظام أبشر', exampleEn: 'ID verification failed through Absher system' },
  { code: 'TC003', nameAr: 'انتهاء مهلة الطلب', nameEn: 'Request Timeout', descriptionAr: 'انتهت المهلة المحددة لتقديم الطلب', descriptionEn: 'Specified deadline for request submission expired', category: 'technical', solutionAr: 'تقديم طلب جديد ضمن المهلة المحددة', solutionEn: 'Submit new request within specified deadline', exampleAr: 'تقديم طلب بعد مرور 48 ساعة من الموعد المحدد', exampleEn: 'Submitting request 48 hours after specified deadline' },
];

// Common Rejection Reasons (Summary Statistics)
export const rejectionReasons: RejectionReason[] = [
  {
    id: 'missing_diagnosis',
    nameAr: 'رمز التشخيص مفقود أو غير صحيح',
    nameEn: 'Missing or incorrect diagnosis code',
    percentageAr: '35%',
    percentageEn: '35%',
    solutionAr: 'التأكد من إدخال رمز ICD-10-AM الصحيح والمحدث',
    solutionEn: 'Ensure correct and updated ICD-10-AM code is entered'
  },
  {
    id: 'incomplete_justification',
    nameAr: 'المبرر الطبي غير كافٍ',
    nameEn: 'Insufficient medical justification',
    percentageAr: '25%',
    percentageEn: '25%',
    solutionAr: 'توفير مبرر طبي مفصل يوضح ضرورة الخدمة',
    solutionEn: 'Provide detailed medical justification explaining service necessity'
  },
  {
    id: 'missing_history',
    nameAr: 'التاريخ المرضي غير مكتمل',
    nameEn: 'Incomplete medical history',
    percentageAr: '15%',
    percentageEn: '15%',
    solutionAr: 'إرفاق التاريخ المرضي ذو الصلة بالحالة',
    solutionEn: 'Attach relevant medical history'
  },
  {
    id: 'wrong_service_code',
    nameAr: 'رمز الخدمة غير متطابق',
    nameEn: 'Mismatched service code',
    percentageAr: '12%',
    percentageEn: '12%',
    solutionAr: 'مراجعة رمز الخدمة SBS V3 والتأكد من تطابقه مع التشخيص',
    solutionEn: 'Review SBS V3 service code and ensure it matches diagnosis'
  },
  {
    id: 'coverage_limit',
    nameAr: 'تجاوز الحد الأقصى للتغطية',
    nameEn: 'Coverage limit exceeded',
    percentageAr: '8%',
    percentageEn: '8%',
    solutionAr: 'التحقق من رصيد التغطية المتبقي قبل تقديم الطلب',
    solutionEn: 'Verify remaining coverage balance before submitting request'
  },
  {
    id: 'duplicate_request',
    nameAr: 'طلب مكرر',
    nameEn: 'Duplicate request',
    percentageAr: '5%',
    percentageEn: '5%',
    solutionAr: 'التحقق من عدم وجود طلب سابق لنفس الخدمة',
    solutionEn: 'Verify no previous request exists for the same service'
  }
];

// Rejection Code Categories
export const rejectionCodeCategories = {
  clinical: { ar: 'رفض سريري', en: 'Clinical Rejection', color: 'bg-destructive' },
  administrative: { ar: 'رفض إداري', en: 'Administrative Rejection', color: 'bg-warning' },
  coverage: { ar: 'رفض التغطية', en: 'Coverage Rejection', color: 'bg-info' },
  technical: { ar: 'رفض تقني', en: 'Technical Rejection', color: 'bg-secondary' },
};

// Services requiring Prior Authorization
export const servicesRequiringPA = [
  {
    categoryAr: 'العمليات الجراحية',
    categoryEn: 'Surgical Procedures',
    examples: [
      { ar: 'عمليات القلب المفتوح', en: 'Open heart surgery' },
      { ar: 'استبدال المفاصل', en: 'Joint replacement' },
      { ar: 'جراحات العمود الفقري', en: 'Spine surgery' },
      { ar: 'جراحات السمنة', en: 'Bariatric surgery' }
    ]
  },
  {
    categoryAr: 'الأدوية المتخصصة',
    categoryEn: 'Specialty Medications',
    examples: [
      { ar: 'العلاج الكيماوي', en: 'Chemotherapy' },
      { ar: 'العلاج البيولوجي', en: 'Biological therapy' },
      { ar: 'أدوية التصلب اللويحي', en: 'Multiple sclerosis medications' },
      { ar: 'أدوية الروماتيزم', en: 'Rheumatoid medications' }
    ]
  },
  {
    categoryAr: 'الفحوصات المتقدمة',
    categoryEn: 'Advanced Diagnostics',
    examples: [
      { ar: 'الرنين المغناطيسي (MRI)', en: 'MRI scans' },
      { ar: 'التصوير المقطعي (CT)', en: 'CT scans' },
      { ar: 'PET Scan', en: 'PET scans' },
      { ar: 'خزعات الأنسجة', en: 'Tissue biopsies' }
    ]
  },
  {
    categoryAr: 'التنويم والإقامة',
    categoryEn: 'Hospitalization',
    examples: [
      { ar: 'التنويم الاختياري', en: 'Elective admission' },
      { ar: 'العناية المركزة', en: 'Intensive care' },
      { ar: 'إعادة التأهيل', en: 'Rehabilitation' },
      { ar: 'الرعاية التمريضية الممتدة', en: 'Extended nursing care' }
    ]
  }
];

// MDS Project Statistics
export const mdsStatistics = {
  insuranceCompanies: 26,
  claimsManagementCompanies: 6,
  healthcareProviders: 4796,
  targetProviders: 4796,
  targetInsurers: 32,
  implementationYear: 2022
};

// Category labels
export const categoryLabels = {
  demographic: { ar: 'البيانات الديموغرافية', en: 'Demographic Data' },
  clinical: { ar: 'البيانات السريرية', en: 'Clinical Data' },
  service: { ar: 'بيانات الخدمة', en: 'Service Data' },
  financial: { ar: 'البيانات المالية', en: 'Financial Data' }
};
