const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  name: String,
  chat: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Message', MessageSchema);