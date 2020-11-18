const User = require('../models/UserModel')

const controllers = {
    // Get all users
    getAllUsers: async(req, res) => {
        try {
      await User.find((err, data) => {
        if(err){
            return next(err) 
        }
        else {
            res.json(data);
        } })
     }
catch (error) {
    console.log(error)
    res.status(500).json({
        msg: "There was an error, please contact admin"
    })    
   } 
    },

    // Get Single user
    getOneUser: async(req, res) => {
        const id = req.params.id;
        try {
            await User.findById(id, (err, data) => {
            if(err){
                return next(err) 
            }
            else {
                res.json(data);
            }
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "There was an error, please contact admin"
        })    
    } 
    },

    //CREATE users
    createNewUser: async(req, res) => {
          const newUser = req.body  
          try{
            await User.create(newUser, (err, data) => {
                if(err){
                    res.status(500).send(err) //internal server error message
                }
                else {
                    res.status(201).send(`new user created : \n ${data}`)
                }
            })
        }
        catch (error) {
            console.log(error)
            res.status(500).json({
                msg: "There was an error, please contact admin"
            })    
        } 
    },

    //Update user
    updateUser: async(req, res, next) => {
        const id = req.params.id;
        try{
        await User.findByIdAndUpdate(id, {
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
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "There was an error, please contact admin"
        })    
    } 
    },

    //Delete user
    deleteUser: async(req, res, next) => {
        try{
        await User.findByIdAndRemove(req.params.id, (error, data) => {
            if(error){
                return next(error);
            }
            else{
                res.status(200).send('user deleted successfully');
            }
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "There was an error, please contact admin"
        })    
    } 
}
}

module.exports = controllers;