const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Usuario");
const Usuario = mongoose.model("usuarios");

// Rotas

router.get('/login',(req, res)=>{
    res.render('authentication/login')
})

router.get('/register',(req, res)=>{
    res.render('authentication/register')
})

router.post('/authenticationreg',(req, res)=>{
    let erros = [];
    // Tratamento do input nome
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome obrigatório!"});
    } else if(req.body.nome.length <2){
        erros.push({texto: "Nome muito curto"});
    }
    // Tratamento do input username
    if(!req.body.username || typeof req.body.username == undefined || req.body.username == null){
        erros.push({texto: "Username obrigatório!"});
    } else if(req.body.username.length <5){
        erros.push({texto: "Seu user deve conter pelo menos 4 caracteres"});
    }
    // Tratamento do input password
    if(!req.body.password || typeof req.body.password == undefined || req.body.password == null){
        erros.push({texto: "Insira uma senha válida!"});
    } else if(req.body.password.length <6){
        erros.push({texto: "Sua senha deve conter pelo menos 5 caracteres"});
    }

    if(req.body.password != req.body.confirmpassword){
        erros.push({texto: "As senha não coincidem"});
    }

    if(erros.length > 0){
        res.render('authentication/register', {erros: erros}) // Mandando textos de tratamento de inputs para o handlebars
    } else{
        const novoUsuario = {
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            dataNasc: req.body.dataNasc,
            username: req.body.username,
            password: req.body.password
        }

        new Usuario(novoUsuario).save().then(()=>{
            req.flash("success_msg", `Bem vindo, ${novoUsuario.nome}! Aproveite`)
            res.render('profile/profile', {novoUsuario: novoUsuario}) // Ainda não funciona >> CONTINUAR DAQUI <<
        }).catch((err)=>{
            req.flash("error_msg", "Houve um erro, tente novamente mais tarde...")
        })
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