import { User } from "@prisma/client";
import React from "react";
import Posts from "../home/posts";

export default function YourPosts({
  user,
  currentUserId,
}: {
  user: User;
  currentUserId: string;
}) {
  return (
    <div>
      <h4 className="text-xl mb-4 py-3">Your Posts</h4>
      <Posts currentUserId={currentUserId} isProfile />
    </div>
  );
}
