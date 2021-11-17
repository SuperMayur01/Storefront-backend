import request from 'supertest';
import app from '../../server';
import dotenv from 'dotenv';

dotenv.config();

describe('test endpoints for products', () => {

  it('POST product create new', async function () {
    const response = await request(app).post('/users').send({
        firstname: 'raman',
        lastname: 'raghav',
        password: 'helloworld123',
      });
    const token = response.body.token

    const responseProduct = await request(app).post('/products').send({
        name: "Mac Pro",
        price: 1500,
        category: "Electronics"
      })
      .set(
        'Authorization', `Bearer ${token}`
        );

    expect(responseProduct.body.name).toBe('Mac Pro');
    expect(responseProduct.status).toBe(200);
  });

  

    it('GET all products', async function () {
      const responseGetProducts = await request(app).get('/products');

      expect(responseGetProducts.status).toBe(200);
    });

    it('GET product by id', async function () {
        const responseProduct = await request(app).get('/products').query({
            id : 1
          });
    
        expect(responseProduct.status).toBe(200);
      });

      it('GET products by category', async function () {
        const responseProductCategory = await request(app).get('/products').query({
            category : 'Electronics'
          });
    
        expect(responseProductCategory.body.length).toBeGreaterThan(2);
        expect(responseProductCategory.status).toBe(200);
      });

});