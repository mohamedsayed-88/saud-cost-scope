import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { 
  Map, 
  Users, 
  Building2, 
  Stethoscope, 
  Shield,
  Home,
  FileText,
  Calculator,
  Heart,
  Activity,
  ClipboardCheck,
  Blocks,
  Network,
  Brain,
  HelpCircle,
  Search,
  Banknote,
  BarChart3,
  MessageSquare,
  BookOpen,
  UserCheck,
  GitCompare,
  Upload,
  Coins,
  Lightbulb
} from 'lucide-react';

interface SitemapLink {
  path: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icon: React.ReactNode;
}

interface SitemapCategory {
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icon: React.ReactNode;
  color: string;
  links: SitemapLink[];
}

const Sitemap = () => {
  const { language, isRTL } = useLanguage();

  const categories: SitemapCategory[] = [
    {
      titleAr: 'المستفيدين',
      titleEn: 'Beneficiaries',
      descriptionAr: 'خدمات مخصصة للمؤمن عليهم وأفراد أسرهم',
      descriptionEn: 'Services for insured individuals and their families',
      icon: <Users className="h-6 w-6" />,
      color: 'bg-primary/10 text-primary',
      links: [
        {
          path: '/',
          nameAr: 'الرئيسية',
          nameEn: 'Home',
          descriptionAr: 'الصفحة الرئيسية والمساعد الذكي',
          descriptionEn: 'Homepage and Smart Assistant',
          icon: <Home className="h-4 w-4" />
        },
        {
          path: '/insurance-eligibility',
          nameAr: 'أهلية العلاج',
          nameEn: 'Insurance Eligibility',
          descriptionAr: 'التحقق من صلاحية التغطية التأمينية',
          descriptionEn: 'Verify insurance coverage validity',
          icon: <ClipboardCheck className="h-4 w-4" />
        },
        {
          path: '/benefits-package',
          nameAr: 'حزمة المنافع الأساسية',
          nameEn: 'Benefits Package',
          descriptionAr: 'الخدمات المشمولة والحدود القصوى',
          descriptionEn: 'Covered services and maximum limits',
          icon: <Shield className="h-4 w-4" />
        },
        {
          path: '/preventive-services',
          nameAr: 'الخدمات الوقائية',
          nameEn: 'Preventive Services',
          descriptionAr: 'الفحوصات والخدمات الوقائية المغطاة',
          descriptionEn: 'Covered preventive exams and services',
          icon: <Heart className="h-4 w-4" />
        },
        {
          path: '/prior-auth-checker',
          nameAr: 'فاحص الموافقة والأدوية',
          nameEn: 'Prior Auth & Drug Checker',
          descriptionAr: 'البحث عن متطلبات الموافقة المسبقة وتغطية الأدوية',
          descriptionEn: 'Search for prior authorization requirements and drug coverage',
          icon: <Search className="h-4 w-4" />
        },
        {
          path: '/insurance-categories',
          nameAr: 'فئات التغطية الإلزامية',
          nameEn: 'Insurance Categories',
          descriptionAr: 'أنواع التغطية التأمينية والوثائق',
          descriptionEn: 'Types of insurance coverage and policies',
          icon: <FileText className="h-4 w-4" />
        },
      ]
    },
    {
      titleAr: 'أصحاب العمل',
      titleEn: 'Employers',
      descriptionAr: 'أدوات لإدارة التأمين الصحي للموظفين',
      descriptionEn: 'Tools for managing employee health insurance',
      icon: <Building2 className="h-6 w-6" />,
      color: 'bg-warning/10 text-warning',
      links: [
        {
          path: '/quote-analysis',
          nameAr: 'تحليل العرض السعري',
          nameEn: 'Quote Analysis',
          descriptionAr: 'تحليل عروض التأمين الصحي ومقارنتها',
          descriptionEn: 'Analyze and compare health insurance quotes',
          icon: <Upload className="h-4 w-4" />
        },
        {
          path: '/economic-analysis',
          nameAr: 'التحليل الاقتصادي',
          nameEn: 'Economic Analysis',
          descriptionAr: 'تحليل تكاليف التأمين والتوفير المحتمل',
          descriptionEn: 'Analyze insurance costs and potential savings',
          icon: <Calculator className="h-4 w-4" />
        },
        {
          path: '/employer-assistant',
          nameAr: 'مساعد صاحب العمل',
          nameEn: 'Employer Assistant',
          descriptionAr: 'مساعد ذكي لأسئلة التأمين الصحي',
          descriptionEn: 'Smart assistant for health insurance questions',
          icon: <MessageSquare className="h-4 w-4" />
        },
        {
          path: '/population-health-tips',
          nameAr: 'نصائح الصحة السكانية',
          nameEn: 'Population Health Tips',
          descriptionAr: 'توصيات لتحسين صحة الموظفين وخفض التكاليف',
          descriptionEn: 'Recommendations to improve employee health and reduce costs',
          icon: <Lightbulb className="h-4 w-4" />
        },
        {
          path: '/policy-comparison',
          nameAr: 'مقارنة الوثائق الصحية',
          nameEn: 'Policy Comparison',
          descriptionAr: 'مقارنة وثيقة اكسبرو الحكومية مع الوثيقة الأساسية',
          descriptionEn: 'Compare EXPRO government policy with basic policy',
          icon: <GitCompare className="h-4 w-4" />
        },
        {
          path: '/fines-calculator',
          nameAr: 'حاسبة غرامات عدم الالتزام بالتأمين',
          nameEn: 'Non-Compliance Fines Calculator',
          descriptionAr: 'حساب غرامات عدم الالتزام بالتأمين الإلزامي',
          descriptionEn: 'Calculate mandatory insurance non-compliance penalties',
          icon: <Banknote className="h-4 w-4" />
        },
        {
          path: '/compliance-report',
          nameAr: 'استعلام نسبة امتثال التأمين الإلزامي',
          nameEn: 'Insurance Compliance Inquiry',
          descriptionAr: 'الاستعلام عن نسبة الامتثال بالتأمين الصحي الإلزامي',
          descriptionEn: 'Inquire about mandatory health insurance compliance rate',
          icon: <FileText className="h-4 w-4" />
        },
      ]
    },
    {
      titleAr: 'مقدمي الخدمة',
      titleEn: 'Providers',
      descriptionAr: 'أدوات ومعلومات للمستشفيات والعيادات',
      descriptionEn: 'Tools and information for hospitals and clinics',
      icon: <Stethoscope className="h-6 w-6" />,
      color: 'bg-success/10 text-success',
      links: [
        {
          path: '/primary-care',
          nameAr: 'الرعاية الأولية',
          nameEn: 'Primary Care',
          descriptionAr: 'معايير تصنيف مقدمي الرعاية الأولية',
          descriptionEn: 'Primary care provider classification standards',
          icon: <ClipboardCheck className="h-4 w-4" />
        },
        {
          path: '/prior-authorization',
          nameAr: 'الموافقات المسبقة',
          nameEn: 'Prior Authorization',
          descriptionAr: 'متطلبات وأكواد الموافقة المسبقة',
          descriptionEn: 'Prior authorization requirements and codes',
          icon: <FileText className="h-4 w-4" />
        },
        {
          path: '/drg-implementation',
          nameAr: 'الحزم التشخيصية DRG',
          nameEn: 'DRG Implementation',
          descriptionAr: 'نظام الدفع بالحزم التشخيصية',
          descriptionEn: 'Diagnostic Related Groups payment system',
          icon: <Blocks className="h-4 w-4" />
        },
        {
          path: '/medical-coding',
          nameAr: 'مساعد الترميز الطبي',
          nameEn: 'Medical Coding Assistant',
          descriptionAr: 'التحقق من أكواد التشخيص والخدمات',
          descriptionEn: 'Verify diagnosis and service codes',
          icon: <Search className="h-4 w-4" />
        },
        {
          path: '/physician-privileges',
          nameAr: 'صلاحيات الممارسين',
          nameEn: 'Physician Privileges',
          descriptionAr: 'الخدمات المسموح بها حسب التخصص',
          descriptionEn: 'Allowed services by specialty',
          icon: <UserCheck className="h-4 w-4" />
        },
        {
          path: '/daman-intelligence',
          nameAr: 'ضمان انتلجنس',
          nameEn: 'Daman Intelligence',
          descriptionAr: 'تحليلات الأداء والرفض للمقدمين',
          descriptionEn: 'Provider performance and rejection analytics',
          icon: <Brain className="h-4 w-4" />
        },
        {
          path: '/practitioner-verification',
          nameAr: 'التحقق من الممارس الصحي',
          nameEn: 'Practitioner Verification',
          descriptionAr: 'التحقق من تسجيل الممارس في هيئة التخصصات',
          descriptionEn: 'Verify practitioner registration with SCFHS',
          icon: <UserCheck className="h-4 w-4" />
        },
        {
          path: '/beneficiary-health',
          nameAr: 'صحة المستفيدين',
          nameEn: 'Population Health',
          descriptionAr: 'برنامج إدارة صحة السكان',
          descriptionEn: 'Population Health Management program',
          icon: <Activity className="h-4 w-4" />
        },
      ]
    },
    {
      titleAr: 'منصة نفيس',
      titleEn: 'NAPHIES Platform',
      descriptionAr: 'منصة تبادل المعلومات الصحية الوطنية',
      descriptionEn: 'National Health Information Exchange platform',
      icon: <Network className="h-6 w-6" />,
      color: 'bg-info/10 text-info',
      links: [
        {
          path: '/nafees-platform',
          nameAr: 'عن منصة نفيس',
          nameEn: 'About NAPHIES',
          descriptionAr: 'نظرة عامة على منصة نفيس',
          descriptionEn: 'Overview of NAPHIES platform',
          icon: <Network className="h-4 w-4" />
        },
        {
          path: '/prior-authorization',
          nameAr: 'الموافقات المسبقة',
          nameEn: 'Prior Authorization',
          descriptionAr: 'خدمات الموافقة المسبقة عبر نفيس',
          descriptionEn: 'Prior authorization services via NAPHIES',
          icon: <ClipboardCheck className="h-4 w-4" />
        },
        {
          path: '/drg-implementation',
          nameAr: 'نظام DRG',
          nameEn: 'DRG System',
          descriptionAr: 'تطبيق الحزم التشخيصية',
          descriptionEn: 'DRG implementation',
          icon: <Blocks className="h-4 w-4" />
        },
      ]
    },
  ];

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-8 sm:py-12 overflow-hidden gradient-hero">
        <div className="absolute inset-0 chi-pattern" />
        <div className="container mx-auto px-4 relative">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary-foreground/10">
              <Map className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h1 className="text-2xl sm:text-3xl font-bold text-primary-foreground">
                {isRTL ? 'خريطة الموقع' : 'Site Map'}
              </h1>
              <p className="text-sm text-primary-foreground/70 mt-1">
                {isRTL 
                  ? 'جميع خدمات منصة ضمان للذكاء الاصطناعي'
                  : 'All Daman Intelligence platform services'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {categories.map((category, index) => (
            <Card key={index}>
              <CardContent className="pt-6 pb-4">
                <div className="flex flex-col items-center justify-center w-full">
                  <div className={`inline-flex p-3 rounded-full ${category.color} mb-3`}>
                    {category.icon}
                  </div>
                  <p className="text-2xl font-bold text-center">{category.links.length}</p>
                  <p className="text-xs text-muted-foreground text-center">
                    {isRTL ? 'خدمة' : 'services'}
                  </p>
                  <p className="text-sm font-medium mt-2 text-center">
                    {isRTL ? category.titleAr : category.titleEn}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="overflow-hidden">
              <CardHeader className={`${category.color.replace('/10', '/5')} border-b`}>
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${category.color}`}>
                    {category.icon}
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <h2 className="text-lg font-bold">
                      {isRTL ? category.titleAr : category.titleEn}
                    </h2>
                    <p className="text-xs font-normal text-muted-foreground">
                      {isRTL ? category.descriptionAr : category.descriptionEn}
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {category.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      to={link.path}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                    >
                      <div className={`p-2 rounded-lg ${category.color} group-hover:scale-110 transition-transform`}>
                        {link.icon}
                      </div>
                      <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                        <p className="font-medium text-sm group-hover:text-primary transition-colors">
                          {isRTL ? link.nameAr : link.nameEn}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {isRTL ? link.descriptionAr : link.descriptionEn}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Resources */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span>{isRTL ? 'موارد إضافية' : 'Additional Resources'}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4`}>
              <Link
                to="/"
                className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
              >
                <MessageSquare className="h-5 w-5 text-primary" />
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <p className="font-medium text-sm">
                    {isRTL ? 'المساعد الذكي' : 'Smart Assistant'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isRTL ? 'استفسر عن أي شيء' : 'Ask anything'}
                  </p>
                </div>
              </Link>
              <Link
                to="/admin/analytics"
                className="flex items-center gap-3 p-4 rounded-lg bg-success/5 hover:bg-success/10 transition-colors"
              >
                <BarChart3 className="h-5 w-5 text-success" />
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <p className="font-medium text-sm">
                    {isRTL ? 'الإحصائيات' : 'Analytics'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isRTL ? 'للمسؤولين فقط' : 'Admin only'}
                  </p>
                </div>
              </Link>
              <Link
                to="/admin/questions-log"
                className="flex items-center gap-3 p-4 rounded-lg bg-warning/5 hover:bg-warning/10 transition-colors"
              >
                <HelpCircle className="h-5 w-5 text-warning" />
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <p className="font-medium text-sm">
                    {isRTL ? 'سجل الأسئلة' : 'Questions Log'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isRTL ? 'للمسؤولين فقط' : 'Admin only'}
                  </p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Sitemap;
