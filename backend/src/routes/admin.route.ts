import express from "express";
import { addDoctor, getAllAppointment, getAllDoctors, getAllReviews, getAllUsers } from "../controllers/admin.controller";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.middleware";

const adminRouter = express.Router();

adminRouter.get("/all-users", isAuthenticatedUser,authorizeRoles("admin"), getAllUsers);

adminRouter.post("/add-doctor", isAuthenticatedUser,authorizeRoles("admin"), addDoctor);

adminRouter.get("/all-reviews", isAuthenticatedUser,authorizeRoles("admin"), getAllReviews);

adminRouter.get("/all-appointments", isAuthenticatedUser,authorizeRoles("admin"), getAllAppointment);

adminRouter.get("/all-doctors", getAllDoctors);





export default adminRouter;
