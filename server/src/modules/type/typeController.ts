import type { Request, Response } from "express";
import typeService from "./typeService.js";

class TypeController {
  async create(req: Request, res: Response) {
    const type = await typeService.create(req.body.name);
    return res.json(type);
  }

  async getAll(req: Request, res: Response) {
    const types = await typeService.getAll();
    return res.json(types);
  }
}

export default new TypeController();