import { Server as ServerIO } from "socket.io";
import { NextApiResponseServerIo } from "./direct-messages/[chatId]";
import { NextApiRequest } from "next";
const ioHandler = (req:NextApiRequest, res:NextApiResponseServerIo) => {
  if (!res.socket.server.io) {

    const path = "/socket.io";
    const httpServer= res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: path,
      // @ts-ignore
      addTrailingSlash: false,
    });

    io.on("connection", (socket) => {
      console.log("new connection on socket.")
    });

    res.socket.server.io = io;
  } else {
    console.log("socket.io already running");
  }
  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ioHandler;