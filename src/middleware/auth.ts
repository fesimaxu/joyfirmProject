import { Request, NextFunction, Response } from 'express';
import { verifyToken } from '../utils';



export const auth =  async (req: Request, res: Response, next: NextFunction) => {
    try {

    const authorization = req.headers.authorization;

    if (authorization === undefined) {
           res.status(404).send({
            status: "error",
            method: req.method,
            message: "no authorization"
           })
        return;
    }
    const token = authorization.split(" ")[1]

     if (!token || token === "") {
           res.status(404).send({
            status: "error",
            method: req.method,
            message: "access denied"
           })
        return;
     }
    
        const decodeToken = verifyToken(token)
        if ('user' in req) {
            req.user = decodeToken
        }

        return next()
        
    } catch (error) {
        return  res.status(404).send({
            status: "error",
            method: req.method,
            message: "authorization failed",
            error
           })
    }

 }