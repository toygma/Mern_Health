import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/user.model";
import sendToken from "../utils/sendToken";
import Doctor, { IDoctor } from "../models/doctor.model";
import { upload_file } from "../utils/cloudinary";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { 
      name, 
      email, 
      password, 
      role,
      phone,
      speciality,
      experience,
      about,
      fee,
      education,
      services,
      address,
      appointmentDurationMinutes,
      workingHours,
    } = req.body as IDoctor;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields (name, email, password).",
      });
    }

    const existingUser = 
      (await User.findOne({ email })) || 
      (await Doctor.findOne({ email }));
      
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "A user with this email already exists.",
      });
    }

    let newUser: IUser | IDoctor | null = null;

    if (role === "patient") {
      newUser = await User.create({
        name,
        email,
        password,
        role: "patient",
      });

    } else if (role === "doctor") {
      if (!phone || !speciality || !experience || !about) {
        return res.status(400).json({
          success: false,
          message: "Please provide all required doctor fields (phone, speciality, experience, about).",
        });
      }

      if (!education || education.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Please provide at least one education entry.",
        });
      }

      if (!services || services.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Please provide at least one service.",
        });
      }

      const serviceStrings = services.map((s:any) => s.value);

      newUser = await Doctor.create({
        name,
        email,
        password,
        phone,
        speciality,
        experience,
        about,
        fee: fee || 100,
        education,
        services: serviceStrings,
        address: address || {},
        appointmentDurationMinutes: appointmentDurationMinutes || 30,
        workingHours: workingHours || [],
        role: "doctor",
        available: true,
      });

    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Must be 'patient' or 'doctor'.",
      });
    }

    // Token gönder
    sendToken({
      user: newUser,
      statusCode: 201,
      res,
    });

  } catch (error: any) {
    console.error("Register Error:", error);
    
    // Mongoose validation hatalarını yakala
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

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

    const existingUser =
      (await User.findOne({ email }).select("+password")) ||
      (await Doctor.findOne({ email }).select("+password"));

    if (!existingUser) {
      res.status(409).json({
        success: false,
        message: "No user found",
      });
      return;
    }
    const isPasswordMatched = await existingUser.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password.",
      });
    }

    sendToken({
      user: existingUser,
      statusCode: 200,
      res,
    });
  } catch (error) {
    console.error("Login Error:", error);
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

//* USER UPDATE - DELETE - GET PROFILE *\\

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name, email, phone, gender, dob, address, image } = req.body;

  try {
    const user = (await User.findById(id)) || (await Doctor.findById(id));
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let uploadedImage: { public_id: string; url: string } | undefined;
    if (image) {
      const uploaded = await upload_file(image, "mern-health/patient");
      uploadedImage = {
        public_id: uploaded.public_id,
        url: uploaded.url,
      };
    }

    const newUserData: any = { name, email, phone, gender, dob, address };
    if (uploadedImage) newUserData.image = [uploadedImage];

    const Model: any = user.role === "doctor" ? Doctor : User;

    const updatedUser = await Model.findByIdAndUpdate(
      id,
      { $set: newUserData },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Update Error:", error);
    next(error);
  }
};

// ==================== DELETE USER ====================
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const user = (await User.findById(id)) || (await Doctor.findById(id));

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const Model: any = user.role === "doctor" ? Doctor : User;
    await Model.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    console.error("Delete Error:", error);
    next(error);
  }
};

// ==================== GET MY PROFILE ====================
const getMeProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req?.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please log in again.",
      });
    }

    const [patient, doctor] = await Promise.all([
      User.findById(userId),
      Doctor.findById(userId).populate("reviews"),
    ]);

    const currentUser = patient || doctor;

    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: currentUser,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);
    next(error);
  }
};

// ==================== GET DETAIL ====================
const getDetailProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(401).json({
        success: false,
        message: "id not found",
      });
    }

    const doctor = await Doctor.findById(id);

    return res.status(200).json({
      success: true,
      doctor,
    });
  } catch (error) {
    console.error("Get Doctor Detail Error:", error);
    next(error);
  }
};

export {
  register,
  login,
  logout,
  getMeProfile,
  updateUser,
  deleteUser,
  getDetailProfile,
};
