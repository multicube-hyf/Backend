const express = require('express');
const {check} = require('express-validator');


const {getAllUsers, getOneUser, createNewUser, updateUser, deleteUser} = require('../controllers/userController');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = express.Router();

router.get('/', validateJWT ,getAllUsers);
router.get('/:id', getOneUser);
router.post('/register', createNewUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
