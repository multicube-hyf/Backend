const User = require('../models/UserModel');
const Student = require('../models/StudentModel');
const bcrypt  = require('bcrypt');
const {generateJWT} = require('../helpers/jwt')

const createUser = async (req, res) => {
       
    const {role, username, password} = req.body;
    
    try {

        let user = await User.findOne({username});

        if(user){
           return res.status(400).json({
                msg: 'Username already in use'
            })
        }
        
        user = new User(req.body)

         //encrypt password
         const salt = bcrypt.genSaltSync();
        
         user.password = bcrypt.hashSync(password, salt);
         
         let savedUser = await user.save();
         
         const token = await generateJWT(user.id, user.name)
        
        
        if(role === 'student'){
            let student = new Student({
                ...req.body,
                user_id: savedUser._id
            })
            
             let savedStudent = await student.save();

             return res.status(201).json({
                ...savedUser._doc, 
                ...savedStudent._doc,
                token
            })
            
        }
         
        res.json({
           savedUser,
           token
        })


     } catch (error) {
         console.log(error)
         res.status(500).json({
             msg: 'Please contact admin'
         })
     }
};

const getUsers = async (req, res) => {
     try {

         const users = await User.find()
         res.status(200).json({
             users
         });

     } catch (error) {
          console.log(error)
         res.status(500).json({
             msg: 'Please contact admin'
         })
     }
};

const getStudents = async (req, res) => {
     try {

        let students = await Student.find().populate('user_id');

        res.status(200).json({
            students
        })
         
     } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Please contact admin'
        })
     };
};

const getStudent = async (req, res) => {

    const {id} = req.params;
    
    try {

       let student = await Student.findById(id).populate('user_id');
       
       if(!student) {
          return res.status(400).json({
               msg: "There is not any student with that ID"
           })
       }
       
       res.status(200).json({
           student
       })
        
    } catch (error) {
       console.log(error)
       res.status(500).json({
           msg: 'Please contact admin'
       })
    };
}




module.exports = {
    createUser,
    getUsers,
    getStudents,
    getStudent
}
