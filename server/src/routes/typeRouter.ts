import express from "express";
import typeController from "../controllers/typeController.js";
import checkRoleMiddleware from "../common/middleware/checkRoleMiddleware.js";

const router = express.Router();

router.post('/', checkRoleMiddleware("ADMIN"), typeController.create);
router.get('/', typeController.getAll);

export default router;