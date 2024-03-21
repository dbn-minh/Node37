export const responseData = (res, message, data, statusCode) => {
    return res.status(statusCode).send({
        message: message,
        content: data,
        date: new Date(),
    });
};
