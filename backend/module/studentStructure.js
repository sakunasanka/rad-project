const { Timestamp } = require('mongodb');
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema

const emailValidator = {
    validator: function (value) {
        // Use a regular expression to validate the email format
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(value);
    },
    message: 'Invalid email format'
};

const studentSchema = new Schema({
    name : {
        type : String,
        required : true,
        unique: true,
    },
    country :{
        type : String,
        required : true
    },
    birth_Date :{
        type : Date,
        required : true
    },
    email :{
        type : String,
        required : true,
        unique:true,
        validate : emailValidator
    }
},{Timestamp:true})

studentSchema.plugin(uniqueValidator);

module.exports = mongoose.model('student',studentSchema); 