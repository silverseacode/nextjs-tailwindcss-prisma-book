import { Chats, Messages } from "@prisma/client";

export type ChatsCustom = Chats & {
  messages: Array<Messages>;
};