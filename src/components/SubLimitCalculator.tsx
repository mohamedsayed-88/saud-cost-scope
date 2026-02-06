import { useState, useMemo } from 'react';
import { Sliders, TrendingUp, TrendingDown, Minus, Calculator, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { chiSubLimits, subLimitCategories, type SubLimit } from '@/data/chiExclusions';
import { calculateSubLimitImpact, calculatePortfolioImpact, type SubLimitChange } from '@/data/sublimitCalculator';
import { formatCurrency, formatNumber } from '@/data/healthServices';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface SubLimitCalculatorProps {
  memberCount: number;
  basePremium: number;
}

interface SubLimitState {
  [key: string]: {
    limit: number;
    copay: number;
  };
}

const categoryTranslations: Record<string, string> = {
  'All Categories': 'جميع الفئات',
  'Overall': 'إجمالي',
  'Maternity': 'الأمومة',
  'Dental': 'الأسنان',
  'Vision': 'البصريات',
  'Renal': 'الكلى',
  'Transplant': 'الزراعة',
  'Mental Health': 'الصحة النفسية',
  'Medical Devices': 'الأجهزة الطبية',
  'Cardiovascular': 'القلب',
  'Neurological': 'العصبية',
  'Developmental': 'التطورية',
  'Pediatric': 'الأطفال',
  'Rehabilitation': 'التأهيل',
  'Metabolic': 'الأيض',
  'Family Planning': 'تنظيم الأسرة',
  'Inpatient': 'الإقامة',
  'Other': 'أخرى',
};

export function SubLimitCalculator({ memberCount, basePremium }: SubLimitCalculatorProps) {
  const { language, isRTL } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  
  // Initialize state with current CHI limits
  const [subLimitStates, setSubLimitStates] = useState<SubLimitState>(() => {
    const initial: SubLimitState = {};
    chiSubLimits.forEach(sl => {
      initial[sl.id] = { limit: sl.currentLimitSAR, copay: sl.copaymentPercent };
    });
    return initial;
  });

  const filteredSubLimits = useMemo(() => {
    return chiSubLimits.filter(sl => 
      selectedCategory === 'All Categories' || sl.category === selectedCategory
    );
  }, [selectedCategory]);

  const changes: SubLimitChange[] = useMemo(() => {
    return chiSubLimits
      .filter(sl => {
        const state = subLimitStates[sl.id];
        return state.limit !== sl.currentLimitSAR || state.copay !== sl.copaymentPercent;
      })
      .map(sl => ({
        subLimit: sl,
        newLimitSAR: subLimitStates[sl.id].limit,
        newCopaymentPercent: subLimitStates[sl.id].copay
      }));
  }, [subLimitStates]);

  const portfolioImpact = useMemo(() => {
    if (changes.length === 0) return null;
    return calculatePortfolioImpact(changes, memberCount, basePremium);
  }, [changes, memberCount, basePremium]);

  const updateLimit = (id: string, limit: number) => {
    setSubLimitStates(prev => ({
      ...prev,
      [id]: { ...prev[id], limit }
    }));
  };

  const updateCopay = (id: string, copay: number) => {
    setSubLimitStates(prev => ({
      ...prev,
      [id]: { ...prev[id], copay }
    }));
  };

  const resetAll = () => {
    const reset: SubLimitState = {};
    chiSubLimits.forEach(sl => {
      reset[sl.id] = { limit: sl.currentLimitSAR, copay: sl.copaymentPercent };
    });
    setSubLimitStates(reset);
  };

  const getCategoryLabel = (cat: string) => language === 'ar' ? categoryTranslations[cat] || cat : cat;

  const getDirectionIcon = (direction: string) => {
    switch (direction) {
      case 'increase': return <TrendingUp className="h-4 w-4 text-destructive" />;
      case 'decrease': return <TrendingDown className="h-4 w-4 text-success" />;
      default: return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Sliders className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">
            {language === 'ar' ? 'محاكي الحدود الفرعية' : 'Sub-Limit Simulator'}
          </h3>
          <Badge variant="secondary" className="text-xs">
            {changes.length} {language === 'ar' ? 'تغيير' : 'changes'}
          </Badge>
        </div>
        {changes.length > 0 && (
          <Button variant="outline" size="sm" onClick={resetAll} className="gap-1">
            <RefreshCw className="h-3 w-3" />
            {language === 'ar' ? 'إعادة تعيين' : 'Reset'}
          </Button>
        )}
      </div>

      {/* Category Filter */}
      <div className={`flex gap-2 overflow-x-auto pb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
        {subLimitCategories.slice(0, 6).map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="whitespace-nowrap text-xs"
          >
            {getCategoryLabel(category)}
          </Button>
        ))}
      </div>

      {/* Portfolio Impact Summary */}
      {portfolioImpact && (
        <Card className={cn(
          "border-2",
          portfolioImpact.totalPremiumImpactPercent > 0 
            ? "border-destructive/30 bg-destructive/5" 
            : "border-success/30 bg-success/5"
        )}>
          <CardHeader className="pb-2">
            <CardTitle className={`text-sm flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Calculator className="h-4 w-4" />
              {language === 'ar' ? 'إجمالي تأثير المحفظة' : 'Total Portfolio Impact'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-2 rounded bg-background">
                <p className="text-[10px] text-muted-foreground">
                  {language === 'ar' ? 'تغيير القسط' : 'Premium Change'}
                </p>
                <p className={cn(
                  "font-mono font-bold text-lg",
                  portfolioImpact.totalPremiumImpactPercent > 0 ? "text-destructive" : "text-success"
                )}>
                  {portfolioImpact.totalPremiumImpactPercent > 0 ? '+' : ''}{portfolioImpact.totalPremiumImpactPercent}%
                </p>
              </div>
              <div className="p-2 rounded bg-background">
                <p className="text-[10px] text-muted-foreground">
                  {language === 'ar' ? 'لكل عضو' : 'Per Member'}
                </p>
                <p className={cn(
                  "font-mono font-bold",
                  portfolioImpact.totalPremiumImpactSAR > 0 ? "text-destructive" : "text-success"
                )}>
                  {portfolioImpact.totalPremiumImpactSAR > 0 ? '+' : ''}{formatCurrency(portfolioImpact.totalPremiumImpactSAR)}
                </p>
              </div>
              <div className="p-2 rounded bg-background">
                <p className="text-[10px] text-muted-foreground">
                  {language === 'ar' ? 'القسط الجديد' : 'New Premium'}
                </p>
                <p className="font-mono font-bold text-primary">
                  {formatCurrency(portfolioImpact.newPremiumPerMember)}
                </p>
              </div>
              <div className="p-2 rounded bg-background">
                <p className="text-[10px] text-muted-foreground">
                  {language === 'ar' ? 'التكلفة الإجمالية' : 'Total Cost'}
                </p>
                <p className="font-mono font-bold text-foreground text-sm">
                  {formatCurrency(portfolioImpact.totalPremiumImpactSAR * memberCount)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sub-Limits List */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
        {filteredSubLimits.map((sl) => {
          const state = subLimitStates[sl.id];
          const hasChanged = state.limit !== sl.currentLimitSAR || state.copay !== sl.copaymentPercent;
          const impact = hasChanged 
            ? calculateSubLimitImpact({ subLimit: sl, newLimitSAR: state.limit, newCopaymentPercent: state.copay }, memberCount, basePremium)
            : null;

          return (
            <Card key={sl.id} className={cn(
              "transition-all",
              hasChanged && "border-primary/50 bg-primary/5"
            )}>
              <CardContent className="p-3 sm:p-4 space-y-3">
                {/* Header */}
                <div className={`flex items-start justify-between gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div>
                    <h4 className="font-medium text-sm text-foreground">
                      {language === 'ar' ? sl.benefitAr : sl.benefit}
                    </h4>
                    <p className="text-[10px] text-muted-foreground">{sl.description}</p>
                  </div>
                  <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Badge variant="secondary" className="text-[10px]">
                      {getCategoryLabel(sl.category)}
                    </Badge>
                    {impact && getDirectionIcon(impact.direction)}
                  </div>
                </div>

                {/* Limit Slider */}
                <div className="space-y-2">
                  <div className={`flex justify-between text-xs ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Label className="text-muted-foreground">
                      {language === 'ar' ? 'الحد' : 'Limit'}: {formatCurrency(state.limit)}
                    </Label>
                    <span className="text-muted-foreground text-[10px]">
                      {language === 'ar' ? 'الأصلي' : 'Original'}: {formatCurrency(sl.currentLimitSAR)}
                    </span>
                  </div>
                  <Slider
                    value={[state.limit]}
                    onValueChange={([v]) => updateLimit(sl.id, v)}
                    min={sl.minLimitSAR}
                    max={sl.maxLimitSAR}
                    step={sl.maxLimitSAR > 10000 ? 5000 : 100}
                    className="w-full"
                  />
                </div>

                {/* Copay Slider (if applicable) */}
                {sl.copaymentPercent > 0 && (
                  <div className="space-y-2">
                    <div className={`flex justify-between text-xs ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Label className="text-muted-foreground">
                        {language === 'ar' ? 'نسبة التحمل' : 'Copay'}: {state.copay}%
                      </Label>
                      <span className="text-muted-foreground text-[10px]">
                        {language === 'ar' ? 'الأصلي' : 'Original'}: {sl.copaymentPercent}%
                      </span>
                    </div>
                    <Slider
                      value={[state.copay]}
                      onValueChange={([v]) => updateCopay(sl.id, v)}
                      min={0}
                      max={50}
                      step={5}
                      className="w-full"
                    />
                  </div>
                )}

                {/* Impact Display */}
                {impact && (
                  <div className={cn(
                    "p-2 rounded text-xs",
                    impact.direction === 'increase' ? "bg-destructive/10" : 
                    impact.direction === 'decrease' ? "bg-success/10" : "bg-muted"
                  )}>
                    <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-muted-foreground">
                        {language === 'ar' ? 'تأثير القسط' : 'Premium Impact'}
                      </span>
                      <span className={cn(
                        "font-mono font-medium",
                        impact.direction === 'increase' ? "text-destructive" : 
                        impact.direction === 'decrease' ? "text-success" : "text-muted-foreground"
                      )}>
                        {impact.premiumImpactSAR > 0 ? '+' : ''}{impact.premiumImpactPercent}% ({formatCurrency(impact.premiumImpactSAR)})
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
