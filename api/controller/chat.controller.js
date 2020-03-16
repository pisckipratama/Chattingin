const MessageSchema = require('../models/Message');

const addMessage = (req, res, next) => {
  const newMessage = new MessageSchema({
    content: req.body.content,
    name: req.body.name
  })

  newMessage.save().then(data => {
    res.status(200).json(data)
  }).catch(err => res.status(500).json(err));
}

const listMessage = (req, res, next) => {
  MessageSchema.find().then(chatData => {
    res.json({
      success: true,
      chatData
    })
  }).catch(err => res.json({
    success: false,
    message: err
  }))
}

module.exports = {
  addMessage,
  listMessage
}