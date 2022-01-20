const router = require('express').Router()
const studentCtrl = require('../Controllers/userControllers')
router.route('/login')
    .post(studentCtrl.login)
router.route('/edituser')
    .post(studentCtrl.EditUser)
router.route('/getuser')
    .get(studentCtrl.GetUser)
module.exports = router
