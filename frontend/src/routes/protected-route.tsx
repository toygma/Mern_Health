import { Navigate, Outlet } from "react-router";

export const ProtectedRoute = () => {
  const user = true;

  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export const GuestRoute = () => {
  const user = false;

  if (user) {
    return <Navigate to="/" replace />;
  } else {
    return <Outlet />;
  }
};
