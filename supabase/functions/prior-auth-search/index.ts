import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Common SBS service categories and codes with MRP price ranges and Arabic synonyms
const sbsServices = [
  // Imaging Services - MRP ranges from CHI pricing schedule
  { code: "IM-MRI-001", nameAr: "التصوير بالرنين المغناطيسي للدماغ", nameEn: "MRI Brain", category: "imaging", estimatedCost: 1500, requiresPA: true, mrpMin: 1200, mrpMax: 1800, synonyms: ["رنين الرأس", "صورة مغناطيسية للمخ", "أشعة رنين دماغ"] },
  { code: "IM-MRI-002", nameAr: "التصوير بالرنين المغناطيسي للعمود الفقري", nameEn: "MRI Spine", category: "imaging", estimatedCost: 1800, requiresPA: true, mrpMin: 1400, mrpMax: 2200, synonyms: ["رنين الظهر", "صورة للفقرات", "أشعة الظهر المغناطيسية"] },
  { code: "IM-MRI-003", nameAr: "التصوير بالرنين المغناطيسي للركبة", nameEn: "MRI Knee", category: "imaging", estimatedCost: 1200, requiresPA: true, mrpMin: 900, mrpMax: 1500, synonyms: ["رنين الركبة", "صورة رنين للركبة", "أشعة ركبة"] },
  { code: "IM-MRI-004", nameAr: "التصوير بالرنين المغناطيسي للكتف", nameEn: "MRI Shoulder", category: "imaging", estimatedCost: 1200, requiresPA: true, mrpMin: 900, mrpMax: 1500, synonyms: ["رنين الكتف", "صورة للكتف"] },
  { code: "IM-MRI-005", nameAr: "التصوير بالرنين المغناطيسي للبطن", nameEn: "MRI Abdomen", category: "imaging", estimatedCost: 2000, requiresPA: true, mrpMin: 1600, mrpMax: 2400, synonyms: ["رنين البطن", "صورة للبطن"] },
  { code: "IM-CT-001", nameAr: "التصوير المقطعي للرأس", nameEn: "CT Head", category: "imaging", estimatedCost: 800, requiresPA: true, mrpMin: 600, mrpMax: 1000, synonyms: ["أشعة مقطعية للرأس", "سي تي سكان", "CT للدماغ"] },
  { code: "IM-CT-002", nameAr: "التصوير المقطعي للصدر", nameEn: "CT Chest", category: "imaging", estimatedCost: 900, requiresPA: true, mrpMin: 700, mrpMax: 1100, synonyms: ["أشعة مقطعية للصدر", "سكان الرئة"] },
  { code: "IM-CT-003", nameAr: "التصوير المقطعي للبطن والحوض", nameEn: "CT Abdomen & Pelvis", category: "imaging", estimatedCost: 1200, requiresPA: true, mrpMin: 900, mrpMax: 1500, synonyms: ["أشعة مقطعية للبطن", "سكان البطن"] },
  { code: "IM-CT-004", nameAr: "التصوير المقطعي للعمود الفقري", nameEn: "CT Spine", category: "imaging", estimatedCost: 900, requiresPA: true, mrpMin: 700, mrpMax: 1100, synonyms: ["أشعة مقطعية للظهر", "سكان الفقرات"] },
  { code: "IM-XR-001", nameAr: "أشعة سينية للصدر", nameEn: "Chest X-Ray", category: "imaging", estimatedCost: 150, requiresPA: false, mrpMin: 80, mrpMax: 200, synonyms: ["إكس راي صدر", "أشعة عادية للرئة"] },
  { code: "IM-XR-002", nameAr: "أشعة سينية للعظام", nameEn: "Bone X-Ray", category: "imaging", estimatedCost: 120, requiresPA: false, mrpMin: 70, mrpMax: 180, synonyms: ["أشعة عظم", "إكس راي عظام"] },
  { code: "IM-US-001", nameAr: "الموجات فوق الصوتية للبطن", nameEn: "Abdominal Ultrasound", category: "imaging", estimatedCost: 300, requiresPA: false, mrpMin: 200, mrpMax: 400, synonyms: ["سونار البطن", "إيكو البطن", "ألتراساوند"] },
  { code: "IM-US-002", nameAr: "الموجات فوق الصوتية للحوض", nameEn: "Pelvic Ultrasound", category: "imaging", estimatedCost: 350, requiresPA: false, mrpMin: 250, mrpMax: 450, synonyms: ["سونار الحوض", "سونار الرحم"] },
  { code: "IM-US-003", nameAr: "إيكو القلب", nameEn: "Echocardiogram", category: "imaging", estimatedCost: 500, requiresPA: false, mrpMin: 350, mrpMax: 650, synonyms: ["سونار القلب", "تخطيط صدى القلب"] },
  { code: "IM-MAM-001", nameAr: "الماموغرام", nameEn: "Mammogram", category: "imaging", estimatedCost: 400, requiresPA: false, mrpMin: 300, mrpMax: 500, synonyms: ["أشعة الثدي", "فحص سرطان الثدي"] },
  { code: "IM-PET-001", nameAr: "التصوير المقطعي بالإصدار البوزيتروني PET", nameEn: "PET Scan", category: "imaging", estimatedCost: 8000, requiresPA: true, mrpMin: 6000, mrpMax: 10000, synonyms: ["بت سكان", "مسح نووي"] },
  { code: "IM-NM-001", nameAr: "مسح العظام النووي", nameEn: "Nuclear Bone Scan", category: "imaging", estimatedCost: 2500, requiresPA: true, mrpMin: 1800, mrpMax: 3200, synonyms: ["فحص نووي للعظام", "سكان عظام نووي"] },
  
  // Surgery Services - MRP ranges from DRG/SBS pricing
  { code: "SU-GI-001", nameAr: "استئصال المرارة بالمنظار", nameEn: "Laparoscopic Cholecystectomy", category: "surgery", estimatedCost: 15000, requiresPA: true, mrpMin: 12000, mrpMax: 18000, synonyms: ["عملية المرارة", "شيل المرارة", "استئصال حصوة المرارة"] },
  { code: "SU-GI-002", nameAr: "استئصال الزائدة الدودية", nameEn: "Appendectomy", category: "surgery", estimatedCost: 12000, requiresPA: true, mrpMin: 9000, mrpMax: 15000, synonyms: ["عملية الزايدة", "شيل الزايدة", "استئصال الأبندكس"] },
  { code: "SU-GI-003", nameAr: "إصلاح الفتق الإربي", nameEn: "Inguinal Hernia Repair", category: "surgery", estimatedCost: 10000, requiresPA: true, mrpMin: 8000, mrpMax: 12000, synonyms: ["عملية الفتق", "فتق السرة", "فتق البطن"] },
  { code: "SU-GI-004", nameAr: "تكميم المعدة", nameEn: "Gastric Sleeve", category: "surgery", estimatedCost: 35000, requiresPA: true, mrpMin: 30000, mrpMax: 40000, synonyms: ["عملية التكميم", "قص المعدة", "عملية السمنة"] },
  { code: "SU-GI-005", nameAr: "تحويل مسار المعدة", nameEn: "Gastric Bypass", category: "surgery", estimatedCost: 45000, requiresPA: true, mrpMin: 38000, mrpMax: 52000, synonyms: ["عملية تحويل المعدة", "باي باس"] },
  { code: "SU-GI-006", nameAr: "منظار الجهاز الهضمي العلوي", nameEn: "Upper GI Endoscopy", category: "surgery", estimatedCost: 3000, requiresPA: true, mrpMin: 2000, mrpMax: 4000, synonyms: ["منظار المعدة", "منظار المريء", "تنظير المعدة"] },
  { code: "SU-GI-007", nameAr: "منظار القولون", nameEn: "Colonoscopy", category: "surgery", estimatedCost: 3500, requiresPA: true, mrpMin: 2500, mrpMax: 4500, synonyms: ["تنظير القولون", "فحص القولون", "منظار الأمعاء"] },
  { code: "SU-OR-001", nameAr: "استبدال مفصل الركبة الكامل", nameEn: "Total Knee Replacement", category: "surgery", estimatedCost: 55000, requiresPA: true, mrpMin: 45000, mrpMax: 65000, synonyms: ["تغيير مفصل الركبة", "زراعة ركبة صناعية"] },
  { code: "SU-OR-002", nameAr: "استبدال مفصل الورك الكامل", nameEn: "Total Hip Replacement", category: "surgery", estimatedCost: 60000, requiresPA: true, mrpMin: 50000, mrpMax: 70000, synonyms: ["تغيير مفصل الحوض", "زراعة ورك صناعي"] },
  { code: "SU-OR-003", nameAr: "إصلاح الرباط الصليبي الأمامي", nameEn: "ACL Reconstruction", category: "surgery", estimatedCost: 25000, requiresPA: true, mrpMin: 20000, mrpMax: 30000, synonyms: ["عملية الرباط الصليبي", "ترميم ACL"] },
  { code: "SU-OR-004", nameAr: "تنظير الركبة", nameEn: "Knee Arthroscopy", category: "surgery", estimatedCost: 12000, requiresPA: true, mrpMin: 9000, mrpMax: 15000, synonyms: ["منظار الركبة", "عملية غضروف الركبة"] },
  { code: "SU-OR-005", nameAr: "تثبيت الكسور", nameEn: "Fracture Fixation", category: "surgery", estimatedCost: 18000, requiresPA: true, mrpMin: 12000, mrpMax: 25000, synonyms: ["تثبيت العظم", "جبر الكسر", "تركيب شريحة ومسامير"] },
  { code: "SU-CV-001", nameAr: "قسطرة القلب التشخيصية", nameEn: "Diagnostic Cardiac Catheterization", category: "surgery", estimatedCost: 15000, requiresPA: true, mrpMin: 12000, mrpMax: 18000, synonyms: ["قسطرة القلب", "فحص شرايين القلب"] },
  { code: "SU-CV-002", nameAr: "توسيع الشرايين التاجية بالبالون والدعامة", nameEn: "Coronary Angioplasty with Stent", category: "surgery", estimatedCost: 45000, requiresPA: true, mrpMin: 35000, mrpMax: 55000, synonyms: ["دعامة القلب", "توسيع شرايين القلب", "بالون القلب"] },
  { code: "SU-CV-003", nameAr: "جراحة تحويل مسار الشريان التاجي", nameEn: "Coronary Artery Bypass (CABG)", category: "surgery", estimatedCost: 120000, requiresPA: true, mrpMin: 100000, mrpMax: 140000, synonyms: ["عملية قلب مفتوح", "توصيل شرايين القلب"] },
  { code: "SU-OPH-001", nameAr: "عملية الليزك", nameEn: "LASIK Surgery", category: "surgery", estimatedCost: 8000, requiresPA: true, mrpMin: 6000, mrpMax: 10000, synonyms: ["تصحيح النظر", "ليزك العيون"] },
  { code: "SU-OPH-002", nameAr: "استئصال الساد (المياه البيضاء)", nameEn: "Cataract Surgery", category: "surgery", estimatedCost: 12000, requiresPA: true, mrpMin: 9000, mrpMax: 15000, synonyms: ["عملية الماء الأبيض", "عملية العدسة", "الكتاراكت"] },
  { code: "SU-ENT-001", nameAr: "استئصال اللوزتين", nameEn: "Tonsillectomy", category: "surgery", estimatedCost: 8000, requiresPA: true, mrpMin: 6000, mrpMax: 10000, synonyms: ["عملية اللوز", "شيل اللوز"] },
  
  // Laboratory Services
  { code: "LB-HEM-001", nameAr: "تحليل صورة الدم الكاملة CBC", nameEn: "Complete Blood Count", category: "lab", estimatedCost: 50, requiresPA: false, mrpMin: 30, mrpMax: 80, synonyms: ["تحليل دم شامل", "فحص الدم", "CBC"] },
  { code: "LB-CHM-001", nameAr: "تحليل السكر الصائم", nameEn: "Fasting Blood Glucose", category: "lab", estimatedCost: 25, requiresPA: false, mrpMin: 15, mrpMax: 40, synonyms: ["تحليل السكر", "فحص السكري", "جلوكوز"] },
  { code: "LB-CHM-002", nameAr: "تحليل السكر التراكمي HbA1c", nameEn: "Hemoglobin A1c", category: "lab", estimatedCost: 80, requiresPA: false, mrpMin: 50, mrpMax: 120, synonyms: ["السكر التراكمي", "HbA1c", "تحليل ثلاث شهور"] },
  { code: "LB-CHM-003", nameAr: "تحليل وظائف الكلى", nameEn: "Kidney Function Tests", category: "lab", estimatedCost: 100, requiresPA: false, mrpMin: 70, mrpMax: 140, synonyms: ["فحص الكلى", "كرياتينين", "يوريا"] },
  { code: "LB-CHM-004", nameAr: "تحليل وظائف الكبد", nameEn: "Liver Function Tests", category: "lab", estimatedCost: 120, requiresPA: false, mrpMin: 80, mrpMax: 160, synonyms: ["فحص الكبد", "إنزيمات الكبد", "ALT", "AST"] },
  { code: "LB-CHM-005", nameAr: "تحليل الدهون الشامل", nameEn: "Lipid Profile", category: "lab", estimatedCost: 90, requiresPA: false, mrpMin: 60, mrpMax: 130, synonyms: ["تحليل الكوليسترول", "دهون الدم", "الكولسترول"] },
  { code: "LB-CHM-006", nameAr: "تحليل هرمونات الغدة الدرقية", nameEn: "Thyroid Function Tests", category: "lab", estimatedCost: 150, requiresPA: false, mrpMin: 100, mrpMax: 200, synonyms: ["فحص الغدة الدرقية", "TSH", "T3", "T4"] },
  { code: "LB-CHM-007", nameAr: "تحليل فيتامين د", nameEn: "Vitamin D Test", category: "lab", estimatedCost: 120, requiresPA: false, mrpMin: 80, mrpMax: 160, synonyms: ["فيتامين دي", "فحص فيتامين D"] },
  
  // Therapy Services
  { code: "TH-PT-001", nameAr: "جلسة علاج طبيعي", nameEn: "Physical Therapy Session", category: "therapy", estimatedCost: 200, requiresPA: true, mrpMin: 150, mrpMax: 300, synonyms: ["جلسة فيزيو", "علاج فيزيائي", "تأهيل حركي"] },
  { code: "TH-PSY-001", nameAr: "جلسة العلاج النفسي", nameEn: "Psychotherapy Session", category: "therapy", estimatedCost: 300, requiresPA: true, mrpMin: 200, mrpMax: 400, synonyms: ["جلسة نفسية", "استشارة نفسية", "معالجة نفسية"] },
  { code: "TH-DIA-001", nameAr: "جلسة غسيل الكلى", nameEn: "Hemodialysis Session", category: "therapy", estimatedCost: 1500, requiresPA: true, mrpMin: 1200, mrpMax: 2000, synonyms: ["غسيل كلوي", "الغسيل", "دايلزس"] },
  { code: "TH-CHM-001", nameAr: "جلسة العلاج الكيميائي", nameEn: "Chemotherapy Session", category: "therapy", estimatedCost: 5000, requiresPA: true, mrpMin: 3000, mrpMax: 8000, synonyms: ["الكيماوي", "جلسة كيمو", "علاج السرطان"] },
  
  // Consultation Services
  { code: "CN-GP-001", nameAr: "استشارة طبيب عام", nameEn: "General Practitioner Consultation", category: "consultation", estimatedCost: 100, requiresPA: false, mrpMin: 80, mrpMax: 150, synonyms: ["كشف عام", "زيارة طبيب", "موعد طبيب عام"] },
  { code: "CN-SP-001", nameAr: "استشارة طبيب أخصائي", nameEn: "Specialist Consultation", category: "consultation", estimatedCost: 250, requiresPA: false, mrpMin: 180, mrpMax: 350, synonyms: ["كشف أخصائي", "استشارة متخصص"] },
  { code: "CN-SP-002", nameAr: "استشارة استشاري", nameEn: "Consultant Consultation", category: "consultation", estimatedCost: 400, requiresPA: false, mrpMin: 300, mrpMax: 500, synonyms: ["كشف استشاري", "زيارة استشاري"] },
  
  // Dental Services
  { code: "DN-CLN-001", nameAr: "تنظيف الأسنان", nameEn: "Dental Cleaning", category: "dental", estimatedCost: 200, requiresPA: false, mrpMin: 150, mrpMax: 300, synonyms: ["تلميع الأسنان", "إزالة الجير"] },
  { code: "DN-FIL-001", nameAr: "حشو الأسنان", nameEn: "Dental Filling", category: "dental", estimatedCost: 300, requiresPA: false, mrpMin: 200, mrpMax: 450, synonyms: ["حشوة سن", "حشو تسوس"] },
  { code: "DN-RCT-001", nameAr: "علاج قناة الجذر", nameEn: "Root Canal Treatment", category: "dental", estimatedCost: 1500, requiresPA: true, mrpMin: 1000, mrpMax: 2000, synonyms: ["علاج العصب", "سحب العصب", "حشو عصب"] },
  { code: "DN-IMP-001", nameAr: "زراعة الأسنان", nameEn: "Dental Implant", category: "dental", estimatedCost: 5000, requiresPA: true, mrpMin: 4000, mrpMax: 7000, synonyms: ["زرعة سن", "تركيب سن", "غرسة الأسنان"] },
  
  // Emergency Services (no PA required)
  { code: "EM-ER-001", nameAr: "زيارة الطوارئ", nameEn: "Emergency Room Visit", category: "emergency", estimatedCost: 500, requiresPA: false, mrpMin: 300, mrpMax: 800, synonyms: ["طوارئ", "إسعاف", "حالة طارئة"] },
  
  // Maternity Services
  { code: "MT-DLV-001", nameAr: "الولادة الطبيعية", nameEn: "Normal Delivery", category: "maternity", estimatedCost: 10000, requiresPA: false, mrpMin: 8000, mrpMax: 12000, synonyms: ["ولادة عادية", "ولادة طبيعية"] },
  { code: "MT-DLV-002", nameAr: "الولادة القيصرية", nameEn: "Cesarean Delivery", category: "maternity", estimatedCost: 18000, requiresPA: false, mrpMin: 14000, mrpMax: 22000, synonyms: ["قيصرية", "عملية ولادة", "سي سكشن"] },
];

// Comprehensive drugs database with coverage information and prescription requirements
const drugsList = [
  // Biological medications (require PA)
  { 
    nameAr: "هيوميرا (أداليموماب)", 
    nameEn: "Humira (Adalimumab)", 
    category: "biological", 
    requiresPA: true, 
    indication: "التهاب المفاصل الروماتويدي، الصدفية، التهاب الفقار اللاصق", 
    icd10Codes: ["M05.9", "L40.50", "M45.9"], 
    alternatives: ["Enbrel", "Remicade"], 
    notes: "يتطلب تقرير من استشاري روماتيزم أو جلدية",
    synonyms: ["هوميرا", "أداليموماب", "دواء الروماتيزم البيولوجي"],
    estimatedCost: 8000,
    dosageInfo: {
      form: "حقن تحت الجلد",
      frequency: "كل أسبوعين",
      typicalDose: "40 مج",
      maxQuantityPerMonth: 2,
      requiresDiagnosisCode: true,
      requiresBodyWeight: false,
      requiresLabResults: ["ESR", "CRP", "RF"],
      additionalRequirements: ["تقرير استشاري روماتيزم", "فشل العلاج التقليدي (MTX)"]
    }
  },
  { 
    nameAr: "ريميكاد (إنفليكسيماب)", 
    nameEn: "Remicade (Infliximab)", 
    category: "biological", 
    requiresPA: true, 
    indication: "كرون، التهاب القولون التقرحي، التهاب المفاصل", 
    icd10Codes: ["K50.90", "K51.90", "M05.9"], 
    alternatives: ["Humira", "Stelara"], 
    notes: "يُعطى بالتسريب الوريدي في المستشفى",
    synonyms: ["انفليكسيماب", "علاج كرون البيولوجي"],
    estimatedCost: 12000,
    dosageInfo: {
      form: "تسريب وريدي",
      frequency: "كل 8 أسابيع بعد جرعات التحميل",
      typicalDose: "5 مج/كجم",
      requiresDiagnosisCode: true,
      requiresBodyWeight: true,
      requiresLabResults: ["TB test", "Hepatitis B"],
      additionalRequirements: ["تقرير استشاري جهاز هضمي/روماتيزم"]
    }
  },
  { 
    nameAr: "كوسنتيكس (سيكيوكينوماب)", 
    nameEn: "Cosentyx (Secukinumab)", 
    category: "biological", 
    requiresPA: true, 
    indication: "الصدفية، التهاب الفقار اللاصق", 
    icd10Codes: ["L40.50", "M45.9"], 
    alternatives: ["Stelara", "Taltz"], 
    notes: "يتطلب فشل العلاج التقليدي أولاً",
    synonyms: ["كوزنتيكس", "علاج الصدفية"],
    estimatedCost: 7500,
    dosageInfo: {
      form: "حقن تحت الجلد",
      frequency: "أسبوعياً لمدة 5 أسابيع ثم شهرياً",
      typicalDose: "300 مج",
      requiresDiagnosisCode: true,
      requiresBodyWeight: false,
      requiresLabResults: ["PASI score"],
      additionalRequirements: ["تقرير استشاري جلدية", "صور للمنطقة المصابة"]
    }
  },
  
  // Diabetes medications
  { 
    nameAr: "أوزمبك (سيماغلوتيد)", 
    nameEn: "Ozempic (Semaglutide)", 
    category: "diabetes", 
    requiresPA: true, 
    indication: "السكري النوع 2", 
    icd10Codes: ["E11.9", "E11.65"], 
    alternatives: ["Trulicity", "Victoza"], 
    notes: "مغطى للسكري فقط، غير مغطى لإنقاص الوزن",
    synonyms: ["اوزمبيك", "اوزيمبك", "سيماجلوتايد", "إبرة السكر الأسبوعية", "دواء السكر الجديد"],
    estimatedCost: 1200,
    dosageInfo: {
      form: "حقن تحت الجلد",
      frequency: "مرة أسبوعياً",
      typicalDose: "0.25-1 مج",
      maxQuantityPerMonth: 4,
      requiresDiagnosisCode: true,
      requiresBodyWeight: true,
      requiresLabResults: ["HbA1c", "FBS"],
      additionalRequirements: ["HbA1c > 7%", "فشل الميتفورمين"]
    }
  },
  { 
    nameAr: "تروليسيتي (دولاغلوتيد)", 
    nameEn: "Trulicity (Dulaglutide)", 
    category: "diabetes", 
    requiresPA: true, 
    indication: "السكري النوع 2", 
    icd10Codes: ["E11.9"], 
    alternatives: ["Ozempic", "Victoza"], 
    notes: "حقنة أسبوعية واحدة",
    synonyms: ["تروليسيتي", "دولاجلوتايد"],
    estimatedCost: 1100,
    dosageInfo: {
      form: "حقن تحت الجلد",
      frequency: "مرة أسبوعياً",
      typicalDose: "0.75-1.5 مج",
      maxQuantityPerMonth: 4,
      requiresDiagnosisCode: true,
      requiresBodyWeight: true,
      requiresLabResults: ["HbA1c"],
      additionalRequirements: []
    }
  },
  { 
    nameAr: "جارديانس (إمباغليفلوزين)", 
    nameEn: "Jardiance (Empagliflozin)", 
    category: "diabetes", 
    requiresPA: false, 
    indication: "السكري النوع 2، قصور القلب", 
    icd10Codes: ["E11.9", "I50.9"], 
    alternatives: ["Forxiga"], 
    notes: "يساعد في حماية القلب والكلى",
    synonyms: ["جارديانز", "امباجليفلوزين", "SGLT2"],
    estimatedCost: 250,
    dosageInfo: {
      form: "أقراص",
      frequency: "مرة يومياً",
      typicalDose: "10-25 مج",
      maxQuantityPerMonth: 30,
      requiresDiagnosisCode: true,
      requiresBodyWeight: false,
      requiresLabResults: [],
      additionalRequirements: []
    }
  },
  { 
    nameAr: "ميتفورمين", 
    nameEn: "Metformin", 
    category: "diabetes", 
    requiresPA: false, 
    indication: "السكري النوع 2", 
    icd10Codes: ["E11.9"], 
    alternatives: [], 
    notes: "الخط الأول لعلاج السكري",
    synonyms: ["جلوكوفاج", "ميتفورمن", "حبوب السكر"],
    estimatedCost: 30,
    dosageInfo: {
      form: "أقراص",
      frequency: "2-3 مرات يومياً",
      typicalDose: "500-1000 مج",
      maxQuantityPerMonth: 90,
      requiresDiagnosisCode: true,
      requiresBodyWeight: false,
      requiresLabResults: [],
      additionalRequirements: []
    }
  },
  
  // Oncology medications (require PA)
  { 
    nameAr: "كيترودا (بيمبروليزوماب)", 
    nameEn: "Keytruda (Pembrolizumab)", 
    category: "oncology", 
    requiresPA: true, 
    indication: "سرطان الرئة، الميلانوما", 
    icd10Codes: ["C34.90", "C43.9"], 
    alternatives: ["Opdivo"], 
    notes: "علاج مناعي",
    synonyms: ["كيتروداً", "علاج السرطان المناعي", "بمبروليزوماب"],
    estimatedCost: 25000,
    dosageInfo: {
      form: "تسريب وريدي",
      frequency: "كل 3 أسابيع",
      typicalDose: "200 مج",
      requiresDiagnosisCode: true,
      requiresBodyWeight: true,
      requiresLabResults: ["PD-L1 expression", "Pathology report"],
      additionalRequirements: ["تقرير لجنة الأورام", "خزعة مؤكدة للتشخيص"]
    }
  },
  { 
    nameAr: "هيرسبتين (تراستوزوماب)", 
    nameEn: "Herceptin (Trastuzumab)", 
    category: "oncology", 
    requiresPA: true, 
    indication: "سرطان الثدي HER2 إيجابي", 
    icd10Codes: ["C50.919"], 
    alternatives: ["Perjeta"], 
    notes: "يُعطى مع العلاج الكيميائي",
    synonyms: ["هرسبتين", "تراستوزوماب", "علاج سرطان الثدي"],
    estimatedCost: 18000,
    dosageInfo: {
      form: "تسريب وريدي",
      frequency: "كل 3 أسابيع",
      typicalDose: "6 مج/كجم",
      requiresDiagnosisCode: true,
      requiresBodyWeight: true,
      requiresLabResults: ["HER2 status", "Echo/MUGA"],
      additionalRequirements: ["تقرير لجنة الأورام", "فحص وظائف القلب"]
    }
  },
  
  // Hepatitis medications
  { 
    nameAr: "هارفوني (ليديباسفير/سوفوسبوفير)", 
    nameEn: "Harvoni (Ledipasvir/Sofosbuvir)", 
    category: "hepatitis", 
    requiresPA: true, 
    indication: "التهاب الكبد C", 
    icd10Codes: ["B18.2"], 
    alternatives: ["Epclusa", "Mavyret"], 
    notes: "علاج لمدة 8-12 أسبوع",
    synonyms: ["هارفني", "علاج الكبد الوبائي سي", "سوفالدي"],
    estimatedCost: 35000,
    dosageInfo: {
      form: "أقراص",
      frequency: "مرة يومياً",
      typicalDose: "90/400 مج",
      maxQuantityPerMonth: 28,
      requiresDiagnosisCode: true,
      requiresBodyWeight: false,
      requiresLabResults: ["HCV RNA", "HCV Genotype", "Liver function", "FibroScan"],
      additionalRequirements: ["تقرير استشاري كبد"]
    }
  },
  
  // MS medications
  { 
    nameAr: "أوكريفوس (أوكريليزوماب)", 
    nameEn: "Ocrevus (Ocrelizumab)", 
    category: "ms", 
    requiresPA: true, 
    indication: "التصلب المتعدد", 
    icd10Codes: ["G35"], 
    alternatives: ["Tecfidera", "Tysabri"], 
    notes: "تسريب وريدي كل 6 أشهر",
    synonyms: ["اوكرفس", "علاج التصلب اللويحي"],
    estimatedCost: 40000,
    dosageInfo: {
      form: "تسريب وريدي",
      frequency: "كل 6 أشهر",
      typicalDose: "600 مج",
      requiresDiagnosisCode: true,
      requiresBodyWeight: false,
      requiresLabResults: ["MRI Brain", "JC Virus antibody"],
      additionalRequirements: ["تقرير استشاري أعصاب"]
    }
  },
  
  // Psychiatric medications
  { 
    nameAr: "كونسيرتا (ميثيلفينيديت)", 
    nameEn: "Concerta (Methylphenidate)", 
    category: "psychiatric", 
    requiresPA: true, 
    indication: "اضطراب فرط الحركة ADHD", 
    icd10Codes: ["F90.9"], 
    alternatives: ["Ritalin", "Strattera"], 
    notes: "يتطلب تقرير من طبيب نفسي",
    synonyms: ["ريتالين", "دواء فرط الحركة", "ADHD"],
    estimatedCost: 350,
    dosageInfo: {
      form: "أقراص ممتدة المفعول",
      frequency: "مرة صباحاً",
      typicalDose: "18-54 مج",
      maxQuantityPerMonth: 30,
      requiresDiagnosisCode: true,
      requiresBodyWeight: true,
      requiresLabResults: [],
      additionalRequirements: ["تقرير استشاري نفسي", "تقييم ADHD"]
    }
  },
  { 
    nameAr: "ليكسابرو (إسيتالوبرام)", 
    nameEn: "Lexapro (Escitalopram)", 
    category: "psychiatric", 
    requiresPA: false, 
    indication: "الاكتئاب، اضطراب القلق العام", 
    icd10Codes: ["F32.9", "F41.1"], 
    alternatives: ["Zoloft", "Prozac"], 
    notes: "من مثبطات SSRI",
    synonyms: ["سيبرالكس", "دواء الاكتئاب", "علاج القلق"],
    estimatedCost: 120,
    dosageInfo: {
      form: "أقراص",
      frequency: "مرة يومياً",
      typicalDose: "10-20 مج",
      maxQuantityPerMonth: 30,
      requiresDiagnosisCode: true,
      requiresBodyWeight: false,
      requiresLabResults: [],
      additionalRequirements: []
    }
  },
  
  // Cardiovascular medications
  { 
    nameAr: "إلكويس (أبيكسابان)", 
    nameEn: "Eliquis (Apixaban)", 
    category: "anticoagulant", 
    requiresPA: false, 
    indication: "الرجفان الأذيني، الجلطات الوريدية", 
    icd10Codes: ["I48.91", "I82.90"], 
    alternatives: ["Xarelto", "Pradaxa"], 
    notes: "لا يحتاج متابعة INR",
    synonyms: ["اليكويس", "مميع الدم", "أبيكسابان"],
    estimatedCost: 400,
    dosageInfo: {
      form: "أقراص",
      frequency: "مرتين يومياً",
      typicalDose: "5 مج",
      maxQuantityPerMonth: 60,
      requiresDiagnosisCode: true,
      requiresBodyWeight: false,
      requiresLabResults: ["Kidney function"],
      additionalRequirements: []
    }
  },
  { 
    nameAr: "ليبيتور (أتورفاستاتين)", 
    nameEn: "Lipitor (Atorvastatin)", 
    category: "cardiovascular", 
    requiresPA: false, 
    indication: "ارتفاع الكوليسترول", 
    icd10Codes: ["E78.0", "E78.5"], 
    alternatives: ["Crestor", "Zocor"], 
    notes: "يُؤخذ مساءً",
    synonyms: ["اتورفاستاتين", "دواء الكوليسترول", "حبوب الدهون"],
    estimatedCost: 80,
    dosageInfo: {
      form: "أقراص",
      frequency: "مرة يومياً مساءً",
      typicalDose: "10-80 مج",
      maxQuantityPerMonth: 30,
      requiresDiagnosisCode: true,
      requiresBodyWeight: false,
      requiresLabResults: ["Lipid profile"],
      additionalRequirements: []
    }
  },
  
  // Respiratory medications
  { 
    nameAr: "سيمبيكورت (بوديسونيد/فورموتيرول)", 
    nameEn: "Symbicort (Budesonide/Formoterol)", 
    category: "respiratory", 
    requiresPA: false, 
    indication: "الربو، COPD", 
    icd10Codes: ["J45.909", "J44.9"], 
    alternatives: ["Seretide", "Foster", "Vannair"], 
    notes: "بخاخ للصيانة - مزيج من كورتيزون وموسع شعب هوائية",
    synonyms: ["بخاخ الربو", "سيمبيكورت", "بخاخ الصيانة", "بوديسونيد", "فورموتيرول", "Budesonide", "Formoterol", "سيمبيكورت تربوهيلر", "Symbicort Turbuhaler", "بخاخ الكورتيزون", "بخاخ COPD", "علاج الربو"],
    estimatedCost: 180,
    dosageInfo: {
      form: "بخاخ استنشاقي",
      frequency: "مرتين يومياً",
      typicalDose: "160/4.5 ميكروجرام أو 320/9 ميكروجرام",
      maxQuantityPerMonth: 2,
      requiresDiagnosisCode: true,
      requiresBodyWeight: false,
      requiresLabResults: [],
      additionalRequirements: []
    }
  },
  { 
    nameAr: "سيريتايد (فلوتيكازون/سالميتيرول)", 
    nameEn: "Seretide (Fluticasone/Salmeterol)", 
    category: "respiratory", 
    requiresPA: false, 
    indication: "الربو، COPD", 
    icd10Codes: ["J45.909", "J44.9"], 
    alternatives: ["Symbicort", "Foster"], 
    notes: "بخاخ للصيانة - مزيج من كورتيزون وموسع شعب هوائية طويل المفعول",
    synonyms: ["سيريتايد", "سيريتايد ديسكس", "فلوتيكازون", "سالميتيرول", "Fluticasone", "Salmeterol", "Seretide Diskus", "Advair", "بخاخ السيريتايد"],
    estimatedCost: 200,
    dosageInfo: {
      form: "بخاخ استنشاقي",
      frequency: "مرتين يومياً",
      typicalDose: "250/50 ميكروجرام أو 500/50 ميكروجرام",
      maxQuantityPerMonth: 2,
      requiresDiagnosisCode: true,
      requiresBodyWeight: false,
      requiresLabResults: [],
      additionalRequirements: []
    }
  },
  { 
    nameAr: "فينتولين (سالبوتامول)", 
    nameEn: "Ventolin (Salbutamol)", 
    category: "respiratory", 
    requiresPA: false, 
    indication: "الربو، ضيق التنفس", 
    icd10Codes: ["J45.909"], 
    alternatives: [], 
    notes: "بخاخ إنقاذ سريع المفعول",
    synonyms: ["بخاخ الفينتولين", "بخاخ الطوارئ", "سالبوتامول"],
    estimatedCost: 35,
    dosageInfo: {
      form: "بخاخ استنشاقي",
      frequency: "عند الحاجة",
      typicalDose: "100 ميكروجرام",
      maxQuantityPerMonth: 2,
      requiresDiagnosisCode: true,
      requiresBodyWeight: false,
      requiresLabResults: [],
      additionalRequirements: []
    }
  },
  
  // Pain medications
  { 
    nameAr: "ليريكا (بريجابالين)", 
    nameEn: "Lyrica (Pregabalin)", 
    category: "pain", 
    requiresPA: false, 
    indication: "ألم الأعصاب، الفيبروميالجيا", 
    icd10Codes: ["G62.9", "M79.7"], 
    alternatives: ["Neurontin"], 
    notes: "مادة خاضعة للرقابة",
    synonyms: ["بريجابالين", "دواء الأعصاب", "مسكن عصبي"],
    estimatedCost: 150,
    dosageInfo: {
      form: "كبسولات",
      frequency: "2-3 مرات يومياً",
      typicalDose: "75-150 مج",
      maxQuantityPerMonth: 90,
      requiresDiagnosisCode: true,
      requiresBodyWeight: false,
      requiresLabResults: [],
      additionalRequirements: ["وصفة مراقبة"]
    }
  },
  
  // GI medications
  { 
    nameAr: "نيكسيوم (إيسوميبرازول)", 
    nameEn: "Nexium (Esomeprazole)", 
    category: "gastrointestinal", 
    requiresPA: false, 
    indication: "ارتجاع المريء، قرحة المعدة", 
    icd10Codes: ["K21.0", "K25.9"], 
    alternatives: ["Omeprazole", "Pantoprazole"], 
    notes: "من مثبطات مضخة البروتون",
    synonyms: ["حبوب المعدة", "علاج الحموضة", "ايسوميبرازول"],
    estimatedCost: 90,
    dosageInfo: {
      form: "كبسولات",
      frequency: "مرة يومياً قبل الأكل",
      typicalDose: "20-40 مج",
      maxQuantityPerMonth: 30,
      requiresDiagnosisCode: true,
      requiresBodyWeight: false,
      requiresLabResults: [],
      additionalRequirements: []
    }
  },
  
  // Antibiotics
  { 
    nameAr: "أوجمنتين (أموكسيسيلين/كلافولانيك)", 
    nameEn: "Augmentin (Amoxicillin/Clavulanate)", 
    category: "antibiotic", 
    requiresPA: false, 
    indication: "العدوى البكتيرية", 
    icd10Codes: ["J06.9", "J18.9"], 
    alternatives: [], 
    notes: "مضاد حيوي واسع الطيف",
    synonyms: ["اوجمنتين", "مضاد حيوي", "أموكسيسيلين"],
    estimatedCost: 45,
    dosageInfo: {
      form: "أقراص/شراب",
      frequency: "2-3 مرات يومياً",
      typicalDose: "625-1000 مج",
      maxQuantityPerMonth: 21,
      requiresDiagnosisCode: true,
      requiresBodyWeight: true,
      requiresLabResults: [],
      additionalRequirements: []
    }
  },
  
  // Hormone therapy
  { 
    nameAr: "إليتروكسين (ليفوثيروكسين)", 
    nameEn: "Eltroxin (Levothyroxine)", 
    category: "hormone", 
    requiresPA: false, 
    indication: "قصور الغدة الدرقية", 
    icd10Codes: ["E03.9"], 
    alternatives: ["Euthyrox"], 
    notes: "يُؤخذ صباحاً على معدة فارغة",
    synonyms: ["اثيروكسين", "ليفوثيروكسين", "هرمون الغدة الدرقية"],
    estimatedCost: 25,
    dosageInfo: {
      form: "أقراص",
      frequency: "مرة صباحاً",
      typicalDose: "25-200 ميكروجرام",
      maxQuantityPerMonth: 30,
      requiresDiagnosisCode: true,
      requiresBodyWeight: true,
      requiresLabResults: ["TSH"],
      additionalRequirements: []
    }
  },
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, type = "all" } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Unified search prompt that handles both services and drugs
    const systemPrompt = `أنت مساعد طبي متخصص في التأمين الصحي السعودي. لديك قاعدة بيانات شاملة للخدمات الطبية والأدوية.

## قائمة الخدمات الطبية (SBS Services):
${JSON.stringify(sbsServices, null, 2)}

## قائمة الأدوية:
${JSON.stringify(drugsList, null, 2)}

## مهمتك:
1. فهم استفسار المستخدم (قد يكتب بلغة عامية بسيطة، مرادفات، أسماء تجارية، أو أسماء المواد الفعالة)
2. البحث في كلا القائمتين (الخدمات والأدوية) وإرجاع النتائج المطابقة
3. استخدم حقل "synonyms" للمطابقة مع المرادفات العامية والمواد الفعالة
4. يمكن للمستخدم البحث بـ:
   - الاسم التجاري: "سيمبيكورت" → Symbicort
   - المادة الفعالة: "بوديسونيد" → أي دواء يحتوي على هذه المادة
   - الاسم المركب: "سيمبيكورت (بوديسونيد/فورموتيرول)"
   - اسم إنجليزي: "Budesonide" أو "Formoterol"
5. حدد ما إذا كان العنصر يتطلب موافقة مسبقة
6. للأدوية: أرجع جميع متطلبات البيانات للوصفة (dosageInfo)

## قواعد مهمة:
- الخدمات أقل من 500 ريال عادةً لا تتطلب موافقة مسبقة
- أضف السعر التقديري والمدى السعري (mrpMin, mrpMax) إن وُجد
- للأدوية: أرجع معلومات الجرعة الكاملة والمتطلبات
- إذا بحث المستخدم عن مادة فعالة، أرجع جميع الأدوية التي تحتوي عليها

أرجع النتيجة بصيغة JSON التالية فقط:
{
  "found": true/false,
  "results": [
    {
      "type": "service" أو "drug",
      "code": "كود SBS (للخدمات فقط)",
      "nameAr": "الاسم بالعربية",
      "nameEn": "Name in English",
      "category": "الفئة",
      "estimatedCost": 0,
      "mrpMin": null,
      "mrpMax": null,
      "requiresPA": true/false,
      "paReason": "سبب الموافقة المسبقة",
      "indication": "دواعي الاستعمال (للأدوية)",
      "icd10Codes": ["قائمة أكواد التشخيص (للأدوية)"],
      "alternatives": ["البدائل (للأدوية)"],
      "notes": "ملاحظات",
      "dosageInfo": {
        "form": "شكل الدواء",
        "frequency": "التكرار",
        "typicalDose": "الجرعة النموذجية",
        "maxQuantityPerMonth": null,
        "requiresDiagnosisCode": true/false,
        "requiresBodyWeight": true/false,
        "requiresLabResults": ["التحاليل المطلوبة"],
        "additionalRequirements": ["متطلبات إضافية"]
      },
      "matchConfidence": "high/medium/low"
    }
  ],
  "suggestions": ["اقتراحات كنصوص إذا لم يُوجد تطابق"]
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: query }
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "تم تجاوز حد الطلبات، حاول لاحقاً" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "يرجى إضافة رصيد للمتابعة" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    let result;
    try {
      result = JSON.parse(content);
      // Normalize suggestions to always be strings
      if (result.suggestions && Array.isArray(result.suggestions)) {
        result.suggestions = result.suggestions.map((s: any) => 
          typeof s === 'string' ? s : (s.nameAr || s.nameEn || s.name || String(s))
        );
      }
    } catch {
      result = { found: false, results: [], suggestions: [] };
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("prior-auth-search error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
