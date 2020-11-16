const Classroom = require('../models/ClassroomModel');

const createClassroom = async (req, res) => {

    console.log('im here')
    

     try {

        // let classroom =  new Classroom(req.body);

        // const savedClassroom = await classroom.save();

        // console.log(savedClassroom)
        

        // res.status(201).json({
        //     ok: true
        // });
         
     } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator'
        });
     }
}

module.exports = {
    createClassroom
};
