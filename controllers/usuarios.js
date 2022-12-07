const { resp } = require('express')

const Usuario = require('../models/usuario')

const getUsuarios = async(req, res) => {

  const usuarios = await Usuario.find({}, 'nombre email role activo');

    res.json({
      ok: true, 
      usuarios
    });
  }
const crearUsuarios = async(req, resp) => {

     const{ email, password, nombre} = req.body;

    

     try {
      const existeEmail = await Usuario.findOne( { email } );

      if ( existeEmail ) {

        return resp.status(409).json({
          ok: false,
          msg: ' El correo ya se encuentra regristrado'
        });
        
      }

       const usuario = new Usuario( req.body );
       await usuario.save();
        
       resp.status(201).json({
         ok: true,
         usuario
       });
      
     } catch (error) {
      console.log(error);
      resp.status(500).json({
        ok:false,
        msg: process.env.ER500        
      })
      
     }



  }



  module.exports = {
    getUsuarios,
    crearUsuarios
  }