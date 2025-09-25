import { Suspense } from "react";
import NotFound from "../components/NotFound";
import Loading from "../components/Loading";
import HomePage from "../pages/home/HomePage";
import MainLayout from "../layouts/MainLayout";

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
  ],
};
