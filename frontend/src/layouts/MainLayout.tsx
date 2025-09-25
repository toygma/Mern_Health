import { Outlet } from "react-router";
import Header from "../components/header/Header";

const MainLayouts = () => {
  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-col">
        <div className="container mx-auto h-[12vh]">
          <Header/>
        </div>
        <div className="flex-grow min-h-screen w-full">
          <Outlet />
        </div>
        <div>footer</div>
      </div>
    </div>
  );
};

export default MainLayouts;
