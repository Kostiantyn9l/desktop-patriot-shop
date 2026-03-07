import { type Request, type Response, type NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import type { UploadedFile } from "express-fileupload";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { Prisma } from "../../prisma/generated/prisma/client.js";

import prisma from "../lib/prisma.js";
import ApiError from "../error/ApiError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class WeaponController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const {name, price, brandId, typeId, info} = req.body;
            const img = req.files?.img as UploadedFile;
            let fileName = uuidv4() + ".jpg";
            img.mv(resolve(__dirname, '..', 'static', fileName));
            
            const weapon = await prisma.weapon.create({
                data: {
                    name,
                    price: Number(price),
                    img: fileName,
                    typeId: Number(typeId),
                    brandId: Number(brandId)
                }
            });

            return res.json(weapon);
        } catch(e: unknown) {
            if(e instanceof Error) {
                next(ApiError.badRequest(e.message));
            }
            else {
                next(ApiError.badRequest(String(e)));
            }
        }
    }

    async getAll(req: Request, res: Response) {
        let {brandId, typeId, limit, page} = req.query;
        
        const pageNumber = Number(page) || 1;
        const limitNumber = Number(limit) || 9;
        
        let offset = pageNumber * limitNumber - limitNumber;

        const where: Prisma.WeaponWhereInput = {};
        
        if(brandId) {
            where.brandId = Number(brandId);
        }
        if(typeId) {
            where.typeId = Number(typeId);
        }

        const [weapons, count] = await Promise.all([
            prisma.weapon.findMany({
                where,
                orderBy: {
                    id: "asc"
                },
                take: limitNumber,
                skip: offset
            }),
            prisma.weapon.count({
                where
            })
        ])
        
        return res.json({
            count,
            page: pageNumber,
            limit: limitNumber,
            row: weapons
        });
    }

    async getOne(req: Request, res: Response) {
        
    }
}

export default new WeaponController;