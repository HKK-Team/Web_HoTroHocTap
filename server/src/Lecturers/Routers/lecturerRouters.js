const router = require('express').Router()
const lecturerCtrl = require('../Controllers/lecturerControllers')
router.route('/login')
    .post(lecturerCtrl.login)
router.route('/getuser')
    .get( lecturerCtrl.getUser)
router.route('/edituser')
    .post( lecturerCtrl.EditUser)
module.exports = router