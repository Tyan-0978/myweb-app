import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  name: {
    type: String
  },
  body: {
    type: String
  },
  category: {
    type: String
  },
  time: {
    type: String,
    default: Date().substring(0,24)
  }
}, { collection: 'chat' });

const ChatMessage = mongoose.model('ChatMessage', messageSchema);

export default ChatMessage;
