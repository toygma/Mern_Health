import { Request, Response } from "express";
import Stripe from "stripe";
import Appointment from "../models/appointment.model";
import User from "../models/user.model";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-10-29.clover",
});

export const handleStripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  if (!endpointSecret) {
    return res.status(500).json("Stripe webhook secret not set");
  }

  if (!sig) {
    return res.status(500).json("Stripe webhook sig not set");
  }

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({
      error: `Webhook Error: ${error}`,
    });
  }
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const appointmentId = session.metadata?.appointmentId;

    if (!appointmentId) {
      console.error("No appointmentId in session metadata");
      return res.status(400).send("No appointmentId in session metadata");
    }

    try {
      const appointment = await Appointment.findById(appointmentId).populate(
        "user doctor"
      );

      if (!appointment) {
        console.error(`Appointment ${appointmentId} not found.`);
        return res.status(404).send("Appointment not found");
      }

      appointment.status = "confirmed";
      appointment.isPaid = "paid";
      appointment.paymentId = session.payment_intent as string;
      await appointment.save();

      if (appointment.user) {
        appointment.user.isPaid = "paid";
        await appointment.user.save();
      }

      
      if (appointment.doctor) {
        appointment.doctor.isPaid = "paid";
        await appointment.user.save();
      }
     
     

      console.log(
        `Appointment ${appointmentId} and related user/doctor marked as paid.`
      );
    } catch (error: any) {
      console.log("error creating order in sanity", error.message);
      return res.status(400).json({
        error: `Error Creating order: ${error}`,
      });
    }
  }
  return res.status(200).json({ received: true });
};
