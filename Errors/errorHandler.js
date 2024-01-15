const { response } = require("../Endpoints/app");

module.exports.incorrectPathError = (request, response) => {
  response.status(404).send({ msg: "Not Found" });
};

module.exports.psqlErrorHandler = (request, response) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
};
