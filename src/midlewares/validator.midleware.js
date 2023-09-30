const {validationResult}=require('express-validator');

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw();
        next();
    } catch (error) {
        next({
            status:400,
            error : 'Invalid Data',
            message: error.array().map((error)=>error.msg)
        });
    }
}

module.exports = validateResult;