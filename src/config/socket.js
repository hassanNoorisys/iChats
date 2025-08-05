import { Server } from "socket.io";
import AppError from "../utils/appError.js";
import constants from "./constants.js";
import authSocket from "../middleware/authSocket.js";

let io;

const initSocket = (server) => {

    const io = new Server(server)

    io.on('connection', (socket) => {

        socket.on('disconnect', () => {

            console.log(`${socket.id} disconnected`)
        })
    })

    io.use(authSocket)

    return io
}

const getIo = () => {

    if (!io) throw new AppError(constants.BAD_REQUEST, 'Socket.io not initialized');

    return io
}

export { initSocket, getIo }