import mongoose, { Schema, Document, Types } from "mongoose";


interface IEducation {
  degree: string;
  institution: string;
  year: string;
}

interface IReview {
  user: Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
}

interface IImage {
  public_id: string;
  url: string;
}
interface IDoctor extends Document {
  user: Types.ObjectId; 
  speciality: string;
  available: boolean;
  images: IImage[];
  ratings: number;
  numOfReviews: number;
  reviews: IReview[];
  experience: string;
  about: string;
  education: IEducation[];
  services: string[];
  hours: string;
  address: Record<string, any>; 
  phone: string;
  fee: string;
  patients: string;
  awards: string;
  slots_booked: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
}

const doctorSchema = new Schema<IDoctor>(
  {
    user: {
      type: Schema.Types.ObjectId, 
      ref: "User",
      required: true, 
    },
    speciality: { type: String, required: true },
    available: { type: Boolean, default: true },
    images: [
      {
        public_id: { type: String, required: true }, 
        url: { type: String, required: true },
      },
    ],
    ratings: { type: Number, default: 0 },
    numOfReviews: { type: Number, default: 0 },
    reviews: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
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
  (mongoose.models.Doctor as mongoose.Model<IDoctor>) || 
  mongoose.model<IDoctor>("Doctor", doctorSchema);

export default Doctor;