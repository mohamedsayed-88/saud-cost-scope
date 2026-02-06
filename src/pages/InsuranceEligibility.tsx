import { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, Search, User, CreditCard, Calendar, Building2, 
  XCircle, Info, FileCheck, Plane, Users, Star, Globe, BadgeCheck,
  CheckCircle2, Loader2, AlertTriangle
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface InsuranceResult {
  isInsured: boolean;
  policyNumber?: string;
  insuranceCompany?: string;
  startDate?: string;
  endDate?: string;
  policyType?: string;
  beneficiaryName?: string;
  // Add more fields as returned by the API
}

const InsuranceEligibility = () => {
  const { language, isRTL } = useLanguage();
  
  // Resident/Citizen form state
  const [idNumber, setIdNumber] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<InsuranceResult | null>(null);

  // Visitor form state
  const [visitorNumber, setVisitorNumber] = useState('');
  const [visitorAgreedToTerms, setVisitorAgreedToTerms] = useState(false);
  const [visitorError, setVisitorError] = useState('');
  const [visitorLoading, setVisitorLoading] = useState(false);
  const [visitorResult, setVisitorResult] = useState<InsuranceResult | null>(null);

  // Premium Residency form state
  const [premiumNumber, setPremiumNumber] = useState('');
  const [premiumAgreedToTerms, setPremiumAgreedToTerms] = useState(false);
  const [premiumError, setPremiumError] = useState('');
  const [premiumLoading, setPremiumLoading] = useState(false);
  const [premiumResult, setPremiumResult] = useState<InsuranceResult | null>(null);

  const validateIdNumber = (id: string) => {
    const regex = /^[12]\d{9}$/;
    return regex.test(id);
  };

  const checkInsurance = async (systemType: number, key: string) => {
    const { data, error } = await supabase.functions.invoke('check-insurance', {
      body: { systemType, key }
    });
    
    if (error) throw error;
    return data;
  };

  const handleResidentSearch = async () => {
    setError('');
    setResult(null);

    if (!idNumber.trim()) {
      setError(language === 'ar' ? 'يرجى إدخال رقم الهوية أو الإقامة' : 'Please enter ID or Iqama number');
      return;
    }

    if (!validateIdNumber(idNumber)) {
      setError(language === 'ar' ? 'رقم الهوية/الإقامة غير صحيح. يجب أن يبدأ بـ 1 أو 2 ويتكون من 10 أرقام' : 'Invalid ID/Iqama number. Must start with 1 or 2 and be 10 digits');
      return;
    }

    if (!agreedToTerms) {
      setError(language === 'ar' ? 'يرجى الموافقة على سياسة الخصوصية' : 'Please agree to the privacy policy');
      return;
    }

    setLoading(true);
    try {
      const data = await checkInsurance(1, idNumber);
      console.log('API Response:', data);
      
      // Parse the response based on the API structure
      if (data) {
        setResult({
          isInsured: data.isInsured ?? data.IsInsured ?? Boolean(data.policyNumber) ?? Boolean(data.PolicyNumber),
          policyNumber: data.policyNumber ?? data.PolicyNumber ?? data.policy_number,
          insuranceCompany: data.insuranceCompany ?? data.InsuranceCompany ?? data.insurance_company ?? data.companyName ?? data.CompanyName,
          startDate: data.startDate ?? data.StartDate ?? data.start_date ?? data.policyStartDate ?? data.PolicyStartDate,
          endDate: data.endDate ?? data.EndDate ?? data.end_date ?? data.policyEndDate ?? data.PolicyEndDate,
          policyType: data.policyType ?? data.PolicyType ?? data.policy_type,
          beneficiaryName: data.beneficiaryName ?? data.BeneficiaryName ?? data.beneficiary_name ?? data.name ?? data.Name,
        });
        
        toast({
          title: language === 'ar' ? 'تم الاستعلام بنجاح' : 'Query Successful',
          description: language === 'ar' ? 'تم استرجاع معلومات التأمين' : 'Insurance information retrieved',
        });
      }
    } catch (err: unknown) {
      console.error('Error checking insurance:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(language === 'ar' ? `فشل الاستعلام: ${errorMessage}` : `Query failed: ${errorMessage}`);
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'فشل في الاستعلام عن التأمين' : 'Failed to query insurance',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVisitorSearch = async () => {
    setVisitorError('');
    setVisitorResult(null);

    if (!visitorNumber.trim()) {
      setVisitorError(language === 'ar' ? 'يرجى إدخال رقم الجواز أو التأشيرة أو الحدود' : 'Please enter passport, visa, or border number');
      return;
    }

    if (!visitorAgreedToTerms) {
      setVisitorError(language === 'ar' ? 'يرجى الموافقة على سياسة الخصوصية' : 'Please agree to the privacy policy');
      return;
    }

    setVisitorLoading(true);
    try {
      const data = await checkInsurance(2, visitorNumber);
      console.log('Visitor API Response:', data);
      
      if (data) {
        setVisitorResult({
          isInsured: data.isInsured ?? data.IsInsured ?? Boolean(data.policyNumber) ?? Boolean(data.PolicyNumber),
          policyNumber: data.policyNumber ?? data.PolicyNumber ?? data.policy_number,
          insuranceCompany: data.insuranceCompany ?? data.InsuranceCompany ?? data.insurance_company ?? data.companyName ?? data.CompanyName,
          startDate: data.startDate ?? data.StartDate ?? data.start_date ?? data.policyStartDate ?? data.PolicyStartDate,
          endDate: data.endDate ?? data.EndDate ?? data.end_date ?? data.policyEndDate ?? data.PolicyEndDate,
          policyType: data.policyType ?? data.PolicyType ?? data.policy_type,
          beneficiaryName: data.beneficiaryName ?? data.BeneficiaryName ?? data.beneficiary_name ?? data.name ?? data.Name,
        });
        
        toast({
          title: language === 'ar' ? 'تم الاستعلام بنجاح' : 'Query Successful',
          description: language === 'ar' ? 'تم استرجاع معلومات التأمين' : 'Insurance information retrieved',
        });
      }
    } catch (err: unknown) {
      console.error('Error checking visitor insurance:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setVisitorError(language === 'ar' ? `فشل الاستعلام: ${errorMessage}` : `Query failed: ${errorMessage}`);
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'فشل في الاستعلام عن التأمين' : 'Failed to query insurance',
        variant: 'destructive',
      });
    } finally {
      setVisitorLoading(false);
    }
  };

  const handlePremiumSearch = async () => {
    setPremiumError('');
    setPremiumResult(null);

    if (!premiumNumber.trim()) {
      setPremiumError(language === 'ar' ? 'يرجى إدخال رقم الإقامة المميزة' : 'Please enter Premium Residency number');
      return;
    }

    if (!premiumAgreedToTerms) {
      setPremiumError(language === 'ar' ? 'يرجى الموافقة على سياسة الخصوصية' : 'Please agree to the privacy policy');
      return;
    }

    setPremiumLoading(true);
    try {
      const data = await checkInsurance(3, premiumNumber);
      console.log('Premium API Response:', data);
      
      if (data) {
        setPremiumResult({
          isInsured: data.isInsured ?? data.IsInsured ?? Boolean(data.policyNumber) ?? Boolean(data.PolicyNumber),
          policyNumber: data.policyNumber ?? data.PolicyNumber ?? data.policy_number,
          insuranceCompany: data.insuranceCompany ?? data.InsuranceCompany ?? data.insurance_company ?? data.companyName ?? data.CompanyName,
          startDate: data.startDate ?? data.StartDate ?? data.start_date ?? data.policyStartDate ?? data.PolicyStartDate,
          endDate: data.endDate ?? data.EndDate ?? data.end_date ?? data.policyEndDate ?? data.PolicyEndDate,
          policyType: data.policyType ?? data.PolicyType ?? data.policy_type,
          beneficiaryName: data.beneficiaryName ?? data.BeneficiaryName ?? data.beneficiary_name ?? data.name ?? data.Name,
        });
        
        toast({
          title: language === 'ar' ? 'تم الاستعلام بنجاح' : 'Query Successful',
          description: language === 'ar' ? 'تم استرجاع معلومات التأمين' : 'Insurance information retrieved',
        });
      }
    } catch (err: unknown) {
      console.error('Error checking premium insurance:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setPremiumError(language === 'ar' ? `فشل الاستعلام: ${errorMessage}` : `Query failed: ${errorMessage}`);
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'فشل في الاستعلام عن التأمين' : 'Failed to query insurance',
        variant: 'destructive',
      });
    } finally {
      setPremiumLoading(false);
    }
  };

  const serviceFeatures = [
    {
      icon: User,
      titleAr: 'التحقق من التغطية',
      titleEn: 'Coverage Verification',
      descAr: 'التأكد من وجود تغطية تأمينية سارية المفعول',
      descEn: 'Verify active insurance coverage exists'
    },
    {
      icon: CreditCard,
      titleAr: 'معلومات الوثيقة',
      titleEn: 'Policy Information',
      descAr: 'عرض تفاصيل وثيقة التأمين والمنافع المتاحة',
      descEn: 'View insurance policy details and available benefits'
    },
    {
      icon: Calendar,
      titleAr: 'صلاحية التأمين',
      titleEn: 'Insurance Validity',
      descAr: 'معرفة تاريخ بداية ونهاية التغطية التأمينية',
      descEn: 'Know the start and end dates of insurance coverage'
    },
    {
      icon: Building2,
      titleAr: 'شركة التأمين',
      titleEn: 'Insurance Company',
      descAr: 'معرفة شركة التأمين المؤمن لديها',
      descEn: 'Identify the insurance company'
    }
  ];

  const InsuranceResultCard = ({ result, colorClass = 'primary' }: { result: InsuranceResult; colorClass?: string }) => (
    <Card className={`border-${colorClass}/30 bg-${colorClass}/5 mt-4`}>
      <CardHeader className="pb-2">
        <CardTitle className={`text-base flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {result.isInsured ? (
            <CheckCircle2 className={`h-5 w-5 text-green-600`} />
          ) : (
            <AlertTriangle className="h-5 w-5 text-destructive" />
          )}
          {result.isInsured 
            ? (language === 'ar' ? 'مؤمّن' : 'Insured')
            : (language === 'ar' ? 'غير مؤمّن' : 'Not Insured')
          }
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {result.beneficiaryName && (
          <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-sm text-muted-foreground">
              {language === 'ar' ? 'اسم المستفيد' : 'Beneficiary Name'}
            </span>
            <span className="text-sm font-medium">{result.beneficiaryName}</span>
          </div>
        )}
        {result.policyNumber && (
          <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-sm text-muted-foreground">
              {language === 'ar' ? 'رقم الوثيقة' : 'Policy Number'}
            </span>
            <span className="text-sm font-medium">{result.policyNumber}</span>
          </div>
        )}
        {result.insuranceCompany && (
          <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-sm text-muted-foreground">
              {language === 'ar' ? 'شركة التأمين' : 'Insurance Company'}
            </span>
            <span className="text-sm font-medium">{result.insuranceCompany}</span>
          </div>
        )}
        {result.policyType && (
          <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-sm text-muted-foreground">
              {language === 'ar' ? 'نوع الوثيقة' : 'Policy Type'}
            </span>
            <span className="text-sm font-medium">{result.policyType}</span>
          </div>
        )}
        {result.startDate && (
          <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-sm text-muted-foreground">
              {language === 'ar' ? 'تاريخ البداية' : 'Start Date'}
            </span>
            <span className="text-sm font-medium">{result.startDate}</span>
          </div>
        )}
        {result.endDate && (
          <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-sm text-muted-foreground">
              {language === 'ar' ? 'تاريخ الانتهاء' : 'End Date'}
            </span>
            <span className="text-sm font-medium">{result.endDate}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-6 sm:py-8 overflow-hidden gradient-hero">
        <div className="absolute inset-0 chi-pattern" />
        <div className="container mx-auto px-3 sm:px-4 relative">
          <div className={`flex items-center gap-3 mb-3 w-fit ${isRTL ? 'ml-auto' : ''}`}>
            <div className="p-2 rounded-lg bg-primary-foreground/10">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-primary-foreground">
              {language === 'ar' ? 'أهلية العلاج' : 'Treatment Eligibility'}
            </h1>
          </div>
          
          <p className={`text-xs sm:text-sm text-primary-foreground/85 max-w-2xl ${isRTL ? 'text-right ml-auto' : 'text-left'}`}>
            {language === 'ar' 
              ? 'الاستعلام عن معلومات التأمين الصحي والتحقق من أهلية العلاج للمقيمين والزوار'
              : 'Query health insurance information and verify treatment eligibility for residents and visitors'}
          </p>
        </div>
      </section>

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-4xl">
        
        {/* Development Notice */}
        <Alert className="mb-6 border-amber-500/50 bg-amber-50 dark:bg-amber-950/20">
          <Info className="h-4 w-4 text-amber-600" />
          <AlertDescription className={`text-sm text-amber-800 dark:text-amber-200 ${isRTL ? 'text-right mr-2' : 'ml-2'}`}>
            {language === 'ar' 
              ? 'هذه الخدمة قيد التطوير وتتطلب تفعيل الربط مع مجلس الضمان الصحي. للاستعلام عن التأمين حالياً، يرجى زيارة الموقع الرسمي chi.gov.sa'
              : 'This service is under development and requires activation from CHI. To check insurance status, please visit the official website chi.gov.sa'}
          </AlertDescription>
        </Alert>
        
        <Tabs defaultValue="resident" className="w-full">
          <TabsList className={`grid grid-cols-3 w-full mb-6 ${isRTL ? 'direction-rtl' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <TabsTrigger value="resident" className="text-[10px] sm:text-xs gap-1 sm:gap-2 px-1 sm:px-3">
              <Users className="h-3 w-3 sm:h-4 sm:w-4" />
              {language === 'ar' ? 'مقيم / مواطن' : 'Resident'}
            </TabsTrigger>
            <TabsTrigger value="visitor" className="text-[10px] sm:text-xs gap-1 sm:gap-2 px-1 sm:px-3">
              <Plane className="h-3 w-3 sm:h-4 sm:w-4" />
              {language === 'ar' ? 'زائر / سائح' : 'Visitor'}
            </TabsTrigger>
            <TabsTrigger value="premium" className="text-[10px] sm:text-xs gap-1 sm:gap-2 px-1 sm:px-3">
              <Star className="h-3 w-3 sm:h-4 sm:w-4" />
              {language === 'ar' ? 'إقامة مميزة' : 'Premium'}
            </TabsTrigger>
          </TabsList>

          {/* Resident/Citizen Tab */}
          <TabsContent value="resident">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <Card className="border-primary/20">
                  <CardHeader className="pb-3">
                    <CardTitle className={`text-base flex items-center gap-2 w-full ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Search className="h-4 w-4 text-primary" />
                      {language === 'ar' ? 'الاستعلام عن معلومات التأمين' : 'Insurance Information Inquiry'}
                    </CardTitle>
                    <CardDescription className={`text-xs ${isRTL ? 'text-right' : ''}`}>
                      {language === 'ar' 
                        ? 'أدخل رقم الهوية أو الإقامة للاستعلام عن حالة التأمين'
                        : 'Enter ID or Iqama number to query insurance status'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className={`text-sm ${isRTL ? 'text-right block' : ''}`}>
                        {language === 'ar' ? 'رقم بطاقة الأحوال / الإقامة' : 'ID / Iqama Number'}
                        <span className={`text-destructive ${isRTL ? 'mr-1' : 'ml-1'}`}>*</span>
                      </Label>
                      <Input 
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={10}
                        value={idNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          setIdNumber(value);
                          setError('');
                          setResult(null);
                        }}
                        placeholder={language === 'ar' ? 'رقم بطاقة الأحوال / الإقامة' : 'ID / Iqama Number'}
                        className="text-base"
                        dir="ltr"
                      />
                      <p className={`text-[10px] text-muted-foreground ${isRTL ? 'text-right' : ''}`}>
                        {language === 'ar' 
                          ? 'يبدأ رقم الهوية السعودية بـ 1، ورقم الإقامة يبدأ بـ 2'
                          : 'Saudi ID starts with 1, Iqama starts with 2'}
                      </p>
                    </div>

                    <div className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Checkbox 
                        id="terms" 
                        checked={agreedToTerms}
                        onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                      />
                      <Label htmlFor="terms" className={`text-xs leading-relaxed cursor-pointer ${isRTL ? 'text-right' : ''}`}>
                        {language === 'ar' 
                          ? 'أوافق على جمع بياناتي الشخصية ومعالجتها ومشاركتها مع مجلس الضمان الصحي وفقاً لسياسة الخصوصية'
                          : 'I agree to the collection, processing, and sharing of my personal data with CHI according to the privacy policy'}
                      </Label>
                    </div>

                    {error && (
                      <Alert variant="destructive" className="py-2">
                        <XCircle className="h-4 w-4" />
                        <AlertDescription className="text-xs">{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button onClick={handleResidentSearch} className="w-full gap-2" disabled={loading}>
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Search className="h-4 w-4" />
                      )}
                      {language === 'ar' ? 'استعلام' : 'Query'}
                    </Button>
                  </CardContent>
                </Card>

                {result && <InsuranceResultCard result={result} colorClass="primary" />}
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className={`text-base flex items-center gap-2 w-full ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <FileCheck className="h-4 w-4 text-primary" />
                      {language === 'ar' ? 'ما يمكنك معرفته' : 'What You Can Learn'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {serviceFeatures.map((feature, index) => (
                      <div key={index} className={`flex items-start gap-3 p-3 rounded-lg bg-muted/50 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                          <feature.icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className={isRTL ? 'text-right' : ''}>
                          <p className="text-sm font-medium">
                            {language === 'ar' ? feature.titleAr : feature.titleEn}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {language === 'ar' ? feature.descAr : feature.descEn}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Visitor/Tourist/Umrah Tab */}
          <TabsContent value="visitor">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <Card className="border-info/20">
                  <CardHeader className="pb-3">
                    <CardTitle className={`text-base flex items-center gap-2 w-full ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Search className="h-4 w-4 text-info" />
                      {language === 'ar' ? 'الاستعلام عن تأمين زائر، سائح، عمرة' : 'Visitor/Tourist/Umrah Insurance Inquiry'}
                    </CardTitle>
                    <CardDescription className={`text-xs ${isRTL ? 'text-right' : ''}`}>
                      {language === 'ar' 
                        ? 'أدخل رقم الجواز أو التأشيرة أو الحدود للاستعلام'
                        : 'Enter passport, visa, or border number to query'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert className="py-2 border-info/30 bg-info/5">
                      <Info className="h-4 w-4 text-info" />
                      <AlertDescription className="text-xs">
                        {language === 'ar' 
                          ? 'الرجاء استخدام رقم الجواز في حال الاستعلام عن معتمر أو حاج'
                          : 'Please use passport number when querying for Umrah or Hajj pilgrims'}
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-2">
                      <Label className={`text-sm ${isRTL ? 'text-right block' : ''}`}>
                        {language === 'ar' ? 'رقم جواز السفر أو رقم التأشيرة أو رقم الحدود' : 'Passport / Visa / Border Number'}
                        <span className={`text-destructive ${isRTL ? 'mr-1' : 'ml-1'}`}>*</span>
                      </Label>
                      <Input 
                        type="text"
                        value={visitorNumber}
                        onChange={(e) => {
                          setVisitorNumber(e.target.value);
                          setVisitorError('');
                          setVisitorResult(null);
                        }}
                        placeholder={language === 'ar' ? 'رقم جواز السفر أو رقم التأشيرة أو رقم الحدود' : 'Passport / Visa / Border Number'}
                        className="text-base"
                        dir="ltr"
                      />
                    </div>

                    <div className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Checkbox 
                        id="visitor-terms" 
                        checked={visitorAgreedToTerms}
                        onCheckedChange={(checked) => setVisitorAgreedToTerms(checked as boolean)}
                      />
                      <Label htmlFor="visitor-terms" className={`text-xs leading-relaxed cursor-pointer ${isRTL ? 'text-right' : ''}`}>
                        {language === 'ar' 
                          ? 'أوافق على جمع بياناتي الشخصية ومعالجتها ومشاركتها مع مجلس الضمان الصحي وفقاً لسياسة الخصوصية'
                          : 'I agree to the collection, processing, and sharing of my personal data with CHI according to the privacy policy'}
                      </Label>
                    </div>

                    {visitorError && (
                      <Alert variant="destructive" className="py-2">
                        <XCircle className="h-4 w-4" />
                        <AlertDescription className="text-xs">{visitorError}</AlertDescription>
                      </Alert>
                    )}

                    <Button onClick={handleVisitorSearch} className="w-full gap-2 bg-info hover:bg-info/90" disabled={visitorLoading}>
                      {visitorLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Search className="h-4 w-4" />
                      )}
                      {language === 'ar' ? 'استعلام' : 'Query'}
                    </Button>
                  </CardContent>
                </Card>

                {visitorResult && <InsuranceResultCard result={visitorResult} colorClass="info" />}
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className={`text-base flex items-center gap-2 w-full ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Plane className="h-4 w-4 text-info" />
                      {language === 'ar' ? 'أنواع التأمين المشمولة' : 'Covered Insurance Types'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { ar: 'تأمين الزائر', en: 'Visitor Insurance', desc_ar: 'للقادمين بتأشيرة زيارة', desc_en: 'For visitors with visit visa' },
                      { ar: 'تأمين السائح', en: 'Tourist Insurance', desc_ar: 'للقادمين بتأشيرة سياحية', desc_en: 'For tourists with tourist visa' },
                      { ar: 'تأمين العمرة', en: 'Umrah Insurance', desc_ar: 'للقادمين بتأشيرة عمرة', desc_en: 'For Umrah pilgrims' },
                      { ar: 'تأمين الحج', en: 'Hajj Insurance', desc_ar: 'للقادمين بتأشيرة حج', desc_en: 'For Hajj pilgrims' }
                    ].map((type, index) => (
                      <div key={index} className={`flex items-start gap-3 p-3 rounded-lg bg-info/5 border border-info/20 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="p-2 rounded-lg bg-info/10 shrink-0">
                          <Plane className="h-4 w-4 text-info" />
                        </div>
                        <div className={isRTL ? 'text-right' : ''}>
                          <p className="text-sm font-medium">
                            {language === 'ar' ? type.ar : type.en}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {language === 'ar' ? type.desc_ar : type.desc_en}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Alert className="border-warning/30 bg-warning/5">
                  <Info className="h-4 w-4 text-warning" />
                  <AlertDescription className="text-xs">
                    {language === 'ar' 
                      ? 'تغطية تأمين الزائر والسائح والعمرة تشمل الحالات الطارئة (درجات الخطورة 1-3) فقط'
                      : 'Visitor, Tourist, and Umrah insurance covers emergency cases (severity levels 1-3) only'}
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </TabsContent>

          {/* Premium Residency Tab */}
          <TabsContent value="premium">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <Card className="border-amber-500/20">
                  <CardHeader className="pb-3">
                    <CardTitle className={`text-base flex items-center gap-2 w-full ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Search className="h-4 w-4 text-amber-500" />
                      {language === 'ar' ? 'الاستعلام عن تأمين الإقامة المميزة' : 'Premium Residency Insurance Inquiry'}
                    </CardTitle>
                    <CardDescription className={`text-xs ${isRTL ? 'text-right' : ''}`}>
                      {language === 'ar' 
                        ? 'أدخل رقم الإقامة المميزة للاستعلام عن حالة التأمين'
                        : 'Enter Premium Residency number to query insurance status'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert className="py-2 border-amber-500/30 bg-amber-500/5">
                      <Star className="h-4 w-4 text-amber-500" />
                      <AlertDescription className="text-xs">
                        {language === 'ar' 
                          ? 'الإقامة المميزة توفر تغطية صحية شاملة لحاملي تأشيرة الإقامة المميزة'
                          : 'Premium Residency provides comprehensive health coverage for Premium Residency visa holders'}
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-2">
                      <Label className={`text-sm ${isRTL ? 'text-right block' : ''}`}>
                        {language === 'ar' ? 'رقم الإقامة المميزة' : 'Premium Residency Number'}
                        <span className={`text-destructive ${isRTL ? 'mr-1' : 'ml-1'}`}>*</span>
                      </Label>
                      <Input 
                        type="text"
                        value={premiumNumber}
                        onChange={(e) => {
                          setPremiumNumber(e.target.value);
                          setPremiumError('');
                          setPremiumResult(null);
                        }}
                        placeholder={language === 'ar' ? 'رقم الإقامة المميزة' : 'Premium Residency Number'}
                        className="text-base"
                        dir="ltr"
                      />
                    </div>

                    <div className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Checkbox 
                        id="premium-terms" 
                        checked={premiumAgreedToTerms}
                        onCheckedChange={(checked) => setPremiumAgreedToTerms(checked as boolean)}
                      />
                      <Label htmlFor="premium-terms" className={`text-xs leading-relaxed cursor-pointer ${isRTL ? 'text-right' : ''}`}>
                        {language === 'ar' 
                          ? 'أوافق على جمع بياناتي الشخصية ومعالجتها ومشاركتها مع مجلس الضمان الصحي وفقاً لسياسة الخصوصية'
                          : 'I agree to the collection, processing, and sharing of my personal data with CHI according to the privacy policy'}
                      </Label>
                    </div>

                    {premiumError && (
                      <Alert variant="destructive" className="py-2">
                        <XCircle className="h-4 w-4" />
                        <AlertDescription className="text-xs">{premiumError}</AlertDescription>
                      </Alert>
                    )}

                    <Button onClick={handlePremiumSearch} className="w-full gap-2 bg-amber-500 hover:bg-amber-600" disabled={premiumLoading}>
                      {premiumLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Search className="h-4 w-4" />
                      )}
                      {language === 'ar' ? 'استعلام' : 'Query'}
                    </Button>
                  </CardContent>
                </Card>

                {premiumResult && <InsuranceResultCard result={premiumResult} colorClass="amber-500" />}
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className={`text-base flex items-center gap-2 w-full ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Star className="h-4 w-4 text-amber-500" />
                      {language === 'ar' ? 'مميزات تأمين الإقامة المميزة' : 'Premium Residency Insurance Benefits'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { ar: 'تغطية صحية شاملة', en: 'Comprehensive Health Coverage', desc_ar: 'تغطية كاملة للخدمات الصحية الأساسية والمتقدمة', desc_en: 'Full coverage for basic and advanced health services' },
                      { ar: 'شبكة مقدمي خدمة واسعة', en: 'Wide Provider Network', desc_ar: 'الوصول لأفضل المستشفيات والمراكز الطبية', desc_en: 'Access to top hospitals and medical centers' },
                      { ar: 'خدمات طوارئ 24/7', en: '24/7 Emergency Services', desc_ar: 'تغطية حالات الطوارئ على مدار الساعة', desc_en: 'Round-the-clock emergency coverage' },
                      { ar: 'إجراءات مبسطة', en: 'Simplified Procedures', desc_ar: 'إجراءات سريعة ومبسطة للحصول على الخدمات', desc_en: 'Fast and simplified procedures for services' }
                    ].map((benefit, index) => (
                      <div key={index} className={`flex items-start gap-3 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="p-2 rounded-lg bg-amber-500/10 shrink-0">
                          <BadgeCheck className="h-4 w-4 text-amber-500" />
                        </div>
                        <div className={isRTL ? 'text-right' : ''}>
                          <p className="text-sm font-medium">
                            {language === 'ar' ? benefit.ar : benefit.en}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {language === 'ar' ? benefit.desc_ar : benefit.desc_en}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Alert className="border-amber-500/30 bg-amber-500/5">
                  <Globe className="h-4 w-4 text-amber-500" />
                  <AlertDescription className="text-xs">
                    {language === 'ar' 
                      ? 'الإقامة المميزة متاحة للمستثمرين ورواد الأعمال والموهوبين من جميع أنحاء العالم'
                      : 'Premium Residency is available for investors, entrepreneurs, and talented individuals worldwide'}
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* How It Works */}
        <Card className="mt-6">
          <CardHeader className="pb-3">
            <CardTitle className={`text-base ${isRTL ? 'text-right' : ''}`}>
              {language === 'ar' ? 'كيف تعمل خدمة أهلية العلاج؟' : 'How Does Treatment Eligibility Work?'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {[
                { step: 1, ar: 'المريض يزور مقدم الخدمة', en: 'Patient visits provider' },
                { step: 2, ar: 'مقدم الخدمة يستعلم عبر نفيس', en: 'Provider queries via Nafees' },
                { step: 3, ar: 'نفيس يتحقق من شركة التأمين', en: 'Nafees verifies with insurer' },
                { step: 4, ar: 'عرض حالة الأهلية والمنافع', en: 'Display eligibility & benefits' }
              ].map((item) => (
                <div key={item.step} className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                    {item.step}
                  </div>
                  <p className="text-xs">
                    {language === 'ar' ? item.ar : item.en}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Legal Reference */}
        <Card className="mt-6 border-muted">
          <CardContent className="pt-4">
            <p className={`text-xs text-muted-foreground ${isRTL ? 'text-right' : ''}`}>
              {language === 'ar' 
                ? 'المصدر: مجلس الضمان الصحي - chi.gov.sa'
                : 'Source: Council of Health Insurance - chi.gov.sa'}
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default InsuranceEligibility;
