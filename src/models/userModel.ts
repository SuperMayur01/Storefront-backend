import client from '../database'
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const saltRounds = process.env.SALT_ROUNDS;
const pepper = process.env.PEPPER;


export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  password:string;
}

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect()
      const sql: string = 'SELECT * FROM users'
  
      const result = await conn.query(sql)
  
      conn.release()
  
      return result.rows 
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`)
    }
  }

  async show(id: number): Promise<User> {
    try {
        const sql: string = 'SELECT * FROM users WHERE id=($1)'
        const conn = await client.connect()

        const result = await conn.query(sql, [id])

        conn.release()

        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not get user ${id}. Error: ${err}`)
    }
  }

  async create(user: User): Promise<User> {
    try {
        const sql: string = 'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *';
        const hash = bcrypt.hashSync(
          user.password + pepper, 
          parseInt(saltRounds as string)
       );
        const conn = await client.connect()

        const result = await conn.query(sql, [user.firstname, user.lastname, hash])

        const userResponse:User = result.rows[0]

        conn.release();

        return userResponse 
    } catch (err) {
        throw new Error(`Could not add user. Error: ${err}`)
    }
  }
}