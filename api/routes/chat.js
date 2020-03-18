var express = require('express');
var router = express.Router();
var Chat = require('../models/Message');

/* GET list chats. */
router.get('/', (req, res, next) => {
  Chat.find().then((chatData) => {
    res.json({
      error: false,
      chatData
    })
  }).catch((err) => {
    res.json({
      error: true,
      message: err
    })
  });
});

/* POST chats. */
router.post('/', (req, res, next) => {
  Chat.create({ name: req.body.name, chat: req.body.chat }).then((chatItem) => {
    res.json({
      error: false,
      chatAdded: chatItem
    })
  }).catch((err) => {
    res.json({
      err: true,
      message: err
    })    
  });
});

/** DELETE chat */
router.delete('/:id', (req, res, next) => {
  Chat.findOneAndRemove({ _id: req.params.id }).then((item) => {
    res.json({
      error: false,
      chatDeleted: item
    })
  }).catch((err) => {
    res.json({
      error: true,
      message: err
    })
  });
});

module.exports = router;
