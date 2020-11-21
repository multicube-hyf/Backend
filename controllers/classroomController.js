const Classroom = require('../models/ClassroomModel');

const createClassroom = async (req, res) => {
	try {
		let classroom = new Classroom(req.body);
		classroom.adminId = req.userId;

		const savedClassroom = await classroom.save();

		res.status(201).json({
			msg: 'classroom created successfully',
			id: savedClassroom._id,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Please talk to the administrator',
		});
	}
};

const getClassrooms = async (req, res) => {
	try {
		let data = await Classroom.find();

		let classrooms = [];

		data.map((classroom) => {
			const { id, title, description } = classroom;
			const classroomInfo = {
				id,
				title,
				description,
			};
			classrooms.push(classroomInfo);
		});

		res.status(200).json({
			classrooms,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Please talk to the administrator',
		});
	}
};

const getClassroom = async (req, res) => {
	const { id: classId } = req.params;

	try {
		let classroom = await Classroom.findById(classId);

		if (!classroom) {
			return res.status(400).json({
				msg: 'There is no classroom with that ID',
			});
		}

		const {
			students_ids,
			teachers_ids,
			messages,
			title,
			description,
		} = classroom;

		res.status(200).json({
			classroom: {
				students_ids,
				teachers_ids,
				messages,
				title,
				description,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Please talk to the administrator',
		});
	}
};

const deleteClass = async (req, res) => {
	const { id: classId } = req.params;

	try {
		let classroomToDeleted = await Classroom.findByIdAndDelete(classId);

		if (!classroomToDeleted) {
			return res.status(400).json({
				msg: 'There is no classroom with that ID',
			});
		}

		res.status(200).json({
			msg: 'Classroom deleted successfully',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Please talk to the administrator',
		});
	}
};

const updateClassroom = async (req, res) => {
	const { id: classId } = req.params;

	try {
		const classroom = await Classroom.findById(classId);

		if (!classroom) {
			return res.status(404).json({
				msg: 'There is no classroom with that ID',
			});
		}

		const newClass = {
			...req.body,
		};

		await Classroom.findByIdAndUpdate(classId, newClass, { new: true });

		res.status(200).json({
			msg: 'Classroom updated successfully',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Please talk to the administrator',
		});
	}
};

module.exports = {
	createClassroom,
	getClassrooms,
	getClassroom,
	deleteClass,
	updateClassroom,
};
