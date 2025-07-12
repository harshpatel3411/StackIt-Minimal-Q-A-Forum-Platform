import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema({
  answerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Answer', required: true },
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  voteType: { type: String, enum: ['upvote', 'downvote'], required: true }
}, { timestamps: true });

const Vote = mongoose.model('Vote', voteSchema);
export default Vote;
