import { type Response } from "express";
import prisma from "../common/lib/prisma.js";
import type { AuthRequest } from "../common/middleware/authMiddleware.js";

class BasketController {
    async add(req: AuthRequest, res: Response) {
        const { weaponId } = req.body;
        const userId = req.user!.id;

        let basket = await prisma.basket.findFirst({
            where: { userId }
        });

        if (!basket) {
            basket = await prisma.basket.create({
                data: { userId }
            });
        }

        const item = await prisma.basketWeapon.findFirst({
            where: {
                basketId: basket.id,
                weaponId
            }
        });

        if (item) {
            await prisma.basketWeapon.update({
                where: { id: item.id },
                data: { quantity: item.quantity + 1 }
            });
        } else {
            await prisma.basketWeapon.create({
                data: {
                    basketId: basket.id,
                    weaponId,
                    quantity: 1
                }
            });
        }

        return res.json({ message: "Добавлено в корзину" });
    }

    async get(req: AuthRequest, res: Response) {
        const userId = req.user!.id;

        const basket = await prisma.basket.findFirst({
            where: { userId },
            include: {
                basketWeapons: {
                    include: {
                        weapon: true
                    }
                }
            }
        });

        if (basket) {
            return res.json(basket);
        }

        return res.json({
            id: null,
            userId,
            basketWeapons: []
        });
    }

    async removeOne(req: AuthRequest, res: Response) {
        const userId = req.user!.id;
        const { weaponId } = req.params;

        const weaponIdNum = Number(weaponId);
        if (isNaN(weaponIdNum)) {
            return res.status(400).json({ message: "Невірний ID товару" });
        }

        const basket = await prisma.basket.findUnique({
            where: { userId }
        });

        if (!basket) {
            return res.status(404).json({ message: "Кошик не знайдений" });
        }

        const item = await prisma.basketWeapon.findFirst({
            where: {
                basketId: basket.id,
                weaponId: weaponIdNum
            }
        });

        if (!item) {
            return res.status(404).json({ message: "Товар в кошику не знайдений" });
        }

        if (item.quantity > 1) {
            await prisma.basketWeapon.update({
                where: { id: item.id },
                data: { quantity: item.quantity - 1 }
            });
        } else {
            await prisma.basketWeapon.delete({
                where: { id: item.id }
            });
        }

        return res.json({ message: "Кількість товару зменшена" });
    }

    async remove(req: AuthRequest, res: Response) {
        const userId = req.user!.id;
        const { weaponId } = req.params;

        const basket = await prisma.basket.findFirst({
            where: { userId }
        });

        if (!basket) {
            return res.status(404).json({ message: "Кошик не знайдений" });
        }

        await prisma.basketWeapon.deleteMany({
            where: {
                basketId: basket.id,
                weaponId: Number(weaponId)
            }
        });

        return res.json({ message: "Видалено" });
    }
}

export default new BasketController();