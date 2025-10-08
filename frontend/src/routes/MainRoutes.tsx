import { Suspense } from "react";
import { lazy } from "react";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../components/NotFound";
import Loading from "../components/Loading";
import { GuestRoute, ProtectedRoute } from "./protected-route";

//suspense

const HomePage = lazy(() => import("../pages/home/HomePage"));
const AllDoctors = lazy(() => import("../pages/doctors/AllDoctors"));
const DetailDoctor = lazy(() => import("../pages/detail/DetailDoctor"));
const SignUp = lazy(() => import("../pages/auth/signup/SignUp"));
const Login = lazy(() => import("../pages/auth/login/Login"));

export const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  errorElement: <NotFound />,
  children: [
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<Loading />}>
              <HomePage />
            </Suspense>
          ),
        },
        {
          path: "/doctors",
          element: (
            <Suspense fallback={<Loading />}>
              <AllDoctors />
            </Suspense>
          ),
        },
        {
          path: "/doctor/:slug/:id",
          element: (
            <Suspense fallback={<Loading />}>
              <DetailDoctor />
            </Suspense>
          ),
        },
      ],
    },
  ],
};

export const AuthRoutes = {
  path: "/",
  element: <AuthLayout />,
  errorElement: <NotFound />,
  children: [
    {
      element: <GuestRoute />,
      children: [
        {
          path: "/login",
          element: (
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          ),
        },
        {
          path: "/sign-up",
          element: (
            <Suspense fallback={<Loading />}>
              <SignUp />
            </Suspense>
          ),
        },
      ],
    },
  ],
};
