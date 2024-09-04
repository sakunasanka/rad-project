require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const annroutes = require('./routes/anns');
const courseroutes = require('./routes/courses');
const studentsRoutes = require('./routes/studentRouters');
const teachersRoutes = require('./routes/teacherRouters');
const instructorsRoutes = require('./routes/InstructorRouters');
const userRoutes = require('./routes/user');

// The express app
const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
//app.use('/api/Anns', annroutes);
app.use('/api/students', studentsRoutes);
app.use('/api/courses', courseroutes);
app.use('/api/user', userRoutes);
app.use('/api/teachers', teachersRoutes);
app.use('/api/instructors', instructorsRoutes);

// Connect to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        const PORT = process.env.PORT || 4000;
        // Listen for requests...
        app.listen(PORT, () => {
            console.log('Connected to Database & Listening on port:', PORT);
        });
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });
