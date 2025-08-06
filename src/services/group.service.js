import constants from '../config/constants.js'
import groupModel from '../models/group.model.js'
import AppError from '../utils/appError.js'

// create group service
const createGroupService = async (data) => {

    const { name, description, admin, members } = data

    const group = new groupModel({ name, description, admins: admin, ...(members && { members }) })

    const newGroup = await group.save()

    return newGroup._id
}

// get Group service
const getGroupService = async (filter) => {

    const groups = await groupModel.find({

        $or: [
            { admins: filter },
            { members: filter }
        ]
    })

    if (!groups || groups.length < 1) throw new AppError(constants.NOT_FOUND, 'No groups found')

    return groups

}

export { createGroupService, getGroupService }