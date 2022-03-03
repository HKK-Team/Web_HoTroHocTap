const router = require("express").Router();
const MailSeviceController = require("./MailServiceController");

router.route("/SendMailWarning").put(MailSeviceController.sendMailWarning);
router.route("/SendMailAcademicWarning").put(MailSeviceController.sendMailAcademicWarning);

module.exports = router;