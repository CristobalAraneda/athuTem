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

//extre del objetos los elmente que no se desea mostar en el respuesta
UsuarioShema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

 module.exports = model( 'Usuario' , UsuarioShema );