import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/user.model";
import sendToken from "../utils/sendToken";
import Doctor, { IDoctor } from "../models/doctor.model";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, gender, images, phone, dob, role, address } =
      req.body;

    if (!name || !email || !password || !images || !gender) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    const existingUser =
      (await User.findOne({ email })) || (await Doctor.findOne({ email }));
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

  try {
    const user = (await User.findById(id)) || (await Doctor.findById(id));

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const Model:any = user.role === "doctor" ? Doctor : User;
    const updatedUser = await Model.findByIdAndUpdate(
      id,
      { $set: req.body },
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

    const Model:any = user.role === "doctor" ? Doctor : User;
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
    console.log("🚀 ~ getMeProfile ~ userId:", userId)

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please log in again.",
      });
    }

    // 🔹 Hem User hem Doctor koleksiyonlarını paralel kontrol et
    const [patient, doctor] = await Promise.all([
      User.findById(userId),
      Doctor.findById(userId),
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

export { register, login, logout, getMeProfile, updateUser, deleteUser };
