import { Server } from "socket.io";
import AppError from "../utils/appError.js";
import constants from "./constants.js";
import authSocket from "../middleware/authSocket.js";
import { socketAsyncHandler } from '../utils/asyncHandler.js'
import { sendMessage } from '../controllers/message.controller.js'

let io;
const initSocket = (server) => {

    io = new Server(server)

    io.on('connection', (socket) => {

        console.log('connected', socket.id)

        socket.on('disconnect', () => {

            console.log(`${socket.id} disconnected`)
        })

        socket.on('event:send message', socketAsyncHandler(sendMessage)(socket))
    })

    // authorize socket middleware
    io.use(authSocket)

    return io
}

const getIo = () => {

    if (!io) throw new AppError(constants.BAD_REQUEST, 'Socket.io not initialized');

    return io
}

export { initSocket, getIo }