import express from "express";
import { addDoctor, getAllUsers } from "../controllers/admin.controller";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.middleware";

const adminRouter = express.Router();

adminRouter.get("/all-users", isAuthenticatedUser,authorizeRoles("admin"), getAllUsers);

adminRouter.post("/add-doctor", isAuthenticatedUser,authorizeRoles("admin"), addDoctor);


export default adminRouter;
