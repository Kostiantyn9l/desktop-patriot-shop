import {Router} from "express";

import userRouter from "./userRouter.js";
import weaponRouter from "./weaponRouter.js";
import typeRouter from "./typeRouter.js";
import brandRouter from "./brandRouter.js";

const rootRouter: Router = Router();

rootRouter.use('/user', userRouter);
rootRouter.use('/weapon', weaponRouter);
rootRouter.use('/type', typeRouter);
rootRouter.use('/brand', brandRouter);

export default rootRouter;