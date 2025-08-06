import constants from "../config/constants.js";
import { getIo } from "../config/socket/socket.js";
import AppError from "../utils/appError.js";
import { sendGroupMessageService, sendMessageService } from '../services/message.service.js'
import { getGroupService } from "../services/group.service.js";

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

    console.log('send message --> ', senderId, recieverId, message)
   io.to(recieverId).emit("event:new message", message);
}

export {

    sendGroupMessage,
    sendMessage
}