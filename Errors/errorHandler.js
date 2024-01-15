module.exports.incorrectPathError = (request, response) => {
  response.status(404).send({ msg: "Not Found" });
};
