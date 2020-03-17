var express = require('express');
var router = express.Router();
var chat = require('../controller/chat.controller');

/* GET list chats. */
router.get('/', chat.listMessage);

/* POST chats. */
router.post('/', chat.addMessage);

/** DELETE chat */
router.delete('/:id', chat.deleteMessage);

module.exports = router;
