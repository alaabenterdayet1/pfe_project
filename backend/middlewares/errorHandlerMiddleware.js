export function errorHandlerMiddleware(err, req, res, next) {
    const statusCode = res.statusCode === 200 ? 502 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });
}
