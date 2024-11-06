const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/admin.controller');

require('dotenv').config({ path: './configuration.env' });

router.get('/getproductreviews', AdminController.getReviews);

//SPECIALS

/**
 * @openapi
 * /admin/savespecial:
 *   post:
 *     tags:
 *      - Specials
 *     summary: Save Special
 *     description: Save Special
 *     requestBody:
 *      content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SaveSpecialData'
 *     responses:
 *       200:
 *         description: Saving Special - Success
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/SaveSpecialResponse'
 *       500:
 *         description: Internal server error
 */
router.post('/savespecial', AdminController.saveSpecial); 


/**
 * @openapi
 * /admin/getspecialid/{special_name}:
 *   get:
 *     tags:
 *      - Specials
 *     summary: Get Special ID using Special Name
 *     description: Get Special ID
 *     parameters:
 *       - in: path
 *         name: special_name
 *         required: true
 *         schema: 
 *           type: string
 *         description: Name of the special
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *              schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/GetSpecialIDResponse'
 *       400:
 *         description: Bad Request - Invalid data
 *       404:
 *         description: Not Found - Special not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/getspecialid/:special_name', AdminController.getSpecialID);


/**
 * @openapi
 * /admin/saveproductspecial:
 *   post:
 *     tags:
 *      - Specials
 *     summary: Save the product item
 *     description: Save Product Special Item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SaveProductSpecialData'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/SaveProductSpecialResponse'
 *       500:
 *         description: Internal Server Error
 *       400:
 *         description: Bad Request
 */
router.post('/saveproductspecial', AdminController.saveProductSpecial);

/**
 * @openapi
 * /admin/savecombinedspecial:
 *   post:
 *     tags:
 *      - Specials
 *     summary: Save the Combined Product items
 *     description: Save Combined Product Special Items
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SaveCombinedSpecialData'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/SaveCombinedSpecialResponse'
 *       500:
 *         description: Internal Server Error
 *       400:
 *         description: Bad Request
 */
router.post('/savecombinedspecial', AdminController.saveCombinedSpecial);

/**
 * @openapi
 * /admin/updatespecial/{special_id}:
 *   patch:
 *     tags:
 *       - Specials
 *     summary: Update an existing special
 *     description: Updates special details based on the provided special id
 *     parameters:
 *       - in: path
 *         name: special_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the special
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateSpecialData'
 *     responses:
 *       200:
 *         description: Special updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *               $ref: '#/components/schemas/UpdateSpecialResponse'
 *       400:
 *         description: Bad Request - Invalid data
 *       404:
 *         description: Not Found - Special not found
 *       500:
 *         description: Internal Server Error
 */
router.patch('/updatespecial/:special_id', AdminController.updateSpecial); 

/**
 * @openapi
 * /admin/updatespecialitem/{special_id}:
 *   patch:
 *     tags:
 *       - Specials
 *     summary: Update Special Item
 *     description: Updates special item and price based on special id
 *     parameters:
 *       - in: path
 *         name: special_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the special
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateSpecialItemData'
 *     responses:
 *       200:
 *         description: Special Item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *               $ref: '#/components/schemas/UpdateSpecialItemResponse'
 *       400:
 *         description: Bad Request - Invalid data
 *       404:
 *         description: Not Found - Special not found
 *       500:
 *         description: Internal Server Error
 */
router.patch('/updatespecialitem/:special_id', AdminController.updateSpecialItem); 


/**
 * @openapi
 * /admin/updatecombinedspecialitems/{special_id}:
 *   patch:
 *     tags:
 *       - Specials
 *     summary: Update Combined Special Items
 *     description: Updates Combined Special items and price based on special id
 *     parameters:
 *       - in: path
 *         name: special_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the special
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCombinedSpecialItemsData'
 *     responses:
 *       200:
 *         description: Combined Special Items updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *               $ref: '#/components/schemas/UpdateCombinedSpecialItemsResponse'
 *       400:
 *         description: Bad Request - Invalid data
 *       404:
 *         description: Not Found - Special not found
 *       500:
 *         description: Internal Server Error
 */
router.patch('/updatecombinedspecialitems/:special_id', AdminController.updateCombinedSpecialItems);

/**
 * @openapi
 * /admin/deletespecial/{special_id}:
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
 * /admin/deletespecialitem/{special_id}:
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
 * /admin/deletecombinedspecialitems/{special_id}:
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
 * /admin/getallrewards:
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
 * /admin/savereward:
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
 *       200:
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
 * /admin/updatereward/{uid}:
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
 *               type: object
 *               items:
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
 * /admin/deletereward/{uid}:
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
 * /admin/getallsurveys:
 *   get:
 *     tags:
 *       - Surveys
 *     summary: Retrieve all Surveys 
 *     description: Get all Surveys (active and inactive)
 *     responses:
 *       200:
 *         description: Successfully retrieved all Surveys
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
 * /admin/savesurvey:
 *   post:
 *     tags:
 *       - Surveys
 *     summary: Create new survey
 *     description: Adds a new survey to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SaveSurveyData'
 *     responses:
 *       200:
 *         description: Survey created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SaveSurveyResponse'
 *       400:
 *         description: Bad Request - Invalid data
 *       500:
 *         description: Internal Server Error
 */
router.post('/savesurvey', AdminController.saveSurvey);

/**
 * @openapi
 * /admin/getsurveyid/{survey_title}:
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

/**
 * @openapi
 * /admin/savesurveyquestions:
 *   post:
 *     tags:
 *       - Surveys
 *     summary: Save Survey Questions
 *     description: Adds all the questions linked to the survey
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SaveSurveyQuestionsData'
 *     responses:
 *       200:
 *         description: Survey created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SaveSurveyQuestionsResponse'
 *       400:
 *         description: Bad Request - Invalid data
 *       500:
 *         description: Internal Server Error
 */
router.post('/savesurveyquestions', AdminController.saveSurveyQuestions);

/**
 * @openapi
 * /admin/deletesurvey/{survey_id}:
 *   delete:
 *     tags:
 *       - Surveys
 *     summary: Delete a survey by survey_id
 *     description: Deletes a survey based on the provided survey_id.
 *     parameters:
 *       - in: path
 *         name: survey_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the survey
 *     responses:
 *       200:
 *         description: Survey deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteSurveyResponse'
 *       404:
 *         description: Not Found - Survey not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/deletesurvey/:survey_id', AdminController.deleteSurvey);


module.exports = router;