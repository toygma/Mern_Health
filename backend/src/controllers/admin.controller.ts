import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import Doctor from "../models/doctor.model";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [patients, doctors] = await Promise.all([
      User.find({}),
      Doctor.find({}),
    ]);

    return res.status(200).json({
      success: true,
      message: "Users and doctors retrieved successfully",
      counts: {
        patients: patients.length,
        doctors: doctors.length,
      },
    });
  } catch (error) {
    console.error("Get All Users Error:", error);
    next(error);
  }
};

const addDoctor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      available,
      role,
      images,
      experience,
      about,
      education,
      services,
      hours,
      address,
      phone,
      fee,
      patients,
      awards,
      timeSlots,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: "Doctor with this email already exists",
      });
    }

    const doctor = await Doctor.create({
      name,
      email,
      password,
      speciality,
      available,
      role,
      images,
      experience,
      about,
      education,
      services,
      hours,
      address,
      phone,
      fee,
      patients,
      awards,
      timeSlots,
    });

    res.status(201).json({ success: true, doctor });
  } catch (error) {
    console.log(error)
    next(error);
  }
};

export { getAllUsers ,addDoctor};
