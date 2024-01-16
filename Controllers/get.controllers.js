const { request } = require("../Endpoints/app");
const {
  fetchTopicsData,
  fetchEndpoints,
  fetchArticlesByID,
} = require("../Models/get.models");

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

module.exports.getArticlesByArticleID = (request, response, next) => {
  const { article_id } = request.params;
  fetchArticlesByID(article_id)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
