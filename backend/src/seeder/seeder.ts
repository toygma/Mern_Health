import mongoose from "mongoose";
import dotenv from "dotenv";
import Doctor from "../models/doctor.model";
import { Doctors } from "../data/doctorsData";

dotenv.config();

const SeederDoctor = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("✅ Database connected!");

    await Doctor.deleteMany();
    console.log("🗑️  Old doctors deleted!");

    await Doctor.insertMany(Doctors);
    console.log("✅ New doctors added!");
    console.log(`📊 Total: ${Doctors.length} doctors`);

    // Bağlantıyı kapat
    await mongoose.connection.close();
    console.log("🔌 Database connection closed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

SeederDoctor();