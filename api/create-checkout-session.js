const stripe = require('stripe')('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');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { line_items } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'apple_pay', 'google_pay'],
      mode: 'payment',
      line_items,
      success_url: 'https://sector-shop.com/success',
      cancel_url: 'https://sector-shop.com/cancel',
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
