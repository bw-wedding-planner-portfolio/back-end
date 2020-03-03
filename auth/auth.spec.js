const request = require('supertest');
const server = require('../api/server');
const knex = require('../database/dbConfig');

describe('auth Routes', () => {
  beforeEach(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
  });

  describe('POST/register', () => {
    it('Should register a user and return 201(OK)', async() => {
      const res = await request(server)
      .post('/auth/register')
      .send({
        firstName: "test",
        lastName: "test",
        email: Date.now(),
        city: "test",
        state: "test",
        username: "miley",
        password: "test", 
        pricing: "test",
        phoneNumber: Date.now()
      })
      expect(res.status).toBe(201) 
    })
  })
})

describe('POST /login', async() => {
  it('Logins in a user and returns 200(OK)', async() => {
    const res = await request(server)
    .post('/auth/login')
    .send({
      username: "miley",
      password: "test"
    })
    expect(res.status).toBe(200)
  })
})

describe('POST /login', async() => {
  it('Returns statud 401 if user credentials are incorrect', async() => {
    const res = await request(server)
    .post('/auth/login')
    .send({
      username: "test",
      password: "test"
    })
    expect(res.status).toBe(401)
  })
})

