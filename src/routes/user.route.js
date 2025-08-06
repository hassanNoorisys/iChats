import { Router } from 'express';
import { getUser, loginUser, registerUser } from '../controllers/user.controller.js';

const route = Router();

route.post('/register', registerUser)
    .post('/login', loginUser)

route.get('/', getUser)

export default route;
