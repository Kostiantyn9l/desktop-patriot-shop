import {type Request, type Response, type NextFunction} from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../secrets.js";
import { type Role } from "../../prisma/generated/prisma/enums.js";

export interface AuthRequest extends Request {
  user?: { id: number; role: Role };
}

export default function(req: AuthRequest, res: Response, next: NextFunction) {
    if(req.method === "OPTIONS") {
        next();
    }
    try {
        const token = req.headers.authorization?.split(" ")[1]
        if(!token) {
            return res.status(401).json({message: "Користувач не авторизований!"});
        }

        const decoded = jwt.verify(token, JWT_SECRET) as {id: number; role: Role};

        req.user = decoded;
        next();
    } catch(e) {
        res.status(401).json({message: "Користувач не авторизований!"});
    }
}