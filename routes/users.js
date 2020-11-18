const express = require('express');
const {getAllUsers, getOneUser, createNewUser, updateUser, deleteUser} = require('../controllers/userController');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getOneUser);
router.post('/register', createNewUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
