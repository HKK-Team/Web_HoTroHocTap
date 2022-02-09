const router = require("express").Router();
const MailSeviceController = require("./MailServiceController");

router.route("/Warning").put(MailSeviceController.sendMailWarning);


module.exports = router;