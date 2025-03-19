//middle ware to check whether token is valid

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC as string, (err: any, user: any) => {
            if (err) return res.status(403).json("Token is not valid!");
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated!");
    }
};

export default verifyToken;