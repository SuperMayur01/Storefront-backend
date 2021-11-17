import express, { Request, Response } from 'express'
import { Order, OrderStore } from '../models/orderModel';
import verifyAuthToken from '../middleware/verifyAuth'


const store = new OrderStore();


const show = async (req: Request, res: Response) => {
    try{
        const order = await store.show(req.params.id as unknown as number)
        res.json(order)
    } catch(err){
        res.status(400)
        res.json(`${err}`)
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const order = {
            user_id:req.body.user_id, 
            quantity:req.body.quantity, 
            order_id: req.body.order_id, 
            product_id: req.body.product_id
        }
        const newOrder = await store.create(order)

        res.json(newOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}



const orderRoutes = (app: express.Application) => {
  app.get('/orders/:id', verifyAuthToken, show)
  app.post('/orders', verifyAuthToken, create)
}

export default orderRoutes;