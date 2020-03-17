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

const deleteMessage = (req, res, next) => {
  MessageSchema.findOneAndDelete({_id: req.params.id}).then(data => {
    if (!data) {
      res.status(401).json({
        message: "data not found"
      })
    }
    res.status(201).json({
      message: "data deleted",
      data
    })
  })
}

module.exports = {
  addMessage,
  listMessage,
  deleteMessage
}