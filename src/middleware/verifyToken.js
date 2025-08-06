import constants from '../config/constants.js';
import jwt from 'jsonwebtoken';
import responseHandler from '../utils/responseHandler.js';

const verifyToken = (req, res, next) => {

    let token = req.headers.authorization;

    if (!token)
        responseHandler(
            res,
            constants.UNAUTHORIZED,
            'fail',
            'Unauthorized access'
        );

    token = token.split(' ')[1];

    const SECRET_KEY = process.env.SECRET_KEY;
    const valid = jwt.verify(token, SECRET_KEY);

    if (!valid)
        responseHandler(
            res,
            constants.UNAUTHORIZED,
            'fail',
            'Unauthorized access'
        );

    req.user = {}
    const { id } = valid;
    console.log('verfiy token --> ', id)
    req.user.id = id;

    next();
};

export default verifyToken;
