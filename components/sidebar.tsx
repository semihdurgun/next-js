"use client";
import {
  HomeIcon,
  InformationCircleIcon,
  BuildingOfficeIcon,
  InboxStackIcon,
  XMarkIcon,
  Bars3BottomLeftIcon,
} from "@heroicons/react/24/outline";
import useResponsive from "../hooks/use-responsive";
import Logo from "../public/assets/favicon.ico";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import DarkModeSwitch from "./dark-mode-switch";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setToggleCollapse } from "@/lib/slices/ui";

const menuItems = [
  { name: "Home", Icon: HomeIcon, href: "/" },
  { name: "About", Icon: InformationCircleIcon, href: "/about" },
  { name: "Services", Icon: BuildingOfficeIcon, href: "/services" },
  { name: "Contact Us", Icon: InboxStackIcon, href: "/contact" },
];

const SideBar = () => {
  const { showSidebar } = useResponsive();
  const router = usePathname();
  const dispatch = useDispatch();
  const { isCollapse } = useSelector((state: RootState) => state.ui);

  return (
    <div
      className={`flex flex-col items-start justify-start bg-white dark:bg-black dark:text-white rounded-r-2xl h-screen z-20 fixed p-4 transform transition-width duration-500 ease-in-out ${
        showSidebar ? "translate-x-0" : "-translate-x-full"
      } ${isCollapse ? "w-16" : "w-56"}`}
    >
      <button
        className="fixed h-6 w-6 ml-auto cursor-pointer right-4"
        onClick={() => dispatch(setToggleCollapse())}
      >
        {isCollapse ? <Bars3BottomRightIcon /> : <Bars3BottomLeftIcon />}
      </button>
      <div className="flex items-center justify-between h-16 mb-4 p-4 w-full ">
        <Image src={Logo} alt="logo" className="h-10 w-10" />
      </div>
      {menuItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`flex items-center rounded-lg  w-full cursor-pointer transition-all ease-in-out ${
            router === item.href ? "bg-gray-900 text-white" : ""
          } ${isCollapse ? "px-0 py-1 flex justify-center" : "px-4 py-1"}`}
        >
          <item.Icon className={`h-11 w-5 ${isCollapse ? "" : "mr-4"}`} />
          <span
            className={`transition-all duration-350 ease-in-out ${
              isCollapse ? "opacity-0 max-w-0" : "opacity-100 max-w-full"
            }`}
          >
            {item.name}
          </span>
        </Link>
      ))}
      {/* Dark mode switch */}
      <DarkModeSwitch classNames="mt-auto mx-auto w-8" />
    </div>
  );
};

export default SideBar;
