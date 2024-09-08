const students = require('../module/studentStructure')
const mongoose = require('mongoose')

//create student
const createStudent = async (req,res)=>{
    const {name,country,birth_Date,email} = req.body
    try{
        const student = await students.create({name,country,birth_Date,email})
        res.json(student);
    } catch(error){
        res.status(400).json({error: error.message})
    } 
}

//get all student details
const getAllstudentDetails = async (req,res) =>{
    const details = await students.find({}).sort({createdAt : -1})
 
    res.json(details);
}

//get single student details
const getSingleStudentDetails = async (req,res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'No such student'})
    }

    const details = await students.findById(id)
    if(!details){
        res.status(404).json({error : "No such student"})
    } else{
        res.json(details);
    }
}

//delete student 
const deleteStudent = async (req,res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'No such student'})
    }

    const student = await students.findByIdAndDelete(id)

    if(!student){
        res.status(404).json({error : "No such student"})
    } else{
        res.json(student);
    }
}


//update student details
const updateStudent = async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'No such student'})
    }

    const student = await students.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if(!student){
        res.status(404).json({error : "No such student"})
    } else{
        res.json(student);
    }
}

module.exports = {
    createStudent,
    getAllstudentDetails,
    getSingleStudentDetails,
    updateStudent,
    deleteStudent
}