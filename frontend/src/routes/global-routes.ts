import { createBrowserRouter } from "react-router";
import { AuthRoutes, MainRoutes } from "./MainRoutes";
import { AdminRoutes } from "./AdminRoutes";
import { DoctorRoutes } from "./DoctorRoutes";

export const router = createBrowserRouter([
    MainRoutes,
    AuthRoutes,
    AdminRoutes,
    DoctorRoutes
])