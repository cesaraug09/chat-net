const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Usuario = new Schema({
    nome: {
        type: String,
        require: true
    },
    sobrenome: {
        type: String
    },
    idade: {
        type: Number
    },
    username: {
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    genero: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("usuarios", Usuario)