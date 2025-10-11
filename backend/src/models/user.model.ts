import mongoose, { Schema, Document } from "mongoose";

// User Interface
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  address: Record<string, any>;
  gender: string;
  phone: string;
  dob:string;
  images: { public_id: string; url: string }[];
  createdAt?: Date;
  updatedAt?: Date;
}

// User Schema
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    password: {
      type: String,
      required: true,
      select: false,
    },
    email: { type: String, required: true, unique: true },
    address: { type: Object, required: true },
    gender: { type: String, default: "Not Selected" },
    dob: { type: String, default: "Not Selected" },
    phone: { type: String, default: "0000000" },
    images: [
      {
        public_id: { type: String },
        url: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("user", userSchema);

export default User;
