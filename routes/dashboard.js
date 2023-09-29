import { Router } from "express";

import * as dashboardController from '../controllers/dashboard.js'
import * as stocksController from '../controllers/stocks.js'
import verifyAuth from "../middlewares/veryAuth.js";

const router = Router()

router.get('/', verifyAuth, dashboardController.getUserStocks)
// router.get('/:id', verifyAuth, stocksController.getStockBySymbol) // Grab a stock so the endpoint may be /stocks/:id

export default router