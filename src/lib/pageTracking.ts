import { supabase } from '@/integrations/supabase/client';

// Generate or retrieve session ID
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('session_id', sessionId);
  }
  return sessionId;
};

// Fetch visitor country from IP using free geolocation API
const getVisitorCountry = async (): Promise<string | null> => {
  try {
    // Check if we already have the country cached in session
    const cachedCountry = sessionStorage.getItem('visitor_country');
    if (cachedCountry) return cachedCountry;

    const response = await fetch('https://ipapi.co/json/', { 
      signal: AbortSignal.timeout(3000) // 3 second timeout
    });
    if (!response.ok) return null;
    
    const data = await response.json();
    const country = data.country_name || data.country || null;
    
    // Cache the country for this session
    if (country) {
      sessionStorage.setItem('visitor_country', country);
    }
    
    return country;
  } catch (error) {
    // Silently fail - geolocation is optional
    return null;
  }
};

// Track page view
export const trackPageView = async (pagePath: string, pageTitle?: string) => {
  try {
    const sessionId = getSessionId();
    const country = await getVisitorCountry();
    
    await supabase.from('page_views').insert({
      page_path: pagePath,
      page_title: pageTitle || document.title,
      user_agent: navigator.userAgent,
      referrer: document.referrer || null,
      session_id: sessionId,
      country: country,
    } as any);
  } catch (error) {
    // Silently fail - don't break the app for tracking
    console.error('Failed to track page view:', error);
  }
};
