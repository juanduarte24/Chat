const { Router } = require('express');
const { registerUser, loginUser } = require('./user.controller')
const authenticate = require('../../midlewares/auth.midleware')
const {registerUserValidator, loginValidation} = require('./user.validator')


const router = Router();

router
    .route('/user')
    .post(registerUserValidator,registerUser)
    .get(authenticate, (req, res) => {
        
        res.json({ message: 'Aqui van tus mensajes' })
    });
router.post('/login',loginValidation ,loginUser);

module.exports = router;