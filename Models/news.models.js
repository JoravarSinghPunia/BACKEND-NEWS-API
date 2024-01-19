const db = require("../db/connection");
const fs = require("fs/promises");

exports.fetchTopicsData = () => {
  return db.query(`SELECT * FROM topics;`).then((result) => {
    return result.rows;
  });
};

exports.fetchEndpoints = () => {
  return fs.readFile(`${__dirname}/../endpoints.json`, "utf8").then((data) => {
    return data;
  });
};

exports.fetchUsers = () => {
  return db.query(`SELECT * FROM users`).then((users) => {
    return users.rows;
  });
};

exports.fetchArticlesByID = (article_id) => {
  return db
    .query(
      `SELECT *, CAST((SELECT COUNT(*) FROM comments WHERE comments.article_id = articles.article_id) AS INTEGER) AS comment_count
      FROM articles 
      WHERE article_id = $1`,
      [article_id]
    )
    .then((response) => {
      const { rows } = response;
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return rows[0];
    });
};

exports.fetchAllArticles = (topic) => {
  const queryValues = [];
  let sqlQuery = `
  SELECT author, title, article_id, topic, created_at, votes, article_img_url, CAST((SELECT COUNT(*) FROM comments WHERE comments.article_id = articles.article_id) AS INTEGER) AS comment_count FROM articles
  `;
  if (topic !== undefined) {
    sqlQuery += ` WHERE topic = $1 `;
    queryValues.push(topic);
  }

  sqlQuery += ` ORDER BY created_at DESC `;

  return db.query(sqlQuery, queryValues).then((response) => {
    const { rows } = response;
    return rows;
  });
};

exports.checkTopicExists = (topic) => {
  return db
    .query(
      `
  SELECT * FROM topics
  WHERE slug = $1
  `,
      [topic]
    )
    .then(({ rows }) => {
      if (rows.length === 0)
        return Promise.reject({ status: 404, msg: "Not Found" });
    });
};

exports.fetchAllArticles = (topic, sort_by = "created_at", order = "desc") => {
  const queryValues = [];
  const validSortByQueries = [
    "created_at",
    "article_id",
    "title",
    "topic",
    "author",
    "body",
    "votes",
    "article_img_url",
  ];
  const validOrderQueries = ["asc", "desc"];

  if (
    !validSortByQueries.includes(sort_by) ||
    !validOrderQueries.includes(order)
  ) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  let sqlQuery = `
  SELECT author, title, article_id, topic, created_at, votes, article_img_url, CAST((SELECT COUNT(*) FROM comments WHERE comments.article_id = articles.article_id) AS INTEGER) AS comment_count FROM articles 
  `;
  if (topic !== undefined) {
    sqlQuery += ` WHERE topic = $1 `;
    queryValues.push(topic);
  }

  sqlQuery += ` ORDER BY ${sort_by} ${order} `;

  return db.query(sqlQuery, queryValues).then((response) => {
    const { rows } = response;
    return rows;
  });
};

exports.countCommentsByArticleId = (article_id) => {
  return db
    .query("SELECT COUNT(comment_id) FROM comments WHERE article_id = $1", [
      article_id,
    ])
    .then((result) => {
      return result.rows[0];
    });
};

exports.fetchCommentsById = (article_id) => {
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

exports.checkArticleExists = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
    });
};

exports.insertComment = (author, body, article_id) => {
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

exports.updateArticleById = (body, params) => {
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

exports.removeCommentById = (requestParams) => {
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
