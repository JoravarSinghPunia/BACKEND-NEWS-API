const express = require("express");
const app = express();
const { getTopics, getEndpoints } = require("../Controllers/get.controllers");
const {
  incorrectPathError,
  psqlErrorHandler,
} = require("../Errors/errorHandler");

app.get("/api/topics", getTopics);

app.get("/api", getEndpoints);

app.use(incorrectPathError);
// app.use(psqlErrorHandler);

module.exports = app;
