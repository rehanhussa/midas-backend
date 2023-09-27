import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    hash: String,
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