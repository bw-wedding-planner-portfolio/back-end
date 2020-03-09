const server = require('../api/server');
const request = require('supertest');
const knex = require('../database/dbConfig');
const db = require('../database/dbConfig');

let token;

// beforeEach( async() => {
//     return await db('planner').del()
//     // return db.raw("TRUNCATE planner planner RESTART IDENTITY CASCADE")
// });


describe('plannerRoutes.js', () => {
    beforeEach(async () => {
        await knex.migrate.rollback();
        await knex.migrate.latest();
      });
  
    describe('GET /auth/user', () => {
        it('should allow access with token', async() => {
            await request(server)
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

            let res = await request(server)
                .post('/auth/login')
                .send({
                    username: "miley",
                    password: "test"
                })

            token = res.body.token;

            let res2 = await request(server)
                .get('/auth/user')
                .set('Authorization', token)
            
            expect(res2.status).toBe(200);
        })
        it('should not allow access without token', async() => {
             const res = await request(server)
             .get('/auth/user');
             expect(res.status).toBe(400)
        })
    })

    describe('GET /auth/user/id', () => {
        it('should return the user of the id', async() => {
            await request(server)
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

            let res = await request(server)
                .post('/auth/login')
                .send({
                    username: "miley",
                    password: "test"
                })

            token = res.body.token;

            let res2 = await request(server)
                .get('/auth/user/1')
                .set('Authorization', token)
        
            expect(res2.status).toBe(200);
        })
        it('should return an error if the user does not exist',async() => {
            await request(server)
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

            let res = await request(server)
                .post('/auth/login')
                .send({
                    username: "miley",
                    password: "test"
                })

            token = res.body.token;

            let res2 = await request(server)
                .get('/auth/user/1000')
                .set('Authorization', token)
        
            expect(res2.status).toBe(404);
        })
    })
})

describe('POST /auth/user/1/posts', () => {
    beforeEach(async () => {
        await knex.migrate.rollback();
        await knex.migrate.latest();
      });
    it("should return 201 created status", async() => {
        await request(server)
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

        let res = await request(server)
            .post('/auth/login')
            .send({
                username: "miley",
                password: "test"
            })
        token = res.body.token;
        let res2 = await request(server)
            .post('/auth/user/1/posts')
            .set('Authorization', token)
            .send({
                theme: "test",
                location: "test",
                description: "test",
                vendors: "test",
                image: "test"
            })
        
        expect(res2.status).toBe(201);
    })
    it('should return an error for missing data', async() => {
        await request(server)
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

        let res = await request(server)
            .post('/auth/login')
            .send({
                username: "miley",
                password: "test"
            })
        token = res.body.token;
        let res2 = await request(server)
            .post('/auth/user/1/posts')
            .set('Authorization', token)
            .send({
                theme: "test",
                location: "test",
                image: "test"
            })
            expect(res2.status).toBe(500)
    })
})

describe('GET /auth/user/1/posts', () => {
    it("should return a list of the users posts", async() => {
        let res = await request(server)
            .post('/auth/login')
                .send({
                    username: "miley",
                    password: "test"
                })
        token = res.body.token;
            await request(server)
                .post('/auth/user/1/posts')
                .set('Authorization', token)
                .send({
                    theme: "test",
                    location: "test",
                    description: "test",
                    vendors: "test",
                    image: "test"
                })
            let res2 = await request(server)
            .get('/auth/user/1/posts')
            .set('Authorization', token)

            expect(res2.status).toBe(200);
    })
    it('should return a json response', async() => {
        let res = await request(server)
            .post('/auth/login')
            .send({
                username: "miley",
                password: "test"
            })
        token = res.body.token;
        await request(server)
            .post('/auth/user/1/posts')
            .set('Authorization', token)
            .send({
                theme: "test",
                location: "test",
                description: "test",
                vendors: "test",
                image: "test"
            })
        let res2 = await request(server)
        .get('/auth/user/1/posts')
        .set('Authorization', token)
        
        expect(res2.type).toMatch(/json/)
    })
})

describe('PUT /auth/user/id/post/pid', () => {
    it('should return a 201 status of changed content', async() =>
    {
        let res = await request(server)
            .post('/auth/login')
            .send({
                username: "miley",
                password: "test"
            })
        token = res.body.token;
        await request(server)
            .post('/auth/user/1/posts')
            .set('Authorization', token)
            .send({
                theme: "test",
                location: "test",
                description: "test",
                vendors: "test",
                image: "test"
            })
        let res2 = await request(server)
        .put('/auth/user/1/post/1')
        .set('Authorization', token)
        .send({
            theme: 'change'
        })
        expect(res2.status).toBe(200)
    })
    it('should return a json response', async() => {
        let res = await request(server)
        .post('/auth/login')
        .send({
            username: "miley",
            password: "test"
        })
    token = res.body.token;
    await request(server)
        .post('/auth/user/1/posts')
        .set('Authorization', token)
        .send({
            theme: "test",
            location: "test",
            description: "test",
            vendors: "test",
            image: "test"
        })
    let res2 = await request(server)
    .put('/auth/user/1/post/1')
    .set('Authorization', token)
    .send({
        theme: 'change'
    })
    expect(res2.type).toMatch(/json/);
    })
})

describe('DELETE /auth/user/id/post/pid', () => {
    it('should return a 200 status for deleted content', async() => {
        let res = await request(server)
        .post('/auth/login')
        .send({
            username: "miley",
            password: "test"
        })
        token = res.body.token;

        let res2 = await request(server)
        .delete('/auth/user/1/post/1')
        .set('Authorization', token)

        expect(res2.status).toBe(200)
    })
    it('should return a json response' , async() => {
        // let res = await request(server)
        // .post('/auth/login')
        // .send({
        //     username: "miley",
        //     password: "test"
        // })
        // token = res.body.token;

        let res2 = await request(server)
        .delete('/auth/user/1/post/1')
        .set('Authorization', token)
        
        expect(res2.type).toMatch(/json/)
    })
})



