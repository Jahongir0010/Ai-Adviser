function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const isProduction = process.env.NODE_ENV === 'production';

  console.error(err);

  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(err.details ? { errors: err.details } : {}),
    ...(isProduction ? {} : { stack: err.stack }),
  });
}

module.exports = { errorHandler };
