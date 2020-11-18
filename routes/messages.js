const express = require('express');
const {getAllMessages, getOneMessage, createNewMessage, updateMessage, deleteMessage} = require('../controllers/messageController');

const router = express.Router();

router.get('/', getAllMessages);
router.get('/:id', getOneMessage);
router.post('/', createNewMessage);
router.put('/:id', updateMessage);
router.delete('/:id', deleteMessage);

module.exports = router;
