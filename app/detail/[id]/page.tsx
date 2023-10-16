import GoBack from "@/components/globals/goBack";
import CardPost from "@/components/home/cardPost";
import { PostCustom } from "@/models/post";
import { User } from "@prisma/client";
import { cookies } from "next/headers";
import React from "react";

async function fetchPost(id: string) {
  const res = await fetch(`http://localhost:3000/api/post?id=${id}`, {
    next: { revalidate: 0 },
  });
  const data: { post: PostCustom } = await res.json();
  return data.post;
}

async function fetchUser(userId: string | undefined) {
  const res = await fetch(`http://localhost:3000/api/user?userId=${userId}`);
  const data: { user: User } = await res.json();
  return data.user;
}

export default async function Detail({ params }: { params: { id: string } }) {
  const post = await fetchPost(params.id);
  const cookieStore = cookies();
  const cookie = cookieStore.get("userId");
  const currentUserId = cookie?.value;
  const user = await fetchUser(cookie?.value);
  return (
    <div className="max-w-xl mx-auto h-auto bg-white px-4 pt-4">
      <GoBack/>
      <CardPost
        profilePicUser={user.image}
        currentUserId={currentUserId ?? ''}
        fullNameMySelf={user.fullName}
        {...post}
        isDetails={true}
      />
    </div>
  );
}
