import {Router} from "express";

import authRouter from "../modules/auth/authRouter.js";
import weaponRouter from "../modules/weapon/weaponRouter.js";
import typeRouter from "../modules/type/typeRouter.js";
import brandRouter from "../modules/brand/brandRouter.js";
import basketRouter from "../modules/basket/basketRoutes.js";
import orderRouter from "../modules/order/orderRouter.js";

const rootRouter: Router = Router();

rootRouter.use('/user', authRouter);
rootRouter.use('/weapon', weaponRouter);
rootRouter.use('/type', typeRouter);
rootRouter.use('/brand', brandRouter);
rootRouter.use('/basket', basketRouter);
rootRouter.use('/order', orderRouter);

export default rootRouter;