const jwt = require('jsonwebtoken');

const generateJWT = (uid, username) => {
     
    return new Promise((resolve, reject)=>{

        const payload = {uid, username};

        jwt.sign(payload, process.env.JWT_SECRET_SEED, {
            expiresIn: '30d'
        }, (err, token) => {
             
            if(err){
                console.log(err)
                reject('Token not generated');
            }

            resolve(token);
        })

    }) 
}

module.exports = {
    generateJWT
}