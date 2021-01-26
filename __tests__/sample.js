// describe("Sample Test", () => {
//   it("should test that true === true", () => {
//     expect(true).toBe(true);
//   });
// });

const request = require("supertest");
const app = require("../app");
const http = require("http");
const server = http.createServer(app);
beforeEach(() => {
  console.log("YOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
});
afterEach((done) => {
  console.log("Yiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
  server.close();
  done();
});
describe("signup Endpoints", () => {
  it("should create a new user", async (done) => {
    const res = await request(server).post("/api/signup").send({
      username: "Afshin3",
      password: "test4",
    });
    expect(res.body.msg).toEqual("Created successfully");
    expect(res.body).toHaveProperty("token");
    done();
  });
});
