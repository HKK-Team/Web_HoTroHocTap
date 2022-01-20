const router = require('express').Router()
const SubjectScoreCtrl = require('../Controllers/subjectScoreControllers')
router.route('/getSubjectScore')
    .get(SubjectScoreCtrl.GetSubject)
router.route('/inputSubjectScore')
    .post(SubjectScoreCtrl.InputSubjectScore)
module.exports = router