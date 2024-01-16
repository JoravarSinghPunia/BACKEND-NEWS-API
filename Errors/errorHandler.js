const { response } = require("../Endpoints/app");

module.exports.incorrectPathError = (request, response) => {
  response.status(404).send({ msg: "Not Found" });
};
