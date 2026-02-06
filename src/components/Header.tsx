import { useState, useEffect } from 'react';
import { Globe, Menu, MessageSquare, User, LogOut, BarChart3, MessageCircle, ChevronDown, Users, Building2, Stethoscope, Database, Map, Search, Moon, Sun } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import chiLogo from '@/assets/chi-logo.png';
import { CHIRegulationsChat } from '@/components/CHIRegulationsChat';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

// Navigation categories
const navCategories = {
  beneficiaries: {
    labelAr: 'المستفيدين',
    labelEn: 'Beneficiaries',
    icon: Users,
    links: [
      { to: '/insurance-eligibility', labelAr: 'أهلية العلاج', labelEn: 'Eligibility Check' },
      { to: '/benefits-package', labelAr: 'حزمة المنافع', labelEn: 'Benefits Package' },
      { to: '/preventive-services', labelAr: 'الخدمات الوقائية', labelEn: 'Preventive Services' },
      { to: '/beneficiary-health', labelAr: 'صحة المستفيدين', labelEn: 'Population Health' },
      { to: '/insurance-categories', labelAr: 'التغطية الإلزامية', labelEn: 'Coverage Types' },
      { to: '/prior-auth-checker', labelAr: 'فاحص الموافقة والأدوية', labelEn: 'Prior Auth & Drug Check' },
      
    ]
  },
  employers: {
    labelAr: 'أصحاب العمل',
    labelEn: 'Employers',
    icon: Building2,
    links: [
      { to: '/employer-assistant', labelAr: 'المساعد الذكي لأصحاب العمل', labelEn: 'Smart Employer Assistant' },
      { to: '/quote-analysis', labelAr: 'تحليل العرض السعري', labelEn: 'Quote Analysis' },
      { to: '/economic-analysis', labelAr: 'أدوات التحليل الاقتصادي', labelEn: 'Economic Analysis' },
      { to: '/population-health-tips', labelAr: 'نصائح الصحة السكانية', labelEn: 'Population Health Tips' },
      { to: '/policy-comparison', labelAr: 'مقارنة الوثائق الصحية', labelEn: 'Policy Comparison' },
      { to: '/fines-calculator', labelAr: 'حاسبة غرامات عدم الالتزام', labelEn: 'Non-Compliance Fines' },
      { to: '/compliance-report', labelAr: 'استعلام نسبة الامتثال', labelEn: 'Compliance Inquiry' },
    ]
  },
  providers: {
    labelAr: 'مقدمي الخدمة',
    labelEn: 'Providers',
    icon: Stethoscope,
    links: [
      { to: '/primary-care', labelAr: 'الرعاية الأولية', labelEn: 'Primary Care' },
      { to: '/drg-implementation', labelAr: 'الحزم التشخيصية', labelEn: 'DRG System' },
      { to: '/prior-authorization', labelAr: 'الموافقات المسبقة', labelEn: 'Prior Authorization' },
      { to: '/medical-coding-assistant', labelAr: 'مساعد الترميز الطبي', labelEn: 'Medical Coding' },
      { to: '/practitioner-verification', labelAr: 'التحقق من الممارس الصحي', labelEn: 'Practitioner Verification' },
      { to: '/physician-privileges', labelAr: 'صلاحيات الممارسين', labelEn: 'Physician Privileges' },
      { to: '/daman-intelligence', labelAr: 'ضمان انتلجنس', labelEn: 'Daman Intelligence' },
    ]
  },
  naphies: {
    labelAr: 'منصة نفيس',
    labelEn: 'NAPHIES',
    icon: Database,
    links: [
      { to: '/nafees-platform', labelAr: 'منصة نفيس', labelEn: 'NAPHIES Platform' },
    ]
  },
};

// Flat list for mobile menu
const allLinks = [
  { to: '/', labelAr: 'الرئيسية', labelEn: 'Home' },
  { to: '/sitemap', labelAr: 'خريطة الموقع', labelEn: 'Sitemap' },
  ...Object.values(navCategories).flatMap(cat => cat.links),
];

export function Header() {
  const { language, setLanguage, isRTL } = useLanguage();
  const location = useLocation();
  const [chatOpen, setChatOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      // Check localStorage first (user explicit preference)
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') return true;
      if (savedTheme === 'light') return false;
      // Check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    // Apply theme on mount based on state
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Listen for system theme changes (only if user hasn't set preference)
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        setIsDark(e.matches);
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [isDark]);

  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const isActiveCategory = (links: typeof navCategories.beneficiaries.links) => {
    return links.some(link => location.pathname === link.to);
  };

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Main header with solid brand green */}
      <div className="bg-[hsl(var(--header))] text-[hsl(var(--header-foreground))]">
        <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
          <div className={`flex items-center justify-between gap-2 ${isRTL ? 'flex-row-reverse sm:flex-row' : ''}`}>
            <Link to="/" className="flex items-center gap-2 sm:gap-3">
              <img 
                src={chiLogo} 
                alt={language === 'ar' ? 'مجلس الضمان الصحي' : 'Council of Health Insurance'} 
                className="h-10 sm:h-12 md:h-14 w-auto object-contain brightness-0 invert"
              />
            </Link>
            
            <div className={`flex items-center gap-1.5 sm:gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {/* Smart Assistant Button */}
              <Sheet open={chatOpen} onOpenChange={setChatOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 sm:h-8 px-2 sm:px-3 gap-1 bg-transparent text-white border border-white/30 hover:bg-white/10 hover:text-white"
                  >
                    <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline text-[10px] sm:text-xs font-medium">
                      {language === 'ar' ? 'محرك الذكاء الاصطناعي' : 'AI Engine'}
                    </span>
                  </Button>
                </SheetTrigger>
                <SheetContent 
                  side={isRTL ? 'right' : 'left'} 
                  className="w-full sm:w-[450px] p-0"
                >
                  <SheetHeader className="p-4 border-b">
                    <SheetTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      {language === 'ar' ? 'محرك الذكاء الاصطناعي بضمان' : 'Daman AI Engine'}
                    </SheetTitle>
                  </SheetHeader>
                  <div className="h-[calc(100vh-80px)]">
                    <CHIRegulationsChat />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className="h-7 sm:h-8 px-2 bg-transparent text-white border border-white/30 hover:bg-white/10 hover:text-white"
              >
                {isDark ? <Sun className="h-3 w-3 sm:h-4 sm:w-4" /> : <Moon className="h-3 w-3 sm:h-4 sm:w-4" />}
              </Button>

              {/* Language Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                className="h-7 sm:h-8 px-2 sm:px-3 gap-1 bg-transparent text-white border border-white/30 hover:bg-white/10 hover:text-white"
              >
                <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-[10px] sm:text-xs font-medium">
                  {language === 'en' ? 'عربي' : 'EN'}
                </span>
              </Button>

              {/* Auth Button */}
              {user ? (
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 sm:h-8 px-2 sm:px-3 gap-1 bg-transparent text-white border border-white/30 hover:bg-white/10 hover:text-white"
                    >
                      <User className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline text-[10px] sm:text-xs font-medium max-w-[80px] truncate">
                        {user.email?.split('@')[0]}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className={`w-48 bg-background text-foreground ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isAdmin && (
                      <>
                        <DropdownMenuItem asChild className={isRTL ? 'justify-end' : 'justify-start'}>
                          <Link to="/admin/analytics" className={`w-full flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <BarChart3 className="h-4 w-4" />
                            {language === 'ar' ? 'إحصائيات الموقع' : 'Site Analytics'}
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className={isRTL ? 'justify-end' : 'justify-start'}>
                          <Link to="/admin/questions-log" className={`w-full flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <MessageCircle className="h-4 w-4" />
                            {language === 'ar' ? 'سجل الأسئلة' : 'Questions Log'}
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className={isRTL ? 'justify-end' : 'justify-start'}>
                          <Link to="/admin/searches-log" className={`w-full flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Search className="h-4 w-4" />
                            {language === 'ar' ? 'سجل البحث' : 'Search Log'}
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem 
                      onClick={() => signOut()}
                      className={`w-full flex items-center gap-2 text-destructive ${isRTL ? 'flex-row-reverse justify-end' : 'justify-start'}`}
                    >
                      <LogOut className="h-4 w-4" />
                      {language === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/auth">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-7 sm:h-8 px-2 sm:px-3 gap-1 bg-transparent text-white border border-white/30 hover:bg-white/10 hover:text-white ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <User className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline text-[10px] sm:text-xs font-medium">
                      {language === 'ar' ? 'دخول' : 'Login'}
                    </span>
                  </Button>
                </Link>
              )}

              {/* Mobile Menu */}
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="sm:hidden h-7 px-2 bg-transparent text-white border border-white/30 hover:bg-white/10 hover:text-white"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Menu className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align={isRTL ? 'start' : 'end'} 
                  className={`w-56 bg-background text-foreground max-h-[70vh] overflow-y-auto z-[100] ${isRTL ? 'text-right' : 'text-left'}`}
                  sideOffset={5}
                  onCloseAutoFocus={(e) => e.preventDefault()}
                >
                  {/* Home */}
                  <DropdownMenuItem asChild>
                    <Link to="/" className={`w-full block font-medium ${isRTL ? 'text-right' : 'text-left'} ${location.pathname === '/' ? 'bg-primary/10 text-primary' : ''}`}>
                      {language === 'ar' ? 'الرئيسية' : 'Home'}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  
                  {/* Categories */}
                  {Object.entries(navCategories).map(([key, category]) => (
                    <div key={key}>
                      <div className={`px-2 py-1.5 text-xs font-semibold text-muted-foreground flex items-center gap-2 ${isRTL ? 'flex-row-reverse text-right w-full' : ''}`}>
                        <category.icon className="h-3 w-3 shrink-0" />
                        <span>{language === 'ar' ? category.labelAr : category.labelEn}</span>
                      </div>
                      {category.links.map((link) => (
                        <DropdownMenuItem key={link.to} asChild className={isRTL ? 'pr-6 flex-row-reverse' : 'pl-6'}>
                          <Link 
                            to={link.to} 
                            className={`w-full block text-sm ${isRTL ? 'text-right' : 'text-left'} ${location.pathname === link.to ? 'bg-primary/10 text-primary' : ''}`}
                          >
                            {language === 'ar' ? link.labelAr : link.labelEn}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator />
                    </div>
                  ))}
                  
                  {/* Sitemap - at the bottom */}
                  <DropdownMenuItem asChild className={isRTL ? 'flex-row-reverse' : ''}>
                    <Link to="/sitemap" className={`w-full flex items-center gap-2 ${isRTL ? 'flex-row-reverse text-right' : 'text-left'} ${location.pathname === '/sitemap' ? 'bg-primary/10 text-primary' : ''}`}>
                      <Map className="h-4 w-4 shrink-0" />
                      <span>{language === 'ar' ? 'خريطة الموقع' : 'Sitemap'}</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Navigation Bar - Desktop with Dropdowns */}
        <nav className="hidden sm:block border-t border-primary-foreground/20">
          <div className={`container mx-auto px-3 sm:px-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div dir={isRTL ? 'rtl' : 'ltr'} className={`flex items-center gap-1 py-1.5 w-full ${isRTL ? 'justify-start' : 'justify-start'}`}>
              {/* Home */}
              <Link to="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-7 text-[10px] px-2 whitespace-nowrap ${
                    location.pathname === '/' 
                      ? 'bg-primary-foreground/20 text-primary-foreground' 
                      : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground'
                  }`}
                >
                  {language === 'ar' ? 'الرئيسية' : 'Home'}
                </Button>
              </Link>

              {/* Category Dropdowns */}
              {Object.entries(navCategories).map(([key, category]) => (
                <DropdownMenu key={key}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-7 text-[10px] px-2 whitespace-nowrap flex items-center gap-1 ${
                        isActiveCategory(category.links)
                          ? 'bg-primary-foreground/20 text-primary-foreground' 
                          : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground'
                      }`}
                    >
                      <category.icon className="h-3 w-3" />
                      {language === 'ar' ? category.labelAr : category.labelEn}
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align={isRTL ? 'end' : 'start'} 
                    className={`w-56 bg-background text-foreground ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    {category.links.map((link) => (
                      <DropdownMenuItem key={link.to} asChild className={isRTL ? 'justify-end' : 'justify-start'}>
                        <Link 
                          to={link.to} 
                          className={`w-full block ${location.pathname === link.to ? 'bg-primary/10 text-primary font-medium' : ''}`}
                        >
                          {language === 'ar' ? link.labelAr : link.labelEn}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ))}

              {/* Sitemap */}
              <Link to="/sitemap">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-7 text-[10px] px-2 whitespace-nowrap flex items-center gap-1 ${
                    location.pathname === '/sitemap' 
                      ? 'bg-primary-foreground/20 text-primary-foreground' 
                      : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground'
                  }`}
                >
                  <Map className="h-3 w-3" />
                  {language === 'ar' ? 'خريطة الموقع' : 'Sitemap'}
                </Button>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
