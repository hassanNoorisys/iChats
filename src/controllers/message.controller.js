import constants from "../config/constants.js";
import { getIo } from "../config/socket/socket.js";
import AppError from "../utils/appError.js";
import { sendGroupMessageService, sendMessageService } from '../services/message.service.js'
import { getGroupService } from "../services/group.service.js";
import { fileURLToPath } from 'url'
import path from "path";
import fs from 'fs/promises'

// send group message
const sendGroupMessage = async (socket, { groupId, message }) => {

    const userId = socket.user.id;

    if (!message || typeof message !== 'string')
        return new AppError(constants.BAD_REQUEST, 'Message content is invalid')

    const group = await getGroupService(userId, groupId)

    // save the message
    await sendGroupMessageService(userId, message, groupId)

    socket.to(group[0]._id.toString()).emit('event:new message', { text: message, });
};

// send 1:1 message
const sendMessage = async (socket, { recieverId, message }) => {

    const senderId = socket.user.id;
    if (!message || typeof message !== 'string')
        return new AppError(constants.BAD_REQUEST, 'Message content is invalid')

    await sendMessageService(senderId, recieverId, message)

    const io = getIo()

    io.to(recieverId).emit("event:new message", message);
}

// send file 
const sendFile = async (socket, { data, originalName, fileType }) => {

    const buffer = Buffer.from(data, 'hex')

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const fileName = Date.now() + originalName
    const filePath = path.join(__dirname, '../public/images', fileName)

    await fs.writeFile(filePath, buffer)   

    socket.emit('event: send file', {text: 'file uploaded'})
}

export {

    sendGroupMessage,
    sendMessage,
    sendFile
}