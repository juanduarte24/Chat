const { User } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const registerUser = async (req, res) => {
    try {
        const newUser = req.body;
        await User.create(newUser);
        res.status(201).end();
    } catch (error) {
        res.status(400).json(error);
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

module.exports = {
    registerUser,
    loginUser
}