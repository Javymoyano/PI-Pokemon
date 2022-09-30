const request = require("supertest");
const poke = require("./pokemon");

it("debe responder el metodo GET con el status code 200", async () => {
  const res = await request(poke).get("/");
  expect(res.statusCode).toBe(200);
});

it("debe responder el metodo GET con el objeto del nombre encontrado", async () => {
  const res = await request(poke).get("/");
  expect(res.body).toEqual(pokeName);
});
