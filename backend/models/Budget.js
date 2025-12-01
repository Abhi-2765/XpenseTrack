import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['monthly', 'yearly'],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    emoji: {
        type: String,
        default: '💰'
    },
    allotedAmount: {
        type: Number,
        required: true
    },
    spentAmount: {
        type: Number,
        default: 0
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

export default mongoose.model('Budget', budgetSchema);