import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "@repo/backend-common/config";

export function middleware(req: Request, res: Response, next: NextFunction) {
  
    const token = req.headers["authorization"] ?? "";

    const decoded = jwt.verify(token, JWT_SECRET) as {userId:string};

    if(decoded) {
        req.userId = decoded.userId;
        next();
        
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}