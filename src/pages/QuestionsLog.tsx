import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { MessageSquare, Trash2, Loader2, LogOut, Calendar, Globe, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';

interface QuestionLog {
  id: string;
  question: string;
  source: string;
  language: string;
  created_at: string;
}

export default function QuestionsLog() {
  const { language, isRTL } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, loading, isAdmin, signOut } = useAuth();
  const [questions, setQuestions] = useState<QuestionLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchQuestions();
    }
  }, [user, isAdmin]);

  const fetchQuestions = async () => {
    setIsLoading(true);
    console.log('Fetching questions... User:', user?.email, 'isAdmin:', isAdmin);
    try {
      const { data, error } = await supabase
        .from('questions_log')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('Questions fetched:', data?.length, 'Error:', error);
      
      if (error) {
        console.error('Error fetching questions:', error);
        toast({
          title: language === 'ar' ? 'خطأ' : 'Error',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      setQuestions(data || []);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('questions_log')
        .delete()
        .eq('id', id);

      if (error) {
        toast({
          title: language === 'ar' ? 'خطأ' : 'Error',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      setQuestions(prev => prev.filter(q => q.id !== id));
      toast({
        title: language === 'ar' ? 'تم الحذف' : 'Deleted',
        description: language === 'ar' ? 'تم حذف السؤال بنجاح' : 'Question deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const filteredQuestions = questions.filter(q =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSourceLabel = (source: string) => {
    const sources: Record<string, { ar: string; en: string }> = {
      smart_assistant: { ar: 'المساعد الذكي', en: 'Smart Assistant' },
      collapsible_chat: { ar: 'الدردشة المنبثقة', en: 'Collapsible Chat' },
    };
    return sources[source]?.[language] || source;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
        <Header />
        <main className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <Card className="w-full max-w-md text-center">
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-4">
                {language === 'ar' ? 'ليس لديك صلاحية الوصول لهذه الصفحة' : 'You do not have permission to access this page'}
              </p>
              <Button onClick={() => navigate('/')}>
                {language === 'ar' ? 'العودة للرئيسية' : 'Go Home'}
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              {language === 'ar' ? 'سجل الأسئلة' : 'Questions Log'}
            </CardTitle>
            <Button variant="outline" onClick={handleSignOut} className="gap-2">
              <LogOut className="h-4 w-4" />
              {language === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
                <Input
                  placeholder={language === 'ar' ? 'البحث في الأسئلة...' : 'Search questions...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={isRTL ? 'pr-10' : 'pl-10'}
                />
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredQuestions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {language === 'ar' ? 'لا توجد أسئلة مسجلة' : 'No questions logged yet'}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className={isRTL ? 'text-right' : 'text-left'}>
                        {language === 'ar' ? 'السؤال' : 'Question'}
                      </TableHead>
                      <TableHead className={isRTL ? 'text-right' : 'text-left'}>
                        {language === 'ar' ? 'المصدر' : 'Source'}
                      </TableHead>
                      <TableHead className={isRTL ? 'text-right' : 'text-left'}>
                        {language === 'ar' ? 'اللغة' : 'Language'}
                      </TableHead>
                      <TableHead className={isRTL ? 'text-right' : 'text-left'}>
                        {language === 'ar' ? 'التاريخ' : 'Date'}
                      </TableHead>
                      <TableHead className="w-[80px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredQuestions.map((q) => (
                      <TableRow key={q.id}>
                        <TableCell className="max-w-[300px] truncate" title={q.question}>
                          {q.question}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{getSourceLabel(q.source)}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="gap-1">
                            <Globe className="h-3 w-3" />
                            {q.language === 'ar' ? 'عربي' : 'English'}
                          </Badge>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <span className="flex items-center gap-1 text-muted-foreground text-sm">
                            <Calendar className="h-3 w-3" />
                            {format(new Date(q.created_at), 'yyyy/MM/dd HH:mm', {
                              locale: language === 'ar' ? ar : undefined,
                            })}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(q.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            <div className="mt-4 text-sm text-muted-foreground">
              {language === 'ar'
                ? `إجمالي الأسئلة: ${filteredQuestions.length}`
                : `Total questions: ${filteredQuestions.length}`}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
