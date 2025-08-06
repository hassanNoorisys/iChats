import { getGroupService } from "../../services/group.service.js"

const joinUsertoGroupRoomsService = async (socket) => {

    const userId = socket.user.id

    const groups = await getGroupService(userId)

    groups.forEach((group) => {

        socket.join(group._id.toString())

        console.log('join user room service, user joined --> ', group._id)

        socket.to(group._id.toString()).emit('event:join', { text: 'User joined in a room' })
    })
}

export { joinUsertoGroupRoomsService }