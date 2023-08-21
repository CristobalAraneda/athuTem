require('dotenv').config();

const express = require('express');
const cors = require('cors');

const {dbConnect} = require('./dataBase/config');

const app = express()
const port = process.env.PORT;

//configuracio Cores
app.use( cors() );

//letura y parseo del body
app.use( express.json() );
// Conect BD
dbConnect();

//rutas 
app.use('/api/v1/usuarios', require('./routes/usuario.router'));
app.use('/api/v1/login', require('./routes/auth.router'));

app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${port}`)
})