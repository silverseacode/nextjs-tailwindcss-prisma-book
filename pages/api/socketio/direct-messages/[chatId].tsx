import { NextApiRequest } from "next";


import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";



export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo,
) {
  try{
    const { data } = req.body;
    const {chatId} = req.query
    const channelKey = `chat:${chatId}:messages`;
    res?.socket?.server?.io?.emit(channelKey, data);

    return res.status(200).json({ok: 1});
  } catch (error) {
    return res.status(500).json({ message: "Internal Error" }); 
  }
}