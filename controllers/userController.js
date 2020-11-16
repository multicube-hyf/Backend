const user = require('../models/UserModel')

const controllers = {
    // Get all users
    getUsers: (req, res) => {
       user.find((err, data) => {
        if(err){
            return next(err) 
        }
        else {
            res.json(data);
        }
    })
    },

    // Get Single user
    getOne: (req, res) => {
        const id = req.params.id;
        user.findById(id, (err, data) => {
            if(err){
                return next(err) 
            }
            else {
                res.json(data);
            }
        })
    },

    //CREATE users
    create: (req, res) => {
          const newUser = req.body  
            user.create(newUser, (err, data) => {
                if(err){
                    res.status(500).send(err) //internal server error message
                }
                else {
                    res.status(201).send(`new user created : \n ${data}`)
                }
            })
    },

    //Update user
    update: (req, res, next) => {
        const id = req.params.id;
        user.findByIdAndUpdate(id, {
            $set: req.body
        }, (err, data) => {
            if(err){
                return next(err);
                console.log(err)
            }
            else {
                res.json(data);
                console.log('user updated successfully ..!')
            }
        })
    },

    //Delete user
    delete: (req, res, next) => {
        user.findByIdAndRemove(req.params.id, (error, data) => {
            if(error){
                return next(error);
            }
            else{
                res.status(200).send('user deleted successfully');
            }
        })
    }
}

module.exports = controllers;