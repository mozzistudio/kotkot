import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

interface BotPersonality {
  name: string;
  tone: string;
  formality: number;
  pronoun: string;
  emojiLevel: string;
  language: string;
  welcomeMessage: string;
  systemPromptOverride?: string;
  restrictedTopics: string[];
}

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function generateBotResponse(
  personality: BotPersonality,
  conversationHistory: ConversationMessage[],
  userMessage: string,
  context?: {
    availableInsurers?: string[];
    quoteData?: Record<string, unknown>;
    brokerCountry?: string;
  }
): Promise<string> {
  const formalityDesc = personality.formality > 70 ? 'muy formal' : personality.formality > 40 ? 'moderadamente formal' : 'casual y cercano';
  const emojiDesc = personality.emojiLevel === 'frequent' ? 'Usa emojis frecuentemente' : personality.emojiLevel === 'minimal' ? 'Usa emojis de forma mínima' : 'No uses emojis';

  const systemPrompt = personality.systemPromptOverride || `Eres ${personality.name}, un agente de seguros virtual experto que trabaja en WhatsApp.

PERSONALIDAD:
- Tono: ${personality.tone}
- Nivel de formalidad: ${formalityDesc}
- Pronombre: Usa "${personality.pronoun}" para dirigirte al cliente
- ${emojiDesc}
- Idioma principal: ${personality.language === 'es' ? 'Español' : personality.language === 'en' ? 'English' : 'Detectar idioma del usuario'}

FUNCIONES:
1. Saludar y entender qué tipo de seguro necesita el cliente (auto, salud, hogar, viaje, negocio)
2. Recopilar datos necesarios de forma conversacional (NO como formulario)
3. Cuando tengas datos suficientes, indicar que estás cotizando
4. Presentar comparación de precios de forma clara
5. Ayudar al cliente a elegir y generar link de pago
6. Manejar objeciones con argumentos sólidos

REGLAS:
- NUNCA inventes precios. Solo muestra precios que te proporcione el sistema.
- NUNCA recomiendes una aseguradora específica. Presenta opciones neutral.
- Si el cliente pregunta algo fuera de seguros, redirige amablemente.
- Si no puedes responder, ofrece transferir a un humano.
- Sé conciso. WhatsApp no es para párrafos largos.
${personality.restrictedTopics.length > 0 ? `- Temas PROHIBIDOS: ${personality.restrictedTopics.join(', ')}` : ''}
${context?.brokerCountry ? `- País del corredor: ${context.brokerCountry}` : ''}
${context?.availableInsurers ? `- Aseguradoras disponibles: ${context.availableInsurers.join(', ')}` : ''}`;

  const messages: Anthropic.Messages.MessageParam[] = [
    ...conversationHistory.map(m => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })),
    { role: 'user', content: userMessage },
  ];

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 500,
    system: systemPrompt,
    messages,
  });

  const textBlock = response.content.find(b => b.type === 'text');
  return textBlock?.text ?? 'Lo siento, hubo un error. ¿Puedo ayudarte en algo más?';
}
