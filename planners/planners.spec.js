const server = require('../api/server');
const request = require('supertest');
const should = require('should');
const db = require('../database/dbConfig');

// let token;
// beforeAll(async done => {
//   await
//   request(server)
//     .post("/auth/register")
//     .send({
//         firstName: "test",
//         lastName: "test",
//         email: Date.now(),
//         city: "test",
//         state: "test",
//         username: "testing",
//         password: "test", 
//         pricing: "test",
//         phoneNumber: Date.now()
//     })
//     .end((err, response) => {
//       token = response.body.token;
//       console.log(`token from register`, token)
//       done()
//     });
// });
describe('plannerRoutes.js', function() {
    // var token;
    // beforeAll(function(done) {
    //     request(server).post('/auth/login')
    //     .send({
    //         username: "miley",
    //         password: "test"
    //     })
    //     .end(function(err, res) {
    //         token = res.body.token;
    //         done();
    //     });
    // });

    it('Sends 400 if no token is in the header', async() => {
        const res = await request(server)
        .get('/auth/user')
        // .query('Authorization', `${token}`)
        // console.log(`this is the token`,token)
        expect(res.status).toBe(400)
        // .end(function(err, res) {
        //     should(err).equal(null);
        //     done()
        // })
    })

    it('should return JSON', () => {
        return request(server)
        .get('/auth/user')
        .then(res => {
            expect(res.type).toBe('application/json');
        });
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