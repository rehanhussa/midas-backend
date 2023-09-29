import mongoose from 'mongoose';

const userStockSchema = new mongoose.Schema({
    symbol: String,
    quantity: Number,
    stake: Number
});

export default mongoose.model('UserStock', userStockSchema);