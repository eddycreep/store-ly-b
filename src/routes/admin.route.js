const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/admin.controller');

require('dotenv').config({ path: './configuration.env' });

router.get('/getproductreviews', AdminController.getReviews);

//specials
router.post('/savespecial', AdminController.saveSpecial); 
router.get('/getspecialid/:special_name', AdminController.getSpecialID);

router.post('/saveproductspecial', AdminController.saveProductSpecial);
router.post('/savecombinedspecial', AdminController.saveCombinedSpecial);

router.patch('/updatespecial/:special_id', AdminController.updateSpecial); 
router.patch('/updatespecialitem/:special_id', AdminController.updateSpecialItem); 
router.patch('/updatecombinedspecialitems/:special_id/:product_description', AdminController.updateCombinedSpecialItems);

router.delete('/deletespecial/:special_id', AdminController.deleteSpecial);
router.delete('/deleteproductspecial/:special_id', AdminController.deleteProductSpecial);
router.delete('/deletecombinedspecial/:special_id', AdminController.deleteCombinedSpecialItems);

//rewards
router.patch('/savereward', AdminController.saveReward);
router.patch('/updatereward/:uid', AdminController.updateReward);
router.delete('/deletereward/:uid', AdminController.deleteReward);

//surveys
router.post('/savesurvey', AdminController.saveSurvey);
router.get('/getsurveyid/:survey_title', AdminController.getSurveyID);
router.post('/savesurveyquestions', AdminController.saveSurveyQuestions);
router.delete('/deletesurvey/:survey_id', AdminController.deleteSurvey);

router.get('/getactivesurveys', AdminController.getActiveSurveys);
router.get('/getallsurveys', AdminController.getAllSurveys);


module.exports = router;