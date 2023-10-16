import { User } from "@prisma/client";
import { cookies } from "next/headers";
import React from "react";
import Image from "next/image";
import CreatePost from "@/components/home/createPost";
import Posts from "@/components/home/posts";
import Link from "next/link";

async function fetchUser(userId: string | undefined) {
  const res = await fetch(`http://localhost:3000/api/user?userId=${userId}`);
  const data: { user: User } = await res.json();
  return data.user;
}

async function fetchRecommendedUsers(userId: string | undefined) {
  const res = await fetch(`http://localhost:3000/api/users?userId=${userId}`, {
    next: { revalidate: 0 },
  });
  const data: { users: User[] } = await res.json();
  return data.users;
}

export default async function Home() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("userId");
  const user = await fetchUser(cookie?.value);
  const users = await fetchRecommendedUsers(cookie?.value);
  return (
    <div className="grid gap-4 sm:grid-cols-4 max-w-6xl mx-auto h-screen">
      <aside className="flex flex-row h-[7rem] sm:col-start-1 sm:col-end-2 bg-white p-4 sm:flex-col sm:justify-center items-center sm:h-[20rem] rounded-lg shadow-lg">
        <div className="flex w-[3.8rem] min-[321px]:w-[5rem]">
          <Image
            src={user?.image}
            width={75}
            height={75}
            className="object-cover rounded-full shadow-md h-[4rem] w-[4rem]"
            alt="user profile picture"
          />
        </div>
        <div className="flex flex-col sm:text-center max-[320px]:w-[10.5rem] w-full ml-5 sm:ml-0">
          <span className="mt-2 mb-2 font-bold">{user?.fullName}</span>
          <span className="whitespace-normal overflow-hidden break-words text-sm">
            {user?.email}
          </span>
        </div>
      </aside>

      <div className="sm:col-start-2 sm:col-end-4 space-y-4">
        <div className="sm:col-start-2 sm:col-end-4 bg-white rounded-lg shadow-lg p-4">
          <CreatePost />
        </div>

        <div className="sm:col-start-2 sm:col-end-4 bg-white p-4">
          <Posts isProfile={false} currentUserId={cookie?.value} />
        </div>
      </div>

      <aside className=" bg-white p-4 hidden sm:col-start-4  sm:grid h-[20rem] ">
        <h2 className="text-xl">Recommended to Follow</h2>
        <div className="gap-2 grid-cols-2 sm:grid">
          {users?.map((item) => (
            <Link key={item.id} href={`/profile/${item.id}`}>
              <div className="text-center rounded-[1rem] flex flex-col items-center">
                <Image
                  src={item.image}
                  width={75}
                  height={75}
                  className="object-cover rounded-full shadow-md h-[4rem] w-[4rem]"
                  alt="user profile picture"
                />
                <span className="mt-5">{item.fullName}</span>
              </div>
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
}
