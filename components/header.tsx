"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import useResponsive from "../hooks/use-responsive";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Logo from "../app/favicon.ico";
import Image from "next/image";
import DarkModeSwitch from "./dark-mode-switch";

const Header = () => {
  const { showSidebar } = useResponsive();
  const menuRef: any = useRef(null);
  const [isBarsOpen, setIsBarsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleBarsClick = () => {
    setIsBarsOpen(!isBarsOpen);
  };

  const handleProfileMenuClick = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  useEffect(() => {
    if (showSidebar) {
      setIsBarsOpen(false);
    }
  }, [showSidebar]);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (!menuRef.current.contains(event.target)) {
        if (!isBarsOpen) return;
        setIsBarsOpen(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isBarsOpen, setIsBarsOpen]);

  const menuItems = [{ name: "Profile" }, { name: "Logout" }];
  const barItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <div className={`sticky inset-x-0 top-0 z-10 background1`}>
      <div className="flex h-16 items-center justify-between mx-6 border-b-2 border-gray-700">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center md:hidden"
          >
            <Image src={Logo} alt="logo" className="h-8 w-8" />
          </Link>
        </div>

        <div className="hidden md:block relative">
          <div
            className="h-8 w-8 rounded-full bg-zinc-300 flex items-center justify-center text-center cursor-pointer"
            onClick={handleProfileMenuClick}
          >
            <span className="font-semibold text-sm">SD</span>
          </div>
          {isProfileMenuOpen && (
            <div className="absolute right-0 bg-white shadow-md rounded-md overflow-hidden mt-2">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href="#"
                  className={`block px-10 py-2 text-black hover:bg-gray-200`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          )}
        </div>
        {/* burger menu */}
        <div
          ref={menuRef}
          className="flex md:hidden relative"
          onClick={handleBarsClick}
          aria-label="menu"
        >
          <div
            className={`h-8 w-8 flex items-center justify-center text-center cursor-pointer`}
          >
            <Bars3Icon className="h-7 w-7" />
          </div>
          {isBarsOpen && (
            <div className="absolute w-44 right-0 mt-8 bg-white shadow-md rounded-md overflow-hidden bg-opacity-50 flex items-center justify-center">
              <div className="bg-white px-6 py-4 w-full h-full">
                {/* delete icon at right corner */}
                {/* <div
                  className="flex justify-end cursor-pointer mb-8"
                  onClick={() => setIsBarsOpen(false)}
                >
                  <XMarkIcon className="h-7 w-7" />
                </div> */}
                {/* menu items */}
                {barItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block p-2 text-black hover:bg-gray-200 hover:rounded-md"
                    onClick={() => setIsBarsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <DarkModeSwitch classNames="px-1 py-0" />
              </div>
            </div>
          )}
        </div>
        {/* mobile menu */}
      </div>
    </div>
  );
};

export default Header;
