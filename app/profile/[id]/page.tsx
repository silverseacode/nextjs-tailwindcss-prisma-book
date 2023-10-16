import React from "react";
import Image from "next/image";
import { cookies } from "next/headers";
import AboutMe from "@/components/profile/aboutMe";
import YourPosts from "@/components/profile/yourPosts";
import { UserCustom } from "@/models/user";
import FollowButton from "@/components/profile/followButton";

async function fetchUser(userId: string | undefined) {
  const res = await fetch(`http://localhost:3000/api/user?userId=${userId}`, {next: {revalidate: 0}});
  const data: { user: UserCustom } = await res.json();
  return data.user;
}

export default async function Profile({ params }: { params: { id: string } }) {
  const user = await fetchUser(params.id);
  const cookieStore = cookies();
  const cookie = cookieStore.get("userId");
  const isYou = cookie?.value === params.id;
  const isFollowing = user.connections.some((item) => item.userIdThatFollows === params.id)
  return (
    <div className="flex flex-col max-w-xl mx-auto h-screen bg-gray-100">
      <div className="flex bg-gray-100 mt-[8rem]"></div>
      <div className="bg-white">
        <div className="flex flex-col justify-center items-center relative -top-14">
          <Image
            src={user.image}
            width={600}
            height={600}
            quality={95}
            className="object-cover h-[7rem] w-[7rem] rounded-full"
            alt="user profile picture"
          />
        </div>
        <div className="flex flex-col justify-center items-center relative -top-10">
          <span className="font-bold text-2xl">{user.fullName}</span>
          <span className="text-gray-500 text-sm">{user.email}</span>
        </div>
        {!isYou && (
          <div className="flex flex-col justify-center items-center relative -top-4">
            <FollowButton isFollowing={isFollowing} currentUserId={cookie?.value ?? ''} id={params.id} />
          </div>
        )}
      </div>
  
      <div className="bg-white py-2 px-3 mt-5">
        <AboutMe isYou={isYou} user={user} userId={params.id} />
      </div>
      <div className="bg-white py-2 px-3 mt-5">
        <div className="flex flex-row justify-between items-center mb-4 py-3">
        <h4 className="text-xl ">Connections</h4>
        <span className="text-xl">{user.connections.length}</span>
        </div>
        <div className="grid-cols-3 grid">
          {user.connections?.filter((item, index) => index < 3).map((item) => (
            <div key={item.id} className="flex flex-col justify-center items-center mb-5">
              <Image
                src={item.image}
                width={600}
                height={600}
                quality={95}
                className="object-cover h-[5rem] w-[5rem] rounded-full"
                alt="user profile picture"
              />
              <span className="mt-2">{item.fullName}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white py-2 px-3 mt-5">
        <YourPosts user={user} currentUserId={params.id} />
      </div>
    </div>
  );  
}
