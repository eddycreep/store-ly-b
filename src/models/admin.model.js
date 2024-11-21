var dbConn = require("../../config/db.config");

var Admin = function (user) {
    this.id = user.id;
    this.client_name = user.client_name;
    this.client_image = user.client_image;
    this.product = user.product;
    this.rating = user.rating;
    this.date = user.date;
    this.comment = user.comment
};

Admin.getReviews = (result) => {
    dbConn.query('SELECT id, client_name, client_image, product, rating, date, comment FROM store_loyalty.tblproductreviews', (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting customer product reviews' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

//save specials

/**
 * @openapi
 * components:
 *  schemas:
 *      SaveSpecialData:
 *          type: object
 *          required:
 *              - special_name
 *              - special
 *              - special_type
 *              - store_id
 *              - start_date
 *              - expiry_date
 *              - special_value
 *              - isActive
 *          properties:  
 *              special_name:  
 *                  type: string
 *                  default: Fruits Special
 *              special:
 *                  type: string
 *                  default: Buy-Any-Two-Get-10%-Off
 *              special_type:
 *                  type: string
 *                  default: Combined Special
 *              store_id:
 *                  type: string
 *                  default: S001
 *              start_date:
 *                  type: string
 *                  default: 2024-10-27 00:00:00
 *              expiry_date:
 *                  type: string
 *                  default: 2024-10-27 00:00:00
 *              special_value:
 *                  type: string
 *                  default: Percentage
 *              isActive:
 *                  type: number
 *                  default: 1
 *      SaveSpecialResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Reward added successfully"
 */
Admin.saveSpecial = (req, result) => {
    const { specialName, special, specialType, storeId, startDate, expiryDate, specialValue, isActive } = req.body;
    dbConn.query('INSERT INTO store_loyalty.tblspecials (special_name, special, special_type, store_id, start_date, expiry_date, special_value, isActive) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', [specialName, special, specialType, storeId, startDate, expiryDate, specialValue, isActive], (err, res) => {
        if (err) {
            console.log('Error while saving the Special:' + err);
            result(err, null);
        } else {
            console.log('Saving the Special was Successful:', res);
            result(null, res);
        }
    });
}

/**
 * @openapi
 * components:
 *  schemas:
 *      GetSpecialIDData:
 *          type: object
 *          required:
 *              - special_id
 *          properties:  
 *              special_id:  
 *                  type: number
 *                  default: 1
 *      GetSpecialIDResponse:
 *          type: object
 *          properties:
 *              special_id:  
 *                  type: number
 */
Admin.getSpecialID = (req, result) => {
    dbConn.query('SELECT special_id FROM store_loyalty.tblspecials WHERE special_name = ?', [req.params.special_name], (err, res) => {
        if (err) {
            console.log('Error while getting the special id' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

/**
 * @openapi
 * components:
 *  schemas:
 *      SaveProductSpecialData:
 *          type: object
 *          required:
 *              - special_id 
 *              - product_description
 *              - special_price
 *          properties:  
 *              special_id:  
 *                  type: number
 *                  default: 1
 *              product_description:
 *                  type: string
 *                  default: SWITCH 440ML
 *              special_price:
 *                  type: string
 *                  default: 15.99
 *      SaveProductSpecialResponse:
 *       properties:
 *         message:
 *           type: string
 *           example: "Saving Product Special - Success"
 */
Admin.saveProductSpecial = (req, result) => {
    const { special_id, product_description, special_price } = req.body;
    dbConn.query('INSERT INTO store_loyalty.tblspecialitems(special_id, product_description, special_price) VALUES(?, ?, ?)', [special_id, product_description, special_price], (err, res) => {
        if (err) {
            console.log('Error while adding the individual Products special:' + err);
            result(err, null);
        } else {
            console.log('Adding the individual Products special was successful:', res);
            result(null, res);
        }
    });
}


/**
 * @openapi
 * components:
 *  schemas:
 *      SaveCombinedSpecialData:
 *          type: object
 *          required:
 *              - special_id 
 *              - special_group_id 
 *              - product_description
 *              - special_price
 *          properties:  
 *              special_id:  
 *                  type: number
 *                  default: 1
 *              special_group_id:  
 *                  type: number
 *                  default: 2
 *              product_description:
 *                  type: string
 *                  default: SWITCH 440ML
 *              special_price:
 *                  type: string
 *                  default: 15.99
 *      SaveCombinedSpecialResponse:
 *       properties:
 *         message:
 *           type: string
 *           example: "Saving Combined Product Special - Success"
 */
Admin.saveCombinedSpecial = (req, result) => {
    const { specialGroupID, product, special, specialPrice, specialType, startDate, expiryDate, isActive } = req.body;
    dbConn.query('insert into store_loyalty.tblproductgroupspecial(SpecialGroupID, Product, Special, SpecialPrice, SpecialType, StartDate, ExpiryDate, isActive) values(?, ?, ?, ?, ?, ?, ?, ?)', [specialGroupID, product, special, specialPrice, specialType, startDate, expiryDate, isActive ], (err, res) => {
        if (err) {
            console.log('Error while adding the Products special:' + err);
            result(err, null);
        } else {
            console.log('Adding the Products special was successful:', res);
            result(null, res);
        }
    });
}

//update specials

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateSpecialData:
 *       type: object
 *       required:
 *         - special_name
 *         - special
 *         - special_type
 *         - store_id
 *         - start_date
 *         - expiry_date
 *         - special_value
 *         - isActive
 *       properties:
 *         special_name:
 *           type: string
 *           example: "Back To School"
 *         special:
 *           type: string
 *           example: "10% off during the holiday season"
 *         special_type:
 *           type: string
 *           example: "Discount"
 *         store_id:
 *           type: string
 *           example: "Seasonal"
 *         start_date:
 *           type: string
 *           example: 100
 *         expiry_date:
 *           type: string
 *           example: "store123"
 *         special_value:
 *           type: string
 *           format: date
 *           example: "2024-11-01"
 *         isActive:
 *           type: integer
 *           example: 1
 *     UpdateSpecialResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Special updated successfully"
 */
Admin.updateSpecial = (req, result) => {
    const { special_name, special, special_type, store_id, start_date, expiry_date, special_value, isActive } = req.body;
    dbConn.query(`UPDATE store_loyalty.tblspecials SET special_name = ?, special = ?, special_type = ?, store_id = ?, start_date = ?, expiry_date = ?, special_value = ?, isActive = ? WHERE special_id = ?`, [special_name, special, special_type, store_id, start_date, expiry_date, special_value, isActive, req.params.special_id], (err, res) => {
        if (err) {
            console.log('Error while getting all upcoming product group specials' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}


/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateSpecialItemData:
 *       type: object
 *       required:
 *         - product_description
 *         - special_price
 *       properties:
 *         product_description:
 *           type: string
 *           example: SWITCH 440ML
 *         special_price:
 *           type: number
 *           example: 19.99
 *     UpdateSpecialItemResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Update Special Item - Success"
 */
Admin.updateSpecialItem = (req, result) => {
    const { product_description, special_price } = req.body;
    dbConn.query(`UPDATE store_loyalty.tblspecialitems SET product_description = ?, special_price = ? WHERE special_id = ?`, [product_description, special_price, req.params.special_id], (err, res) => {
        if (err) {
            console.log('Error while updating the Group Product x Price' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}


/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateCombinedSpecialItemsData:
 *       type: object
 *       required:
 *         - special_group_id
 *         - product_description
 *         - special_price
 *       properties:
 *         special_group_id:
 *           type: number
 *           example: 1
 *         product_description:
 *           type: string
 *           example: SWITCH 440ML
 *         special_price:
 *           type: number
 *           example: 19.99
 *     UpdateCombinedSpecialItemsResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Update Combined Special Item - Success"
 */
Admin.updateCombinedSpecialItems = (req, result) => {
    const { special_group_id, product_description, special_price } = req.body;
    dbConn.query(`UPDATE store_loyalty.tblspecials_combinedgroup SET special_group_id = ?, product_description = ?, special_price = ? WHERE special_id = ? AND product_description = ?`, [special_group_id, product_description, special_price, req.params.special_id, req.params.product_description], (err, res) => {
        if (err) {
            console.log('Error while updating the Combined Special Items' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

//delete specials

/**
 * @openapi
 * components:
 *   schemas:
 *     DeleteSpecialResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Special deleted successfully"
 */
Admin.deleteSpecial = (req, result) => {
    dbConn.query('DELETE FROM store_loyalty.tblspecials WHERE special_id = ?', [req.params.special_id], (err, res) => {
        if (err) {
            console.log('Error while removing the Reward:' + err);
            result(err, null);
        } else {
            console.log('Removing the Reward was successful:', res);
            result(null, res);
        }
    });
}

/**
 * @openapi
 * components:
 *   schemas:
 *     DeleteSpecialItemResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Special item deleted successfully"
 */
Admin.deleteSpecialItem = (req, result) => {
    dbConn.query('DELETE FROM store_loyalty.tblspecialitems WHERE special_id = ?', [req.params.special_id], (err, res) => {
        if (err) {
            console.log('Error while removing the Reward:' + err);
            result(err, null);
        } else {
            console.log('Removing the Reward was successful:', res);
            result(null, res);
        }
    });
}

/**
 * @openapi
 * components:
 *   schemas:
 *     DeleteCombinedSpecialItemsResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Special item deleted successfully"
 */
Admin.deleteCombinedSpecialItems = (req, result) => {
    dbConn.query('DELETE FROM store_loyalty.tblspecials_combinedgroup WHERE special_id = ?', [req.params.special_id], (err, res) => {
        if (err) {
            console.log('Error while removing the Reward:' + err);
            result(err, null);
        } else {
            console.log('Removing the Reward was successful:', res);
            result(null, res);
        }
    });
}


Admin.saveCombinedSpecial = (req, result) => {
    const { specialGroupID, product, special, specialPrice, specialType, startDate, expiryDate, isActive } = req.body;
    dbConn.query('insert into store_loyalty.tblproductgroupspecial(SpecialGroupID, Product, Special, SpecialPrice, SpecialType, StartDate, ExpiryDate, isActive) values(?, ?, ?, ?, ?, ?, ?, ?)', [specialGroupID, product, special, specialPrice, specialType, startDate, expiryDate, isActive ], (err, res) => {
        if (err) {
            console.log('Error while adding the Products special:' + err);
            result(err, null);
        } else {
            console.log('Adding the Products special was successful:', res);
            result(null, res);
        }
    });
}

//rewards

/**
 * @openapi
 * components:
 *   schemas:
 *     RewardResponse:
 *       type: object
 *       properties:
 *         reward_id:
 *           type: integer
 *           description: Unique identifier for the reward
 *         reward_title:
 *           type: string
 *           description: Title of the reward
 *         description:
 *           type: string
 *           description: Detailed description of the reward
 *         reward:
 *           type: string
 *           description: Reward item or benefit
 *         reward_type:
 *           type: string
 *           description: Type/category of the reward
 *         reward_price:
 *           type: number
 *           format: float
 *           description: Price or cost associated with the reward
 *         store_id:
 *           type: integer
 *           description: Identifier for the store offering the reward
 *         region:
 *           type: string
 *           description: Region where the reward is available
 *         start_date:
 *           type: string
 *           format: date
 *           description: Start date of the reward availability
 *         expiry_date:
 *           type: string
 *           format: date
 *           description: Expiry date of the reward availability
 *         loyalty_tier:
 *           type: string
 *           description: The tier in which the reward is available
 *         age_group:
 *           type: string
 *           description: The age group in which the reward is available
 *         isActive:
 *           type: integer
 *           description: Status of the reward (1 for active, 0 for inactive)
 */
Admin.getAllRewards = (result) => {
    dbConn.query('SELECT reward_id, reward_title, description, reward, reward_type, reward_price, store_id, region, start_date, expiry_date, loyalty_tier, age_group, isActive FROM store_loyalty.tblrewards', (err, res) => {
        if (err) {
            console.log('Error while fetching the all Rewards:' + err);
            result(err, null);
        } else {
            console.log('Fetching the all rewards was successful:', res);
            result(null, res);
        }
    });
}

/**
 * @openapi
 * components:
 *   schemas:
 *     SaveRewardData:
 *       type: object
 *       required:
 *         - reward_title
 *         - reward
 *         - reward_type
 *         - reward_price
 *         - store_id
 *         - start_date
 *         - expiry_date
 *         - loyalty_tier
 *         - age_group
 *         - isActive
 *       properties:
 *         reward_title:
 *           type: string
 *           example: "Holiday Discount"
 *         description:
 *           type: string
 *           example: "10% off during the holiday season"
 *         reward:
 *           type: string
 *           example: "Discount"
 *         reward_type:
 *           type: string
 *           example: "Seasonal"
 *         reward_price:
 *           type: number
 *           example: 100
 *         store_id:
 *           type: string
 *           example: "store123"
 *         start_date:
 *           type: string
 *           format: date
 *           example: "2024-11-01"
 *         expiry_date:
 *           type: string
 *           format: date
 *           example: "2024-12-31"
 *         loyalty_tier:
 *           type: string
 *           example: "Gold"
 *         age_group:
 *           type: string
 *           example: "18-24"
 *         isActive:
 *           type: integer
 *           example: 1
 *     SaveRewardResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Reward added successfully"
 */
Admin.saveReward = (req, result) => {
    const { reward_title, description, reward, reward_type, reward_price, store_id, region, start_date, expiry_date, loyalty_tier, age_group, isActive } = req.body;
    dbConn.query('INSERT INTO store_loyalty.tblrewards(reward_title, description, reward, reward_type, reward_price, store_id, start_date, expiry_date, loyalty_tier, age_group, isActive)VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [reward_title, description, reward, reward_type, reward_price, store_id, region, start_date, expiry_date, loyalty_tier, age_group, isActive], (err, res) => {
        if (err) {
            console.log('Error while adding the Alternative Rewads:' + err);
            result(err, null);
        } else {
            console.log('Adding the ALternative Rewads was successful:', res);
            result(null, res);
        }
    });
}

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateRewardData:
 *       type: object
 *       required:
 *         - reward_title
 *         - reward
 *         - reward_type
 *         - reward_price
 *         - store_id
 *         - region
 *         - start_date
 *         - expiry_date
 *         - loyalty_tier
 *         - age_group
 *         - isActive
 *       properties:
 *         reward_title:
 *           type: string
 *           example: "Holiday Discount"
 *         description:
 *           type: string
 *           example: "10% off during the holiday season"
 *         reward:
 *           type: string
 *           example: "Discount"
 *         reward_type:
 *           type: string
 *           example: "Seasonal"
 *         reward_price:
 *           type: number
 *           example: 100
 *         store_id:
 *           type: string
 *           example: "store123"
 *         region:
 *           type: string
 *           example: "Gauteng"
 *         start_date:
 *           type: string
 *           format: date
 *           example: "2024-11-01"
 *         expiry_date:
 *           type: string
 *           format: date
 *           example: "2024-12-31"
 *         loyalty_tier:
 *           type: string
 *           example: "Gold"
 *         age_group:
 *           type: string
 *           example: "Young Adults"
 *         isActive:
 *           type: boolean
 *           example: true
 *     UpdateRewardResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Reward updated successfully"
 *         uid:
 *           type: string
 *           example: "reward123"
 *     DeleteRewardResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Reward deleted successfully"
 */
Admin.updateReward = (req, result) => {
    const { reward_title, description, reward, reward_type, reward_price, store_id, region, start_date, expiry_date, loyalty_tier, age_group, isActive } = req.body;
    dbConn.query('UPDATE store_loyalty.tblrewards SET reward_title = ?, description = ?, reward = ?, reward_type = ?, reward_price = ?, store_id = ?, region = ?, start_date = ?, expiry_date = ?, loyalty_tier = ?, age_group = ?, isActive = ? WHERE reward_id = ?', [reward_title, description, reward, reward_type, reward_price, store_id, region, start_date, expiry_date, loyalty_tier, age_group, isActive, req.params.reward_id], (err, res) => {
        if (err) {
            console.log('Error while updating the Alternative Rewads:' + err);
            result(err, null);
        } else {
            console.log('Updating the ALternative Rewads was successful:', res);
            result(null, res);
        }
    });
}

Admin.deleteReward = (req, result) => {
    dbConn.query('DELETE FROM store_loyalty.tblrewards WHERE reward_id = ?', [req.params.reward_id], (err, res) => {
        if (err) {
            console.log('Error while removing the Reward:' + err);
            result(err, null);
        } else {
            console.log('Removing the Reward was successful:', res);
            result(null, res);
        }
    });
}

/**
 * @openapi
 * components:
 *   schemas:
 *     SurveyResponse:
 *       type: object
 *       properties:
 *         survey_id:
 *           type: integer
 *           description: Unique identifier for the survey
 *         survey_title:
 *           type: string
 *           description: Title of the survey
 *         survey_category:
 *           type: string
 *           description: Detailed description of the survey
 *         store_id:
 *           type: string
 *           description: Store  ID 
 *         region:
 *           type: string
 *           description: Type/category of the survey
 *         start_date:
 *           type: string
 *           format: float
 *           description: Price or cost associated with the survey
 *         expiry_date:
 *           type: string
 *           description: Identifier for the store offering the survey
 *         isActive:
 *           type: integer
 *           description: Status of the survey (1 for active, 0 for inactive)
 */
Admin.getAllSurveys = (result) => {
    dbConn.query('SELECT survey_id, survey_title, survey_category, store_id, region, start_date, expiry_date, isActive FROM store_loyalty.tblsurvey', (err, res) => {
        if (err) {
            console.log('Error while Fetching all Surveys:' + err);
            result(err, null);
        } else {
            console.log('Fetching all Surveys was Successful:', res);
            result(null, res);
        }
    });
}

/**
 * @openapi
 * components:
 *   schemas:
 *     SaveSurveyData:
 *       type: object
 *       required:
 *         - survey_title
 *         - survey_category
 *         - store_id
 *         - region
 *         - start_date
 *         - expiry_date
 *         - isActive
 *       properties:
 *         survey_title:
 *           type: string
 *           example: "Customer Satisfaction Survey"
 *         survey_category:
 *           type: string
 *           example: "Feedback on Shopping Experience"
 *         store_id:
 *           type: string
 *           example: "store123"
 *         region:
 *           type: string
 *           example: "North-East"
 *         start_date:
 *           type: string
 *           format: date
 *           example: "2024-11-01"
 *         expiry_date:
 *           type: string
 *           format: date
 *           example: "2024-12-31"
 *         isActive:
 *           type: integer
 *           example: 1
 *     SaveSurveyResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Saving Survey - Success"
 */
Admin.saveSurvey = (req, result) => {
    const { survey_title, survey_category, store_id, loyalty_tier, start_date, expiry_date, isActive } = req.body;
    dbConn.query('INSERT INTO store_loyalty.tblsurvey(survey_title, survey_category, store_id, loyalty_tier, start_date, expiry_date, isActive) VALUES(?, ?, ?, ?, ?, ?, ?)', [survey_title, survey_category, store_id, loyalty_tier, start_date, expiry_date, isActive], (err, res) => {
        if (err) {
            console.log('Error while saving the Survey:' + err);
            result(err, null);
        } else {
            console.log('Saving the Survey was Successful:', res);
            result(null, res);
        }
    });
}

Admin.getSurveyID = (req, result) => {
    dbConn.query('SELECT survey_id FROM store_loyalty.tblsurvey where survey_title = ?', [req.params.survey_title], (err, res) => {
        if (err) {
            console.log('Error while getting the survey id' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

/**
 * @openapi
 * components:
 *   schemas:
 *     SaveSurveyQuestionsData:
 *       type: object
 *       required:
 *         - survey_id
 *         - question_text
 *         - question_type
 *       properties:
 *         survey_id:
 *           type: integer
 *           example: 1
 *         question_text:
 *           type: string
 *           example: "'How satisfied are you with the cooldrink flavors available?'"
 *         question_type:
 *           type: string
 *           example: "Rating"
 *     SaveSurveyQuestionsResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Saving Survey Questions - Success"
 */
Admin.saveSurveyQuestions = (req, result) => {
    const { survey_id, question_text, question_type } = req.body;
    dbConn.query('INSERT store_loyalty.tblsurvey_questions(survey_id, question_text, question_type)VALUES(?, ?, ?)', [survey_id, question_text, question_type], (err, res) => {
        if (err) {
            console.log('Error while saving the Survey Questions:' + err);
            result(err, null);
        } else {
            console.log('Saving the Survey Questions was Successful:', res);
            result(null, res);
        }
    });
}

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateRewardData:
 *       type: object
 *       required:
 *         - reward_title
 *         - reward
 *         - reward_type
 *         - reward_price
 *         - store_id
 *         - start_date
 *         - expiry_date
 *         - isActive
 *       properties:
 *         reward_title:
 *           type: string
 *           example: "Holiday Discount"
 *         description:
 *           type: string
 *           example: "10% off during the holiday season"
 *         reward:
 *           type: string
 *           example: "Discount"
 *         reward_type:
 *           type: string
 *           example: "Seasonal"
 *         reward_price:
 *           type: number
 *           example: 100
 *         store_id:
 *           type: string
 *           example: "store123"
 *         start_date:
 *           type: string
 *           format: date
 *           example: "2024-11-01"
 *         expiry_date:
 *           type: string
 *           format: date
 *           example: "2024-12-31"
 *         isActive:
 *           type: boolean
 *           example: true
 *     UpdateRewardResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Reward updated successfully"
 *         uid:
 *           type: string
 *           example: "reward123"
 *     DeleteRewardResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Reward deleted successfully"
 */
Admin.updateSurvey = (req, result) => {
    const { survey_title, survey_category, store_id, region, start_date, expiry_date, isActive } = req.body;
    dbConn.query('UPDATE store_loyalty.tblsurvey SET survey_title = ?, survey_category = ?, store_id = ?, region = ?, start_date = ?, expiry_date = ?, isActive = ? WHERE survey_id = ?', [survey_title, survey_category, store_id, region, start_date, expiry_date, isActive, req.params.survey_id], (err, res) => {
        if (err) {
            console.log('Error while updating the Alternative Rewads:' + err);
            result(err, null);
        } else {
            console.log('Updating the ALternative Rewads was successful:', res);
            result(null, res);
        }
    });
}

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateRewardData:
 *       type: object
 *       required:
 *         - reward_title
 *         - reward
 *         - reward_type
 *         - reward_price
 *         - store_id
 *         - start_date
 *         - expiry_date
 *         - isActive
 *       properties:
 *         reward_title:
 *           type: string
 *           example: "Holiday Discount"
 *         description:
 *           type: string
 *           example: "10% off during the holiday season"
 *         reward:
 *           type: string
 *           example: "Discount"
 *         reward_type:
 *           type: string
 *           example: "Seasonal"
 *         reward_price:
 *           type: number
 *           example: 100
 *         store_id:
 *           type: string
 *           example: "store123"
 *         start_date:
 *           type: string
 *           format: date
 *           example: "2024-11-01"
 *         expiry_date:
 *           type: string
 *           format: date
 *           example: "2024-12-31"
 *         isActive:
 *           type: boolean
 *           example: true
 *     UpdateRewardResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Reward updated successfully"
 *         uid:
 *           type: string
 *           example: "reward123"
 *     DeleteRewardResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Reward deleted successfully"
 */
Admin.updateSurveyQuestions = (req, result) => {
    const { question_text, question_type } = req.body;
    dbConn.query('UPDATE store_loyalty.tblsurvey_questions SET question_text = ?, question_type = ? WHERE survey_id = ?', [question_text, question_type, req.params.survey_id], (err, res) => {
        if (err) {
            console.log('Error while updating the Alternative Rewads:' + err);
            result(err, null);
        } else {
            console.log('Updating the ALternative Rewads was successful:', res);
            result(null, res);
        }
    });
}

/**
 * @openapi
 * components:
 *   schemas:
 *     DeleteSurveyResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Survey deleted successfully"
 */
Admin.deleteSurvey = (req, result) => {
    dbConn.query('DELETE FROM store_loyalty.tblsurvey WHERE survey_id = ?', [req.params.survey_id], (err, res) => {
        if (err) {
            console.log('Error while deleting the Survey:' + err);
            result(err, null);
        } else {
            console.log('Deleting the Survey was Successful:', res);
            result(null, res);
        }
    });
}

/**
 * @openapi
 * components:
 *   schemas:
 *     DeleteSurveyQuestionsResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Survey Questions deleted successfully"
 */
Admin.deleteSurveyQuestions = (req, result) => {
    dbConn.query('DELETE FROM store_loyalty.tblsurvey_questions WHERE survey_id = ?', [req.params.survey_id], (err, res) => {
        if (err) {
            console.log('Error while deleting the Survey Questions:' + err);
            result(err, null);
        } else {
            console.log('Deleting the Survey Questions was Successful:', res);
            result(null, res);
        }
    });
}

// Admin.getActiveSurveys = (req, result) => {
//     dbConn.query('SELECT survey_id, survey_title, survey_category, store_id, creation_date, isActive FROM store_loyalty.tblsurvey WHERE isActive = 1', (err, res) => {
//         if (err) {
//             console.log('Error while Fetching all Active Surveys:' + err);
//             result(err, null);
//         } else {
//             console.log('Fetching all Active Surveys was Successful:', res);
//             result(null, res);
//         }
//     });
// }

// Admin.getAllSurveys = (req, result) => {
//     dbConn.query('SELECT survey_id, survey_title, survey_category, store_id, creation_date, isActive FROM store_loyalty.tblsurvey', (err, res) => {
//         if (err) {
//             console.log('Error while Fetching all Surveys:' + err);
//             result(err, null);
//         } else {
//             console.log('Fetching all Surveys was Successful:', res);
//             result(null, res);
//         }
//     });
// }

module.exports = Admin;