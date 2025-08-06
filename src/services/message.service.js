import chatModel from '../models/chats.model.js'
import groupModel from '../models/group.model.js'

// send message service
const sendGroupMessageService = async (userId, message, groupId) => {

    const newMessage = new chatModel({ senderId: userId, message: message })

    await newMessage.save()

    if (groupId)
        await groupModel.updateOne({ _id: groupId }, { $push: { chats: newMessage._id } })
}

export { sendGroupMessageService }