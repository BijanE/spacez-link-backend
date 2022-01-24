const {
  EmailConfig,
  sendEmail,
  emailGetLink,
} = require("../controller/email.controller");
const router = require("express").Router();

// For configurate email config
router.post("/email-config", EmailConfig);

router.post("/email-send/:username", sendEmail);

router.get("/email-get-link/:email/:auth", emailGetLink);

module.exports = router;
