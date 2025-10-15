import { Outlet } from "react-router";

const DoctorLayout = () => {
  return (
    <div className="min-h-screen w-full">
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default DoctorLayout;
