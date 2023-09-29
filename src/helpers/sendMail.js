const transporter = require('./mailer');
const jwt = require('jsonwebtoken');
const ejs = require('ejs');
const path = require('node:path');

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
    
    const attachments = [
        {
        filename : 'Email-Illustration.png',
        path : path.join(__dirname, '../views/welcome/images/Email-Illustration.png'),
        cid : 'logo'
        
    },
    {
        filename: 'Beefree-logo.png',
        path : path.join(__dirname,'../views/welcome/images/Beefree-logo.png'),
        cid : 'logo1'
    },
    {
        filename : 'facebook2x.png',
        path : path.join(__dirname,'../views/welcome/images/facebook2x.png' ),
        cid : 'logof'
    }
    ,
    {
        filename: 'twitter2x.png',
        path: path.join(__dirname, '../views/welcome/images/twitter2x.png'),
        cid: 'xt'
    }
]
    
    sendMail(email, 'Bienvenido al Chat!', template, attachments)
    //enviar el correo 

}

module.exports = sendWelcomeEmail