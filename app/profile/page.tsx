"use client";
import { RootState } from "@/lib/store";
import React from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return <div>Dear {user?.name}, Welcome Profile Page</div>;
};

export default ProfilePage;
