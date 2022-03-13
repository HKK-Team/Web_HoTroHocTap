const router = require('express').Router()
const SubjectCtrl = require('../Controllers/subjectControllers')
router.route('/getSubject')
    .get(SubjectCtrl.GetSubject)
router.route('/NewSubject')
    .post(SubjectCtrl.NewSubject)
module.exports = router