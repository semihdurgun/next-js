"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import useResponsive from "../hooks/use-responsive";
import { Bars3Icon, ArrowRightIcon } from "@heroicons/react/24/solid";
import Logo from "../public/assets/favicon.ico";
import Image from "next/image";
import DarkModeSwitch from "./dark-mode-switch";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useRouter } from "next/navigation";
import { setUser } from "@/lib/slices/auth";

const Header = () => {
  const { showSidebar } = useResponsive();
  const barsMenuRef: any = useRef(null);
  const profileMenuRef: any = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isBarsOpen, setIsBarsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    if (showSidebar) {
      setIsBarsOpen(false);
    }
  }, [showSidebar]);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (!barsMenuRef?.current?.contains(event.target)) {
        setIsBarsOpen(false);
      }
      if (!profileMenuRef?.current?.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isBarsOpen, setIsBarsOpen, isProfileMenuOpen, setIsProfileMenuOpen]);

  const menuItems = [
    {
      name: "Profile",
      click: () => {
        router.push("/profile");
      },
    },
    {
      name: "Logout",
      click: () => {
        dispatch(setUser(null));
        router.push("/");
      },
    },
  ];
  const barItems = [
    { name: "Profile", href: "/profile" },
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact Us", href: "/contact" },
  ];

  const handleLogin = () => {
    setIsProfileMenuOpen(false);
    dispatch(setUser({ name: "John Doe", email: "" }));
  };

  const handleBarsClick = () => {
    setIsBarsOpen(!isBarsOpen);
  };

  const handleProfileMenuClick = () => {
    if (!user) return;
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <div className={`sticky inset-x-0 top-0 z-10`}>
      <div className="flex h-16 items-center justify-between mx-6 bgColor border-b-2 border-gray-700">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center md:hidden"
          >
            <Image src={Logo} alt="logo" className="h-8 w-8" />{" "}
            <span className="ml-2 sm:text-lg md:text-sm">Vercel App</span>
          </Link>
        </div>
        <div className="hidden md:block relative">
          {user ? (
            <>
              <div
                aria-label="menu"
                ref={profileMenuRef}
                className="h-8 w-8 rounded-full bg-zinc-300 flex items-center justify-center text-center cursor-pointer"
                onClick={handleProfileMenuClick}
              >
                <span className="font-semibold text-sm">
                  {user?.name.split(" ")[0][0]}
                  {user?.name.split(" ")[1][0]}
                </span>
              </div>
              {isProfileMenuOpen && (
                <div className="absolute right-0 bg-white dark:bg-black  shadow-md rounded-md overflow-hidden mt-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.name}
                      className={`block px-10 py-2 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 w-full text-left`}
                      onClick={item.click}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <button
              className="btn-login flex items-center gap-2 border-2 p-2 rounded-lg"
              onClick={() => handleLogin()}
            >
              Login <ArrowRightIcon className="h-5 w-5" />
            </button>
          )}
        </div>
        {/* mobile menu */}
        {user ? (
          <div
            ref={barsMenuRef}
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
              <div className="absolute w-44 right-0 mt-8 bg-white dark:bg-black shadow-md rounded-md overflow-hidden bg-opacity-50 flex items-center justify-center">
                <div className="bg-white dark:bg-black w-full h-full">
                  <div className="flex items-center">
                    <div className="h-8 w-8 m-4 rounded-full bg-zinc-300 flex items-center justify-center text-center cursor-pointer">
                      <span className="font-semibold text-sm">
                        {user?.name.split(" ")[0][0]}
                        {user?.name.split(" ")[1][0]}
                      </span>
                    </div>
                    <div className="flex items-center dark:text-white">
                      {user?.name}
                    </div>
                  </div>
                  {/* menu items */}
                  {barItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-7 py-3 text-black dark:text-white dark:bg-black hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-800 w-full"
                      onClick={() => setIsBarsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="flex items-center justify-center">
                    <DarkModeSwitch classNames="px-2 py-3 w-16 mx-0" />
                    <button
                      className={`block px-2 py-2 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800`}
                      onClick={() => {
                        dispatch(setUser(null));
                        router.push("/");
                      }}
                    >
                      <ArrowRightIcon
                        title="Logout"
                        className="h-5 w-5 text-black dark:text-white cursor-pointer hover:text-gray-800 dark:hover:text-gray-200"
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            className="btn-login flex md:hidden items-center gap-2 border-2 p-2 rounded-lg"
            onClick={() => handleLogin()}
          >
            <ArrowRightIcon className="h-5 w-5" />
          </button>
        )}
        {/* mobile menu */}
      </div>
    </div>
  );
};

export default Header;
