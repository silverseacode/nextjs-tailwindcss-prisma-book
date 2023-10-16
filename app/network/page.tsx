import Invitations from "@/components/network/invitations";
import Search from "@/components/network/search";
import { Request } from "@prisma/client";
import { cookies } from "next/headers";
import React from "react";

async function fetchInvitations(userId: string | undefined) {
  const res = await fetch(
    `http://localhost:3000/api/invitations?to=${userId}`,
    { cache: 'no-store' }
  );
  const data: { invitations: Request[] } = await res.json();
  return data.invitations;
}

export default async function Network() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("userId");
  const invitations = await fetchInvitations(cookie?.value);
  return (
    <div className="flex flex-col max-w-xl mx-auto bg-gray-50">
      <div className="bg-white p-4">
        <Search />
      </div>
      <div className="bg-white p-4 mt-3">
        <Invitations invitations={invitations} />
      </div>
    </div>
  );
}
