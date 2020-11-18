/*
    Route of users /users
    host + api/users
*/

const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const {createUser, getUsers, getStudents, getStudent} = require('../controllers/user-test-controller');
const {validateInputs} = require('../middlewares/validate-inputs');

router.post('/register',
[  //middleware
    check('username', 'username is mandatory').not().isEmpty(),
    check('name', 'Name is mandatory').not().isEmpty(),
    check('lastName', 'lastname is mandatory').not().isEmpty(),
    check('role', 'role is mandatory').not().isEmpty(),
    check('password', 'Password should contain at least 6 characters').isLength({min:6}),
    validateInputs
  ], 
    createUser);
router.get('/', getUsers);
router.get('/students', getStudents);
router.get('/students/:id', getStudent);


module.exports = router;