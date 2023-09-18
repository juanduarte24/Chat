const { Router } = require('express');
const {registerUser,loginUser} = require('./user.controller')


const router = Router();
router.route("/user").post(registerUser);

router.post('/login',loginUser)

module.exports = router;