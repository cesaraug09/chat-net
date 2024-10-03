const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const user = require('./routes/user')
const app = express();
const session = require('express-session');
const flash = require("connect-flash");
// Configurações
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
    //Sessão
        app.use(session({
            secret: "202222",
            resave: true,
            saveUninitialized: true
        }))
        app.use(flash())
    // MiddleWare
        app.use((req,res,next)=>{
            res.locals.sucess_msg = req.flash("sucess_msg") // sucess_msg e error_msg são variaveis globais
            res.locals.error_msg = req.flash("error_msg")
            next()
        })

// Rotas:
app.use((req,res,next)=>{
    next();
})

app.get('/',(req, res) =>{
    res.render('splash/splash')
})

app.post('/profile',(req,res)=>{
    res.send("pagina meth post")
})

// Rota para autentificação do usuario! login e registro
app.use('/user', user);


// Geral
let PORT = "3001"
app.listen(PORT, function(){
    console.log("\n>>>>>  O CHATNET está On-Line 🟢.  <<<<<\n")
})