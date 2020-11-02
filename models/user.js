const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: false
    },
    userName: {
        type: String,
        required: false
    },
    userPassword: {
        type: String,
        required: false
    },
    userRole: {
        type: String,
        required: false
    },
    userEmail: {
        type: String,
        required: false
    },
    degreeName: {
        type: String,
        required: false
    },
    subjects: {
        type: Array,
        required: false
    }

})

module.exports = mongoose.model('User',userSchema, 'User')