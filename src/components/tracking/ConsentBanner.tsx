import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { trackingService } from '@/services/trackingService';

interface ConsentBannerProps {
  onConsentGiven: (consents: { location: boolean; analytics: boolean }) => void;
}

export function ConsentBanner({ onConsentGiven }: ConsentBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [locationConsent, setLocationConsent] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(true);

  useEffect(() => {
    // Check if consent was already given
    const consent = localStorage.getItem('eclat-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = async () => {
    const consents = { location: true, analytics: true };
    await saveConsents(consents);
    onConsentGiven(consents);
    setIsVisible(false);
  };

  const handleAcceptSelected = async () => {
    const consents = { location: locationConsent, analytics: analyticsConsent };
    await saveConsents(consents);
    onConsentGiven(consents);
    setIsVisible(false);
  };

  const handleRejectAll = async () => {
    const consents = { location: false, analytics: false };
    await saveConsents(consents);
    onConsentGiven(consents);
    setIsVisible(false);
  };

  const saveConsents = async (consents: { location: boolean; analytics: boolean }) => {
    localStorage.setItem('eclat-consent', JSON.stringify(consents));
    
    // Record consent in database
    await trackingService.recordConsent('location', consents.location);
    await trackingService.recordConsent('analytics', consents.analytics);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Privacy Preferences</CardTitle>
          <CardDescription>
            We use cookies and collect data to improve your shopping experience. 
            Please choose your preferences below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="analytics" checked={analyticsConsent} onCheckedChange={setAnalyticsConsent} />
            <label htmlFor="analytics" className="text-sm">
              Analytics & Performance (helps us improve the site)
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="location" checked={locationConsent} onCheckedChange={setLocationConsent} />
            <label htmlFor="location" className="text-sm">
              Location Services (for delivery estimates and local stores)
            </label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button onClick={handleAcceptAll} className="w-full">
            Accept All
          </Button>
          <Button onClick={handleAcceptSelected} variant="outline" className="w-full">
            Save Preferences
          </Button>
          <Button onClick={handleRejectAll} variant="ghost" className="w-full text-xs">
            Reject All
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
      }
      
