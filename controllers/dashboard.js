import User from '../models/users.js';

// Fetch all stocks associated with the authenticated user
export async function getUserStocks(req, res) {
    try {
        console.log('received userid right over heer:', req.query.id)
        // Assuming req.user.id contains the authenticated user's ID
        const userId = req.query.id;

        // Fetch the user and populate the stocks
        const user = await User.findById(userId).populate('stocks');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        console.log(user.stocks)

        // Send the stocks data as a response
        return res.status(200).json({
            status: 200,
            userStocks: user.stocks
        });

    } catch (error) {
        res.status(400).json({
            status: 400,
            message: `Unable to get UserStocks`,
            db_message: error.message
        });
    }
}
