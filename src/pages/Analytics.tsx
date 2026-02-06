import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Users, 
  Eye, 
  Clock, 
  TrendingUp,
  Calendar,
  Globe,
  Smartphone,
  RefreshCw,
  Zap,
  Timer
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend,
  BarChart,
  Bar
} from 'recharts';

type DateFilter = 'today' | 'week' | 'month' | 'all';

interface PageViewStats {
  page_path: string;
  page_title: string | null;
  view_count: number;
  avg_time: number;
}

interface DailyStats {
  date: string;
  views: number;
  unique_sessions: number;
}

interface ServiceStats {
  service_name: string;
  service_category: string;
  usage_count: number;
}

interface CountryStats {
  country: string;
  views: number;
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

const Analytics = () => {
  const { language, isRTL } = useLanguage();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dateFilter, setDateFilter] = useState<DateFilter>('week');
  const [allPageViews, setAllPageViews] = useState<any[]>([]);
  const [allServiceUsage, setAllServiceUsage] = useState<any[]>([]);

  // Calculate date range based on filter
  const getDateRange = (filter: DateFilter): Date | null => {
    const now = new Date();
    switch (filter) {
      case 'today':
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
      case 'week':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      case 'month':
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      case 'all':
        return null;
    }
  };

  // Filter data based on date range
  const filteredPageViews = useMemo(() => {
    const dateRange = getDateRange(dateFilter);
    if (!dateRange) return allPageViews;
    return allPageViews.filter(view => new Date(view.created_at) >= dateRange);
  }, [allPageViews, dateFilter]);

  const filteredServiceUsage = useMemo(() => {
    const dateRange = getDateRange(dateFilter);
    if (!dateRange) return allServiceUsage;
    return allServiceUsage.filter(usage => new Date(usage.created_at) >= dateRange);
  }, [allServiceUsage, dateFilter]);

  // Calculate statistics from filtered data
  const stats = useMemo(() => {
    const totalViews = filteredPageViews.length;
    const uniqueSessionSet = new Set(filteredPageViews.map(s => s.session_id));
    const uniqueSessions = uniqueSessionSet.size;

    // Calculate average time spent
    const validTimes = filteredPageViews.filter(v => v.time_spent_seconds > 0);
    const totalTimeSpent = validTimes.reduce((sum, v) => sum + (v.time_spent_seconds || 0), 0);
    const avgTimeSpent = validTimes.length > 0 ? Math.round(totalTimeSpent / validTimes.length) : 0;

    // Page stats with time
    const pageCounts: Record<string, { count: number; title: string | null; totalTime: number; timeCount: number }> = {};
    filteredPageViews.forEach(view => {
      if (!pageCounts[view.page_path]) {
        pageCounts[view.page_path] = { count: 0, title: view.page_title, totalTime: 0, timeCount: 0 };
      }
      pageCounts[view.page_path].count++;
      if (view.time_spent_seconds > 0) {
        pageCounts[view.page_path].totalTime += view.time_spent_seconds;
        pageCounts[view.page_path].timeCount++;
      }
    });
    
    const pageStats = Object.entries(pageCounts)
      .map(([path, data]) => ({
        page_path: path,
        page_title: data.title,
        view_count: data.count,
        avg_time: data.timeCount > 0 ? Math.round(data.totalTime / data.timeCount) : 0
      }))
      .sort((a, b) => b.view_count - a.view_count);

    // Daily stats
    const dailyCounts: Record<string, { views: number; sessions: Set<string> }> = {};
    filteredPageViews.forEach(view => {
      const date = view.created_at.split('T')[0];
      if (!dailyCounts[date]) {
        dailyCounts[date] = { views: 0, sessions: new Set() };
      }
      dailyCounts[date].views++;
      if (view.session_id) {
        dailyCounts[date].sessions.add(view.session_id);
      }
    });

    const dailyStats = Object.entries(dailyCounts)
      .map(([date, data]) => ({
        date,
        views: data.views,
        unique_sessions: data.sessions.size
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Device stats
    let mobile = 0;
    let desktop = 0;
    let tablet = 0;
    
    filteredPageViews.forEach(view => {
      const ua = view.user_agent?.toLowerCase() || '';
      if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
        mobile++;
      } else if (ua.includes('tablet') || ua.includes('ipad')) {
        tablet++;
      } else {
        desktop++;
      }
    });

    const deviceStats = [
      { name: isRTL ? 'سطح المكتب' : 'Desktop', value: desktop },
      { name: isRTL ? 'الجوال' : 'Mobile', value: mobile },
      { name: isRTL ? 'التابلت' : 'Tablet', value: tablet }
    ].filter(d => d.value > 0);

    // Country stats
    const countryCounts: Record<string, number> = {};
    filteredPageViews.forEach(view => {
      const country = (view as any).country || (isRTL ? 'غير معروف' : 'Unknown');
      countryCounts[country] = (countryCounts[country] || 0) + 1;
    });

    const countryStats: CountryStats[] = Object.entries(countryCounts)
      .map(([country, views]) => ({ country, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10); // Top 10 countries

    // Service usage stats
    const serviceCounts: Record<string, { count: number; category: string }> = {};
    filteredServiceUsage.forEach(usage => {
      if (!serviceCounts[usage.service_name]) {
        serviceCounts[usage.service_name] = { count: 0, category: usage.service_category };
      }
      serviceCounts[usage.service_name].count++;
    });

    const serviceStats = Object.entries(serviceCounts)
      .map(([name, data]) => ({
        service_name: name,
        service_category: data.category,
        usage_count: data.count
      }))
      .sort((a, b) => b.usage_count - a.usage_count);

    // Service category stats
    const categoryCounts: Record<string, number> = {};
    filteredServiceUsage.forEach(usage => {
      categoryCounts[usage.service_category] = (categoryCounts[usage.service_category] || 0) + 1;
    });

    const categoryStats = Object.entries(categoryCounts)
      .map(([category, count]) => ({
        category,
        count
      }))
      .sort((a, b) => b.count - a.count);

    // Today's views (always from today regardless of filter)
    const today = new Date().toISOString().split('T')[0];
    const todayViews = allPageViews.filter(v => v.created_at.startsWith(today)).length;
    const totalServiceUsage = filteredServiceUsage.length;

    return {
      totalViews,
      uniqueSessions,
      todayViews,
      avgTimeSpent,
      totalServiceUsage,
      pageStats,
      dailyStats,
      deviceStats,
      countryStats,
      serviceStats,
      categoryStats
    };
  }, [filteredPageViews, filteredServiceUsage, allPageViews, isRTL]);

  const fetchAnalytics = async () => {
    try {
      const [pageViewsResult, serviceUsageResult] = await Promise.all([
        supabase.from('page_views').select('*').order('created_at', { ascending: false }),
        supabase.from('service_usage').select('*').order('created_at', { ascending: false })
      ]);
      
      setAllPageViews(pageViewsResult.data || []);
      setAllServiceUsage(serviceUsageResult.data || []);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      if (!user || !isAdmin) {
        navigate('/auth', { state: { from: '/admin/analytics' }, replace: true });
        return;
      }
      fetchAnalytics();
    }
  }, [user, isAdmin, authLoading, navigate]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchAnalytics();
  };

  const getPageName = (path: string, title: string | null) => {
    if (title) return title;
    const names: Record<string, { ar: string; en: string }> = {
      '/': { ar: 'الرئيسية', en: 'Home' },
      '/auth': { ar: 'تسجيل الدخول', en: 'Login' },
      '/insurance-categories': { ar: 'التغطية الإلزامية', en: 'Coverage' },
      '/insurance-eligibility': { ar: 'أهلية العلاج', en: 'Eligibility' },
      '/benefits-package': { ar: 'حزمة المنافع', en: 'Benefits' },
      '/employer-tools': { ar: 'أصحاب العمل', en: 'Employers' },
      '/drg-implementation': { ar: 'الحزم التشخيصية', en: 'DRG' },
      '/beneficiary-health': { ar: 'صحة المستفيدين', en: 'Health' },
      '/preventive-services': { ar: 'الخدمات الوقائية', en: 'Preventive' },
      '/primary-care': { ar: 'الرعاية الأولية', en: 'Primary Care' },
      '/prior-authorization': { ar: 'الموافقات المسبقة', en: 'Prior Auth' },
      '/fines-calculator': { ar: 'حاسبة الغرامات', en: 'Fines' },
      '/nafees-platform': { ar: 'نفيس', en: 'Nafees' },
      '/daman-intelligence': { ar: 'انتلجنس', en: 'Intelligence' },
    };
    return isRTL ? names[path]?.ar || path : names[path]?.en || path;
  };

  const getServiceName = (name: string) => {
    const names: Record<string, { ar: string; en: string }> = {
      'smart_assistant': { ar: 'المساعد الذكي', en: 'Smart Assistant' },
      'quote_analyzer': { ar: 'تحليل العروض', en: 'Quote Analyzer' },
      'savings_calculator': { ar: 'حاسبة القسط التأميني', en: 'Premium Calculator' },
      'fines_calculator': { ar: 'حاسبة الغرامات', en: 'Fines Calculator' },
      'sublimit_calculator': { ar: 'حاسبة الحدود', en: 'Sublimit Calculator' },
      'hale_calculator': { ar: 'حاسبة HALE', en: 'HALE Calculator' },
      'eligibility_check': { ar: 'فحص الأهلية', en: 'Eligibility Check' },
      'preventive_check': { ar: 'الخدمات الوقائية', en: 'Preventive Check' },
      'primary_care_assessment': { ar: 'تقييم الرعاية الأولية', en: 'Primary Care Assessment' },
      'drg_assessment': { ar: 'تقييم DRG', en: 'DRG Assessment' },
      'pdf_export': { ar: 'تصدير PDF', en: 'PDF Export' },
      'drug_search': { ar: 'البحث عن الأدوية', en: 'Drug Search' },
    };
    return isRTL ? names[name]?.ar || name : names[name]?.en || name;
  };

  const getCategoryName = (category: string) => {
    const names: Record<string, { ar: string; en: string }> = {
      'chat': { ar: 'المحادثة', en: 'Chat' },
      'calculator': { ar: 'الحاسبات', en: 'Calculators' },
      'checker': { ar: 'الفحص', en: 'Checkers' },
      'export': { ar: 'التصدير', en: 'Export' },
      'search': { ar: 'البحث', en: 'Search' },
      'other': { ar: 'أخرى', en: 'Other' },
    };
    return isRTL ? names[category]?.ar || category : names[category]?.en || category;
  };

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}${isRTL ? ' ث' : 's'}`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes < 60) return `${minutes}${isRTL ? ' د' : 'm'} ${remainingSeconds}${isRTL ? ' ث' : 's'}`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}${isRTL ? ' س' : 'h'} ${remainingMinutes}${isRTL ? ' د' : 'm'}`;
  };

  const dateFilterOptions: { value: DateFilter; labelAr: string; labelEn: string }[] = [
    { value: 'today', labelAr: 'اليوم', labelEn: 'Today' },
    { value: 'week', labelAr: 'الأسبوع', labelEn: 'Week' },
    { value: 'month', labelAr: 'الشهر', labelEn: 'Month' },
    { value: 'all', labelAr: 'الكل', labelEn: 'All' },
  ];

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-6 sm:py-8 overflow-hidden gradient-hero">
        <div className="absolute inset-0 chi-pattern" />
        <div className="container mx-auto px-3 sm:px-4 relative">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="p-2 rounded-lg bg-primary-foreground/10">
                <BarChart3 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-primary-foreground">
                  {isRTL ? 'إحصائيات الموقع' : 'Site Analytics'}
                </h1>
                <p className="text-xs text-primary-foreground/70">
                  {isRTL ? 'لوحة تحكم المسؤول' : 'Admin Dashboard'}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
              className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline mr-2">
                {isRTL ? 'تحديث' : 'Refresh'}
              </span>
            </Button>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-3 sm:px-4 py-6">
        {/* Date Filter */}
        <div className={`flex items-center gap-2 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {isRTL ? 'الفترة:' : 'Period:'}
          </span>
          <div className={`flex gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {dateFilterOptions.map((option) => (
              <Button
                key={option.value}
                variant={dateFilter === option.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDateFilter(option.value)}
                className="h-8 px-3 text-xs"
              >
                {isRTL ? option.labelAr : option.labelEn}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="p-2 rounded-lg bg-primary/10">
                  <Eye className="h-5 w-5 text-primary" />
                </div>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <p className="text-xs text-muted-foreground">
                    {isRTL ? 'الزيارات' : 'Views'}
                  </p>
                  <p className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="p-2 rounded-lg bg-success/10">
                  <Users className="h-5 w-5 text-success" />
                </div>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <p className="text-xs text-muted-foreground">
                    {isRTL ? 'الجلسات' : 'Sessions'}
                  </p>
                  <p className="text-2xl font-bold">{stats.uniqueSessions.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="p-2 rounded-lg bg-warning/10">
                  <Timer className="h-5 w-5 text-warning" />
                </div>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <p className="text-xs text-muted-foreground">
                    {isRTL ? 'متوسط الوقت' : 'Avg Time'}
                  </p>
                  <p className="text-2xl font-bold">{formatTime(stats.avgTimeSpent)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="p-2 rounded-lg bg-info/10">
                  <Zap className="h-5 w-5 text-info" />
                </div>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <p className="text-xs text-muted-foreground">
                    {isRTL ? 'الخدمات' : 'Services'}
                  </p>
                  <p className="text-2xl font-bold">{stats.totalServiceUsage.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="p-2 rounded-lg bg-destructive/10">
                  <Clock className="h-5 w-5 text-destructive" />
                </div>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <p className="text-xs text-muted-foreground">
                    {isRTL ? 'زيارات اليوم' : "Today"}
                  </p>
                  <p className="text-2xl font-bold">{stats.todayViews.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pages" className="space-y-6">
          <TabsList className={`grid w-full grid-cols-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <TabsTrigger value="pages">{isRTL ? 'الصفحات' : 'Pages'}</TabsTrigger>
            <TabsTrigger value="countries">{isRTL ? 'الدول' : 'Countries'}</TabsTrigger>
            <TabsTrigger value="services">{isRTL ? 'الخدمات' : 'Services'}</TabsTrigger>
            <TabsTrigger value="devices">{isRTL ? 'الأجهزة' : 'Devices'}</TabsTrigger>
          </TabsList>

          <TabsContent value="pages" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Daily Views Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 text-base ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Clock className="h-4 w-4 text-primary" />
                    {isRTL ? 'الزيارات اليومية' : 'Daily Views'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {stats.dailyStats.length > 0 ? (
                    <ResponsiveContainer width="100%" height={250}>
                      <AreaChart data={stats.dailyStats}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fontSize: 10 }}
                          tickFormatter={(date) => new Date(date).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', { day: 'numeric', month: 'short' })}
                        />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip 
                          labelFormatter={(date) => new Date(date).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}
                        />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="views" 
                          name={isRTL ? 'الزيارات' : 'Views'}
                          stroke="#10b981" 
                          fill="#10b98133"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="unique_sessions" 
                          name={isRTL ? 'الجلسات' : 'Sessions'}
                          stroke="#3b82f6" 
                          fill="#3b82f633"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                      {isRTL ? 'لا توجد بيانات' : 'No data available'}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Page Views Table */}
              <Card>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 text-base ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Globe className="h-4 w-4 text-primary" />
                    {isRTL ? 'أكثر الصفحات زيارة' : 'Top Pages'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {stats.pageStats.length > 0 ? (
                    <div className="space-y-2 max-h-[250px] overflow-y-auto">
                      {stats.pageStats.slice(0, 10).map((page, index) => (
                        <div 
                          key={page.page_path}
                          className={`flex items-center justify-between p-2 rounded-lg bg-muted/50 ${isRTL ? 'flex-row-reverse' : ''}`}
                        >
                          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Badge variant="outline" className="w-6 h-6 flex items-center justify-center rounded-full text-xs">
                              {index + 1}
                            </Badge>
                            <div className={isRTL ? 'text-right' : 'text-left'}>
                              <p className="font-medium text-xs">
                                {getPageName(page.page_path, page.page_title)}
                              </p>
                              {page.avg_time > 0 && (
                                <p className="text-[10px] text-muted-foreground">
                                  {isRTL ? 'متوسط: ' : 'Avg: '}{formatTime(page.avg_time)}
                                </p>
                              )}
                            </div>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {page.view_count.toLocaleString()}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground text-sm">
                      {isRTL ? 'لا توجد زيارات مسجلة بعد' : 'No page views recorded yet'}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Countries Tab */}
          <TabsContent value="countries" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Country Pie Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 text-base ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Globe className="h-4 w-4 text-primary" />
                    {isRTL ? 'توزيع الزوار حسب الدولة' : 'Visitors by Country'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {stats.countryStats.length > 0 ? (
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={stats.countryStats}
                          dataKey="views"
                          nameKey="country"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={({ country, percent }) => `${country} (${(percent * 100).toFixed(0)}%)`}
                          labelLine={false}
                        >
                          {stats.countryStats.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                      {isRTL ? 'لا توجد بيانات' : 'No data available'}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Country List */}
              <Card>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 text-base ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <TrendingUp className="h-4 w-4 text-primary" />
                    {isRTL ? 'أكثر الدول زيارة' : 'Top Countries'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {stats.countryStats.length > 0 ? (
                    <div className="space-y-2 max-h-[250px] overflow-y-auto">
                      {stats.countryStats.map((country, index) => (
                        <div 
                          key={country.country}
                          className={`flex items-center justify-between p-2 rounded-lg bg-muted/50 ${isRTL ? 'flex-row-reverse' : ''}`}
                        >
                          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Badge variant="outline" className="w-6 h-6 flex items-center justify-center rounded-full text-xs" style={{ backgroundColor: COLORS[index % COLORS.length] + '20', borderColor: COLORS[index % COLORS.length] }}>
                              {index + 1}
                            </Badge>
                            <span className="font-medium text-sm">{country.country}</span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {country.views.toLocaleString()}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground text-sm">
                      {isRTL ? 'لا توجد بيانات دول مسجلة بعد' : 'No country data recorded yet'}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Service Category Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 text-base ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Zap className="h-4 w-4 text-primary" />
                    {isRTL ? 'استخدام الخدمات حسب النوع' : 'Services by Category'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {stats.categoryStats.length > 0 ? (
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={stats.categoryStats.map(c => ({
                        ...c,
                        name: getCategoryName(c.category)
                      }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Bar dataKey="count" name={isRTL ? 'الاستخدام' : 'Usage'} fill="#10b981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                      {isRTL ? 'لا توجد بيانات' : 'No data available'}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Service Usage List */}
              <Card>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 text-base ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <TrendingUp className="h-4 w-4 text-primary" />
                    {isRTL ? 'أكثر الخدمات استخداماً' : 'Top Services'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {stats.serviceStats.length > 0 ? (
                    <div className="space-y-2 max-h-[250px] overflow-y-auto">
                      {stats.serviceStats.slice(0, 10).map((service, index) => (
                        <div 
                          key={service.service_name}
                          className={`flex items-center justify-between p-2 rounded-lg bg-muted/50 ${isRTL ? 'flex-row-reverse' : ''}`}
                        >
                          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Badge variant="outline" className="w-6 h-6 flex items-center justify-center rounded-full text-xs">
                              {index + 1}
                            </Badge>
                            <div className={isRTL ? 'text-right' : 'text-left'}>
                              <p className="font-medium text-xs">
                                {getServiceName(service.service_name)}
                              </p>
                              <Badge variant="secondary" className="text-[10px]">
                                {getCategoryName(service.service_category)}
                              </Badge>
                            </div>
                          </div>
                          <Badge variant="default" className="text-xs">
                            {service.usage_count.toLocaleString()}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground text-sm">
                      {isRTL ? 'لا توجد استخدامات مسجلة بعد' : 'No service usage recorded yet'}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="devices" className="space-y-6">
            {/* Device Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 text-base ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Smartphone className="h-4 w-4 text-primary" />
                  {isRTL ? 'توزيع الأجهزة' : 'Device Distribution'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {stats.deviceStats.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={stats.deviceStats}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {stats.deviceStats.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    {isRTL ? 'لا توجد بيانات' : 'No data available'}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Analytics;
