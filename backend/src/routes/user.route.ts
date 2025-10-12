import { Router } from "express";
import { register,login, logout,getMeProfile, updateUser, deleteUser } from "../controllers/user.controller";
import { isAuthenticatedUser } from "../middlewares/auth.middleware";

const userRoute = Router();

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.post("/logout",isAuthenticatedUser, logout);

//* USER UPDATE - DELETE - GET PROFILE *\\
userRoute.get("/me",isAuthenticatedUser, getMeProfile);
userRoute.put("/:id",isAuthenticatedUser, updateUser);
userRoute.delete("/:id",isAuthenticatedUser, deleteUser);

export default userRoute;