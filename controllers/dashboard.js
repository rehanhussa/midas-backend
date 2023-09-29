import User from '../models/users.js'; 
import UserStocks from '../models/userstocks.js';

// Fetch all stocks associated with the authenticated user
export async function getUserStocks(req, res) {
    try {
        console.log('received data:', req.id)
        // Assuming req.user.id contains the authenticated user's ID
        const userId = req.id;

        // Fetch the user and populate the stocks
        const user = await User.findById(userId).populate('stocks');

        // console.log(user)

        const allStocks = user.stocks.map(async (stock) => {
            await UserStocks.findById(stock).populate('stocks');
        })

        console.log(allStocks)

        // If user doesn't exist or stocks are not present
        if (!user || !user.stocks) {
            return res.status(404).json({
                status: 404,
                message: "No stocks found for the user."
            });
        }

        // Send the stocks data as a response
        return res.status(200).json({
            status: 200,
            stocks: user.stocks
        });

    } catch (error) {
        res.status(400).json({
            status: 400,
            message: `Unable to get UserStocks`,
            db_message: error.message
        });
    }
}
