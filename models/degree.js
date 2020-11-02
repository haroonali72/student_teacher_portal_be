const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({

    degreeId: {
        type: String,
        required: false
    },
    degreeName: {
        type: String,
        required: false
    },
    courses: {
        type: Array,
        required: false
    }

})

module.exports = mongoose.model('Degree',userSchema, 'Degree')