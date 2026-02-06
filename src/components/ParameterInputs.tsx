import { Users, Wallet } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, formatNumber } from '@/data/healthServices';
import { useLanguage } from '@/contexts/LanguageContext';

interface ParameterInputsProps {
  memberCount: number;
  setMemberCount: (count: number) => void;
  basePremium: number;
  setBasePremium: (premium: number) => void;
}

export function ParameterInputs({
  memberCount,
  setMemberCount,
  basePremium,
  setBasePremium
}: ParameterInputsProps) {
  const { t, isRTL } = useLanguage();

  return (
    <Card className="border-border shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className={`text-sm font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
          {t('params.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className={`space-y-5 sm:space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
        {/* Member Count */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-primary" />
              {t('params.totalMembers')}
            </Label>
            <span className="text-sm font-mono font-medium text-foreground">
              {formatNumber(memberCount)}
            </span>
          </div>
          <Slider
            value={[memberCount]}
            onValueChange={([value]) => setMemberCount(value)}
            min={100}
            max={100000}
            step={100}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>100</span>
            <span>100,000</span>
          </div>
        </div>

        {/* Base Premium */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2 text-sm">
              <Wallet className="h-4 w-4 text-primary" />
              {t('params.basePremium')}
            </Label>
            <span className="text-sm font-mono font-medium text-foreground">
              {formatCurrency(basePremium)}
            </span>
          </div>
          <Slider
            value={[basePremium]}
            onValueChange={([value]) => setBasePremium(value)}
            min={1000}
            max={20000}
            step={100}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>SAR 1,000</span>
            <span>SAR 20,000</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-3 border-t border-border">
          <div className="text-center p-2 sm:p-3 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-[10px] sm:text-xs text-muted-foreground">{t('params.poolValue')}</p>
            <p className="text-sm sm:text-lg font-mono font-bold text-primary mt-1">
              {formatCurrency(memberCount * basePremium)}
            </p>
          </div>
          <div className="text-center p-2 sm:p-3 rounded-lg bg-secondary border border-border">
            <p className="text-[10px] sm:text-xs text-muted-foreground">{t('params.monthlyMember')}</p>
            <p className="text-sm sm:text-lg font-mono font-bold text-foreground mt-1">
              {formatCurrency(basePremium / 12)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
