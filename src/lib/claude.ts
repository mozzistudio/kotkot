import Anthropic from '@anthropic-ai/sdk';

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

// ---------------------------------------------------------------------------
// Fallback response generator (when no API key is configured)
// ---------------------------------------------------------------------------

function generateFallbackResponse(
  personality: BotPersonality,
  userMessage: string,
  context?: {
    availableInsurers?: string[];
    brokerCountry?: string;
  }
): string {
  const msg = userMessage.toLowerCase();
  const formal = personality.formality > 50;
  const you = formal ? 'usted' : 'tu';
  const your = formal ? 'su' : 'tu';
  const emoji = personality.emojiLevel === 'frequent' ? ' ' : personality.emojiLevel === 'minimal' ? ' ' : '';
  const greeting = formal ? 'Como esta?' : 'Como estas?';

  const insurers = context?.availableInsurers?.length
    ? context.availableInsurers
    : ['ASSA', 'Mapfre', 'Pan American Life', 'Suramericana'];

  // Greeting patterns
  if (/^(hola|hi|hey|buenos|buenas|saludos|que tal)/.test(msg)) {
    return `Hola!${emoji} Soy ${personality.name}, ${your} asistente virtual de seguros. ${greeting} En que puedo ayudar${formal ? 'le' : 'te'} hoy? Puedo cotizar seguros de auto, salud, hogar, viaje o negocio.`;
  }

  // Auto insurance
  if (/auto|carro|vehiculo|coche|toyota|honda|hyundai|kia|chevrolet|nissan|ford/.test(msg)) {
    return `${emoji}Excelente! Para cotizar${formal ? 'le' : 'te'} un seguro de auto necesito algunos datos:\n\n1. Marca y modelo del vehiculo\n2. Ano\n3. Uso (personal o comercial)\n4. ${formal ? 'Tiene' : 'Tienes'} algun seguro actualmente?\n\nCon esta info puedo comparar precios de ${insurers.slice(0, 3).join(', ')} y mas.`;
  }

  // Health insurance
  if (/salud|medic|hospital|doctor|enferm|familia|plan familiar/.test(msg)) {
    return `${emoji}Los seguros de salud son una excelente inversion. Para encontrar el mejor plan necesito saber:\n\n1. Es para ${you} solo o plan familiar?\n2. Cuantas personas ${formal ? 'serian' : 'serian'}?\n3. Edades de los asegurados\n4. ${formal ? 'Tiene' : 'Tienes'} alguna condicion preexistente?\n\nTenemos opciones desde ${insurers[0]} hasta ${insurers[insurers.length - 1]}.`;
  }

  // Home insurance
  if (/hogar|casa|vivienda|propiedad|apartamento|depto/.test(msg)) {
    return `${emoji}Proteger ${your} hogar es muy importante. Para cotizar necesito:\n\n1. Tipo de propiedad (casa, apartamento)\n2. Ubicacion\n3. Valor aproximado\n4. ${formal ? 'Desea' : 'Quieres'} cobertura basica o completa?\n\nComparo las mejores opciones del mercado para ${you}.`;
  }

  // Travel insurance
  if (/viaje|travel|vacacion|vuelo|destino/.test(msg)) {
    return `${emoji}Un seguro de viaje ${formal ? 'le da' : 'te da'} tranquilidad total. Necesito saber:\n\n1. Destino del viaje\n2. Duracion (fechas)\n3. Cuantas personas viajan?\n4. ${formal ? 'Necesita' : 'Necesitas'} cobertura medica internacional?\n\nTenemos planes desde $25 por viaje!`;
  }

  // Business insurance
  if (/negocio|empresa|comercial|pyme|oficina|local/.test(msg)) {
    return `${emoji}Para proteger ${your} negocio tenemos varias opciones. ${formal ? 'Podria decirme' : 'Podrias decirme'}:\n\n1. Tipo de negocio\n2. Numero de empleados\n3. Ubicacion\n4. Que coberturas ${formal ? 'necesita' : 'necesitas'} (responsabilidad civil, danos, robo, etc.)?\n\nCotizo con las mejores aseguradoras del mercado.`;
  }

  // Price / quote questions
  if (/precio|costo|cuanto|cotiza|comparar|mejor opcion|barato/.test(msg)) {
    return `${emoji}Con gusto ${formal ? 'le' : 'te'} ayudo a encontrar el mejor precio! Para darte una cotizacion precisa, necesito que me ${formal ? 'indique' : 'indiques'} que tipo de seguro ${formal ? 'busca' : 'buscas'}:\n\n- Auto\n- Salud\n- Hogar\n- Viaje\n- Negocio\n\nComparo precios de ${insurers.join(', ')} para encontrar la mejor opcion.`;
  }

  // Payment questions
  if (/pago|pagar|yappy|stripe|tarjeta|transferencia/.test(msg)) {
    return `${emoji}Aceptamos pagos por Yappy y tarjeta de credito (Stripe). Una vez que ${formal ? 'seleccione' : 'selecciones'} ${your} cotizacion, ${formal ? 'le' : 'te'} envio el link de pago directamente aqui. El proceso es rapido y seguro!`;
  }

  // Thanks / goodbye
  if (/gracias|thank|adios|bye|hasta luego|chao/.test(msg)) {
    return personality.welcomeMessage
      ? `De nada!${emoji} Si ${formal ? 'necesita' : 'necesitas'} algo mas, estoy aqui para ayudar${formal ? 'le' : 'te'}. Que ${formal ? 'tenga' : 'tengas'} un excelente dia!`
      : `Gracias a ${you}!${emoji} Estoy disponible cuando ${formal ? 'lo necesite' : 'me necesites'}. Hasta pronto!`;
  }

  // Default / catch-all
  return `${emoji}Entendido! Soy ${personality.name}, ${your} asistente de seguros. Puedo ayudar${formal ? 'le' : 'te'} con cotizaciones de auto, salud, hogar, viaje y negocio. Que tipo de seguro ${formal ? 'le interesa' : 'te interesa'}?`;
}

// ---------------------------------------------------------------------------
// Main response generator
// ---------------------------------------------------------------------------

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
  // If no API key, use the built-in fallback for demo/testing
  if (!process.env.ANTHROPIC_API_KEY) {
    return generateFallbackResponse(personality, userMessage, context);
  }

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const formalityDesc = personality.formality > 70 ? 'muy formal' : personality.formality > 40 ? 'moderadamente formal' : 'casual y cercano';
  const emojiDesc = personality.emojiLevel === 'frequent' ? 'Usa emojis frecuentemente' : personality.emojiLevel === 'minimal' ? 'Usa emojis de forma minima' : 'No uses emojis';

  const systemPrompt = personality.systemPromptOverride || `Eres ${personality.name}, un agente de seguros virtual experto que trabaja en WhatsApp.

PERSONALIDAD:
- Tono: ${personality.tone}
- Nivel de formalidad: ${formalityDesc}
- Pronombre: Usa "${personality.pronoun}" para dirigirte al cliente
- ${emojiDesc}
- Idioma principal: ${personality.language === 'es' ? 'Espanol' : personality.language === 'en' ? 'English' : 'Detectar idioma del usuario'}

FUNCIONES:
1. Saludar y entender que tipo de seguro necesita el cliente (auto, salud, hogar, viaje, negocio)
2. Recopilar datos necesarios de forma conversacional (NO como formulario)
3. Cuando tengas datos suficientes, indicar que estas cotizando
4. Presentar comparacion de precios de forma clara
5. Ayudar al cliente a elegir y generar link de pago
6. Manejar objeciones con argumentos solidos

REGLAS:
- NUNCA inventes precios. Solo muestra precios que te proporcione el sistema.
- NUNCA recomiendes una aseguradora especifica. Presenta opciones neutral.
- Si el cliente pregunta algo fuera de seguros, redirige amablemente.
- Si no puedes responder, ofrece transferir a un humano.
- Se conciso. WhatsApp no es para parrafos largos.
${personality.restrictedTopics.length > 0 ? `- Temas PROHIBIDOS: ${personality.restrictedTopics.join(', ')}` : ''}
${context?.brokerCountry ? `- Pais del corredor: ${context.brokerCountry}` : ''}
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
  return textBlock?.text ?? 'Lo siento, hubo un error. Puedo ayudarte en algo mas?';
}
