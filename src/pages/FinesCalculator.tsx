import { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  Calculator, AlertTriangle, Info, DollarSign, Users, 
  Calendar, FileWarning, Building2
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import saudiRiyalSymbol from '@/assets/saudi-riyal-symbol.png';

// Saudi Riyal Symbol Component
const SARSymbol = ({ className = "h-4 w-4" }: { className?: string }) => (
  <img src={saudiRiyalSymbol} alt="SAR" className={`inline-block ${className}`} />
);

interface CalculationResult {
  premiumsDue: number;
  fineAmount: number;
}

const FinesCalculator = () => {
  const { language, isRTL } = useLanguage();
  
  const [hasPolicy, setHasPolicy] = useState<'yes' | 'no' | null>(null);
  const [totalEmployees, setTotalEmployees] = useState<number>(0);
  const [insuredEmployees, setInsuredEmployees] = useState<number>(0);
  const [uninsuredEmployees, setUninsuredEmployees] = useState<number>(0);
  const [uninsuredDependents, setUninsuredDependents] = useState<number>(0);
  const [uninsuredFemales, setUninsuredFemales] = useState<number>(0);
  const [uncoveredDays, setUncoveredDays] = useState<number>(0);
  const [lowestPolicyPrice, setLowestPolicyPrice] = useState<number>(1500);
  const [avgMalePrice, setAvgMalePrice] = useState<number>(2000);
  const [avgFemalePrice, setAvgFemalePrice] = useState<number>(2500);
  
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateFines = () => {
    // Calculate total uninsured individuals
    const totalUninsured = uninsuredEmployees + uninsuredDependents;
    const maleUninsured = uninsuredEmployees - uninsuredFemales;
    
    // Calculate premiums due based on uncovered days
    const dailyRate = lowestPolicyPrice / 365;
    const malePremiumsDue = maleUninsured * dailyRate * uncoveredDays;
    const femalePremiumsDue = uninsuredFemales * (avgFemalePrice / 365) * uncoveredDays;
    const dependentPremiumsDue = uninsuredDependents * dailyRate * uncoveredDays;
    
    const premiumsDue = Math.round(malePremiumsDue + femalePremiumsDue + dependentPremiumsDue);
    
    // Fine is up to 100% of annual subscription per individual (Article 14)
    // Using conservative estimate of 50% of annual premium as fine
    const finePerMale = avgMalePrice * 0.5;
    const finePerFemale = avgFemalePrice * 0.5;
    const finePerDependent = lowestPolicyPrice * 0.5;
    
    const fineAmount = Math.round(
      (maleUninsured * finePerMale) + 
      (uninsuredFemales * finePerFemale) + 
      (uninsuredDependents * finePerDependent)
    );
    
    setResult({
      premiumsDue,
      fineAmount
    });
  };

  const resetCalculator = () => {
    setHasPolicy(null);
    setTotalEmployees(0);
    setInsuredEmployees(0);
    setUninsuredEmployees(0);
    setUninsuredDependents(0);
    setUninsuredFemales(0);
    setUncoveredDays(0);
    setResult(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA').format(amount);
  };

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-6 sm:py-8 overflow-hidden gradient-hero">
        <div className="absolute inset-0 chi-pattern" />
        <div className="container mx-auto px-3 sm:px-4 relative">
          <div className={`flex items-center gap-3 mb-3 w-fit ${isRTL ? 'ml-auto' : ''}`}>
            <div className="p-2 rounded-lg bg-primary-foreground/10">
              <Calculator className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-primary-foreground">
              {language === 'ar' ? 'حاسبة الغرامات' : 'Fines Calculator'}
            </h1>
          </div>
          
          <p className={`text-xs sm:text-sm text-primary-foreground/85 max-w-2xl ${isRTL ? 'text-right ml-auto' : 'text-left'}`}>
            {language === 'ar' 
              ? 'احسب الأقساط واجبة السداد والغرامات المالية المترتبة على عدم الالتزام بنظام الضمان الصحي التعاوني'
              : 'Calculate premiums due and fines for non-compliance with the Cooperative Health Insurance System'}
          </p>
        </div>
      </section>

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-4xl">
        
        {/* Service Explanation */}
        <Card className="mb-4 border-info/30 bg-info/5">
          <CardContent className="py-3 px-3 sm:px-4">
            <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="p-2 rounded-lg bg-info/20 shrink-0">
                <Info className="h-4 w-4 text-info" />
              </div>
              <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                <h3 className="font-semibold text-sm mb-1">
                  {language === 'ar' ? 'ما هي هذه الخدمة؟' : 'What is this service?'}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {language === 'ar' 
                    ? 'حاسبة الغرامات مخصصة لحساب غرامة صاحب العمل غير الملتزم بالتأمين الصحي الإلزامي للعاملين لديه ولمعاليهم (الزوج/الزوجة والأبناء). تساعدك هذه الأداة على معرفة الأقساط المستحقة والغرامات المالية المترتبة وفقاً لنظام الضمان الصحي التعاوني.'
                    : 'The Fines Calculator is designed to calculate penalties for employers who do not comply with mandatory health insurance for their employees and dependents (spouse and children). This tool helps you understand the premiums due and financial penalties according to the Cooperative Health Insurance Law.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legal Notice */}
        <Alert className="mb-6 border-warning/50 bg-warning/10">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <AlertDescription className="text-xs">
            {language === 'ar' 
              ? 'يلتزم صاحب العمل بموجب المادة (14) من نظام الضمان الصحي التعاوني بدفع جميع الأقساط الواجبة، إضافة إلى غرامة مالية لا تزيد عن قيمة الاشتراك السنوي عن كل فرد، مع جواز حرمانه من استقدام العمال.'
              : 'According to Article 14 of the Cooperative Health Insurance Law, employers must pay all due premiums plus a fine not exceeding the annual subscription per individual, with possible prohibition from recruiting workers.'}
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Policy Status */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <FileWarning className="h-4 w-4 text-primary" />
                  {language === 'ar' ? 'هل يوجد لدى صاحب العمل وثيقة تأمين؟' : 'Does the employer have an insurance policy?'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={hasPolicy || ''} 
                  onValueChange={(value) => setHasPolicy(value as 'yes' | 'no')}
                  className="flex gap-6"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes" className="text-sm cursor-pointer">
                      {language === 'ar' ? 'نعم' : 'Yes'}
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no" className="text-sm cursor-pointer">
                      {language === 'ar' ? 'لا' : 'No'}
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {hasPolicy && (
              <>
                {/* Employee Numbers */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      {language === 'ar' ? 'بيانات العاملين' : 'Employee Data'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs">{language === 'ar' ? 'إجمالي عدد العاملين' : 'Total Employees'}</Label>
                        <Input 
                          type="number" 
                          min="0"
                          value={totalEmployees || ''} 
                          onChange={(e) => setTotalEmployees(parseInt(e.target.value) || 0)}
                          className="text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">{language === 'ar' ? 'العاملين المؤمن عليهم' : 'Insured Employees'}</Label>
                        <Input 
                          type="number" 
                          min="0"
                          value={insuredEmployees || ''} 
                          onChange={(e) => setInsuredEmployees(parseInt(e.target.value) || 0)}
                          className="text-sm"
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs">{language === 'ar' ? 'العاملين غير المؤمن عليهم' : 'Uninsured Employees'}</Label>
                        <Input 
                          type="number" 
                          min="0"
                          value={uninsuredEmployees || ''} 
                          onChange={(e) => setUninsuredEmployees(parseInt(e.target.value) || 0)}
                          className="text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">{language === 'ar' ? 'المعالين غير المؤمن عليهم' : 'Uninsured Dependents'}</Label>
                        <Input 
                          type="number" 
                          min="0"
                          value={uninsuredDependents || ''} 
                          onChange={(e) => setUninsuredDependents(parseInt(e.target.value) || 0)}
                          className="text-sm"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-xs">{language === 'ar' ? 'العاملين الإناث غير المؤمن عليهم' : 'Uninsured Female Employees'}</Label>
                      <Input 
                        type="number" 
                        min="0"
                        value={uninsuredFemales || ''} 
                        onChange={(e) => setUninsuredFemales(parseInt(e.target.value) || 0)}
                        className="text-sm"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Coverage Period */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      {language === 'ar' ? 'فترة عدم التغطية' : 'Uncovered Period'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label className="text-xs">{language === 'ar' ? 'عدد الأيام غير المغطاة بالتأمين' : 'Days Without Insurance Coverage'}</Label>
                      <Input 
                        type="number" 
                        min="0"
                        max="365"
                        value={uncoveredDays || ''} 
                        onChange={(e) => setUncoveredDays(parseInt(e.target.value) || 0)}
                        className="text-sm"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Policy Prices */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      {language === 'ar' ? 'أسعار وثائق التأمين' : 'Insurance Policy Prices'}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {language === 'ar' ? 'القيم الافتراضية تقريبية - يمكنك تعديلها' : 'Default values are estimates - you can modify them'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-xs flex items-center gap-1">
                        {language === 'ar' ? 'قيمة أقل سعر في وثيقة التأمين' : 'Lowest Policy Price'}
                        <SARSymbol className="h-3 w-3 opacity-70" />
                      </Label>
                      <Input 
                        type="number" 
                        min="0"
                        value={lowestPolicyPrice || ''} 
                        onChange={(e) => setLowestPolicyPrice(parseInt(e.target.value) || 0)}
                        className="text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs flex items-center gap-1">
                          {language === 'ar' ? 'متوسط سعر وثيقة الذكور' : 'Avg Male Policy Price'}
                          <SARSymbol className="h-3 w-3 opacity-70" />
                        </Label>
                        <Input 
                          type="number" 
                          min="0"
                          value={avgMalePrice || ''} 
                          onChange={(e) => setAvgMalePrice(parseInt(e.target.value) || 0)}
                          className="text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs flex items-center gap-1">
                          {language === 'ar' ? 'متوسط سعر وثيقة الإناث' : 'Avg Female Policy Price'}
                          <SARSymbol className="h-3 w-3 opacity-70" />
                        </Label>
                        <Input 
                          type="number" 
                          min="0"
                          value={avgFemalePrice || ''} 
                          onChange={(e) => setAvgFemalePrice(parseInt(e.target.value) || 0)}
                          className="text-sm"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Calculate Button */}
                <div className="flex gap-3">
                  <Button onClick={calculateFines} className="flex-1">
                    <Calculator className="h-4 w-4 ml-2" />
                    {language === 'ar' ? 'احسب النتيجة' : 'Calculate Result'}
                  </Button>
                  <Button variant="outline" onClick={resetCalculator}>
                    {language === 'ar' ? 'إعادة تعيين' : 'Reset'}
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            <Card className="border-primary/30 bg-primary/5 sticky top-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  {language === 'ar' ? 'نتائج الحساب' : 'Calculation Results'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-info/10 border border-info/30 text-center">
                  <p className="text-xs text-muted-foreground mb-1">
                    {language === 'ar' ? 'الأقساط واجبة السداد' : 'Premiums Due'}
                  </p>
                  <p className="text-2xl font-bold text-info">
                    {formatCurrency(result?.premiumsDue || 0)}
                  </p>
                  <div className="flex items-center justify-center gap-1">
                    <SARSymbol className="h-3.5 w-3.5 opacity-60" />
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-center">
                  <p className="text-xs text-muted-foreground mb-1">
                    {language === 'ar' ? 'مقدار الغرامة المالية' : 'Fine Amount'}
                  </p>
                  <p className="text-2xl font-bold text-destructive">
                    {formatCurrency(result?.fineAmount || 0)}
                  </p>
                  <div className="flex items-center justify-center gap-1">
                    <SARSymbol className="h-3.5 w-3.5 opacity-60" />
                  </div>
                </div>

                {result && (result.premiumsDue > 0 || result.fineAmount > 0) && (
                  <div className="p-4 rounded-lg bg-warning/10 border border-warning/30 text-center">
                    <p className="text-xs text-muted-foreground mb-1">
                      {language === 'ar' ? 'الإجمالي المستحق' : 'Total Due'}
                    </p>
                    <p className="text-2xl font-bold text-warning">
                      {formatCurrency((result?.premiumsDue || 0) + (result?.fineAmount || 0))}
                    </p>
                    <div className="flex items-center justify-center gap-1">
                      <SARSymbol className="h-3.5 w-3.5 opacity-60" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="border-muted">
              <CardContent className="pt-4">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {language === 'ar' 
                      ? 'هذه الحاسبة تقدم تقديراً تقريبياً للغرامات. القيم الفعلية قد تختلف بناءً على قرار لجنة المخالفات في مجلس الضمان الصحي.'
                      : 'This calculator provides an estimate. Actual values may vary based on the CHI Violations Committee decision.'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Legal Reference */}
        <Card className="mt-6 border-muted">
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              {language === 'ar' 
                ? 'المرجع: المادة (14) من نظام الضمان الصحي التعاوني الصادر بالمرسوم الملكي رقم (م/10) وتاريخ 1420/05/01هـ'
                : 'Reference: Article 14 of the Cooperative Health Insurance Law issued by Royal Decree No. M/10 dated 01/05/1420H'}
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default FinesCalculator;
