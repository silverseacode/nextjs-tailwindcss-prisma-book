"use client";
import { useAppContext } from "@/context/appContext";
import React, { useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { ChatsCustom } from "@/models/chats";
import { useSocket } from "@/context/socketProdiver";

async function fetchChats(to: string | undefined) {
  const res = await fetch(`http://localhost:3000/api/chats?to=${to}`, {
    cache: "no-store",
  });
  const data: { chat: ChatsCustom[] } = await res.json();
  return data.chat[0];
}

type ParamsSendMessage = {
  to: string;
  from: string;
  fullName: string;
  image: string;
  message: string;
  chatId: string;
  roomId: string
};

const addMessage = async ({
  to,
  from,
  fullName,
  image,
  message,
  chatId,
  roomId
}: ParamsSendMessage) => {
  const res = fetch(`http://localhost:3000/api/message`, {
    method: "POST",
    body: JSON.stringify({ to, from, fullName, image, message, chatId, roomId }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await res).json();
};

const postSocket = async (channelKey: string | undefined, data: ParamsSendMessage) => {
  const res = fetch(`http://localhost:3000/api/socketio/direct-messages/${channelKey}`, {
    method: "POST",
    body: JSON.stringify({ data }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await res).json();
};

export default function Chat({ from }: { from: string }) {
  const { socket } = useSocket();
  const { chatSelected } = useAppContext();
  const [chat, setChat] = useState<ChatsCustom>({
    id: "",
    to: chatSelected?.id ?? "",
    from,
    messages: [],
  });
  useEffect(() => {
    if (socket) {
      if (chatSelected?.userId !== undefined) {
        const roomId = [chatSelected?.userId, from].sort().join("-");
        const channelKey = `chat:${roomId}:messages`;
  
        socket.on(channelKey, (msg: ParamsSendMessage) => {
          setChat((prevChat) => {
            const min = 1;
            const max = 1000;
            const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
            const data = {
              id: String(randomNum),
              createdAt: new Date(),
              to: msg.to,
              from: msg.from,
              fullName: msg.fullName,
              image: msg.image,
              message: msg.message,
              chatId: msg.chatId,
              roomId: `${chatSelected?.userId}-${from}`,
            };
  
            return {
              ...prevChat,
              messages: prevChat?.messages ? [...prevChat?.messages, data] : [data],
            };
          });
        });
      }
    }
  }, [socket, chatSelected, from]);

  
  const { data: session } = useSession();

  const [messageInput, setMessageInput] = useState("");

  const handleAddMessage = async () => {
    const roomId = [chatSelected?.userId, from].sort().join("-")
    const data = {
      id: "",
      createdAt: new Date(),
      to: chatSelected?.userId ?? "",
      from,
      fullName: session?.user?.name ?? "",
      image: session?.user?.image ?? "",
      message: messageInput,
      chatId: chat?.id ?? '',
      roomId: roomId
    };
    await addMessage(data);
    await postSocket(roomId, data);
    setMessageInput("")
  };

  useEffect(() => {
    async function getChats() {
      const chats = await fetchChats(chatSelected?.userId);
      setChat(chats);
    }
    if (chatSelected?.userId !== undefined) {
      getChats();
    }
  }, [chatSelected]);
  return (
    <div>
      <h3 className="text-md mb-5">
        Conversation with {chatSelected?.fullName}
      </h3>
      <div className="bg-gray-50 h-[20rem] p-4 rounded-lg overflow-y-scroll">
        {chat?.messages?.map((item) => {
          const date = new Date(item.createdAt);
          const formattedDate = date.toLocaleDateString("en-US");
          return (
            <div className="border-b mt-5" key={item.id}>
              <div className="flex flex-row">
                <Image
                  src={item.image}
                  width={75}
                  height={75}
                  quality={95}
                  className="object-cover h-[3rem] w-[3rem] rounded-[5rem] shadow-lg mr-5 ml-3 hidden sm:flex"
                  alt="user profile picture"
                />
                <div className="flex flex-col">
                  <span>{item.fullName}</span>
                  <span className="text-sm text-gray-400">{formattedDate}</span>
                </div>
              </div>
              <div className="flex flex-row p-4">{item.message}</div>
            </div>
          );
        })}
        {chat?.messages === undefined && (
          <div className="flex flex-col justify-center items-center h-full">
            <MdMessage className="text-[3rem] mb-5" />
            <span>No Chats</span>
          </div>
        )}
      </div>
      <div className="flex flex-row bottom-0 w-full bg-white py-5 shadow items-center">
        <Image
          src={session?.user?.image ?? ""}
          width={75}
          height={75}
          quality={95}
          className="object-cover h-[3rem] w-[3rem] rounded-[5rem] shadow-lg mr-5 ml-3 hidden sm:flex"
          alt="user profile picture"
        />
        <input
          type="text"
          className="border border-gray-400 rounded-full w-full mr-5 pl-3 ml-3 sm:ml-0 h-[2.9rem]"
          value={messageInput}
          placeholder="Enter your comment..."
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <FaPaperPlane
          onClick={handleAddMessage}
          className="text-[1.5rem] text-purple-600 mr-5 cursor-pointer"
        />
      </div>
    </div>
  );
}
