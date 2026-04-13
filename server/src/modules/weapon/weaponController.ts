import type { Request, Response, NextFunction } from "express";
import ApiError from "../../common/error/ApiError.js";
import weaponService from "./weaponService.js";

class WeaponController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const weapon = await weaponService.createWeapon(req);
      return res.json(weapon);
    } catch (e) {
      next(ApiError.badRequest(e instanceof Error ? e.message : String(e)));
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const data = await weaponService.getAll(req.query);
        return res.json(data);
    } catch (e) {
        next(ApiError.badRequest(e instanceof Error ? e.message : String(e)));
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
        const weapon = await weaponService.getOne(Number(req.params.id));
        return res.json(weapon);
    } catch (e) {
        next(ApiError.badRequest(e instanceof Error ? e.message : String(e)));
    }
  }
}

export default new WeaponController();