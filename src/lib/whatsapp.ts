const META_API_URL = 'https://graph.facebook.com/v21.0';

interface SendMessageParams {
  phoneNumberId: string;
  accessToken: string;
  to: string;
  type: 'text' | 'interactive' | 'template';
  body?: string;
  interactive?: Record<string, unknown>;
  template?: Record<string, unknown>;
}

export async function sendWhatsAppMessage(params: SendMessageParams) {
  const payload: Record<string, unknown> = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: params.to,
    type: params.type,
  };

  if (params.type === 'text' && params.body) {
    payload.text = { preview_url: false, body: params.body };
  } else if (params.type === 'interactive' && params.interactive) {
    payload.interactive = params.interactive;
  } else if (params.type === 'template' && params.template) {
    payload.template = params.template;
  }

  const response = await fetch(`${META_API_URL}/${params.phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${params.accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`WhatsApp API error: ${JSON.stringify(error)}`);
  }

  return response.json();
}

export async function sendInteractiveButtons(
  phoneNumberId: string,
  accessToken: string,
  to: string,
  bodyText: string,
  buttons: { id: string; title: string }[]
) {
  return sendWhatsAppMessage({
    phoneNumberId,
    accessToken,
    to,
    type: 'interactive',
    interactive: {
      type: 'button',
      body: { text: bodyText },
      action: {
        buttons: buttons.map(b => ({
          type: 'reply',
          reply: { id: b.id, title: b.title },
        })),
      },
    },
  });
}

export function formatQuoteComparison(
  quotes: { insurer: string; price: number; currency: string }[]
): string {
  let msg = '📊 *Cotizaciones disponibles:*\n\n';
  quotes.forEach((q, i) => {
    const medal = i === 0 ? '🏆' : i === 1 ? '⭐' : '  ';
    msg += `${medal} *${q.insurer}* — ${q.currency}${q.price}/mes\n`;
  });
  return msg;
}
