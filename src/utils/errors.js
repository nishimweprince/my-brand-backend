const errorFunc = (res, message, status) => {
    return res.status(status).json({
        message: message
    });
};

export default errorFunc;