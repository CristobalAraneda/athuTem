const jwt = require('jsonwebtoken');

const generarJWT = (uid) =>{

   /* El código está creando una nueva promesa que envuelve la lógica para generar un token web JSON (JWT). */
    return new Promise( ( resolve, reject )=>{

        const payload = {
            uid
        }
   
        jwt.sign( payload, process.env.JWT_SECRET, { expiresIn: '10m'},
        (err, token) =>{
            if ( err ) {
                console.log(err);
                reject('No se pudo generar el JWT');

            }else{
                resolve( token )
            }
        })
    });


}

module.exports = { generarJWT }