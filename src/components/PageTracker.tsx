import { usePageTracking } from '@/hooks/usePageTracking';
import { useTimeTracking } from '@/hooks/useTimeTracking';

export const PageTracker = () => {
  usePageTracking();
  useTimeTracking();
  return null;
};
