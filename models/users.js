import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    hash: String,
    balance: Number,
    stocks: [{
        ref: 'UserStock',
        type: mongoose.Schema.Types.ObjectId,
    }],
    trades: [{
        ref: 'Trade',
        type: mongoose.Schema.Types.ObjectId,
    }],
});

export default mongoose.model('User', userSchema);
