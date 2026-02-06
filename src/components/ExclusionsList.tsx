import { useState, useMemo } from 'react';
import { Search, Ban, TrendingUp, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { chiExclusions, exclusionCategories, type Exclusion } from '@/data/chiExclusions';
import { predictExclusionAdditionImpact } from '@/data/sublimitCalculator';
import { formatCurrency } from '@/data/healthServices';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface ExclusionsListProps {
  basePremium: number;
  onSelectExclusion?: (exclusion: Exclusion) => void;
}

const categoryTranslations: Record<string, string> = {
  'All Categories': 'جميع الفئات',
  'Cosmetic': 'تجميلي',
  'Fertility': 'الخصوبة',
  'Dental': 'الأسنان',
  'Ophthalmology': 'طب العيون',
  'Orthopedic': 'العظام',
  'Alternative': 'الطب البديل',
  'Dermatology': 'الجلدية',
  'Rehabilitation': 'التأهيل',
  'Mental Health': 'الصحة النفسية',
  'Long-term Care': 'الرعاية طويلة الأمد',
  'Wellness': 'العافية',
  'Congenital': 'الخلقية',
  'Transplant': 'الزراعة',
  'Diagnostic': 'التشخيص',
};

export function ExclusionsList({ basePremium, onSelectExclusion }: ExclusionsListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedExclusion, setSelectedExclusion] = useState<Exclusion | null>(null);
  const { language, isRTL, t } = useLanguage();

  const filteredExclusions = useMemo(() => {
    return chiExclusions.filter(exc => {
      const matchesSearch = exc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           exc.nameAr.includes(searchQuery) ||
                           exc.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All Categories' || exc.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/30';
      case 'medium': return 'bg-warning/10 text-warning border-warning/30';
      case 'low': return 'bg-success/10 text-success border-success/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getDemandLabel = (demand: string) => {
    const labels: Record<string, Record<string, string>> = {
      high: { en: 'High Demand', ar: 'طلب مرتفع' },
      medium: { en: 'Medium Demand', ar: 'طلب متوسط' },
      low: { en: 'Low Demand', ar: 'طلب منخفض' }
    };
    return labels[demand]?.[language] || demand;
  };

  const handleSelect = (exc: Exclusion) => {
    setSelectedExclusion(exc);
    onSelectExclusion?.(exc);
  };

  const getCategoryLabel = (cat: string) => language === 'ar' ? categoryTranslations[cat] || cat : cat;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Ban className="h-5 w-5 text-destructive" />
        <h3 className="font-semibold text-foreground">
          {language === 'ar' ? 'الخدمات غير المغطاة' : 'Non-Covered Benefits (Exclusions)'}
        </h3>
        <Badge variant="secondary" className="text-xs">
          {chiExclusions.length} {language === 'ar' ? 'استثناء' : 'exclusions'}
        </Badge>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
          <Input
            placeholder={language === 'ar' ? 'ابحث في الاستثناءات...' : 'Search exclusions...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`bg-background border-border ${isRTL ? 'pr-10' : 'pl-10'}`}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {exclusionCategories.slice(0, 5).map(category => (
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
      </div>

      {/* Exclusions Grid */}
      <div className="grid gap-3 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
        {filteredExclusions.map((exc) => {
          const impact = exc.potentialCostSAR && exc.prevalencePerThousand
            ? predictExclusionAdditionImpact(exc.prevalencePerThousand, exc.potentialCostSAR, 0.65, basePremium)
            : null;

          return (
            <button
              key={exc.id}
              onClick={() => handleSelect(exc)}
              className={cn(
                "w-full p-3 sm:p-4 rounded-lg border transition-all duration-200",
                "hover:border-destructive/50 hover:shadow-md",
                selectedExclusion?.id === exc.id
                  ? "border-destructive bg-destructive/5"
                  : "border-border bg-card hover:bg-card/80"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-medium text-foreground text-sm truncate">
                      {language === 'ar' ? exc.nameAr : exc.name}
                    </h4>
                    <Badge variant="outline" className={cn("text-[10px]", getDemandColor(exc.estimatedDemand))}>
                      {getDemandLabel(exc.estimatedDemand)}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {language === 'ar' ? exc.descriptionAr : exc.description}
                  </p>
                  
                  {impact && (
                    <div className="flex items-center gap-3 mt-2 text-xs">
                      <span className="text-muted-foreground">
                        {language === 'ar' ? 'إذا أُضيف:' : 'If added:'}
                      </span>
                      <span className="font-mono text-destructive font-medium">
                        +{impact.premiumImpactPercent}%
                      </span>
                      <span className="text-muted-foreground">
                        ({formatCurrency(impact.premiumImpactSAR)}/{language === 'ar' ? 'عضو' : 'member'})
                      </span>
                    </div>
                  )}
                </div>
                <div className="shrink-0">
                  <Badge variant="secondary" className="text-[10px] mb-1">
                    {getCategoryLabel(exc.category)}
                  </Badge>
                  {exc.potentialCostSAR && (
                    <p className="text-[10px] text-muted-foreground font-mono">
                      ~{formatCurrency(exc.potentialCostSAR)}
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}

        {filteredExclusions.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>{language === 'ar' ? 'لم يتم العثور على استثناءات' : 'No exclusions found'}</p>
          </div>
        )}
      </div>

      {/* Selected Exclusion Details */}
      {selectedExclusion && selectedExclusion.potentialCostSAR && selectedExclusion.prevalencePerThousand && (
        <Card className="border-destructive/30 bg-destructive/5 mt-4" dir={isRTL ? 'rtl' : 'ltr'}>
          <CardHeader className="pb-2">
            <CardTitle className={`text-sm flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
              <AlertCircle className="h-4 w-4 text-destructive" />
              {language === 'ar' ? 'تحليل تأثير الإضافة' : 'Addition Impact Analysis'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(() => {
              const impact = predictExclusionAdditionImpact(
                selectedExclusion.prevalencePerThousand!,
                selectedExclusion.potentialCostSAR!,
                0.65,
                basePremium
              );
              return (
                <>
                  {/* Primary Metrics */}
                  <div className={`grid grid-cols-2 sm:grid-cols-4 gap-2 ${isRTL ? 'text-right' : ''}`}>
                    <div className="p-2 rounded bg-background">
                      <p className="text-[10px] text-muted-foreground">
                        {language === 'ar' ? 'تكلفة PMPM' : 'PMPM Cost'}
                      </p>
                      <p className="font-mono font-bold text-destructive text-sm">{formatCurrency(impact.pmpmCost)}</p>
                    </div>
                    <div className="p-2 rounded bg-background">
                      <p className="text-[10px] text-muted-foreground">
                        {language === 'ar' ? 'التكلفة الإجمالية' : 'Gross Cost'}
                      </p>
                      <p className="font-mono font-bold text-foreground text-sm">{formatCurrency(impact.grossCostIncrease)}</p>
                    </div>
                    <div className="p-2 rounded bg-background">
                      <p className="text-[10px] text-muted-foreground">
                        {language === 'ar' ? 'صافي التأثير' : 'Net Impact'}
                      </p>
                      <p className="font-mono font-bold text-foreground text-sm">{formatCurrency(impact.netCostImpact)}</p>
                    </div>
                    <div className="p-2 rounded bg-background">
                      <p className="text-[10px] text-muted-foreground">
                        {language === 'ar' ? 'لكل مؤمن' : 'Per Insured'}
                      </p>
                      <p className="font-mono font-bold text-foreground text-sm">{formatCurrency(impact.costPerInsured)}</p>
                    </div>
                  </div>
                  
                  {/* Sensitivity Analysis */}
                  <div className="border-t border-border/50 pt-3">
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                      {language === 'ar' ? 'تحليل الحساسية (±25%)' : 'Sensitivity Analysis (±25%)'}
                    </p>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 rounded bg-success/10 border border-success/20">
                        <p className="text-[10px] text-success font-medium">
                          {language === 'ar' ? 'أفضل حالة' : 'Best Case'}
                        </p>
                        <p className="font-mono text-xs text-success">+{impact.sensitivity.bestCase.percent}%</p>
                        <p className="font-mono text-[10px] text-muted-foreground">{formatCurrency(impact.sensitivity.bestCase.pmpm)}/mo</p>
                      </div>
                      <div className="p-2 rounded bg-warning/10 border border-warning/20">
                        <p className="text-[10px] text-warning font-medium">
                          {language === 'ar' ? 'متوقع' : 'Expected'}
                        </p>
                        <p className="font-mono text-xs text-warning">+{impact.sensitivity.expected.percent}%</p>
                        <p className="font-mono text-[10px] text-muted-foreground">{formatCurrency(impact.sensitivity.expected.pmpm)}/mo</p>
                      </div>
                      <div className="p-2 rounded bg-destructive/10 border border-destructive/20">
                        <p className="text-[10px] text-destructive font-medium">
                          {language === 'ar' ? 'أسوأ حالة' : 'Worst Case'}
                        </p>
                        <p className="font-mono text-xs text-destructive">+{impact.sensitivity.worstCase.percent}%</p>
                        <p className="font-mono text-[10px] text-muted-foreground">{formatCurrency(impact.sensitivity.worstCase.pmpm)}/mo</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional Info */}
                  <p className="text-xs text-muted-foreground border-t border-border/50 pt-2">
                    {language === 'ar' 
                      ? `معدل الانتشار: ${selectedExclusion.prevalencePerThousand}/1000 | متوسط التكلفة: ${formatCurrency(selectedExclusion.potentialCostSAR!)} | التكاليف المتجنبة: 8%`
                      : `Prevalence: ${selectedExclusion.prevalencePerThousand}/1000 | Avg Cost: ${formatCurrency(selectedExclusion.potentialCostSAR!)} | Avoided Costs: 8%`
                    }
                  </p>
                </>
              );
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
