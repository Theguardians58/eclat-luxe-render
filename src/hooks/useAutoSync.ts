// src/hooks/useAutoSync.ts

import { useEffect } from 'react';
import { trackingService } from '@/services/trackingService';

export function useAutoSync(intervalMs: number = 5 * 60 * 1000): void {
  useEffect(() => {
    // Initial sync on mount
    trackingService.trackUserSession({ requestLocation: true });

    // Periodic location updates
    const timerId = setInterval(() => {
      trackingService.updateLocation();
    }, intervalMs);

    // Cleanup on unmount
    return () => {
      clearInterval(timerId);
    };
  }, [intervalMs]);
            }
