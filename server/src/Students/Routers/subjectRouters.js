const router = require('express').Router()
const SubjectCtrl = require('../Controllers/subjectControllers')
router.route('/getSubject')
    .get(SubjectCtrl.GetSubject)
module.exports = router