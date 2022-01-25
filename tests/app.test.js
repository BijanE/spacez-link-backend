const request = require("supertest");

const app = require("../app");

describe("spacez-link API", () => {
  it("POST /api/submit/email-config --> NOT SUCCESSFUL REQ Json Format Response", () => {
    return request(app)
      .post("/api/submit/email-config")
      .send({
        email_username: "xxxxxx@gmail.com",
        email_password: "xxxxxxxxxxxxxxxx",
      })
      .expect(400)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            isAuth: expect.any(Boolean),
            massage: expect.any(String),
            error: expect.anything(),
            data: null,
          })
        );
      });
  });
  it("POST /api/submit/email-config --> SUCCESSFUL REQ Json Format Response", () => {
    return request(app)
      .post("/api/submit/email-config")
      .send({
        email_username: "xxxxxx@gmail.com",
        email_password: "xxxxxxxxxxxxxxxx",
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            isAuth: expect.any(Boolean),
            massage: expect.any(String),
            error: expect.anything(),
            link: expect.any(String),
            data: null,
          })
        );
      });
  });
});
