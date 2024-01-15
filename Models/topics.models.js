const db = require("../db/connection");
const fs = require("fs/promises");

exports.fetchTopicsData = () => {
  return db.query(`SELECT * FROM topics;`).then((result) => {
    return result.rows;
  });
};
