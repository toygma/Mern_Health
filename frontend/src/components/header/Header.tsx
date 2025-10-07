import { Link } from "react-router";
import logo from "/logo.png";
import Button from "../../ui/Button";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";


interface DropdownItem {
  name: string;
  link: string;
}

interface Props {
  id: number;
  title: string;
  href: string;
  dropdown: DropdownItem[];
}

const data: Props[] = [
  {
    id: 1,
    title: "About Us",
    href: "/about",
    dropdown: [
      { name: "Departments", link: "/departments" },
      { name: "Pricing", link: "/pricing" },
      { name: "Careers", link: "/careers" },
      { name: "Testimonials", link: "/testimonials" },
      { name: "FAQ", link: "/faq" },
      { name: "Schedule Working Hours", link: "/schedule" },
      { name: "Make an Appointment", link: "/appointment" },
    ],
  },
  {
    id: 2,
    title: "Doctors",
    href: "/doctors",
    dropdown: [
      { name: "Our Doctors", link: "/doctors" },
      { name: "Doctor Details", link: "/doctor-details" },
    ],
  },
  {
    id: 3,
    title: "Services",
    href: "/services",
    dropdown: [
      { name: "All Services", link: "/services" },
      { name: "Service Details", link: "/service-details" },
    ],
  },
];

const Header = () => {
  const [activeItemId, setActiveItemId] = useState<number | null>(null);

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

            <h2 className="text-3xl font-bold tracking-tight text-indigo-700 cursor-pointer hover:text-indigo-900 transition duration-150">
              MERN-Health
            </h2>
          </div>

          <div>
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
            {activeDropdown && (
              <div
                onMouseLeave={() => setActiveItemId(null)}
                className={`
      absolute top-full left-0 mt-5 w-auto min-w-[250px] 
      bg-white rounded-xl shadow-2xl border border-gray-100 p-4 
      transition duration-300 ease-in-out 
    `}
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
            )}
          </div>
          <div className="flex items-center gap-4">
            <Button children="Book an Appointment" className="py-2" />
            <UserCircleIcon className="size-12 cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
