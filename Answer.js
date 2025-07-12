import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  userId:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content:    { type: String, required: true }, // Rich text HTML
  votes:      { type: Number, default: 0 }
}, { timestamps: true });

const Answer = mongoose.model('Answer', answerSchema);
export default Answer;


// user-.68722803be1e69285be26a1e

// msg->6872282fbe1e69285be26a20



// http://localhost:8000/api/users/register
// http://localhost:8000/api/users/questions
// http://localhost:8000/api/answers

// http://localhost:8000/api/users/login
// http://localhost:8000/api/users/logout


// register->
// {
//   "username": "harsh123",
//   "email": "harsh@example.com",
//   "password": "testpass"
// }



// login-


//  "email": "bansi@example.com",
//    "password": "bansipatel"

// question->
// {
//   "title": "What is useEffect in React?",
//   "description": "<p>Can someone explain how <b>useEffect</b> works?</p>",
//   "tags": ["React", "Hooks"],
//   "userId": "PASTE_REGISTERED_USER_ID_HERE"
// }


// answer-
// {
//   "questionId": "PASTE_QUESTION_ID_HERE",
//   "userId": "PASTE_REGISTERED_USER_ID_HERE",
//   "content": "<p>useEffect runs side effects after rendering...</p>"
// }
