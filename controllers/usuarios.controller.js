const { resp } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario.models');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res) => {

  const usuarios = await Usuario.find({}, 'nombre email role activo');

    res.json({
      ok: true, 
      usuarios,
      uid : req.uid
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

       // Encryptar contraseña
       const salt = bcrypt.genSaltSync();
       usuario.password = bcrypt.hashSync( password, salt);

       //guarda el usuario
       await usuario.save();

       //gerena token new user 

       const token = await generarJWT( usuario.id );


        
       resp.status(201).json({
         ok: true,
         usuario,
         token
       });
      
     } catch (error) {
      console.log(error);
      resp.status(500).json({
        ok:false,
        msg: process.env.ER500        
      })
      
     }
  }

  const actualizarUsuario = async (req, resp ) => {

    const uid = req.params.id;

     
    try {

      const usuarioDB = await Usuario.findById( uid );

      if ( !usuarioDB ) {
          
          return resp.status(404).json({
          ok:false,
          msg: "Usuario no existe"        
        });        
      }

      // elimina los campos que no se actualiza   
      const {password, activo, email, ...campos} = req.body;
     //TODO: solo el admin rol puede atualizar email?
      if( usuarioDB.email != req.body.email ){

        const existeEmail = await Usuario.findOne( { email })
        if( existeEmail ){
         return resp.status(409).json({
            ok: false,
            msg: " Ya exite usuario regristado con ese email"
         })
        } 

      }       
        campos.email = email;
    

      const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, {new: true });

      resp.json({
        ok: true,
        usuarioActualizado,
        uid : req.uid
      })
      
    } catch (error) {

      resp.status(500).json({
        ok:false,
        msg: process.env.ER500        
      })
      
    }
  }

  const eliminarUsuarios = async( req, resp )=>{

    const uid = req.params.id;

    try {

      const usuarioDB = await Usuario.findById( uid );

      if ( !usuarioDB ) {
          
          return resp.status(404).json({
          ok:false,
          msg: "Usuario no existe"        
        });        
      }

      await Usuario.findByIdAndDelete( uid );

      resp.status(202).json({
          ok:true,
          msg: "Usuario Eliminado",
          uid : req.uid   

      })
      
    } catch (error) {

      resp.status(500).json({
        ok:false,
        msg: process.env.ER500        
      })
      
    }

  }



  module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    eliminarUsuarios
  }