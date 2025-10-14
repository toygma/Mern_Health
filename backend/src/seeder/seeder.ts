import mongoose from "mongoose";
import dotenv from "dotenv";
import Doctor from "../models/doctor.model";
import { Doctors } from "../data/doctorsData";
dotenv.config();
const SeederProduct = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    // await productModel.deleteMany();
    // console.log("Products Are Deleted !");

    await Doctor.insertMany(Doctors);
    console.log("Products Are Added !");
  } catch (error) {
    console.log(error);
  }
};

SeederProduct();