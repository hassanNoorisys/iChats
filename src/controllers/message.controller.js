import constants from "../config/constants.js";
import { getIo } from "../config/socket/socket.js";
import AppError from "../utils/appError.js";
import { sendGroupMessageService } from '../services/message.service.js'
import { getGroupService } from "../services/group.service.js";

// send message
const sendGroupMessage = async (socket, { groupId, message }) => {

    const userId = socket.user.id;

    if (!message || typeof message !== 'string')
        return new AppError(constants.BAD_REQUEST, 'Message content is invalid')

    const group = await getGroupService(userId, groupId)

    socket.to(group[0]._id.toString()).emit('event:new message', { text: message, });

    // save the message
    await sendGroupMessageService(userId, message, groupId)
};

export {

    sendGroupMessage
}