import io from "socket.io-client";

const server = "https://learnovate-meeting-server.onrender.com";
export const socket = io(server);
