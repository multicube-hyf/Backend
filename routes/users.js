const express = require('express');
const controllers = require('../controllers/userController');

const router = express.Router();

router.get('/', controllers.getUsers);
router.get('/:id', controllers.getOne);
router.post('/new', controllers.create);
router.put('/:id', controllers.update);
router.delete('/:id', controllers.delete);

module.exports = router;
