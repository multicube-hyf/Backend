/*
    Route of classrooms /classrooms
    host + api/classrooms
*/

const {createClassroom, getClassrooms, getClassroom, deleteClass, updateClassroom} = require('../controllers/classroomController');

const express = require('express');
const router = express.Router();

router.get('/', getClassrooms);
router.get('/:id', getClassroom);
router.post('/', createClassroom);
router.put('/:id', updateClassroom);
router.delete('/:id', deleteClass);

module.exports = router;