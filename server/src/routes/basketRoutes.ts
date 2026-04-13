import express from "express";
import basketController from "../modules/basket/basketController.js";
import authMiddleware from "../common/middleware/authMiddleware.js";

const router = express.Router();

router.post('/add', authMiddleware, basketController.add);
router.get('/', authMiddleware, basketController.get);
router.put('/:weaponId', authMiddleware, basketController.removeOne);
router.delete('/:weaponId', authMiddleware, basketController.remove);

export default router;