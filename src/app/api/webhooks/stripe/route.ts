import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';
import type Stripe from 'stripe';

// ─── Environment ─────────────────────────────────────────────────────────────
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

/**
 * POST /api/webhooks/stripe
 *
 * Stripe webhook handler for subscription lifecycle events.
 * Verifies the Stripe signature, then handles:
 *   - checkout.session.completed    -> subscription activated
 *   - customer.subscription.updated -> plan changed
 *   - customer.subscription.deleted -> cancelled
 *   - invoice.payment_failed        -> payment failed
 *
 * Updates the broker record in Supabase accordingly.
 */
export async function POST(request: NextRequest) {
  let event: Stripe.Event;

  // 1. Read raw body for signature verification
  const rawBody = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  // 2. Verify Stripe webhook signature
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown verification error';
    console.error(`[Stripe Webhook] Signature verification failed: ${message}`);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = await createClient();

  // 3. Handle events
  try {
    switch (event.type) {
      // ── Checkout completed: new subscription activated ─────────────
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.mode !== 'subscription') break;

        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string;

        // Determine plan from subscription items
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const plan = determinePlan(subscription);

        // Update broker record with Stripe IDs and plan
        const { error } = await supabase
          .from('brokers')
          .update({
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            plan,
            is_active: true,
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_customer_id', customerId);

        if (error) {
          // If broker not found by customer ID, try metadata
          const brokerId = session.metadata?.broker_id;
          if (brokerId) {
            await supabase
              .from('brokers')
              .update({
                stripe_customer_id: customerId,
                stripe_subscription_id: subscriptionId,
                plan,
                is_active: true,
                updated_at: new Date().toISOString(),
              })
              .eq('id', brokerId);
          }
        }

        console.log(`[Stripe Webhook] Subscription activated for customer ${customerId}, plan: ${plan}`);
        break;
      }

      // ── Subscription updated: plan changed ────────────────────────
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        const plan = determinePlan(subscription);
        const isActive = subscription.status === 'active' || subscription.status === 'trialing';

        await supabase
          .from('brokers')
          .update({
            plan,
            is_active: isActive,
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_customer_id', customerId);

        console.log(`[Stripe Webhook] Subscription updated for customer ${customerId}, plan: ${plan}, active: ${isActive}`);
        break;
      }

      // ── Subscription deleted: cancelled ───────────────────────────
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Downgrade to starter (free tier) and deactivate
        await supabase
          .from('brokers')
          .update({
            plan: 'starter',
            is_active: false,
            stripe_subscription_id: null,
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_customer_id', customerId);

        console.log(`[Stripe Webhook] Subscription cancelled for customer ${customerId}`);
        break;
      }

      // ── Invoice payment failed ────────────────────────────────────
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        // Log the failure — broker stays active until subscription is actually cancelled
        // Stripe will automatically retry based on retry settings
        console.warn(`[Stripe Webhook] Payment failed for customer ${customerId}, invoice ${invoice.id}`);

        // Optionally flag the broker so we can show a warning in the dashboard
        await supabase
          .from('brokers')
          .update({
            updated_at: new Date().toISOString(),
            // A metadata column could track payment_status, but for now we log
          })
          .eq('stripe_customer_id', customerId);

        break;
      }

      default:
        // Unhandled event type — log for debugging
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
    }
  } catch (handlerError) {
    console.error(`[Stripe Webhook] Error handling ${event.type}:`, handlerError);
    // Return 200 even on handler errors to prevent Stripe from retrying
    // The error is logged and can be investigated
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Determine the CotiFacil plan from a Stripe subscription's price IDs.
 */
function determinePlan(subscription: Stripe.Subscription): 'starter' | 'pro' | 'enterprise' {
  const priceId = subscription.items.data[0]?.price?.id;

  if (priceId === process.env.STRIPE_PRO_PRICE_ID) return 'pro';
  if (priceId === process.env.STRIPE_ENTERPRISE_PRICE_ID) return 'enterprise';
  return 'starter';
}
