const express = require('express');
const {check} = require('express-validator');


const {getAllUsers, getOneUser, createNewUser, updateUser, deleteUser, userLogin} = require('../controllers/userController');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = express.Router();

router.get('/', validateJWT ,getAllUsers);
router.get('/:id', validateJWT, getOneUser);
router.post('/register', createNewUser);
router.post('/login', userLogin);
router.put('/:id', validateJWT,updateUser);
router.delete('/:id', validateJWT,deleteUser);

module.exports = router;
