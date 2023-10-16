"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { BiArrowBack } from "react-icons/bi";

export default function GoBack() {
  const router = useRouter();
  return (
    <span onClick={() => router.back()} className="flex flex-row text-blue-600 cursor-pointer ">
      <BiArrowBack className="text-[1.5rem] mb-10 mr-5" />
      <span className="text-sm">Back to previous page</span>
    </span>
  );
}
