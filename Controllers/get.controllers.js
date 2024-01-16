const { fetchTopicsData, fetchEndpoints } = require("../Models/get.models");

module.exports.getTopics = (request, response, next) => {
  fetchTopicsData().then((topics) => {
    response.status(200).send({ topics });
  });
};

module.exports.getEndpoints = (require, response, next) => {
  fetchEndpoints()
    .then((data) => {
      const parsedData = JSON.parse(data);
      response.status(200).send(parsedData);
    })
    .catch((err) => {
      next(err);
    });
};
