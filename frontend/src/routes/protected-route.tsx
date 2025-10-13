import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../redux/hook";

export const ProtectedRoute = () => {
    const { user } = useAppSelector((state) => state.auth);
  

  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export const GuestRoute = () => {
    const { user } = useAppSelector((state) => state.auth);
  

  if (user) {
    return <Navigate to="/" replace />;
  } else {
    return <Outlet />;
  }
};

export const ProtectedAdmin = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />; 
  }

  return <Outlet />;
};