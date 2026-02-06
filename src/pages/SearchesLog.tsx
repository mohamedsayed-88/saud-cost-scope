import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { 
  Search, 
  Trash2, 
  Calendar,
  FileCheck,
  Loader2,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

interface SearchLog {
  id: string;
  created_at: string;
  query: string;
  results_count: number;
  found_results: any[];
  suggestions: string[];
  session_id: string | null;
  user_agent: string | null;
}

const SearchesLog = () => {
  const { language, isRTL } = useLanguage();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [searches, setSearches] = useState<SearchLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    if (isAdmin) {
      fetchSearches();
    }
  }, [isAdmin]);

  const fetchSearches = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('prior_auth_searches' as any)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500);

    if (!error && data) {
      setSearches(data as unknown as SearchLog[]);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('prior_auth_searches' as any)
      .delete()
      .eq('id', id);

    if (!error) {
      setSearches(searches.filter(s => s.id !== id));
    }
  };

  const filteredSearches = searches.filter(s =>
    s.query.toLowerCase().includes(searchFilter.toLowerCase())
  );

  // Redirect if not admin
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      {/* Hero */}
      <section className="relative py-8 overflow-hidden gradient-hero">
        <div className="absolute inset-0 chi-pattern" />
        <div className="container mx-auto px-4 relative">
          <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="p-3 rounded-xl bg-primary-foreground/10">
              <Search className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h1 className="text-2xl sm:text-3xl font-bold text-primary-foreground">
                {isRTL ? 'سجل عمليات البحث' : 'Search Logs'}
              </h1>
              <p className="text-sm text-primary-foreground/70 mt-1">
                {isRTL ? 'عرض جميع عمليات البحث عن الخدمات والأدوية' : 'View all service and drug search queries'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={isRTL ? 'text-right' : ''}>
                  <p className="text-sm text-muted-foreground">
                    {isRTL ? 'إجمالي عمليات البحث' : 'Total Searches'}
                  </p>
                  <p className="text-2xl font-bold">{searches.length}</p>
                </div>
                <Search className="h-8 w-8 text-primary/50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={isRTL ? 'text-right' : ''}>
                  <p className="text-sm text-muted-foreground">
                    {isRTL ? 'بحث ناجح (نتائج)' : 'Successful (With Results)'}
                  </p>
                  <p className="text-2xl font-bold text-success">
                    {searches.filter(s => s.results_count > 0).length}
                  </p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-success/50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={isRTL ? 'text-right' : ''}>
                  <p className="text-sm text-muted-foreground">
                    {isRTL ? 'بحث بدون نتائج' : 'No Results Found'}
                  </p>
                  <p className="text-2xl font-bold text-warning">
                    {searches.filter(s => s.results_count === 0).length}
                  </p>
                </div>
                <XCircle className="h-8 w-8 text-warning/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Filter */}
        <Card className="mb-6">
          <CardContent className="pt-4">
            <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Input
                placeholder={isRTL ? 'ابحث في السجلات...' : 'Search logs...'}
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className={isRTL ? 'text-right' : ''}
              />
              <Button variant="outline" onClick={fetchSearches}>
                <Loader2 className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Searches List */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
              <FileCheck className="h-5 w-5 text-primary" />
              {isRTL ? `سجل البحث (${filteredSearches.length})` : `Search Log (${filteredSearches.length})`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredSearches.length > 0 ? (
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {filteredSearches.map((search) => (
                  <div
                    key={search.id}
                    className={`p-4 rounded-lg border ${search.results_count > 0 ? 'border-success/30 bg-success/5' : 'border-warning/30 bg-warning/5'}`}
                  >
                    <div className={`flex items-start justify-between gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
                        <p className="font-semibold text-lg">{search.query}</p>
                        <div className={`flex items-center gap-2 mt-2 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <Badge variant={search.results_count > 0 ? 'default' : 'secondary'}>
                            {search.results_count} {isRTL ? 'نتيجة' : 'results'}
                          </Badge>
                          <div className={`flex items-center gap-1 text-xs text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Calendar className="h-3 w-3" />
                            {format(new Date(search.created_at), 'PPpp', { locale: isRTL ? ar : undefined })}
                          </div>
                        </div>
                        {search.results_count > 0 && search.found_results && (
                          <div className="mt-3">
                            <p className="text-xs text-muted-foreground mb-1">
                              {isRTL ? 'النتائج:' : 'Results:'}
                            </p>
                            <div className={`flex flex-wrap gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                              {search.found_results.slice(0, 5).map((r: any, i: number) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {isRTL ? r.nameAr : r.nameEn}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        {search.results_count === 0 && search.suggestions && search.suggestions.length > 0 && (
                          <div className="mt-3">
                            <p className="text-xs text-muted-foreground mb-1">
                              {isRTL ? 'الاقتراحات:' : 'Suggestions:'}
                            </p>
                            <p className="text-xs text-warning">{search.suggestions[0]}</p>
                          </div>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(search.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-muted-foreground">
                  {isRTL ? 'لا توجد عمليات بحث مسجلة' : 'No search logs found'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SearchesLog;
