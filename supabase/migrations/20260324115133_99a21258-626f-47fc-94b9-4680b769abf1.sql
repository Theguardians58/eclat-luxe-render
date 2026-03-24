
-- Remove the overly permissive anon policy - the trigger uses SECURITY DEFINER so it bypasses RLS
DROP POLICY IF EXISTS "Allow service role insert profiles" ON public.profiles;
