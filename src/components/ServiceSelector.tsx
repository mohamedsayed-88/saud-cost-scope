import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { healthServices, categories, type HealthService } from '@/data/healthServices';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface ServiceSelectorProps {
  selectedService: HealthService | null;
  onSelectService: (service: HealthService) => void;
}

const categoryTranslations: Record<string, string> = {
  'All Categories': 'جميع الفئات',
  'Chronic Disease': 'الأمراض المزمنة',
  'Metabolic': 'الأيض',
  'Fertility': 'الخصوبة',
  'Mental Health': 'الصحة النفسية',
  'Cardiovascular': 'القلب والأوعية',
  'Orthopedic': 'العظام',
  'Renal': 'الكلى',
  'Preventive': 'الوقائية',
  'Ophthalmology': 'طب العيون',
  'Maternity': 'الأمومة',
  'Dental': 'الأسنان',
  'Rehabilitation': 'إعادة التأهيل',
  'Sleep Medicine': 'طب النوم',
  'Endocrine': 'الغدد الصماء',
};

export function ServiceSelector({ selectedService, onSelectService }: ServiceSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const { t, language, isRTL } = useLanguage();

  const filteredServices = useMemo(() => {
    return healthServices.filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           service.nameAr.includes(searchQuery) ||
                           service.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All Categories' || service.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const getDataSourceColor = (source: string) => {
    switch (source) {
      case 'saudi': return 'bg-primary/10 text-primary border-primary/30';
      case 'gcc': return 'bg-info/10 text-info border-info/30';
      case 'mena': return 'bg-warning/10 text-warning border-warning/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryLabel = (cat: string) => {
    return language === 'ar' ? categoryTranslations[cat] || cat : cat;
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className={`flex flex-col sm:flex-row gap-3 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
        <div className="relative flex-1">
          <Search className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
          <Input
            placeholder={t('service.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`bg-background border-border focus:border-primary focus:ring-primary ${isRTL ? 'pr-10 text-right' : 'pl-10'}`}
          />
        </div>
        <div className={`flex gap-2 overflow-x-auto pb-2 sm:pb-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Filter className="h-4 w-4 text-muted-foreground self-center shrink-0" />
          {categories.slice(0, 4).map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap text-xs sm:text-sm"
            >
              {getCategoryLabel(category)}
            </Button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid gap-3 max-h-[350px] sm:max-h-[400px] overflow-y-auto pr-1 sm:pr-2 custom-scrollbar">
        {filteredServices.map((service) => (
          <button
            key={service.id}
            onClick={() => onSelectService(service)}
            className={cn(
              "w-full text-left p-3 sm:p-4 rounded-lg border transition-all duration-200",
              "hover:border-primary/50 hover:shadow-md",
              isRTL && "text-right",
              selectedService?.id === service.id
                ? "border-primary bg-primary/5 shadow-glow"
                : "border-border bg-card hover:bg-card/80"
            )}
          >
            <div className={`flex items-start justify-between gap-2 sm:gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="flex-1 min-w-0">
                <div className={`flex items-center gap-2 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <h3 className="font-medium text-foreground text-sm sm:text-base truncate">
                    {language === 'ar' ? service.nameAr : service.name}
                  </h3>
                  <Badge variant="outline" className={cn("text-[10px] sm:text-xs shrink-0", getDataSourceColor(service.dataSource))}>
                    {service.dataSource === 'saudi' ? (language === 'ar' ? '🇸🇦 سعودي' : '🇸🇦 Saudi') : 
                     service.dataSource === 'gcc' ? `🌐 ${service.sourceCountry}` : '🌍 MENA'}
                  </Badge>
                </div>
                <p className={`text-xs sm:text-sm text-primary/80 mt-1 ${isRTL ? '' : 'font-arabic'}`}>
                  {language === 'ar' ? service.name : service.nameAr}
                </p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-2 line-clamp-2">{service.description}</p>
              </div>
              <div className={`shrink-0 ${isRTL ? 'text-left' : 'text-right'}`}>
                <Badge variant="secondary" className="mb-1 bg-secondary text-secondary-foreground text-[10px] sm:text-xs">
                  {getCategoryLabel(service.category)}
                </Badge>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-mono">{service.icd10Code}</p>
              </div>
            </div>
          </button>
        ))}

        {filteredServices.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>{t('service.noResults')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
