const errorFunc = (res, message, status, data) => {
    return res.status(status).json({
        message: message,
        data: data
    });
};

export default errorFunc;