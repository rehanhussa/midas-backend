import Trade from '../models/trade.js';

const investmentController = {

    // Combine both buying and selling into one action
    tradeStock: async (req, res) => {
        try {
            const { symbol, amount, cost, type } = req.body;

            // Optional: Check if the type is valid
            if (!['BUY', 'SELL'].includes(type)) {
                return res.status(400).json({ message: "Invalid trade type." });
            }

            // Optional: Check if the user has enough stocks to sell
            if (type === 'SELL') {
                // Implement your logic to check user's stocks here
            }

            const newTrade = new Trade({
                symbol,
                amount,
                cost,
                type,
            });

            await newTrade.save();

            res.status(201).json({
                message: `Stock ${type.toLowerCase()}ed successfully!`,
                data: newTrade
            });

        } catch (error) {
            res.status(500).json({ message: `Error ${req.body.type.toLowerCase()}ing stock`, error });
        }
    },

    getInvestmentData: async (req, res) => {
        try {
            // Assuming you have the user's id in req.user.id after authentication.
            const trades = await Trade.find({ userId: req.user.id });

            // Compute total investment or any other logic you need.
            // Send back the data to the user.

            res.status(200).json(trades);

        } catch (error) {
            res.status(500).json({ message: "Error fetching investment data", error });
        }
    }
};

export default investmentController;


// updated investment router with this line // Here's where you'd add the new route:

//router.post('/trade', verifyAuth, investmentController.tradeStock);