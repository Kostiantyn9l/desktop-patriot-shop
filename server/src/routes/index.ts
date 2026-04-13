import {Router} from "express";

import authRouter from "./authRouter.js";
import weaponRouter from "./weaponRouter.js"
import typeRouter from "./typeRouter.js";
import brandRouter from "./brandRouter.js";
import basketRouter from "./basketRoutes.js";
import orderRouter from "./orderRouter.js";

const rootRouter: Router = Router();

rootRouter.use('/user', authRouter);
rootRouter.use('/weapon', weaponRouter);
rootRouter.use('/type', typeRouter);
rootRouter.use('/brand', brandRouter);
rootRouter.use('/basket', basketRouter);
rootRouter.use('/order', orderRouter);

export default rootRouter;