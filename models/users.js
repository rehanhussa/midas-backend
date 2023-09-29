import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 5000
    },
    handle: {
        type: String,
        unique: true,
        lowercase: true
    },
    stocks: [{
        ref: 'UserStock',
        type: mongoose.Schema.Types.ObjectId,
    }],
    trades: [{
        ref: 'Trade',
        type: mongoose.Schema.Types.ObjectId
    }]
});

export default mongoose.model('User', userSchema);