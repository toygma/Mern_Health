import express from "express";
import { getAllUsers } from "../controllers/admin.controller";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.middleware";

const adminRouter = express.Router();

adminRouter.get("/all-users", isAuthenticatedUser,authorizeRoles("admin"), getAllUsers);

export default adminRouter;
