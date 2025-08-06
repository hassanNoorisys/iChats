import { getGroupService } from "../../services/group.service.js"

// join users to room at the of log in
const joinUsertoGroupRoomsService = async (socket) => {

    const userId = socket.user.id

    const groups = await getGroupService(userId)

    groups.forEach((group) => {

        socket.join(group._id.toString())

        socket.to(group._id.toString()).emit('event:join', { text: `${userId} in a room` })
    })
}

export { joinUsertoGroupRoomsService }