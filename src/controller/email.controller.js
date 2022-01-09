const { EmailConfig, sendEmail } = require("../model/email.model");

module.exports = {
  EmailConfig: (req, res) => {
    const body = req.body;
    if (body.email_username.includes("@")) {
      var atPosition = body.email_username.indexOf("@");
      var email = body.email_username.slice(0, atPosition);
    } else {
      return res.status(400).json({
        isAuth: false,
        massage: "Please Enter Email In Right Way",
      });
    }
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
          massage: "The Email Config has been created successfuly",
          error: null,
          link: `https://spacez-link.herokuapp.com/api/submit/email-send/${email}`,
          data: results,
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
          data: results,
        });
      }
    });
  },
};
