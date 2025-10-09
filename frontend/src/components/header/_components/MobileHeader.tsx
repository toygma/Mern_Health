import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { data } from "./dataHeader";
import { Link } from "react-router";

interface Props {
  onClose: () => void;
  openMenu: boolean;
}

const MobileHeader = ({ onClose, openMenu }: Props) => {
  const [expandedMenu, setExpandedMenu] = useState(null);

  const handleMenuClick = (id:any) => {
    setExpandedMenu(expandedMenu === id ? null : id);
  };

  const handleBackClick = () => {
    setExpandedMenu(null);
  };
  return (
     <>
      {/* Backdrop */}
      {openMenu && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 z-50 bg-white min-h-screen shadow-2xl transform transition-transform duration-300 ease-out ${
          openMenu ? "translate-x-0 w-[280px]" : "translate-x-full"
        }`}
      >
        {/* Header Section */}
        {expandedMenu ? (
          <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 p-4 text-white flex items-center gap-3 shadow-md">
            <button
              onClick={handleBackClick}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-base font-bold flex-1 truncate">
              {data.find((item) => item.id === expandedMenu)?.title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 p-4 text-white flex items-center justify-between shadow-md">
            <div>
              <h2 className="text-lg font-bold">Menu</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200  cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Menu Content */}
        <div className="overflow-y-auto flex-1 max-h-[calc(100vh-180px)]">
          {expandedMenu ? (
            // Dropdown Items
            <div className="p-3 space-y-1">
              {data
                .find((item) => item.id === expandedMenu)
                ?.dropdown?.map((subitem, index) => (
                  <Link
                    key={index}
                    to={subitem.link}
                    onClick={onClose}
                    className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent rounded-lg transition-all duration-200 font-medium text-sm border-l-4 border-transparent hover:border-blue-500 cursor-pointer"
                  >
                    {subitem.name}
                  </Link>
                ))}
            </div>
          ) : (
            // Main Menu Items
            <div className="p-3 space-y-2">
              {data.map((item) => (
                <div key={item.id}>
                  {item.dropdown ? (
                    // Item with dropdown
                    <button
                      onClick={() => handleMenuClick(item.id)}
                      className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent rounded-lg transition-all duration-200 font-semibold text-left group  cursor-pointer"
                    >
                      <span className="text-sm">{item.title}</span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </button>
                  ) : (
                    // Item without dropdown
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent rounded-lg transition-all duration-200 font-semibold text-sm group"
                    >
                      <span >
                        {item.title}
                      </span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200" />

        {/* Footer */}
        <div className="p-4 bg-gradient-to-b from-gray-50 to-white">
          <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 text-sm  cursor-pointer" >
            Book an Appointment
          </button>
          <p className="text-xs text-gray-500 text-center mt-3">
            Premium Healthcare Services
          </p>
        </div>
      </div>
    </>
  );
};

export default MobileHeader;
