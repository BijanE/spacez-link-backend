const emailController = require("../controller/email.controller");
const { EmailConfig, sendEmail } = require("../controller/email.controller");
const router = require("express").Router();

// For configurate email config
router.post("/email-config", EmailConfig);

router.post("/email-send/:username", sendEmail);

module.exports = router;
