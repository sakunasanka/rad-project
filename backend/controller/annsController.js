const Ann = require('../models/annModel');
const mongoose = require('mongoose');

//get all announcements
const getAnns = async (req, res) => {
    const anns = await Ann.find({}).sort({a_title: 1});

    res.status(200).json(anns);
}

//get a single announcement
const getAnn = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such announcement.'})
    }

    const ann = await Ann.findById(id);

    if(!ann){
        return res.status(404).json({error: 'No such announcement.'});
    }

    res.status(200).json(ann);
}


//create new announcement
const createAnn = async (req, res) => {
    const {a_title, a_body} = req.body;

    //add to database
    try{
        const ann = await Ann.create({a_title, a_body});
        res.status(200).json(ann);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

//delete a announcement
const deleteAnn = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such announcement.'});
    }

    const ann = await Ann.findOneAndDelete({_id: id});

    if(!ann){
        return res.status(404).json({error: 'No such announcement.'});
    }

    res.status(200).json(ann);
}

//update a announcement
const updateAnn = async (req, res) =>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such announcement.'});
    }

    const ann = await Ann.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    if(!ann){
        return res.status(404).json({error: 'No such announcement.'});
    }

    res.status(200).json(ann);
}


module.exports = {
    createAnn,
    getAnns,
    getAnn,
    deleteAnn,
    updateAnn
}