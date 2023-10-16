"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { UserCustom } from "@/models/user";
import { useAppContext } from "@/context/appContext";

export default function Connections({ user }: { user: UserCustom }) {
  const { setChatSelected } = useAppContext();

  useEffect(() => {
    setChatSelected(user.connections[0])
  },[user,setChatSelected])

  return (
    <div className="flex flex-row items-center bg-gray-50 rounded-lg p-4 overflow-x-scroll w-full">
      {user.connections.map((item) => (
        <div
          className="flex flex-col items-center justify-center  w-[10rem] text-center"
          key={item.id}
          onClick={() => setChatSelected(item)}
        >
          <Image
            src={item.image}
            width={600}
            height={600}
            quality={95}
            className="object-cover h-[5rem] w-[5rem] rounded-full"
            alt="user profile picture"
          />
          <span className="mt-3">{item.fullName}</span>
        </div>
      ))}
    </div>
  );
}
