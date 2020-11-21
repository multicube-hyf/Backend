const express = require('express');
const { check } = require('express-validator');

const {
	getAllUsers,
	getOneUser,
	createNewUser,
	updateUser,
	deleteUser,
	userLogin,
} = require('../controllers/userController');

const { validateInputs } = require('../middlewares/validate-inputs');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = express.Router();

router.get('/', validateJWT, getAllUsers);
router.get('/:id', validateJWT, getOneUser);
router.post(
	'/register',
	[
		//middleware
		check('username', 'username is mandatory').not().isEmpty(),
		check('name', 'Name is mandatory').not().isEmpty(),
		check('lastName', 'lastname is mandatory').not().isEmpty(),
		check('role', 'role is mandatory').not().isEmpty(),
		check('password','Password should contain at least 6 characters').isLength({ min: 6 }),
		validateInputs,
	],
	createNewUser
);
router.post(
	'/login',
	[
		//middleware
		check('username', 'username is mandatory').not().isEmpty(),
		check('password','Password should contain at least 6 characters').isLength({ min: 6 }),
		validateInputs,
	],
	userLogin
);
router.put('/:id', validateJWT, updateUser);
router.delete('/:id', validateJWT, deleteUser);

module.exports = router;
