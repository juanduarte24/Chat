const { User } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const registerUser = async (req, res) => {
    try {
        const newUser = req.body;

        //Vamos a realizar una consulta a la DB innecesaria
        //Validar los datos
        const { firtname, lastname, email, password } = newUser;
        await User.create(newUser);
        res.status(201).end();
        //Enviar un correo al usuario!

    } catch (error) {
        res.status(400).json(error);
        console.log(error)

    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } })
        // null || {}
        if (!user) {
            return res.status(400).json({
                error: 'User does not exist',
                message: 'You need register before'
            })
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({
                error: 'Incorrect Password',
                message: 'The password does not match with user'
            })
        }
        const copyUser = { ...user.dataValues }
        delete copyUser.password
        const token = jwt.sign(copyUser, process.env.JWT_SECRET, {
            algorithm: 'HS512',
            expiresIn: '1h'
        })
        copyUser.token = token;
        res.json(copyUser)


    } catch (error) {
        res.status(400).json(error);
    }
}

const validateUserEmail = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
           return res.status(400).json({ message: 'Token is required' })
        }
        const { email } = jwt.verify(token, process.env.JWT_EMAIL_SECRET, {
            algorithms: 'HS512'
        })
        const user = await User.findOne({ where: { email } });
        if (user.validEmail) {
          return res.status(400).json({ message: 'Email is already verified' })
        }
        user.validEmail = true;
        user.save();
        res.json({ message: 'Email verified successfuly' })
    } catch (error) {
        res.status(400).json(error);
     
    }
}
module.exports = {
    registerUser,
    loginUser, validateUserEmail
}