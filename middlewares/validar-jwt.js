const jwt = require('jsonwebtoken');

const validarJwt =( req, res, next) =>{

    const token = req.header( 'x-token' );

    if ( !token ) {
        return res.status(401).json({
            ok: true,
            msg: "No hay token en la peticion"
          });        
    }

    try {
        const { uid } = jwt.verify( token , process.env.JWT_SECRET);

        //otine el id del usuario de la peticion
        req.uid = uid
        
    } catch (error) {

        return res.status(401).json({
            ok: true,
            msg: "Token no valido"
          });     
        
    }


    next();
}

module.exports = {
    validarJwt
}