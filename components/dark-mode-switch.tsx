import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { RootState } from "@/lib/store";
import { toggleDarkMode } from "@/lib/slices/ui";

function DarkModeSwitch({ classNames }: { classNames?: string }) {
  const darkMode = useSelector((state: RootState) => state.ui.darkMode);
  const dispatch = useDispatch();

  return (
    <button
      className={`flex items-center justify-center w-full p-2 rounded-lg cursor-pointer ${classNames}`}
      onClick={() => {
        dispatch(toggleDarkMode());
      }}
    >
      {darkMode ? (
        <MoonIcon className="h-6 w-6 text-gray-500" />
      ) : (
        <SunIcon className="h-6 w-6 text-yellow-500" />
      )}
    </button>
  );
}

export default DarkModeSwitch;
