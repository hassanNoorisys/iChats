import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/user.controller.js';

const route = Router();

route.post('/register', registerUser)
    .post('/login', loginUser)

export default route;
