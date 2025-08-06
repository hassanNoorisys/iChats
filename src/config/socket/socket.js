import { Server } from "socket.io";
import AppError from "../../utils/appError.js";
import constants from "../constants.js";
import authSocket from "../../middleware/authSocket.js";
import { socketAsyncHandler } from '../../utils/asyncHandler.js'
import { sendMessage } from '../../controllers/message.controller.js'
import { joinUsertoGroupRoomsService } from "./room.service.js";

let io;
const initSocket = (server) => {

    io = new Server(server)

    // authorize socket middleware
    io.use(authSocket)

    io.on('connection', async(socket) => {

        console.log('connected --> ', socket.id, socket.user)

        // join logged in users to groups 
        await joinUsertoGroupRoomsService(socket)

        

        socket.on('disconnect', () => {

            console.log(`${socket.id} disconnected`)
        })

        // send message
        socket.on('event:send message', socketAsyncHandler(sendMessage)(socket))
    })



    return io
}

const getIo = () => {

    if (!io) throw new AppError(constants.BAD_REQUEST, 'Socket.io not initialized');

    return io
}

export { initSocket, getIo }