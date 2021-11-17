import client from '../database';


export type Product = {
    id?: number;
    name: string;
    price: number;
    category: string;
}

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect()
      const sql: string = 'SELECT * FROM products'
  
      const result = await conn.query(sql)
  
      conn.release()
  
      return result.rows 
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`)
    }
  }

  async show(id: number): Promise<Product> {
    try {
        const sql: string = 'SELECT * FROM products WHERE id=($1)'
        const conn = await client.connect()

        const result = await conn.query(sql, [id])

        conn.release()

        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not get product ${id}. Error: ${err}`)
    }
  }

  async create(product: Product): Promise<Product> {
    try {
        const sql: string = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
        
        const conn = await client.connect()

        const result = await conn.query(sql, [product.name, product.price, product.category])

        const productResponse:Product = result.rows[0]

        conn.release();

        return productResponse 
    } catch (err) {
        throw new Error(`Could not add product. Error: ${err}`)
    }
  }

  async byCategory(category: string): Promise<Product[]> {
    try {
      const sql: string = 'SELECT * FROM products WHERE category=($1)'
        const conn = await client.connect()

        const result = await conn.query(sql, [category])

        conn.release()

        return result.rows  
    } catch (err) {
        throw new Error(`Could not delete product. Error: ${err}`)
    }
  }

}