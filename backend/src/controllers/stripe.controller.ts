import { Request, Response } from "express";
import Appointment from "../models/appointment.model";
import Doctor from "../models/doctor.model";
import User from "../models/user.model";
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-10-29.clover",
});

const getCheckoutSession = async (req: Request, res: Response) => {
  try {
    const { doctorId, appointmentId } = req.params;

    if (!appointmentId || !doctorId) {
      return res
        .status(400)
        .json({ message: "doctorId and appointmentId are required" });
    }

    const userId = req.user?._id;
    const doctor = await Doctor.findById(doctorId);
    const user = await User.findById(userId);
    const appointment = await Appointment.findById(appointmentId);

    if (!doctor || !user) {
      return res.status(404).json({ message: "Doctor or user not found" });
    }

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/appointments/success?success=true&appointmentId=${appointmentId}`,
      cancel_url: `${process.env.FRONTEND_URL}/appointments/cancel?canceled=true`,
      customer_email: user.email,
      client_reference_id: doctorId,
      line_items: [
        {
          price_data: {
            currency: "try",
            unit_amount: Math.round(Number(doctor.fee) * 100),
            product_data: {
              name: `Appointment with  ${doctor.name}`,
              description: doctor.about || "",
              images: doctor.images?.length ? [doctor.images[0].url] : [],
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        appointmentId: appointmentId,
        doctorId: doctorId,
        userId: String(user._id),
      },
    });

    appointment.session = session.id;
    await appointment.save();

    return res.status(200).json({ success: true, sessionUrl: session.url });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Error creating checkout session",
    });
  }
};



export default { getCheckoutSession };