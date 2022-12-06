const { Schema, model } = require('mongoose');

const UsuarioShema = Schema({

    nombre: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        require: true,
        default:'USER_ROLE'
    },
    activo:{
        type: Boolean,
        default: true
    }

});

 module.exports = model( 'Usuario' , UsuarioShema );