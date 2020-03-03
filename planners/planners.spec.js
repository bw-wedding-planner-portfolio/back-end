const server = require('../api/server');
const request = require('supertest');
const should = require('should');

describe('plannerRoutes.js', function() {
    var token;
    beforeEach(function(done) {
        request(server).post('/auth/login')
        .send({
            username: "miley",
            password: "test"
        })
        .end(function(err, res) {
            if (err) throw err;
            token = {access_token: res.body.token}
            done();
        });
    });

    it('posts', function(done) {
        request(server).get('/auth/user')
        .query(token)
        .expect(201)
        // .end(function(err, res) {
        //     should(err).equal(null);
        //     done()
        // })
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