import { Router } from "express";

import * as dashboardController from '../controllers/dashboard.js'
import verifyAuth from "../middlewares/veryAuth.js";

const router = Router()

router.get('/', verifyAuth, dashboardController.getUserStocks)

export default router