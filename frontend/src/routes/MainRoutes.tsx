import { Suspense } from "react";
import { lazy } from 'react';
import MainLayout from "../layouts/MainLayout";
import NotFound from "../components/NotFound";
import Loading from "../components/Loading";

//suspense

const HomePage = lazy(() => import("../pages/home/HomePage"));
const AllDoctors = lazy(() => import("../pages/doctors/AllDoctors"));
const DetailDoctor = lazy(() => import("../pages/detail/DetailDoctor"));

export const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  errorElement: <NotFound />,
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
};
