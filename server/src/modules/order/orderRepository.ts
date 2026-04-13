import prisma from "../../common/lib/prisma.js";
import { OrderStatus } from "../../../prisma/generated/prisma/enums.js";

class OrderRepository {
  createOrder(data: any) {
    return prisma.order.create({
      data,
      include: { items: true },
    });
  }

  findUserOrders(userId: number) {
    return prisma.order.findMany({
      where: { userId },
      include: {
        items: { include: { weapon: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  findAll() {
    return prisma.order.findMany({
      include: {
        user: { select: { name: true, email: true } },
        items: { include: { weapon: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  findById(id: number) {
    return prisma.order.findUnique({
      where: { id },
    });
  }

  updateStatus(id: number, status: OrderStatus) {
    return prisma.order.update({
      where: { id },
      data: { status },
    });
  }
}

export default new OrderRepository();