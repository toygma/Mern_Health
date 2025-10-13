import { Suspense } from "react";
import NotFound from "../components/NotFound";
import { ProtectedAdmin } from "./protected-route";
import Loading from "../components/Loading";
import AdminLayout from "../layouts/AdminLayout";
import AddDoctor from "../pages/admin/addDoctor/AddDoctor";

export const AdminRoutes = {
  path: "/admin",
  element: <AdminLayout />,
  errorElement: <NotFound />,
  children: [
    {
      element: <ProtectedAdmin />,
      children: [
        {
          path: "/add-doctor",
          element: (
            <Suspense fallback={<Loading />}>
              <AddDoctor />
            </Suspense>
          ),
        },
      ],
    },
  ],
};
