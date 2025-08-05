import constants from '../config/constants.js';
import userModel from '../models/user.model.js';
import AppError from '../utils/appError.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// registe user
const userRegisterService = async (userData) => {
  const { name, email, mobile, password } = userData;

  const existingUser = await userModel.findOne({
    $or: [{ email }, { mobile }],
  });

  if (existingUser)
    throw new AppError(constants.CONFLICT, 'User Already present',);

  const newUser = new userModel({ name, email, password, mobile });
  await newUser.save();

  return { name: newUser.name, email: newUser.email, mobile: newUser.mobile };
};

// login user
const loginUserService = async (userData) => {
  // console.log('login service --> ', userData)
  const { user, password } = userData;

  const existingUser = await userModel.findOne({
    $or: [{ email: user }, { mobile: user }],
  });

  if (!existingUser)
    return new AppError('User not registed', constants.NOT_FOUND);

  // check password
  const valid = await bcrypt.compare(password, existingUser.password);
  if (!valid)
    return new AppError('Invalid Credentials', constants.UNAUTHORIZED);

  // generate token
  const SECRET_KEY = process.env.SECRET_KEY;
  const token = jwt.sign({ id: existingUser._id }, SECRET_KEY, {
    expiresIn: '10d',
  });

  return token;
};

export { userRegisterService, loginUserService };
