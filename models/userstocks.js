import mongoose from mongoose

const userStockSchema = new mongoose.Schema({
    symbol: String,
    quantity: Number,
    //your 'position'/stake is the quantity of a stock you own
    stake: Number,
    trades: [{
        ref: 'Trade',
        type: mongoose.Schema.Types.ObjectId,
    }],
});

export default mongoose.model('UserStock', userStockSchema);
