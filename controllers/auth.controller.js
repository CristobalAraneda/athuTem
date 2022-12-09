const{ res } = require('express');
const Usuario = require('../models/usuario.models');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async( req, res ) =>{

    const {email, password} = req.body;

    
    try {
        const usuarioDB = await Usuario.findOne({ email })
        
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: "usuari invalid"
            });
            
        }

        //verificar contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );

        if ( !validPassword ) {
            return res.status(403).json({
                ok: false,
                msg: " Autetificacion fallida "
            });
            
        }

        //generar la Token
        const token = await generarJWT( usuarioDB.id );

        res.status(200).json({
            ok: true,
            token
        })


    } catch (error) {

        console.log(error);
        res.status(500).json({
          ok:false,
          msg: process.env.ER500        
        })
        
    }

}

module.exports = {
    login
}