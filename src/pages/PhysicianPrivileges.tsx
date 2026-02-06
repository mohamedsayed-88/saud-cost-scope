import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Stethoscope, 
  CheckCircle2, 
  AlertCircle, 
  GraduationCap,
  FileCode,
  Users,
  Filter,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { 
  physicianSpecialties, 
  specialtyCategories,
  findSpecialtiesForService,
  type PhysicianSpecialty,
  type ServicePrivilege 
} from '@/data/physicianPrivileges';

const PhysicianPrivileges = () => {
  const { language, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [searchType, setSearchType] = useState<'specialty' | 'service'>('specialty');
  const [privilegeFilter, setPrivilegeFilter] = useState<'all' | 'core' | 'extended' | 'requires_training'>('all');

  // Medical synonyms for fuzzy search
  const synonyms: Record<string, string[]> = {
    // Arabic synonyms
    'قلب': ['قلبي', 'القلب', 'كارديو', 'cardiac', 'heart'],
    'جراحة': ['جراحي', 'عملية', 'surgery', 'surgical'],
    'عظام': ['عظمي', 'العظام', 'orthopedic', 'bone'],
    'أعصاب': ['عصبي', 'الأعصاب', 'neurology', 'neuro'],
    'باطني': ['باطنة', 'داخلي', 'internal', 'medicine'],
    'أطفال': ['طفل', 'الأطفال', 'pediatric', 'child'],
    'نساء': ['توليد', 'نسائي', 'gynecology', 'obstetric'],
    'عيون': ['عين', 'بصري', 'ophthalmology', 'eye'],
    'جلدية': ['جلد', 'dermatology', 'skin'],
    'أنف': ['أذن', 'حنجرة', 'ent', 'ear'],
    'مسالك': ['بولية', 'urology', 'urinary'],
    'صدر': ['رئة', 'تنفسي', 'pulmonology', 'chest', 'respiratory'],
    'هضمي': ['معدة', 'أمعاء', 'gastro', 'digestive'],
    'كلى': ['كلوي', 'nephrology', 'kidney', 'renal'],
    'غدد': ['هرمون', 'سكري', 'endocrine', 'diabetes'],
    'منظار': ['تنظير', 'endoscopy', 'scope'],
    'قسطرة': ['catheter', 'cath'],
    'تخطيط': ['ecg', 'ekg', 'echo'],
    // English synonyms
    'heart': ['cardiac', 'cardio', 'cardiovascular'],
    'surgery': ['surgical', 'operation'],
    'bone': ['orthopedic', 'ortho'],
    'nerve': ['neurology', 'neuro', 'neurological'],
    'child': ['pediatric', 'paediatric', 'children'],
    'eye': ['ophthalmology', 'ophthalmic', 'vision'],
    'skin': ['dermatology', 'dermatologic'],
    'stomach': ['gastro', 'gastroenterology', 'digestive'],
  };

  // Check if search matches with synonyms
  const matchesWithSynonyms = (text: string, query: string): boolean => {
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    
    // Direct match
    if (lowerText.includes(lowerQuery) || text.includes(query)) return true;
    
    // Check synonyms
    for (const [key, values] of Object.entries(synonyms)) {
      if (key.includes(lowerQuery) || lowerQuery.includes(key) || values.some(v => v.includes(lowerQuery) || lowerQuery.includes(v))) {
        if (lowerText.includes(key) || values.some(v => lowerText.includes(v))) {
          return true;
        }
      }
    }
    
    return false;
  };

  // Filter specialties based on search and category
  const filteredSpecialties = useMemo(() => {
    return physicianSpecialties.filter(specialty => {
      const matchesCategory = selectedCategory === 'all' || 
        specialty.categoryEn.toLowerCase().includes(selectedCategory.toLowerCase());
      
      const matchesSearch = searchQuery === '' ||
        matchesWithSynonyms(specialty.nameAr, searchQuery) ||
        matchesWithSynonyms(specialty.nameEn, searchQuery) ||
        specialty.services.some(s => 
          matchesWithSynonyms(s.serviceNameAr, searchQuery) ||
          matchesWithSynonyms(s.serviceNameEn, searchQuery) ||
          s.sbsCode.includes(searchQuery)
        );
      
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Filter services based on search
  const filteredServices = useMemo(() => {
    if (!selectedSpecialty) return [];
    const specialty = physicianSpecialties.find(s => s.id === selectedSpecialty);
    if (!specialty) return [];
    
    return specialty.services.filter(service => {
      const matchesPrivilege = privilegeFilter === 'all' || service.privilegeType === privilegeFilter;
      const matchesSearch = searchQuery === '' ||
        matchesWithSynonyms(service.serviceNameAr, searchQuery) ||
        matchesWithSynonyms(service.serviceNameEn, searchQuery) ||
        service.sbsCode.includes(searchQuery);
      
      return matchesPrivilege && matchesSearch;
    });
  }, [selectedSpecialty, searchQuery, privilegeFilter]);

  // Search services across all specialties
  const searchServicesResults = useMemo(() => {
    if (searchType !== 'service' || searchQuery.length < 2) return [];
    
    const results: { service: ServicePrivilege; specialties: { specialty: PhysicianSpecialty; privilege: ServicePrivilege }[] }[] = [];
    const seenCodes = new Set<string>();
    
    physicianSpecialties.forEach(specialty => {
      specialty.services.forEach(service => {
        if (seenCodes.has(service.sbsCode)) return;
        
        const matches = 
          matchesWithSynonyms(service.serviceNameAr, searchQuery) ||
          matchesWithSynonyms(service.serviceNameEn, searchQuery) ||
          service.sbsCode.includes(searchQuery);
        
        if (matches) {
          seenCodes.add(service.sbsCode);
          const specialtiesForService = findSpecialtiesForService(service.sbsCode);
          results.push({ service, specialties: specialtiesForService });
        }
      });
    });
    
    return results;
  }, [searchQuery, searchType]);

  const getPrivilegeBadge = (type: ServicePrivilege['privilegeType']) => {
    switch (type) {
      case 'core':
        return (
          <Badge className="bg-success/20 text-success border-success/30 gap-1">
            <CheckCircle2 className="h-3 w-3" />
            {language === 'ar' ? 'أساسي' : 'Core'}
          </Badge>
        );
      case 'extended':
        return (
          <Badge className="bg-warning/20 text-warning border-warning/30 gap-1">
            <AlertCircle className="h-3 w-3" />
            {language === 'ar' ? 'موسع' : 'Extended'}
          </Badge>
        );
      case 'requires_training':
        return (
          <Badge className="bg-info/20 text-info border-info/30 gap-1">
            <GraduationCap className="h-3 w-3" />
            {language === 'ar' ? 'يتطلب تدريب' : 'Requires Training'}
          </Badge>
        );
    }
  };

  const selectedSpecialtyData = selectedSpecialty 
    ? physicianSpecialties.find(s => s.id === selectedSpecialty) 
    : null;

  return (
    <div className={`min-h-screen min-h-[100dvh] bg-background ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-6 sm:py-8 overflow-hidden gradient-hero">
        <div className="absolute inset-0 chi-pattern" />
        <div className="container mx-auto px-3 sm:px-4 relative">
          <div className="flex items-center gap-3 mb-3 w-fit">
            <div className="p-2 rounded-lg bg-primary-foreground/10">
              <Stethoscope className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-primary-foreground">
              {language === 'ar' ? 'صلاحيات الممارسين الصحيين' : 'Physician Privileges'}
            </h1>
          </div>
          
          <p className={`text-xs sm:text-sm text-primary-foreground/85 max-w-2xl ${isRTL ? 'text-right ml-auto' : 'text-left'}`}>
            {language === 'ar' 
              ? 'ربط التخصصات الطبية بأكواد الخدمات (SBS) والصلاحيات المهنية'
              : 'Link medical specialties to service codes (SBS) and professional privileges'}
          </p>
        </div>
      </section>

      <main className={`container mx-auto px-3 sm:px-4 py-6 max-w-7xl ${isRTL ? 'text-right' : 'text-left'}`}>
        {/* Educational Disclaimer */}
        <Card className="mb-6 border-amber-500/30 bg-amber-50 dark:bg-amber-950/20">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                  {language === 'ar' 
                    ? 'هذه الخدمة استرشادية لأغراض تثقيفية فقط'
                    : 'This service is advisory for educational purposes only'}
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                  {language === 'ar' 
                    ? 'المعلومات المعروضة هي إرشادات عامة ولا تمثل قرارات رسمية. يرجى الرجوع إلى الهيئة السعودية للتخصصات الصحية (SCFHS) للحصول على الصلاحيات الرسمية.'
                    : 'The information displayed is general guidance and does not represent official decisions. Please refer to the Saudi Commission for Health Specialties (SCFHS) for official privileges.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SCFHS Verification Link */}
        <Card className="mb-6 border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-4 flex-wrap justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                  <p className="text-sm font-medium text-foreground">
                    {language === 'ar' 
                      ? 'التحقق من صلاحيات الممارس الرسمية'
                      : 'Verify Official Practitioner Privileges'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {language === 'ar' 
                      ? 'استخدم موقع الهيئة السعودية للتخصصات الصحية للتحقق من الصلاحيات الرسمية'
                      : 'Use SCFHS website to verify official practitioner privileges'}
                  </p>
                </div>
              </div>
              <a
                href="https://scfhs.org.sa/ar/E-Services/regvaliddescription"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium shrink-0"
              >
                <ExternalLink className="h-4 w-4" />
                {language === 'ar' ? 'التحقق عبر SCFHS' : 'Verify via SCFHS'}
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Search Section */}
        <Card className="mb-6 border-primary/20">
          <CardContent className="p-4">
            <Tabs value={searchType} onValueChange={(v) => setSearchType(v as 'specialty' | 'service')}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="specialty" className="gap-2">
                  <Users className="h-4 w-4" />
                  {language === 'ar' ? 'البحث بالتخصص' : 'Search by Specialty'}
                </TabsTrigger>
                <TabsTrigger value="service" className="gap-2">
                  <FileCode className="h-4 w-4" />
                  {language === 'ar' ? 'البحث بالخدمة' : 'Search by Service'}
                </TabsTrigger>
              </TabsList>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
                  <Input
                    placeholder={language === 'ar' 
                      ? (searchType === 'specialty' ? 'ابحث عن تخصص أو خدمة...' : 'ابحث بكود SBS أو اسم الخدمة...')
                      : (searchType === 'specialty' ? 'Search specialty or service...' : 'Search by SBS code or service name...')
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`${isRTL ? 'pr-10' : 'pl-10'}`}
                  />
                </div>
                
                {searchType === 'specialty' && (
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className={`w-full sm:w-[200px] ${isRTL ? 'text-right' : ''}`}>
                      <Filter className="h-4 w-4 me-2" />
                      <SelectValue placeholder={language === 'ar' ? 'التصنيف' : 'Category'} />
                    </SelectTrigger>
                    <SelectContent className={isRTL ? 'text-right' : ''}>
                      <SelectItem value="all" className={isRTL ? 'text-right' : ''}>
                        {language === 'ar' ? 'جميع التصنيفات' : 'All Categories'}
                      </SelectItem>
                      {specialtyCategories.map(cat => (
                        <SelectItem key={cat.id} value={cat.nameEn} className={isRTL ? 'text-right' : ''}>
                          {language === 'ar' ? cat.nameAr : cat.nameEn}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Legend */}
        <Card className="mb-6 border-muted">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 items-center justify-start">
              <span className="text-sm font-medium text-muted-foreground">
                {language === 'ar' ? 'دليل الألوان:' : 'Legend:'}
              </span>
              <div className="flex flex-wrap gap-3 items-center">
                {getPrivilegeBadge('core')}
                <span className="text-xs text-muted-foreground">
                  {language === 'ar' ? '- خدمة أساسية ضمن التدريب' : '- Core training service'}
                </span>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                {getPrivilegeBadge('extended')}
                <span className="text-xs text-muted-foreground">
                  {language === 'ar' ? '- خدمة موسعة بخبرة إضافية' : '- Extended with experience'}
                </span>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                {getPrivilegeBadge('requires_training')}
                <span className="text-xs text-muted-foreground">
                  {language === 'ar' ? '- يتطلب زمالة/تدريب إضافي' : '- Requires fellowship/training'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {searchType === 'specialty' ? (
          <div className="grid md:grid-cols-3 gap-6" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Specialties List - Always first in DOM, will be on the right in RTL */}
            <div className="md:col-span-1 order-1">
              <Card className="border-primary/20">
                <CardHeader className="pb-2">
                  <CardTitle className={`text-sm flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                    <Users className="h-4 w-4 text-primary" />
                    {language === 'ar' ? 'التخصصات الطبية' : 'Medical Specialties'}
                    <Badge variant="outline" className={isRTL ? 'mr-auto' : 'ml-auto'}>
                      {filteredSpecialties.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2 max-h-[60vh] overflow-y-auto">
                  <div className="space-y-1">
                    {filteredSpecialties.map(specialty => (
                      <button
                        key={specialty.id}
                        onClick={() => setSelectedSpecialty(specialty.id)}
                        className={`w-full p-3 rounded-lg text-sm transition-colors ${isRTL ? 'text-right' : 'text-left'} ${
                          selectedSpecialty === specialty.id
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted'
                        }`}
                      >
                        <div className="font-medium">
                          {language === 'ar' ? specialty.nameAr : specialty.nameEn}
                        </div>
                        <div className={`text-xs mt-1 ${selectedSpecialty === specialty.id ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                          {language === 'ar' ? specialty.categoryAr : specialty.categoryEn} • {specialty.services.length} {language === 'ar' ? 'خدمة' : 'services'}
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Services List - Always second in DOM, will be on the left in RTL */}
            <div className="md:col-span-2 order-2">
              {selectedSpecialtyData ? (
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Stethoscope className="h-5 w-5 text-primary shrink-0" />
                      <div className={isRTL ? 'text-right' : 'text-left'}>
                        <div>{language === 'ar' ? selectedSpecialtyData.nameAr : selectedSpecialtyData.nameEn}</div>
                        <div className="text-sm font-normal text-muted-foreground mt-1">
                          {language === 'ar' ? selectedSpecialtyData.description.ar : selectedSpecialtyData.description.en}
                        </div>
                      </div>
                    </CardTitle>
                    
                    {/* Privilege Filter */}
                    <div className="flex gap-2 mt-4 flex-wrap justify-start">
                      {(['all', 'core', 'extended', 'requires_training'] as const).map(filter => (
                        <button
                          key={filter}
                          onClick={() => setPrivilegeFilter(filter)}
                          className={`px-3 py-1 rounded-full text-xs transition-colors ${
                            privilegeFilter === filter
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted hover:bg-muted/80'
                          }`}
                        >
                          {filter === 'all' && (language === 'ar' ? 'الكل' : 'All')}
                          {filter === 'core' && (language === 'ar' ? 'أساسي' : 'Core')}
                          {filter === 'extended' && (language === 'ar' ? 'موسع' : 'Extended')}
                          {filter === 'requires_training' && (language === 'ar' ? 'يتطلب تدريب' : 'Requires Training')}
                        </button>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[50vh] overflow-y-auto">
                    <div className="space-y-3">
                      {filteredServices.map((service, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-lg border ${
                            service.privilegeType === 'requires_training' 
                              ? 'border-info/30 bg-info/5' 
                              : service.privilegeType === 'extended'
                              ? 'border-warning/30 bg-warning/5'
                              : 'border-success/30 bg-success/5'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="text-right w-full">
                              <div className={`flex items-center gap-2 flex-wrap ${isRTL ? 'justify-end' : 'justify-start'}`}>
                                <Badge variant="outline" className="font-mono text-xs">
                                  {service.sbsCode}
                                </Badge>
                                {getPrivilegeBadge(service.privilegeType)}
                              </div>
                              <div className="font-medium mt-2">
                                {language === 'ar' ? service.serviceNameAr : service.serviceNameEn}
                              </div>
                              {service.privilegeType === 'requires_training' && service.trainingRequirementAr && (
                                <div className="text-xs text-info mt-2 flex items-center gap-1">
                                  <GraduationCap className="h-3 w-3" />
                                  {language === 'ar' ? service.trainingRequirementAr : service.trainingRequirementEn}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {filteredServices.length === 0 && (
                        <div className={`py-8 text-muted-foreground ${isRTL ? 'text-right' : 'text-center'}`}>
                          {language === 'ar' ? 'لا توجد خدمات مطابقة للبحث' : 'No matching services found'}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-dashed">
                  <CardContent className={`py-12 ${isRTL ? 'text-right' : 'text-center'}`}>
                    <Stethoscope className={`h-12 w-12 text-muted-foreground mb-4 ${isRTL ? 'mr-auto' : 'mx-auto'}`} />
                    <p className="text-muted-foreground">
                      {language === 'ar' 
                        ? 'اختر تخصصاً من القائمة لعرض الخدمات والصلاحيات'
                        : 'Select a specialty from the list to view services and privileges'}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        ) : (
          /* Service Search Results */
          <div className="space-y-4">
            {searchQuery.length < 2 ? (
              <Card className="border-dashed">
                <CardContent className={`py-12 ${isRTL ? 'text-right' : 'text-center'}`}>
                  <Search className={`h-12 w-12 text-muted-foreground mb-4 ${isRTL ? 'mr-auto' : 'mx-auto'}`} />
                  <p className="text-muted-foreground">
                    {language === 'ar' 
                      ? 'ابدأ بكتابة كود SBS أو اسم الخدمة للبحث'
                      : 'Start typing an SBS code or service name to search'}
                  </p>
                </CardContent>
              </Card>
            ) : searchServicesResults.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className={`py-12 ${isRTL ? 'text-right' : 'text-center'}`}>
                  <AlertCircle className={`h-12 w-12 text-muted-foreground mb-4 ${isRTL ? 'mr-auto' : 'mx-auto'}`} />
                  <p className="text-muted-foreground">
                    {language === 'ar' 
                      ? 'لم يتم العثور على نتائج'
                      : 'No results found'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              searchServicesResults.map((result, idx) => (
                <Card key={idx} className="border-primary/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-3 justify-start">
                      <Badge variant="outline" className="font-mono shrink-0">
                        {result.service.sbsCode}
                      </Badge>
                      <span className={isRTL ? 'text-right' : 'text-left'}>
                        {language === 'ar' ? result.service.serviceNameAr : result.service.serviceNameEn}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-sm text-muted-foreground mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {language === 'ar' ? 'التخصصات التي يمكنها تقديم هذه الخدمة:' : 'Specialties that can provide this service:'}
                    </div>
                    <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-3`} dir={isRTL ? 'rtl' : 'ltr'}>
                      {result.specialties.map((spec, specIdx) => (
                        <div
                          key={specIdx}
                          className={`p-3 rounded-lg border ${isRTL ? 'text-right' : 'text-left'} ${
                            spec.privilege.privilegeType === 'requires_training' 
                              ? 'border-info/30 bg-info/5' 
                              : spec.privilege.privilegeType === 'extended'
                              ? 'border-warning/30 bg-warning/5'
                              : 'border-success/30 bg-success/5'
                          }`}
                        >
                          <div className="font-medium text-sm">
                            {language === 'ar' ? spec.specialty.nameAr : spec.specialty.nameEn}
                          </div>
                          <div className={`mt-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                            {getPrivilegeBadge(spec.privilege.privilegeType)}
                          </div>
                          {spec.privilege.privilegeType === 'requires_training' && spec.privilege.trainingRequirementAr && (
                            <div className={`text-xs text-info mt-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                              {language === 'ar' ? spec.privilege.trainingRequirementAr : spec.privilege.trainingRequirementEn}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default PhysicianPrivileges;
