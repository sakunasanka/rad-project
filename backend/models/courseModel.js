const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    course_name: {
        type: String,
        required: true
    },
    course_id: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Course', courseSchema);


