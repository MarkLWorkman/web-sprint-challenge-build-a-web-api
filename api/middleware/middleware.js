const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()} ${req.method} ${req.originalUrl}]`);
  next();
};

const IDValidation = (dbModel, resName, req, next) => {
  const id = req.params.id;

  if (id) {
    dbModel
      .get(id)
      .then((results) => {
        if (results) {
          req.idResult = results;
          next();
        } else {
          next({
            status: 404,
            message: "Failed to find ID",
          });
        }
      })
      .catch(next);
  } else {
    next();
  }
};

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    note: "There is some kind of error happening",
    message: err.message,
    stack: err.stack,
  });
};

module.exports = {
  logger,
  IDValidation,
  errorHandler,
};
