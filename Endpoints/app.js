const express = require("express");
const app = express();
const {
  getTopics,
  getEndpoints,
  getArticlesByArticleID,
} = require("../Controllers/get.controllers");

app.get("/api/topics", getTopics);

app.get("/api", getEndpoints);

app.get("/api/articles/:article_id", getArticlesByArticleID);

app.use((request, response, next) => {
  response.status(404).send({ msg: "Not Found" });
});

app.use((err, request, response, next) => {
  if (err.status) {
    response.status(err.status).send({ msg: err.msg });
  } else next(err);
});

app.use((err, request, response, next) => {
  if (err.code === "22P02") {
    response.status(400).send({ msg: "Invalid ID" });
  }
});

module.exports = app;
