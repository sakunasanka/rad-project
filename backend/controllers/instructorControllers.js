const instructors = require('../module/instructorStructure')
const mongoose = require('mongoose')

//create instructor
const createInstructor = async (req,res)=>{
    const { name, country, email, birth_Date, teacherId } = req.body;
    try{
        const instructor = await instructors.create({
          name,
          country,
          email,
          birth_Date,
          teacherId,
        });
        res.json(instructor);        
    } catch(error){
        res.status(400).json({error: error.message})
    } 
}

//get all instructors details
const getAllInstructorDetails = async (req,res) =>{
    const details = await instructors.find({}).sort({createdAt : -1})
 
    res.json(details);
}

//get single student details
const getSingleInstructorDetails = async (req,res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'No such instructor'})
    }

    const details = await instructors.findById(id)
    if(!details){
        res.status(404).json({error : "No such instructor"})
    } else{
        res.json(details);
    }
}

//delete instructor 
const deleteInstructor = async (req,res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'No such instructor'})
    }

    const instructor = await instructors.findByIdAndDelete(id)

    if(!instructors){
        res.status(404).json({error : "No such instructor"})
    } else{
        res.json(instructors);
    }
}


//update instructor details
const updateInstructor= async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'No such instructor'})
    }

    const instructor = await instructors.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if(!instructor){
        res.status(404).json({error : "No such instructor"})
    } else{
        res.json(instructor);
    }
}

module.exports = {
    createInstructor,
    getAllInstructorDetails,
    getSingleInstructorDetails,
    updateInstructor,
    deleteInstructor
}