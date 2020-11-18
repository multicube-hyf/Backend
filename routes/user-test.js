/*
    Route of users /users
    host + api/users
*/

const express = require('express');
const router = express.Router();

const {createUser, getUsers, getStudents, getStudent} = require('../controllers/user-test-controller');

router.post('/register', createUser);
router.get('/', getUsers);
router.get('/students', getStudents);
router.get('/students/:id', getStudent);


module.exports = router;