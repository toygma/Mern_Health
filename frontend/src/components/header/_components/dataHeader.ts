interface DropdownItem {
  name: string;
  link: string;
}

interface Props {
  id: number;
  title: string;
  href: string;
  dropdown?: DropdownItem[] | undefined;
}

export const data: Props[] = [
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
