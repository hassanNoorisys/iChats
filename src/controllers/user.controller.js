import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/appError.js';
import constants from '../config/constants.js';
import {
  loginUserService,
  userRegisterService,
} from '../services/user.service.js';
import responseHandler from '../utils/responseHandler.js';

// register user
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, mobile, password } = req.body;

  if (!name || !email || !mobile || !password)
    return next(new AppError('All Fields are required', constants.BAD_REQUEST));
  
  const newUser = await userRegisterService({
    name,
    email,
    mobile,
    password,
  });

  // send response if all good
  responseHandler(
    res,
    constants.CREATED,
    'success',
    'user registered successfully',
    { name: newUser.name, email: newUser.email, mobile: newUser.mobile }
  );
});

// login user
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, mobile, password } = req.body;

  if ((!email && !mobile) || !password)
    return next(new AppError('All Fields are required', constants.BAD_REQUEST));

  const token = await loginUserService({ user: email || mobile, password });

  responseHandler(res, constants.OK, 'success', 'Login successfull', { token });
});

export { registerUser, loginUser };
