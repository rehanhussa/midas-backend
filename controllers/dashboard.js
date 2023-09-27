import User from '../models/users.js'; 

// Fetch all stocks associated with the authenticated user
export async function getUserStocks(req, res) {
    try {
        // Assuming req.user.id contains the authenticated user's ID
        const userId = req.user.id;

        // Fetch the user and populate the stocks
        const user = await User.findById(userId).populate('stocks');

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
