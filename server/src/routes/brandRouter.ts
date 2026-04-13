import express from "express";
import brandController from "../modules/brand/brandController.js";
import checkRoleMiddleware from "../common/middleware/checkRoleMiddleware.js";

const router = express.Router();

router.post('/', checkRoleMiddleware("ADMIN"), brandController.create);
router.get('/', brandController.getAll);

export default router;