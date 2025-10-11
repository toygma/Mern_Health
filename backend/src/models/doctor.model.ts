import mongoose, { Schema, Document } from "mongoose";

interface IEducation {
  degree: string;
  institution: string;
  year: string;
}

// Doctor Interface
interface IDoctor extends Document {
  name: string;
  speciality: string;
  password: string;
  available: boolean;
  images: { public_id: string; url: string }[];
  ratings: number;
  numOfReviews: number;
  reviews: {
    user: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
    createdAt: Date;
  }[];
  experience: string;
  about: string;
  education: IEducation[];
  services: string[];
  hours: string;
  address:  Record<string, any>;
  phone: string;
  email: string;
  fee: string;
  patients: string;
  awards: string;
  slots_booked: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
}

// Doctor Schema
const doctorSchema = new Schema<IDoctor>(
  {
    name: { type: String, required: true },
    password: {
      type: String,
      required: true,
      select: false,
    },
    email: { type: String, required: true, unique: true },
    speciality: { type: String, required: true },
    available: { type: Boolean, default: true },

    images: [
      {
        public_id: { type: String },
        url: { type: String },
      },
    ],

    ratings: { type: Number, default: 0 },
    numOfReviews: { type: Number, default: 0 },

    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    experience: { type: String, required: true },
    about: { type: String, required: true },
    education: [
      {
        degree: { type: String, required: true },
        institution: { type: String, required: true },
        year: { type: String, required: true },
      },
    ],
    services: [{ type: String }],
    hours: { type: String, required: true },
    address: { type: Object, required: true },
    phone: { type: String, required: true },
    fee: { type: String, required: true },
    patients: { type: String, required: true },
    awards: { type: String, required: true },
    slots_booked: { type: Object, default: {} },
  },
  { timestamps: true }
);

const Doctor =
  mongoose.models.doctor || mongoose.model<IDoctor>("Doctor", doctorSchema);

export default Doctor;
