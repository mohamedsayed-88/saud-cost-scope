import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type HealthService, calculatePremiumImpact, formatCurrency } from '@/data/healthServices';
import { useLanguage } from '@/contexts/LanguageContext';

interface CostBreakdownChartProps {
  service: HealthService;
  memberCount: number;
  basePremium: number;
}

export function CostBreakdownChart({ service, memberCount, basePremium }: CostBreakdownChartProps) {
  const { t, isRTL } = useLanguage();
  
  const calculation = useMemo(() => {
    return calculatePremiumImpact(service, memberCount, basePremium);
  }, [service, memberCount, basePremium]);

  const pureCost = calculation.annualCostPerThousand / 1000;
  const riskLoading = pureCost * (calculation.riskLoadingFactor - 1);
  const adminLoading = (pureCost + riskLoading) * (calculation.adminLoadingPercent / 100);

  const data = [
    { name: t('chart.purePremium'), value: Math.round(pureCost), color: 'hsl(155, 60%, 28%)' },
    { name: t('chart.riskLoading'), value: Math.round(riskLoading), color: 'hsl(200, 80%, 45%)' },
    { name: t('chart.adminLoading'), value: Math.round(adminLoading), color: 'hsl(40, 90%, 50%)' },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground text-sm">{payload[0].name}</p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {formatCurrency(payload[0].value)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {((payload[0].value / calculation.additionalPremiumPerMember) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-border shadow-md" id="cost-breakdown-chart">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">
          {t('chart.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] sm:h-[250px]" id="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
                stroke="transparent"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value: string) => (
                  <span className="text-xs sm:text-sm text-foreground">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 pt-4 border-t border-border">
          <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-xs sm:text-sm text-muted-foreground">{t('chart.totalAdditional')}</span>
            <span className="font-mono font-bold text-primary text-sm sm:text-base">
              {formatCurrency(calculation.additionalPremiumPerMember)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
