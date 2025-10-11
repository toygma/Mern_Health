import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Check if user is authenticated
export const isAuthenticatedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { jwtToken } = req.cookies;

    if (!jwtToken) {
      res.status(401).json({
        success: false,
        message: "Please log in",
      });
      return;
    }

    const decoded = jwt.verify(
      jwtToken,
      process.env.JWT_SECRET!
    ) as DecodedToken;
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

// Check user role
export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: `Role (${req.user?.role}) cannot access this resource`,
      });
      return;
    }

    next();
  };
};