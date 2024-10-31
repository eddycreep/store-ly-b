const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/admin.controller');

require('dotenv').config({ path: './configuration.env' });

router.get('/getproductreviews', AdminController.getReviews);

//SPECIALS

/**
 * @openapi
 * /savespecial:
 *   post:
 *     tags:
 *      - Specials
 *     description: Save Special
 *     requestBody:
 *      contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SaveSpecialData'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/SaveSpecialResponse'
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad Request
 */
router.post('/savespecial', AdminController.saveSpecial); 


/**
 * @openapi
 * /getspecialid/{:special_name}:
 *   get:
 *     tags:
 *      - Specials
 *     description: Get Special ID
 *     requestBody:
 *      contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetSpecialIDData'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/GetSpecialIDResponse'
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad Request
 */
router.get('/getspecialid/:special_name', AdminController.getSpecialID);


/**
 * @openapi
 * /saveproductspecial:
 *   post:
 *     tags:
 *      - Specials
 *     description: Save Product Special Item
 *     requestBody:
 *      contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SaveProductSpecialData'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/SaveProductSpecialResponse'
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad Request
 */
router.post('/saveproductspecial', AdminController.saveProductSpecial);

/**
 * @openapi
 * /savecombinedspecial:
 *   post:
 *     tags:
 *      - Specials
 *     description: Save Combined Special Items
 *     requestBody:
 *      contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SaveCombinedSpecialData'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/SaveCombinedSpecialResponse'
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad Request
 */
router.post('/savecombinedspecial', AdminController.saveCombinedSpecial);

/**
 * @openapi
 * /updatespecial/{:special_id}:
 *   update:
 *     tags:
 *      - Specials
 *     description: Update Special
 *     requestBody:
 *      contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UpdateSpecialData'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/UpdateSpecialResponse'
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad Request
 */
router.patch('/updatespecial/:special_id', AdminController.updateSpecial); 
router.patch('/updatespecialitem/:special_id', AdminController.updateSpecialItem); 
router.patch('/updatecombinedspecialitems/:special_id/:product_description', AdminController.updateCombinedSpecialItems);

/**
 * @openapi
 * /deletespecial/{special_id}:
 *   delete:
 *     tags:
 *       - Specials
 *     summary: Delete a special by ID
 *     description: Deletes a special based on the provided special ID.
 *     parameters:
 *       - in: path
 *         name: special_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the special to delete
 *     responses:
 *       200:
 *         description: Special deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteSpecialResponse'
 *       409:
 *         description: Conflict in deleting special
 *       400:
 *         description: Bad Request - Invalid parameters
 */
router.delete('/deletespecial/:special_id', AdminController.deleteSpecial);

/**
 * @openapi
 * /deletespecialitem/{special_id}:
 *   delete:
 *     tags:
 *       - Specials
 *     summary: Delete the special item by ID
 *     description: Deletes a special item based on the provided special ID.
 *     parameters:
 *       - in: path
 *         name: special_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the special to delete
 *     responses:
 *       200:
 *         description: Special deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteSpecialItemResponse'
 *       409:
 *         description: Conflict in deleting special
 *       400:
 *         description: Bad Request - Invalid parameters
 */
router.delete('/deletespecialitem/:special_id', AdminController.deleteSpecialItem);

/**
 * @openapi
 * /deletecombinedspecialitems/{special_id}:
 *   delete:
 *     tags:
 *       - Specials
 *     summary: Delete the combined special items by ID
 *     description: Deletes the combined special items based on the provided special ID.
 *     parameters:
 *       - in: path
 *         name: special_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the special to delete
 *     responses:
 *       200:
 *         description: Combined Special Items deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteCombinedSpecialItemsResponse'
 *       409:
 *         description: Conflict in deleting special
 *       400:
 *         description: Bad Request - Invalid parameters
 */
router.delete('/deletecombinedspecialitems/:special_id', AdminController.deleteCombinedSpecialItems);

//REWARDS

/**
 * @openapi
 * /getallrewards:
 *   get:
 *     tags:
 *       - Rewards
 *     description: Get all rewards (active and inactive)
 *     responses:
 *       200:
 *         description: Successfully retrieved all rewards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RewardResponse'
 *       500:
 *         description: Internal server error
 */
router.get('/getallrewards', AdminController.getAllRewards);

/**
 * @openapi
 * /savereward:
 *   post:
 *     tags:
 *       - Rewards
 *     summary: Create a new reward
 *     description: Adds a new reward to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SaveRewardData'
 *     responses:
 *       201:
 *         description: Reward created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SaveRewardResponse'
 *       400:
 *         description: Bad Request - Invalid data
 *       500:
 *         description: Internal Server Error
 */
router.post('/savereward', AdminController.saveReward);

/**
 * @openapi
 * /updatereward/{uid}:
 *   patch:
 *     tags:
 *       - Rewards
 *     summary: Update an existing reward
 *     description: Updates reward details based on the provided UID.
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the reward
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRewardData'
 *     responses:
 *       200:
 *         description: Reward updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateRewardResponse'
 *       400:
 *         description: Bad Request - Invalid data
 *       404:
 *         description: Not Found - Reward not found
 *       500:
 *         description: Internal Server Error
 */
router.patch('/updatereward/:uid', AdminController.updateReward);

/**
 * @openapi
 * /deletereward/{uid}:
 *   delete:
 *     tags:
 *       - Rewards
 *     summary: Delete a reward by ID
 *     description: Deletes a reward based on the provided UID.
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the reward
 *     responses:
 *       200:
 *         description: Reward deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteRewardResponse'
 *       404:
 *         description: Not Found - Reward not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/deletereward/:uid', AdminController.deleteReward);

//surveys

/**
 * @openapi
 * /getallsurveys:
 *   get:
 *     summary: Retrieve all surveys
 *     tags:
 *       - Surveys
 *     description: Fetches all surveys from the database, including both active and inactive surveys.
 *     responses:
 *       200:
 *         description: Successfully retrieved all surveys
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SurveyResponse'
 *       500:
 *         description: Internal server error
 */
router.get('/getallsurveys', AdminController.getAllSurveys)

/**
 * @openapi
 * /savesurvey:
 *   post:
 *     summary: Save a new survey
 *     tags:
 *       - Surveys
 *     description: Adds a new survey to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SaveSurveyRequest'
 *     responses:
 *       201:
 *         description: Survey created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/savesurvey', AdminController.saveSurvey);

/**
 * @openapi
 * /getsurveyid/{survey_title}:
 *   get:
 *     summary: Get survey ID by title
 *     tags:
 *       - Surveys
 *     description: Retrieves the survey ID based on the survey title.
 *     parameters:
 *       - in: path
 *         name: survey_title
 *         required: true
 *         schema:
 *           type: string
 *         description: Title of the survey
 *     responses:
 *       200:
 *         description: Survey ID retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 survey_id:
 *                   type: integer
 *                   description: ID of the survey
 *       404:
 *         description: Survey not found
 *       500:
 *         description: Internal server error
 */
router.get('/getsurveyid/:survey_title', AdminController.getSurveyID);
router.post('/savesurveyquestions', AdminController.saveSurveyQuestions);
router.delete('/deletesurvey/:survey_id', AdminController.deleteSurvey);

router.get('/getactivesurveys', AdminController.getActiveSurveys);
router.get('/getallsurveys', AdminController.getAllSurveys);


module.exports = router;