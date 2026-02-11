import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateBotResponse } from '@/lib/claude';

/**
 * POST /api/bot/test
 *
 * Test bot endpoint for in-browser testing (the "Bot Playground").
 * Simpler than /api/bot/process — no WhatsApp integration, no persistent
 * conversation. Accepts a message and conversation history, returns the
 * bot's response. Uses the broker's personality settings.
 *
 * Input:
 *   - message: string (required) — the test message
 *   - history: { role: 'user' | 'assistant'; content: string }[] (optional)
 *   - personalityOverride: Partial<BotPersonality> (optional) — for live preview
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history, personalityOverride } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'message is required and must be a string' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // 1. Verify authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Load broker record
    const { data: broker } = await supabase
      .from('brokers')
      .select('*')
      .eq('auth_user_id', user.id)
      .single();

    if (!broker) {
      return NextResponse.json({ error: 'Broker not found' }, { status: 404 });
    }

    // 3. Load bot personality (use override if provided for live preview)
    const { data: settings } = await supabase
      .from('bot_settings')
      .select('*')
      .eq('broker_id', broker.id)
      .single();

    const personality = {
      name: personalityOverride?.name ?? settings?.bot_name ?? 'CotiFacil Bot',
      tone: personalityOverride?.tone ?? settings?.tone ?? 'amigable y profesional',
      formality: personalityOverride?.formality ?? settings?.formality ?? 50,
      pronoun: personalityOverride?.pronoun ?? settings?.pronoun ?? 'usted',
      emojiLevel: personalityOverride?.emojiLevel ?? settings?.emoji_level ?? 'minimal',
      language: personalityOverride?.language ?? settings?.language ?? 'es',
      welcomeMessage: personalityOverride?.welcomeMessage ?? settings?.welcome_message ?? 'Hola! Soy tu asistente de seguros.',
      systemPromptOverride: personalityOverride?.systemPromptOverride ?? settings?.system_prompt_override ?? undefined,
      restrictedTopics: personalityOverride?.restrictedTopics ?? settings?.restricted_topics ?? [],
    };

    // 4. Load available insurers for context
    const { data: insurerConnections } = await supabase
      .from('insurer_connections')
      .select('insurers(name)')
      .eq('broker_id', broker.id)
      .eq('is_active', true);

    const availableInsurers = (insurerConnections ?? [])
      .map((c: Record<string, unknown>) => {
        const insurer = c.insurers as { name: string } | null;
        return insurer?.name ?? '';
      })
      .filter(Boolean);

    // 5. Build conversation history (use provided or empty)
    const conversationHistory: { role: 'user' | 'assistant'; content: string }[] =
      Array.isArray(history) ? history : [];

    // 6. Generate bot response
    const botResponse = await generateBotResponse(
      personality,
      conversationHistory,
      message,
      {
        availableInsurers,
        brokerCountry: broker.country_code,
      }
    );

    return NextResponse.json({
      response: botResponse,
      personality: {
        name: personality.name,
        tone: personality.tone,
        emojiLevel: personality.emojiLevel,
      },
    });
  } catch (error) {
    console.error('[Bot Test] Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate test response' },
      { status: 500 }
    );
  }
}
