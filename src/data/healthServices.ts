export interface HealthService {
  id: string;
  name: string;
  nameAr: string;
  category: string;
  prevalencePerThousand: number;
  averageTreatmentCostSAR: number;
  dataSource: 'saudi' | 'gcc' | 'mena';
  sourceCountry?: string;
  icd10Code?: string;
  description: string;
}

export interface PremiumCalculation {
  basePremium: number;
  additionalPremiumPerMember: number;
  totalImpactPercent: number;
  expectedClaimsPerThousand: number;
  annualCostPerThousand: number;
  riskLoadingFactor: number;
  adminLoadingPercent: number;
}

export const healthServices: HealthService[] = [
  {
    id: 'diabetes-type2',
    name: 'Type 2 Diabetes Management',
    nameAr: 'إدارة مرض السكري من النوع الثاني',
    category: 'Chronic Disease',
    prevalencePerThousand: 185,
    averageTreatmentCostSAR: 24500,
    dataSource: 'saudi',
    icd10Code: 'E11',
    description: 'Comprehensive diabetes management including medications, monitoring, and consultations'
  },
  {
    id: 'hypertension',
    name: 'Hypertension Treatment',
    nameAr: 'علاج ارتفاع ضغط الدم',
    category: 'Chronic Disease',
    prevalencePerThousand: 156,
    averageTreatmentCostSAR: 8200,
    dataSource: 'saudi',
    icd10Code: 'I10',
    description: 'Blood pressure management with medications and regular monitoring'
  },
  {
    id: 'obesity-treatment',
    name: 'Obesity Treatment Program',
    nameAr: 'برنامج علاج السمنة',
    category: 'Metabolic',
    prevalencePerThousand: 352,
    averageTreatmentCostSAR: 35000,
    dataSource: 'saudi',
    icd10Code: 'E66',
    description: 'Comprehensive obesity management including nutritional counseling and bariatric options'
  },
  {
    id: 'ivf-treatment',
    name: 'IVF Treatment Cycle',
    nameAr: 'دورة علاج أطفال الأنابيب',
    category: 'Fertility',
    prevalencePerThousand: 12,
    averageTreatmentCostSAR: 45000,
    dataSource: 'saudi',
    icd10Code: 'Z31.83',
    description: 'Single IVF cycle including medications, procedures, and monitoring'
  },
  {
    id: 'mental-health',
    name: 'Mental Health Services',
    nameAr: 'خدمات الصحة النفسية',
    category: 'Mental Health',
    prevalencePerThousand: 89,
    averageTreatmentCostSAR: 12000,
    dataSource: 'gcc',
    sourceCountry: 'UAE',
    icd10Code: 'F32',
    description: 'Psychiatric consultations, therapy sessions, and medications'
  },
  {
    id: 'cardiac-cath',
    name: 'Cardiac Catheterization',
    nameAr: 'قسطرة القلب',
    category: 'Cardiovascular',
    prevalencePerThousand: 8,
    averageTreatmentCostSAR: 85000,
    dataSource: 'saudi',
    icd10Code: 'I25',
    description: 'Diagnostic and interventional cardiac catheterization procedures'
  },
  {
    id: 'knee-replacement',
    name: 'Total Knee Replacement',
    nameAr: 'استبدال الركبة الكامل',
    category: 'Orthopedic',
    prevalencePerThousand: 4.5,
    averageTreatmentCostSAR: 95000,
    dataSource: 'saudi',
    icd10Code: 'M17',
    description: 'Total knee arthroplasty including surgery, implant, and rehabilitation'
  },
  {
    id: 'dialysis',
    name: 'Hemodialysis (Annual)',
    nameAr: 'غسيل الكلى (سنوي)',
    category: 'Renal',
    prevalencePerThousand: 2.8,
    averageTreatmentCostSAR: 280000,
    dataSource: 'saudi',
    icd10Code: 'N18.6',
    description: 'Annual hemodialysis treatment (3 sessions per week)'
  },
  {
    id: 'cancer-screening',
    name: 'Cancer Screening Package',
    nameAr: 'باقة فحص السرطان',
    category: 'Preventive',
    prevalencePerThousand: 450,
    averageTreatmentCostSAR: 3500,
    dataSource: 'saudi',
    icd10Code: 'Z12',
    description: 'Comprehensive cancer screening including mammography, colonoscopy, and tumor markers'
  },
  {
    id: 'lasik',
    name: 'LASIK Eye Surgery',
    nameAr: 'جراحة الليزك للعيون',
    category: 'Ophthalmology',
    prevalencePerThousand: 15,
    averageTreatmentCostSAR: 12000,
    dataSource: 'gcc',
    sourceCountry: 'UAE',
    icd10Code: 'H52',
    description: 'Laser vision correction surgery for both eyes'
  },
  {
    id: 'maternity',
    name: 'Maternity Package',
    nameAr: 'باقة الولادة',
    category: 'Maternity',
    prevalencePerThousand: 22,
    averageTreatmentCostSAR: 35000,
    dataSource: 'saudi',
    icd10Code: 'O80',
    description: 'Complete maternity care including delivery, prenatal, and postnatal care'
  },
  {
    id: 'dental-implant',
    name: 'Dental Implant (Single)',
    nameAr: 'زراعة الأسنان (واحدة)',
    category: 'Dental',
    prevalencePerThousand: 45,
    averageTreatmentCostSAR: 8500,
    dataSource: 'saudi',
    icd10Code: 'K08.1',
    description: 'Single dental implant including crown'
  },
  {
    id: 'physiotherapy',
    name: 'Physiotherapy Program',
    nameAr: 'برنامج العلاج الطبيعي',
    category: 'Rehabilitation',
    prevalencePerThousand: 78,
    averageTreatmentCostSAR: 6500,
    dataSource: 'saudi',
    icd10Code: 'Z50.1',
    description: '12-session physiotherapy rehabilitation program'
  },
  {
    id: 'sleep-apnea',
    name: 'Sleep Apnea Treatment',
    nameAr: 'علاج انقطاع النفس النومي',
    category: 'Sleep Medicine',
    prevalencePerThousand: 42,
    averageTreatmentCostSAR: 15000,
    dataSource: 'gcc',
    sourceCountry: 'Kuwait',
    icd10Code: 'G47.33',
    description: 'Sleep study, CPAP device, and follow-up care'
  },
  {
    id: 'thyroid-surgery',
    name: 'Thyroid Surgery',
    nameAr: 'جراحة الغدة الدرقية',
    category: 'Endocrine',
    prevalencePerThousand: 3.2,
    averageTreatmentCostSAR: 55000,
    dataSource: 'saudi',
    icd10Code: 'E04',
    description: 'Thyroidectomy including surgery and hospital stay'
  }
];

export const categories = [
  'All Categories',
  'Chronic Disease',
  'Metabolic',
  'Fertility',
  'Mental Health',
  'Cardiovascular',
  'Orthopedic',
  'Renal',
  'Preventive',
  'Ophthalmology',
  'Maternity',
  'Dental',
  'Rehabilitation',
  'Sleep Medicine',
  'Endocrine'
];

export function calculatePremiumImpact(
  service: HealthService,
  memberCount: number = 1000,
  basePremiumSAR: number = 5000
): PremiumCalculation {
  const utilizationRate = 0.65; // 65% of those with condition will use benefit
  const expectedClaimsPerThousand = service.prevalencePerThousand * utilizationRate;
  const annualCostPerThousand = expectedClaimsPerThousand * service.averageTreatmentCostSAR;
  
  // Risk loading based on variance and unpredictability
  const riskLoadingFactor = service.category === 'Chronic Disease' ? 1.15 :
                           service.category === 'Cardiovascular' ? 1.25 :
                           service.category === 'Renal' ? 1.30 :
                           service.category === 'Fertility' ? 1.20 : 1.10;
  
  const adminLoadingPercent = 12; // 12% admin loading
  
  const purePremium = annualCostPerThousand / 1000;
  const loadedPremium = purePremium * riskLoadingFactor * (1 + adminLoadingPercent / 100);
  
  const totalImpactPercent = (loadedPremium / basePremiumSAR) * 100;
  
  return {
    basePremium: basePremiumSAR,
    additionalPremiumPerMember: Math.round(loadedPremium),
    totalImpactPercent: Math.round(totalImpactPercent * 100) / 100,
    expectedClaimsPerThousand: Math.round(expectedClaimsPerThousand * 10) / 10,
    annualCostPerThousand: Math.round(annualCostPerThousand),
    riskLoadingFactor,
    adminLoadingPercent
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-SA', {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-SA').format(num);
}
