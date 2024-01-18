const db = require("../db/connection");
const fs = require("fs/promises");

module.exports.fetchTopicsData = () => {
  return db.query(`SELECT * FROM topics;`).then((result) => {
    return result.rows;
  });
};

module.exports.fetchEndpoints = () => {
  return fs.readFile(`${__dirname}/../endpoints.json`, "utf8").then((data) => {
    return data;
  });
};

module.exports.fetchUsers = () => {
  return db.query(`SELECT * FROM users`).then((users) => {
    return users.rows;
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

module.exports.fetchCommentsById = (article_id) => {
  return this.checkArticleExists(article_id)
    .then(() => {
      return db
        .query(
          "SELECT * FROM comments WHERE article_id = $1 ORDER by created_at DESC",
          [article_id]
        )
        .then((result) => {
          return result.rows;
        });
    })
    .catch((err) => {
      if (err.status === 404) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      } else {
        return Promise.reject(err);
      }
    });
};

module.exports.checkArticleExists = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
    });
};

module.exports.insertComment = (author, body, article_id) => {
  if (!author || !body || !article_id) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
  return db
    .query(
      `
INSERT INTO comments
    (author, body, article_id)
VALUES
    ($1,$2,$3)
RETURNING comment_id, body, article_id, author, votes, created_at;
`,
      [author, body, article_id]
    )
    .then(({ rows }) => {
      return rows[0];
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

module.exports.updateArticleById = (body, params) => {
  const { inc_votes } = body;
  const { article_id } = params;

  return db
    .query(
      `
      UPDATE articles
      SET
        votes = votes + $1
      WHERE articles.article_id = $2
      RETURNING *;
      `,
      [inc_votes, article_id]
    )
    .then((article) => {
      if (article.rows.length === 0) {
        return Promise.reject({ msg: "Not Found" });
      }
      return article.rows[0];
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

module.exports.removeCommentById = (requestParams) => {
  return db
    .query(
      `
    DELETE FROM comments
    WHERE comment_id = $1
    RETURNING *`,
      [requestParams.comment_id]
    )
    .then((response) => {
      if (response.rows.length === 0) {
        return Promise.reject({ msg: "Not Found" });
      }
      return response.rows;
    });
};
