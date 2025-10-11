import { Response } from "express";
import { IUser } from "../models/user.model";

interface SendTokenOptions {
  user: IUser;
  statusCode: number;
  res: Response;
}

const sendToken = (options: SendTokenOptions): void => {
  const { user, statusCode, res } = options;

  const jwtToken = user.getJwtToken();

  const cookieExpiresTime = parseInt(
    process.env.COOKIE_EXPIRES_TIME!,
    10
  ); 

  // Calculate expiration date
  const cookieExpires = new Date(
    Date.now() + cookieExpiresTime * 24 * 60 * 60 * 1000
  );

  // Set cookie
  res.cookie("jwtToken", jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: cookieExpires,
    path: "/",
  });

  const userResponse = user.toObject();

  // Send response
  res.status(statusCode).json({
    success: true,
    token: jwtToken,
    user: userResponse,
  });
};

export default sendToken;