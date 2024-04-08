import React, { use, useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";

function DarkModeSwitch({ classNames }: { classNames?: string }) {
  const { theme, setTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const isSystemDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  useEffect(() => {
    if (isSystemDark && theme === "system") {
      setTheme("dark");
    }
  }, [isSystemDark, theme, setTheme]);

  return (
    <button
      className={`flex items-center justify-center p-1 rounded-lg cursor-pointer ${classNames}`}
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        theme === "dark" ? (
          <SunIcon className="h-6 w-6 text-yellow-500" />
        ) : (
          <MoonIcon className="h-6 w-6 text-gray-500" />
        )
      ) : theme === "dark" ? (
        <MoonIcon className="h-6 w-6 text-gray-500" />
      ) : (
        <SunIcon className="h-6 w-6 text-yellow-500" />
      )}
    </button>
  );
}

export default DarkModeSwitch;
