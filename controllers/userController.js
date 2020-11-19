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
				const { _id, username, role } = user;
				const userInfo = { _id, username, role };
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
		const id = req.params.id;
		try {
			await User.findById(id, (err, data) => {
				if (err) {
					return next(err);
				} else {
					res.json(data);
				}
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({
				msg: 'There was an error, please contact admin',
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

			const token = await generateJWT(savedUser._id, user.name);

			if (role === 'student') {
				let student = new Student({
					...req.body,
					user_id: savedUser._id,
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
			await User.findByIdAndUpdate(
				id,
				{
					$set: req.body,
				},
				(err, data) => {
					if (err) {
						return next(err);
						console.log(err);
					} else {
						res.json(data);
						console.log('user updated successfully ..!');
					}
				}
			);
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
