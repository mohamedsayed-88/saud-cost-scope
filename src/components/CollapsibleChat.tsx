import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { CHIRegulationsChat } from '@/components/CHIRegulationsChat';
import { useLanguage } from '@/contexts/LanguageContext';

export function CollapsibleChat() {
  const { language, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="border-primary/20 shadow-md mb-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            className={`w-full justify-between p-4 h-auto hover:bg-primary/5 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="p-1.5 rounded-md bg-primary/10">
                <MessageSquare className="h-4 w-4 text-primary" />
              </div>
              <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                <p className="text-sm font-medium">
                  {language === 'ar' ? 'محرك الذكاء الاصطناعي بضمان' : 'Daman AI Engine'}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {language === 'ar' 
                    ? 'استفسر عن أنظمة الضمان والأكواد الطبية'
                    : 'Query CHI regulations and medical codes'}
                </p>
              </div>
            </div>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="p-0 pt-0">
            <CHIRegulationsChat />
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
