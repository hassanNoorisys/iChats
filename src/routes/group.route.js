import { Router } from 'express';
import verifyToken from '../middleware/verifyToken.js'
import { createGroup, getGroup } from '../controllers/group.controller.js';

const route = Router();

route.post('/create', verifyToken, createGroup)

route.get('/', verifyToken, getGroup)

export default route;
