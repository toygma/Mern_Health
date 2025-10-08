import { createBrowserRouter } from "react-router";
import { AuthRoutes, MainRoutes } from "./MainRoutes";

export const router = createBrowserRouter([
    MainRoutes,
    AuthRoutes
])