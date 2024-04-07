"use client";
import { ReactNode } from "react";
import useResponsive from "../hooks/use-responsive";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export default function ResponsiveMain({ children }: { children: ReactNode }) {
  const { showSidebar } = useResponsive();
  const { isCollapse } = useSelector((state: RootState) => state.ui);
  return (
    <div
      className={`flex flex-col min-h-screen transform transition-transform duration-500 ease-in-out
    ${
      showSidebar
        ? isCollapse
          ? "translate-x-24 collapse-w-calc"
          : "translate-x-56 w-calc"
        : "translate-x-0"
    }`}
    >
      {children}
    </div>
  );
}
