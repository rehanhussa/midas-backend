import mongoose from 'mongoose';

const tradeSchema = new mongoose.Schema({
    symbol: String,
    quantity: Number,
    stake: Number,
    type: Boolean, // 0 represents Sell, 1 represents Buy
},
{
    timestamps: true
});

export default mongoose.model('Trade', tradeSchema);