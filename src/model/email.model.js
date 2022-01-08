const dbConn = require("../../config/db.config");
const nodemailer = require("nodemailer");
require("dotenv").config();

var configs = [];

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
      configs = value;
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
};
