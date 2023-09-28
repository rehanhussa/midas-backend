import User from '../models/users.js';
import UserStock from '../models/userstocks.js';
import Trade from '../models/trades.js'; 

// Fetch stock associated with a specific symbol
export async function getStockBySymbol(req, res) {
    try {
        const stockData = await getStockData(req.params.id);
        const userStock = await UserStock.findOne({ symbol: req.params.id, user: req.user.id });

        if (!stockData) {
            return res.status(404).json({
                status: 404,
                message: "Stock data not available."
            });
        }

        const responseData = {
            stockInfo: stockData
        };

        if (userStock) {
            const marketValue = stockData.currentPrice * userStock.quantity;
            const todayReturn = (stockData.currentPrice - stockData.openPrice) * userStock.quantity; 
            const averageCost = userStock.stake / userStock.quantity;
            const totalReturn = (stockData.currentPrice - averageCost) * userStock.quantity;

            responseData.userStock = {
                marketValue: marketValue,
                todayReturn: todayReturn,
                totalReturn: totalReturn,
                averageCost: averageCost,
                numberOfShares: userStock.quantity
            };
        }

        return res.status(200).json(responseData);

    } catch (error) {
        res.status(404).json({
            status: 404,
            message: error.message
        });
    }
}


// Allow a user to add a stock to their portfolio
export async function purchaseStock(req, res) {
    try {
        const { symbol, quantity, stake } = req.body;

        // Find an existing stock for the user with the provided symbol
        let stock = await UserStock.findOne({ symbol: symbol, user: req.user.id });

        if (stock) {
            // If the stock already exists for the user, update its quantity and stake
            stock.quantity += quantity;
            stock.stake += stake;
            await stock.save();
        } else {
            // If the stock doesn't exist for the user, create a new one
            stock = new UserStock({ symbol, quantity, stake, user: req.user.id });
            await stock.save();

            const user = await User.findById(req.user.id);
            user.stocks.push(stock);
            await user.save();
        }

        // Record the purchase transaction
        const trade = new Trade({
            symbol,
            amount: quantity,
            cost: stake,
            type: 'BUY'
        });
        await trade.save();

        return res.status(200).json(stock);

    } catch (error) {
        res.status(404).json({
            status: 404,
            message: error.message
        });
    }
}

// Allow a user to sell a specific quantity of a stock
export async function sellSomeStocks(req, res) {
    try {
        const { quantity, stake } = req.body;
        const stock = await UserStock.findOne({ symbol: req.params.id, _id: { $in: req.user.stocks } });

        if (!stock) {
            return res.status(404).json({
                status: 404,
                message: "Stock not found for the user."
            });
        }
        if (stock.quantity < quantity) {
            return res.status(400).json({
                status: 400,
                message: "Not enough stock to sell"
            });
        }

        stock.quantity -= quantity;
        stock.stake -= stake;
        await stock.save();

        // Record the sell transaction
        const trade = new Trade({
            symbol: req.params.id,
            amount: quantity,
            cost: stake,
            type: 'SELL'
        });
        await trade.save();

        return res.status(200).json(stock);

    } catch (error) {
        res.status(404).json({
            status: 404,
            message: error.message
        });
    }
}

// Allow a user to sell all shares of a specific stock
export async function sellAllStocks(req, res) {
    try {
        const stock = await UserStock.findOne({ symbol: req.params.id, _id: { $in: req.user.stocks } });

        if (!stock) {
            return res.status(404).json({
                status: 404,
                message: "Stock not found for the user."
            });
        }

        // Record the sell transaction for all shares
        const trade = new Trade({
            symbol: req.params.id,
            amount: stock.quantity,
            cost: stock.stake,
            type: 'SELL'
        });
        await trade.save();

        // Remove the stock for the user
        await UserStock.findOneAndDelete({ symbol: req.params.id, _id: { $in: req.user.stocks } });

        return res.status(200).json({
            status: 200,
            message: "Stock sold successfully"
        });

    } catch (error) {
        res.status(404).json({
            status: 404,
            message: error.message
        });
    }
}