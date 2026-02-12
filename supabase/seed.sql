-- =============================================================================
-- Seed: Test Account for quentin@salvamimaquina.com
-- Purpose: Testing
-- Usage: Run with `supabase db reset` or apply manually via SQL editor
-- =============================================================================

-- Create auth user for test account
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  aud,
  role,
  confirmation_token
) VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  '00000000-0000-0000-0000-000000000000',
  'quentin@salvamimaquina.com',
  crypt('12345', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Quentin Test"}',
  'authenticated',
  'authenticated',
  ''
) ON CONFLICT (email) DO NOTHING;

-- Create identity for the auth user
INSERT INTO auth.identities (
  id,
  user_id,
  provider_id,
  provider,
  identity_data,
  last_sign_in_at,
  created_at,
  updated_at
) VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'quentin@salvamimaquina.com',
  'email',
  jsonb_build_object(
    'sub', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'email', 'quentin@salvamimaquina.com',
    'email_verified', true,
    'phone_verified', false
  ),
  now(),
  now(),
  now()
) ON CONFLICT DO NOTHING;

-- Create broker profile for the test account
INSERT INTO public.brokers (
  id,
  auth_user_id,
  email,
  name,
  company_name,
  phone,
  country_code,
  currency,
  plan,
  payment_method,
  is_active
) VALUES (
  'b2c3d4e5-f6a7-8901-bcde-f12345678901',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'quentin@salvamimaquina.com',
  'Quentin Test',
  'Salva Mi Maquina',
  '+507 6000-0000',
  'PA',
  'USD',
  'pro',
  'stripe',
  true
) ON CONFLICT (email) DO NOTHING;

-- Create a default bot personality for the test broker
INSERT INTO public.bot_personalities (
  id,
  broker_id,
  name,
  welcome_message,
  goodbye_message,
  language,
  tone,
  formality,
  pronoun,
  emoji_level,
  is_active
) VALUES (
  'c3d4e5f6-a7b8-9012-cdef-123456789012',
  'b2c3d4e5-f6a7-8901-bcde-f12345678901',
  'Agente de Prueba',
  'Hola! Soy tu asistente de seguros. En que puedo ayudarte hoy?',
  'Gracias por tu consulta! Estamos aqui cuando nos necesites.',
  'es',
  'friendly',
  50,
  'usted',
  'minimal',
  true
) ON CONFLICT DO NOTHING;
