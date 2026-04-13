import type { Response } from "express";
import type { AuthRequest } from "../../common/middleware/authMiddleware.js";

import basketService from "./basketService.js";

class BasketController {
  async add(req: AuthRequest, res: Response) {
    await basketService.add(req.user!.id, req.body.weaponId);

    return res.json({ message: "Добавлено в корзину" });
  }

  async get(req: AuthRequest, res: Response) {
    const basket = await basketService.get(req.user!.id);
    return res.json(basket);
  }

  async removeOne(req: AuthRequest, res: Response) {
    const weaponId = Number(req.params.weaponId);

    if (isNaN(weaponId)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    await basketService.removeOne(req.user!.id, weaponId);

    return res.json({ message: "Количество уменьшено" });
  }

  async remove(req: AuthRequest, res: Response) {
    const weaponId = Number(req.params.weaponId);

    await basketService.remove(req.user!.id, weaponId);

    return res.json({ message: "Удалено" });
  }
}

export default new BasketController();