"use client";
import { Request } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const follow = async ({ to, from, status, fullName, image }: Request) => {
  const res = fetch(`http://localhost:3000/api/follow`, {
    method: "POST",
    body: JSON.stringify({
      to,
      from,
      status,
      fullName,
      image
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await res).json();
};

const unFollow = async ({ to, from }: Request) => {
  const res = fetch(`http://localhost:3000/api/follow?from=${from}&to=${to}`, {
    method: "DELETE",
  });
  return (await res).json();
};

export default function FollowButton({
  isFollowing,
  currentUserId,
  id,
}: {
  isFollowing: boolean;
  currentUserId: string;
  id: string;
}) {
  const {data: session} = useSession()
  const [isFollowingState, setIsFollowing] = useState(isFollowing);

  const handleFollow = async () => {
    const data = {
      id: "",
      to: id,
      from: currentUserId,
      status: "pending",
      fullName: session?.user?.name ?? '',
      image: session?.user?.image ?? ''
    };
    if (isFollowing) {
      setIsFollowing(false);
      await unFollow(data);
    } else {
      setIsFollowing(true);
      await follow(data);
    }
  };

  return (
    <button
      onClick={handleFollow}
      className="text-white rounded-full cursor-pointer shadow hover:opacity-80 text-[1rem] bg-purple-600 h-[2rem] w-auto px-2"
    >
      {isFollowingState ? "Stop Following" : "Follow"}
    </button>
  );
}
