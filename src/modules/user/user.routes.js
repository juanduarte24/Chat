const { Router } = require('express');
const { registerUser, loginUser, validateUserEmail } = require('./user.controller')
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

router.post('/validate-user', validateUserEmail)

module.exports = router;