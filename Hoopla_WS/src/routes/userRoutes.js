const express = require("express");
const userRouting = express.Router();
const userService = require('../service/user');
const UserData= require('../model/userdata');


//Setup the database
userRouting.get('/setupDB', (req, res, next) => {
    userService.setupDB().then( response =>{
        if(response) res.json(response)
    }).catch( error =>{
       next(error);
    })
})

//User LOGIN
userRouting.post('/login', (req,res,next)=>{
    var uEmail= req.body.uEmail;
    var uPass=req.body.uPass;
    return userService.loginUser(uEmail, uPass).then(userData => {
        res.json(userData);
    }).catch(err => {
        console.log(err.message)
        next(err);
    });
});

userRouting.post('/register', (req,res,next)=>{
    const registerData=new UserData(req.body);
    return userService.RegisterUser(registerData).then(userData => {
        res.json(userData);
    }).catch(err => {
        console.log(err.message)
        next(err);
    });
});

userRouting.get('/:category', (req, res, next) => {
    let category=req.params.category;
    userService.getCategory(category).then( response =>{
        if(response) res.json(response)
    }).catch( error =>{
       next(error);
    })
})

userRouting.get('/search/:search', (req, res, next) => {
    let search=req.params.search;
    userService.getSearch(search).then( response =>{
        if(response) res.json(response)
    }).catch( error =>{
       next(error);
    })
})

module.exports = userRouting