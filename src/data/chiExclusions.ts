export interface Exclusion {
  id: string;
  name: string;
  nameAr: string;
  category: string;
  description: string;
  descriptionAr: string;
  estimatedDemand: 'high' | 'medium' | 'low';
  potentialCostSAR?: number;
  prevalencePerThousand?: number;
}

export interface SubLimit {
  id: string;
  benefit: string;
  benefitAr: string;
  category: string;
  currentLimitSAR: number;
  minLimitSAR: number;
  maxLimitSAR: number;
  copaymentPercent: number;
  maxCopaymentSAR: number;
  utilizationRate: number; // % of members who use this benefit
  avgClaimSAR: number; // Average claim amount when used
  description: string;
}

// Official CHI Exclusions (Chapter Three - Controls and Exceptions)
export const chiExclusions: Exclusion[] = [
  {
    id: 'cosmetic-surgery',
    name: 'Non-Reconstructive Cosmetic Surgeries',
    nameAr: 'الجراحات التجميلية غير الترميمية',
    category: 'Cosmetic',
    description: 'All cosmetic surgeries not for reconstructive purposes after accidents or medical conditions',
    descriptionAr: 'جميع العمليات التجميلية التي ليست لأغراض ترميمية بعد الحوادث أو الحالات الطبية',
    estimatedDemand: 'high',
    potentialCostSAR: 35000,
    prevalencePerThousand: 25
  },
  {
    id: 'ivf-fertility',
    name: 'IVF & Fertility Treatments',
    nameAr: 'أطفال الأنابيب وعلاجات الخصوبة',
    category: 'Fertility',
    description: 'In-vitro fertilization, artificial insemination, infertility treatments, and related procedures',
    descriptionAr: 'التلقيح الصناعي، أطفال الأنابيب، علاجات العقم، والإجراءات ذات الصلة',
    estimatedDemand: 'high',
    potentialCostSAR: 45000,
    prevalencePerThousand: 18
  },
  {
    id: 'dental-advanced',
    name: 'Dental Implants, Crowns & Bridges',
    nameAr: 'زراعة الأسنان والتيجان والجسور',
    category: 'Dental',
    description: 'All dental implants, dentures, crowns, bridges, and cosmetic dental procedures including whitening',
    descriptionAr: 'جميع زراعات الأسنان والأطقم والتيجان والجسور وإجراءات تجميل الأسنان بما في ذلك التبييض',
    estimatedDemand: 'high',
    potentialCostSAR: 15000,
    prevalencePerThousand: 85
  },
  {
    id: 'vision-correction',
    name: 'Vision Correction Surgeries (LASIK)',
    nameAr: 'جراحات تصحيح البصر (الليزك)',
    category: 'Ophthalmology',
    description: 'Laser eye surgery and other vision correction procedures, except those preventing vision loss',
    descriptionAr: 'جراحة العيون بالليزر وإجراءات تصحيح البصر الأخرى، باستثناء التي تمنع فقدان البصر',
    estimatedDemand: 'medium',
    potentialCostSAR: 12000,
    prevalencePerThousand: 15
  },
  {
    id: 'eyeglasses-adult',
    name: 'Eyeglasses for Adults (Over 14)',
    nameAr: 'النظارات الطبية للبالغين (فوق 14 سنة)',
    category: 'Ophthalmology',
    description: 'Prescription eyeglasses and frames for persons over 14 years of age',
    descriptionAr: 'النظارات الطبية والإطارات للأشخاص فوق 14 سنة',
    estimatedDemand: 'high',
    potentialCostSAR: 800,
    prevalencePerThousand: 350
  },
  {
    id: 'joint-replacement',
    name: 'Joint Replacement (Elective)',
    nameAr: 'استبدال المفاصل (الاختياري)',
    category: 'Orthopedic',
    description: 'Elective joint replacement surgeries except for trauma or cancer-related cases',
    descriptionAr: 'عمليات استبدال المفاصل الاختيارية باستثناء حالات الإصابات أو السرطان',
    estimatedDemand: 'medium',
    potentialCostSAR: 95000,
    prevalencePerThousand: 5
  },
  {
    id: 'alternative-medicine',
    name: 'Alternative Medicine',
    nameAr: 'الطب البديل',
    category: 'Alternative',
    description: 'Traditional medicine, herbal treatments, acupuncture, and other alternative therapies',
    descriptionAr: 'الطب التقليدي والعلاجات العشبية والوخز بالإبر والعلاجات البديلة الأخرى',
    estimatedDemand: 'medium',
    potentialCostSAR: 5000,
    prevalencePerThousand: 45
  },
  {
    id: 'hair-treatment',
    name: 'Hair Loss & Baldness Treatment',
    nameAr: 'علاج تساقط الشعر والصلع',
    category: 'Cosmetic',
    description: 'Hair loss treatments, hair transplants, artificial hair, and baldness treatments',
    descriptionAr: 'علاجات تساقط الشعر وزراعة الشعر والشعر الصناعي وعلاجات الصلع',
    estimatedDemand: 'medium',
    potentialCostSAR: 25000,
    prevalencePerThousand: 40
  },
  {
    id: 'acne-treatment',
    name: 'Acne Treatment',
    nameAr: 'علاج حب الشباب',
    category: 'Dermatology',
    description: 'Treatment of acne and related skin conditions',
    descriptionAr: 'علاج حب الشباب والحالات الجلدية ذات الصلة',
    estimatedDemand: 'medium',
    potentialCostSAR: 3000,
    prevalencePerThousand: 120
  },
  {
    id: 'prosthetics',
    name: 'Artificial & Prosthetic Limbs',
    nameAr: 'الأطراف الصناعية',
    category: 'Rehabilitation',
    description: 'Prosthetic limbs, artificial limbs, and related assistive devices',
    descriptionAr: 'الأطراف الاصطناعية والأجهزة المساعدة ذات الصلة',
    estimatedDemand: 'low',
    potentialCostSAR: 50000,
    prevalencePerThousand: 2
  },
  {
    id: 'addiction-rehab',
    name: 'Addiction Rehabilitation (Inpatient)',
    nameAr: 'إعادة تأهيل الإدمان (داخلي)',
    category: 'Mental Health',
    description: 'Rehabilitation admissions for addiction and alcohol abuse management',
    descriptionAr: 'الإقامة لإعادة تأهيل الإدمان وإدارة إساءة استخدام الكحول',
    estimatedDemand: 'low',
    potentialCostSAR: 75000,
    prevalencePerThousand: 8
  },
  {
    id: 'long-term-care',
    name: 'Long-Term Nursing Care',
    nameAr: 'الرعاية التمريضية طويلة الأمد',
    category: 'Long-term Care',
    description: 'Extended nursing care and personal care services not part of acute treatment',
    descriptionAr: 'الرعاية التمريضية الممتدة وخدمات الرعاية الشخصية غير المرتبطة بالعلاج الحاد',
    estimatedDemand: 'medium',
    potentialCostSAR: 120000,
    prevalencePerThousand: 3
  },
  {
    id: 'recreational-therapy',
    name: 'Recreational Therapy & Fitness',
    nameAr: 'العلاج الترفيهي واللياقة البدنية',
    category: 'Wellness',
    description: 'General fitness programs, recreational therapy, and wellness activities',
    descriptionAr: 'برامج اللياقة البدنية العامة والعلاج الترفيهي وأنشطة العافية',
    estimatedDemand: 'medium',
    potentialCostSAR: 8000,
    prevalencePerThousand: 60
  },
  {
    id: 'congenital-non-life',
    name: 'Congenital Conditions (Non-Life-Threatening)',
    nameAr: 'الحالات الخلقية (غير المهددة للحياة)',
    category: 'Congenital',
    description: 'Treatment of congenital deformities that do not pose current or future life threat',
    descriptionAr: 'علاج التشوهات الخلقية التي لا تشكل تهديدًا حاليًا أو مستقبليًا للحياة',
    estimatedDemand: 'low',
    potentialCostSAR: 40000,
    prevalencePerThousand: 10
  },
  {
    id: 'organ-transplant',
    name: 'Organ Transplants (Except Kidney)',
    nameAr: 'زراعة الأعضاء (باستثناء الكلى)',
    category: 'Transplant',
    description: 'Human organ transplantation except for the covered kidney transplant benefit',
    descriptionAr: 'زراعة الأعضاء البشرية باستثناء منفعة زراعة الكلى المغطاة',
    estimatedDemand: 'low',
    potentialCostSAR: 500000,
    prevalencePerThousand: 0.5
  },
  {
    id: 'orthodontics',
    name: 'Orthodontic Treatment (Braces)',
    nameAr: 'علاج تقويم الأسنان',
    category: 'Dental',
    description: 'Teeth straightening, braces, aligners, and orthodontic procedures',
    descriptionAr: 'تقويم الأسنان والمشابك والمصففات وإجراءات تقويم الأسنان',
    estimatedDemand: 'high',
    potentialCostSAR: 18000,
    prevalencePerThousand: 55
  },
  {
    id: 'allergy-general',
    name: 'General Allergy Testing',
    nameAr: 'اختبارات الحساسية العامة',
    category: 'Diagnostic',
    description: 'Allergy tests not related to specific medical conditions or prescribed medications',
    descriptionAr: 'اختبارات الحساسية غير المرتبطة بحالات طبية محددة أو أدوية موصوفة',
    estimatedDemand: 'medium',
    potentialCostSAR: 2500,
    prevalencePerThousand: 80
  },
  {
    id: 'weight-loss-cosmetic',
    name: 'Cosmetic Weight Loss Procedures',
    nameAr: 'إجراءات إنقاص الوزن التجميلية',
    category: 'Cosmetic',
    description: 'Weight loss procedures for cosmetic purposes (not meeting BMI criteria)',
    descriptionAr: 'إجراءات إنقاص الوزن لأغراض تجميلية (لا تستوفي معايير مؤشر كتلة الجسم)',
    estimatedDemand: 'high',
    potentialCostSAR: 30000,
    prevalencePerThousand: 35
  },
  {
    id: 'weight-loss-medications',
    name: 'Weight Loss Medications',
    nameAr: 'أدوية نزول الوزن',
    category: 'Pharmaceutical',
    description: 'Medications prescribed solely for weight loss purposes',
    descriptionAr: 'الأدوية الموصوفة فقط لأغراض إنقاص الوزن',
    estimatedDemand: 'high',
    potentialCostSAR: 8000,
    prevalencePerThousand: 50
  },
  {
    id: 'experimental-treatments',
    name: 'Experimental & Investigational Treatments',
    nameAr: 'العلاجات التجريبية والبحثية',
    category: 'Experimental',
    description: 'Treatments still under research or clinical trials not yet approved',
    descriptionAr: 'العلاجات التي ما زالت تحت الأبحاث أو التجارب السريرية ولم تُعتمد بعد',
    estimatedDemand: 'low',
    potentialCostSAR: 150000,
    prevalencePerThousand: 2
  },
  {
    id: 'organ-transplant-all',
    name: 'Organ Transplants (Including Bone Marrow)',
    nameAr: 'زراعة الأعضاء (بما فيها نخاع العظم)',
    category: 'Transplant',
    description: 'All organ transplants including bone marrow transplant for cancer patients, except kidney',
    descriptionAr: 'جميع زراعات الأعضاء بما فيها زراعة نخاع العظم لمرضى السرطان، باستثناء الكلى',
    estimatedDemand: 'low',
    potentialCostSAR: 600000,
    prevalencePerThousand: 0.3
  },
  {
    id: 'ear-piercing',
    name: 'Ear Piercing for Female Newborns',
    nameAr: 'تخريم الأذن للمواليد البنات',
    category: 'Cosmetic',
    description: 'Ear piercing procedures for female newborns',
    descriptionAr: 'إجراء تخريم الأذن للمواليد الإناث',
    estimatedDemand: 'medium',
    potentialCostSAR: 200,
    prevalencePerThousand: 20
  },
  {
    id: 'work-injury',
    name: 'Work-Related Injuries',
    nameAr: 'إصابات العمل',
    category: 'Occupational',
    description: 'Medical care resulting from work-related injuries (covered by GOSI)',
    descriptionAr: 'العناية الطبية الناتجة عن إصابات العمل (مغطاة بالتأمينات الاجتماعية)',
    estimatedDemand: 'medium',
    potentialCostSAR: 25000,
    prevalencePerThousand: 15
  },
  {
    id: 'extreme-sports',
    name: 'Extreme Sports Injuries',
    nameAr: 'إصابات الرياضات الخطيرة',
    category: 'Sports',
    description: 'Injuries resulting from dangerous or extreme sports activities',
    descriptionAr: 'الإصابات الناتجة عن ممارسة الرياضات الخطيرة أو المتطرفة',
    estimatedDemand: 'low',
    potentialCostSAR: 50000,
    prevalencePerThousand: 3
  },
  {
    id: 'suicide-attempt',
    name: 'Self-Inflicted Injuries & Suicide Attempts',
    nameAr: 'الإصابات الذاتية ومحاولات الانتحار',
    category: 'Self-Harm',
    description: 'Medical care for self-inflicted injuries or suicide attempts',
    descriptionAr: 'العناية الطبية الناتجة عن الإصابات الذاتية أو محاولات الانتحار',
    estimatedDemand: 'low',
    potentialCostSAR: 35000,
    prevalencePerThousand: 1
  }
];

// Official CHI Sub-Limits (Chapter Eight - Policy Schedule)
export const chiSubLimits: SubLimit[] = [
  {
    id: 'annual-max',
    benefit: 'Annual Maximum Benefit',
    benefitAr: 'الحد الأقصى السنوي',
    category: 'Overall',
    currentLimitSAR: 1000000,
    minLimitSAR: 500000,
    maxLimitSAR: 5000000,
    copaymentPercent: 0,
    maxCopaymentSAR: 0,
    utilizationRate: 0.5,
    avgClaimSAR: 25000,
    description: 'Maximum benefit per person per policy year'
  },
  {
    id: 'pregnancy-delivery',
    benefit: 'Pregnancy & Delivery',
    benefitAr: 'الحمل والولادة',
    category: 'Maternity',
    currentLimitSAR: 15000,
    minLimitSAR: 10000,
    maxLimitSAR: 50000,
    copaymentPercent: 0,
    maxCopaymentSAR: 0,
    utilizationRate: 2.2,
    avgClaimSAR: 12000,
    description: 'Pregnancy, delivery, and related care during policy period'
  },
  {
    id: 'dental-essential',
    benefit: 'Essential Dental Care',
    benefitAr: 'رعاية الأسنان الأساسية',
    category: 'Dental',
    currentLimitSAR: 1200,
    minLimitSAR: 800,
    maxLimitSAR: 5000,
    copaymentPercent: 0,
    maxCopaymentSAR: 0,
    utilizationRate: 25,
    avgClaimSAR: 600,
    description: 'Consultations, examinations, fillings, cleaning, extractions, periodontal treatment'
  },
  {
    id: 'dental-rootcanal',
    benefit: 'Root Canal & Dental Emergency',
    benefitAr: 'علاج الجذور وطوارئ الأسنان',
    category: 'Dental',
    currentLimitSAR: 800,
    minLimitSAR: 500,
    maxLimitSAR: 3000,
    copaymentPercent: 20,
    maxCopaymentSAR: 160,
    utilizationRate: 8,
    avgClaimSAR: 650,
    description: 'Root canal treatments and emergency dental procedures'
  },
  {
    id: 'spectacles',
    benefit: 'Spectacles (Under 14 years)',
    benefitAr: 'النظارات (أقل من 14 سنة)',
    category: 'Vision',
    currentLimitSAR: 400,
    minLimitSAR: 300,
    maxLimitSAR: 1500,
    copaymentPercent: 0,
    maxCopaymentSAR: 0,
    utilizationRate: 5,
    avgClaimSAR: 350,
    description: 'Eyeglasses for beneficiaries aged 14 years and under'
  },
  {
    id: 'dialysis',
    benefit: 'Dialysis Treatment',
    benefitAr: 'غسيل الكلى',
    category: 'Renal',
    currentLimitSAR: 180000,
    minLimitSAR: 150000,
    maxLimitSAR: 350000,
    copaymentPercent: 0,
    maxCopaymentSAR: 0,
    utilizationRate: 0.28,
    avgClaimSAR: 150000,
    description: 'Annual dialysis treatment coverage'
  },
  {
    id: 'kidney-transplant',
    benefit: 'Kidney Transplant',
    benefitAr: 'زراعة الكلى',
    category: 'Transplant',
    currentLimitSAR: 250000,
    minLimitSAR: 200000,
    maxLimitSAR: 500000,
    copaymentPercent: 0,
    maxCopaymentSAR: 0,
    utilizationRate: 0.05,
    avgClaimSAR: 200000,
    description: 'Kidney transplant surgery and related care'
  },
  {
    id: 'psychiatric',
    benefit: 'Psychiatric Treatment',
    benefitAr: 'العلاج النفسي',
    category: 'Mental Health',
    currentLimitSAR: 50000,
    minLimitSAR: 30000,
    maxLimitSAR: 150000,
    copaymentPercent: 0,
    maxCopaymentSAR: 0,
    utilizationRate: 4.5,
    avgClaimSAR: 8000,
    description: 'Psychological and psychiatric treatment coverage'
  },
  {
    id: 'hearing-aids',
    benefit: 'Hearing Aids',
    benefitAr: 'سماعات الأذن الطبية',
    category: 'Medical Devices',
    currentLimitSAR: 6000,
    minLimitSAR: 4000,
    maxLimitSAR: 15000,
    copaymentPercent: 0,
    maxCopaymentSAR: 0,
    utilizationRate: 0.8,
    avgClaimSAR: 4500,
    description: 'Medical hearing aids coverage'
  },
  {
    id: 'valvular-heart',
    benefit: 'Acquired Valvular Heart Disease',
    benefitAr: 'أمراض صمامات القلب المكتسبة',
    category: 'Cardiovascular',
    currentLimitSAR: 150000,
    minLimitSAR: 100000,
    maxLimitSAR: 300000,
    copaymentPercent: 0,
    maxCopaymentSAR: 0,
    utilizationRate: 0.3,
    avgClaimSAR: 85000,
    description: 'Treatment of acquired valvular heart disease'
  },
  {
    id: 'organ-harvesting',
    benefit: 'Organ Harvesting (Donor)',
    benefitAr: 'جمع الأعضاء (المتبرع)',
    category: 'Transplant',
    currentLimitSAR: 50000,
    minLimitSAR: 30000,
    maxLimitSAR: 100000,
    copaymentPercent: 0,
    maxCopaymentSAR: 0,
    utilizationRate: 0.02,
    avgClaimSAR: 35000,
    description: 'Organ collection from insured donor'
  },
  {
    id: 'alzheimers',
    benefit: "Alzheimer's Disease",
    benefitAr: 'مرض الزهايمر',
    category: 'Neurological',
    currentLimitSAR: 15000,
    minLimitSAR: 10000,
    maxLimitSAR: 50000,
    copaymentPercent: 0,
    maxCopaymentSAR: 0,
    utilizationRate: 0.5,
    avgClaimSAR: 10000,
    description: "Coverage for Alzheimer's disease treatment"
  },
  {
    id: 'autism',
    benefit: 'Autism Spectrum Disorder',
    benefitAr: 'اضطراب طيف التوحد',
    category: 'Developmental',
    currentLimitSAR: 50000,
    minLimitSAR: 30000,
    maxLimitSAR: 150000,
    copaymentPercent: 0,
    maxCopaymentSAR: 0,
    utilizationRate: 1.2,
    avgClaimSAR: 25000,
    description: 'Autism diagnosis and treatment services'
  },
  {
    id: 'newborn-screening',
    benefit: 'Newborn Screening Program',
    benefitAr: 'برنامج فحص حديثي الولادة',
    category: 'Pediatric',
    currentLimitSAR: 100000,
    minLimitSAR: 50000,
    maxLimitSAR: 200000,
    copaymentPercent: 0,
    maxCopaymentSAR: 0,
    utilizationRate: 2.0,
    avgClaimSAR: 2500,
    description: 'National Newborn Screening Program to eliminate disabilities'
  },
  {
    id: 'disability',
    benefit: 'Disability Coverage',
    benefitAr: 'تغطية الإعاقة',
    category: 'Rehabilitation',
    currentLimitSAR: 100000,
    minLimitSAR: 50000,
    maxLimitSAR: 250000,
    copaymentPercent: 0,
    maxCopaymentSAR: 0,
    utilizationRate: 0.4,
    avgClaimSAR: 35000,
    description: 'Disability insurance coverage'
  },
  {
    id: 'obesity-surgery',
    benefit: 'Bariatric Surgery',
    benefitAr: 'جراحة السمنة',
    category: 'Metabolic',
    currentLimitSAR: 15000,
    minLimitSAR: 12000,
    maxLimitSAR: 50000,
    copaymentPercent: 20,
    maxCopaymentSAR: 1000,
    utilizationRate: 0.8,
    avgClaimSAR: 14000,
    description: 'Weight loss surgery for BMI >40 or >35 with complications'
  },
  {
    id: 'circumcision',
    benefit: 'Male Circumcision',
    benefitAr: 'ختان الذكور',
    category: 'Pediatric',
    currentLimitSAR: 500,
    minLimitSAR: 400,
    maxLimitSAR: 1500,
    copaymentPercent: 0,
    maxCopaymentSAR: 0,
    utilizationRate: 2.0,
    avgClaimSAR: 400,
    description: 'Male circumcision procedure coverage'
  },
  {
    id: 'contraception',
    benefit: 'Contraception',
    benefitAr: 'موانع الحمل',
    category: 'Family Planning',
    currentLimitSAR: 1500,
    minLimitSAR: 1000,
    maxLimitSAR: 5000,
    copaymentPercent: 0,
    maxCopaymentSAR: 0,
    utilizationRate: 3.5,
    avgClaimSAR: 800,
    description: 'Hormonal contraceptives and IUD coverage'
  },
  {
    id: 'deceased-repatriation',
    benefit: 'Deceased Repatriation',
    benefitAr: 'نقل المتوفى للوطن',
    category: 'Other',
    currentLimitSAR: 10000,
    minLimitSAR: 8000,
    maxLimitSAR: 25000,
    copaymentPercent: 0,
    maxCopaymentSAR: 0,
    utilizationRate: 0.1,
    avgClaimSAR: 8000,
    description: 'Transportation of deceased to home country'
  },
  {
    id: 'room-accommodation',
    benefit: 'Room Accommodation (Daily)',
    benefitAr: 'إقامة الغرفة (يومي)',
    category: 'Inpatient',
    currentLimitSAR: 600,
    minLimitSAR: 400,
    maxLimitSAR: 1500,
    copaymentPercent: 0,
    maxCopaymentSAR: 0,
    utilizationRate: 8,
    avgClaimSAR: 550,
    description: 'Daily room rate for shared accommodation'
  }
];

export const exclusionCategories = [
  'All Categories',
  'Cosmetic',
  'Fertility',
  'Dental',
  'Ophthalmology',
  'Orthopedic',
  'Alternative',
  'Dermatology',
  'Rehabilitation',
  'Mental Health',
  'Long-term Care',
  'Wellness',
  'Congenital',
  'Transplant',
  'Diagnostic'
];

export const subLimitCategories = [
  'All Categories',
  'Overall',
  'Maternity',
  'Dental',
  'Vision',
  'Renal',
  'Transplant',
  'Mental Health',
  'Medical Devices',
  'Cardiovascular',
  'Neurological',
  'Developmental',
  'Pediatric',
  'Rehabilitation',
  'Metabolic',
  'Family Planning',
  'Inpatient',
  'Other'
];
