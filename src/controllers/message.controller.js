import constants from "../config/constants.js";
import { getIo } from "../config/socket/socket.js";
import AppError from "../utils/appError.js";
import { sendMessageService } from '../services/message.service.js'
import { get } from "mongoose";
import { getGroupService } from "../services/group.service.js";

// send message
const sendMessage = async (socket, message) => {

    const userId = socket.user.id;

    if (!message || typeof message !== 'string')
        return new AppError(constants.BAD_REQUEST, 'Message content is invalid')

    const group = await getGroupService(userId)

    socket.to(group._id.toString()).emit('event:new message', { text: message, });

    // save the message
    await sendMessageService(userId, message)
};

export {

    sendMessage
}