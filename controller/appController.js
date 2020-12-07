const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const EMAIL = "politra.tvorchestva@gmail.com";
const MAIN_URL = "politra.herokuapp.com";

let transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: "politra.tvorchestva@gmail.com",
    pass: "f189515633F",
  },
});

let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Nodemailer",
    link: MAIN_URL,
  },
});

const sendFeedback = (req, res) => {
  let response = {
    body: {
      name,
      intro: "Обратная связь",
      table: {
        data: [
          {
            Name: req.body.Name,
            Competion: req.body.Competion,
            URL: req.body?.URL,
            Text: req.body.text,
          },
        ],
      },
      outro: "Looking forward to do more business with you",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: EMAIL,
    subject: "Feedback",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(200)
        .json({ msg: "you should receive an email from us" });
    })
    .catch((error) => console.error(error));
};

module.exports = {
  sendFeedback,
};
