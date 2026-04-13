import type { Request, Response } from "express";
import brandService from "./brandService.js";

class BrandController {
  async create(req: Request, res: Response) {
    const brand = await brandService.create(req.body.name);
    return res.json(brand);
  }

  async getAll(req: Request, res: Response) {
    const brands = await brandService.getAll();
    return res.json(brands);
  }
}

export default new BrandController();