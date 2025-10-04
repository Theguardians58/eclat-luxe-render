import { supabase } from '@/integrations/supabase/client';

export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

export interface DeviceInfo {
  userAgent: string;
  browserName: string;
  browserVersion: string;
  osName: string;
  osVersion: string;
  deviceType: string;
  screenWidth: number;
  screenHeight: number;
  timezone: string;
  language: string;
  hardwareConcurrency: number;
  deviceMemory?: number;
  colorDepth: number;
  pixelRatio: number;
  cookieEnabled: boolean;
  localStorage: boolean;
  sessionStorage: boolean;
}

class TrackingService {
  private sessionId: string;
  private deviceFingerprint: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.deviceFingerprint = '';
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  async collectLocationData(): Promise<LocationData | null> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp,
          });
        },
        (error) => {
          console.warn('Location access denied:', error);
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        }
      );
    });
  }

  async collectDeviceInfo(): Promise<DeviceInfo> {
    // Parse user agent
    const userAgent = navigator.userAgent;
    const parser = this.parseUserAgent(userAgent);

    return {
      userAgent,
      browserName: parser.browser.name || 'Unknown',
      browserVersion: parser.browser.version || 'Unknown',
      osName: parser.os.name || 'Unknown',
      osVersion: parser.os.version || 'Unknown',
      deviceType: this.getDeviceType(),
      screenWidth: screen.width,
      screenHeight: screen.height,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      hardwareConcurrency: navigator.hardwareConcurrency || 0,
      deviceMemory: (navigator as any).deviceMemory,
      colorDepth: screen.colorDepth,
      pixelRatio: window.devicePixelRatio,
      cookieEnabled: navigator.cookieEnabled,
      localStorage: this.testStorage('localStorage'),
      sessionStorage: this.testStorage('sessionStorage'),
    };
  }

  private parseUserAgent(userAgent: string) {
    // Simple user agent parsing (you might want to use a library like ua-parser-js)
    const browser = {
      name: 'Unknown',
      version: 'Unknown'
    };
    const os = {
      name: 'Unknown',    
      version: 'Unknown'
    };

    // Chrome
    if (userAgent.includes('Chrome')) {
      browser.name = 'Chrome';
      const match = userAgent.match(/Chrome\/([0-9.]+)/);
      if (match) browser.version = match[1];
    }
    // Firefox
    else if (userAgent.includes('Firefox')) {
      browser.name = 'Firefox';
      const match = userAgent.match(/Firefox\/([0-9.]+)/);
      if (match) browser.version = match[1];
    }
    // Safari
    else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
      browser.name = 'Safari';
      const match = userAgent.match(/Version\/([0-9.]+)/);
      if (match) browser.version = match[1];
    }

    // OS Detection
    if (userAgent.includes('Windows')) {
      os.name = 'Windows';
    } else if (userAgent.includes('Mac')) {
      os.name = 'macOS';
    } else if (userAgent.includes('Linux')) {
      os.name = 'Linux';
    } else if (userAgent.includes('Android')) {
      os.name = 'Android';
    } else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
      os.name = 'iOS';
    }

    return { browser, os };
  }

  private getDeviceType(): string {
    const userAgent = navigator.userAgent;
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
      return 'tablet';
    }
    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
      return 'mobile';
    }
    return 'desktop';
  }

  private testStorage(type: 'localStorage' | 'sessionStorage'): boolean {
    try {
      const storage = window[type];
      const testKey = '__storage_test__';
      storage.setItem(testKey, 'test');
      storage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  private async generateDeviceFingerprint(deviceInfo: DeviceInfo): Promise<string> {
    const fingerprintData = JSON.stringify({
      userAgent: deviceInfo.userAgent,
      screen: `${deviceInfo.screenWidth}x${deviceInfo.screenHeight}`,
      timezone: deviceInfo.timezone,
      language: deviceInfo.language,
      platform: navigator.platform,
      colorDepth: deviceInfo.colorDepth,
      pixelRatio: deviceInfo.pixelRatio,
    });

    // Create a simple hash (in production, use crypto.subtle.digest)
    let hash = 0;
    for (let i = 0; i < fingerprintData.length; i++) {
      const char = fingerprintData.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }

    return `fp_${Math.abs(hash).toString(36)}`;
  }

  async recordConsent(consentType: string, granted: boolean): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      await supabase.from('user_consent').insert({
        user_id: user?.id || null,
        session_id: this.sessionId,
        consent_type: consentType,
        granted,
      });
    } catch (error) {
      console.error('Failed to record consent:', error);
    }
  }

  async trackUserSession(options: {
    requestLocation?: boolean;
    pageUrl?: string;
    referrer?: string;
  } = {}): Promise<void> {
    try {
      const deviceInfo = await this.collectDeviceInfo();
      this.deviceFingerprint = await this.generateDeviceFingerprint(deviceInfo);

      let locationData: LocationData | null = null;
      if (options.requestLocation) {
        locationData = await this.collectLocationData();
      }

      const { data: { user } } = await supabase.auth.getUser();

      const sessionData = {
        user_id: user?.id || null,
        session_id: this.sessionId,
        device_fingerprint: this.deviceFingerprint,
        
        // Location data
        latitude: locationData?.latitude || null,
        longitude: locationData?.longitude || null,
        location_accuracy: locationData?.accuracy || null,
        
        // Device information
        user_agent: deviceInfo.userAgent,
        browser_name: deviceInfo.browserName,
        browser_version: deviceInfo.browserVersion,
        os_name: deviceInfo.osName,
        os_version: deviceInfo.osVersion,
        device_type: deviceInfo.deviceType,
        screen_width: deviceInfo.screenWidth,
        screen_height: deviceInfo.screenHeight,
        timezone: deviceInfo.timezone,
        language: deviceInfo.language,
        hardware_concurrency: deviceInfo.hardwareConcurrency,
        device_memory: deviceInfo.deviceMemory || null,
        color_depth: deviceInfo.colorDepth,
        pixel_ratio: deviceInfo.pixelRatio,
        
        // Page data
        page_url: options.pageUrl || window.location.href,
        referrer: options.referrer || document.referrer,
      };

      await supabase.from('user_sessions').insert(sessionData);
    } catch (error) {
      console.error('Failed to track user session:', error);
    }
  }

  async updateLocation(): Promise<void> {
    try {
      const locationData = await this.collectLocationData();
      if (locationData) {
        await supabase
          .from('user_sessions')
          .update({
            latitude: locationData.latitude,
            longitude: locationData.longitude,
            location_accuracy: locationData.accuracy,
            updated_at: new Date().toISOString(),
          })
          .eq('session_id', this.sessionId);
      }
    } catch (error) {
      console.error('Failed to update location:', error);
    }
  }

  getSessionId(): string {
    return this.sessionId;
  }

  getDeviceFingerprint(): string {
    return this.deviceFingerprint;
  }
}

export const trackingService = new TrackingService();
  
