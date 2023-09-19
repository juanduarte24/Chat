const { Router } = require('express');
const { registerUser, loginUser } = require('./user.controller')
const authenticate = require('../../midlewares/auth.midleware')


const router = Router();

router
    .route('/user')
    .post(registerUser)
    .get(authenticate, (req, res) => {
        
        res.json({ message: 'Aqui van tus mensajes' })
    });
router.post('/login', loginUser);

module.exports = router;