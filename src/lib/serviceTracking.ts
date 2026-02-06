import { supabase } from '@/integrations/supabase/client';

// Get session ID from page tracking
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('session_id', sessionId);
  }
  return sessionId;
};

export interface ServiceUsageData {
  serviceName: string;
  serviceCategory: 'chat' | 'calculator' | 'checker' | 'export' | 'search' | 'other';
  metadata?: Record<string, any>;
}

// Track service usage
export const trackServiceUsage = async (data: ServiceUsageData) => {
  try {
    const sessionId = getSessionId();
    
    await supabase.from('service_usage').insert({
      service_name: data.serviceName,
      service_category: data.serviceCategory,
      session_id: sessionId,
      user_agent: navigator.userAgent,
      metadata: data.metadata || {},
    });
  } catch (error) {
    // Silently fail - don't break the app for tracking
    console.error('Failed to track service usage:', error);
  }
};

// Predefined service names for consistency
export const SERVICES = {
  SMART_ASSISTANT: 'smart_assistant',
  QUOTE_ANALYZER: 'quote_analyzer',
  SAVINGS_CALCULATOR: 'savings_calculator',
  FINES_CALCULATOR: 'fines_calculator',
  SUBLIMIT_CALCULATOR: 'sublimit_calculator',
  HALE_CALCULATOR: 'hale_calculator',
  ELIGIBILITY_CHECK: 'eligibility_check',
  PREVENTIVE_CHECK: 'preventive_check',
  PRIMARY_CARE_ASSESSMENT: 'primary_care_assessment',
  DRG_ASSESSMENT: 'drg_assessment',
  PDF_EXPORT: 'pdf_export',
  DRUG_SEARCH: 'drug_search',
} as const;
