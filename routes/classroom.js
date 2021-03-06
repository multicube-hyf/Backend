/*
    Route of classrooms /classrooms
    host + api/classrooms
*/
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const {
	createClassroom,
	getClassrooms,
	getClassroom,
	deleteClass,
	updateClassroom,
} = require('../controllers/classroomController');

const { validateInputs } = require('../middlewares/validate-inputs');

const { validateJWT } = require('../middlewares/validate-jwt');

router.get('/', validateJWT, getClassrooms);
router.get('/:id', validateJWT, getClassroom);
router.post(
	'/',
	[
		//middlewares
		check('title', 'title is mandatory').not().isEmpty(),
		validateInputs,
		validateJWT,
	],
	createClassroom
);
router.put('/:id', validateJWT, updateClassroom);
router.delete('/:id', validateJWT, deleteClass);

module.exports = router;
