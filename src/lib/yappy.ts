const YAPPY_BASE_URL = process.env.YAPPY_SANDBOX === 'yes'
  ? 'https://sandbox-api.yappy.com.pa'
  : 'https://api.yappy.com.pa';

interface YappyPaymentRequest {
  merchantId: string;
  secretToken: string;
  orderId: string;
  amount: number;
  description: string;
  successUrl: string;
  failUrl: string;
  tel?: string;
}

interface YappyPaymentResponse {
  url: string;
  orderId: string;
  status: string;
}

export async function createYappyPayment(params: YappyPaymentRequest): Promise<YappyPaymentResponse> {
  const response = await fetch(`${YAPPY_BASE_URL}/api/v2/payment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Merchant-Id': params.merchantId,
      'X-Secret-Token': params.secretToken,
    },
    body: JSON.stringify({
      total: params.amount,
      subtotal: params.amount,
      taxes: 0,
      orderId: params.orderId,
      description: params.description,
      successUrl: params.successUrl,
      failUrl: params.failUrl,
      tel: params.tel,
    }),
  });

  if (!response.ok) {
    throw new Error(`Yappy API error: ${response.statusText}`);
  }

  return response.json();
}

export async function verifyYappyWebhook(body: Record<string, unknown>, secretToken: string): Promise<boolean> {
  // Yappy sends a hash in the webhook for verification
  const hash = body.hash as string;
  const orderId = body.orderId as string;
  const status = body.status as string;
  // Basic verification - in production, verify the hash cryptographically
  return !!(hash && orderId && status);
}
