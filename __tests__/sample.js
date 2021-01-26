// describe("Sample Test", () => {
//   it("should test that true === true", () => {
//     expect(true).toBe(true);
//   });
// });

const request = require("supertest");
const app = require("../app");
const http = require("http");
const server = http.createServer(app);

const john = { username: "John", password: "VeryComplex" };
const johnTheThief = { username: "John", password: "VeryEasy" };
const johnTheEmpty = { username: "", password: "" };
let token;

describe("Signup Endpoints", () => {
  it("should create a new user and return the token", async () => {
    const res = await request(server).post("/api/signup").send(john);
    token = res.body.token;
    expect(res.body.msg).toEqual("Created successfully");
    expect(res.body).toHaveProperty("token");
  });
  it("should not create a user when username exist", async () => {
    const res = await request(server).post("/api/signup").send(john);
    expect(res.body.msg).toEqual("Username already in use");
  });
  it("should not create a user when username or password is empty", async () => {
    const res = await request(server).post("/api/signup").send(johnTheEmpty);
    expect(res.body.msg).toEqual("Please enter a value for username/password");
  });
  it("should not let you signup when you are logged in", async () => {
    const res = await request(server)
      .post("/api/signup")
      .set("authorization", token)
      .send(johnTheEmpty);
    expect(res.body.msg).toEqual(
      "You are already logged in as John. If you want to use another account please signout first."
    );
  });
});

describe("Signin Endpoints", () => {
  it("should login with correct username password and return the token", async () => {
    const res = await request(server).post("/api/signin").send(john);
    expect(res.body.msg).toEqual("Login successful");
    expect(res.body).toHaveProperty("token");
  });
  it("should not login with wrong credentials", async () => {
    const res = await request(server).post("/api/signin").send(johnTheThief);
    expect(res.body.msg).toEqual("Wrong username OR password");
  });
  it("should not login when username or password is empty", async () => {
    const res = await request(server).post("/api/signin").send(johnTheEmpty);
    expect(res.body.msg).toEqual("Please enter a value for username/password");
  });
  it("should not login when you are already logged in", async () => {
    const res = await request(server)
      .post("/api/signin")
      .set("authorization", token)
      .send(johnTheEmpty);
    expect(res.body.msg).toEqual(
      "You are already logged in as John. If you want to use another account please signout first."
    );
  });
});
