-- Create whatsapp_accounts table
CREATE TABLE IF NOT EXISTS whatsapp_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  broker_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  waba_id TEXT NOT NULL,
  phone_number_id TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  access_token TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'active', 'disconnected')) DEFAULT 'pending',
  bot_personality TEXT DEFAULT 'professional',
  messages_this_month INTEGER DEFAULT 0,
  connected_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(phone_number_id)
);

-- Create whatsapp_messages table for logging
CREATE TABLE IF NOT EXISTS whatsapp_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  whatsapp_account_id UUID NOT NULL REFERENCES whatsapp_accounts(id) ON DELETE CASCADE,
  message_id TEXT NOT NULL UNIQUE,
  from_phone TEXT NOT NULL,
  to_phone TEXT NOT NULL,
  message_type TEXT NOT NULL,
  message_body TEXT,
  direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  status TEXT,
  timestamp TIMESTAMPTZ NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_whatsapp_accounts_broker_id ON whatsapp_accounts(broker_id);
CREATE INDEX idx_whatsapp_accounts_status ON whatsapp_accounts(status);
CREATE INDEX idx_whatsapp_messages_account_id ON whatsapp_messages(whatsapp_account_id);
CREATE INDEX idx_whatsapp_messages_timestamp ON whatsapp_messages(timestamp DESC);
CREATE INDEX idx_whatsapp_messages_from_phone ON whatsapp_messages(from_phone);

-- Enable RLS
ALTER TABLE whatsapp_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for whatsapp_accounts
-- Brokers can only see and manage their own accounts
CREATE POLICY "Brokers can view their own WhatsApp accounts"
  ON whatsapp_accounts
  FOR SELECT
  USING (broker_id = auth.uid());

CREATE POLICY "Brokers can insert their own WhatsApp accounts"
  ON whatsapp_accounts
  FOR INSERT
  WITH CHECK (broker_id = auth.uid());

CREATE POLICY "Brokers can update their own WhatsApp accounts"
  ON whatsapp_accounts
  FOR UPDATE
  USING (broker_id = auth.uid())
  WITH CHECK (broker_id = auth.uid());

CREATE POLICY "Brokers can delete their own WhatsApp accounts"
  ON whatsapp_accounts
  FOR DELETE
  USING (broker_id = auth.uid());

-- RLS Policies for whatsapp_messages
-- Brokers can only see messages for their own WhatsApp accounts
CREATE POLICY "Brokers can view messages for their own accounts"
  ON whatsapp_messages
  FOR SELECT
  USING (
    whatsapp_account_id IN (
      SELECT id FROM whatsapp_accounts WHERE broker_id = auth.uid()
    )
  );

CREATE POLICY "Brokers can insert messages for their own accounts"
  ON whatsapp_messages
  FOR INSERT
  WITH CHECK (
    whatsapp_account_id IN (
      SELECT id FROM whatsapp_accounts WHERE broker_id = auth.uid()
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_whatsapp_accounts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updating updated_at
CREATE TRIGGER whatsapp_accounts_updated_at
  BEFORE UPDATE ON whatsapp_accounts
  FOR EACH ROW
  EXECUTE FUNCTION update_whatsapp_accounts_updated_at();

-- Function to increment messages_this_month
CREATE OR REPLACE FUNCTION increment_whatsapp_messages_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE whatsapp_accounts
  SET messages_this_month = messages_this_month + 1
  WHERE id = NEW.whatsapp_account_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-increment messages count
CREATE TRIGGER whatsapp_messages_increment_count
  AFTER INSERT ON whatsapp_messages
  FOR EACH ROW
  EXECUTE FUNCTION increment_whatsapp_messages_count();
