//Common JS
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const userRoutes = require('./modules/user/user.routes');
const transporter = require('./helpers/mailer');
const getIamges = require('./helpers/getImages');
const errorRoutes = require('./routes/error.routes');
require('dotenv').config;



const PORT = 7000;

const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());


//*Health Check
app.get('/', (req, res) => {
 res.send("OK")
})

app.use(userRoutes);
 errorRoutes(app);


app.listen(PORT, () => {
    console.log(`Running Server in PORT : 7000`)
})