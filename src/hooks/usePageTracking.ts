import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/pageTracking';

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track the page view when location changes
    trackPageView(location.pathname);
  }, [location.pathname]);
};
