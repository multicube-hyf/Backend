const Message = require('../models/MessageModel')

const controllers = {

    // Get all Messges
    getAllMessages: async(req, res) => {
        try {
          await Message.find((err, data) => {
        if(err){
            return next(err) 
        }
        else {
            res.json(data);
        }
        })}
        catch (error) {
            console.log(error)
            res.status(500).json({
                msg: "There was an error, please contact admin"
            })    
        } 

    },

    // Get Single Message
    getOneMessage: async(req, res) => {
        const id = req.params.id;
       try{
            await Message.findById(id, (err, data) => {
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

    //CREATE Messages
    createNewMessage: async(req, res) => {
          const newMessage = req.body  
          try{  
          await Message.create(newMessage, (err, data) => {
                if(err){
                    res.status(500).send(err) //internal server error message
                }
                else {
                    res.status(201).send(`new message added : \n ${data}`)
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

    //Update Message
    updateMessage: async(req, res, next) => {
        const id = req.params.id;
        try {
        await Message.findByIdAndUpdate(id, {
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
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "There was an error, please contact admin"
        })    
    } 
    },

    //Delete Message
    deleteMessage: async(req, res, next) => {
        try {
        await Message.findByIdAndRemove(req.params.id, (error, data) => {
            if(error){
                return next(error);
            }
            else{
                res.status(200).send('Message deleted successfully');
            }
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "There was an error, please contact admin"
        })    
    } 

}}

module.exports = controllers;