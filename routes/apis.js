const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Degree = require('../models/degree')
const Course = require('../models/course')
const lodash = require('lodash')

router.get('/course/courseList', async(req,res) => {
    try{
        const courseList = await Course.find()
        res.json({
            "courseList" : courseList
        })
    }catch(err){
        res.json({
            "error" : "internal server error"
        })
    }
})

router.delete('/course/:degreeName/:courseName',async(req,res)=> {
    console.log(req.params)
    try{

    const v = await Promise.all([Course.remove({degreeName : req.params.degreeName, courseName : req.params.courseName})
        ,Degree.updateOne({degreeName : req.params.degreeName, $pull : {courses : req.params.courseName}})])
          
        res.json({
            "msg" : "course deleted successfully"
        })   
    }catch(err){
        res.json({
            "error" : "internal server error"
        })
    }

})

router.post('/course', async(req,res) => {
    console.log(req)

    const course = new Course({
        degreeName : req.body.degreeName,
        courseName : req.body.courseName
    })

    try{
        const existing =  await Course.findOne({degreeName : req.body.degreeName , courseName : req.body.courseName})
        if (!lodash.isEmpty(existing)) {
            res.json({
                "error" : "course already exist"
            })
        } else {
            const v = course.save()
            await Degree.updateOne({degreeName : req.body.degreeName, $addToSet : {courses : req.body.courseName}})
            res.json({
                "msg" : "course saved successfully"
            })
        }
        
    }catch(err){
        res.json({
            "error" : "internal server error"
        })
    }
})

router.post('/login', async(req,res) => {
    console.log('data is ', req.body)
    try{
           const user = await User.findOne({userName : req.body.username, userPassword : req.body.password})
           if (lodash.isEmpty(user)) {
               res.json({
                   "error" : "username or password is wrong"
               })
           } else if (user.userRole === "admin") {
            res.json({
                "isAdmin" : true,
                "isTeacher" : false,
                "isStudent" : false
            })
           } else if (user.userRole === "teacher") {
            res.json({
                "isAdmin" : false,
                "isTeacher" : true,
                "isStudent" : false
            }) 
           } else {
            res.json({
                "isAdmin" : false,
                "isTeacher" : false,
                "isStudent" : true
            })
           }
    }catch(err){
        res.json({
            "error" : "internal server error"
        })
    }
})

router.get('/user/:usertype', async(req,res) => {
    try{
        const users = await User.find({userRole : req.params.usertype})
        res.json({
            "users" : users
        })
    }catch(err){
        res.json({
            "error" : "internal server error"
        })
    }
})

router.get('/degree/degreeList', async(req,res) => {
    try{
        const degreeList = await Degree.find()
        res.json({
            "degreeList" : degreeList
        })
    }catch(err){
        res.json({
            "error" : "internal server error"
        })
    }
})

router.delete('/degree/:degreename',async(req,res)=> {
    console.log(req)
    try{
        const alien = await Degree.findOneAndRemove({degreeName : req.params.degreename}) 
        res.json({
            "msg" : "degree deleted successfully"
        })   
    }catch(err){
        res.json({
            "error" : "internal server error"
        })
    }

})

router.post('/degree', async(req,res) => {
    console.log(req)

    const degree = new Degree({
        degreeName : req.body.degreeName,
    })

    try{
        const existing =  await Degree.findOne({degreeName : req.body.degreeName})
        if (!lodash.isEmpty(existing)) {
            res.json({
                "error" : "degree already exist"
            })
        } else {
            const v = degree.save()
            res.json({
                "msg" : "degree saved successfully"
            })
        }
        
    }catch(err){
        res.json({
            "error" : "internal server error"
        })
    }
})


router.post('/user', async(req,res) => {
    console.log(req)

    const user = new User({
        userName : req.body.userName,
        userPassword : req.body.userPassword,
        userRole : req.body.userRole,
        userEmail : req.body.userEmail,
        degreeName : req.body.degreeName,
        subjects : req.body.subjects
    })

    try{
        const existing =  await User.findOne({userName : req.body.userName})
        if (!lodash.isEmpty(existing)) {
            res.json({
                "error" : "username already exist"
            })
        } else {
            const v = user.save()
            res.json({
                "msg" : "user saved successfully"
            })
        }
        
    }catch(err){
        res.json({
            "error" : "internal server error"
        })
    }
})

router.delete('/user/:username',async(req,res)=> {
    console.log(req)
    try{
        const alien = await User.findOneAndRemove({userName : req.params.username}) 
        res.json({
            "msg" : "user deleted successfully"
        })   
    }catch(err){
        res.json({
            "error" : "internal server error"
        })
    }

})

router.post('/getUser',async(req,res)=> {
    console.log(req)
    try{
        const user = await User.findOne({userName : req.body.userName})
        if (lodash.isEmpty(user)) {
            res.json({
                "error" : "user not exist"
            })    
        } 
        res.json({
            "user" : user
        })   
    }catch(err){
        res.json({
            "error" : "internal server error"
        })
    }

})

// router.patch('/:id',async(req,res)=> {
//     try{
//         const alien = await user.findById(req.params.id) 
//         alien.sub = req.body.sub
//         const a1 = await user.save()
//         res.json(a1)   
//     }catch(err){
//         res.send('Error')
//     }

// })

module.exports = router