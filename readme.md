1.- Commn JS
2.- database.js
3.- Sequelize CLI

### Creamos un archivo en la raiz llamada .sequelizerc
Donde importamos node:path
nos da la ruta absoluta en cualquier SO de nuestro proyecto
```js
const path = require("node:path");

module.exports = {
    config: path.resolve("src","config","config.json");
}
```
Aqui asignamos la ruta donde se encuentra nuestro archivo config.json

### Cambiar el nombre del Archivo config
Cambiamos el .json por .js ademas de importar dotenv y exportar el objeto ya que dejo de ser un json
```js
require('dotenv').config();


module.export = {
  "development": {
    "username": "postgres",
    "password": "root",
    "database": "chatAPI",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

```
### Agregar las demas carpetas en .sequelizerc
Despues agregaremos todas las rutas de las carpetas que movimos dentro de src
con el metodo path.resolve
```js
const path = require('node:path');
// export default
module.exports={
    'config': path.resolve('src','config','config.js'),
     "models-path": path.resolve('src','models'),
     "seeders": path.resolve('src','seeders'),
     "migrations" : path.resolve('src','migrations')
}
```
### Creacion de Modelo (tabla)
Para crear un modelo es con la siguiente estructur
```shell
npx sequelize-cli model:generate --name User --attributes firstname:string,lastname:string,email:string,avatar:string,password:string,description:string,validEmail:boolean
```
Aqui debemos poner --name y pasarle el nombre del modelo
despues --atributtes y pasarle los atributos que llevara nuestra tabla
pero solo el nombre y el tipo de dato nada mas.

### ENUM
Para crear un enum al momento de estar creando el modelo vamos a definir los siguiente
```shell
'type:enum:{single,group}',
```
Entre comillas escribimos el nombre del atributo que estamos creando
le decimos que es un enum : y entre llaves le indicamos las caracteristicas que estaremos utilizando.

### Comandos
## Los siguientes comandos son los que hemos aprendido hasta ahora
```shell
npx sequelize-cli db:create
```
Crea la base de datos que tenemos en la configuracion

```shell
npx sequelize-cli model:generate --name modelName --attributes
```
Esto crea un modelo donde le pasamos el nombre del modelo y los atributos que queremos crear
--attributes firstname:string,lastname:string,email:string,avatar:string,password:string,description:string,validEmail:boolean\


### Migracion
Hacemos una migracion con el siguiente comando

```shell
npx sequelize-cli db:migrate
```
Esto nos crea en nuestra DB en PSQL dos tablas que no se deben borrar 
Aqui es donde se va escribiendo todo lo que se va haciendo

### Eliminar o deshacer las migraciones
## Son 3 las formas en las que se puede Des Migrar

### Undo
Con el siguiente comando podemos deshacer la migracion mas reciente
```shell
npx sequelize-cli db:migrate:undo
```

## Undo All


### Resticciones
Las restricciones como Allownull, PK, etc.
Se deben hacer en la migracion

### TimeStamps
Para quitar o dejar solo una time Stamp debemos quitar la que no queremos en la migracion,
Y en el modelo debemos hacer lo siguiente
```js 
  sequelize,
    modelName: 'Conversation',
    timestamps:true,
    createdAt:false
  });
```
Esto indica que si queremos timeStamps pero solo quitaremos la de CreatedAt


### Relaciones
En cada Modelo tenemos un metodo llamado associate donde debemos escribir las relaciones que ese modelo tiene con los otros modelos existentes SOLO sus relaciones.
```js
static associate(models) {
      // define association here
      User.hasMany(models.Message,{foreignKey: 'senderId'});
      
    }
```

Decimos que Users tiene muchas
y dentro ponemos el nombre del modelo al que queremos relacionar en este caso Message
y entre llaves escribimos la llave foranea con la que lo relacionaremos entre llaves.


### Creacion de Usuarios
Creamos una carpeta en src donde tendremos nuestros modulos y la llamamos asi
dentro de modules agregamos de una vez las 3 carpetas donde estaran cada modulo
-Conversation
-User
-Message

Dentro de User
Creamos una ruta con la siguiente estructura
user.routes.js

### Pasos
1. Importamos el router
```js
const {Router}= require('express');
```
2. Creamos una instancia de nuestro routes
```js
const router = Router();
```

3. Creamos la ruta y exportamos el Router
```js
router.route('/users')
  .post(registerUser)


  module.exports = router;
```
### Creacion de Controlador
En la misma carpeta del modulo User creamos un archivo llamado user.controller.js

En el Archivo que cremamos iniciamos el controlador
```js

const registerUser = async (req,res)=>{
    try {
        
    } catch (error) {
        res.status(400).json(error);
    }
}
```

Seguido de eso importamos nuesto modelo User
```js
const  {User} = require('../../models');
```
creamos guardamos el Body del req en una constanten llamada newUser
```js
 const newUser = req.body;
```

Despues con el metodo .create creamos el usuario sin dejar de lado el await ya que es una funcion asincrona
```js
  await User.create(newUser);
        res.status(201).json({message : "User Created Succesfully"})

```
### npm bycrypt

Es una libreria que nos ayuda a hacer un HASH de passwords

HASH Es una sucesion alfanumerica de longitud fija, que identifica o representa un conjunto de datos determinados.

Para installar la libreria es de la siguiente manera
```shell
npm i bcrypt
```
### bycrypt.hash()
Toma una contrasena en texto plano(Es una contrasena que podemos ver),
Le pasamos el salt que lo que hace es que evita las colisiones en caso de que el has se repita

```js
bycrypt.has(Contrasena , salt)
```
Cuando tenemos un hash es muy dificil volver al estado original es decir desHashear.

### bycrypt.compare()
Esta funcion nos ayuda a comparar la contrasena
Le pasamos la contrasena en texto plano, le pasamos la contrasena hasheada y esto nos devuelve si las contrasenas son iguales o no lo son.

```js
bycrypt.compare(contrasena , hash)
```
### Uso de Bcrypt


### Hooks Sequelize

Son funciones que se llaman antes y despues de cada llamada de sequelize sea ejecutada.

### Hook beforeCreate()
Para utilizarlo debemos usar en nuestro modelo debemos importar bcrypt
```js
const bcrypt = require('bcrypt');
```

En el objeto sequelize donde asignamos las timestamps

para utilizarlo es la siguiente estructura
```js
hooks:{
      beforeCreate:(user,options)=>{
       
      }
    }
```
llamamos al objeto hooks y le pasamos una propiedad en objeto donde llamaremos al metodo beforecreate y como parametro seria el user que estamos creando y las optiones seguido de una arrow function

Dentro del hook escribimos los siguiente
```js
hooks:{
      beforeCreate: async (user,options)=>{
        const hashed = await bcrypt.hash(user.password,10)
        user.password= hashed;
      }
    }
```
hacemos que la funcion se asincrona para evitar el uso callbacks
Creamos un const para almacenar la contrasena hasheada
utilizamos await y decimos con el metodo bcrypt.hash le pasamos la propiedad password de nuestro user y seguido le decimos que la queremos hashear 10 veces
Y al final asignamos esa contrasena hasheada a la propiedad password del user.


### Login de Usuarios
Creamos una nueva ruta que se llama login y la vamos a atender con un loginUser

Asi mismo creamos el controlador loginUser en UserControllers

```js
const loginUser = async (req, res) => {
    try {

    } catch (error) {
        res.status(400).json(error);
    }
}
```
En la funcion loginUser tenemos que tomar el email y el password del body de la peticiones para buscar en la base de datos al usuario para ver si ya esta regstrado
```js
const loginUser = async (req, res) => {
  const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user =await User.findOne({where : {email}})
        // null || {}
        if(!user){
          return  res.status(400).json({error : 'User does not exist',
        message : 'You need register before'})
        }
```
despues en la variable user almacenamos la busqueda del usuario con el metodo .findOne y le especificamos donde buscaremos que en este caso es en el email

Despues con la clausula if decimos que si el usuario esta vacio entonces respondemos con un 400 y un mensaje de error


### Comparar contrasenas hasheadas
Despues de buscar al usuario si existe, debemos comparar la contrasena hasheada con la contrasena de texto plano, lo haremos de la siguiente manera

Creamos una const llamada isValidPassword y almacenamos con await utilizando bcrypt.compare
donde le pasamos la password de texto plano y la contrasena hasehada que tenemos en la DB
 
 ```js
 const isValidPassword = await bcrypt.compare(password,user.password);
 ```

 En Este punto nos faltaria nada mas generar el token
 
 ### JSON WebToken

 Para instalar 
 ```shell
 npm i jsonwebtoken
 ```

 ### Metodo jwt.sign()

 ```js
 const copyUser = {...user.DataValues}
delete copyUser.password
        const token =  jwt.sign(copyUser, 'parangaricutirimicuaro',{
            algorithm: 'HS512',
            expiresIn: '1h'
        })
 ```

 Despues de haber eliminiado la password del usuario
 Debemos utilizar el metodo .sign()
 Donde le pasamos la informacion seguido de la palabra secreta, seguido de las opciones que utilizaremos que en este caso son el tipo de algoritmo y en cuanto tiempo expira el token.

 ```js
 copyUser.token = token;
res.json(copyUser)
 ```
 Despues le asignaremos una propiedad al objeto llamada token donde le pasaremos el token que creamos anteriormente, y finalmente pasamos la respuesta en un json con toda la informacion del user


 ### Authentication

 Para la authentication debemos crear un midleware donde crearemos un archivo llamado auth.midleware.js

 Creamos una funcion llamada authenticate donde tendra como paramatreos la req, res , next
 
 En un trycathh debemos escribir lo siguiente
 ```js
 const authenticate = (req,res,next)=>{
    try {
        const token = req.headers;
        console.log(token);
        

    } catch (error) {
        res.status(400).jsonr(error)
    }
}

module.exports= authenticate;
 ```

 Primero debemos guardar el token en una const extraido del header de la peticion
 Despues debemos acceder al header que creamos en postman llamado authorization para revisar si esta o no el token enviado

 Y en el codigo hacemos la verificacion siiguiente
 ```js
 const authenticate = (req,res,next)=>{
    try {
        const authorization = req.headers.authorization;
        if(!authorization){
          return  res.status(401).json({message : 'No authorization header'})
        }
 ```
 Si no se encuentra el token entonces mandaremos un error 401 que es para indicar que no esta autorizado, y un mensaje diciendo que no tenemos token para autorizar.

 Despues deberemos verificar el token para ver con que permisos contamos.
 Se haria de esta manera

   Importamos jwt y dotenv para utilzar nuestras variables de entorno

   ```js
   const jwt = require('jsonwebtoken');
require('dotenv').config();
   ```

Despues debemos utilizar el metodo verify de jwt donde le pasaremos como parametros el token que ya tenemos , la palabra secreta que tenemos almacenada en las variables de entorno y por ultimo un objeto con el algoritmo que estamos utilizando.
```js
 const user = jwt.verify(token,process.env.JWT_SECRET,{
            algorithms: 'HS512'
        });
```
Debemos quitar la palabra Bearer para poder utilizar solo el token para comparar, para eso debemos hacer lo siguiente 

```js
const token = authorization.split(' ')[1];
console.log(token)
        const user = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: 'HS512'
        });
```

### Validaciones con Express Validator

Express Validator es un conjunto de midlewares que nos ayudan a validar lo que viene en una peticion.
Para instalar ExpressValidator
```shell
npm i express-validator
```
Creamos un archivo js en la carpeta models/user
Llamado user.validator.js

Importamos la libreria en ese mismo archivo

```js
 const {check} = require('express-validator);
```
Creamos un arreglo donde almacenaremos todos los midlewares que vamos a utilizar.
```js
const registerUserValidator = [];
```
### Check
Con check validamos si hay algun problema con alguna propiedad
Acepta 
-body
-cookies
-headers 
-params
-query
Donde nosotros utilizaremos body ya que ahi es donde tenemos las propiedades del user
Entonces decimos
```js
const registerUserValidator = [
    check('firstname',"Error con firstname")
]
```
Usamos check y en los parametros le pasamos la propiedad a revisar, seguido de un mensaje de error que se mostrara en caso de que haya algun problema con esa propiedad.
Podemos encadenar midlewares para asi realizar una validacion mas segura.

```js
const registerUserValidator = [
    check('firstname', "Error con firstname")
        .exists()
        .notEmpty()
        .isString()
        .isLength({ min: 2, max: 50 })
]
```
Aqui vemos como validamos que la propiedad firstname exista, no la envien vacia, sea un string y que su longitud minima sea de 2 caracteres y maxima de 50 caracteres.

### .validationResult()
Esto nos ayuda a validar el resultado de todos los midlewares que hemos encadenado

Para utilizarlo es de la siguiente manera
```js
const registerUserValidator = [
    check('firstname', "Error con firstname")
        .exists()
        .notEmpty()
        .isString()
        .isLength({ min: 2, max: 50 })
        .matches(/^[a-zA-Z\s]/),
        (req,res, next)=>{
            try {
                validationResult(req).throw();
                next();
            } catch (error) {
                res.status(400).json(error);
            }
        }
]
```
Despues de haber validado la prop firstame debemos validar el resultado para ver si podemos continuar o hay algun error para eso utilizamos validationResult( )
Donde tenemos que usarlo dentro de un midleware donde recibimos la req,res y next 
Dentro de un trycatch usamos validationResult, donde le pasamos la req con la validacion anterior, seguido de un throw que nos ayuda a lanzar todos los errores en caso de que haya algun campo que no cumpla con los requerimientos de validacion.
y en Catch atrapamos el error y lo mandamos por un json con error 400.