import mongoose, { Schema, Document, Types } from "mongoose";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { IAppointment } from "./appointment.model";

interface IEducation {
  degree: string;
  institution: string;
  year: string;
}

interface IImage {
  public_id: string;
  url: string;
}

export interface IWorkingHours {
  dayOfWeek: number;
  isWorking: boolean;
  startTime: string;
  endTime: string;
}

// Ana Doktor arayüzü
export interface IDoctor extends Document {
  name: string;
  email: string;
  password: string;
  speciality: string;
  available: boolean;
  images: IImage[];
  experience: string;
  about: string;
  role: string;
  education: IEducation[];
  services: string[];
  address: Record<string, any>;
  phone: string;
  fee: number;
  patients: string;
  awards: string;
  reviews: Types.ObjectId[];
  totalRating: number;
  averageRating: number;
  appointments: IAppointment[];

  appointmentDurationMinutes: number;
  workingHours: IWorkingHours[];
  isPaid: "unpaid" | "paid" | "refunded";

  getJwtToken: () => string;
  comparePassword: (enteredPassword: string) => Promise<boolean>;

  createdAt?: Date;
  updatedAt?: Date;
}

const doctorSchema = new Schema<IDoctor>(
  {
    name: { type: String, required: [true, "İsim alanı zorunludur."] },
    email: {
      type: String,
      required: [true, "E-posta alanı zorunludur."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Şifre alanı zorunludur."],
      minlength: 6,
      select: false,
    },
    speciality: { type: String },
    available: { type: Boolean, default: true },
    role: { type: String, default: "doctor" },
    images: [
      {
        public_id: { type: String },
        url: { type: String },
      },
    ],
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    totalRating: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    experience: { type: String },
    about: { type: String },
      isPaid: {  
      type: String,
      enum: ["unpaid", "paid", "refunded"],
      default: "unpaid",
    },
    education: [
      {
        degree: { type: String },
        institution: { type: String },
        year: { type: String },
      },
    ],
    services: [{ type: String }],
    address: { type: Object },
    phone: { type: String },
    fee: { type: Number,default:100 },
    patients: { type: String },
    awards: [
      {
        title: { type: String },
        year: { type: String },
        description: { type: String },
        organization: { type: String },
      },
    ],
    appointments: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],

    appointmentDurationMinutes: {
      type: Number,
      default: 30,
    },
    workingHours: [
      {
        dayOfWeek: { type: Number, required: true },
        isWorking: { type: Boolean, default: false },
        startTime: { type: String, default: "09:00" },
        endTime: { type: String, default: "17:00" },
      },
    ],
  },
  { timestamps: true }
);

doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

doctorSchema.methods.getJwtToken = function (this: IDoctor): string {
  const secret = process.env.JWT_SECRET!;
  const expiresIn = process.env.JWT_EXPIRES_TIME!;
  return jwt.sign({ id: this._id }, secret, { expiresIn } as SignOptions);
};

doctorSchema.methods.comparePassword = async function (
  this: IDoctor,
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Doctor =
  (mongoose.models.Doctor as mongoose.Model<IDoctor>) ||
  mongoose.model<IDoctor>("Doctor", doctorSchema);

export default Doctor;
