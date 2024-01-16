const request = require("supertest");
const app = require("../Endpoints/app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const endpointsJsonFile = require("../endpoints.json");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("app", () => {
  describe("GET /api", () => {
    test("200: Should return an object with keys showing all available endpoints", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(endpointsJsonFile);
        });
    });
  });

  describe("GET /api/topics", () => {
    test("200: Should respond with an array of objects with slug and description keys", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((response) => {
          const topics = response.body.topics;
          expect(topics.length).toBeGreaterThan(0);
          topics.forEach((topic) => {
            expect(typeof topic.slug).toBe("string");
            expect(typeof topic.description).toBe("string");
            expect(topic).toHaveProperty("slug");
            expect(topic).toHaveProperty("description");
          });
        });
    });
  });

  describe("GET /api/articles/:article_id", () => {
    test("200: Should return an object with author, title, article_id, body, topic, created_at, votes, article_img_url keys", () => {
      const expectedOutput = {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: "2020-07-09T20:11:00.000Z",
        votes: 100,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      };

      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          expect(body.article).toMatchObject(expectedOutput);
        });
    });

    test("400: Should respond with Invalid ID if user enters invalid id entered", () => {
      return request(app)
        .get("/api/articles/invalid")
        .expect(400)
        .then(({ body }) => {
          expect(body).toEqual({ msg: "Invalid ID" });
        });
    });

    test("404: Should respond with Not Found if user enters valid but non-existent id", () => {
      return request(app)
        .get("/api/articles/11111")
        .expect(404)
        .then(({ body }) => {
          expect(body).toEqual({ msg: "Not Found" });
        });
    });
  });

  describe("GET /api/articles", () => {
    test("200: Should return an array with all articles as objects. Each object with the correct keys", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then((result) => {
          expect(result.body.articles).toHaveLength(13);
          expect(Array.isArray(result.body.articles)).toBe(true);
          expect(result.body.articles).toBeSortedBy("created_at", {
            descending: true,
          });
          result.body.articles.forEach((article) => {
            expect(article).toHaveProperty("author");
            expect(article).toHaveProperty("title");
            expect(article).toHaveProperty("article_id");
            expect(article).toHaveProperty("topic");
            expect(article).toHaveProperty("created_at");
            expect(article).toHaveProperty("votes");
            expect(article).toHaveProperty("article_img_url");
            expect(article).toHaveProperty("comment_count");
            expect(article).not.toHaveProperty("body");
          });
        });
    });
    test("404: Should receive message 'Not Found' when path is incorrect", () => {
      return request(app)
        .get("/api/invalid")
        .expect(404)
        .then((result) => {
          expect(result.body.msg).toBe("Not Found");
        });
    });
  });

  describe("GET /api/articles/:article_id/comments", () => {
    test("200: Should respond with an array of comments for given article_id requested with the most recent first", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then((result) => {
          expect(result.body.comments).toHaveLength(11);
          expect(Array.isArray(result.body.comments)).toBe(true);
          expect(result.body.comments).toBeSortedBy("created_at", {
            descending: true,
          });
          result.body.comments.forEach((comment) => {
            expect(comment).toHaveProperty("comment_id");
            expect(comment).toHaveProperty("body");
            expect(comment).toHaveProperty("article_id");
            expect(comment).toHaveProperty("created_at");
            expect(comment).toHaveProperty("votes");
            expect(comment).toHaveProperty("author");
          });
        });
    });
    test("200: Should respond with an empty array given category with no comments", () => {
      return request(app)
        .get("/api/articles/2/comments")
        .expect(200)
        .then((result) => {
          expect(result.body.comments).toEqual([]);
        });
    });
    test("400: responds with invalid id if invalid article id entered", () => {
      return request(app)
        .get("/api/articles/invalid/comments")
        .expect(400)
        .then(({ body }) => {
          expect(body).toEqual({ msg: "Invalid ID" });
        });
    });
    test("404: responds with article not found if valid but non-existent article id entered", () => {
      return request(app)
        .get("/api/articles/999999/comments")
        .expect(404)
        .then(({ body }) => {
          expect(body).toEqual({ msg: "Article does not exist" });
        });
    });
  });
});
