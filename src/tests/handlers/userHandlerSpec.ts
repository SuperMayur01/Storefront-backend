import request from 'supertest';
import app from '../../server';
import dotenv from 'dotenv';

dotenv.config();

describe('test endpoints for users', () => {
    
  it('POST user create new', async function () {
    const responseUser = await request(app).post('/users').send({
        firstname: 'mnv',
        lastname: 'rama',
        password: 'hellowor',
      });

    expect(responseUser.body.firstname).toBe('mnv');
    expect(responseUser.status).toBe(200);
  });


  it('GET all users', async function () {
    const response = await request(app).post('/users').send({
      firstname: 'raman',
      lastname: 'raghav',
      password: 'helloworld123',
    });
    const token = response.body.token

    const responseGetUsers = await request(app).get('/users')
    .set(
      'Authorization', `Bearer ${token}`
      );

    expect(responseGetUsers.status).toBe(200);
  });

  it('GET user by id without token', async function () {
      const responseUser = await request(app).get('/users').query({
          id : 1
        });
  
      expect(responseUser.text).toBe(JSON.stringify('Unauthorized'));
      expect(responseUser.status).toBe(401);
    });

});