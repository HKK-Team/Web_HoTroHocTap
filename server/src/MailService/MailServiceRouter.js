const router = require("express").Router();
const MailSeviceController = require("./MailServiceController");

router.route("/SendMailWarning").put(MailSeviceController.sendMailWarning);
router.route("/SendMailAcademicWarning").put(MailSeviceController.sendMailAcademicWarning);
router.route("/SendMailStopAcademic").put(MailSeviceController.sendMailStopAcademic);
router.route("/:email/otpCode").put(MailSeviceController.sendMailOtpcode);
router.route("/:email/contextConfirmEmail").put(MailSeviceController.sendMailConfirmEmail);
router.route("/:otp/confrimOtp").post(MailSeviceController.conFirmOtpCode);
router.route("/editPassword").put(MailSeviceController.editPassword);
router.route("/:email/conFirmEmail").post(MailSeviceController.conFirmEmail);
module.exports = router;