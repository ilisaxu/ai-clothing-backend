import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(req, res) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: 5000,
          product_data: { name: "Tutoring Session" }
        },
        quantity: 1
      }
    ],
    success_url: "https://yxu1234567.github.io/tmplace/success.html",
    cancel_url: "https://yxu1234567.github.io/tmplace/cancel.html"
  });

  res.json({ url: session.url });
}