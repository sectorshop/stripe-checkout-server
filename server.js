const express = require("express");
const app = express();

// ⛔️ Никому не показывай этот ключ публично!
const stripe = require("stripe")("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");

app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const { items } = req.body;

  const line_items = items.map(item => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
        description: item.variant,
      },
      unit_amount: item.price * 100, // цена в центах
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items,
    success_url: "https://sector-shop.com/success",
    cancel_url: "https://sector-shop.com/cancel",
  });

  res.json({ url: session.url });
});

app.listen(4242, () => console.log("✅ Сервер запущен"));
