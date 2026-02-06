import { useState, useRef } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Code2, 
  Send, 
  Bot, 
  User, 
  Loader2,
  Search,
  FileCode,
  Stethoscope,
  Download,
  FileText
} from 'lucide-react';
import { trackServiceUsage, SERVICES } from '@/lib/serviceTracking';
import { logQuestion } from '@/lib/questionsLog';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const suggestedQuestions = {
  ar: [
    'ما هو كود ICD-10 لمرض السكري النوع الثاني؟',
    'ما هي أكواد SBS لخدمات الأشعة؟',
    'كيف أرمز حالة ارتفاع ضغط الدم الأساسي؟',
    'ما الفرق بين كود E11.9 و E11.65؟',
    'ما هي أكواد خدمات العلاج الطبيعي؟',
    'كيف أرمز عملية استئصال الزائدة الدودية؟',
  ],
  en: [
    'What is the ICD-10 code for Type 2 Diabetes?',
    'What are the SBS codes for radiology services?',
    'How do I code essential hypertension?',
    'What is the difference between E11.9 and E11.65?',
    'What are the codes for physical therapy services?',
    'How do I code an appendectomy procedure?',
  ]
};

// Function to parse message content and make file links downloadable
const parseMessageContent = (content: string, isRTL: boolean) => {
  // Match file paths like /data/... or public/data/... and markdown links
  const filePathRegex = /(?:\[([^\]]+)\]\()?(?:\/)?(?:public\/)?(data\/[^\s\)]+\.(?:pdf|xlsx|xls|csv|html))(?:\))?/gi;
  
  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  let match;
  
  while ((match = filePathRegex.exec(content)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(content.slice(lastIndex, match.index));
    }
    
    const linkText = match[1] || match[2] || match[0];
    const filePath = match[2] || match[0].replace(/^\[.*?\]\(/, '').replace(/\)$/, '').replace(/^\/?(public\/)?/, '');
    const fileName = filePath.split('/').pop() || filePath;
    const displayText = match[1] || fileName;
    
    parts.push(
      <a
        key={match.index}
        href={`/${filePath}`}
        download={fileName}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1 text-primary hover:underline font-medium ${isRTL ? 'flex-row-reverse' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Download className="h-3 w-3" />
        <span>{displayText}</span>
      </a>
    );
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text
  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex));
  }
  
  return parts.length > 0 ? parts : content;
};

const MedicalCodingAssistant = () => {
  const { language, isRTL } = useLanguage();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (customInput?: string) => {
    const messageText = customInput || input.trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Track service usage
    trackServiceUsage({ serviceName: 'medical_coding_assistant', serviceCategory: 'chat' });
    logQuestion(messageText, 'medical_coding_assistant', language);

    let assistantContent = '';

    try {
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chi-chat`;
      
      const systemPrompt = isRTL 
        ? 'أنت مساعد متخصص في الترميز الطبي. ساعد المستخدمين في العثور على أكواد ICD-10 و SBS الصحيحة. قدم شرحاً مفصلاً للأكواد ومتى تستخدم.'
        : 'You are a medical coding specialist assistant. Help users find correct ICD-10 and SBS codes. Provide detailed explanations of codes and when to use them.';

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

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      {/* Hero */}
      <section className="relative py-8 overflow-hidden gradient-hero">
        <div className="absolute inset-0 chi-pattern" />
        <div className="container mx-auto px-4 relative">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary-foreground/10">
              <Code2 className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h1 className="text-2xl sm:text-3xl font-bold text-primary-foreground">
                {isRTL ? 'مساعد الترميز الطبي' : 'Medical Coding Assistant'}
              </h1>
              <p className="text-sm text-primary-foreground/70 mt-1">
                {isRTL ? 'ابحث عن أكواد ICD-10 و SBS بسهولة' : 'Find ICD-10 and SBS codes easily'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-6">
        {/* Coding Systems Overview */}
        <Card className="mb-6 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="h-5 w-5 text-primary" />
              {isRTL ? 'أنظمة الترميز المعتمدة في السعودية' : 'Approved Coding Systems in Saudi Arabia'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* ICD-10-AM */}
              <div className={`p-4 rounded-lg bg-muted/50 border ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge className="bg-primary/20 text-primary">ICD-10-AM</Badge>
                </div>
                <h4 className="font-medium text-sm mb-1">
                  {isRTL ? 'أكواد التشخيص الأسترالية' : 'Australian Diagnosis Codes'}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {isRTL 
                    ? 'التصنيف الدولي للأمراض - النسخة الأسترالية المعدلة. تستخدم لترميز التشخيصات الطبية في جميع المنشآت الصحية.'
                    : 'International Classification of Diseases - Australian Modification. Used for coding medical diagnoses in all healthcare facilities.'}
                </p>
              </div>

              {/* SBS V3 + ACHI */}
              <div className={`p-4 rounded-lg bg-muted/50 border ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge className="bg-success/20 text-success">SBS V3</Badge>
                  <Badge className="bg-success/20 text-success">ACHI</Badge>
                </div>
                <h4 className="font-medium text-sm mb-1">
                  {isRTL ? 'نظام الترميز السعودي للخدمات' : 'Saudi Billing System'}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {isRTL 
                    ? 'أكواد الخدمات الصحية المعتمدة من مجلس الضمان الصحي. يتضمن نظام SBS أكواد ACHI (التصنيف الأسترالي للتدخلات الصحية) المستخدمة لترميز إجراءات الحالات المنومة (التنويم). تستخدم للفوترة والمطالبات.'
                    : 'Health service codes approved by CHI. SBS includes ACHI codes (Australian Classification of Health Interventions) used for coding inpatient/admitted case procedures. Used for billing and claims.'}
                </p>
              </div>

              {/* SFDA Drug Codes */}
              <div className={`p-4 rounded-lg bg-muted/50 border ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge className="bg-info/20 text-info">SFDA</Badge>
                  <Badge className="bg-info/20 text-info">GTIN</Badge>
                </div>
                <h4 className="font-medium text-sm mb-1">
                  {isRTL ? 'أكواد الأدوية' : 'Drug Codes'}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {isRTL 
                    ? 'أكواد الأدوية من هيئة الغذاء والدواء (SFDA) وأكواد GTIN للتعريف العالمي للمنتجات الدوائية.'
                    : 'Drug codes from Saudi FDA and GTIN codes for global pharmaceutical product identification.'}
                </p>
              </div>

              {/* Drug Dictionary */}
              <div className={`p-4 rounded-lg bg-muted/50 border ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge className="bg-purple-500/20 text-purple-600">القاموس الدوائي</Badge>
                  <span className="text-xs text-muted-foreground">
                    {isRTL ? 'معتمد حديثاً' : 'Recently Approved'}
                  </span>
                </div>
                <h4 className="font-medium text-sm mb-1">
                  {isRTL ? 'القاموس الدوائي الوطني' : 'National Drug Dictionary'}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {isRTL 
                    ? 'نظام ترميز دوائي وطني معتمد حديثاً يوفر تصنيفاً موحداً للأدوية ويربط بين الأسماء التجارية والعلمية والتركيزات وأشكال الجرعات.'
                    : 'A recently approved national drug coding system providing unified drug classification linking trade names, scientific names, concentrations, and dosage forms.'}
                </p>
              </div>

              {/* LOINC */}
              <div className={`p-4 rounded-lg bg-muted/50 border ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge className="bg-orange-500/20 text-orange-600">LOINC</Badge>
                </div>
                <h4 className="font-medium text-sm mb-1">
                  {isRTL ? 'أكواد الفحوصات المخبرية والملاحظات السريرية' : 'Lab & Clinical Observations Codes'}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {isRTL 
                    ? 'المعرفات المنطقية للملاحظات والأسماء والأكواد (LOINC). تستخدم لترميز الفحوصات المخبرية والقياسات السريرية والتقارير الطبية بشكل موحد عالمياً.'
                    : 'Logical Observation Identifiers Names and Codes. Used for coding laboratory tests, clinical measurements, and medical reports in a globally standardized manner.'}
                </p>
              </div>

              {/* ADA Dental Codes */}
              <div className={`p-4 rounded-lg bg-muted/50 border ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge className="bg-cyan-500/20 text-cyan-600">ADA</Badge>
                  <span className="text-xs text-muted-foreground">
                    {isRTL ? 'مطالبات القطاع الخاص' : 'Private Sector Claims'}
                  </span>
                </div>
                <h4 className="font-medium text-sm mb-1">
                  {isRTL ? 'أكواد الأسنان الأمريكية' : 'ADA Dental Codes'}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {isRTL 
                    ? 'أكواد جمعية طب الأسنان الأمريكية (ADA CDT). تستخدم لترميز خدمات الأسنان في مطالبات القطاع الخاص لمستشفيات وزارة الصحة.'
                    : 'American Dental Association codes (ADA CDT). Used for coding dental services in private sector claims to Ministry of Health hospitals.'}
                </p>
              </div>

              {/* ICD-10 Mortality */}
              <div className={`p-4 rounded-lg bg-muted/50 border ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge className="bg-red-500/20 text-red-600">ICD-10</Badge>
                  <span className="text-xs text-muted-foreground">
                    {isRTL ? 'توصيات WHO' : 'WHO Recommendations'}
                  </span>
                </div>
                <h4 className="font-medium text-sm mb-1">
                  {isRTL ? 'أكواد أسباب الوفاة' : 'Mortality Cause Codes'}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {isRTL 
                    ? 'يُعتمد نظام ICD-10 لترميز أسباب الوفاة وفقاً لتوصيات منظمة الصحة العالمية (WHO). يستخدم في شهادات الوفاة والإحصاءات الحيوية.'
                    : 'ICD-10 is used for coding causes of death per WHO recommendations. Used in death certificates and vital statistics.'}
                </p>
              </div>

              {/* SNOMED-CT */}
              <div className={`p-4 rounded-lg bg-muted/50 border md:col-span-2 lg:col-span-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge className="bg-warning/20 text-warning">SNOMED-CT</Badge>
                  <span className="text-xs text-muted-foreground">
                    {isRTL ? 'معتمد رسمياً' : 'Officially Approved'}
                  </span>
                </div>
                <h4 className="font-medium text-sm mb-1">
                  {isRTL ? 'المصطلحات الطبية السريرية' : 'Clinical Medical Terminology'}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {isRTL 
                    ? 'نظام مصطلحات طبية شامل معتمد للتوثيق السريري، يستخدم في السجلات الطبية الإلكترونية ومنصة نفيس.'
                    : 'Comprehensive medical terminology approved for clinical documentation, used in EMR and NAPHIES platform.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Suggested Questions */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Search className="h-5 w-5 text-primary" />
                {isRTL ? 'أسئلة مقترحة' : 'Suggested Questions'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {suggestedQuestions[isRTL ? 'ar' : 'en'].map((question, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className={`w-full text-sm h-auto py-2 px-3 ${isRTL ? 'text-right' : 'justify-start text-left'}`}
                    onClick={() => handleSend(question)}
                  >
                    <FileCode className={`h-4 w-4 shrink-0 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    <span className={`line-clamp-2 ${isRTL ? 'text-right' : 'text-left'}`}>{question}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2 text-base">
                <Stethoscope className="h-5 w-5 text-primary" />
                {isRTL ? 'محادثة الترميز' : 'Coding Chat'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px] p-4">
                {messages.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-center">
                    <div>
                      <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground text-sm">
                        {isRTL 
                          ? 'اسأل عن أي كود طبي أو خدمة صحية'
                          : 'Ask about any medical code or health service'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex gap-3 ${message.role === 'user' ? (isRTL ? 'flex-row-reverse' : '') : (isRTL ? '' : '')}`}
                      >
                        <div className={`p-2 rounded-full ${message.role === 'user' ? 'bg-primary' : 'bg-muted'} shrink-0`}>
                          {message.role === 'user' ? (
                            <User className="h-4 w-4 text-primary-foreground" />
                          ) : (
                            <Bot className="h-4 w-4" />
                          )}
                        </div>
                        <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                          <div className={`inline-block p-3 rounded-lg ${
                            message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                          }`}>
                            <div className="text-sm whitespace-pre-wrap">
                              {message.role === 'assistant' 
                                ? parseMessageContent(message.content, isRTL)
                                : message.content
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className={`flex gap-3 ${isRTL ? '' : ''}`}>
                        <div className="p-2 rounded-full bg-muted shrink-0">
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
                    placeholder={isRTL ? 'اكتب سؤالك عن الترميز الطبي...' : 'Type your medical coding question...'}
                    className={`flex-1 ${isRTL ? 'text-right' : ''}`}
                    disabled={isLoading}
                  />
                  <Button type="submit" disabled={isLoading || !input.trim()}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MedicalCodingAssistant;
