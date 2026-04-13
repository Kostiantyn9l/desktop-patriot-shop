import type { Response } from "express";
import prisma from "../common/lib/prisma.js";
import type { AuthRequest } from "../common/middleware/authMiddleware.js";

class OrderController {

    async create(req: AuthRequest, res: Response) {
        const userId = req.user!.id;

        const basket = await prisma.basket.findUnique({
            where: { userId },
            include: {
                basketWeapons: {
                    include: {
                        weapon: true
                    }
                }
            }
        });

        if (!basket || basket.basketWeapons.length === 0) {
            return res.status(400).json({ message: "Корзина пуста" });
        }

        const total = basket.basketWeapons.reduce((sum, item) => {
            return sum + item.weapon.price * item.quantity;
        }, 0);

        const code = Math.random().toString(36).substring(2, 8).toUpperCase();

        const order = await prisma.order.create({
            data: {
                userId,
                code,
                total,
                items: {
                    create: basket.basketWeapons.map(item => ({
                        weaponId: item.weaponId,
                        quantity: item.quantity,
                        price: item.weapon.price
                    }))
                }
            },
            include: {
                items: true
            }
        });

        await prisma.basketWeapon.deleteMany({
            where: { basketId: basket.id }
        });

        return res.json({
            message: "Замовлення створено",
            orderId: order.id,
            code: order.code
        });
    }

    async getUserOrders(req: AuthRequest, res: Response) {
        const userId = req.user!.id;

        const orders = await prisma.order.findMany({
            where: { userId },
            include: {
                items: {
                    include: {
                        weapon: true
                    }
                }
            },
            orderBy: { createdAt: "desc" }
        });

        return res.json(orders);
    }

    async getAll(req: AuthRequest, res: Response) {
        const orders = await prisma.order.findMany({
            include: {
                user: { select: { name: true, email: true } },
                items: { include: { weapon: true } }
            },
            orderBy: { createdAt: "desc" }
        });

        return res.json(orders);
    }

    async confirm(req: AuthRequest, res: Response) {
        const { orderId, code } = req.body;

        const order = await prisma.order.findUnique({
            where: { id: orderId }
        });

        if (!order) {
            return res.status(404).json({ message: "Замовлення не знайдено" });
        }

        if (order.code !== code) {
            return res.status(400).json({ message: "Невірний код" });
        }

        if (order.status === "COMPLETED") {
            return res.status(400).json({ message: "Замовлення вже підтверджено" });
        }

        const updated = await prisma.order.update({
            where: { id: orderId },
            data: { status: "COMPLETED" }
        });

        return res.json({
            message: "Замовлення підтверджено",
            order: updated
        });
    }

    async cancel(req: AuthRequest, res: Response) {
        const { orderId } = req.body;

        const order = await prisma.order.findUnique({
            where: { id: orderId }
        });

        if (!order) {
            return res.status(404).json({ message: "Замовлення не знайдено" });
        }

        if (order.status === "CANCELLED") {
            return res.status(400).json({ message: "Замовлення вже скасовано" });
        }

        const updated = await prisma.order.update({
            where: { id: orderId },
            data: { status: "CANCELLED" }
        });

        return res.json({
            message: "Замовлення скасовано",
            order: updated
        });
    }
}

export default new OrderController();