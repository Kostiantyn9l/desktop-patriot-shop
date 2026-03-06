import { type Request, type Response } from "express";
import prisma from "../lib/prisma.js";

class brandController {
    async create(req: Request, res: Response) {
        const { name } = req.body;
        const brand = await prisma.brand.create({
            data: { name }
        });
        return res.json(brand);
    }

    async getAll(req: Request, res: Response) {
        const brands = await prisma.brand.findMany();
        return res.json(brands);
    }
}

export default new brandController;