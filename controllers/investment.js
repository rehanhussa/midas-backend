import User from '../models/users.js';

export async function getUserTrades(req, res) {
    try {
        console.log('received userid right over heer:', req.id)
        const userId = req.id;

        const user = await User.findById(userId).populate('trades');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log(user.trades)

        return res.status(200).json({
            status: 200,
            userTrades: user.trades
        });

    } catch (error) {
        res.status(400).json({
            status: 400,
            message: `Unable to get UserTrades`,
            db_message: error.message
        });
    }
}