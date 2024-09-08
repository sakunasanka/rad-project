const express = require('express')
const router = express.Router()
const teacherController = require ('../controllers/teacherControllers')

//get all teacher details
router.get('/',teacherController.getAllteacherDetails)

//get single teacher details
router.get('/:id',teacherController.getSingleTeacherDetails)

//create teacher
router.post('/',teacherController.createTeacher)

//delete teacher
router.delete('/:id',teacherController.deleteTeacher)

//update teacher
router.patch('/:id',teacherController.updateTeacher)

module.exports = router