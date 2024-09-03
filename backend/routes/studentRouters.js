const express = require('express')
const router = express.Router()
const studentController = require ('../controllers/studentController')

//get all student details
router.get('/',studentController.getAllstudentDetails)

//get single student details
router.get('/:id',studentController.getSingleStudentDetails)

//create student
router.post('/',studentController.createStudent)

//delete student
router.delete('/:id',studentController.deleteStudent)

//update student
router.patch('/:id',studentController.updateStudent)

module.exports = router