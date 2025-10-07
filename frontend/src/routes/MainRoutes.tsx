import { Suspense } from "react";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../components/NotFound";
import Loading from "../components/Loading";

//suspense
import HomePage from "../pages/home/HomePage";
import AllDoctors from "../pages/doctors/AllDoctors";
import DetailDoctor from "../pages/detail/DetailDoctor";

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
