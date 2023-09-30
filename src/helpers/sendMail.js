const transporter = require('./mailer');
const jwt = require('jsonwebtoken');
const ejs = require('ejs');
const path = require('node:path');
const getIamges = require('./getImages');

require('dotenv').config();

const sendMail = (email, subject, template, attachments) => {

    transporter.sendMail({
        to: email,
        subject,
        html: template,
        attachments,
    });
}

//Creamos una funcion unicamente para obtenr el template de la ruta que le pasemos
const getTemplate = async (templatePath , templateVar)=>{
    const emailTemplate = path.join(__dirname, templatePath);
    const template = await ejs.renderFile(emailTemplate, templateVar);
    return template
}


const sendWelcomeEmail = async (email, data) => {
    //Generar el token
    const token = jwt.sign({ email }, process.env.JWT_EMAIL_SECRET, {
        expiresIn: '3d',
        algorithm: 'HS512'
    })
    
    
    //Obtenemos el template con la funcion que creamos 
    template = await getTemplate('../views/welcome/welcome-email.ejs.html',{...data,token});
    

    //Obtenemos las imagenes con la funcion que creamos para evitar el uso del arreglo manual
    const attachments = await getIamges('/views/welcome/images')
    
    sendMail(email, 'Bienvenido al Chat!', template, attachments)
    //enviar el correo 

}

module.exports = sendWelcomeEmail