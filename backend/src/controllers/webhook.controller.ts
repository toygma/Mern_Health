import { Request, Response } from "express";
import Stripe from "stripe";
import Appointment from "../models/appointment.model";
import User from "../models/user.model"; // 🔹 Bunu ekle

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-10-29.clover",
});

export const handleStripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!endpointSecret) {
    return res.status(500).json("Stripe webhook secret not set");
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const appointmentId = session.metadata?.appointmentId;

    if (!appointmentId) {
      console.error("No appointmentId in session metadata");
      return res.status(400).send("No appointmentId in session metadata");
    }

    try {
      const appointment = await Appointment.findById(appointmentId);

      if (!appointment) {
        console.error(`Appointment ${appointmentId} not found.`);
        return res.status(404).send("Appointment not found");
      }

      appointment.status = "confirmed";
      appointment.paid = "paid";
      appointment.paymentId = session.payment_intent as string;
      appointment.paidAt = new Date();
      await appointment.save();

      if (appointment.user) {
        await User.findByIdAndUpdate(appointment.user, { paid: "paid" });
      }

      console.log(
        `Appointment ${appointmentId} confirmed & user marked as paid.`
      );
    } catch (err) {
      console.error("Error updating appointment/user:", err);
      return res.status(500).send("Internal server error");
    }
  } else {
    console.log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).json({ received: true });
};
