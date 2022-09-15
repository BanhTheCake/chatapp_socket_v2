import { io } from "socket.io-client";

const socket = io('https://chatappsocketbackend.onrender.com', {
    autoConnect: false,
    withCredentials: true,
})

export default socket