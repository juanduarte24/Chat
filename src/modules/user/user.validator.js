const {check} = require('express-validator');

const registerUserValidator = [
    check('firstname',"Error con firstname")
]