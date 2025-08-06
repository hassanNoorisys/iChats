import chatModel from '../models/chats.model.js'
import groupModel from '../models/group.model.js'

// send message service
const sendGroupMessageService = async (userId, message, groupId) => {

    const newMessage = await chatModel.create({ senderId: userId, message: message })

    if (groupId)
        await groupModel.updateOne({ _id: groupId }, { $push: { chats: newMessage._id } })
}

export { sendGroupMessageService }