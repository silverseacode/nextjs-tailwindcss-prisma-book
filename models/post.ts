import { Post } from "@prisma/client";

export type PostCustom = Post & {
  likes: Array<{
    id: string;
    fullName: string;
    profilePic: string;
    userId: string;
    postId: string
  }>;
  comments:Array<{
    id: string;
    fullName: string;
    profilePic: string;
    userId: string;
    postId: string;
    createdAt: Date;
    description: string;
  }>;
};