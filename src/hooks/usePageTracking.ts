import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackingService } from '@/services/trackingService';

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    const consent = localStorage.getItem('eclat-consent');
    if (consent) {
      const parsedConsent = JSON.parse(consent);
      if (parsedConsent.analytics) {
        trackingService.trackUserSession({
          requestLocation: parsedConsent.location,
          pageUrl: window.location.href,
          referrer: document.referrer,
        });
      }
    }
  }, [location]);
}
