const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({

    courseId: {
        type: String,
        required: false
    },
    degreeName: {
        type: String,
        required: false
    },
    courseName: {
        type: String,
        required: false
    }

})

module.exports = mongoose.model('Course',userSchema, 'Course')