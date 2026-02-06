import { useState, useRef, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  FileText, 
  Loader2, 
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Target,
  Shield,
  MessageSquare,
  Sparkles,
  Copy,
  RotateCcw,
  X,
  FileDown,
  BarChart3,
  Heart,
  Users,
  Lightbulb,
  AlertTriangle,
  Building2,
  Network,
  Star,
  ThumbsUp,
  ThumbsDown,
  Stethoscope,
  Activity
} from 'lucide-react';
import { toast } from 'sonner';
import { generateQuoteAnalysisReport } from '@/utils/pdfExport';
import { trackServiceUsage, SERVICES } from '@/lib/serviceTracking';

interface QuoteAnalyzerProps {
  employeeCount: number;
  onAnalysisComplete?: (analysis: string) => void;
}

// Parse analysis content into sections
const parseAnalysisSections = (content: string) => {
  const sections: Record<string, string> = {};
  
  // Define section markers
  const sectionMarkers = [
    { key: 'summary', patterns: ['ملخص العرض', '1️⃣', 'Quote Summary'] },
    { key: 'price', patterns: ['تحليل السعر', '2️⃣', 'Price Analysis'] },
    { key: 'benefits', patterns: ['مقارنة المنافع', '3️⃣', 'Benefits Comparison'] },
    { key: 'network', patterns: ['شبكة المقدمين', '4️⃣', 'Provider Network'] },
    { key: 'strengths', patterns: ['نقاط القوة', '5️⃣', 'Strengths'] },
    { key: 'weaknesses', patterns: ['نقاط الضعف', '6️⃣', 'Weaknesses', 'التفاوض'] },
    { key: 'quality', patterns: ['ترفع الجودة', '7️⃣', 'Quality Improvement'] },
    { key: 'population', patterns: ['الصحة السكانية', '8️⃣', 'Population Health'] },
    { key: 'rating', patterns: ['التقييم النهائي', '9️⃣', 'Final Rating'] },
    { key: 'recommendation', patterns: ['التوصية النهائية', '🎯', 'Final Recommendation'] }
  ];

  let currentSection = 'full';
  const lines = content.split('\n');
  let currentContent: string[] = [];

  lines.forEach(line => {
    let foundSection = false;
    for (const marker of sectionMarkers) {
      if (marker.patterns.some(p => line.includes(p))) {
        if (currentContent.length > 0) {
          sections[currentSection] = currentContent.join('\n').trim();
        }
        currentSection = marker.key;
        currentContent = [line];
        foundSection = true;
        break;
      }
    }
    if (!foundSection) {
      currentContent.push(line);
    }
  });

  if (currentContent.length > 0) {
    sections[currentSection] = currentContent.join('\n').trim();
  }

  sections.full = content;
  return sections;
};

export const QuoteAnalyzer = ({ employeeCount, onAnalysisComplete }: QuoteAnalyzerProps) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState('');
  const [streamedContent, setStreamedContent] = useState('');
  const [activeResultTab, setActiveResultTab] = useState('overview');
  const abortControllerRef = useRef<AbortController | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error(isRTL ? 'الرجاء اختيار ملف PDF فقط' : 'Please select a PDF file only');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error(isRTL ? 'حجم الملف يتجاوز 10 ميجابايت' : 'File size exceeds 10MB');
        return;
      }
      setSelectedFile(file);
      setAnalysis('');
      setStreamedContent('');
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error(isRTL ? 'الرجاء اختيار ملف PDF فقط' : 'Please select a PDF file only');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error(isRTL ? 'حجم الملف يتجاوز 10 ميجابايت' : 'File size exceeds 10MB');
        return;
      }
      setSelectedFile(file);
      setAnalysis('');
      setStreamedContent('');
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast.error(isRTL ? 'الرجاء رفع ملف العرض السعري' : 'Please upload the quote file');
      return;
    }

    setIsAnalyzing(true);
    setAnalysis('');
    setStreamedContent('');
    
    trackServiceUsage({ serviceName: SERVICES.QUOTE_ANALYZER, serviceCategory: 'calculator' });
    
    abortControllerRef.current = new AbortController();

    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          const base64Data = result.split(',')[1];
          resolve(base64Data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(selectedFile);
      });

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-quote`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            pdfBase64: base64,
            fileName: selectedFile.name,
            employeeCount,
            language
          }),
          signal: abortControllerRef.current.signal
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 429) {
          toast.error(isRTL ? 'تم تجاوز حد الطلبات. يرجى المحاولة لاحقاً.' : 'Rate limit exceeded. Please try again later.');
        } else if (response.status === 402) {
          toast.error(isRTL ? 'يرجى إضافة رصيد للحساب.' : 'Payment required. Please add credits.');
        } else {
          toast.error(errorData.error || (isRTL ? 'حدث خطأ أثناء التحليل' : 'Error during analysis'));
        }
        setIsAnalyzing(false);
        return;
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let fullContent = '';

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
              fullContent += content;
              setStreamedContent(fullContent);
            }
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      setAnalysis(fullContent);
      onAnalysisComplete?.(fullContent);
      toast.success(isRTL ? 'تم تحليل العرض بنجاح' : 'Quote analyzed successfully');
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        toast.info(isRTL ? 'تم إلغاء التحليل' : 'Analysis cancelled');
      } else {
        console.error('Analysis error:', error);
        toast.error(isRTL ? 'حدث خطأ أثناء التحليل' : 'Error during analysis');
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCancel = () => {
    abortControllerRef.current?.abort();
    setIsAnalyzing(false);
  };

  const handleCopyAnalysis = () => {
    navigator.clipboard.writeText(analysis || streamedContent);
    toast.success(isRTL ? 'تم نسخ التحليل' : 'Analysis copied');
  };

  const handleReset = () => {
    setSelectedFile(null);
    setAnalysis('');
    setStreamedContent('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleExportPDF = async () => {
    if (!displayContent || !selectedFile) return;
    
    try {
      await generateQuoteAnalysisReport({
        fileName: selectedFile.name,
        analysisContent: displayContent,
        language: language as 'ar' | 'en'
      });
      toast.success(isRTL ? 'تم تصدير التقرير بنجاح' : 'Report exported successfully');
    } catch (error) {
      console.error('PDF export error:', error);
      toast.error(isRTL ? 'حدث خطأ أثناء التصدير' : 'Error exporting report');
    }
  };

  const displayContent = analysis || streamedContent;
  const parsedSections = useMemo(() => parseAnalysisSections(displayContent), [displayContent]);

  // Section renderer with proper formatting
  const renderSectionContent = (content: string) => {
    return (
      <div 
        className={`prose prose-sm max-w-none ${isRTL ? 'prose-headings:text-right prose-p:text-right prose-ul:text-right prose-ol:text-right' : ''}`}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="whitespace-pre-wrap text-sm leading-relaxed">
          {content}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* File Upload Section */}
      <Card dir={isRTL ? 'rtl' : 'ltr'}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            <span>{isRTL ? 'رفع العرض السعري' : 'Upload Quote'}</span>
          </CardTitle>
          <CardDescription className="mt-2 leading-relaxed">
            {isRTL 
              ? 'خدمة ذكية تمكّن صاحب العمل من تحليل العروض السعرية المقدمة من شركات التأمين الصحي ومقارنتها بمتوسط أسعار السوق وحزمة المنافع الأساسية. يقدم التحليل توصيات مبنية على بيانات صحة السكان لتحسين صحة المستفيدين من خلال برامج وقائية وإدارة الأمراض المزمنة، مما يرفع جودة وكفاءة الرعاية الصحية ويقلل معدلات استخدام الوثيقة (Loss Ratio) - وبالتالي يخفض نسب التضخم السنوي في الأقساط ويحقق وفورات مستدامة على المدى الطويل.'
              : 'A smart service that enables employers to analyze health insurance quotes from insurance companies and compare them with market average prices and the basic benefits package. The analysis provides recommendations based on population health data to improve beneficiary health through preventive programs and chronic disease management, thereby enhancing healthcare quality and efficiency while reducing policy utilization (Loss Ratio) - ultimately lowering annual premium inflation rates and achieving sustainable long-term savings.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${selectedFile 
                ? 'border-primary bg-primary/5' 
                : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50'
              }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            {selectedFile ? (
              <div className={`flex items-center justify-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <FileText className="h-10 w-10 text-primary" />
                <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                  <p className="font-medium text-foreground">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                  className="shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="h-10 w-10 mx-auto text-muted-foreground" />
                <p className="text-muted-foreground">
                  {isRTL 
                    ? 'اسحب ملف PDF هنا أو انقر للاختيار'
                    : 'Drag and drop a PDF file here or click to select'}
                </p>
                <p className="text-xs text-muted-foreground/70">
                  {isRTL ? 'الحد الأقصى: 10 ميجابايت' : 'Max size: 10MB'}
                </p>
              </div>
            )}
          </div>

          <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Button 
              onClick={handleAnalyze} 
              disabled={isAnalyzing || !selectedFile}
              className={`flex-1 gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {isRTL ? 'جاري التحليل...' : 'Analyzing...'}
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  {isRTL ? 'تحليل العرض' : 'Analyze Quote'}
                </>
              )}
            </Button>
            
            {isAnalyzing && (
              <Button variant="outline" onClick={handleCancel}>
                {isRTL ? 'إلغاء' : 'Cancel'}
              </Button>
            )}
            
            {displayContent && !isAnalyzing && (
              <Button variant="outline" onClick={handleReset} className={`gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <RotateCcw className="h-4 w-4" />
                {isRTL ? 'إعادة' : 'Reset'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Analysis Result - Enhanced Display */}
      {displayContent && (
        <Card>
          <CardHeader className="pb-3">
            <div className={`flex justify-between items-center w-full ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                <CardTitle className={`inline-flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <span>{isRTL ? 'نتيجة التحليل' : 'Analysis Result'}</span>
                  {isAnalyzing && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                </CardTitle>
              </div>
              <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Button variant="outline" size="sm" onClick={handleCopyAnalysis} className={`gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Copy className="h-4 w-4" />
                  <span className="hidden sm:inline">{isRTL ? 'نسخ' : 'Copy'}</span>
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportPDF} className={`gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <FileDown className="h-4 w-4" />
                  <span className="hidden sm:inline">{isRTL ? 'تصدير PDF' : 'Export PDF'}</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeResultTab} onValueChange={setActiveResultTab} dir={isRTL ? 'rtl' : 'ltr'}>
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="overview" className={`gap-1 text-xs sm:text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">{isRTL ? 'ملخص' : 'Overview'}</span>
                </TabsTrigger>
                <TabsTrigger value="comparison" className={`gap-1 text-xs sm:text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">{isRTL ? 'مقارنة' : 'Compare'}</span>
                </TabsTrigger>
                <TabsTrigger value="recommendations" className={`gap-1 text-xs sm:text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Lightbulb className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">{isRTL ? 'توصيات' : 'Tips'}</span>
                </TabsTrigger>
                <TabsTrigger value="full" className={`gap-1 text-xs sm:text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">{isRTL ? 'كامل' : 'Full'}</span>
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Quote Summary */}
                  <Card className="border-primary/20">
                    <CardHeader className="pb-2">
                      <CardTitle className={`text-sm flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Building2 className="h-4 w-4 text-primary" />
                        {isRTL ? 'ملخص العرض' : 'Quote Summary'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[200px]">
                        {parsedSections.summary ? renderSectionContent(parsedSections.summary) : (
                          <p className="text-sm text-muted-foreground">
                            {isRTL ? 'جاري تحليل ملخص العرض...' : 'Analyzing quote summary...'}
                          </p>
                        )}
                      </ScrollArea>
                    </CardContent>
                  </Card>

                  {/* Price Analysis */}
                  <Card className="border-success/20">
                    <CardHeader className="pb-2">
                      <CardTitle className={`text-sm flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <TrendingUp className="h-4 w-4 text-success" />
                        {isRTL ? 'تحليل السعر' : 'Price Analysis'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[200px]">
                        {parsedSections.price ? renderSectionContent(parsedSections.price) : (
                          <p className="text-sm text-muted-foreground">
                            {isRTL ? 'جاري تحليل السعر...' : 'Analyzing price...'}
                          </p>
                        )}
                      </ScrollArea>
                    </CardContent>
                  </Card>

                  {/* Strengths */}
                  <Card className="border-success/20 bg-success/5">
                    <CardHeader className="pb-2">
                      <CardTitle className={`text-sm flex items-center gap-2 text-success ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <ThumbsUp className="h-4 w-4" />
                        {isRTL ? 'نقاط القوة' : 'Strengths'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[180px]">
                        {parsedSections.strengths ? renderSectionContent(parsedSections.strengths) : (
                          <p className="text-sm text-muted-foreground">
                            {isRTL ? 'جاري التحليل...' : 'Analyzing...'}
                          </p>
                        )}
                      </ScrollArea>
                    </CardContent>
                  </Card>

                  {/* Weaknesses */}
                  <Card className="border-destructive/20 bg-destructive/5">
                    <CardHeader className="pb-2">
                      <CardTitle className={`text-sm flex items-center gap-2 text-destructive ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <ThumbsDown className="h-4 w-4" />
                        {isRTL ? 'نقاط الضعف والتفاوض' : 'Weaknesses & Negotiation'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[180px]">
                        {parsedSections.weaknesses ? renderSectionContent(parsedSections.weaknesses) : (
                          <p className="text-sm text-muted-foreground">
                            {isRTL ? 'جاري التحليل...' : 'Analyzing...'}
                          </p>
                        )}
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>

                {/* Final Rating & Recommendation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-warning/20 bg-warning/5">
                    <CardHeader className="pb-2">
                      <CardTitle className={`text-sm flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Star className="h-4 w-4 text-warning" />
                        {isRTL ? 'التقييم النهائي' : 'Final Rating'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[150px]">
                        {parsedSections.rating ? renderSectionContent(parsedSections.rating) : (
                          <p className="text-sm text-muted-foreground">
                            {isRTL ? 'جاري التقييم...' : 'Rating...'}
                          </p>
                        )}
                      </ScrollArea>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/30 bg-primary/5">
                    <CardHeader className="pb-2">
                      <CardTitle className={`text-sm flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Target className="h-4 w-4 text-primary" />
                        {isRTL ? 'التوصية النهائية' : 'Final Recommendation'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[150px]">
                        {parsedSections.recommendation ? renderSectionContent(parsedSections.recommendation) : (
                          <p className="text-sm text-muted-foreground">
                            {isRTL ? 'جاري إعداد التوصية...' : 'Preparing recommendation...'}
                          </p>
                        )}
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Comparison Tab */}
              <TabsContent value="comparison" className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className={`text-sm flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Shield className="h-4 w-4 text-primary" />
                      {isRTL ? 'مقارنة المنافع مع الحزمة الأساسية' : 'Benefits Comparison with Basic Package'}
                    </CardTitle>
                    <CardDescription>
                      {isRTL 
                        ? '✅ مطابق | ⬆️ أعلى من الحد | ⚠️ أقل من الحد | ❌ غير مغطى'
                        : '✅ Compliant | ⬆️ Above Minimum | ⚠️ Below Minimum | ❌ Not Covered'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px]">
                      {parsedSections.benefits ? renderSectionContent(parsedSections.benefits) : (
                        <p className="text-sm text-muted-foreground">
                          {isRTL ? 'جاري مقارنة المنافع...' : 'Comparing benefits...'}
                        </p>
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className={`text-sm flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Network className="h-4 w-4 text-primary" />
                      {isRTL ? 'تحليل شبكة المقدمين' : 'Provider Network Analysis'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[200px]">
                      {parsedSections.network ? renderSectionContent(parsedSections.network) : (
                        <p className="text-sm text-muted-foreground">
                          {isRTL ? 'جاري تحليل الشبكة...' : 'Analyzing network...'}
                        </p>
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Recommendations Tab */}
              <TabsContent value="recommendations" className="space-y-4">
                {/* Quality Improvement */}
                <Card className="border-info/20">
                  <CardHeader className="pb-2">
                    <CardTitle className={`text-sm flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Lightbulb className="h-4 w-4 text-info" />
                      {isRTL ? 'اقتراحات ترفع الجودة دون زيادة سعرية' : 'Quality Improvements Without Price Increase'}
                    </CardTitle>
                    <CardDescription>
                      {isRTL 
                        ? 'نقاط تفاوض يمكن طلبها من شركة التأمين لتحسين العرض'
                        : 'Negotiation points to request from the insurer to improve the offer'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[250px]">
                      {parsedSections.quality ? renderSectionContent(parsedSections.quality) : (
                        <p className="text-sm text-muted-foreground">
                          {isRTL ? 'جاري إعداد الاقتراحات...' : 'Preparing suggestions...'}
                        </p>
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Population Health Recommendations */}
                <Card className="border-success/20 bg-success/5">
                  <CardHeader className="pb-2">
                    <CardTitle className={`text-sm flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Heart className="h-4 w-4 text-success" />
                      {isRTL ? 'توصيات الصحة السكانية' : 'Population Health Recommendations'}
                    </CardTitle>
                    <CardDescription>
                      {isRTL 
                        ? 'برامج لتحسين صحة الموظفين وتقليل استخدام الوثيقة على المدى الطويل'
                        : 'Programs to improve employee health and reduce policy utilization long-term'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[250px]">
                      {parsedSections.population ? renderSectionContent(parsedSections.population) : (
                        <p className="text-sm text-muted-foreground">
                          {isRTL ? 'جاري إعداد التوصيات...' : 'Preparing recommendations...'}
                        </p>
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Loss Ratio Reduction Tips */}
                <Card className="border-warning/20 bg-warning/5">
                  <CardHeader className="pb-2">
                    <CardTitle className={`text-sm flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <TrendingDown className="h-4 w-4 text-warning" />
                      {isRTL ? 'نصائح لتقليل نسبة الاستهلاك (Loss Ratio)' : 'Tips to Reduce Loss Ratio'}
                    </CardTitle>
                    <CardDescription>
                      {isRTL 
                        ? 'استراتيجيات لخفض نسبة الخسائر وتقليل التضخم السنوي في الأقساط'
                        : 'Strategies to reduce loss ratio and minimize annual premium inflation'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className={`space-y-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {[
                        {
                          icon: Stethoscope,
                          ar: 'تعزيز الرعاية الأولية: توجيه الموظفين للعيادات الأولية قبل المتخصصين يقلل التكاليف بنسبة 10-15%',
                          en: 'Strengthen Primary Care: Directing employees to primary care before specialists reduces costs by 10-15%'
                        },
                        {
                          icon: Activity,
                          ar: 'إدارة الأمراض المزمنة: برامج متابعة مرضى السكري والضغط تقلل المضاعفات والتنويم بنسبة 20-30%',
                          en: 'Chronic Disease Management: Diabetes and hypertension follow-up programs reduce complications and hospitalizations by 20-30%'
                        },
                        {
                          icon: Target,
                          ar: 'الفحوصات الوقائية: الكشف المبكر يقلل تكاليف العلاج المتأخر بنسبة 15-25%',
                          en: 'Preventive Screenings: Early detection reduces late-stage treatment costs by 15-25%'
                        },
                        {
                          icon: Users,
                          ar: 'برامج العافية: تشجيع النشاط البدني والتغذية السليمة يقلل الإصابات والأمراض',
                          en: 'Wellness Programs: Encouraging physical activity and healthy nutrition reduces illness and injuries'
                        },
                        {
                          icon: AlertTriangle,
                          ar: 'مراقبة الاستخدام غير الضروري: تقليل زيارات الطوارئ غير الطارئة والفحوصات المكررة',
                          en: 'Monitor Unnecessary Utilization: Reduce non-emergency ER visits and duplicate tests'
                        }
                      ].map((tip, i) => (
                        <div key={i} className={`flex items-start gap-3 p-3 rounded-lg bg-background border ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <tip.icon className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                          <p className="text-sm">{isRTL ? tip.ar : tip.en}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Full Analysis Tab */}
              <TabsContent value="full">
                <ScrollArea className="h-[600px]">
                  {renderSectionContent(displayContent)}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Quick Tips - When no analysis */}
      {!displayContent && (
        <Card className="bg-muted/30" dir={isRTL ? 'rtl' : 'ltr'}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Target className="h-4 w-4 text-primary" />
              <span>{isRTL ? 'نصائح للحصول على أفضل تحليل' : 'Tips for Best Analysis'}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { 
                  icon: FileText, 
                  ar: 'ارفع العرض السعري الكامل بصيغة PDF', 
                  en: 'Upload the complete quote in PDF format' 
                },
                { 
                  icon: Shield, 
                  ar: 'تأكد أن الملف يحتوي على جدول المنافع', 
                  en: 'Ensure the file contains the benefits table' 
                },
                { 
                  icon: TrendingUp, 
                  ar: 'العروض من شركات معروفة تحلل بدقة أعلى', 
                  en: 'Quotes from known insurers are analyzed more accurately' 
                },
                { 
                  icon: CheckCircle2, 
                  ar: 'يتم مقارنة العرض بحزمة المنافع الأساسية الإلزامية', 
                  en: 'The quote is compared to the mandatory basic benefits package' 
                }
              ].map((tip, i) => (
                <div 
                  key={i}
                  className="flex items-start gap-2 p-3 rounded-lg bg-background"
                >
                  <tip.icon className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">{isRTL ? tip.ar : tip.en}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
