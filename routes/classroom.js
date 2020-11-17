/*
    Route of classroom /classroom
    host + api/classroom
*/

const {createClassroom, getClassrooms, getClassroom} = require('../controllers/classroomController');

const express = require('express');
const router = express.Router();

router.post('/', createClassroom);
router.get('/', getClassrooms);
router.get('/:id', getClassroom);

module.exports = router;