import { OrderStore } from '../../models/orderModel';


const store = new OrderStore();

describe('test order model methods', () => {

    it('fetch an order', async function () {
        const order = {
            user_id:1, 
            quantity:5, 
            order_id: 1, 
            product_id: 1
        }
        await store.create(order)
        const getOrder = await store.show(1)
  
      expect(getOrder.id).toBe(1);
    });


    it('create a new order', async function () {
        const order = {
            user_id:1, 
            quantity:7, 
            order_id: 1, 
            product_id: 1
        }
        const newOrder = await store.create(order)
  
      expect(newOrder.status).toBe('active');
    });

  });