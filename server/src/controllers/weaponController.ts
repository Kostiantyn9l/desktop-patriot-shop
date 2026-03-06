import { type Request, type Response, type NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import type { UploadedFile } from "express-fileupload";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

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
        
    }

    async getOne(req: Request, res: Response) {
        
    }
}

export default new WeaponController;