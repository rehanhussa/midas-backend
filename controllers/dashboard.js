import UserStocksModel from '../models/userstocks.js'
import User from '../models/users.js';
import StockModel from '../models/userstocks.js'

export async function getUserStocksById(req, res) {
    try {
        // Find the user first, then populate the stocks. This assumes the relationship between User and UserStocks
        const user = await User.findById(req.id).populate('stocks');
        return res.status(200).json(user.stocks);
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: `Unable to get UserStocks`,
            db_message: error.message
        });
    }
}

export async function getStockById(req, res) {
    try {
        const id = req.params.id
        const stock = await StockModel.findById(id).populate('stocks')
        return res.status(200).json(stock);
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: `Unable to get Stock by ID`,
            db_message: error.message
        })
    }
}