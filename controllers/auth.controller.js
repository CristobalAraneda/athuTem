const{ res } = require('express');
const Usuario = require('../models/usuario.models');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async( req, res ) =>{

   /* `const {email, contraseña} = req.body;` está desestructurando el objeto `req.body` y extrayendo el
   propiedades `email` y `password`. Esto le permite acceder directamente al `correo electrónico` y la `contraseña`
   valores del objeto `req.body` sin tener que usar la notación de puntos (`req.body.email`,
   `req.cuerpo.contraseña`) */

    const {email, password} = req.body;

    

    try {
        //verificar Email en la base de datos
        const usuarioDB = await Usuario.findOne({ email })
        
        
      /* El bloque de código `if ( !usuarioDB ) { ... }` está comprobando si la variable `usuarioDB` es falsa
      (nulo, indefinido, falso, 0, cadena vacía). Si es falso, significa que el usuario con el
      el correo electrónico dado no existe en la base de datos. En ese caso, devuelve una respuesta con un estado
      código de 404 (No encontrado) y un objeto JSON que contiene las propiedades `ok` establecidas en falso y
      `msg` establecido en "usuario invalido" (usuario inválido). Esto se utiliza para manejar el caso cuando el usuario
      no se encuentra en la base de datos durante el proceso de inicio de sesión. */
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: "usuario invalido"
            });
            
        }

        //descripta y compara contraseña 
         const validPassword = bcrypt.compareSync( password, usuarioDB.password );

         //Si la contraseña no es valida devuelve un erro 403
        if ( !validPassword ) {
            return res.status(403).json({
                ok: false,
                msg: " Autetificacion fallida "
            });
            
        }

        //generar la Token y asignacion al la variable
        const token = await generarJWT( usuarioDB.id );

        // Retorna el token generado
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
// Se exporta los metodos
module.exports = {
    login
}