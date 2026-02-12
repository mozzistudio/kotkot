/**
 * Create test account for quentin@salvamimaquina.com
 *
 * Usage:
 *   npx tsx scripts/create-test-account.ts
 *
 * Requires environment variables:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY  (NOT the anon key — needs admin privileges)
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    'Missing environment variables. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.'
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  const email = 'quentin@salvamimaquina.com';
  const password = '12345';

  console.log(`Creating test account for ${email}...`);

  // 1. Create auth user
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: 'Quentin Test' },
  });

  if (authError) {
    if (authError.message.includes('already been registered')) {
      console.log('Auth user already exists, fetching...');
      const { data: { users } } = await supabase.auth.admin.listUsers();
      const existingUser = users?.find((u) => u.email === email);
      if (!existingUser) {
        console.error('Could not find existing user');
        process.exit(1);
      }
      console.log(`Found existing auth user: ${existingUser.id}`);
      await createBrokerProfile(existingUser.id, email);
      return;
    }
    console.error('Error creating auth user:', authError.message);
    process.exit(1);
  }

  console.log(`Auth user created: ${authData.user.id}`);

  // 2. Create broker profile
  await createBrokerProfile(authData.user.id, email);
}

async function createBrokerProfile(authUserId: string, email: string) {
  const { data: existing } = await supabase
    .from('brokers')
    .select('id')
    .eq('email', email)
    .single();

  if (existing) {
    console.log(`Broker profile already exists: ${existing.id}`);
    console.log('Done! Test account is ready.');
    return;
  }

  const { data: broker, error: brokerError } = await supabase
    .from('brokers')
    .insert({
      auth_user_id: authUserId,
      email,
      name: 'Quentin Test',
      company_name: 'Salva Mi Maquina',
      phone: '+507 6000-0000',
      country_code: 'PA',
      currency: 'USD',
      plan: 'pro',
      payment_method: 'stripe',
      is_active: true,
    })
    .select()
    .single();

  if (brokerError) {
    console.error('Error creating broker profile:', brokerError.message);
    process.exit(1);
  }

  console.log(`Broker profile created: ${broker.id}`);

  // 3. Create default bot personality
  const { error: botError } = await supabase.from('bot_personalities').insert({
    broker_id: broker.id,
    name: 'Agente de Prueba',
    welcome_message: 'Hola! Soy tu asistente de seguros. En que puedo ayudarte hoy?',
    goodbye_message: 'Gracias por tu consulta! Estamos aqui cuando nos necesites.',
    language: 'es',
    tone: 'friendly',
    formality: 50,
    pronoun: 'usted',
    emoji_level: 'minimal',
    is_active: true,
  });

  if (botError) {
    console.error('Warning: Could not create bot personality:', botError.message);
  } else {
    console.log('Default bot personality created.');
  }

  console.log('\nDone! Test account is ready.');
  console.log(`  Email:    ${email}`);
  console.log(`  Password: 12345`);
  console.log(`  Plan:     Pro`);
  console.log(`  Country:  Panama (PA)`);
}

main().catch((err) => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
