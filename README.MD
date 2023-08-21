# AuthApi
## Descripcion
Api basica de Autetificacion la cual genera token para ser utilisado en el rest-crud de usuarios con mongo, con endpoints protegido por el mismo.
### Dependecias
-  bcryptjs: 2.4.3,
-  cors: 2.8.5,
-  dotenv: 16.0.3",
-  express: 4.18.1,
-  express-validator: 6.14.2,
-  jsonwebtoken: 8.5.1,
-  mongoose: 6.4.1

## Nota
No para uso en producion, uso solo de ejemplo 

## Restituir aplicación
`$ npm install `

## Iniciar server
`$ nodemon index `
## Serve url
```http
   Dominio:3000/api/version
```
# Iniciar mediante container

## Incinciar Serve  Doker
```
doker compose up -d
```
## Detener Serve Doker
```
doker compose down 
```


## API Reference

#### LogIn de usuario

```http
  POST /api/v1/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | Email de  Usuario |
| `password` | `string` | Contraseña de  Usuario |


## Ejemplo Json

```json
{
    "email":"email@domino.com",
    "password":"Pass"
}
```
# Crud de usuario
#### Obtener todo los usuario

```http
  GET /api/v1/usuarios
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**. Tu API key |

#### Regristrar usuario

```http
  POST /api/v1/usuarios
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nombre` | `string` | Nombre Usuario |
| `email` | `string` | Email de  Usuario |
| `password` | `string` | Contraseña de  Usuario |


## Ejemplo Json

```json
{
    "nombre":"Nombre",
    "email":"email@domino.com",
    "password":"Pass"
}
```
#### Actualizar usuario

```http
  PUT /api/v1/usuarios
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nombre` | `string` | Nombre Usuario |


## Ejemplo Json

```json
{
    "nombre":"Nombre"
 }
```
#### Eliminar usuario

```http
DELETE /api/v1/usuarios/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Id` | `string` | Id de Usuario |