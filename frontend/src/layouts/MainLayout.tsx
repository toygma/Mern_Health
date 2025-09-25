import { Outlet } from "react-router";

const MainLayouts = () => {
  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-col">
        <div>header</div>
        <div className="flex-grow min-h-screen w-full">
          <Outlet />
        </div>
        <div>footer</div>
      </div>
    </div>
  );
};

export default MainLayouts;
