-- Create user tracking table
CREATE TABLE public.user_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT NOT NULL,
  ip_address TEXT,
  country TEXT,
  city TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  device_type TEXT,
  operating_system TEXT,
  browser TEXT,
  browser_version TEXT,
  screen_resolution TEXT,
  user_agent TEXT,
  language TEXT,
  timezone TEXT,
  referrer TEXT,
  cookies JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX idx_user_tracking_user_id ON public.user_tracking(user_id);
CREATE INDEX idx_user_tracking_session_id ON public.user_tracking(session_id);
CREATE INDEX idx_user_tracking_created_at ON public.user_tracking(created_at);

-- Enable RLS
ALTER TABLE public.user_tracking ENABLE ROW LEVEL SECURITY;

-- Admin can view all tracking data
CREATE POLICY "Admins can view all tracking data"
ON public.user_tracking
FOR SELECT
USING (auth.jwt()->>'role' = 'admin');

-- Allow anonymous inserts for tracking
CREATE POLICY "Anyone can insert tracking data"
ON public.user_tracking
FOR INSERT
WITH CHECK (true);