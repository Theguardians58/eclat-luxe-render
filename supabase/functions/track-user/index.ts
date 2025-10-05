import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TrackingData {
  sessionId: string;
  deviceType: string;
  operatingSystem: string;
  browser: string;
  browserVersion: string;
  screenResolution: string;
  userAgent: string;
  language: string;
  timezone: string;
  referrer: string;
  cookies: Record<string, string>;
  latitude?: number;
  longitude?: number;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Get client IP address
    const ipAddress = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
                      req.headers.get('x-real-ip') || 
                      'unknown';

    // Parse request body
    const trackingData: TrackingData = await req.json();

    console.log('Tracking data received:', {
      ip: ipAddress,
      sessionId: trackingData.sessionId,
      device: trackingData.deviceType
    });

    // Get location from IP using ipapi.co (free tier: 1000 requests/day)
    let locationData: any = {};
    try {
      const locationResponse = await fetch(`https://ipapi.co/${ipAddress}/json/`);
      if (locationResponse.ok) {
        locationData = await locationResponse.json();
        console.log('Location data fetched:', locationData.city, locationData.country_name);
      }
    } catch (error) {
      console.error('Failed to fetch location:', error);
    }

    // Get current user if authenticated
    const authHeader = req.headers.get('Authorization');
    let userId = null;
    
    if (authHeader) {
      const { data: { user } } = await supabaseClient.auth.getUser(
        authHeader.replace('Bearer ', '')
      );
      userId = user?.id || null;
    }

    // Insert tracking data
    const { data, error } = await supabaseClient
      .from('user_tracking')
      .insert({
        user_id: userId,
        session_id: trackingData.sessionId,
        ip_address: ipAddress,
        country: locationData.country_name || null,
        city: locationData.city || null,
        latitude: trackingData.latitude || locationData.latitude || null,
        longitude: trackingData.longitude || locationData.longitude || null,
        device_type: trackingData.deviceType,
        operating_system: trackingData.operatingSystem,
        browser: trackingData.browser,
        browser_version: trackingData.browserVersion,
        screen_resolution: trackingData.screenResolution,
        user_agent: trackingData.userAgent,
        language: trackingData.language,
        timezone: trackingData.timezone,
        referrer: trackingData.referrer,
        cookies: trackingData.cookies,
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    console.log('Tracking data saved successfully:', data.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        trackingId: data.id,
        location: locationData.city ? `${locationData.city}, ${locationData.country_name}` : 'Unknown'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      },
    );

  } catch (error) {
    console.error('Error in track-user function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        success: false 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      },
    );
  }
});
