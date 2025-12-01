import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    savings: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Report', reportSchema);