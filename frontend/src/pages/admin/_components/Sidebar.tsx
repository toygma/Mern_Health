import { Link, useLocation } from "react-router";
import {
  Home,
  UserPlus,
  FileText,
  Calendar,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import authPng from "/user.png";

const data = [
  {
    id: 1,
    title: "Dashboard",
    path: "/admin",
    icon: <Home size={20} />,
  },
  {
    id: 2,
    title: "Create Doctor",
    path: "/admin/add-doctor",
    icon: <UserPlus size={20} />,
  },
  {
    id: 3,
    title: "Reviews",
    path: "/admin/reviews",
    icon: <FileText size={20} />,
  },
  {
    id: 4,
    title: "Appointments",
    path: "/admin/appointments",
    icon: <Calendar size={20} />,
  },
];

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {};

  return (
    <div
      className={`bg-white border-r border-gray-200 h-full flex flex-col transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {isOpen && <h1 className="text-2xl! font-bold text-gray-900">Admin</h1>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer ${
            !isOpen && "flex items-center justify-center w-full"
          }`}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menü */}
      <ul className="px-3 space-y-2 flex-1 py-6 overflow-y-auto">
        {data.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li key={item.id} title={!isOpen ? item.title : ""}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className={isActive ? "text-blue-600" : "text-gray-600"}>
                  {item.icon}
                </span>
                {isOpen && (
                  <span
                    className={`font-medium ${isActive ? "font-semibold" : ""}`}
                  >
                    {item.title}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Profil ve Logout - En altta */}
      <div className={`p-4 border-t border-gray-200 ${isOpen ? "flex items-center justify-between":"flex flex-col gap-4"}`}>
        <div
          className={`flex items-center gap-3 ${
            isOpen ? "" : "justify-center"
          }`}
        >
          <img
            src={authPng}
            alt="profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
        <div
          className={`space-y-2 flex ${
            isOpen ? "flex-col" : "flex-col items-center gap-1"
          }`}
        >
          <button
            onClick={handleLogout}
            className={`flex items-center gap-2  py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium cursor-pointer ${
              isOpen ? "" : "justify-center p-2 px-4"
            }`}
            title={!isOpen ? "Logout" : ""}
          >
            <LogOut size={20} />
            {isOpen && "Logout"}
          </button>
        </div>
        <Link
          to={"/"}
          className={`flex items-center gap-2  py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium cursor-pointer ${
            isOpen ? "" : "justify-center p-2 px-4"
          }`}
          title={!isOpen ? "Home" : ""}
        >
          <LayoutDashboard size={20} />
          {isOpen && "Home"}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
