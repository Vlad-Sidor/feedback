const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const {
    cred
} = require('./data')


let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: cred.user,
        pass: cred.pas
    },
});

let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Nodemailer",
        link: cred.user,
    },
});

const sendCredentials = (req, res) => {
    const {
        login,
        password
    } = req.body;

    let response = {
        body: {
            name: "Данные для входа",
            intro: "Данные для входа",
            table: {
                data: [{
                    login: login,
                    password: password,
                }, ],
            },
            outro: "Looking forward to do more business with you",
        },
    };

    let mail = MailGenerator.generate(response);

    let message = {
        from: cred.user,
        to: login,
        subject: "Credentials",
        html: mail,
    };

    transporter
        .sendMail(message)
        .then(() => {
            return res
                .status(200)
                .json({
                    msg: "Message was sent!"
                });
        })
        .catch((error) => console.error(error));
};

module.exports = {
    sendCredentials,
};