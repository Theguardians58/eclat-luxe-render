INSERT INTO public.user_roles (user_id, role)
VALUES ('dd2e6855-ba9a-4ca0-a9cc-bda3a1c11069', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;