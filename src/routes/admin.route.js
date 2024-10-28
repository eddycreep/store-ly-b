const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/admin.controller');

require('dotenv').config({ path: './configuration.env' });

router.get('/getproductreviews', AdminController.getReviews);

//specials
router.post('/savespecial', AdminController.saveSpecial); //save the special
router.get('/getspecialid/:special_name', AdminController.getSpecialID); //get the special id

router.post('/saveproductspecial', AdminController.saveProductSpecial); //save the special item
router.post('/savecombinedspecial', AdminController.saveCombinedSpecial); //save the combined special items

//surveys
router.post('/savesurvey', AdminController.saveSurvey); //save the survey
router.get('/getsurveyid/:survey_title', AdminController.getSurveyID); //get the survey id
router.post('/savesurveyquestions', AdminController.saveSurveyQuestions); //save the survey questions


module.exports = router;