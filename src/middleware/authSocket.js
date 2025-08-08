import jwt from "jsonwebtoken";
import constants from "../config/constants.js";
import AppError from "../utils/appError.js";


const authSocket = async (socket, next) => {

    try {

        const token = socket.handshake.auth.token;   // for frontend
        // const token = socket.handshake.headers.auth;    // for postman

        // console.log(token)

        if (!token) {
            throw next(new AppError(constants.UNAUTHORIZED, 'Authentication token missing'));
        }

        const user = jwt.verify(token, process.env.SECRET_KEY);

        if (!user) {
            throw next(new AppError(constants.UNAUTHORIZED, 'Authentication token missing'));
        }

        socket.user = user;

        next()
    } catch (err) {
        next(new AppError(constants.SERVER_ERROR, 'Authentication error'));
    }
}

export default authSocket