import mongoose, { Schema, Document, Types } from "mongoose";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";

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
export interface IDoctor extends Document {
  name: string;
  email: string;
  password: string;
  speciality: string;
  available: boolean;
  images: IImage[];
  ratings: number;
  numOfReviews: number;
  reviews: IReview[];
  experience: string;
  about: string;
  role: string;
  education: IEducation[];
  services: string[];
  hours: string;
  address: Record<string, any>;
  phone: string;
  fee: string;
  patients: string;
  awards: string;
  timeSlots: Record<string, any>;
  isApproved: string;
  createdAt?: Date;
  updatedAt?: Date;
  appointments: any;
  getJwtToken: () => string;
  comparePassword: (enteredPassword: string) => Promise<boolean>;
}

const doctorSchema = new Schema<IDoctor>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    speciality: { type: String,  },
    available: { type: Boolean, default: true },
    role: { type: String },
    images: [
      {
        public_id: { type: String,  },
        url: { type: String,  },
      },
    ],
    ratings: { type: Number, default: 0 },
    numOfReviews: { type: Number, default: 0 },
    reviews: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        rating: { type: Number,  },
        comment: { type: String,  },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    experience: { type: String,  },
    about: { type: String,  },
    education: [
      {
        degree: { type: String,  },
        institution: { type: String,  },
        year: { type: String,  },
      },
    ],
    services: [{ type: String }],
    hours: { type: String,  },
    address: { type: Object,  },
    phone: { type: String,  },
    fee: { type: String,  },
    patients: { type: String,  },
    awards: { type: String,  },
    timeSlots: { type: Array },
    isApproved: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    appointments: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
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
