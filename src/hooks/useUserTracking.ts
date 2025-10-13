import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { logError } from '@/utils/errorLogger';

// Generate or retrieve session ID
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('tracking_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('tracking_session_id', sessionId);
  }
  return sessionId;
};

// Parse cookies
const parseCookies = (): Record<string, string> => {
  const cookies: Record<string, string> = {};
  document.cookie.split(';').forEach(cookie => {
    const [key, value] = cookie.trim().split('=');
    if (key) cookies[key] = value || '';
  });
  return cookies;
};

// Detect browser
const getBrowserInfo = (): { browser: string; version: string } => {
  const ua = navigator.userAgent;
  let browser = 'Unknown';
  let version = 'Unknown';

  if (ua.includes('Firefox/')) {
    browser = 'Firefox';
    version = ua.match(/Firefox\/(\d+\.\d+)/)?.[1] || 'Unknown';
  } else if (ua.includes('Chrome/') && !ua.includes('Edg')) {
    browser = 'Chrome';
    version = ua.match(/Chrome\/(\d+\.\d+)/)?.[1] || 'Unknown';
  } else if (ua.includes('Safari/') && !ua.includes('Chrome')) {
    browser = 'Safari';
    version = ua.match(/Version\/(\d+\.\d+)/)?.[1] || 'Unknown';
  } else if (ua.includes('Edg/')) {
    browser = 'Edge';
    version = ua.match(/Edg\/(\d+\.\d+)/)?.[1] || 'Unknown';
  }

  return { browser, version };
};

// Detect OS
const getOperatingSystem = (): string => {
  const ua = navigator.userAgent;
  if (ua.includes('Win')) return 'Windows';
  if (ua.includes('Mac')) return 'MacOS';
  if (ua.includes('Linux')) return 'Linux';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
  return 'Unknown';
};

// Detect device type
const getDeviceType = (): string => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'Tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'Mobile';
  }
  return 'Desktop';
};

export const useUserTracking = () => {
  useEffect(() => {
    const trackUser = async () => {
      try {
        // Get browser and device info
        const { browser, version } = getBrowserInfo();
        const operatingSystem = getOperatingSystem();
        const deviceType = getDeviceType();

        const trackingData = {
          sessionId: getSessionId(),
          deviceType,
          operatingSystem,
          browser,
          browserVersion: version,
          screenResolution: `${window.screen.width}x${window.screen.height}`,
          userAgent: navigator.userAgent,
          language: navigator.language,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          referrer: document.referrer || 'direct',
          cookies: parseCookies(),
        };

        // Try to get geolocation if user grants permission
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const dataWithLocation = {
                ...trackingData,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              };
              await sendTrackingData(dataWithLocation);
            },
            async () => {
              // If location denied, send without it
              await sendTrackingData(trackingData);
            },
            { timeout: 5000 }
          );
        } else {
          await sendTrackingData(trackingData);
        }
      } catch (error) {
        logError(error as Error, { 
          errorType: 'network', 
          additionalInfo: { operation: 'trackUser' } 
        });
      }
    };

    // Send tracking data to edge function
    const sendTrackingData = async (data: any) => {
      try {
        const { data: result, error } = await supabase.functions.invoke('track-user', {
          body: data,
        });

        if (error) throw error;
        console.log('User tracked successfully:', result);
      } catch (error) {
        logError(error as Error, { 
          errorType: 'network', 
          additionalInfo: { operation: 'sendTrackingData' } 
        });
      }
    };

    // Track on component mount (page load)
    trackUser();
  }, []);
};
