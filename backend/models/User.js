import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isVerified: { type: Boolean, default: false },
        mcpAPI: { type: String, default: "" },
        createdAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

userSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400, partialFilterExpression: { isVerified: false } });
userSchema.index({ mcpAPI: 1 }, { unique: true });
export default mongoose.model('User', userSchema);