import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { PageTracker } from "@/components/PageTracker";
import { ScrollToTop } from "@/components/ScrollToTop";

import { AccessibilityToolbar } from "@/components/AccessibilityToolbar";
import Index from "./pages/Index";
import InsuranceCategories from "./pages/InsuranceCategories";
import BeneficiaryHealth from "./pages/BeneficiaryHealth";
import NafeesPlatform from "./pages/NafeesPlatform";
import PreventiveServices from "./pages/PreventiveServices";
import DRGImplementation from "./pages/DRGImplementation";
import PrimaryCare from "./pages/PrimaryCare";
import PriorAuthorization from "./pages/PriorAuthorization";
import BenefitsPackage from "./pages/BenefitsPackage";
import DamanIntelligence from "./pages/DamanIntelligence";
import FinesCalculator from "./pages/FinesCalculator";
import InsuranceEligibility from "./pages/InsuranceEligibility";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import QuestionsLog from "./pages/QuestionsLog";
import Analytics from "./pages/Analytics";
import Sitemap from "./pages/Sitemap";
import PriorAuthChecker from "./pages/PriorAuthChecker";
import MedicalCodingAssistant from "./pages/MedicalCodingAssistant";
import ComplianceReport from "./pages/ComplianceReport";
import DrugCoverageChecker from "./pages/DrugCoverageChecker";
import SearchesLog from "./pages/SearchesLog";
import PractitionerVerification from "./pages/PractitionerVerification";
import PhysicianPrivileges from "./pages/PhysicianPrivileges";
import PolicyComparison from "./pages/PolicyComparison";
import QuoteAnalysis from "./pages/QuoteAnalysis";
import EmployerAssistant from "./pages/EmployerAssistant";

import PopulationHealthTips from "./pages/PopulationHealthTips";
import EconomicAnalysis from "./pages/EconomicAnalysis";
import PreventiveUtilizationIndicator from "./pages/PreventiveUtilizationIndicator";


const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            
            <ScrollToTop />
            <PageTracker />
            <AccessibilityToolbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/insurance-categories" element={<InsuranceCategories />} />
              <Route path="/beneficiary-health" element={<BeneficiaryHealth />} />
              <Route path="/nafees-platform" element={<NafeesPlatform />} />
              <Route path="/preventive-services" element={<PreventiveServices />} />
              <Route path="/drg-implementation" element={<DRGImplementation />} />
              <Route path="/primary-care" element={<PrimaryCare />} />
              <Route path="/prior-authorization" element={<PriorAuthorization />} />
              <Route path="/benefits-package" element={<BenefitsPackage />} />
              <Route path="/daman-intelligence" element={<DamanIntelligence />} />
              <Route path="/fines-calculator" element={<FinesCalculator />} />
              <Route path="/insurance-eligibility" element={<InsuranceEligibility />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="/prior-auth-checker" element={<PriorAuthChecker />} />
              <Route path="/medical-coding" element={<MedicalCodingAssistant />} />
              <Route path="/compliance-report" element={<ComplianceReport />} />
              <Route path="/drug-coverage" element={<DrugCoverageChecker />} />
              <Route path="/drug-coverage-checker" element={<DrugCoverageChecker />} />
              <Route path="/admin/questions-log" element={<QuestionsLog />} />
              <Route path="/admin/analytics" element={<Analytics />} />
              <Route path="/admin/searches-log" element={<SearchesLog />} />
              <Route path="/practitioner-verification" element={<PractitionerVerification />} />
              <Route path="/physician-privileges" element={<PhysicianPrivileges />} />
              <Route path="/medical-coding-assistant" element={<MedicalCodingAssistant />} />
              <Route path="/policy-comparison" element={<PolicyComparison />} />
              <Route path="/quote-analysis" element={<QuoteAnalysis />} />
              <Route path="/employer-assistant" element={<EmployerAssistant />} />
              
              <Route path="/population-health-tips" element={<PopulationHealthTips />} />
              <Route path="/economic-analysis" element={<EconomicAnalysis />} />
              <Route path="/preventive-utilization-indicator" element={<PreventiveUtilizationIndicator />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
