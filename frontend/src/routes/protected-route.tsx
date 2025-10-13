import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../redux/hook";
import Loading from "../components/Loading";

export const ProtectedRoute = () => {
  const { user, loading } = useAppSelector((state) => state.auth);
  console.log("🚀 ~ ProtectedRoute ~ user:", user)

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export const GuestRoute = () => {
  const { user, loading } = useAppSelector((state) => state.auth);
  console.log("🚀 ~ GuestRoute ~ user:", user)

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  } else {
    return <Outlet />;
  }
};

export const ProtectedAdmin = () => {
  const { user, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return <Loading />;
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
