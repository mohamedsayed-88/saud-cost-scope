import { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  ClipboardCheck, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  Building2,
  FileText,
  TrendingUp,
  Clock,
  ExternalLink,
  Info
} from 'lucide-react';
import { trackServiceUsage } from '@/lib/serviceTracking';

interface ComplianceData {
  totalEmployees: number;
  insuredEmployees: number;
  uninsuredEmployees: number;
  dependents: number;
  insuredDependents: number;
  policyStartDate: string;
  policyEndDate: string;
}

const ComplianceReport = () => {
  const { language, isRTL } = useLanguage();
  const [formData, setFormData] = useState<ComplianceData>({
    totalEmployees: 0,
    insuredEmployees: 0,
    uninsuredEmployees: 0,
    dependents: 0,
    insuredDependents: 0,
    policyStartDate: '',
    policyEndDate: '',
  });
  const [showReport, setShowReport] = useState(false);

  const complianceRate = formData.totalEmployees > 0 
    ? Math.round((formData.insuredEmployees / formData.totalEmployees) * 100) 
    : 0;

  const dependentComplianceRate = formData.dependents > 0
    ? Math.round((formData.insuredDependents / formData.dependents) * 100)
    : 0;

  const handleGenerateReport = () => {
    trackServiceUsage({ serviceName: 'compliance_report', serviceCategory: 'calculator' });
    setShowReport(true);
  };

  const getComplianceStatus = (rate: number) => {
    if (rate >= 100) return { status: 'compliant', color: 'text-success', icon: CheckCircle2 };
    if (rate >= 80) return { status: 'partial', color: 'text-warning', icon: AlertTriangle };
    return { status: 'non-compliant', color: 'text-destructive', icon: XCircle };
  };

  const employeeStatus = getComplianceStatus(complianceRate);
  const dependentStatus = getComplianceStatus(dependentComplianceRate);

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      {/* Hero */}
      <section className="relative py-8 overflow-hidden gradient-hero">
        <div className="absolute inset-0 chi-pattern" />
        <div className="container mx-auto px-4 relative">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary-foreground/10">
              <ClipboardCheck className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h1 className="text-2xl sm:text-3xl font-bold text-primary-foreground">
                {isRTL ? 'تقرير الامتثال' : 'Compliance Report'}
              </h1>
              <p className="text-sm text-primary-foreground/70 mt-1">
                {isRTL ? 'تقرير امتثال صاحب العمل للتأمين الصحي الإلزامي' : 'Employer mandatory health insurance compliance report'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-6">
        {/* Integration Notice */}
        <Card className="mb-6 border-info/50 bg-info/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-info shrink-0 mt-0.5" />
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <p className="font-medium text-sm">
                  {isRTL ? 'ربط مستقبلي مع الأنظمة الحكومية' : 'Future Government System Integration'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {isRTL 
                    ? 'سيتم ربط هذه الخدمة مع نظام 700 عبر HIDP وربط API التأمينات الاجتماعية (GOSI) للحصول على بيانات الامتثال تلقائياً'
                    : 'This service will be integrated with System 700 via HIDP and GOSI API to automatically retrieve compliance data'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Building2 className="h-5 w-5 text-primary" />
                {isRTL ? 'بيانات المنشأة' : 'Company Data'}
              </CardTitle>
              <CardDescription className={isRTL ? 'text-right' : ''}>
                {isRTL ? 'أدخل بيانات الموظفين والمعالين' : 'Enter employee and dependent data'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className={isRTL ? 'text-right block' : ''}>
                    {isRTL ? 'إجمالي الموظفين' : 'Total Employees'}
                  </Label>
                  <Input
                    type="number"
                    value={formData.totalEmployees || ''}
                    onChange={(e) => setFormData({ ...formData, totalEmployees: parseInt(e.target.value) || 0 })}
                    className={isRTL ? 'text-right' : ''}
                  />
                </div>
                <div>
                  <Label className={isRTL ? 'text-right block' : ''}>
                    {isRTL ? 'الموظفين المؤمنين' : 'Insured Employees'}
                  </Label>
                  <Input
                    type="number"
                    value={formData.insuredEmployees || ''}
                    onChange={(e) => setFormData({ ...formData, insuredEmployees: parseInt(e.target.value) || 0 })}
                    className={isRTL ? 'text-right' : ''}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className={isRTL ? 'text-right block' : ''}>
                    {isRTL ? 'إجمالي المعالين' : 'Total Dependents'}
                  </Label>
                  <Input
                    type="number"
                    value={formData.dependents || ''}
                    onChange={(e) => setFormData({ ...formData, dependents: parseInt(e.target.value) || 0 })}
                    className={isRTL ? 'text-right' : ''}
                  />
                </div>
                <div>
                  <Label className={isRTL ? 'text-right block' : ''}>
                    {isRTL ? 'المعالين المؤمنين' : 'Insured Dependents'}
                  </Label>
                  <Input
                    type="number"
                    value={formData.insuredDependents || ''}
                    onChange={(e) => setFormData({ ...formData, insuredDependents: parseInt(e.target.value) || 0 })}
                    className={isRTL ? 'text-right' : ''}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className={isRTL ? 'text-right block' : ''}>
                    {isRTL ? 'بداية الوثيقة' : 'Policy Start'}
                  </Label>
                  <Input
                    type="date"
                    value={formData.policyStartDate}
                    onChange={(e) => setFormData({ ...formData, policyStartDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label className={isRTL ? 'text-right block' : ''}>
                    {isRTL ? 'نهاية الوثيقة' : 'Policy End'}
                  </Label>
                  <Input
                    type="date"
                    value={formData.policyEndDate}
                    onChange={(e) => setFormData({ ...formData, policyEndDate: e.target.value })}
                  />
                </div>
              </div>

              <Button onClick={handleGenerateReport} className="w-full">
                <FileText className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {isRTL ? 'إنشاء التقرير' : 'Generate Report'}
              </Button>
            </CardContent>
          </Card>

          {/* Report */}
          {showReport && (
            <Card>
              <CardHeader className="bg-primary/5 border-b">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  {isRTL ? 'نتائج التقرير' : 'Report Results'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-6">
                {/* Employee Compliance */}
                <div>
                  <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-sm font-medium">
                      {isRTL ? 'امتثال الموظفين' : 'Employee Compliance'}
                    </span>
                    <Badge className={employeeStatus.color}>
                      <employeeStatus.icon className="h-3 w-3 mr-1" />
                      {complianceRate}%
                    </Badge>
                  </div>
                  <Progress value={complianceRate} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {formData.insuredEmployees} / {formData.totalEmployees} {isRTL ? 'موظف مؤمن' : 'employees insured'}
                  </p>
                </div>

                {/* Dependent Compliance */}
                <div>
                  <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-sm font-medium">
                      {isRTL ? 'امتثال المعالين' : 'Dependent Compliance'}
                    </span>
                    <Badge className={dependentStatus.color}>
                      <dependentStatus.icon className="h-3 w-3 mr-1" />
                      {dependentComplianceRate}%
                    </Badge>
                  </div>
                  <Progress value={dependentComplianceRate} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {formData.insuredDependents} / {formData.dependents} {isRTL ? 'معال مؤمن' : 'dependents insured'}
                  </p>
                </div>

                {/* Violations */}
                {complianceRate < 100 && (
                  <Card className="border-destructive/50 bg-destructive/5">
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
                        <div className={isRTL ? 'text-right' : 'text-left'}>
                          <p className="font-medium text-sm text-destructive">
                            {isRTL ? 'مخالفات محتملة' : 'Potential Violations'}
                          </p>
                          <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                            <li>• {formData.totalEmployees - formData.insuredEmployees} {isRTL ? 'موظف غير مؤمن' : 'uninsured employees'}</li>
                            {formData.dependents - formData.insuredDependents > 0 && (
                              <li>• {formData.dependents - formData.insuredDependents} {isRTL ? 'معال غير مؤمن' : 'uninsured dependents'}</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Actions */}
                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/fines-calculator" className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      {isRTL ? 'احسب الغرامات المحتملة' : 'Calculate Potential Fines'}
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default ComplianceReport;
