import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/userModel';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import verifyAuthToken from '../middleware/verifyAuth'

dotenv.config();

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const users = await store.index()
  res.json(users)
}

const show = async (req: Request, res: Response) => {
    try {
        const user = await store.show(req.params.id as unknown as number)
        res.json(user)
    } catch (err){
        res.status(400)
        res.json(err) 
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
        }
        const newUser = await store.create(user)
        const token = jwt.sign({user:newUser}, process.env.TOKEN_SECRET as string)
        const response = {...newUser, token}

        res.json(response)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const userRoutes = (app: express.Application) => {
  app.get('/users',verifyAuthToken, index)
  app.get('/users/:id',verifyAuthToken, show)
  app.post('/users', create)
}

export default userRoutes;