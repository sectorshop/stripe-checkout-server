const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: req.body.items,
      mode: 'payment',
      success_url: 'https://sector-shop.com/success',
      cancel_url: 'https://sector-shop.com/cancel',
    });

    res.status(200).json({ id: session.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
