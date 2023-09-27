import User from '../models/users.js';
import UserStock from '../models/userstocks.js';

// Fetch stock associated with a specific symbol for a user
export async function getStockBySymbol(req, res) {
    try {
        const user = await User.findById(req.user.id).populate({
            path: 'stocks',
            match: { symbol: req.params.id }
        });

        if (!user || user.stocks.length === 0) {
            //
            return res.status(404).json({
                status: 404,
                message: "Stock not found for the user."
            });
        }

        return res.status(200).json(user.stocks[0]);

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
