import express, { Request, Response } from 'express'
import { Product, ProductStore } from '../models/productModel';
import verifyAuthToken from '../middleware/verifyAuth'


const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  const products = await store.index()
  res.json(products)
}

const show = async (req: Request, res: Response) => {
    try{
        const product = await store.show(req.params.id as unknown as number)
        res.json(product)
    } catch(err){
        res.status(400)
        res.json(err)
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        }
        const newProduct = await store.create(product)

        res.json(newProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const productByCategory = async (req: Request, res: Response) => {
    try {
        const allProductsByCategory = await store.byCategory(req.params.category)
        if (allProductsByCategory){
            res.json(allProductsByCategory)
        } else {
            res.status(401).json("Could not find products with given category.")
        }

    } catch(err) {
        res.status(400)
        res.json(err)
    }
}


const productRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', verifyAuthToken, create)
  app.get('/products/:category', productByCategory)
}

export default productRoutes;