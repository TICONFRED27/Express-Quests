const request = require("supertest");
const database = require("../database");
const app = require("../src/app");
const crypto = require("node:crypto");

//GET USERS
describe("GET /api/users", () => {
  it("should return all users", async () => {
    const response = await request(app).get("/api/users");

    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.status).toEqual(200);
  });
});
//GET USERS BY HEADS
describe("GET /api/users/:id", () => {
  it("should return one user", async () => {
    const response = await request(app).get("/api/users/1");

    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.status).toEqual(200);
  });

  it("should return no user", async () => {
    const response = await request(app).get("/api/users/0");

    expect(response.status).toEqual(404);
  });
});

describe("POST /api/users", () => {
  it("should return created users", async () => {
    const newMovie = {
      firstname: "titic",
      lastname: "fred",
      email: `${crypto.randomUUID()}@wild.co`,
      city: "la vacherie",
      language: "french",
    };

    const response = await request(app).post("/api/users").send(newMovie);

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("id");
    expect(typeof response.body.id).toBe("number");

    const [result] = await database.query(
      "SELECT * FROM users WHERE id=?",
      response.body.id
    );

    const [movieInDatabase] = result;

    expect(movieInDatabase).toHaveProperty("id");

    expect(movieInDatabase).toHaveProperty("firstname");
    expect(movieInDatabase.firstname).toStrictEqual(newMovie.firstname);

    expect(movieInDatabase).toHaveProperty("lastname");
    expect(movieInDatabase.lastname).toStrictEqual(newMovie.lastname);

    expect(movieInDatabase).toHaveProperty("email");
    expect(movieInDatabase.email).toStrictEqual(newMovie.email);

    expect(movieInDatabase).toHaveProperty("city");
    expect(movieInDatabase.city).toStrictEqual(newMovie.city);

    expect(movieInDatabase).toHaveProperty("language");
    expect(movieInDatabase.language).toStrictEqual(newMovie.language);
  });

  it("should return an error", async () => {
    const movieWithMissingProps = { firstname: "Harry" };

    const response = await request(app)
      .post("/api/users")
      .send(movieWithMissingProps);

    expect(response.status).toEqual(500);
  });
});
afterAll(() => database.end());
