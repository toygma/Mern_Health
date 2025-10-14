import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import Doctor from "../models/doctor.model";
import Review from "../models/review.model";
import Appointment from "../models/appointment.model";

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
      workingHours,
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
      workingHours,
    });

    res.status(201).json({ success: true, doctor });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAllReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const review = await Review.find({});

    return res.status(200).json({
      review,
    });
  } catch (error: any) {
    console.log(error.message);
    next(error);
  }
};

const getAllAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const confirmedAppointments = await Appointment.find({})
      .populate("doctor")
      .populate("user");

    return res.status(200).json({
      success: true,
      data: confirmedAppointments,
    });
  } catch (error: any) {
    console.error("getConfirmedAppointments error:", error.message);
    next(error);
  }
};

export { getAllUsers, addDoctor, getAllReviews, getAllAppointment };
