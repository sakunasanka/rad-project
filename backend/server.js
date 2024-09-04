require('dotenv').config();

const express = require('express');


const instructorsRoutes = require('./routes/InstructorRouters')

const mongoose = require('mongoose');
const morgan = require('morgan')

const userRoutes = require('./routes/user')

//The express app...
const app = express();

//middlewear...
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});


app.use('/api/instructors',instructorsRoutes);



//Connet to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        //lisitn for requests...
        app.listen(process.env.PORT, () => {
            console.log('Connected to Database & Listeneing on port :', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    })



