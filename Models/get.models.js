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

module.exports.fetchArticlesByID = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      } else {
        return result.rows[0];
      }
    });
};

module.exports.fetchAllArticles = (countCommentsByArticleId) => {
  return db
    .query(
      "SELECT author, title, article_id, topic, created_at, votes, article_img_url FROM articles ORDER BY created_at DESC"
    )
    .then((result) => {
      const articles = result.rows;

      const promises = articles.map((article) => {
        return countCommentsByArticleId(article.article_id).then(
          ({ count }) => {
            return {
              ...article,
              comment_count: Number(count),
            };
          }
        );
      });

      return Promise.all(promises);
    });
};

module.exports.countCommentsByArticleId = (article_id) => {
  return db
    .query("SELECT COUNT(comment_id) FROM comments WHERE article_id = $1", [
      article_id,
    ])
    .then((result) => {
      return result.rows[0];
    });
};

exports.fetchCommentsById = (article_id) => {
  return this.checkArticleExists(article_id).then(() => {
    return db
      .query(
        "SELECT * FROM comments WHERE article_id = $1 ORDER by created_at DESC",
        [article_id]
      )
      .then((result) => {
        return result.rows;
      });
  });
};

exports.checkArticleExists = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article does not exist" });
      }
    });
};
