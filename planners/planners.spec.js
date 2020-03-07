const server = require('../api/server');
const request = require('supertest');
const should = require('should');
const db = require('../database/dbConfig');

let token;
describe('plannerRoutes.js', function() {
    describe('GET /auth/user', function(){
        it('Sends 400 if no token is in the header', async() => {
            const res = await request(server)
            .get('/auth/user')
            // .query('Authorization', `${token}`)
            // console.log(`this is the token`,token)
            expect(res.status).toBe(400)
        
        })

        it('should return JSON', () => {
            return request(server)
            .get('/auth/user')
            .then(res => {
                expect(res.type).toBe('application/json');
            });
        })
    })
})

// describe('plannersRoutes.js', () => {
//     describe('GET /auth/user', () => {
//         it('Returns status 400 for no token in the header', async() => {
//             const res = await request(server)
//             .get('/auth/user');
//             expect(res.status).toBe(400);
//         })
//     })
// })