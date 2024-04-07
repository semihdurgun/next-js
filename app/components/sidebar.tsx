"use client";
import {
  HomeIcon,
  InformationCircleIcon,
  BuildingOfficeIcon,
  InboxStackIcon,
} from "@heroicons/react/24/outline";
import useResponsive from "../hooks/use-responsive";
import Logo from "../assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const menuItems = [
  { name: "Home", Icon: HomeIcon, href: "/" },
  { name: "About", Icon: InformationCircleIcon, href: "/about" },
  { name: "Services", Icon: BuildingOfficeIcon, href: "/services" },
  { name: "Contact Us", Icon: InboxStackIcon, href: "/contact" },
];

const SideBar = () => {
  const { showSidebar } = useResponsive();
  const router = usePathname();

  return (
    <div
      className={`flex flex-col items-start justify-start bg-white rounded-r-2xl h-screen w-56 fixed p-4 transform transition-transform duration-500 ease-in-out ${
        showSidebar ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* flex-start */}
      <div className="flex items-center justify-items-start h-16 mb-4 p-4">
        <Image src={Logo} alt="logo" className="h-11 w-8" />
      </div>
      {menuItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`flex items-center rounded-lg px-4 py-1 w-full ${
            router === item.href ? "bg-gray-900 text-white" : ""
          }`}
        >
          <item.Icon className="h-11 w-5 mr-4" />
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default SideBar;
