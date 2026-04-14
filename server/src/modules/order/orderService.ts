import prisma from "../../common/lib/prisma.js";
import orderRepository from "./orderRepository.js";

class OrderService {
  async create(userId: number) {
    return prisma.$transaction(async (tx) => {
      const basket = await tx.basket.findUnique({
        where: { userId },
        include: {
          basketWeapons: {
            include: { weapon: true },
          },
        },
      });

      if (!basket || basket.basketWeapons.length === 0) {
        throw new Error("Basket is empty");
      }

      const total = basket.basketWeapons.reduce((sum, item) => {
        return sum + item.weapon.price * item.quantity;
      }, 0);

      const code = Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

      const order = await tx.order.create({
        data: {
          userId,
          code,
          total,
          items: {
            create: basket.basketWeapons.map((item) => ({
              weaponId: item.weaponId,
              quantity: item.quantity,
              price: item.weapon.price,
            })),
          },
        },
        include: { items: true },
      });

      await tx.basketWeapon.deleteMany({
        where: { basketId: basket.id },
      });

      return order;
    });
  }

  async getUserOrders(userId: number) {
    return orderRepository.findUserOrders(userId);
  }

  async getAll() {
    return orderRepository.findAll();
  }

  async confirm(orderId: number, code: string) {
    const order = await orderRepository.findById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    if (order.code !== code) {
      throw new Error("Invalid code");
    }

    if (order.status === "COMPLETED") {
      throw new Error("Already completed");
    }

    return orderRepository.updateStatus(orderId, "COMPLETED");
  }

  async cancel(orderId: number) {
    const order = await orderRepository.findById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    if (order.status === "CANCELLED") {
      throw new Error("Already cancelled");
    }

    return orderRepository.updateStatus(orderId, "CANCELLED");
  }
}

export default new OrderService();