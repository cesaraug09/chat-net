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
        res.send(`Bem vindo, <b>${req.body.username}</b>!<i>Essa tela não é um handlebars e não pode ser estilizada AINDA...</i>`)
    } else{
        res.render('authentication/register')
    }
})

router.post('/authenticationlog', (req,res)=>{
    if(req.body.password !='' && req.body.username!=""){
        res.send(`Bem vindo, <b>${req.body.username}</b>! Sua senha eh ${req.body.password} kkkkk<i>Essa tela não é um handlebars e não pode ser estilizada AINDA...</i>`)
    } else{
        res.render('authentication/login')
    }
})

module.exports = router;