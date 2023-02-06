const nodemailer = require("nodemailer");
require("dotenv").config();
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const sendEmailHandle = async (email, subject, template, context) => {
  try {
    const handlebarOptions = {
      viewEngine: {
        partialsDir: path.resolve("./src/mail"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./src/mail"),
    };
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    transporter.use("compile", hbs(handlebarOptions));
    transporter.verify(function (err, success) {
      if (err) {
        console.log("Tidak teroneksi ke Server", err);
      } else {
        console.log("Server terkoneksi, sudah bisa mengirimkan email");
      }
    });
    try {
      await transporter.sendMail({
        from: "latihan-email@smkmadinatulquran.sch.id",
        to: email,
        subject: subject,
        template: template,
        context: context,
      });

      return "success";
    } catch (error) {
      return "gagal";
    }
    return 
  } catch (error) {
    console.log(error);
    return;
  }
};

module.exports = sendEmailHandle;
