import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import sendToken from "../utils/sendToken";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, gender, images, phone, dob, address } =
    req.body;
    
    // Validation
    if (!name || !email || !password || !images || !gender) {
      res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
      return;
    }
    const defaultAddress = {
      street: "123 Main Street",
      city: "New York",
      district: "Manhattan",
      postalCode: "10001",
      country: "United States"
    };
 
    const newUser = await User.create({
      name,
      email,
      password,
      gender,
      images,
      phone,
      dob,
      address:defaultAddress,
    });

    sendToken({
      user: newUser,
      statusCode: 201,
      res,
    });
  } catch (error:any) {
    console.log(error)
    next(error);
  }
};

export  { register };
