import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, X, Smartphone, Share } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  useEffect(() => {
    // Check if already dismissed
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      setIsDismissed(true);
    }

    // Check if iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    // Check if already installed
    const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                       (window.navigator as any).standalone === true;
    setIsStandalone(standalone);

    if (standalone) {
      setIsVisible(false);
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Show for iOS even without the prompt event
    if (isIOSDevice && !standalone && !dismissed) {
      setIsVisible(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsVisible(false);
      localStorage.setItem('pwa-install-dismissed', 'true');
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  if (!isVisible || isDismissed || isStandalone) return null;

  return (
    <div className="container mx-auto px-3 sm:px-4 pt-4">
      <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10 max-w-4xl mx-auto">
        <CardContent className="p-4">
          <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="bg-primary/20 p-3 rounded-xl shrink-0">
              <Smartphone className="h-6 w-6 text-primary" />
            </div>
            
            <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : 'text-left'}`}>
              <h3 className="text-sm font-semibold text-foreground mb-1">
                {isRTL ? 'ثبّت التطبيق على جوالك' : 'Install the App'}
              </h3>
              <p className="text-xs text-muted-foreground">
                {isIOS 
                  ? (isRTL 
                      ? 'اضغط على زر المشاركة ثم "إضافة إلى الشاشة الرئيسية"' 
                      : 'Tap Share button then "Add to Home Screen"')
                  : (isRTL 
                      ? 'ثبّت التطبيق للوصول السريع بدون إنترنت' 
                      : 'Install for quick offline access')
                }
              </p>
            </div>
            
            <div className={`flex items-center gap-2 shrink-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {isIOS ? (
                <Button
                  size="sm"
                  variant="outline"
                  className={`gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}
                  onClick={handleDismiss}
                >
                  <Share className="h-4 w-4" />
                  {isRTL ? 'فهمت' : 'Got it'}
                </Button>
              ) : deferredPrompt ? (
                <Button
                  size="sm"
                  onClick={handleInstall}
                  className={`gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <Download className="h-4 w-4" />
                  {isRTL ? 'تثبيت' : 'Install'}
                </Button>
              ) : null}
              
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={handleDismiss}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PWAInstallButton;
