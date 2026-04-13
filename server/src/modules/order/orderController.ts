import type { Response } from "express";
import type { AuthRequest } from "../../common/middleware/authMiddleware.js";

import orderService from "./orderService.js";

class OrderController {
  async create(req: AuthRequest, res: Response) {
    const order = await orderService.create(req.user!.id);

    return res.json({
      message: "Order created",
      orderId: order.id,
      code: order.code,
    });
  }

  async getUserOrders(req: AuthRequest, res: Response) {
    const orders = await orderService.getUserOrders(req.user!.id);
    return res.json(orders);
  }

  async getAll(req: AuthRequest, res: Response) {
    const orders = await orderService.getAll();
    return res.json(orders);
  }

  async confirm(req: AuthRequest, res: Response) {
    const { orderId, code } = req.body;

    const updated = await orderService.confirm(orderId, code);

    return res.json({
      message: "Order confirmed",
      order: updated,
    });
  }

  async cancel(req: AuthRequest, res: Response) {
    const { orderId } = req.body;

    const updated = await orderService.cancel(orderId);

    return res.json({
      message: "Order cancelled",
      order: updated,
    });
  }
}

export default new OrderController();