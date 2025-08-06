import { Types } from 'mongoose'
import constants from '../config/constants.js'
import groupModel from '../models/group.model.js'
import userModel from '../models/user.model.js'
import AppError from '../utils/appError.js'

// create group service
const createGroupService = async (data) => {

    const { name, description, admin, members } = data

    const memberIds = members ? members.map((id) => { return new Types.ObjectId(id) }) : []

    const group = new groupModel({ name, description, admins: admin, ...(members.length > 0 && { members: memberIds }) })

    const newGroup = await group.save()

    return newGroup._id
}

// get Group service
const getGroupService = async (filter, groupId = undefined) => {

    const query = {
        $or: [
            { admins: new Types.ObjectId(filter) },
            { members: new Types.ObjectId(filter) }
        ]
    }

    if (groupId)
        query._id = new Types.ObjectId(groupId);
    
    const groups = await groupModel.find(query)

    if (!groups || groups.length < 1) throw new AppError(constants.NOT_FOUND, 'No groups found')

    return groups
}

// add members to group service
const addMembersService = async (filter, memberIds) => {

    // check users are registered or not
    const registeredUsers = await userModel.find({
        _id: { $in: memberIds }
    }).select(['name', '_id', 'mobile'])

    const registeredIds = registeredUsers.map(user => user._id.toString());

    const unregisteredIds = memberIds.filter(id => !registeredIds.includes(id.toString()));

    // console.log('add members service -->', registeredUsers, registeredIds, unregisteredIds)

    await groupModel.findOneAndUpdate({ admins: filter.admin, _id: filter.groupId }, { $addToSet: { members: registeredIds } })

    return registeredUsers
}

export { createGroupService, getGroupService, addMembersService }