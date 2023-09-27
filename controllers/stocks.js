import UserStocksModel from '../models/userstocks.js';
import Trade from '../models/trades.js';
import User from '../models/users.js';

// If there's a separate stock model:
import StockModel from '../models/stocks.js';  // Adjust this path based on your actual model's location.

// If you intend to use JWT in this file:
import jwt from 'jsonwebtoken';


export async function getStockBySymbol(req, res) {
    try {
        const symbol = req.params.symbol;
        const stock = await StockModel.findOne({ symbol: symbol });  // assuming the symbol is the unique identifier for stocks.
        return res.status(200).json(stock); 
    } catch (error) {
        res.status(404).json({
            status: 404,
            message: error.message
        });
    }
}

export async function getUserStocks(req, res) {
    try {
        const userStocks = await UserStocksModel.find({ user: req.id });
        return res.status(200).json(userStocks);
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: `Unable to get UserStocks`,
            db_message: error.message
        });
    }
}

export async function purchaseStock(req, res) {
    try {
        const userId = req.id; // Assuming you have a middleware that sets the user ID.
        const { symbol, quantity, purchasePrice } = req.body; // Extract stock symbol, number of shares, and purchase price from the request.

        // 1. Create a trade record
        const trade = new Trade({
            symbol,
            amount: quantity,
            cost: quantity * purchasePrice,
            type: 'purchase'
        });
        await trade.save();

        // 2. Update the user's stocks
        let userStock = await UserStocksModel.findOne({ user: userId, symbol });
        
        if (userStock) {
            // If user already owns this stock, update the quantity.
            userStock.quantity += quantity;
            userStock.trades.push(trade._id); // Add the new trade to the trades list.
            await userStock.save();
        } else {
            // If user doesn't own this stock, create a new entry for them.
            userStock = new UserStocksModel({
                user: userId,
                symbol,
                quantity,
                trades: [trade._id]
            });
            await userStock.save();
        }

        // 3. Deduct cost from user's capital (Assuming there's a 'capital' field in the User model)
        const user = await User.findById(userId);
        user.capital -= quantity * purchasePrice; // Deducting the cost of purchased stocks.
        await user.save();

        return res.status(200).json({ message: "Stock purchased successfully!" });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: "Failed to purchase stock.",
            error_message: error.message
        });
    }
}


export async function sellSomeStocks(req, res) {
    try {
        const userId = req.id; // Assuming you have a middleware that sets the user ID.
        const { symbol, quantity, salePrice } = req.body; // Extract stock symbol, number of shares, and sale price from the request.

        // 1. Create/update a trade record
        const trade = new Trade({
            symbol,
            amount: -quantity,  // Negative indicates sale.
            cost: quantity * salePrice,
            type: 'sale'
        });
        await trade.save();

        // 2. Update the user's stocks
        let userStock = await UserStocksModel.findOne({ user: userId, symbol });

        if (!userStock || userStock.quantity < quantity) {
            // User either doesn't have this stock or doesn't have enough of it.
            return res.status(400).json({ message: "You can't sell more stocks than you own." });
        }

        userStock.quantity -= quantity; // Deduct the sold quantity.
        userStock.trades.push(trade._id); // Add the new trade to the trades list.
        await userStock.save();

        if (userStock.quantity === 0) {
            // Optional: Delete the user stock record if quantity is zero. 
            // Alternatively, you can keep it for historical data.
            await userStock.remove();
        }

        // 3. Add revenue to user's capital (Assuming there's a 'capital' field in the User model)
        const user = await User.findById(userId);
        user.capital += quantity * salePrice; // Adding the revenue from sold stocks.
        await user.save();

        return res.status(200).json({ message: "Stocks sold successfully!" });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: "Failed to sell stocks.",
            error_message: error.message
        });
    }
}


export async function sellAllStocks(req, res) {
    try {
        const userId = req.id; // Assuming you have a middleware that sets the user ID.
        const { symbol, salePrice } = req.body; // Extract stock symbol and sale price from the request.

        // 1. Find the user's stocks for the given symbol
        const userStock = await UserStocksModel.findOne({ user: userId, symbol });

        if (!userStock) {
            // User doesn't have this stock.
            return res.status(400).json({ message: "You don't own any stocks of this symbol." });
        }

        const totalRevenue = userStock.quantity * salePrice;

        // 2. Create a trade record
        const trade = new Trade({
            symbol,
            amount: -userStock.quantity,  // Negative indicates sale.
            cost: totalRevenue,
            type: 'sale'
        });
        await trade.save();

        // 3. Remove the user's stock record for the given symbol since they're selling all
        await userStock.remove();

        // 4. Add revenue to user's capital (Assuming there's a 'capital' field in the User model)
        const user = await User.findById(userId);
        user.capital += totalRevenue; // Adding the revenue from sold stocks.
        await user.save();

        return res.status(200).json({ message: "All stocks of this symbol sold successfully!" });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: "Failed to sell all stocks of this symbol.",
            error_message: error.message
        });
    }
}


