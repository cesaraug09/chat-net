const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Usuario = new Schema({
    nome_completo: {
        type: Array,
        require: true
    },
    idade: {
        type: Number
    },
    username: {
        type: String,
        require: true
    },
    senha:{
        type: String,
        require: true
    },
    genero: {
        Number
    }
})

mongoose.model("usuarios", Usuario)