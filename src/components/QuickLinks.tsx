import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Heart, 
  Network, 
  Shield, 
  Package, 
  Stethoscope,
  Home,
  FileCheck,
  Calculator,
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface QuickLinksProps {
  currentPage?: string;
}

export function QuickLinks({ currentPage }: QuickLinksProps) {
  const { language, isRTL } = useLanguage();

  const links = [
    { id: 'home', to: '/', icon: Home, labelAr: 'الرئيسية', labelEn: 'Home' },
    { id: 'insurance', to: '/insurance-categories', icon: Users, labelAr: 'التغطية الإلزامية', labelEn: 'Coverage' },
    { id: 'eligibility', to: '/insurance-eligibility', icon: CheckCircle2, labelAr: 'أهلية العلاج', labelEn: 'Eligibility' },
    { id: 'benefits', to: '/benefits-package', icon: Calculator, labelAr: 'حزمة المنافع', labelEn: 'Benefits' },
    { id: 'employer', to: '/employer-tools', icon: Building2, labelAr: 'أصحاب العمل', labelEn: 'Employers' },
    { id: 'drg', to: '/drg-implementation', icon: Package, labelAr: 'الحزم التشخيصية', labelEn: 'DRG' },
    { id: 'health', to: '/beneficiary-health', icon: Heart, labelAr: 'صحة المستفيدين', labelEn: 'Population Health' },
    { id: 'preventive', to: '/preventive-services', icon: Shield, labelAr: 'الخدمات الوقائية', labelEn: 'Preventive' },
    { id: 'primary', to: '/primary-care', icon: Stethoscope, labelAr: 'الرعاية الأولية', labelEn: 'Primary Care' },
    { id: 'prior-auth', to: '/prior-authorization', icon: FileCheck, labelAr: 'الموافقات المسبقة', labelEn: 'Prior Auth' },
    { id: 'fines', to: '/fines-calculator', icon: AlertTriangle, labelAr: 'حاسبة الغرامات', labelEn: 'Fines' },
    { id: 'nafees', to: '/nafees-platform', icon: Network, labelAr: 'نفيس', labelEn: 'Nafees' },
    { id: 'daman', to: '/daman-intelligence', icon: BarChart3, labelAr: 'ضمان', labelEn: 'Daman' },
  ];

  return (
    <div className={`flex flex-wrap items-center gap-1.5 mb-4 ${isRTL ? 'justify-end' : 'justify-start'}`}>
      {links
        .filter(link => link.id !== currentPage)
        .map(link => (
          <Link key={link.id} to={link.to}>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1 h-7 text-[10px] sm:text-xs hover:bg-primary/10 hover:text-primary hover:border-primary/50 px-2"
              title={language === 'ar' ? link.labelAr : link.labelEn}
            >
              <link.icon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{language === 'ar' ? link.labelAr : link.labelEn}</span>
            </Button>
          </Link>
        ))}
    </div>
  );
}
