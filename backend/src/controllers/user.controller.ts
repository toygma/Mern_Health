import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/user.model";
import sendToken from "../utils/sendToken";
import Doctor, { IDoctor } from "../models/doctor.model";



 const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, gender, images, phone, dob, role, address } = req.body;

    if (!name || !email || !password || !images || !gender) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    const existingUser = (await User.findOne({ email })) || (await Doctor.findOne({ email }));
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "A user with this email already exists.",
      });
    }

    const defaultAddress = {
      street: "123 Main Street",
      city: "New York",
      district: "Manhattan",
      postalCode: "10001",
      country: "United States",
    };

    const finalAddress = address || defaultAddress;

    let newUser: IUser | IDoctor | null = null;

    if (role === "patient") {
      newUser = await User.create({
        name,
        email,
        password,
        gender,
        images,
        phone,
        dob,
        address: finalAddress,
        role: "patient",
      });
    } else if (role === "doctor") {
      newUser = await Doctor.create({
        name,
        email,
        password,
        gender,
        images,
        phone,
        address: finalAddress,
        role: "doctor",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Must be 'patient' or 'doctor'.",
      });
    }

    sendToken({
      user: newUser,
      statusCode: 201,
      res,
    });
  } catch (error) {
    console.error("Register Error:", error);
    next(error);
  }
};


const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
      return;
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(401).json({
        success: false,
        message: "No user found",
      });
      return;
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      res.status(401).json({
        success: false,
        message: "The password is incorrect.",
      });
      return;
    }

    if (user.role === "doctor") {
      const doctorProfile = await Doctor.findOne({ user: user._id });
      const cookieExpiresTime = parseInt(process.env.COOKIE_EXPIRES_TIME!, 10);
      const cookieExpires = new Date(
        Date.now() + cookieExpiresTime * 24 * 60 * 60 * 1000
      );

      const token = user.getJwtToken();
      res.status(200).cookie("jwtToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: cookieExpires,
        path: "/",
      });

      return res.status(200).json({
        success: true,
        role: "doctor",
        token,
        user,
        doctorProfile,
      });
    }
    sendToken({
      user,
      statusCode: 201,
      res,
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  res.cookie("jwtToken", "", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
};

const getMeProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findById(req?.user?._id);
  try {
    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { register, login, logout, getMeProfile };
