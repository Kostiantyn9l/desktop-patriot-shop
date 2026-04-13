import express from "express";
import weaponController from "../controllers/weaponController.js";
import checkRoleMiddleware from "../common/middleware/checkRoleMiddleware.js";

const router = express.Router();

router.post('/', checkRoleMiddleware("ADMIN"), weaponController.create);
router.get('/', weaponController.getAll);
router.get('/:id', weaponController.getOne);


export default router;