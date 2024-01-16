const { response } = require("../Endpoints/app");

module.exports.incorrectPathError = (request, response) => {
  response.status(404).send({ msg: "Not Found" });
};

exports.psqlErrorHandler = (err, req, res, next) => {
  if (err.status === 400) {
    res.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
};
