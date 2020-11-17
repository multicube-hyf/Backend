const message = require('../models/MessageModel')

const controllers = {
    // Get all Messges
    getMessages: (req, res) => {
       message.find((err, data) => {
        if(err){
            return next(err) 
        }
        else {
            res.json(data);
        }
    })
    },

    // Get Single Message
    getOne: (req, res) => {
        const id = req.params.id;
        message.findById(id, (err, data) => {
            if(err){
                return next(err) 
            }
            else {
                res.json(data);
            }
        })
    },

    //CREATE Messages
    create: (req, res) => {
          const newMessage = req.body  
            message.create(newMessage, (err, data) => {
                if(err){
                    res.status(500).send(err) //internal server error message
                }
                else {
                    res.status(201).send(`new message added : \n ${data}`)
                }
            })
    },

    //Update Message
    update: (req, res, next) => {
        const id = req.params.id;
        message.findByIdAndUpdate(id, {
            $set: req.body
        }, (err, data) => {
            if(err){
                return next(err);
                console.log(err)
            }
            else {
                res.json(data);
                console.log('message updated successfully ..!')
            }
        })
    },

    //Delete Message
    delete: (req, res, next) => {
        message.findByIdAndRemove(req.params.id, (error, data) => {
            if(error){
                return next(error);
            }
            else{
                res.status(200).send('Message deleted successfully');
            }
        })
    }
}

module.exports = controllers;