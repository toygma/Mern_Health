import { Link, useNavigate } from "react-router";
import logo from "/logo.png";
import Button from "../../ui/Button";
import { useState } from "react";
import MobileHeader from "./_components/MobileHeader";
import { data } from "./_components/dataHeader";
import authPng from "/user.png";
import { useAppSelector } from "../../redux/hook";
import { useLogoutMutation } from "../../redux/api/auth-api";

const Header = () => {
  const [activeItemId, setActiveItemId] = useState<number | null>(null);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [avatarMenu, setAvatarMenu] = useState(false);
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);

  const [logout] = useLogoutMutation();

  const activeDropdown = data.find((item) => item.id === activeItemId);
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-lg z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="logo"
              title="mern-logo"
              className="w-auto h-10 object-contain"
            />

            <h2
              onClick={() => navigate("/")}
              className="text-3xl font-bold tracking-tight text-indigo-700 cursor-pointer hover:text-indigo-900 transition duration-150"
            >
              MERN-Health
            </h2>
          </div>

          <div className="lg:flex hidden">
            <ul className="flex space-x-8">
              {data.map((item) => (
                <li key={item.id} onMouseEnter={() => setActiveItemId(item.id)}>
                  <Link
                    to={item.href}
                    className={`
                      text-lg font-medium text-gray-600 pb-1 transition duration-150 ease-in-out
                      ${
                        activeItemId === item.id
                          ? "text-indigo-600 border-b-2 border-indigo-600"
                          : "hover:text-indigo-600 hover:border-b-2 hover:border-indigo-600"
                      }
                    `}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
            {activeDropdown?.dropdown?.length ? (
              <div
                onMouseLeave={() => setActiveItemId(null)}
                className="
      absolute top-full left-0 mt-5 w-auto min-w-[250px] 
      bg-white rounded-xl shadow-2xl border border-gray-100 p-4 
      transition duration-300 ease-in-out 
    "
                style={{ left: "50%", transform: "translateX(-50%)" }}
              >
                <ul
                  className={`space-y-2 grid gap-x-4 
        ${activeDropdown.dropdown.length > 5 ? "grid-cols-2" : "grid-cols-1"}
      `}
                >
                  {activeDropdown.dropdown.map((subItem) => (
                    <li key={subItem.name} className="min-w-max">
                      <Link
                        to={subItem.link}
                        className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition duration-150"
                      >
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <div className="flex items-center gap-4 relative">
            <Button
              type="button"
              children="Book an Appointment"
              className="py-2 lg:block hidden"
            />
            {user ? (
              <div className="relative lg:inline-block hidden">
                {/* Avatar */}
                {Array.isArray(user?.image) &&
                user.image.length > 0 &&
                user.image[0]?.url ? (
                  <img
                    src={user.image[0].url}
                    alt="avatar"
                    className="w-12 h-12 object-cover rounded-full cursor-pointer"
                    onClick={() => setAvatarMenu(!avatarMenu)}
                  />
                ) : (
                  <img
                    src={authPng}
                    alt="avatar"
                    className="w-12 h-12 object-cover rounded-full cursor-pointer"
                    onClick={() => setAvatarMenu(!avatarMenu)}
                  />
                )}

                {avatarMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-white  rounded-lg shadow-md overflow-hidden z-50 flex flex-col">
                    <span className="px-4 py-2 border-b">
                      Welcome, {user.name}
                    </span>
                    <Link
                      onClick={() => setAvatarMenu(!avatarMenu)}
                      to={"/my-profile"}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                      My Profile
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        onClick={() => setAvatarMenu(!avatarMenu)}
                        to={"/admin"}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <Link
                      onClick={() => setAvatarMenu(!avatarMenu)}
                      to={"/my-appointment"}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                      My Appointment
                    </Link>
                    <button
                      onClick={async () => {
                        try {
                          await logout();
                          navigate(0);
                          setAvatarMenu(false);
                        } catch (error) {
                          console.error("Logout failed:", error);
                        }
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to={"/login"}>
                <Button type="button" className="py-2">
                  Sign In
                </Button>
              </Link>
            )}
            <button
              onClick={() => setOpenMobileMenu(!openMobileMenu)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors  cursor-pointer"
            >
              <svg
                className="w-8 h-8 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Mobile Menu */}
            {openMobileMenu && (
              <MobileHeader
                onClose={() => setOpenMobileMenu(false)}
                openMenu={openMobileMenu}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
