import { Suspense } from "react";
import NotFound from "../components/NotFound";
import Loading from "../components/Loading";
import { ProtectedDoctor } from "./protected-route";
import DoctorPanel from "../pages/doctor/dashboard/Dashboard";
import DoctorLayout from "../layouts/DoctorLayout";

export const DoctorRoutes = {
  path: "/doctor",
  element: <DoctorLayout />,
  errorElement: <NotFound />,
  children: [
    {
      element: <ProtectedDoctor />,
      children: [
        {
          path: ":id",
          element: (
            <Suspense fallback={<Loading />}>
              <DoctorPanel />
            </Suspense>
          ),
        },
      ],
    },
  ],
};
