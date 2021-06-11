var nodemailer = require('nodemailer');

const sendCredentials = async (req, res) => {
    const {
        login,
        password
    } = req.body;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'cred.notification.service@gmail.com',
            pass: 'f189515633F'
        }
    });

    var mailOptions = {
        subject: "Данные для входа",
        text: `Вы были зарегистрированны в систему контроля сварочных работ.
     Данные для входа в систему: http://weldingcontrol.by/. логин:${login} пароль:${password}`,
        to: `${login}`,
        from: "cred.notification.service@gmail.com"
    };

    transporter.sendMail(mailOptions).then(() => {
            return res
                .status(200)
                .json({
                    msg: "Message was sent!"
                });
        })
        .catch((er) => {
            return res.status(500)
                .json({
                    msg: "Smth went happend"
                })
        });
};

module.exports = {
    sendCredentials,
};