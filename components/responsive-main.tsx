"use client";
import { ReactNode } from "react";
import useResponsive from "../hooks/use-responsive";

export default function ResponsiveMain({ children }: { children: ReactNode }) {
  const { showSidebar } = useResponsive();

  return (
    <div
      className={`flex flex-col min-h-screen transform transition-transform duration-500 ease-in-out
    ${showSidebar ? "translate-x-56 w-calc" : "translate-x-0"}`}
    >
      {children}
    </div>
  );
}
