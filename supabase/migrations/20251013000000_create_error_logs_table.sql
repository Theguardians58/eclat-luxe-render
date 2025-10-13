-- Create error_logs table for centralized error tracking
CREATE TABLE public.error_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  error_type TEXT NOT NULL CHECK (error_type IN ('auth', 'network', 'component', 'validation', 'unknown')),
  error_message TEXT NOT NULL,
  error_stack TEXT,
  component_stack TEXT,
  url TEXT,
  user_agent TEXT,
  additional_info JSONB
);

-- Create indexes for faster queries
CREATE INDEX idx_error_logs_created_at ON public.error_logs(created_at);
CREATE INDEX idx_error_logs_error_type ON public.error_logs(error_type);

-- Enable RLS
ALTER TABLE public.error_logs ENABLE ROW LEVEL SECURITY;

-- Admin can view all error logs
CREATE POLICY "Admins can view all error logs"
ON public.error_logs
FOR SELECT
USING (auth.jwt()->>'role' = 'admin');

-- Allow authenticated and anonymous users to insert error logs
CREATE POLICY "Anyone can insert error logs"
ON public.error_logs
FOR INSERT
WITH CHECK (true);
