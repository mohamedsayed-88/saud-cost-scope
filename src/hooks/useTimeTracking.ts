import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

// Get session ID
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('session_id', sessionId);
  }
  return sessionId;
};

export const useTimeTracking = () => {
  const location = useLocation();
  const startTimeRef = useRef<number>(Date.now());
  const lastPathRef = useRef<string>(location.pathname);
  const pageViewIdRef = useRef<string | null>(null);

  useEffect(() => {
    // When path changes, update time spent on previous page
    const updateTimeSpent = async () => {
      const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const sessionId = getSessionId();
      
      if (timeSpent > 0 && lastPathRef.current) {
        try {
          // Update the most recent page view for this session and path
          await supabase
            .from('page_views')
            .update({ time_spent_seconds: timeSpent })
            .eq('session_id', sessionId)
            .eq('page_path', lastPathRef.current)
            .order('created_at', { ascending: false })
            .limit(1);
        } catch (error) {
          console.error('Failed to update time spent:', error);
        }
      }
    };

    // If path changed, update time for previous page
    if (lastPathRef.current !== location.pathname) {
      updateTimeSpent();
      lastPathRef.current = location.pathname;
      startTimeRef.current = Date.now();
    }

    // Update time on page unload
    const handleBeforeUnload = () => {
      const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const sessionId = getSessionId();
      
      // Use sendBeacon for reliable tracking on page unload
      if (timeSpent > 0) {
        const data = JSON.stringify({
          time_spent_seconds: timeSpent,
          session_id: sessionId,
          page_path: location.pathname,
        });
        
        // Store in localStorage for next visit to sync
        localStorage.setItem('pending_time_update', data);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location.pathname]);

  // Sync pending time updates on mount
  useEffect(() => {
    const syncPendingUpdate = async () => {
      const pending = localStorage.getItem('pending_time_update');
      if (pending) {
        try {
          const data = JSON.parse(pending);
          await supabase
            .from('page_views')
            .update({ time_spent_seconds: data.time_spent_seconds })
            .eq('session_id', data.session_id)
            .eq('page_path', data.page_path)
            .order('created_at', { ascending: false })
            .limit(1);
          localStorage.removeItem('pending_time_update');
        } catch (error) {
          console.error('Failed to sync pending time update:', error);
        }
      }
    };

    syncPendingUpdate();
  }, []);
};
