import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
