const express = require('express')
const router = express.Router()
const instructorController = require ('../controllers/instructorControllers')

//get all instructo details
router.get('/',instructorController.getAllInstructorDetails)

//get single instructor details
router.get('/:id',instructorController.getSingleInstructorDetails)

//create instructor
router.post('/',instructorController.createInstructor)

//delete teacher
router.delete('/:id',instructorController.deleteInstructor)

//update teacher
router.patch('/:id',instructorController.updateInstructor)

module.exports = router