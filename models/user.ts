import { User } from "@prisma/client";

export type UserCustom = User & {
  connections: Array<{
    id: string;
    fullName: string;
    image: string;
    userId: string;
    email: string;
    userIdThatFollows: string;
  }>;
};