const { request } = require("../Endpoints/app");
const {
  fetchTopicsData,
  fetchEndpoints,
  fetchArticlesByID,
  fetchAllArticles,
  countCommentsByArticleId,
  fetchCommentsById,
  insertComment,
} = require("../Models/news.models");

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

module.exports.getAllArticles = (request, response, next) => {
  fetchAllArticles(countCommentsByArticleId)
    .then((articles) => {
      response.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getCommentsById = (request, response, next) => {
  const { article_id } = request.params;
  fetchCommentsById(article_id)
    .then((comments) => {
      response.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postCommentToArticleId = (request, response, next) => {
  const { article_id } = request.params;
  const { username, body } = request.body;

  insertComment(username, body, article_id)
    .then((comments) => {
      response.status(201).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};