const request = require("supertest");
const app = require("../Endpoints/app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("app", () => {
  describe("GET /api/topics", () => {
    test("200: Should respond with an array of objects with slug and description keys", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((response) => {
          response.body.topics.forEach((topic) => {
            expect(typeof topic.slug).toBe("string");
            expect(typeof topic.description).toBe("string");
            expect(topic).toHaveProperty("slug");
            expect(topic).toHaveProperty("description");
          });
        });
    });
    test("404: should return an error when given an unknown path", () => {
      return request(app)
        .get("/api/invalid")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not Found");
        });
    });
  });
});
