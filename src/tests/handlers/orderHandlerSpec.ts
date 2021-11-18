 import request from 'supertest';
import app from '../../server';
import dotenv from 'dotenv';

dotenv.config();

describe('test endpoint GET /orders/:id', () => {
  it('unauthorized call without token', async function () {
    const response = await request(app).get('/orders/1');

    expect(response.text).toBe(JSON.stringify('Unauthorized'));
    expect(response.status).toBe(401);
  });
});

  describe('test endpoint POST /orders', () => {
    it('fetch order call with token', async function () {
      const responseUser = await request(app).post('/users').send({
        firstname: 'raman',
        lastname: 'raghav',
        password: 'helloworld123',
      });
      const token = responseUser.body.token
      
      const responseOrder = await request(app).post('/orders')
      .send({
        "user_id":1, 
        "quantity":3, 
        "order_id": 1, 
        "product_id": 2
      })
      .set(
        'Authorization', `Bearer ${token}`
        );
        
      expect(responseOrder.body.status).toBe('active');
      expect(responseOrder.status).toBe(200);
    });
});