const { fetchTopicsData } = require("../Models/topics.models");

module.exports.getTopics = (request, response) => {
  fetchTopicsData().then((topics) => {
    response.status(200).send({ topics });
  });
};
