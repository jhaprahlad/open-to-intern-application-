const express = require('express');
const router = express.Router();
const {createCollege, collegeDetails} = require('../controller/collegeControl')
const {createIntern} = require('../controller/internControl')

//router for college
router.post('/functionup/colleges', createCollege)
router.get('/functionup/collegeDetails' , collegeDetails )
module.exports = router;

//router for interns
router.post('/functionup/interns', createIntern)

module.exports= router