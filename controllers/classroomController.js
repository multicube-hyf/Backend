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
};

const getClassrooms = async (req, res) => {
    
    try {

        let classrooms = await  Classroom.find();

        res.status(200).json({
            classrooms
        })

     } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator'
        });
     }
};

const getClassroom = async (req, res) => {
    const {id: classId} = req.params

    try {

    let classroom  = await Classroom.findById(classId);

    if(!classroom){
         return res.status(400).json({
            msg: 'There is no classroom with that ID'
        })
    };

    res.status(200).json({
        classroom
    });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator'
        });
    }
};

const deleteClass = async (req, res) => {
    const {id: classId} = req.params

    try {

       let classroomDeleted = await Classroom.findByIdAndDelete(classId);

       if(!classroomDeleted){
          return res.status(400).json({
               msg: "There is no classroom with that ID"
           })
       }

       res.status(200).json({
           msg: "Classroom deleted successfully"
       })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator'
        });
    }
     
}





module.exports = {
    createClassroom,
    getClassrooms,
    getClassroom,
    deleteClass
};
