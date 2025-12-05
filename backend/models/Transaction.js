import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        amount: { type: Number, required: true },
        type: { type: String, enum: ['income', 'expense'], required: true },
        category: { type: String, required: true },
        date: { type: Date, default: Date.now },
        note: { type: String }
    }, { timestamps: true }
);

transactionSchema.index({ userId: 1, type: "expense", date: -1 });

transactionSchema.index({ userId: 1, type: "income", date: -1 });

transactionSchema.index({ userId: 1, date: -1 });

transactionSchema.index({ userId: 1, category: 1 });

export default mongoose.model('Transaction', transactionSchema);