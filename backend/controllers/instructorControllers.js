const instructors = require('../module/instructorStructure')
const mongoose = require('mongoose')

//create instructor
const createInstructor = async (req,res)=>{
    const {name,country,email,birth_Date,Subjects} = req.body
    try{
        const instructor = await instructors.create({name,country,email,birth_Date,Subjects})
        res.json(instructor);
    } catch(error){
        res.status(400).json({error: error.message})
    } 
}

module.exports = {
    createInstructor,

}