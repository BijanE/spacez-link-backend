const {
  EmailConfig,
  sendEmail,
  emailGetLink,
} = require("../model/email.model");

const CryptoJS = require("crypto-js");

module.exports = {
  EmailConfig: (req, res) => {
    const body = req.body;
    if (
      body.email_username.includes("@") &&
      body.email_username.includes("gmail.com")
    ) {
      var atPosition = body.email_username.indexOf("@");
      var email = body.email_username.slice(0, atPosition);
    } else {
      return res.status(400).json({
        isAuth: false,
        massage: "Please Enter Email In Right Way",
        error: null,
        data: null,
      });
    }
    if (body.email_password.length != 16) {
      return res.status(400).json({
        isAuth: false,
        massage: "Please Enter Autenticator Password In Right Way",
        error: null,
        data: null,
      });
    }
    const cipher = CryptoJS.AES.encrypt(
      body.email_password,
      process.env.KEY
    ).toString();
    body.email_password = cipher;
    EmailConfig(body, (err, results) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({
            isAuth: false,
            massage: "Duplicate Entry On Email",
            error: err,
            data: null,
          });
        } else {
          return res.status(500).json({
            isAuth: false,
            massage: "Connection Error Happened",
            error: err,
            data: null,
          });
        }
      } else {
        return res.status(201).json({
          isAuth: true,
          massage: "Link gotten successfuly",
          error: null,
          link: `https://spacez-link.herokuapp.com/api/submit/email-send/${email}`,
          data: null,
        });
      }
    });
  },
  //For sending emails
  sendEmail: (req, res) => {
    const body = req.body;
    sendEmail(body, req.params.username, (err, results) => {
      if (err) {
        return res.status(400).json({
          isAuth: false,
          error: err,
          massage: "Cannot send a email",
          data: null,
        });
      } else {
        return res.status(201).json({
          isAuth: true,
          error: null,
          massage: "Email has been sent successfuly",
        });
      }
    });
  },
  // Get link if its forgotten
  emailGetLink: (req, res) => {
    if (req.params.auth.length != 16) {
      return res.status(400).json({
        isAuth: false,
        massage: "Please Enter Autenticator Password In Right Way",
      });
    }
    if (
      !req.params.email.includes("@") ||
      !req.params.email.includes("gmail.com")
    ) {
      return res.status(400).json({
        isAuth: false,
        massage: "Please Enter Email In Right Way",
      });
    }
    emailGetLink(req.params.email, req.params.auth, (err, results) => {
      var atPosition = req.params.email.indexOf("@");
      var email = req.params.email.slice(0, atPosition);
      if (!results) {
        return res.status(400).json({
          isAuth: false,
          massage: "Cannot get link or link doesnt exist!",
        });
      } else if (results) {
        return res.status(200).json({
          isAuth: true,
          link: `https://spacez-link.herokuapp.com/api/submit/email-send/${email}`,
          massage: "Link gotten successfuly",
        });
      }
    });
  },
};
