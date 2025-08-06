import constants from "../config/constants.js";
import { createGroupService, getGroupService } from "../services/group.service.js";
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

export { createGroup, getGroup }