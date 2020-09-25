const nodemailer = require("nodemailer");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // generated ethereal user
    pass: process.env.PASSWORD, // generated ethereal password
  },
});

// send mail with defined transport object
const send = async (msj, transporter) => {
  const info = await transporter.sendMail(msj);
  return info;
};

module.exports.transporter = transporter;
module.exports.send = send;
