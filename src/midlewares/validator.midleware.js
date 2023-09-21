const {validationResult}=require('express-validator');

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw();
        next();
    } catch (error) {
        res.status(400).json(error.array().map((error)=>error.msg));
    }
}

module.exports = validateResult;