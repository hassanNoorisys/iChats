const asyncHandler = (fn) => {

    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};

const socketAsyncHandler = (fn) => {

    return (socket) => {

        return async (...args) => {
            try {

                await fn(socket, ...args);
                
            } catch (err) {

                console.error('Socket Error:', err);
                socket.emit('error', { message: err.message || 'Internal Server Error', });
            }
        };
    };
};

export { asyncHandler, socketAsyncHandler };
