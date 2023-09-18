//Common JS
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const userRoutes  = require('./modules/user/user.routes')
require('dotenv').config;

 const PORT = 7000;

const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors()); 

//*Health Check
app.get('/',(req,res)=>{
    res.send('OK');
})

app.use(userRoutes);


app.listen(PORT , ()=>{
    console.log(`Running Server in PORT : 7000`)
})