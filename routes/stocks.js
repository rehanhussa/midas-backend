import { Router } from "express";

import * as stocksController from '../controllers/stocks.js'
import verifyAuth from "../middlewares/veryAuth.js";

const router = Router()

router.get('/:id', verifyAuth, stocksController.getStockBySymbol)
router.post('/:id', verifyAuth, stocksController.purchaseStock)
router.put('/:id', verifyAuth, stocksController.sellSomeStocks)
router.delete('/:id', verifyAuth, stocksController.sellAllStocks)

export default router
