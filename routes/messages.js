const express = require('express');
const controllers = require('../controllers/messageController');

const router = express.Router();

router.get('/', controllers.getMessages);
router.get('/:id', controllers.getOne);
router.post('/', controllers.create);
router.put('/:id', controllers.update);
router.delete('/:id', controllers.delete);

module.exports = router;
