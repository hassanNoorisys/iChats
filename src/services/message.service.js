import chatModel from '../models/chats.model.js'
import groupModel from '../models/group.model.js'

// send message service
const sendGroupMessageService = async (userId, message, groupId) => {

    const newMessage = await chatModel.create({ senderId: userId, message: message, groupId })
}

// send 1:1 message service
const sendMessageService = async (senderId, recieverId, message) => {

    await chatModel.create({ senderId, message: message, recieverId })
}

export { sendGroupMessageService, sendMessageService }