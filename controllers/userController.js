const User = require('../models/UserModel');
const Student = require('../models/StudentModel');
const bcrypt = require('bcrypt');
const moment = require('moment');

const { generateJWT } = require('../helpers/jwt');

const controllers = {
	// Get all users
	getAllUsers: async (req, res) => {
		try {
			let data = await User.find();

			let users = [];

			data.forEach((user) => {
				const { _id, username, role, lastConnection } = user;
				const userInfo = { _id, username, role, lastConnection };
				users.push(userInfo);
			});

			res.status(200).json({
				users,
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({
				msg: 'There was an error, please contact admin',
			});
		}
	},

	// Get Single user
	getOneUser: async (req, res) => {
		const studentId = req.params.id;
		try {
			const student = await Student.findById(studentId).populate('user');
			
			if (!student) {
				return res.status(404).json({
					msg: 'There is no user with that ID',
				});
			}

			const { progress, user } = student;
			const {name, lastName, lastConnection} = user;

			res.status(200).json({
				name,
				lastName,
				progress,
				lastConnection,
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({
				msg: 'There was an error, please contact admin',
			});
		}
	},

	userLogin: async (req, res) => {
		const { username, password } = req.body;

		try {
			const user = await User.findOne({ username });

			if (!user) {
				return res.status(404).json({
					msg: 'The username does not exist',
				});
			}

			const validPassword = bcrypt.compareSync(password, user.password);

			if (!validPassword) {
				return res.status(400).json({
					msg: 'Invalid password',
				});
			}


			//set last connection
			user.lastConnection = moment().format('MMMM Do YYYY, h:mm:ss a');

			await User.findByIdAndUpdate(user._id, user);

			const token = await generateJWT(user._id, user.name);

			res.json({
				name: user.name,
				token,
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({
				ok: false,
				msg: 'Please talk to the administrator',
			});
		}
	},

	//CREATE users
	createNewUser: async (req, res) => {
		const { role, username, password } = req.body;

		try {
			let user = await User.findOne({ username });

			if (user) {
				return res.status(400).json({
					msg: 'Username already in use',
				});
			}

			user = new User(req.body);

			//encrypt password
			const salt = bcrypt.genSaltSync();

			user.password = bcrypt.hashSync(password, salt);

			let savedUser = await user.save();

			//token
			const token = await generateJWT(savedUser._id, user.name);

			if (role === 'student') {
				let student = new Student({
					...req.body,
					user: savedUser._id,
				});

				await student.save();

				return res.status(201).json({
					msg: 'User created successfully',
					token,
				});
			}

			res.json({
				msg: 'User created successfully',
				token,
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({
				msg: 'Please contact admin',
			});
		}
	},

	//Update user
	updateUser: async (req, res) => {
		const id = req.params.id;
		try {
			await User.findByIdAndUpdate(id, req.body);

			res.status(200).json({
				msg: 'User updated successfully',
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({
				msg: 'There was an error, please contact admin',
			});
		}
	},

	//Delete user
	deleteUser: async (req, res) => {
		try {
			let userToDelete = await User.findByIdAndRemove(req.params.id);

			if (!userToDelete) {
				return res.status(404).json({
					msg: 'There is no user with that ID',
				});
			}

			res.status(200).json({
				msg: 'User deleted successfully',
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({
				msg: 'There was an error, please contact admin',
			});
		}
	},
};

module.exports = controllers;
