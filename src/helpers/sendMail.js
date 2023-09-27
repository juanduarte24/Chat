const transporter = require('./mailer');
const jwt = require('jsonwebtoken');
const ejs = require('ejs');
const path = require('node:path');

require('dotenv').config();

const sendMail = (email, subject, template) => {

    transporter.sendMail({
        to: email,
        subject,
        html: template
    });
}

const sendWelcomeEmail = async (email, data) => {
    //Generar el token
    const token = jwt.sign({ email }, process.env.JWT_EMAIL_SECRET, {
        expiresIn: '3d',
        algorithm: 'HS512'
    })
    //Renderizar el template
    const emailTemplate = path.join(__dirname, '../views/welcome/welcome-email.ejs.html');
    const template = await ejs.renderFile(emailTemplate, {...data,token});
    //enviar el correo 
    sendMail(email, 'Bienvenido al Chat!', template)

}

module.exports = sendWelcomeEmail