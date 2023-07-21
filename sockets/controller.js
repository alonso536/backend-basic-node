import { Socket } from "socket.io";
import { comproveJWT } from "../helpers/generate-jwt.js";
import ChatMessages from "../models/chat-messages.js";

const chatMessages = new ChatMessages();

/**
 * 
 * @param {Socket} socket 
 */
export const socketController = async (socket, io) => {
    const token = socket.handshake.headers["x-token"];
    const user = await comproveJWT(token);

    if(!user) {
        return socket.disconnect();
    }

    chatMessages.connectUser(user);

    io.emit("usuarios-activos", chatMessages.usersArr);
    socket.emit("recibir-mensaje", chatMessages.lastTen);

    socket.join(user.id);

    socket.on("disconnect", () => {
        chatMessages.disconnectUser(user.id);
        io.emit("usuarios-activos", chatMessages.usersArr);
    });

    socket.on("enviar-mensaje", ({ uid, mensaje }) => {
        if(uid) {
            socket.to(uid).emit("mensaje-privado", {de: user.name, mensaje});
        } else {
            chatMessages.sendMessage(user.id, user.name, mensaje);
            io.emit("recibir-mensaje", chatMessages.lastTen);
        }
    });
}