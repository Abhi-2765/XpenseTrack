import mongoose from 'mongoose';

const summarySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',        
        required: true
    },
    totalBalance: {
        type: Number,
        required: true,
        default: 0
    },
    totalSavings: {
        type: Number,
        required: true,
        default: 0
    }
});

const Summary = mongoose.model('Summary', summarySchema);

export default Summary;