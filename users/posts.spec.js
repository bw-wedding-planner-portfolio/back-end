const server = require('../api/server');
const request = require('supertest');
const knex = require('../database/dbConfig');
const db = require('../database/dbConfig');
const Users = require('./user-model');

describe('GET /weddingposts', () => {
    it('should get all posts', async() => {
        let res = await request(server)
            .get('/weddingposts')
        expect(res.status).toBe(200)
    })
    it('should have a json response', async()=> {
        let res = await request(server)
        .get('/weddingposts')
        expect(res.type).toMatch(/json/)
    })
})

describe('GET /weddingposts/id', () => {
    it('should get post by id', async() => {
        let res = await request(server)
        .get('/weddingposts/1')
        expect(res.status).toBe(200)
    })
    it('should return a json', async() => {
        let res = await request(server)
        .get('/weddingposts/10')
        expect(res.type).toMatch(/json/);
    })
})

describe('getPost()', () => {
    it('should return an array', async() => {
        let res = await Users
        .getPosts('weddingPost')
        expect(Array.isArray(res).toBe(true))
    })
})


