import type { Request, Response, NextFunction } from "express";
import type { AuthRequest } from "../../common/middleware/authMiddleware.js";

import authService from "./authService.js";
import ApiError from "../../common/error/ApiError.js";

class AuthController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;

      const data = await authService.register(name, email, password);

      return res.json(data);
    } catch (e) {
      next(ApiError.badRequest(e instanceof Error ? e.message : String(e)));
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const data = await authService.login(email, password);

      return res.json(data);
    } catch (e) {
      next(ApiError.badRequest(e instanceof Error ? e.message : String(e)));
    }
  }

  async checkAuth(req: AuthRequest, res: Response) {
    const data = authService.refresh(req.user);
    return res.json(data);
  }
}

export default new AuthController();