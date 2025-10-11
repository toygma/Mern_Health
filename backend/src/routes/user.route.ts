import { Router } from "express";
import { register,login, logout,getMeProfile } from "../controllers/user.controller";
import { isAuthenticatedUser } from "../middlewares/auth.middleware";

const userRoute = Router();

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.post("/logout",isAuthenticatedUser, logout);
userRoute.get("/me",isAuthenticatedUser, getMeProfile);

export default userRoute;