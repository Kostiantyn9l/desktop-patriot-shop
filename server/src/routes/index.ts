import express from "express";
import userRouter from "./userRouter.js";
import weaponRouter from "./weaponRouter.js";
import typeRouter from "./typeRouter.js";
import brandRouter from "./brandRouter.js";


const router = express.Router();

router.use('/user', userRouter);
router.use('/weapon', weaponRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);

export default router;