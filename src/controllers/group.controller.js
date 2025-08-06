import { Types } from "mongoose";
import constants from "../config/constants.js";
import { addMembersService, createGroupService, getGroupService } from "../services/group.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import responseHandler from "../utils/responseHandler.js";

// create group
const createGroup = asyncHandler(async (req, res, next) => {

    const { name, description, members } = req.body

    if (!name || !description || members < 1)
        return next(new AppError('All Fields are required', constants.BAD_REQUEST));

    const admin = req.user.id

    const groupId = await createGroupService({ name, description, admin, members })

    responseHandler(res, constants.CREATED, 'success', 'Group created', { groupId, name, description })

})

// get group
const getGroup = asyncHandler(async (req, res, next) => {

    const userId = req.user.id

    const groups = await getGroupService(userId)

    responseHandler(res, constants.OK, 'success', 'Groups found', { groups })
})

// add members in group
const addMembers = asyncHandler(async (req, res, next) => {

    const admin = req.user.id
    const members = req.body.members
    const groupId = req.body.groupId

    const memberIds = members ? members.map(id => new Types.ObjectId(id)) : []

    const addedMembers = await addMembersService({ admin, groupId }, memberIds)

    responseHandler(res, constants.CREATED, 'success', 'Members added', { addedMembers })
})

export { createGroup, getGroup, addMembers }