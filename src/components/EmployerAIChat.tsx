import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  Loader2,
  Sparkles,
  TrendingDown,
  Users,
  Heart,
  Shield
} from 'lucide-react';
import { trackServiceUsage } from '@/lib/serviceTracking';
import { logQuestion } from '@/lib/questionsLog';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const suggestedQuestions = {
  ar: [
    'كيف أخفض استهلاك الموظفين للخدمات الصحية؟',
    'ما هي برامج الصحة الوقائية التي تخفض التكاليف؟',
    'كيف أحسن تجربة المستفيدين دون زيادة القسط؟',
    'ما هي مبادرات الدفع بالكفاءة والجودة؟',
    'كيف أتفاوض مع شركة التأمين لتخفيض القسط؟',
    'ما هي الأدوات المتاحة لمتابعة استهلاك الموظفين؟',
  ],
  en: [
    'How can I reduce employee healthcare consumption?',
    'What preventive health programs reduce costs?',
    'How to improve beneficiary experience without premium increase?',
    'What are value-based payment initiatives?',
    'How to negotiate with insurance for lower premiums?',
    'What tools are available to monitor employee consumption?',
  ]
};

export const EmployerAIChat = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (customInput?: string) => {
    const messageText = customInput || input.trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    trackServiceUsage({ serviceName: 'employer_ai_chat', serviceCategory: 'chat' });
    logQuestion(messageText, 'employer_ai_chat', language);

    let assistantContent = '';

    try {
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chi-chat`;
      
      const systemPrompt = isRTL 
        ? `أنت مستشار متخصص في إدارة تكاليف التأمين الصحي لأصحاب العمل في المملكة العربية السعودية. 
          ساعد أصحاب العمل في:
          - خفض تكاليف التأمين الصحي
          - تحسين تجربة المستفيدين
          - تطبيق برامج الصحة الوقائية
          - التفاوض مع شركات التأمين
          - تطبيق مبادرات الدفع بالكفاءة والجودة
          - اختيار شبكات مقدمي الخدمة المناسبة
          قدم نصائح عملية ومحددة مع أمثلة من السوق السعودي.`
        : `You are a specialist consultant in health insurance cost management for employers in Saudi Arabia.
          Help employers with:
          - Reducing health insurance costs
          - Improving beneficiary experience
          - Implementing preventive health programs
          - Negotiating with insurance companies
          - Implementing value-based care initiatives
          - Selecting appropriate provider networks
          Provide practical and specific advice with examples from the Saudi market.`;

      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ 
          messages: [...messages, userMessage],
          language,
          systemPrompt
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                assistantContent += content;
                setMessages(prev => {
                  const last = prev[prev.length - 1];
                  if (last?.role === 'assistant') {
                    return prev.map((m, i) => 
                      i === prev.length - 1 ? { ...m, content: assistantContent } : m
                    );
                  }
                  return [...prev, { role: 'assistant', content: assistantContent }];
                });
              }
            } catch {}
          }
        }
      }
    } catch (error) {
      toast({
        title: isRTL ? 'خطأ' : 'Error',
        description: isRTL ? 'حدث خطأ أثناء معالجة طلبك' : 'An error occurred processing your request',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  const features = [
    { icon: TrendingDown, labelAr: 'خفض التكاليف', labelEn: 'Cost Reduction' },
    { icon: Users, labelAr: 'تجربة المستفيدين', labelEn: 'Beneficiary Experience' },
    { icon: Heart, labelAr: 'الصحة الوقائية', labelEn: 'Preventive Health' },
    { icon: Shield, labelAr: 'الدفع بالكفاءة', labelEn: 'Value-Based Care' },
  ];

  return (
    <Card className="border-primary/20">
      <CardHeader className="border-b bg-gradient-to-l from-primary/5 to-transparent">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span>{isRTL ? 'مستشار أصحاب العمل الذكي' : 'Smart Employer Advisor'}</span>
        </CardTitle>
        <p className={`text-sm text-muted-foreground ${isRTL ? 'text-right' : 'text-left'}`}>
          {isRTL 
            ? 'اسأل عن طرق خفض الاستهلاك ورفع تجربة المستفيدين دون رفع أسعار التأمين'
            : 'Ask about reducing consumption and improving beneficiary experience without raising insurance prices'}
        </p>
        
        {/* Feature Tags */}
        <div className={`flex flex-wrap gap-2 mt-3 ${isRTL ? 'justify-end' : 'justify-start'}`}>
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/50 text-xs text-muted-foreground`}
            >
              <feature.icon className="h-3.5 w-3.5" />
              <span>{isRTL ? feature.labelAr : feature.labelEn}</span>
            </div>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="flex flex-col lg:grid lg:grid-cols-3">
          {/* Chat Area - First on mobile */}
          <div className="lg:col-span-2 flex flex-col order-first lg:order-last">
            <ScrollArea className="h-[300px] sm:h-[350px] p-4">
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-center">
                  <div>
                    <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground text-sm">
                      {isRTL 
                        ? 'اسأل عن أي استفسار يخص خفض تكاليف التأمين الصحي'
                        : 'Ask any question about reducing health insurance costs'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex gap-3`}
                    >
                      <div className={`p-2 rounded-full ${message.role === 'user' ? 'bg-primary' : 'bg-muted'} shrink-0 h-fit`}>
                        {message.role === 'user' ? (
                          <User className="h-4 w-4 text-primary-foreground" />
                        ) : (
                          <Bot className="h-4 w-4" />
                        )}
                      </div>
                      <div className={`flex-1 min-w-0`}>
                        <div className={`p-3 rounded-lg max-w-full ${
                          message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                        }`}>
                          <div className={`text-sm whitespace-pre-wrap break-words ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                            {message.content}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3">
                      <div className="p-2 rounded-full bg-muted shrink-0 h-fit">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="p-3 rounded-lg bg-muted">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isRTL ? 'اكتب سؤالك هنا...' : 'Type your question here...'}
                  className={`flex-1 ${isRTL ? 'text-right' : ''}`}
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading || !input.trim()}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </form>
            </div>
          </div>

          {/* Suggested Questions - After chat on mobile */}
          <div className={`p-4 border-t lg:border-t-0 ${isRTL ? 'lg:border-l' : 'lg:border-r'} bg-muted/30 order-last lg:order-first`}>
            <h4 className={`text-sm font-medium mb-3 flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
              <MessageSquare className="h-4 w-4 text-primary" />
              <span>{isRTL ? 'أسئلة مقترحة' : 'Suggested Questions'}</span>
            </h4>
            <div className="space-y-2">
              {suggestedQuestions[isRTL ? 'ar' : 'en'].map((question, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className={`w-full text-xs h-auto py-2 px-3 justify-start ${isRTL ? 'text-right' : 'text-left'} hover:bg-primary/10`}
                  onClick={() => handleSend(question)}
                >
                  <span className={`line-clamp-2 w-full ${isRTL ? 'text-right' : 'text-left'}`}>{question}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
