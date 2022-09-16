import { io } from "socket.io-client";
import { urlBase } from "../constants/apiVar";

const socket = io(urlBase, {
    autoConnect: false,
    withCredentials: true,
})

export default socket