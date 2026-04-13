import { type Request, type Response } from "express";
import prisma from "../common/lib/prisma.js";

class typeController {
    async create(req: Request, res: Response) {
        const { name } = req.body;
        const type = await prisma.type.create({
            data: { name }
        });
        return res.json(type);
    }

    async getAll(req: Request, res: Response) {
        const types = await prisma.type.findMany();
        return res.json(types);
    }
}

export default new typeController;