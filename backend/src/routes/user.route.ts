import { Router } from "express";
import { register } from "../controllers/user.controller";

const userRoute = Router();

userRoute.post("/register", register);

export default userRoute;