const request = require('supertest');
const mongoose = require('mongoose');
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');

let server;

describe('/api/genres', () => {
    // start server
    beforeEach(() => { server = require('../../app'); });
    afterEach(async () => {         
        // close app
        server.close();
        // remove pre-populated genre documents
        await Genre.remove({});    
    });

    describe('GET /', () => { 
        it('should return all genres', async () => {
            // populate collection with genre documents
            await Genre.collection.insertMany([
                { name: 'genre1' },
                { name: 'genre2' },
                { name: 'genre3' },
            ]);
            // get response from supertest module request
            const res = await request(server).get('/api/genres');

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(3);
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();            
        });
    });

    describe('GET /:id', () => {
        it('should return a genre if valid id is passed', async () => {
            // populate collection with genre doc
            const genre = new Genre({ name: 'genre1' });
            await genre.save();

            const res = await request(server).get('/api/genres/' + genre._id);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name);
        });

        it('should return 404 (not found) if invalid id is passed', async () => {
            const res = await request(server).get('/api/genres/1');

            expect(res.status).toBe(404);
        });

        it('should return 404 (not found) if no genre with given Id exists', async () => {
            const id = mongoose.Types.ObjectId();

            const res = await request(server).get('/api/genres/' + id);

            expect(res.status).toBe(404);
        });
    });

    describe('POST /', () => {

        let token;
        let name;

        // Define the happy path, then in each test change one parameter that
        // aligns with the name of the test.
        const exec = async () => {
            return await request(server)
                .post('/api/genres')
                .set('x-auth-token', token) // set header auth token
                .send({ name });
        }

        // set default values before tests
        beforeEach(() => {
            token = new User({ isAdmin: true }).generateAuthToken(); // set user to Admin
            name = 'genre1';
        });

        it('should return 401 (unauthorized) if client is not logged in', async () => {
            token = ''; // set token to empty

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 403 (forbidden) if client is not an Admin', async () => {
            token = new User().generateAuthToken(); // non Admin user
            
            const res = await exec();

            expect(res.status).toBe(403);
        });

        it('should return 400 (bad request) if genre is less than 3 characters', async () => {
            name = 'aa';            

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 (bad request) if genre is more than 50 characters', async () => {
            name = new Array(52).join('a'); // set genre name to 52 character long string

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should save the genre to db if it is valid', async () => {            
            await exec();

            const genre = await Genre.find({ name: 'genre1'});

            expect(genre).not.toBeNull();
        });

        it('should return the genre if it is valid', async () => {
            const res = await exec();

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'genre1');
        });
    });
});