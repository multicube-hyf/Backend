const Classroom = require('../models/ClassroomModel');

const createClassroom = async (req, res) => {

     try {

        let classroom =  new Classroom(req.body);

        const savedClassroom = await classroom.save();

        res.status(201).json({
            classroom: savedClassroom
        });
         
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
