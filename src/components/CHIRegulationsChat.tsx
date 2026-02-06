import { useState, useRef, useEffect, useMemo } from 'react';
import { Send, Bot, User, Loader2, Scale, AlertCircle, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { logQuestion } from '@/lib/questionsLog';
import { trackServiceUsage, SERVICES } from '@/lib/serviceTracking';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AUTOCOMPLETE_QUESTIONS_AR = [
  // أسئلة أصحاب العمل وإلزامية التغطية
  'ما هي التزامات صاحب العمل تجاه التغطية الصحية للعاملين؟',
  'ما هي غرامات عدم الالتزام بالتغطية الصحية الإلزامية؟',
  'كيف يتم احتساب قسط العاملين والمعالين؟',
  // أسئلة الإشراف السلوكي
  'ما هو الإشراف السلوكي على مقدمي الخدمة؟',
  'ما هي معايير تصنيف مقدمي الرعاية الأولية؟',
  'كيف يتم تقييم أداء مقدمي الخدمة الصحية؟',
  // أسئلة الدفع المبني على القيمة
  'ما هو نظام الدفع المبني على القيمة؟',
  'كيف يختلف الدفع بالحزم التشخيصية عن الدفع بالخدمة؟',
  'ما هي حوافز جودة الخدمة لمقدمي الرعاية؟',
  // أسئلة المبررات الطبية والأكواد
  'ما هو المبرر الطبي لكود التشخيص E11.9 (السكري النوع الثاني)؟',
  'اربط كود I10 (ارتفاع الضغط) بالأدلة العلاجية المعتمدة من المجلس',
  'ما هي سياسة شمول الأيتام المحتضنين بالتغطية الصحية؟',
  'ما هي مبادرة تحسين التوثيق السريري CDI؟',
  'ما هو الحد الأدنى من البيانات المطلوبة للموافقة المسبقة؟',
  'ما هي سياسة الانتقال بين الوثائق الصحية؟',
  'ما هي معايير ترميز نظام الفوترة السعودي SBS V3؟',
  'ما هي سياسة مركزية المستفيد؟',
  'ما هي استثناءات الوثيقة الأساسية؟',
  'كيف أقدم شكوى للضمان الصحي؟',
  'ما هي خدمات الطوارئ المغطاة؟',
  'هل الفحوصات الوقائية مشمولة؟',
  'ما هو كود دواء الميتفورمين؟',
  'ما هي أكواد خدمات الأشعة؟',
  'هل عملية القلب المفتوح مغطاة؟',
  'ما هي الخدمات المغطاة للحوامل؟',
  'ما هي شروط الموافقة المسبقة؟',
  'ما هي خدمات الرعاية الأولية؟',
  'ما هو نظام الحزم التشخيصية DRG؟',
  'ما هي متطلبات تدقيق الترميز الطبي؟',
];

const AUTOCOMPLETE_QUESTIONS_EN = [
  // Employer and mandatory coverage questions
  'What are employer obligations for employee health coverage?',
  'What are the penalties for non-compliance with mandatory coverage?',
  'How are employee and dependent premiums calculated?',
  // Behavioral supervision questions
  'What is behavioral supervision of service providers?',
  'What are primary care provider classification criteria?',
  'How is healthcare provider performance evaluated?',
  // Value-based payment questions
  'What is value-based payment?',
  'How does DRG payment differ from fee-for-service?',
  'What are quality incentives for healthcare providers?',
  // Medical justification and coding questions
  'What is the medical justification for diagnosis code E11.9 (Type 2 Diabetes)?',
  'Link code I10 (Hypertension) to CHI-approved treatment guidelines',
  'What is the orphans foster care coverage policy?',
  'What is the Clinical Documentation Improvement (CDI) initiative?',
  'What is the Minimum Data Set (MDS) for prior authorization?',
  'What is the beneficiary transition policy between policies?',
  'What are the SBS V3 coding standards?',
  'What is the beneficiary centricity policy?',
  'What are basic policy exclusions?',
  'How do I file a complaint with CHI?',
  'What emergency services are covered?',
  'Are preventive screenings included?',
  'What is the drug code for Metformin?',
  'What are the radiology service codes?',
  'Is open heart surgery covered?',
  'What services are covered for pregnant women?',
  'What are the prior authorization requirements?',
  'What are primary care services?',
  'What is the DRG payment system?',
  'What are the medical coding audit requirements?',
];

export function CHIRegulationsChat() {
  const { language, isRTL } = useLanguage();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  const autocompleteQuestions = language === 'ar' ? AUTOCOMPLETE_QUESTIONS_AR : AUTOCOMPLETE_QUESTIONS_EN;
  const suggestedQuestions = autocompleteQuestions.slice(0, 3);

  // Filter autocomplete suggestions based on input
  const filteredSuggestions = useMemo(() => {
    if (!input.trim() || input.length < 2) return [];
    const searchTerm = input.toLowerCase().trim();
    return autocompleteQuestions.filter(q => 
      q.toLowerCase().includes(searchTerm)
    ).slice(0, 5);
  }, [input, autocompleteQuestions]);

  // Scroll only when user sends a new message, not during streaming
  const scrollToQuestion = () => {
    if (scrollRef.current) {
      // Keep view at the question position, not auto-scroll to bottom
    }
  };

  useEffect(() => {
    setShowAutocomplete(filteredSuggestions.length > 0);
    setSelectedIndex(0);
  }, [filteredSuggestions]);

  // Close autocomplete when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(e.target as Node) &&
          textareaRef.current && !textareaRef.current.contains(e.target as Node)) {
        setShowAutocomplete(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const streamChat = async (userMessages: Message[]) => {
    const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chi-chat`;
    
    const resp = await fetch(CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: userMessages, language }),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({}));
      if (resp.status === 429) {
        throw new Error(language === 'ar' ? 'تم تجاوز حد الاستخدام. يرجى المحاولة لاحقاً.' : 'Rate limit exceeded. Please try again later.');
      }
      if (resp.status === 402) {
        throw new Error(language === 'ar' ? 'تم استنفاد الرصيد. يرجى إضافة رصيد.' : 'Usage limit reached.');
      }
      throw new Error(errorData.error || 'Failed to get response');
    }

    return resp;
  };

  const handleSend = async (customInput?: string) => {
    const messageText = customInput || input.trim();
    if (!messageText || isLoading) return;

    setShowAutocomplete(false);
    const userMessage: Message = { role: 'user', content: messageText };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    // Log the question and track service usage
    logQuestion(messageText, 'smart_assistant', language);
    trackServiceUsage({ serviceName: SERVICES.SMART_ASSISTANT, serviceCategory: 'chat' });

    let assistantContent = '';

    try {
      const response = await streamChat(updatedMessages);
      
      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';

      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = { role: 'assistant', content: assistantContent };
                return newMessages;
              });
            }
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: error instanceof Error ? error.message : 'Failed to send message',
        variant: 'destructive',
      });
      setMessages(prev => prev.filter((_, i) => i !== prev.length - 1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setInput(suggestion);
    setShowAutocomplete(false);
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showAutocomplete && filteredSuggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredSuggestions.length);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredSuggestions.length) % filteredSuggestions.length);
        return;
      }
      if (e.key === 'Tab' || (e.key === 'Enter' && !e.shiftKey)) {
        e.preventDefault();
        handleSelectSuggestion(filteredSuggestions[selectedIndex]);
        return;
      }
      if (e.key === 'Escape') {
        setShowAutocomplete(false);
        return;
      }
    }
    
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="border-border shadow-lg min-h-[250px] max-h-[60vh] sm:max-h-[450px] flex flex-col w-full overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <CardHeader className="pb-2 sm:pb-3 border-b border-border px-3 sm:px-6 shrink-0">
        <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
          <Scale className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
          <span className="truncate">
            {language === 'ar' ? 'محرك الذكاء الاصطناعي بضمان' : 'Daman AI Engine'}
          </span>
        </CardTitle>
        <p className={`text-[10px] sm:text-xs text-muted-foreground leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
          {language === 'ar' 
            ? 'استفسر عن أنظمة الضمان الصحي، وربط رموز التشخيص (ICD-10) والخدمات (SBS) بالأدلة الطبية ومبررات الخدمات والأدوية'
            : 'Query CHI regulations, link diagnosis codes (ICD-10) and services (SBS) to medical guidelines and medication justifications'}
        </p>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden min-h-0">
        <div className="flex-1 overflow-y-auto p-3 sm:p-4" ref={scrollRef}>
          {messages.length === 0 ? (
            <div className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <p className={`text-[10px] sm:text-xs text-muted-foreground ${isRTL ? 'text-right' : 'text-left'}`}>
                  {language === 'ar' ? 'أسئلة مقترحة:' : 'Suggested questions:'}
                </p>
                <div className={`flex flex-wrap gap-1.5 sm:gap-2 ${isRTL ? 'justify-end flex-row-reverse' : 'justify-start'}`}>
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className={`text-[10px] sm:text-xs h-auto py-1.5 sm:py-2 px-2 sm:px-3 whitespace-normal ${isRTL ? 'text-right' : 'text-left'}`}
                      onClick={() => handleSend(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {messages.map((message, index) => {
                const content = (message.content || '').replace(/\*/g, '');

                return (
                  <div
                    key={index}
                    className={`flex items-start gap-2 sm:gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`p-1.5 sm:p-2 rounded-full shrink-0 ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-primary/10'}`}>
                      {message.role === 'user' 
                        ? <User className="h-3 w-3 sm:h-4 sm:w-4" /> 
                        : <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                      }
                    </div>
                    <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {message.role === 'user' ? (
                        <div className="bg-primary/10 border border-primary/20 rounded-lg px-3 py-2 inline-block max-w-full">
                          <p className="text-xs sm:text-sm font-medium whitespace-pre-wrap leading-relaxed break-words">
                            {message.content}
                          </p>
                        </div>
                      ) : (
                        <div className="group">
                          <p className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed break-words text-muted-foreground">
                            {content || (isLoading && index === messages.length - 1 && (
                              <span className={`flex items-center gap-2 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                                <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                                {language === 'ar' ? 'جاري البحث...' : 'Searching...'}
                              </span>
                            ))}
                          </p>
                          {content && !isLoading && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`mt-2 h-7 text-xs text-muted-foreground hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity ${isRTL ? 'flex-row-reverse' : ''}`}
                              onClick={() => {
                                navigator.clipboard.writeText(content);
                                setCopiedIndex(index);
                                setTimeout(() => setCopiedIndex(null), 2000);
                                toast({
                                  title: language === 'ar' ? 'تم النسخ' : 'Copied',
                                  description: language === 'ar' ? 'تم نسخ الإجابة إلى الحافظة' : 'Answer copied to clipboard',
                                });
                              }}
                            >
                              {copiedIndex === index ? (
                                <>
                                  <Check className="h-3 w-3 mr-1" />
                                  {language === 'ar' ? 'تم النسخ' : 'Copied'}
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3 w-3 mr-1" />
                                  {language === 'ar' ? 'نسخ الإجابة' : 'Copy answer'}
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="p-3 sm:p-4 border-t border-border relative">
          {/* Autocomplete dropdown */}
          {showAutocomplete && filteredSuggestions.length > 0 && (
            <div 
              ref={autocompleteRef}
              className="absolute bottom-full left-3 right-3 mb-1 bg-background border border-border rounded-lg shadow-lg z-50 max-h-[200px] overflow-y-auto"
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className={`w-full px-3 py-2 text-xs sm:text-sm hover:bg-accent cursor-pointer transition-colors ${
                    isRTL ? 'text-right' : 'text-left'
                  } ${index === selectedIndex ? 'bg-accent' : ''}`}
                  onClick={() => handleSelectSuggestion(suggestion)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
          
          <div className="flex gap-2">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={language === 'ar' ? 'اكتب سؤالك هنا...' : 'Type your question...'}
              className={`resize-none min-h-[40px] sm:min-h-[44px] max-h-[100px] sm:max-h-[120px] text-sm ${isRTL ? 'text-right' : 'text-left'}`}
              dir={isRTL ? 'rtl' : 'ltr'}
              rows={1}
              disabled={isLoading}
            />
            <Button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="shrink-0 h-10 w-10 sm:h-11 sm:w-11"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
          <p className={`text-[9px] sm:text-[10px] text-muted-foreground mt-1.5 sm:mt-2 flex items-center gap-1 ${isRTL ? 'justify-end flex-row-reverse' : 'justify-start'}`}>
            <AlertCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0" />
            <span className="truncate">
              {language === 'ar' 
                ? 'للتأكد، تواصل مع المجلس على 920001177'
                : 'Contact CHI at 920001177 for confirmation.'}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
