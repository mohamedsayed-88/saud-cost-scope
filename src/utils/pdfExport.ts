import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { type HealthService, calculatePremiumImpact } from '@/data/healthServices';
import { chiExclusions, chiSubLimits } from '@/data/chiExclusions';
import chiLogo from '@/assets/chi-logo.png';

type Language = 'en' | 'ar';

interface PDFExportData {
  selectedService: HealthService | null;
  memberCount: number;
  basePremium: number;
  language: Language;
  captureChart?: boolean;
}

export async function captureChartImage(): Promise<string | null> {
  const chartElement = document.getElementById('cost-breakdown-chart');
  if (!chartElement) return null;
  
  try {
    const canvas = await html2canvas(chartElement, {
      scale: 2,
      backgroundColor: '#ffffff',
      logging: false,
      useCORS: true,
    });
    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Error capturing chart:', error);
    return null;
  }
}

export async function generatePremiumReport(data: PDFExportData): Promise<void> {
  const { selectedService, memberCount, basePremium, language, captureChart = true } = data;
  const isArabic = language === 'ar';
  
  // Capture chart before generating PDF
  let chartImage: string | null = null;
  if (captureChart && selectedService) {
    chartImage = await captureChartImage();
  }

  // Load CHI logo
  const logoImage = await loadImageAsBase64(chiLogo);
  
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPos = margin;

  const primaryColor: [number, number, number] = [27, 107, 77];
  const secondaryColor: [number, number, number] = [45, 135, 100];
  const textColor: [number, number, number] = [51, 51, 51];
  const lightGray: [number, number, number] = [245, 247, 250];

  // Header with logo
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 55, 'F');
  
  // Add logo if loaded
  if (logoImage) {
    try {
      doc.addImage(logoImage, 'PNG', pageWidth / 2 - 15, 5, 30, 15);
    } catch (e) {
      console.error('Error adding logo:', e);
    }
  }
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Council of Health Insurance', pageWidth / 2, 28, { align: 'center' });
  doc.text('مجلس الضمان الصحي', pageWidth / 2, 36, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(isArabic ? 'Premium Impact Analysis Report | تقرير تحليل تأثير الأقساط' : 'Premium Impact Analysis Report', pageWidth / 2, 45, { align: 'center' });
  
  doc.setFontSize(9);
  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Report Date: ${dateStr}`, pageWidth / 2, 52, { align: 'center' });

  yPos = 65;

  // Executive Summary
  doc.setTextColor(...primaryColor);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(isArabic ? 'Executive Summary' : 'Executive Summary', margin, yPos);
  yPos += 8;
  doc.setDrawColor(...primaryColor);
  doc.line(margin, yPos - 3, pageWidth - margin, yPos - 3);

  const portfolioParams = [
    ['Total Members', memberCount.toLocaleString()],
    ['Base Premium (SAR)', `${basePremium.toLocaleString()} SAR`],
    ['Annual Portfolio Value', `${(memberCount * basePremium).toLocaleString()} SAR`],
  ];

  autoTable(doc, {
    startY: yPos,
    head: [['Parameter', 'Value']],
    body: portfolioParams,
    theme: 'striped',
    headStyles: { fillColor: primaryColor, textColor: [255, 255, 255], fontStyle: 'bold' },
    styles: { fontSize: 10, cellPadding: 4 },
    margin: { left: margin, right: margin },
  });

  yPos = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 15;

  // Service Analysis
  if (selectedService) {
    const impact = calculatePremiumImpact(selectedService, memberCount, basePremium);
    const impactLevel = impact.totalImpactPercent > 3 ? 'High' : impact.totalImpactPercent > 1 ? 'Medium' : 'Low';
    const totalAnnualCost = impact.additionalPremiumPerMember * memberCount;

    doc.setTextColor(...primaryColor);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Service Impact Analysis', margin, yPos);
    yPos += 8;
    doc.line(margin, yPos - 3, pageWidth - margin, yPos - 3);

    doc.setTextColor(...textColor);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`${selectedService.name}`, margin, yPos + 5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`${selectedService.nameAr}`, margin, yPos + 12);
    yPos += 20;

    const impactData = [
      ['Premium Increase', `+${impact.additionalPremiumPerMember.toFixed(2)} SAR/member/year`],
      ['Impact Percentage', `${impact.totalImpactPercent.toFixed(2)}%`],
      ['Total Annual Cost', `${totalAnnualCost.toLocaleString()} SAR`],
      ['Impact Level', impactLevel],
    ];

    autoTable(doc, {
      startY: yPos,
      head: [['Metric', 'Value']],
      body: impactData,
      theme: 'striped',
      headStyles: { fillColor: secondaryColor, textColor: [255, 255, 255], fontStyle: 'bold' },
      styles: { fontSize: 10, cellPadding: 4 },
      margin: { left: margin, right: margin },
    });

    yPos = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 15;

    // Add chart image if captured
    if (chartImage) {
      doc.setTextColor(...primaryColor);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Premium Cost Breakdown', margin, yPos);
      yPos += 5;
      
      const chartWidth = 80;
      const chartHeight = 60;
      const chartX = (pageWidth - chartWidth) / 2;
      
      try {
        doc.addImage(chartImage, 'PNG', chartX, yPos, chartWidth, chartHeight);
        yPos += chartHeight + 10;
      } catch (e) {
        console.error('Error adding chart to PDF:', e);
      }
    }

    const actuarialData = [
      ['Prevalence Rate', `${(selectedService.prevalencePerThousand / 10).toFixed(2)}%`],
      ['Avg Treatment Cost', `${selectedService.averageTreatmentCostSAR.toLocaleString()} SAR`],
      ['Expected Claims/1000', `${impact.expectedClaimsPerThousand.toFixed(1)}`],
      ['Risk Loading', `${((impact.riskLoadingFactor - 1) * 100).toFixed(0)}%`],
    ];

    // Check if we need new page
    if (yPos > pageHeight - 80) {
      doc.addPage();
      yPos = margin;
    }

    autoTable(doc, {
      startY: yPos,
      head: [['Actuarial Parameters', '']],
      body: actuarialData,
      theme: 'striped',
      headStyles: { fillColor: [100, 100, 100], textColor: [255, 255, 255], fontStyle: 'bold' },
      styles: { fontSize: 10, cellPadding: 4 },
      margin: { left: margin, right: margin },
    });

    yPos = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 15;

    // Recommendations box
    if (yPos > pageHeight - 60) {
      doc.addPage();
      yPos = margin;
    }

    doc.setFillColor(...lightGray);
    doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 30, 3, 3, 'F');
    
    doc.setTextColor(...primaryColor);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Recommendations', margin + 5, yPos + 8);
    
    doc.setTextColor(...textColor);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    const recommendation = impactLevel === 'High' 
      ? 'Consider implementing cost-sharing mechanisms or annual limits to manage premium impact.'
      : impactLevel === 'Medium'
      ? 'Benefit is viable with appropriate utilization management protocols.'
      : 'Benefit can be added with minimal premium adjustment. Consider as priority inclusion.';
    
    doc.text(recommendation, margin + 5, yPos + 18, { maxWidth: pageWidth - 2 * margin - 10 });
    yPos += 40;
  }

  // Exclusions page
  doc.addPage();
  yPos = margin;

  doc.setTextColor(...primaryColor);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('CHI Exclusions Summary', margin, yPos);
  yPos += 8;
  doc.line(margin, yPos - 3, pageWidth - margin, yPos - 3);

  const exclusionsData = chiExclusions.slice(0, 12).map(exc => [
    exc.name,
    exc.category,
    exc.estimatedDemand.charAt(0).toUpperCase() + exc.estimatedDemand.slice(1),
    exc.potentialCostSAR ? `${exc.potentialCostSAR.toLocaleString()} SAR` : 'N/A'
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [['Exclusion', 'Category', 'Demand', 'Est. Cost']],
    body: exclusionsData,
    theme: 'striped',
    headStyles: { fillColor: [180, 70, 70], textColor: [255, 255, 255], fontStyle: 'bold' },
    styles: { fontSize: 9, cellPadding: 3 },
    columnStyles: { 0: { cellWidth: 65 } },
    margin: { left: margin, right: margin },
  });

  yPos = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 15;

  // Sub-Limits
  if (yPos > pageHeight - 80) {
    doc.addPage();
    yPos = margin;
  }

  doc.setTextColor(...primaryColor);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('CHI Sub-Limits Overview', margin, yPos);
  yPos += 8;
  doc.line(margin, yPos - 3, pageWidth - margin, yPos - 3);

  const subLimitsData = chiSubLimits.slice(0, 12).map(sub => [
    sub.benefit,
    `${sub.currentLimitSAR.toLocaleString()} SAR`,
    `${sub.utilizationRate.toFixed(1)}%`,
    `${sub.avgClaimSAR.toLocaleString()} SAR`
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [['Benefit', 'Current Limit', 'Utilization', 'Avg Claim']],
    body: subLimitsData,
    theme: 'striped',
    headStyles: { fillColor: primaryColor, textColor: [255, 255, 255], fontStyle: 'bold' },
    styles: { fontSize: 9, cellPadding: 3 },
    columnStyles: { 0: { cellWidth: 55 } },
    margin: { left: margin, right: margin },
  });

  // Footer on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFillColor(...lightGray);
    doc.rect(0, pageHeight - 18, pageWidth, 18, 'F');
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(8);
    doc.text(`CHI Actuarial Tool - Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    doc.text('Confidential - For internal use only', pageWidth / 2, pageHeight - 5, { align: 'center' });
  }

  doc.save(`CHI_Premium_Report_${new Date().toISOString().split('T')[0]}.pdf`);
}

// Preventive Services Eligibility PDF Export
interface PreventiveEligibilityData {
  beneficiaryType: string;
  beneficiaryTypeEn: string;
  age: number;
  gender: 'male' | 'female';
  conditions: string[];
  conditionsEn: string[];
  eligibleServices: Array<{
    nameAr: string;
    nameEn: string;
    category: string;
    coverage: string;
    coverageAr: string;
    icd10Codes: string[];
    sbsCodes: string[];
    frequency: string;
    frequencyEn: string;
  }>;
  preventiveCovered: boolean;
  language: 'ar' | 'en';
}

// Helper function to load image as base64
async function loadImageAsBase64(imagePath: string): Promise<string | null> {
  try {
    const response = await fetch(imagePath);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error loading image:', error);
    return null;
  }
}

export async function generatePreventiveEligibilityReport(data: PreventiveEligibilityData): Promise<void> {
  const { beneficiaryType, beneficiaryTypeEn, age, gender, conditions, conditionsEn, eligibleServices, preventiveCovered } = data;
  
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPos = margin;

  const primaryColor: [number, number, number] = [27, 107, 77];
  const secondaryColor: [number, number, number] = [45, 135, 100];
  const textColor: [number, number, number] = [51, 51, 51];
  const lightGray: [number, number, number] = [245, 247, 250];
  const warningColor: [number, number, number] = [180, 70, 70];

  // Load CHI logo
  const logoImage = await loadImageAsBase64(chiLogo);

  // Header with logo
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 55, 'F');
  
  // Add logo if loaded
  if (logoImage) {
    try {
      doc.addImage(logoImage, 'PNG', pageWidth / 2 - 15, 5, 30, 15);
    } catch (e) {
      console.error('Error adding logo:', e);
    }
  }
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Council of Health Insurance', pageWidth / 2, 28, { align: 'center' });
  doc.text('مجلس الضمان الصحي', pageWidth / 2, 36, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Preventive Services Eligibility Report | تقرير أهلية الخدمات الوقائية', pageWidth / 2, 45, { align: 'center' });
  
  doc.setFontSize(9);
  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const dateStrAr = new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Report Date: ${dateStr} | تاريخ التقرير: ${dateStrAr}`, pageWidth / 2, 52, { align: 'center' });

  yPos = 65;

  // Beneficiary Information - Bilingual
  doc.setTextColor(...primaryColor);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Beneficiary Information | معلومات المستفيد', margin, yPos);
  yPos += 6;
  doc.setDrawColor(...primaryColor);
  doc.line(margin, yPos - 2, pageWidth - margin, yPos - 2);

  const beneficiaryInfo = [
    ['Health Coverage Type | نوع التغطية الصحية', `${beneficiaryTypeEn} | ${beneficiaryType}`],
    ['Age | العمر', `${age} years | ${age} سنة`],
    ['Gender | الجنس', gender === 'male' ? 'Male | ذكر' : 'Female | أنثى'],
    ['Health Conditions | الحالات الصحية', conditionsEn.length > 0 ? `${conditionsEn.join(', ')} | ${conditions.join('، ')}` : 'None specified | لم يتم تحديد'],
  ];

  autoTable(doc, {
    startY: yPos,
    head: [['Parameter | البيان', 'Value | القيمة']],
    body: beneficiaryInfo,
    theme: 'striped',
    headStyles: { fillColor: primaryColor, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 9 },
    styles: { fontSize: 9, cellPadding: 3 },
    margin: { left: margin, right: margin },
  });

  yPos = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 12;

  // Coverage Status - Bilingual
  if (!preventiveCovered) {
    doc.setFillColor(255, 240, 240);
    doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 28, 3, 3, 'F');
    doc.setTextColor(...warningColor);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('WARNING: Preventive Services Not Covered', margin + 5, yPos + 8);
    doc.text('تحذير: الخدمات الوقائية غير مغطاة', pageWidth - margin - 5, yPos + 8, { align: 'right' });
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Your insurance type only covers emergency cases (severity 1-3).', margin + 5, yPos + 17);
    doc.text('نوع التأمين الخاص بك يغطي حالات الطوارئ فقط (درجة 1-3)', pageWidth - margin - 5, yPos + 24, { align: 'right' });
    yPos += 35;
  } else {
    doc.setFillColor(240, 255, 245);
    doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 22, 3, 3, 'F');
    doc.setTextColor(...secondaryColor);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`You are eligible for ${eligibleServices.length} preventive services`, margin + 5, yPos + 9);
    doc.text(`أنت مؤهل لـ ${eligibleServices.length} خدمة وقائية`, pageWidth - margin - 5, yPos + 17, { align: 'right' });
    yPos += 28;
  }

  // Eligible Services - Bilingual Table
  if (preventiveCovered && eligibleServices.length > 0) {
    doc.setTextColor(...primaryColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Eligible Preventive Services | الخدمات الوقائية المتاحة', margin, yPos);
    yPos += 6;
    doc.line(margin, yPos - 2, pageWidth - margin, yPos - 2);

    const servicesData = eligibleServices.map(service => [
      `${service.nameEn}\n${service.nameAr}`,
      service.coverageAr,
      service.icd10Codes.slice(0, 2).join(', '),
      service.sbsCodes.slice(0, 2).join(', '),
      `${service.frequencyEn}\n${service.frequency}`
    ]);

    autoTable(doc, {
      startY: yPos,
      head: [['Service | الخدمة', 'Coverage | التغطية', 'ICD-10', 'SBS', 'Frequency | التكرار']],
      body: servicesData,
      theme: 'striped',
      headStyles: { fillColor: secondaryColor, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 8 },
      styles: { fontSize: 7, cellPadding: 2, minCellHeight: 8 },
      columnStyles: { 
        0: { cellWidth: 55 },
        1: { cellWidth: 30 },
        2: { cellWidth: 25 },
        3: { cellWidth: 25 },
        4: { cellWidth: 30 }
      },
      margin: { left: margin, right: margin },
      didDrawPage: function(tableData) {
        // Add header on new pages
        if (tableData.pageNumber > 1) {
          doc.setFillColor(...primaryColor);
          doc.rect(0, 0, pageWidth, 15, 'F');
          doc.setTextColor(255, 255, 255);
          doc.setFontSize(9);
          doc.text('Preventive Services Eligibility Report (continued) | تقرير أهلية الخدمات الوقائية (تابع)', pageWidth / 2, 10, { align: 'center' });
        }
      }
    });

    yPos = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 12;
  }

  // Notes section - Bilingual
  if (yPos > pageHeight - 65) {
    doc.addPage();
    yPos = margin;
  }

  doc.setFillColor(...lightGray);
  doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 45, 3, 3, 'F');
  
  doc.setTextColor(...primaryColor);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Important Notes | ملاحظات مهمة', margin + 5, yPos + 8);
  
  doc.setTextColor(...textColor);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('1. This report is for informational purposes. Contact your insurance provider for coverage confirmation.', margin + 5, yPos + 16);
  doc.text('    هذا التقرير للأغراض المعلوماتية. تواصل مع شركة التأمين للتأكد من التغطية.', margin + 5, yPos + 22);
  doc.text('2. Eligibility may vary based on your specific policy terms and conditions.', margin + 5, yPos + 29);
  doc.text('    قد تختلف الأهلية بناءً على شروط وأحكام وثيقتك.', margin + 5, yPos + 35);
  doc.text('3. For inquiries, contact CHI at 920001177 or visit chi.gov.sa', margin + 5, yPos + 42);

  // Footer on all pages - Bilingual
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFillColor(...lightGray);
    doc.rect(0, pageHeight - 18, pageWidth, 18, 'F');
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(7);
    doc.text(`CHI Preventive Services Guide | دليل الخدمات الوقائية - Page ${i} of ${totalPages} | صفحة ${i} من ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    doc.text('For personal use only | للاستخدام الشخصي فقط', pageWidth / 2, pageHeight - 5, { align: 'center' });
  }

  doc.save(`CHI_Preventive_Eligibility_${new Date().toISOString().split('T')[0]}.pdf`);
}

// Quote Analysis PDF Export
interface QuoteAnalysisData {
  fileName: string;
  analysisContent: string;
  language: 'ar' | 'en';
}

export async function generateQuoteAnalysisReport(data: QuoteAnalysisData): Promise<void> {
  const { fileName, analysisContent, language } = data;
  const isArabic = language === 'ar';
  
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPos = margin;

  const primaryColor: [number, number, number] = [27, 107, 77];
  const textColor: [number, number, number] = [51, 51, 51];
  const lightGray: [number, number, number] = [245, 247, 250];

  // Load CHI logo
  const logoImage = await loadImageAsBase64(chiLogo);

  // Header with logo
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 55, 'F');
  
  if (logoImage) {
    try {
      doc.addImage(logoImage, 'PNG', pageWidth / 2 - 15, 5, 30, 15);
    } catch (e) {
      console.error('Error adding logo:', e);
    }
  }
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Council of Health Insurance', pageWidth / 2, 28, { align: 'center' });
  doc.text('مجلس الضمان الصحي', pageWidth / 2, 36, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(isArabic ? 'تقرير تحليل العرض السعري' : 'Insurance Quote Analysis Report', pageWidth / 2, 45, { align: 'center' });
  
  doc.setFontSize(9);
  const dateStr = new Date().toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`${isArabic ? 'تاريخ التقرير:' : 'Report Date:'} ${dateStr}`, pageWidth / 2, 52, { align: 'center' });

  yPos = 65;

  // File Info
  doc.setFillColor(...lightGray);
  doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 15, 3, 3, 'F');
  doc.setTextColor(...primaryColor);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(isArabic ? 'الملف المحلل:' : 'Analyzed File:', margin + 5, yPos + 6);
  doc.setTextColor(...textColor);
  doc.setFont('helvetica', 'normal');
  doc.text(fileName, margin + 5, yPos + 12);
  yPos += 22;

  // Analysis Content
  doc.setTextColor(...primaryColor);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(isArabic ? 'نتيجة التحليل' : 'Analysis Result', margin, yPos);
  yPos += 6;
  doc.setDrawColor(...primaryColor);
  doc.line(margin, yPos - 2, pageWidth - margin, yPos - 2);
  yPos += 5;

  // Process analysis content - split into lines
  doc.setTextColor(...textColor);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  const contentWidth = pageWidth - 2 * margin;
  const lineHeight = 5;
  const lines = analysisContent.split('\n');

  for (const line of lines) {
    // Check for headers (lines starting with ** or #)
    const isHeader = line.startsWith('**') || line.startsWith('#') || line.startsWith('##');
    const isBullet = line.trim().startsWith('-') || line.trim().startsWith('•') || line.trim().startsWith('✓') || line.trim().startsWith('⬆') || line.trim().startsWith('⚠');
    
    // Clean the line from markdown
    let cleanLine = line
      .replace(/\*\*/g, '')
      .replace(/^#+\s*/, '')
      .replace(/^---+$/, '');
    
    if (cleanLine.trim() === '') {
      yPos += 3;
      continue;
    }

    // Check for new page
    if (yPos > pageHeight - 30) {
      doc.addPage();
      yPos = margin;
    }

    if (isHeader) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(...primaryColor);
      yPos += 3;
    } else {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...textColor);
    }

    // Word wrap
    const wrappedLines = doc.splitTextToSize(cleanLine, isBullet ? contentWidth - 5 : contentWidth);
    
    for (const wrappedLine of wrappedLines) {
      if (yPos > pageHeight - 25) {
        doc.addPage();
        yPos = margin;
      }
      doc.text(wrappedLine, isBullet ? margin + 5 : margin, yPos);
      yPos += lineHeight;
    }
  }

  // Footer on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFillColor(...lightGray);
    doc.rect(0, pageHeight - 18, pageWidth, 18, 'F');
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(7);
    doc.text(
      isArabic 
        ? `ضمان للذكاء الاصطناعي - تحليل العروض | صفحة ${i} من ${totalPages}`
        : `Daman Intelligence - Quote Analysis | Page ${i} of ${totalPages}`, 
      pageWidth / 2, 
      pageHeight - 10, 
      { align: 'center' }
    );
    doc.text(
      isArabic ? 'للاستخدام الداخلي فقط' : 'For internal use only', 
      pageWidth / 2, 
      pageHeight - 5, 
      { align: 'center' }
    );
  }

  doc.save(`Quote_Analysis_${new Date().toISOString().split('T')[0]}.pdf`);
}
