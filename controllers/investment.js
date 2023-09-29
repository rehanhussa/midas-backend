import User from '../models/users.js';  // Assuming this is the path to your user model

export async function getInvestmentData(req, res) {
    try {
        // Assuming req.user.id contains the authenticated user's ID
        const userId = req.body.user.id;

        // Fetch the user, populate stocks and trades
        const user = await User.findById(userId)
            .populate('stocks')
            .populate({
                path: 'trades',
                options: {
                    sort: { 'createdAt': -1 }  // sort by createdAt in descending order for a chronological history
                }
            });

        // If user doesn't exist or neither stocks nor trades are present
        if (!user || (!user.stocks && !user.trades)) {
            return res.status(404).json({
                status: 404,
                message: "No investment data found for the user."
            });
        }

        // Send the stocks and trades data as a response
        return res.status(200).json({
            status: 200,
            stocks: user.stocks,
            tradeHistory: user.trades
        });

    } catch (error) {
        res.status(400).json({
            status: 400,
            message: `Unable to get investment data`,
            db_message: error.message
        });
    }
}
