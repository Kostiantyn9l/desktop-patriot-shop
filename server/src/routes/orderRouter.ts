import express from "express";
import orderController from "../controllers/ordersController.js";
import authMiddleware from "../common/middleware/authMiddleware.js";
import checkRoleMiddleware from "../common/middleware/checkRoleMiddleware.js";

const router = express.Router();

router.post('/', authMiddleware, orderController.create);
router.get('/', authMiddleware, orderController.getUserOrders);
router.get('/all', checkRoleMiddleware("ADMIN"), orderController.getAll);
router.post('/confirm', checkRoleMiddleware("ADMIN"), orderController.confirm);
router.post('/cancel', checkRoleMiddleware("ADMIN"), orderController.cancel);

export default router;