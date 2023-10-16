"use client";

import { 
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import { Socket, io } from "socket.io-client";

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ 
  children 
}: { 
  children: React.ReactNode 
}) => {
  const [socket, setSocket] = useState<Socket>();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    fetch('/api/socketio/io').finally(() => {
    const socketInstance = io();

    socketInstance.on("connect", () => {
      console.log("Socket is connected")
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    setSocket(socketInstance);


})
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}