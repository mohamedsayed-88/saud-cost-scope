import { useMemo } from 'react';
import { TrendingUp, DollarSign, AlertTriangle, CheckCircle, Info, Calculator } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  type HealthService, 
  calculatePremiumImpact, 
  formatCurrency, 
  formatNumber 
} from '@/data/healthServices';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface PremiumResultsProps {
  service: HealthService;
  memberCount: number;
  basePremium: number;
}

export function PremiumResults({ service, memberCount, basePremium }: PremiumResultsProps) {
  const { t, language, isRTL } = useLanguage();
  
  const calculation = useMemo(() => {
    return calculatePremiumImpact(service, memberCount, basePremium);
  }, [service, memberCount, basePremium]);

  const impactLevel = calculation.totalImpactPercent < 5 ? 'low' : 
                      calculation.totalImpactPercent < 15 ? 'medium' : 'high';

  const impactColors = {
    low: 'text-success',
    medium: 'text-warning',
    high: 'text-destructive'
  };

  const totalAnnualCost = (memberCount / 1000) * calculation.annualCostPerThousand;

  const getImpactLabel = () => {
    const labels = {
      low: t('impact.low'),
      medium: t('impact.medium'),
      high: t('impact.high')
    };
    return labels[impactLevel];
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Main Impact Card */}
      <Card className="border-primary/30 shadow-glow overflow-hidden">
        <div className="h-1 gradient-primary" />
        <CardHeader className="pb-2">
          <div className={`flex items-center justify-between flex-wrap gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <CardTitle className="text-base sm:text-lg font-semibold">
              {t('results.title')}
            </CardTitle>
            <Badge 
              variant="outline" 
              className={cn(
                "text-xs sm:text-sm font-mono",
                service.dataSource === 'saudi' 
                  ? "border-primary/50 bg-primary/10 text-primary" 
                  : "border-info/50 bg-info/10 text-info"
              )}
            >
              {service.dataSource === 'saudi' 
                ? (language === 'ar' ? '🇸🇦 بيانات سعودية' : '🇸🇦 Saudi Data')
                : `🌐 ${service.sourceCountry}`}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          {/* Primary Metrics */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className={`flex items-center gap-2 text-muted-foreground mb-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                <span className="text-[10px] sm:text-xs uppercase tracking-wider">{t('results.premiumIncrease')}</span>
              </div>
              <p className={cn("text-2xl sm:text-3xl font-bold font-mono", impactColors[impactLevel])}>
                +{calculation.totalImpactPercent}%
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                {formatCurrency(calculation.additionalPremiumPerMember)}{t('results.perMemberYear')}
              </p>
            </div>
            
            <div className="p-3 sm:p-4 rounded-lg bg-secondary border border-border">
              <div className={`flex items-center gap-2 text-muted-foreground mb-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                <span className="text-[10px] sm:text-xs uppercase tracking-wider">{t('results.totalAnnualCost')}</span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold font-mono text-primary">
                {formatCurrency(totalAnnualCost)}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                {t('results.forMembers').replace('{count}', formatNumber(memberCount))}
              </p>
            </div>
          </div>

          {/* Impact Visualization */}
          <div className="space-y-2">
            <div className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-muted-foreground">{t('results.impactLevel')}</span>
              <span className={cn("font-medium", impactColors[impactLevel])}>
                {getImpactLabel()}
              </span>
            </div>
            <Progress 
              value={Math.min(calculation.totalImpactPercent * 3, 100)} 
              className="h-2"
            />
          </div>

          {/* New Premium Breakdown */}
          <div className="p-3 sm:p-4 rounded-lg border border-border bg-card">
            <p className="text-xs sm:text-sm text-muted-foreground mb-2">{t('results.newPremium')}</p>
            <div className={`flex items-end gap-2 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-muted-foreground line-through text-base sm:text-lg">
                {formatCurrency(basePremium)}
              </span>
              <span className="text-xl sm:text-2xl font-bold text-primary">
                {formatCurrency(basePremium + calculation.additionalPremiumPerMember)}
              </span>
              <span className="text-xs sm:text-sm text-muted-foreground">{t('results.perMemberYear')}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Breakdown */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Actuarial Assumptions */}
        <Card className="border-border shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className={`text-sm font-medium flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Calculator className="h-4 w-4 text-primary" />
              {t('actuarial.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-muted-foreground">{t('actuarial.prevalence')}</span>
              <span className="font-mono font-medium">{service.prevalencePerThousand}/1,000</span>
            </div>
            <div className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-muted-foreground">{t('actuarial.treatmentCost')}</span>
              <span className="font-mono font-medium">{formatCurrency(service.averageTreatmentCostSAR)}</span>
            </div>
            <div className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-muted-foreground">{t('actuarial.expectedClaims')}</span>
              <span className="font-mono font-medium">{calculation.expectedClaimsPerThousand}/1,000</span>
            </div>
            <div className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Tooltip>
                <TooltipTrigger className={`text-muted-foreground flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {t('actuarial.riskLoading')} <Info className="h-3 w-3" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Additional factor to account for claim volatility</p>
                </TooltipContent>
              </Tooltip>
              <span className="font-mono font-medium">×{calculation.riskLoadingFactor}</span>
            </div>
            <div className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-muted-foreground">{t('actuarial.adminLoading')}</span>
              <span className="font-mono font-medium">{calculation.adminLoadingPercent}%</span>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="border-border shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className={`text-sm font-medium flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {impactLevel === 'high' ? (
                <AlertTriangle className="h-4 w-4 text-destructive" />
              ) : (
                <CheckCircle className="h-4 w-4 text-success" />
              )}
              {t('rec.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {impactLevel === 'high' && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-destructive font-medium">{t('rec.highImpact')}</p>
                <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
                  {t('rec.highDesc')}
                </p>
              </div>
            )}
            {impactLevel === 'medium' && (
              <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                <p className="text-warning font-medium">{t('rec.mediumImpact')}</p>
                <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
                  {t('rec.mediumDesc')}
                </p>
              </div>
            )}
            {impactLevel === 'low' && (
              <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                <p className="text-success font-medium">{t('rec.lowImpact')}</p>
                <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
                  {t('rec.lowDesc')}
                </p>
              </div>
            )}
            
            {service.dataSource !== 'saudi' && (
              <div className="p-3 rounded-lg bg-info/10 border border-info/20">
                <p className="text-info font-medium">{t('rec.regionalNote')}</p>
                <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
                  {t('rec.regionalDesc').replace('{country}', service.sourceCountry || '')}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Service Details */}
      <Card className="border-border shadow-md">
        <CardHeader className="pb-3">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <CardTitle className="text-sm font-medium">{t('details.title')}</CardTitle>
            <Badge variant="outline" className="font-mono text-xs border-primary/30">{service.icd10Code}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{t('details.englishName')}</p>
              <p className="font-medium text-foreground">{service.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">{t('details.arabicName')}</p>
              <p className="font-medium font-arabic text-primary" dir="rtl">{service.nameAr}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-1">{t('details.description')}</p>
            <p className="text-sm text-foreground">{service.description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
