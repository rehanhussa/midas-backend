import { Router } from "express";

import * as investmentController from '../controllers/investment.js'
import * as stocksController from '../controllers/stocks.js'
import verifyAuth from "../middlewares/veryAuth.js";

const router = Router()

router.get('/', verifyAuth, investmentController.getInvestmentData)
router.get('/:id', verifyAuth, stocksController.getStockBySymbol) // Grab a stock so the endpoint may be /stocks/:id and the controller might be a stock controller

// Here's where you'd add the new route:
router.post('/trade', verifyAuth, investmentController.tradeStock);

export default router