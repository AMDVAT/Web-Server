const nodemailer = require('nodemailer');

class Mailer {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.HOST_MAIL,
            port: process.env.PORT_MAIL,
            auth: {
                user: process.env.AUTH_USER_MAIL,
                pass: process.env.AUTH_PASS_MAIL
            }
        });

        //opciones por default
        this.mailOption = {
            from: '"Tienda AMDVAT" <elnora65@ethereal.email>', //direccion de envio
            subject: "Suscripcion de productos en tienda AMDVAT" //Asunto
        }
    }

    sendMail(emailDeUsuario,mensajeEnviar) {
       
       let mail = {
           ...this.mailOption,
            to: emailDeUsuario, //usuario o usuarios que recibiran el correo           
            text: mensajeEnviar, // cuerpo en texto plano
            html: mensajeEnviar // cuerpo en html
        }

        this.transporter.sendMail(mail, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log("Mensaje enviado: %s", info.messageId);
            console.log("url de vista previa: %s", nodemailer.getTestMessageUrl(info));
        })
    }
}


module.exports = new Mailer();