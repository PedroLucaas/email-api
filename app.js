const express = require("express");
var bodyParser = require("body-parser");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const multer = require("multer");

const upload = multer();

dotenv.config();

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "geral@fineplac.com",
    pass: process.env.PASS,
  },
});

app.post("/send", upload.none(), (req, res) => {
  var { name, email, message } = req.body;
  console.log(req.body);

  transporter.sendMail(
    {
      from: "geral@fineplac.com",
      to: "pedro09031@gmail.com",
      replyTo: email,
      subject: "Contacto Site",
      text: `
      Olá, Nova notificação do Site
      ${name} esta a contactar com a seguinte mensagem:
      ${message}.
      `,
    },
    (err, info) => {
      console.log(info);
      console.log(err);
    },
  );

  res.send("Usuário adicionado com sucesso");
});

app.get("/send", upload.none(), (req, res) => {
  res.send("Usuário adicionado com sucesso");
});

app.listen(process.env.PORT, () => {
  console.log(`Server Listening at http://localhost:${process.env.PORT}`);
});
