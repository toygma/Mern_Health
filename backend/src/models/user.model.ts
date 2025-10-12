import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";

interface IImage {
  public_id: string;
  url: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  address: Record<string, any>;
  gender: string;
  phone: string;
  dob: string;
  images: IImage[];
  createdAt?: Date;
  updatedAt?: Date;
  role: "patient" | "admin" | "doctor";
  getJwtToken: () => string;
  comparePassword: (enteredPassword: string) => Promise<boolean>;
}

interface UserModel extends Model<IUser> {}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    password: {
      type: String,
      required: true,
      select: false,
    },
    email: { type: String, required: true, unique: true },
    address: { type: Object },
    gender: { type: String, default: "Not Selected" },
    dob: { type: String, default: "Not Selected" },
    phone: { type: String, default: "0000000" },
    role: {
      type: String,
      enum: ["patient", "admin", "doctor"],
      default: "patient",
    },
    images: [
      {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
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

userSchema.methods.getJwtToken = function (this: IUser): string {
  const secret = process.env.JWT_SECRET!;
  const expiresIn = process.env.JWT_EXPIRES_TIME!;

  return jwt.sign({ id: this._id }, secret, { expiresIn } as SignOptions);
};

userSchema.methods.comparePassword = async function (
  this: IUser,
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User =
  (mongoose.models.User as UserModel) ||
  mongoose.model<IUser, UserModel>("User", userSchema);

export default User;
