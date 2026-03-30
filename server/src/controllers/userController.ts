import { type Request, type Response, type NextFunction} from "express";
import ApiError from "../error/ApiError.js";
import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets.js";
import type { Role } from "../../prisma/generated/prisma/enums.js";
import { type AuthRequest } from "../middleware/authMiddleware.js";

type JWTpayload = {
    id: number, 
    role: Role
}

const generateJWT = (payload: JWTpayload) => {
    return jwt.sign(
        payload, 
        JWT_SECRET, 
        {expiresIn: '24h'}
    );
}
class userController {
    async registration(req: Request, res: Response, next: NextFunction) {
        const {name, email, password} = req.body;

        if(!name || !email || !password) {
            return next(ApiError.badRequest("Не коректні дані!"));
        }
        const candidate = await prisma.user.findFirst({
            where: {email}
        })
        if(candidate) {
            return next(ApiError.badRequest("Користувач з таким email вже існує!"));
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword
            }
        });

        const basket = await prisma.basket.create({
            data: {
                userId: user.id
            }
        })
        
        const token = generateJWT({
            id: user.id, 
            role: user.role
        });

        return res.json({user, basket, token});
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const {email, password} = req.body;

        const user = await prisma.user.findFirst({
            where: {email: String(email)}
        });
        if(!user) {
            return next(ApiError.internal("Користувач не знайдений!"));
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if(!comparePassword) {
            return next(ApiError.internal("Пароль не вірний!"));
        }

        const token = generateJWT({
            id: user.id, 
            role: user.role
        });

        return res.json({user, token});
    }

    async checkAuth(req: AuthRequest, res: Response, next: NextFunction) {
        const token = generateJWT({
            id: req.user!.id,
            role: req.user!.role
        });

        return res.json({ token })
    }
}

export default new userController;