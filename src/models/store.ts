// @ts-ignore
import client from '../database'

export type Article = {
  id?: string;
  title: string;
  content: string;
}

export class ArticleStore {
  async index(): Promise<Article[]> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'SELECT * FROM articles'
  
      const result = await conn.query(sql)
  
      conn.release()
  
      return result.rows 
    } catch (err) {
      throw new Error(`Could not get articles. Error: ${err}`)
    }
  }

  async show(id: string): Promise<Article> {
    try {
        const sql = 'SELECT * FROM articles WHERE id=($1)'
        // @ts-ignore
        const conn = await client.connect()

        const result = await conn.query(sql, [id])

        conn.release()

        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not get article ${id}. Error: ${err}`)
    }
  }

  async create(article: Article): Promise<Article> {
    try {
        const sql = 'INSERT INTO articles (title, content) VALUES($1, $2) RETURNING *'
        // @ts-ignore
        const conn = await client.connect()

        const result = await conn.query(sql, [article.title, article.content])

        const articleResponse:Article = result.rows[0]

        conn.release()

        return articleResponse 
    } catch (err) {
        throw new Error(`Could not add article. Error: ${err}`)
    }
  }

  async delete(id: string): Promise<Article> {
    try {
      const sql = 'DELETE FROM articles WHERE id=($1)'
        // @ts-ignore
        const conn = await client.connect()

        const result = await conn.query(sql, [id])

        const article = result.rows[0]

        conn.release()

        return article  
    } catch (err) {
        throw new Error(`Could not delete article. Error: ${err}`)
    }
  }
}