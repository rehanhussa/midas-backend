import { Router } from "express";

import * as stocksController from '../controllers/stocks.js'
import verifyAuth from "../middlewares/veryAuth.js";

const router = Router()

router.get('/:id', verifyAuth, stocksController.getUserById)
router.post('/:id', verifyAuth, stocksController.createStock)
router.put('/:id', verifyAuth, stocksController.editStock)
router.delete('/:id', verifyAuth, stocksController.deleteStock)

export default router
