import { Server } from "socket.io";
import AppError from "../../utils/appError.js";
import constants from "../constants.js";
import authSocket from "../../middleware/authSocket.js";
import { socketAsyncHandler } from '../../utils/asyncHandler.js'
import { sendFile, sendGroupMessage, sendMessage } from '../../controllers/message.controller.js'
import { joinUsertoGroupRoomsService } from "./room.service.js";

let io;
const initSocket = (server) => {

    io = new Server(server, {
        cors: {
            origin: '*',
            credentials: true
        }
    })

    // authorize socket middleware
    io.use(authSocket)

    io.on('connection', async (socket) => {

        console.log('connected --> ', socket.id, socket.user)

        // join logged in users to groups 
        await joinUsertoGroupRoomsService(socket)

        // join users to their user id for 1:1 conversation
        socket.join(socket.user.id)

        // send group message
        socket.on('event:send group message', socketAsyncHandler(sendGroupMessage)(socket))

        // send private 1:1 message
        socket.on('event:send message', socketAsyncHandler(sendMessage)(socket))

        // send file 
        socket.on('event:send file', socketAsyncHandler(sendFile)(socket))

        socket.on('disconnect', () => {

            console.log(`${socket.id} disconnected`)
        })
    })

    return io
}

const getIo = () => {

    if (!io) throw new AppError(constants.BAD_REQUEST, 'Socket.io not initialized');

    return io
}

export { initSocket, getIo }