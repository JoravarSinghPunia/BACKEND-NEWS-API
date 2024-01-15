const db = require("../db/connection");
const fs = require("fs/promises");

exports.fetchTopicsData = () => {
  return db.query(`SELECT * FROM topics;`).then((result) => {
    return result.rows;
  });
};

module.exports.fetchEndpoints = () => {
  return fs.readFile(`${__dirname}/../endpoints.json`, "utf8").then((data) => {
    return data;
  });
};
