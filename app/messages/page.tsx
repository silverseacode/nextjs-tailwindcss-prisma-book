import Chat from "@/components/messages/chat";
import Connections from "@/components/messages/connections";
import { UserCustom } from "@/models/user";
import { cookies } from "next/headers";
import React from "react";

async function fetchUser(userId: string | undefined) {
  const res = await fetch(`http://localhost:3000/api/user?userId=${userId}`, {
    cache: "no-store",
  });
  const data: { user: UserCustom } = await res.json();
  return data.user;
}

export default async function Messages() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("userId");
  const user = await fetchUser(cookie?.value);

  return (
    <div className="flex flex-col max-w-xl mx-auto h-screen bg-gray-50">
      <div className="bg-white p-4">
        <h3 className="text-xl mb-5">Connections</h3>
        <Connections user={user}/>
      </div>
      <div className="bg-white p-4 mt-3">
        <Chat from={cookie?.value ?? ''}/>
      </div>
    </div>
  );
}
