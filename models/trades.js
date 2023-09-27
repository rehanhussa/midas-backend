import mongoose from 'mongoose';

const tradeSchema = new mongoose.Schema({
    symbol: String,
    amount: Number,
    cost: Number,
    type: String
},
    { timestamps: true }
);

export default mongoose.model('Trade', tradeSchema);
