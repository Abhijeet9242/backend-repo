const nodemailer = require("nodemailer")

  module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "83170980ce5c00",
      pass: "5f557b09f6236f",
    },
  });

