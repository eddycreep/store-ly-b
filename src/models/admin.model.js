var dbConn = require("../../config/db.config");

var Admin = function (user) {
    this.id = user.id,
    this.client_name = user.client_name,
    this.client_image = user.client_image,
    this.product = user.product,
    this.rating = user.rating,
    this.date = user.date,
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

Admin.saveProductSpecial = (req, result) => {
    const { specialid, productdescription, specialprice } = req.body;
    dbConn.query('INSERT INTO store_loyalty.tblspecialitems(special_id, product_description, special_price)VALUES(?, ?, ?)', [specialid, productdescription, specialprice], (err, res) => {
        if (err) {
            console.log('Error while adding the individual Products special:' + err);
            result(err, null);
        } else {
            console.log('Adding the individual Products special was successful:', res);
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

//update specials
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

Admin.deleteProductSpecial = (req, result) => {
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
Admin.saveReward = (req, result) => {
    const { reward_title, description, reward, reward_type, reward_price, store_id, start_date, expiry_date, isActive } = req.body;
    dbConn.query('INSERT INTO store_loyalty.tblrewards(reward_title, description, reward, reward_type, reward_price, store_id, start_date, expiry_date, isActive)VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)', [reward_title, description, reward, reward_type, reward_price, store_id, region, start_date, expiry_date, isActive], (err, res) => {
        if (err) {
            console.log('Error while adding the Alternative Rewads:' + err);
            result(err, null);
        } else {
            console.log('Adding the ALternative Rewads was successful:', res);
            result(null, res);
        }
    });
}

Admin.updateReward = (req, result) => {
    const { reward_title, description, reward, reward_type, reward_price, store_id, start_date, expiry_date, isActive } = req.body;
    dbConn.query('UPDATE store_loyalty.tblrewards SET reward_title = ?, description = ?, reward = ?, reward_type = ?, reward_price = ?, store_id = ?, start_date = ?, expiry_date = ?, isActive = ? WHERE uid = ?', [reward_title, description, reward, reward_type, reward_price, store_id, start_date, expiry_date, isActive, req.params.uid], (err, res) => {
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
    dbConn.query('DELETE FROM store_loyalty.tblrewards WHERE uid = ?', [req.params.uid], (err, res) => {
        if (err) {
            console.log('Error while removing the Reward:' + err);
            result(err, null);
        } else {
            console.log('Removing the Reward was successful:', res);
            result(null, res);
        }
    });
}

Admin.saveSurvey = (req, result) => {
    const { surveyTitle, surveyCategory, storeID, creationDate, isActive } = req.body;
    dbConn.query('INSERT INTO store_loyalty.tblsurvey(survey_title, survey_category, store_id, creation_date, isActive) VALUES(?, ?, ?, ?, ?)', [surveyTitle, surveyCategory, storeID, creationDate, isActive], (err, res) => {
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

Admin.saveSurveyQuestions = (req, result) => {
    const { surveyId, questionText, questionType, creationDate } = req.body;
    dbConn.query('INSERT store_loyalty.tblsurvey_questions(survey_id, question_text, question_type, creation_date)VALUES(?, ?, ?, ?)', [surveyId, questionText, questionType, creationDate], (err, res) => {
        if (err) {
            console.log('Error while saving the Survey Questions:' + err);
            result(err, null);
        } else {
            console.log('Saving the Survey Questions was Successful:', res);
            result(null, res);
        }
    });
}

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

Admin.getActiveSurveys = (req, result) => {
    dbConn.query('SELECT survey_id, survey_title, survey_category, store_id, creation_date, isActive FROM store_loyalty.tblsurvey WHERE isActive = 1', (err, res) => {
        if (err) {
            console.log('Error while Fetching all Active Surveys:' + err);
            result(err, null);
        } else {
            console.log('Fetching all Active Surveys was Successful:', res);
            result(null, res);
        }
    });
}

Admin.getAllSurveys = (req, result) => {
    dbConn.query('SELECT survey_id, survey_title, survey_category, store_id, creation_date, isActive FROM store_loyalty.tblsurvey', (err, res) => {
        if (err) {
            console.log('Error while Fetching all Surveys:' + err);
            result(err, null);
        } else {
            console.log('Fetching all Surveys was Successful:', res);
            result(null, res);
        }
    });
}

module.exports = Admin;