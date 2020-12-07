const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const EMAIL = "politra.tvorchestva@gmail.com";
const MAIN_URL = "politra.herokuapp.com";

let transporter = nodemailer.createTransport({
  service: "Gmail",
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
      name: "FeedBack",
      intro: "Обратная связь",
      table: {
        data: [
          {
            Name: req.body.Name,
            Competion: req.body.Competion,
            URL: req.body.URL,
            Text: req.body.Text,
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
        .json({ msg: "Message was sent!" });
    })
    .catch((error) => console.error(error));
};

module.exports = {
  sendFeedback,
};
