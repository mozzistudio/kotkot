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

  // Use the explicit pronoun setting (not derived from formality)
  const formal = personality.pronoun === 'usted';
  const you = formal ? 'usted' : 'tu';
  const your = formal ? 'su' : 'tu';
  const greeting = formal ? 'Como esta?' : 'Como estas?';
  const le = formal ? 'le' : 'te';
  const tiene = formal ? 'Tiene' : 'Tienes';
  const necesita = formal ? 'Necesita' : 'Necesitas';

  // Actual emojis based on level
  const e = personality.emojiLevel === 'frequent'
    ? { hi: ' \ud83d\udc4b', star: ' \u2728', car: ' \ud83d\ude97', health: ' \ud83c\udfe5', home: ' \ud83c\udfe0', plane: ' \u2708\ufe0f', biz: ' \ud83c\udfe2', money: ' \ud83d\udcb0', pay: ' \ud83d\udcb3', bye: ' \ud83d\ude4f', check: ' \u2705', fire: ' \ud83d\udd25' }
    : personality.emojiLevel === 'minimal'
    ? { hi: ' \ud83d\udc4b', star: '', car: '', health: '', home: '', plane: '', biz: '', money: '', pay: '', bye: ' \ud83d\ude4f', check: '', fire: '' }
    : { hi: '', star: '', car: '', health: '', home: '', plane: '', biz: '', money: '', pay: '', bye: '', check: '', fire: '' };

  const insurers = context?.availableInsurers?.length
    ? context.availableInsurers
    : ['ASSA', 'Mapfre', 'Pan American Life', 'Suramericana'];

  // Tone modifiers
  const isWarm = personality.tone === 'warm';
  const isDirect = personality.tone === 'direct';
  const isExpert = personality.tone === 'expert';

  // Greeting patterns
  if (/^(hola|hi|hey|buenos|buenas|saludos|que tal)/.test(msg)) {
    if (isDirect) {
      return `Hola.${e.hi} Soy ${personality.name}. ${formal ? 'Digame' : 'Dime'} que tipo de seguro ${formal ? 'necesita' : 'necesitas'}: auto, salud, hogar, viaje o negocio.`;
    }
    if (isExpert) {
      return `Bienvenido.${e.hi} Soy ${personality.name}, ${your} asesor especializado en seguros. ${greeting} Estoy a ${formal ? 'su' : 'tu'} disposicion para cotizar auto, salud, hogar, viaje o negocio.${e.star}`;
    }
    if (isWarm) {
      return `Hola!${e.hi} Que gusto saludar${le}! Soy ${personality.name}, ${your} asistente de seguros.${e.star} ${greeting} Estoy aqui para ayudar${le} a encontrar la mejor proteccion. En que puedo servir${le}?`;
    }
    return `Hola!${e.hi} Soy ${personality.name}, ${your} asistente virtual de seguros. ${greeting} En que puedo ayudar${le} hoy?${e.star} Puedo cotizar seguros de auto, salud, hogar, viaje o negocio.`;
  }

  // Auto insurance
  if (/auto|carro|vehiculo|coche|toyota|honda|hyundai|kia|chevrolet|nissan|ford/.test(msg)) {
    if (isDirect) {
      return `Seguro de auto.${e.car} Necesito: marca, modelo, ano y uso. ${tiene} seguro actualmente?`;
    }
    return `${isWarm ? 'Me encanta ayudar' + le + ' con eso!' : 'Excelente!'}${e.car}${e.fire} Para cotizar${le} un seguro de auto necesito algunos datos:\n\n1. Marca y modelo del vehiculo\n2. Ano\n3. Uso (personal o comercial)\n4. ${tiene} algun seguro actualmente?\n\nCon esta info puedo comparar precios de ${insurers.slice(0, 3).join(', ')} y mas.${e.check}`;
  }

  // Health insurance
  if (/salud|medic|hospital|doctor|enferm|familia|plan familiar/.test(msg)) {
    if (isDirect) {
      return `Seguro de salud.${e.health} Necesito: individual o familiar, edades, condiciones preexistentes.`;
    }
    return `${isWarm ? 'La salud es lo mas importante!' : 'Los seguros de salud son una excelente inversion.'}${e.health} Para encontrar el mejor plan necesito saber:\n\n1. Es para ${you} solo o plan familiar?\n2. Cuantas personas?\n3. Edades de los asegurados\n4. ${tiene} alguna condicion preexistente?\n\nTenemos opciones desde ${insurers[0]} hasta ${insurers[insurers.length - 1]}.${e.check}`;
  }

  // Home insurance
  if (/hogar|casa|vivienda|propiedad|apartamento|depto/.test(msg)) {
    if (isDirect) {
      return `Seguro de hogar.${e.home} Necesito: tipo de propiedad, ubicacion, valor aproximado.`;
    }
    return `${isWarm ? 'Proteger ' + your + ' hogar es una gran decision!' : 'Proteger ' + your + ' hogar es muy importante.'}${e.home} Para cotizar necesito:\n\n1. Tipo de propiedad (casa, apartamento)\n2. Ubicacion\n3. Valor aproximado\n4. ${formal ? 'Desea' : 'Quieres'} cobertura basica o completa?\n\nComparo las mejores opciones del mercado para ${you}.${e.check}`;
  }

  // Travel insurance
  if (/viaje|travel|vacacion|vuelo|destino/.test(msg)) {
    if (isDirect) {
      return `Seguro de viaje.${e.plane} Necesito: destino, fechas, numero de viajeros. Planes desde $25.`;
    }
    return `${isWarm ? 'Que emocionante!' : ''}${e.plane} Un seguro de viaje ${formal ? 'le da' : 'te da'} tranquilidad total. Necesito saber:\n\n1. Destino del viaje\n2. Duracion (fechas)\n3. Cuantas personas viajan?\n4. ${necesita} cobertura medica internacional?\n\nTenemos planes desde $25 por viaje!${e.fire}`;
  }

  // Business insurance
  if (/negocio|empresa|comercial|pyme|oficina|local/.test(msg)) {
    if (isDirect) {
      return `Seguro comercial.${e.biz} Necesito: tipo de negocio, empleados, ubicacion, coberturas requeridas.`;
    }
    return `${e.biz}Para proteger ${your} negocio tenemos varias opciones.${e.star} ${formal ? 'Podria decirme' : 'Podrias decirme'}:\n\n1. Tipo de negocio\n2. Numero de empleados\n3. Ubicacion\n4. Que coberturas ${necesita} (responsabilidad civil, danos, robo, etc.)?\n\nCotizo con las mejores aseguradoras del mercado.${e.check}`;
  }

  // Price / quote questions
  if (/precio|costo|cuanto|cotiza|comparar|mejor opcion|barato/.test(msg)) {
    if (isDirect) {
      return `${e.money}Que tipo de seguro? Auto, salud, hogar, viaje o negocio. Comparo ${insurers.length} aseguradoras.`;
    }
    return `${e.money}Con gusto ${le} ayudo a encontrar el mejor precio!${e.fire} Necesito que me ${formal ? 'indique' : 'indiques'} que tipo de seguro ${formal ? 'busca' : 'buscas'}:\n\n- Auto\n- Salud\n- Hogar\n- Viaje\n- Negocio\n\nComparo precios de ${insurers.join(', ')} para encontrar la mejor opcion.${e.check}`;
  }

  // Payment questions
  if (/pago|pagar|yappy|stripe|tarjeta|transferencia/.test(msg)) {
    return `${e.pay}Aceptamos pagos por Yappy y tarjeta de credito (Stripe).${e.check} Una vez que ${formal ? 'seleccione' : 'selecciones'} ${your} cotizacion, ${le} envio el link de pago directamente aqui. El proceso es rapido y seguro!${e.star}`;
  }

  // Thanks / goodbye
  if (/gracias|thank|adios|bye|hasta luego|chao/.test(msg)) {
    if (isDirect) {
      return `De nada.${e.bye} Estoy disponible cuando ${formal ? 'lo necesite' : 'me necesites'}.`;
    }
    return `De nada!${e.bye} ${isWarm ? 'Ha sido un placer atender' + le + '! ' : ''}Si ${necesita.toLowerCase()} algo mas, estoy aqui para ayudar${le}. Que ${formal ? 'tenga' : 'tengas'} un excelente dia!${e.star}`;
  }

  // Default / catch-all
  if (isDirect) {
    return `${e.star}Soy ${personality.name}. ${formal ? 'Digame' : 'Dime'} que seguro ${necesita.toLowerCase()}: auto, salud, hogar, viaje o negocio.`;
  }
  return `${e.star}Entendido! Soy ${personality.name}, ${your} asistente de seguros. Puedo ayudar${le} con cotizaciones de auto, salud, hogar, viaje y negocio.${e.check} Que tipo de seguro ${formal ? 'le interesa' : 'te interesa'}?`;
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
