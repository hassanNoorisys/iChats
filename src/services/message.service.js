import chatModel from '../models/chats.model.js'

// send message service
const sendMessageService = async (userId, message) => {

    const newMessage = new chatModel({ user: userId, message: message })

    await newMessage.save()
}

export { sendMessageService }