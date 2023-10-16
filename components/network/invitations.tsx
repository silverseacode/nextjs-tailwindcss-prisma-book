"use client";
import { Request } from "@prisma/client";
import React, { useState } from "react";
import Image from "next/image";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";

const acceptInvitation = async ({ to, from }: {to: string, from: string}) => {
  const res = fetch(`http://localhost:3000/api/invitations`, {
    method: "POST",
    body: JSON.stringify({
      to,
      from,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await res).json();
};

const rejectInvitation = async (to: string, from: string) => {
  const res = fetch(
    `http://localhost:3000/api/invitations?to=${to}&from=${from}`,
    {
      method: "PUT",
    }
  );
  return (await res).json();
};

export default function Invitations({
  invitations,
}: {
  invitations: Request[];
}) {
  const [invitationsData, setInvitationsData] = useState(invitations)
  const handleAcceptInvitation = async (to: string, from: string) => {
    const result = invitationsData.filter((item) => item.to !== to && item.from !== from)
    setInvitationsData(result)
    await acceptInvitation({to, from})
  }

  const handleRejectInvitation = async (to: string, from: string) => {
    const result = invitationsData.filter((item) => item.to !== to && item.from !== from)
    setInvitationsData(result)
    await rejectInvitation(to, from)
  }

  return (
    <div>
      <h3 className="text-xl mb-5">Invitations</h3>
      {invitationsData?.map((item) => (
        <div className="flex flex-row justify-between border-b pb-5" key={item.id}>
          <div className="flex flex-row items-center">
            <Image
              src={item.image}
              width={75}
              height={75}
              className="object-cover rounded-full shadow-md h-[4rem] w-[4rem]"
              alt="user profile picture"
            />
            <span className="ml-3">{item.fullName}</span>
          </div>
          <div className="flex flex-row items-center">
            <AiOutlineCheckCircle onClick={() => handleAcceptInvitation(item.to, item.from)} className="text-4xl mr-4 text-purple-500 cursor-pointer" />
            <AiOutlineCloseCircle onClick={() => handleRejectInvitation(item.to, item.from)} className="text-4xl text-gray-500 cursor-pointer" />
          </div>
        </div>
      ))}
      {invitationsData.length === 0 &&
        <div className="flex flex-col justify-center items-center text-gray-500">
          <BsPeopleFill className="text-4xl mb-3" />
          <p>No invitations</p>
        </div>
      }
    </div>
  );
}
