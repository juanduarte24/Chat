const { check, validationResult } = require('express-validator');
const validateResult = require('../../midlewares/validator.midleware')

const registerUserValidator = [
    check('firstname', "Error con firstname")
        .exists().withMessage('No se incluye la propiedad firstname')
        .notEmpty().withMessage('El firstname no debe estar vacio')
        .isString().withMessage('El valor del firstname debe ser string')
        .isLength({ min: 2, max: 50 }).withMessage('La longitud del nombre debe ser entre 2 y 50 caracteres')
        .matches(/^[a-zA-Z\s]/).withMessage('Solo se aceptan letras'),
    //Check Lastname
    check('lastname', 'Error lastname')
        .exists().withMessage('No se incluye la propiedad lastname')
        .notEmpty().withMessage('El lastname no debe estar vacio')
        .isString().withMessage('El valor del lastname debe ser string')
        .isLength({ min: 2, max: 50 }).withMessage('La longitud del lastname debe ser entre 2 y 50 caracteres')
        .matches(/^[a-zA-Z\s]/).withMessage('Solo se aceptan letras'),

    //check email
    check('email', 'Error con email')
        .exists().withMessage('La propiedad email no esta incluida')
        .notEmpty().withMessage('La propiedad email no debe estar vacia')
        .isString().withMessage('La propiedad email debe ser string')
        .isEmail().withMessage('La propiedad email no tiene el formato de correo')
        .isLength({ min: 7, max: 50 }).withMessage('La propiedad email debe contener minimo 7 y maximo 50 caracteres'), //e@gmail.com

    //Check Contrasenia
    check('password', 'Error en el password')
        .exists().withMessage('La propiedad password no esta incluida')
        .notEmpty().withMessage('La propiedad password no debe estar vacia')
        .isString().withMessage('La propiedad password sebe ser un string')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/).withMessage('La propiedad password deber ser minimo 8 caracteres, una mayuscula, una minuscula y un caracter especial.'),
    validateResult
];

const loginValidation = [
    check('email', 'Error en la propiedad email')
        .exists().withMessage('La propiedad email no esta incluida')
        .notEmpty().withMessage('La propiedad email no debe estar vacia')
        .isString().withMessage('La propiedad email debe ser string')
        .isEmail().withMessage('La propiedad email no tiene el formato de correo')
        ,

    check('password', 'Error en la propiedad password')
        .exists().withMessage('La propiedad password no esta incluida')
        .notEmpty().withMessage('La propiedad password no debe estar vacia')
        .isString().withMessage('La propiedad password sebe ser un string'),
        validateResult
];

module.exports = {
    registerUserValidator, loginValidation
}