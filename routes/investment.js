import { Router } from "express";

import * as investmentController from '../controllers/investment.js'
import verifyAuth from "../middlewares/veryAuth.js";

const router = Router()

router.get('/', verifyAuth, investmentController.getUserTrades)

export default router