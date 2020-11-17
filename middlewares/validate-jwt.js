const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
     
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'Token missing'
        })
    }

    try {

        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET_SEED
        )

        req.uid = payload.uid;
        req.name = payload.name;
        
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid Token'
        })
    }
    next();
};

module.exports = {
    validateJWT
}
