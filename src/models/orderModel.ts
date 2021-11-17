import client from '../database';


export type Order = {
    id?: number;
    user_id: string;
    status?: string;
}

export type Order_products = {
    id?: number;
    quantity:number;
    order_id: number;
    product_id: number;
}

export class OrderStore {
  async show(id:number): Promise<Order[]> {
    try {
      const conn = await client.connect()
      const sql: string = 'SELECT * FROM orders JOIN order_products ON orders.id=order_products.order_id WHERE user_id=($1)' 
    
      const result = await conn.query(sql, [id as unknown as number])
  
      conn.release()
  
      return result.rows 
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`)
    }
  }


  async create(order: {user_id:number, quantity:number, order_id: number, product_id: number}): Promise<Object> {
    try {
        const sql1: string = 'INSERT INTO orders (user_id) VALUES($1) RETURNING *';
        
        const conn1 = await client.connect()

        const result1 = await conn1.query(sql1, [order.user_id])

        const orderResponse:Order = result1.rows[0]

        conn1.release();

        const sql2: string = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
        
        const conn2 = await client.connect()

        const result2 = await conn2.query(sql2, [order.quantity, order.order_id, order.product_id])

        const orderProductResponse:Order_products = result2.rows[0]

        conn2.release();

        const response = {...orderResponse, ...orderProductResponse}

        return response 
    } catch (err) {
        throw new Error(`Could not add order. Error: ${err}`)
    }
  }

}