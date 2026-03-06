import express from "express";
import weaponController from "../controllers/weaponController.js";

const router = express.Router();

router.post('/', weaponController.create);
router.get('/', weaponController.getAll);
router.get('/:id', weaponController.getOne);


export default router;