import { Router } from "express";
import {
  register,
  login,
  logout,
  getMeProfile,
  updateUser,
  deleteUser,
  getDetailProfile,
} from "../controllers/user.controller";
import { isAuthenticatedUser } from "../middlewares/auth.middleware";
import reviewRouter from "./review.route";

const userRoute = Router();

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.post("/logout", isAuthenticatedUser, logout);

//* nested route *\\
userRoute.use("/:id/reviews", reviewRouter);

//* USER UPDATE - DELETE - GET PROFILE *\\
userRoute.get("/me", isAuthenticatedUser, getMeProfile);
userRoute.put("/:id", isAuthenticatedUser, updateUser);
userRoute.delete("/:id", isAuthenticatedUser, deleteUser);

//*DETAIL PAGE*\\
userRoute.get("/:id", isAuthenticatedUser, getDetailProfile);

export default userRoute;
