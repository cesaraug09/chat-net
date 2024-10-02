const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Usuario");
const Usuario = mongoose.model("usuarios");

router.get('/login',(req, res)=>{
    res.render('authentication/login')
})

router.get('/register',(req, res)=>{
    res.render('authentication/register')
})

router.post('/authenticationreg',(req, res)=>{
    if(req.body.password == req.body.confirmpassword){
        res.send(`Bem vindo, <b>${req.body.username}</b>!`)
    } else{
        res.render('authentication/register')
    }
})

module.exports = router;