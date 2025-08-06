import { Router } from 'express';
import verifyToken from '../middleware/verifyToken.js'
import { addMembers, createGroup, getGroup } from '../controllers/group.controller.js';

const route = Router();

route.post('/create', verifyToken, createGroup)

route.get('/', verifyToken, getGroup)

route.post('/add', verifyToken, addMembers)

export default route;
