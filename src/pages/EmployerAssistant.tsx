import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { EmployerAIChat } from '@/components/EmployerAIChat';
import { Building2 } from 'lucide-react';

const EmployerAssistant = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-6 sm:py-8 overflow-hidden gradient-hero">
        <div className="absolute inset-0 chi-pattern" />
        <div className="container mx-auto px-3 sm:px-4 relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-primary-foreground/10">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-primary-foreground">
              {isRTL ? 'المساعد الذكي لأصحاب العمل' : 'Smart Employer Assistant'}
            </h1>
          </div>
          
          <p className="text-xs sm:text-sm text-primary-foreground/85 max-w-2xl">
            {isRTL 
              ? 'مستشارك الذكي لخفض تكاليف التأمين الصحي وتحسين تجربة المستفيدين'
              : 'Your smart advisor for reducing health insurance costs and improving beneficiary experience'}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <EmployerAIChat />
      </main>

      {/* Footer */}
      <footer className="border-t py-6 mt-8">
        <div className="container mx-auto px-4">
          <p className="text-sm text-muted-foreground text-center">
            {isRTL 
              ? '* النصائح المقدمة للإرشاد فقط. يُنصح بالتواصل مع مستشار تأمين معتمد للقرارات النهائية.'
              : '* Advice provided is for guidance only. Consult a licensed insurance advisor for final decisions.'}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default EmployerAssistant;
