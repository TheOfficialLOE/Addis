import { io } from "socket.io-client";
import { createContext } from "react";

export const socket = io("http://localhost:3001", {
  withCredentials: true
});

export const SocketContext = createContext(socket);
