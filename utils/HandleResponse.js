const sendResponse = ({res, statusCode, message, data}) => {
    res.status(statusCode);
    return res.json({
        message,
        data
    })
};

const sendError = (error, req, res, next) => {
    return res.status(error.status).json(error);
}

module.exports = {
    sendResponse,
    sendError,
}
