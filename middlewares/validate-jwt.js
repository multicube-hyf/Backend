const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const validateJWT = async (req, res, next) => {
	const token = req.header('x-token');

	if (!token) {
		return res.status(401).json({
			ok: false,
			msg: 'Token missing',
		});
	}

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET_SEED);

		req.userId = payload.userId;
		req.studentId = payload.studentId;

        let user = await User.findById(payload.userId);
        
        if (user.role === 'teacher') {
			 return next()
		}

		if (user.role !== 'admin') {
			return res.status(403).json({
				msg: 'Not authorized',
			});
		}
	} catch (error) {
		return res.status(401).json({
			ok: false,
			msg: 'Invalid Token',
		});
	}
	next();
};

module.exports = {
	validateJWT,
};
