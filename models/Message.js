const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the message schema
const messageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
  content: String,
}, { _id: false });

// Define the conversation thread schema
const conversationSchema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  messages: [messageSchema],
  lastupdated : {
    type : Date ,
    default : Date.now() 
  }
});

// Create the Conversation model
const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
