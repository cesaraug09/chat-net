const express = require('express');
const handlebars = require('express-handlebars');

const app = express();
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    runtimeOptions:{
        allowProtoMethodsByDefault: true,
        allowedProtoMethodsByDefault: true,
    }}))
app.set('view engine', 'handlebars');
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', function(req, res){
    res.render('splash')
})

app.get('/login', function(req, res){
    res.render('login')
})

app.get('/register', function(req, res){
    res.render('register')
})

app.post('/add', function(req, res){
    res.send(`Bem vindo, <b>${req.body.username}</b>!`)
})

app.listen('8081', function(){
    console.log("O servidor está rodando")
})