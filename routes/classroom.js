/*
    Route of classroom /classroom
    host + api/classroom
*/

const {createClassroom} = require('../controllers/classroomController');

const express = require('express');
const router = express.Router();

router.post('/', createClassroom);

module.exports = router;