const nodemailer = require("nodemailer");

  module.exports = nodemailer.createTransport({

    host: "smtp.mailtrap.io",

    port: 587,

    secure: false, // upgrade later with STARTTLS

    auth: {

      user: "2406842297f7b6",
      pass: "342e545e956622",

    },
    
  });


