import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileDown, Loader2 } from 'lucide-react';
import { generatePremiumReport } from '@/utils/pdfExport';
import { useLanguage } from '@/contexts/LanguageContext';
import { type HealthService } from '@/data/healthServices';
import { toast } from 'sonner';

interface PDFExportButtonProps {
  selectedService: HealthService | null;
  memberCount: number;
  basePremium: number;
  className?: string;
}

export function PDFExportButton({ 
  selectedService, 
  memberCount, 
  basePremium,
  className 
}: PDFExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const { language, isRTL } = useLanguage();

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await generatePremiumReport({
        selectedService,
        memberCount,
        basePremium,
        language,
      });
      toast.success(
        language === 'ar' 
          ? 'تم تصدير التقرير بنجاح' 
          : 'Report exported successfully'
      );
    } catch (error) {
      console.error('PDF export error:', error);
      toast.error(
        language === 'ar'
          ? 'حدث خطأ أثناء تصدير التقرير'
          : 'Error exporting report'
      );
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting}
      variant="outline"
      className={`gap-2 ${isRTL ? 'flex-row-reverse' : ''} ${className}`}
    >
      {isExporting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <FileDown className="h-4 w-4" />
      )}
      {language === 'ar' ? 'تصدير PDF' : 'Export PDF'}
    </Button>
  );
}
