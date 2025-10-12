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

export { getAllUsers };
