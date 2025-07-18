import mongoose from 'mongoose';

const ClaimSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  points: Number,
  claimedAt: { type: Date, default: Date.now }
});

const ClaimHistory = mongoose.model('ClaimHistory', ClaimSchema);
export default ClaimHistory;
