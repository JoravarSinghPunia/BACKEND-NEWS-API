const express = require("express");
const app = express();
const {
  getEndpoints,
  getTopics,
  getUsers,
  getArticlesByArticleID,
  getAllArticles,
  getCommentsById,
  postCommentToArticleId,
  patchArticleId,
  deleteCommentById,
} = require("./Controllers/news.controllers");
const {
  endpointErrors,
  psqlErrors,
  customErrors,
  serverErrors,
} = require("./Errors/errorHandler");

app.use(express.json());

app.get("/api", getEndpoints);
app.get("/api/topics", getTopics);
app.get("/api/users", getUsers);
app.get("/api/articles/:article_id", getArticlesByArticleID);
app.get("/api/articles", getAllArticles);
app.get("/api/articles/:article_id/comments", getCommentsById);

app.post("/api/articles/:article_id/comments", postCommentToArticleId);

app.patch("/api/articles/:article_id", patchArticleId);

app.delete("/api/comments/:comment_id", deleteCommentById);

app.all("*", endpointErrors);
app.use(customErrors);
app.use(psqlErrors);
app.use(serverErrors);

module.exports = app;
