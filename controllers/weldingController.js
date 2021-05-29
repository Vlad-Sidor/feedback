const nodemailer = require("nodemailer");
const {
    google
} = require("googleapis");

const OAuth2 = google.auth.OAuth2;

const EMAIL = "cred.notification.service@gmail.com";
const REFRESH_TOKEN = "1//04-8FwZSDT-IaCgYIARAAGAQSNwF-L9IrdhXw8Tb479IhWSf6cflecdkbm4xjKB2hL3sG-0ZJQjMB20pBmlMYKfmgsUPxmHeu1UQ";
const CLIENT_SECRET = "kvN7SrcV_muK9YV7feSxMyaz";
const CLIENT_ID = "873430184006-6pjaac54p8lhhsii5p9gco4eht1pc2br.apps.googleusercontent.com";



const oauth2Client = new OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
});

const createTransporter = async () => {
    const oauth2Client = new OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
        refresh_token: REFRESH_TOKEN
    });

    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if (err) {
                reject();
            }
            resolve(token);
        });
    });

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: EMAIL,
            accessToken,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN
        }
    });

    return transporter;
};


const sendCredentials = async (req, res) => {
    const {
        login,
        password
    } = req.body;

    let emailTransporter = await createTransporter();
    await emailTransporter.sendMail({
            subject: "Данные для входа",
            text: `Вы были зарегистрированны в систему контроля сварочных работ.
         Данные для входа в систему: http://weldingcontrol.by/. логин:${login} пароль:${password}`,
            to: `${login}`,
            from: EMAIL
        }).then(() => {
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