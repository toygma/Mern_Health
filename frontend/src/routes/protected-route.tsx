import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../redux/hook";
import Loading from "../components/Loading";

export const ProtectedRoute = () => {
  const { user, loading } = useAppSelector((state) => state.auth);

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


export const ProtectedDoctor = () => {
  const { user, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return <Loading />;
  }

  if (!user || user.role !== "doctor") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};


export const ProtectedPaid = () => {
  const { user, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return <Loading />;
  }

  if (!user || user.paid !== "paid") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
