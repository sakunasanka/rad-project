const express = require('express');
const{
    createAnn,
    getAnns,
    getAnn,
    deleteAnn,
    updateAnn
} = require('../controllers/annsController');

const router = express.Router();

//To GET all announcements
router.get('/', getAnns);


//To GET single announcement
router.get('/:id', getAnn);

//POST a new announcement
router.post('/', createAnn);

//DELETE a new announcement
router.delete('/:id', deleteAnn);

//UPDATE a new announcement
router.patch('/:id', updateAnn);

module.exports = router;