import { createBrowserRouter } from "react-router";
import { AuthRoutes, MainRoutes } from "./MainRoutes";
import { AdminRoutes } from "./AdminRoutes";

export const router = createBrowserRouter([
    MainRoutes,
    AuthRoutes,
    AdminRoutes
])