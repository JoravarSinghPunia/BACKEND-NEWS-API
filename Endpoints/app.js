const express = require("express");
const app = express();
const { getTopics } = require("../Controllers/topics.controllers");
const { incorrectPathError } = require("../Errors/errorHandler");

app.get("/api/topics", getTopics);

// Error catcher
app.all("/*", incorrectPathError);

module.exports = app;
