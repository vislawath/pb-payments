// PA-40: Handle Stripe webhook events

const express = require('express');
const router = express.Router();
const crypto = require('crypto');

/**
 * POST /webhooks/stripe
 * Handle incoming Stripe webhook events
 */
router.post('/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  let event;
  
  try {
    // Verify webhook signature
    event = verifyStripeSignature(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      await handlePaymentSucceeded(event.data.object);
      break;
    case 'payment_intent.payment_failed':
      await handlePaymentFailed(event.data.object);
      break;
    case 'charge.refunded':
      await handleRefund(event.data.object);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
  
  res.json({ received: true });
});

function verifyStripeSignature(payload, signature, secret) {
  // Verify Stripe webhook signature
  const hmac = crypto.createHmac('sha256', secret);
  const signedPayload = hmac.update(payload).digest('hex');
  
  if (signature !== signedPayload) {
    throw new Error('Invalid signature');
  }
  
  return JSON.parse(payload);
}

async function handlePaymentSucceeded(paymentIntent) {
  console.log('Payment succeeded:', paymentIntent.id);
  // Process successful payment
}

async function handlePaymentFailed(paymentIntent) {
  console.log('Payment failed:', paymentIntent.id);
  // Handle failed payment
}

async function handleRefund(charge) {
  console.log('Refund processed:', charge.id);
  // Process refund
}

module.exports = router;
