"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import useResponsive from "../hooks/use-responsive";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Logo from "../assets/logo.png";
import Image from "next/image";

const Header = () => {
  const { showSidebar } = useResponsive();
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
            <Image src={Logo} alt="logo" className="h-7 w-5" />
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
          className="flex md:hidden"
          onClick={handleBarsClick}
          aria-label="menu"
        >
          <div
            className={`h-8 w-8 flex items-center justify-center text-center cursor-pointer`}
          >
            <Bars3Icon className="h-7 w-7" />
          </div>
        </div>
        {/* mobile menu */}
        {isBarsOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 w-full h-full">
              {/* delete icon at right corner */}
              <div
                className="flex justify-end cursor-pointer mb-8"
                onClick={() => setIsBarsOpen(false)}
              >
                <XMarkIcon className="h-7 w-7" />
              </div>
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
