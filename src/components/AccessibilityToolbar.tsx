import { useState, useEffect } from 'react';
import { 
  Accessibility, ZoomIn, ZoomOut, Contrast, Moon, Sun, 
  Type, Eye, X, RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  grayscale: boolean;
  highlightLinks: boolean;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 100,
  highContrast: false,
  grayscale: false,
  highlightLinks: false,
};

export function AccessibilityToolbar() {
  const { language, isRTL } = useLanguage();
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load settings from localStorage after mount
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('accessibility-settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings(parsed);
        applySettings(parsed);
      } catch {
        // ignore
      }
    }
  }, []);

  // Apply settings to document
  const applySettings = (s: AccessibilitySettings) => {
    document.documentElement.style.fontSize = `${s.fontSize}%`;
    
    if (s.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    if (s.grayscale) {
      document.documentElement.classList.add('grayscale-mode');
    } else {
      document.documentElement.classList.remove('grayscale-mode');
    }
    
    if (s.highlightLinks) {
      document.documentElement.classList.add('highlight-links');
    } else {
      document.documentElement.classList.remove('highlight-links');
    }
  };

  // Update and save settings
  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    applySettings(updated);
    localStorage.setItem('accessibility-settings', JSON.stringify(updated));
  };

  // Reset all settings
  const resetSettings = () => {
    setSettings(defaultSettings);
    applySettings(defaultSettings);
    localStorage.removeItem('accessibility-settings');
  };

  if (!mounted) return null;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 left-4 z-50 h-12 w-12 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 border-0"
          aria-label={language === 'ar' ? 'أداة سهولة الوصول' : 'Accessibility Tool'}
        >
          <Accessibility className="h-6 w-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        side={isRTL ? 'right' : 'left'} 
        align="end"
        className="w-72 p-4"
      >
        <div className="space-y-4">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <Accessibility className="h-4 w-4" />
              {language === 'ar' ? 'سهولة الوصول' : 'Accessibility'}
            </h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetSettings}
              className="h-7 px-2 text-xs"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              {language === 'ar' ? 'إعادة' : 'Reset'}
            </Button>
          </div>

          {/* Font Size */}
          <div className="space-y-2">
            <Label className="text-xs flex items-center gap-2">
              <Type className="h-3 w-3" />
              {language === 'ar' ? 'حجم الخط' : 'Font Size'}: {settings.fontSize}%
            </Label>
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={() => updateSettings({ fontSize: Math.max(80, settings.fontSize - 10) })}
                disabled={settings.fontSize <= 80}
              >
                <ZoomOut className="h-3 w-3" />
              </Button>
              <Slider
                value={[settings.fontSize]}
                onValueChange={([v]) => updateSettings({ fontSize: v })}
                min={80}
                max={150}
                step={10}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={() => updateSettings({ fontSize: Math.min(150, settings.fontSize + 10) })}
                disabled={settings.fontSize >= 150}
              >
                <ZoomIn className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* High Contrast */}
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Label className="text-xs flex items-center gap-2 cursor-pointer">
              <Contrast className="h-3 w-3" />
              {language === 'ar' ? 'تباين عالي' : 'High Contrast'}
            </Label>
            <Switch
              checked={settings.highContrast}
              onCheckedChange={(v) => updateSettings({ highContrast: v })}
            />
          </div>

          {/* Grayscale */}
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Label className="text-xs flex items-center gap-2 cursor-pointer">
              <Eye className="h-3 w-3" />
              {language === 'ar' ? 'وضع أحادي اللون' : 'Grayscale Mode'}
            </Label>
            <Switch
              checked={settings.grayscale}
              onCheckedChange={(v) => updateSettings({ grayscale: v })}
            />
          </div>

          {/* Highlight Links */}
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Label className="text-xs flex items-center gap-2 cursor-pointer">
              <Type className="h-3 w-3" />
              {language === 'ar' ? 'تمييز الروابط' : 'Highlight Links'}
            </Label>
            <Switch
              checked={settings.highlightLinks}
              onCheckedChange={(v) => updateSettings({ highlightLinks: v })}
            />
          </div>

          <p className="text-[10px] text-muted-foreground text-center pt-2 border-t">
            {language === 'ar' 
              ? 'أداة سهولة الوصول لذوي الاحتياجات الخاصة'
              : 'Accessibility tool for users with special needs'}
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
