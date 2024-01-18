const { request } = require("../Endpoints/app");
const {
  fetchTopicsData,
  fetchEndpoints,
  fetchArticlesByID,
  fetchAllArticles,
  fetchCommentsById,
  insertComment,
  updateArticleById,
  removeCommentById,
  fetchUsers,
  checkTopicExists,
} = require("../Models/news.models");

module.exports.getTopics = (request, response, next) => {
  fetchTopicsData().then((topics) => {
    response.status(200).send({ topics });
  });
};

module.exports.getEndpoints = (request, response, next) => {
  fetchEndpoints()
    .then((data) => {
      const parsedData = JSON.parse(data);
      response.status(200).send(parsedData);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getUsers = (request, response, next) => {
  fetchUsers()
    .then((users) => {
      response.status(200).send({ users });
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

exports.getAllArticles = (request, response, next) => {
  const { topic, sort_by, order } = request.query;
  const fetchArticlesQuery = fetchAllArticles(topic, sort_by, order);

  const queries = [fetchArticlesQuery];

  if (topic) {
    const checkTopicQuery = checkTopicExists(topic);
    queries.push(checkTopicQuery);
  }

  Promise.all(queries)
    .then((results) => {
      const articles = results[0];
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

module.exports.postCommentToArticleId = (request, response, next) => {
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

module.exports.patchArticleId = (request, response, next) => {
  const updatedVotesData = request.body;
  const articleIdParams = request.params;

  updateArticleById(updatedVotesData, articleIdParams)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteCommentById = (request, response, next) => {
  const commentIdData = request.params;

  removeCommentById(commentIdData)
    .then(() => {
      response.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};
