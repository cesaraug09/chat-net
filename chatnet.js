const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const user = require('./routes/user')
// Configurando express
const app = express();
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    runtimeOptions:{
        allowProtoMethodsByDefault: true,
        allowedProtoMethodsByDefault: true,
    }}))
// Handlebars
    app.set('view engine', 'handlebars');
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());
// Public
    app.use(express.static('public'));
// Mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/chatnet').then(()=>{
        console.log("Conectado ao MongoDB do chatnet ✔️\n")
    }).catch((err)=>{
        console.log(`Ocorreu um erro ao tentar se conectar ao banco de dados: ${err}`)
    })

// Rotas:

app.get('/', function(req, res){
    res.render('splash/splash')
})

// Rota para autentificação do usuario! login e registro
app.use('/user', user);


// Geral
app.listen('3000', function(){
    console.log("\n>>>>>  O CHATNET está On-Line 🟢.  <<<<<\n")
})