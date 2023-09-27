import mongoose from mongoose

const userStockSchema = new mongoose.Schema({
    symbol: String,
    quantity: Number,
    //your 'position'/stake is the quantity of a stock you own
    stake: Number
});

export default mongoose.model('UserStock', userStockSchema);
