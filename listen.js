const app = require("./app");
const express = require("express");

const { PORT = 10000 } = process.env;
const server = express();

server.use("/", app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
