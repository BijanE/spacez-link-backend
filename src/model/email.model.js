const dbConn = require("../../config/db.config");
const nodemailer = require("nodemailer");
require("dotenv").config();

const CryptoJS = require("crypto-js");

var configs = [];
var linked = [];

module.exports = {
  // for configurating the emailadress
  EmailConfig: (data, callback) => {
    dbConn.query(
      "INSERT INTO emailconfigs (email_username, email_password) VALUES (?,?)",
      [data.email_username, data.email_password],
      (error, results, _fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results);
        }
      }
    );
  },
  // for sending mails
  sendEmail: (data, username, callback) => {
    function setValue(value) {
      const bytes = CryptoJS.AES.decrypt(
        value[0].email_password,
        process.env.KEY
      );
      const password = bytes.toString(CryptoJS.enc.Utf8);
      configs = value;
      configs[0].email_password = password;
    }

    const my = new Promise((resolve, reject) => {
      dbConn.query(
        "select * from emailconfigs WHERE email_username=?",
        username + "@gmail.com",
        function (err, rows) {
          if (err) {
            throw err;
          } else {
            resolve(setValue(rows));
          }
        }
      );
    });

    my.then(() => {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: configs[0].email_username,
          pass: configs[0].email_password,
        },
      });

      const options = {
        from: configs[0].email_username,
        to: configs[0].email_username,
        subject: data.subject,
        text:
          "Gönderen Email: " +
          data.senderEmail +
          "\n" +
          "Gönderen Ad ve Soyadı: " +
          data.senderNamesurname +
          "\n" +
          "İçerik: " +
          data.text,
      };

      transporter.sendMail(options, (error, results, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results);
        }
      });
    });
  },
  // For getting back the link you have if you forgot it
  emailGetLink: (email, auth, callback) => {
    function setValue(value) {
      const bytes = CryptoJS.AES.decrypt(
        value[0].email_password,
        process.env.KEY
      );
      const password = bytes.toString(CryptoJS.enc.Utf8);
      linked = value;
      linked[0].email_password = password;
    }
    const my = new Promise((resolve, reject) => {
      dbConn.query(
        "SELECT email_password FROM emailconfigs WHERE email_username=?",
        email,
        function (err, rows) {
          if (err) {
            throw err;
          } else {
            resolve(setValue(rows));
          }
        }
      );
    });
    my.then(() => {
      if (auth == linked[0].email_password) {
        return callback(null, true);
      } else {
        return callback(null, false);
      }
    });
  },
};
