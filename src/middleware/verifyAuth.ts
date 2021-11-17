import express, { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const verifyAuthToken = (req: Request, res: Response, next:NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader?.split(' ')[1]
        const decoded = jwt.verify(token as string, process.env.TOKEN_SECRET as string)
        
        next()
    } catch (error) {
        res.status(401).json("Unauthorized")
    }
}

export default verifyAuthToken;