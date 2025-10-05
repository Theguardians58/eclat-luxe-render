-- Add birthday, phone, and instagram_account fields to profiles table
ALTER TABLE public.profiles
ADD COLUMN birthday date,
ADD COLUMN phone text,
ADD COLUMN instagram_account text;