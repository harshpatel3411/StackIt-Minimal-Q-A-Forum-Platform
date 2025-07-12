import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true }, // Rich text HTML
  tags:        [String],                         // ["React", "MongoDB"]
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Question = mongoose.model('Question', questionSchema);
export default Question;
