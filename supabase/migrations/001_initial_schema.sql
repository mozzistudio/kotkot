create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- BROKERS
create table public.brokers (
  id uuid primary key default uuid_generate_v4(),
  auth_user_id uuid unique references auth.users(id) on delete cascade,
  email text unique not null,
  name text not null,
  company_name text,
  phone text,
  country_code text not null default 'PA',
  currency text not null default 'USD',
  plan text default 'starter' check (plan in ('starter', 'pro', 'enterprise')),
  stripe_customer_id text,
  stripe_subscription_id text,
  stripe_connect_account_id text,
  yappy_merchant_id text,
  yappy_secret_token text,
  payment_method text default 'stripe' check (payment_method in ('yappy', 'stripe')),
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- WHATSAPP NUMBERS
create table public.whatsapp_numbers (
  id uuid primary key default uuid_generate_v4(),
  broker_id uuid references public.brokers(id) on delete cascade not null,
  waba_id text not null,
  phone_number_id text not null,
  display_name text,
  phone_number text,
  status text default 'pending' check (status in ('active', 'pending', 'disconnected')),
  meta_access_token text,
  business_hours jsonb default '{}',
  bot_personality_id uuid,
  created_at timestamptz default now()
);

-- BOT PERSONALITIES
create table public.bot_personalities (
  id uuid primary key default uuid_generate_v4(),
  broker_id uuid references public.brokers(id) on delete cascade not null,
  name text not null default 'Mi Agente',
  avatar_url text,
  welcome_message text default '¡Hola! 👋 Soy tu asistente de seguros. ¿En qué puedo ayudarte hoy?',
  goodbye_message text default '¡Gracias por tu consulta! Estamos aquí cuando nos necesites.',
  language text default 'es' check (language in ('es', 'en', 'auto')),
  tone text default 'friendly' check (tone in ('friendly', 'expert', 'warm', 'direct')),
  formality integer default 50 check (formality between 0 and 100),
  pronoun text default 'usted' check (pronoun in ('tu', 'usted')),
  emoji_level text default 'minimal' check (emoji_level in ('none', 'minimal', 'frequent')),
  system_prompt_override text,
  restricted_topics text[] default '{}',
  max_messages_before_handoff integer default 20,
  fallback_action text default 'transfer' check (fallback_action in ('transfer', 'callback', 'email')),
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.whatsapp_numbers
  add constraint fk_bot_personality
  foreign key (bot_personality_id) references public.bot_personalities(id);

-- INSURERS (master list — multi-country)
create table public.insurers (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  country_code text not null,
  logo_url text,
  api_adapter_type text not null,
  required_credentials jsonb default '[]',
  supported_products text[] default '{}',
  market_share numeric,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Seed insurers: PANAMA
insert into public.insurers (name, slug, country_code, api_adapter_type, supported_products, market_share) values
  ('ASSA Compañía de Seguros', 'assa-pa', 'PA', 'assa', '{auto,health,home,travel,business}', 23),
  ('Internacional de Seguros', 'internacional-pa', 'PA', 'internacional', '{auto,health,home,business}', 15),
  ('MAPFRE Panamá', 'mapfre-pa', 'PA', 'mapfre', '{auto,health,home,travel}', 14),
  ('Seguros SURA Panamá', 'sura-pa', 'PA', 'sura', '{auto,health,home,travel,business}', 8),
  ('Pan-American Life (PALIG)', 'palig-pa', 'PA', 'palig', '{health,life}', 8),
  ('FEDPA', 'fedpa-pa', 'PA', 'manual', '{auto,micro}', null),
  ('ANCÓN Seguros', 'ancon-pa', 'PA', 'manual', '{auto,health}', null),
  ('La Regional de Seguros', 'la-regional-pa', 'PA', 'manual', '{auto}', null),
  ('ACERTA Seguros', 'acerta-pa', 'PA', 'manual', '{business,fianzas}', null),
  ('ÓPTIMA Seguros', 'optima-pa', 'PA', 'manual', '{auto,health}', null);

-- Seed insurers: COLOMBIA
insert into public.insurers (name, slug, country_code, api_adapter_type, supported_products) values
  ('Seguros SURA Colombia', 'sura-co', 'CO', 'manual', '{auto,health,home,travel,business}'),
  ('Allianz Colombia', 'allianz-co', 'CO', 'manual', '{auto,health,home,business}'),
  ('Liberty Seguros Colombia', 'liberty-co', 'CO', 'manual', '{auto,home,business}'),
  ('Seguros Bolívar', 'bolivar-co', 'CO', 'manual', '{auto,health,home,life}'),
  ('MAPFRE Colombia', 'mapfre-co', 'CO', 'manual', '{auto,health,home,travel}'),
  ('AXA Colpatria', 'axa-colpatria-co', 'CO', 'manual', '{auto,health,home}');

-- Seed insurers: MEXICO
insert into public.insurers (name, slug, country_code, api_adapter_type, supported_products) values
  ('GNP Seguros', 'gnp-mx', 'MX', 'manual', '{auto,health,home,life,business}'),
  ('Qualitas', 'qualitas-mx', 'MX', 'manual', '{auto}'),
  ('AXA México', 'axa-mx', 'MX', 'manual', '{auto,health,home,travel}'),
  ('Chubb México', 'chubb-mx', 'MX', 'manual', '{auto,home,business}'),
  ('MAPFRE México', 'mapfre-mx', 'MX', 'manual', '{auto,health,home}'),
  ('HDI Seguros', 'hdi-mx', 'MX', 'manual', '{auto,home}');

-- Seed insurers: CHILE
insert into public.insurers (name, slug, country_code, api_adapter_type, supported_products) values
  ('SURA Chile', 'sura-cl', 'CL', 'manual', '{auto,health,home,business}'),
  ('Liberty Chile', 'liberty-cl', 'CL', 'manual', '{auto,home}'),
  ('MAPFRE Chile', 'mapfre-cl', 'CL', 'manual', '{auto,health,home}'),
  ('BCI Seguros', 'bci-cl', 'CL', 'manual', '{auto,home,life}');

-- Seed insurers: COSTA RICA
insert into public.insurers (name, slug, country_code, api_adapter_type, supported_products) values
  ('INS (Instituto Nacional de Seguros)', 'ins-cr', 'CR', 'manual', '{auto,health,home,travel,business}'),
  ('ASSA Costa Rica', 'assa-cr', 'CR', 'manual', '{auto,health,home}'),
  ('MAPFRE Costa Rica', 'mapfre-cr', 'CR', 'manual', '{auto,health}');

-- Seed insurers: PERU
insert into public.insurers (name, slug, country_code, api_adapter_type, supported_products) values
  ('Rímac Seguros', 'rimac-pe', 'PE', 'manual', '{auto,health,home,life,business}'),
  ('Pacífico Seguros', 'pacifico-pe', 'PE', 'manual', '{auto,health,home}'),
  ('MAPFRE Perú', 'mapfre-pe', 'PE', 'manual', '{auto,health,home,travel}'),
  ('La Positiva', 'la-positiva-pe', 'PE', 'manual', '{auto,home,business}');

-- Seed insurers: ECUADOR
insert into public.insurers (name, slug, country_code, api_adapter_type, supported_products) values
  ('Seguros Equinoccial', 'equinoccial-ec', 'EC', 'manual', '{auto,health,home,business}'),
  ('AIG Ecuador', 'aig-ec', 'EC', 'manual', '{auto,business}'),
  ('Liberty Ecuador', 'liberty-ec', 'EC', 'manual', '{auto,home}');

-- COUNTRIES registry
create table public.countries (
  code text primary key,
  name text not null,
  currency text not null,
  currency_symbol text not null,
  payment_methods text[] not null,
  flag_emoji text,
  insurance_regulator text,
  is_active boolean default true
);

insert into public.countries (code, name, currency, currency_symbol, payment_methods, flag_emoji, insurance_regulator) values
  ('PA', 'Panamá', 'USD', '$', '{yappy,stripe}', '🇵🇦', 'Superintendencia de Seguros y Reaseguros de Panamá (SSRP)'),
  ('CO', 'Colombia', 'COP', '$', '{stripe}', '🇨🇴', 'Superintendencia Financiera de Colombia'),
  ('MX', 'México', 'MXN', '$', '{stripe}', '🇲🇽', 'Comisión Nacional de Seguros y Fianzas (CNSF)'),
  ('CL', 'Chile', 'CLP', '$', '{stripe}', '🇨🇱', 'Comisión para el Mercado Financiero (CMF)'),
  ('PE', 'Perú', 'PEN', 'S/', '{stripe}', '🇵🇪', 'Superintendencia de Banca, Seguros y AFP (SBS)'),
  ('EC', 'Ecuador', 'USD', '$', '{stripe}', '🇪🇨', 'Superintendencia de Compañías, Valores y Seguros'),
  ('CR', 'Costa Rica', 'CRC', '₡', '{stripe}', '🇨🇷', 'Superintendencia General de Seguros (SUGESE)'),
  ('DO', 'República Dominicana', 'DOP', 'RD$', '{stripe}', '🇩🇴', 'Superintendencia de Seguros'),
  ('AR', 'Argentina', 'ARS', '$', '{stripe}', '🇦🇷', 'Superintendencia de Seguros de la Nación (SSN)'),
  ('BR', 'Brasil', 'BRL', 'R$', '{stripe}', '🇧🇷', 'Superintendência de Seguros Privados (SUSEP)');

-- INSURER CONNECTIONS (broker credentials)
create table public.insurer_connections (
  id uuid primary key default uuid_generate_v4(),
  broker_id uuid references public.brokers(id) on delete cascade not null,
  insurer_id uuid references public.insurers(id) not null,
  credentials jsonb not null default '{}',
  products_enabled text[] default '{}',
  commission_rates jsonb default '{}',
  status text default 'pending' check (status in ('active', 'pending', 'error', 'disabled')),
  last_health_check timestamptz,
  created_at timestamptz default now(),
  unique(broker_id, insurer_id)
);

-- RATE TABLES (fallback)
create table public.rate_tables (
  id uuid primary key default uuid_generate_v4(),
  insurer_connection_id uuid references public.insurer_connections(id) on delete cascade not null,
  product_type text not null,
  data jsonb not null,
  source_filename text,
  uploaded_at timestamptz default now(),
  expires_at timestamptz
);

-- CONVERSATIONS
create table public.conversations (
  id uuid primary key default uuid_generate_v4(),
  broker_id uuid references public.brokers(id) on delete cascade not null,
  whatsapp_number_id uuid references public.whatsapp_numbers(id),
  client_phone text not null,
  client_name text,
  status text default 'active' check (status in ('active', 'waiting_payment', 'human_takeover', 'closed')),
  bot_personality_id uuid references public.bot_personalities(id),
  insurance_type text,
  tags text[] default '{}',
  ai_summary text,
  started_at timestamptz default now(),
  last_message_at timestamptz default now(),
  closed_at timestamptz
);

-- MESSAGES
create table public.messages (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid references public.conversations(id) on delete cascade not null,
  role text not null check (role in ('user', 'bot', 'human', 'system')),
  content text not null,
  message_type text default 'text' check (message_type in ('text', 'image', 'document', 'button', 'list', 'payment_link')),
  wa_message_id text,
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

-- QUOTES
create table public.quotes (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid references public.conversations(id),
  broker_id uuid references public.brokers(id) on delete cascade not null,
  insurance_type text not null,
  input_data jsonb not null,
  coverage_tier text,
  status text default 'generated' check (status in ('generated', 'sent', 'selected', 'paid', 'expired')),
  selected_result_id uuid,
  created_at timestamptz default now(),
  expires_at timestamptz
);

-- QUOTE RESULTS
create table public.quote_results (
  id uuid primary key default uuid_generate_v4(),
  quote_id uuid references public.quotes(id) on delete cascade not null,
  insurer_connection_id uuid references public.insurer_connections(id),
  insurer_name text not null,
  price numeric not null,
  currency text default 'USD',
  coverage_details jsonb default '{}',
  deductible numeric,
  is_realtime boolean default true,
  created_at timestamptz default now()
);

-- PAYMENTS
create table public.payments (
  id uuid primary key default uuid_generate_v4(),
  quote_id uuid references public.quotes(id),
  quote_result_id uuid references public.quote_results(id),
  broker_id uuid references public.brokers(id) on delete cascade not null,
  conversation_id uuid references public.conversations(id),
  yappy_order_id text unique,
  amount numeric not null,
  currency text default 'USD',
  status text default 'pending' check (status in ('pending', 'success', 'failed', 'cancelled', 'expired')),
  payment_url text,
  paid_at timestamptz,
  failed_at timestamptz,
  error_message text,
  created_at timestamptz default now()
);

-- CLIENTS
create table public.clients (
  id uuid primary key default uuid_generate_v4(),
  broker_id uuid references public.brokers(id) on delete cascade not null,
  name text,
  phone text not null,
  email text,
  cedula text,
  date_of_birth date,
  vehicles jsonb default '[]',
  tags text[] default '{}',
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(broker_id, phone)
);

-- INDEXES
create index idx_conversations_broker on public.conversations(broker_id);
create index idx_conversations_status on public.conversations(status);
create index idx_conversations_last_msg on public.conversations(last_message_at desc);
create index idx_messages_conversation on public.messages(conversation_id);
create index idx_messages_created on public.messages(created_at);
create index idx_quotes_broker on public.quotes(broker_id);
create index idx_quotes_status on public.quotes(status);
create index idx_payments_status on public.payments(status);
create index idx_clients_broker on public.clients(broker_id);
create index idx_clients_phone on public.clients(phone);
create index idx_insurers_country on public.insurers(country_code);
create index idx_brokers_country on public.brokers(country_code);

-- ENABLE RLS ON ALL TABLES
alter table public.brokers enable row level security;
alter table public.whatsapp_numbers enable row level security;
alter table public.bot_personalities enable row level security;
alter table public.insurers enable row level security;
alter table public.insurer_connections enable row level security;
alter table public.rate_tables enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.quotes enable row level security;
alter table public.quote_results enable row level security;
alter table public.payments enable row level security;
alter table public.clients enable row level security;
alter table public.countries enable row level security;

-- RLS POLICIES
create policy "Brokers see own data" on public.brokers for all using (auth_user_id = auth.uid());
create policy "Broker whatsapp numbers" on public.whatsapp_numbers for all using (broker_id in (select id from public.brokers where auth_user_id = auth.uid()));
create policy "Broker personalities" on public.bot_personalities for all using (broker_id in (select id from public.brokers where auth_user_id = auth.uid()));
create policy "All insurers visible" on public.insurers for select using (true);
create policy "All countries visible" on public.countries for select using (true);
create policy "Broker insurer connections" on public.insurer_connections for all using (broker_id in (select id from public.brokers where auth_user_id = auth.uid()));
create policy "Broker rate tables" on public.rate_tables for all using (insurer_connection_id in (select id from public.insurer_connections where broker_id in (select id from public.brokers where auth_user_id = auth.uid())));
create policy "Broker conversations" on public.conversations for all using (broker_id in (select id from public.brokers where auth_user_id = auth.uid()));
create policy "Broker messages" on public.messages for all using (conversation_id in (select id from public.conversations where broker_id in (select id from public.brokers where auth_user_id = auth.uid())));
create policy "Broker quotes" on public.quotes for all using (broker_id in (select id from public.brokers where auth_user_id = auth.uid()));
create policy "Broker quote results" on public.quote_results for all using (quote_id in (select id from public.quotes where broker_id in (select id from public.brokers where auth_user_id = auth.uid())));
create policy "Broker payments" on public.payments for all using (broker_id in (select id from public.brokers where auth_user_id = auth.uid()));
create policy "Broker clients" on public.clients for all using (broker_id in (select id from public.brokers where auth_user_id = auth.uid()));
