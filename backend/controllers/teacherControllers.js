const teachers = require('../module/teacherStructure')
const mongoose = require('mongoose')

//create teacher
const createTeacher = async (req,res)=>{
    const {name,country,email,birth_Date,Subjects} = req.body
    try{
        const teacher = await teachers.create({name,country,email,birth_Date,Subjects})
        res.json(teacher);
    } catch(error){
        res.status(400).json({error: error.message})
    } 
}

//get all teachers details
const getAllteacherDetails = async (req,res) =>{
    const details = await teachers.find({}).sort({createdAt : -1})
 
    res.json(details);
}

//get single student details
const getSingleTeacherDetails = async (req,res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'No such teacher'})
    }

    const details = await teachers.findById(id)
    if(!details){
        res.status(404).json({error : "No such teacher"})
    } else{
        res.json(details);
    }
}

//delete student 
const deleteTeacher = async (req,res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'No such teacher'})
    }

    const teacher = await teachers.findByIdAndDelete(id)

    if(!teacher){
        res.status(404).json({error : "No such teacher"})
    } else{
        res.json(teacher);
    }
}


//update student details
const updateTeacher = async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'No such teacher'})
    }

    const teacher = await teachers.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if(!teacher){
        res.status(404).json({error : "No such teacher"})
    } else{
        res.json(teacher);
    }
}

module.exports = {
    createTeacher,
    getAllteacherDetails,
    getSingleTeacherDetails,
    updateTeacher,
    deleteTeacher
}