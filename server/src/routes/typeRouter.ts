import express from "express";
import typeController from "../controllers/typeController.js";

const router = express.Router();

router.post('/', typeController.create);
router.get('/', typeController.getAll);

export default router;