import mongoose, { Schema, Document, Types } from "mongoose";

export interface IAppointment extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  doctor: Types.ObjectId;
  date: Date;
  timeSlot: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  isPaid: "unpaid" | "paid" | "refunded";
  paymentId?: string;
  reason: string;
  createdAt: Date;
  updatedAt: Date;
}

const appointmentSchema = new Schema<IAppointment>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    isPaid: {  
      type: String,
      enum: ["unpaid", "paid", "refunded"],
      default: "unpaid",
    },
    paymentId: {
      type: String,
    },
    reason: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

appointmentSchema.pre("save", async function (next) {
  if (this.status === "cancelled") {
    return next();
  }

  const existingAppointment = await Appointment.findOne({
    doctor: this.doctor,
    date: this.date,
    timeSlot: this.timeSlot,
    status: { $in: ["pending", "confirmed"] },
    _id: { $ne: this._id },
  });

  if (existingAppointment) {
    throw new Error("This time slot is already booked.");
  }

  next();
});

appointmentSchema.post("save", async function () {
  const Doctor = mongoose.model("Doctor");
  await Doctor.findByIdAndUpdate(
    this.doctor,
    { $addToSet: { appointments: this._id } }, 
    { new: true }
  );
});

const Appointment = mongoose.models.Appointment || 
  mongoose.model<IAppointment>("Appointment", appointmentSchema);

export default Appointment;