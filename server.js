// const express = require('express');
// var mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// const userSchema = new mongoose.Schema({
//     userId : String,
//     userName : String,
//     userRole : String,
//     userPassword : String,
//     userEmail : String,
//     degreeName : String,
//     subjects : Array
//   }
// );
// const user = mongoose.model('user', userSchema);

// var app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// mongoose.connect('mongodb://localhost:27017/student_teacher_portal');
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log("connected with Database")
// });

// app.post('/login', async(request, response) => {
//     try {
//         console.log('this is request body data', request.body)
//         let username = request.body.username
//         let password = request.body.password
//         console.log(`${username} and ${password}`)
//         const data = await user.findOne({userName : username, userPassword : password})
//         console.log(data)

//     //     user.findOne({user_name : username, user_password : password} , function(err, data) {
//     //     if (err) {
//     //         console.log(err)
//     //         response.json({
//     //             "error" : "there is some error while getting data"
//     //         })
//     //     } else if (data) {
//     //         console.log(data)
//     //     } else {
//     //         response.json({
//     //             "error" : "there is some error while getting data"
//     //         })
//     //     }
//     // })
//     } catch {
//         response.json({
//             "error" : "there is some error while getting data"
//         })
//     }
// })

// app.listen(3001, function() {
//     console.log('listening on 3001')
// })


const express = require('express')
const mongoose = require('mongoose')
//const url = 'mongodb://localhost:27017/AlienDBex'

const app = express()

mongoose.connect('mongodb://localhost:27017/student_teacher_portal', {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected with Database")
});

app.use(express.json())

const apiRouter = require('./routes/apis')
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next()
}) 
app.use('/',apiRouter)

app.listen(9000, () => {
    console.log('Server started')
})