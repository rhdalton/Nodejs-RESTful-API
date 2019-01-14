const request = require('supertest');
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');

describe('Auth middleware', () => {
    let server;
    let token;
    // start server
    beforeEach(() => { 
        server = require('../../app');
        token = new User({ isAdmin: true }).generateAuthToken();
    });
    afterEach(async () => {         
        server.close(); 
        await Genre.remove({});        
    }); // close app   

    // Define the happy path function, then in each test change one parameter that
    // aligns with the name of the test.
    const exec = () => {
        return request(server)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({ name: 'genre1' });
    }

    it('should return 401 (unauthorized) if no token is provided', async () => {
        token = '';

        const res = await exec();

        expect(res.status).toBe(401);
    });

    it('should return 400 (bad request) if token is invalid', async () => {
        token = 'a';

        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return 200 (OK) if token is valid', async () => {
        const res = await exec();

        expect(res.status).toBe(200);
    });
});