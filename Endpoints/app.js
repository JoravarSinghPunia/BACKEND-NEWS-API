const express = require("express");
const app = express();
const {
  getTopics,
  getEndpoints,
  getArticlesByArticleID,
  getAllArticles,
  getCommentsById,
  postCommentToArticleId,
} = require("../Controllers/news.controllers");
const {
  endpointErrors,
  psqlErrors,
  customErrors,
  serverErrors,
} = require("../Errors/errorHandler");

app.use(express.json());

app.get("/api", getEndpoints);
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticlesByArticleID);
app.get("/api/articles", getAllArticles);
app.get("/api/articles/:article_id/comments", getCommentsById);
app.post("/api/articles/:article_id/comments", postCommentToArticleId);

app.all("*", endpointErrors);
app.use(customErrors);
app.use(psqlErrors);
app.use(serverErrors);

module.exports = app;
