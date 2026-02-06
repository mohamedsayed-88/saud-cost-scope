import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { QuoteAnalyzer } from '@/components/QuoteAnalyzer';
import { Upload } from 'lucide-react';

const QuoteAnalysis = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const [employeeCount] = useState(100);

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-6 sm:py-8 overflow-hidden gradient-hero">
        <div className="absolute inset-0 chi-pattern" />
        <div className="container mx-auto px-3 sm:px-4 relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-primary-foreground/10">
              <Upload className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-primary-foreground">
              {isRTL ? 'تحليل العرض السعري' : 'Quote Analysis'}
            </h1>
          </div>
          
          <p className="text-xs sm:text-sm text-primary-foreground/85 max-w-2xl">
            {isRTL 
              ? 'قم برفع عرض التأمين الصحي لتحليله ومقارنته مع حزمة المنافع الأساسية'
              : 'Upload your health insurance quote for analysis and comparison with the basic benefits package'}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-6">
        <QuoteAnalyzer employeeCount={employeeCount} />
      </main>

      {/* Footer */}
      <footer className="border-t py-6 mt-8">
        <div className="container mx-auto px-4">
          <p className={`text-sm text-muted-foreground ${isRTL ? 'text-right' : 'text-left'}`}>
            {isRTL 
              ? '* التحليل مبني على معايير مجلس الضمان الصحي ومعدلات السوق'
              : '* Analysis is based on CHI standards and market rates'}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default QuoteAnalysis;