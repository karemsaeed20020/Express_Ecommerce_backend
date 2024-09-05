export const globalErrorHandling = (err, req, res, next) => {
    let error = err.message;
    let code = err.statusCode || 500;
    process.env.Mode === 'development'  ? res.status(code).json({error, stack: err.stack}) : res.status(code).json({error})
}