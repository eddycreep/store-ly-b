var dbConn = require("../../config/db.config");

var Products = function (user) {
    this.idx = user.idx,
    this.Stockcode = user.Stockcode,
    this.Product_Description = user.Product_Description,
    this.Category = user. Drinks,
    this.DepNum = user.DepNum,
    this.SubNum = user.SubNum,
    this.Soh = user.Soh,
    this.VarPrc = user.VarPrc,
    this.VatPerc = user.VatPerc,
    this.Discount = user.Discount,
    this.ExclCost = user.ExclCost,
    this.Markup = user.Markup,
    this.GPPerc = user.GPPerc,
    this.ExclSell = user.ExclSell,
    this.ExclSell2 = user.ExclSell2,
    this.ExclSell3 = user.ExclSell3,
    this.Markup2 = user.Markup2,
    this.GPPerc2 = user.GPPerc2,
    this.Markup3 = user.Markup3,
    this.GPPerc3 = user.GPPerc3,
    this.IncSell = user.IncSell,
    this.IncSell2 = user.IncSell2,
    this.ROS = user.ROS,
    this.Discount_Expiry = user.Discount_Expiry,
    this.Client_ID = user.Client_ID,
    this.Product_Image = user.Product_Image

}; 


/**
 * @openapi
 * components:
 *  schemas:
 *      GetProductData:
 *          type: array
 *          required:
 *              - uid
 *              - item_code
 *              - selling_incl_1
 *              - special_price_incl
 *              - description_1
 *          properties:
 *              uid:
 *                  type: number
 *                  default: 1
 *              item_code:
 *                  type: string
 *                  default: P001
 *              selling_incl_1:
 *                  type: number
 *                  default: 25.99
 *              special_price_incl:
 *                  type: number
 *                  default: 20.99
 *              description_1:
 *                  type: string
 *                  default: SWITCH 440ML
 *      GetProductResponse:
 *          type: array
 *          properties:
 *              uid:
 *                  type: number
 *              item_code:
 *                  type: string
 *              selling_incl_1:
 *                  type: number
 *              special_price_incl:
 *                  type: number
 *              description_1:
 *                  type: string
 */
Products.getProducts = (result) => {
    dbConn.query('SELECT mst.item_code, mst.selling_incl_1, mst.special_price_incl, inv.description_1 FROM store_loyalty.tblmultistoretrn mst JOIN store_loyalty.tblinventory inv ON mst.item_code = inv.item_code', (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting all products ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

Products.setSpecial = (req, result) => {
    const { special, specialType, storeId, startDate, expiryDate, specialValue, isactive } = req.body;
    dbConn.query('INSERT INTO store_loyalty.tblspecialssss (special, special_type, store_id, start_date, expiry_date, special_value, isActive) VALUES(?, ?, ?, ?, ?, ?, ?)', [special, specialType, storeId, startDate, expiryDate, specialValue, isactive], (err, res) => {
        if (err) {
            console.log('Error while adding the Special:' + err);
            result(err, null);
        } else {
            console.log('Adding the Special was Successful:', res);
            result(null, res);
        }
    });
}

Products.setProductSpecial = (req, result) => {
    const { specialid, productdescription, specialprice } = req.body;
    dbConn.query('INSERT INTO store_loyalty.tblspecialitems(special_id, product_description, special_price)VALUES(?, ?, ?)', [specialid, productdescription, specialprice], (err, res) => {
        if (err) {
            console.log('Error while adding the Products special:' + err);
            result(err, null);
        } else {
            console.log('Adding the Products special was successful:', res);
            result(null, res);
        }
    });
}

Products.getProductSpecials = (result) => {
    dbConn.query(`SELECT sp.special_id, sp.special, sp.special_type, sp.store_id, sp.start_date, sp.expiry_date, sp.special_value, sp.isActive, spi.product_description, spi.special_price FROM store_loyalty.tblspecials sp JOIN store_loyalty.tblspecialitems spi ON sp.special_id = spi.special_id WHERE sp.special_type = 'Special' AND sp.isActive = 1`, (err, res) => {
        if (err) {
            console.log('Error while getting all active products specials' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

Products.getUpcomingProductSpecials = (result) => {
    dbConn.query(`SELECT sp.special_id, sp.special, sp.special_type, sp.store_id, sp.start_date, sp.expiry_date, sp.special_value, sp.isActive, spi.product_description, spi.special_price FROM store_loyalty.tblspecialssss sp JOIN store_loyalty.tblspecialitems spi ON sp.special_id = spi.special_id WHERE sp.special_type = 'Special' AND sp.isActive = 1 AND STR_TO_DATE(sp.start_date, '%a %b %d %Y %H:%i:%s') >= CURDATE()`, (err, res) => {
        if (err) {
            console.log('Error while getting all upcoming products specials' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

Products.getActiveGroupSpecials = (result) => {
    dbConn.query(`SELECT sp.special_id, sp.special, sp.special_type, sp.store_id, sp.start_date, sp.expiry_date, sp.special_value, sp.isActive, scg.product_description, scg.special_price FROM store_loyalty.tblspecialssss sp JOIN store_loyalty.tblspecials_combinedgroup scg ON sp.special_id = scg.special_id WHERE sp.special_type = 'Combined Special' AND sp.isActive = 1 AND STR_TO_DATE(sp.start_date, '%a %b %d %Y %H:%i:%s') <= CURDATE() AND STR_TO_DATE(sp.expiry_date, '%a %b %d %Y %H:%i:%s') >= CURDATE()`, (err, res) => {
        if (err) {
            console.log('Error while getting all active product group specials' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

Products.getUpcomingGroupSpecials = (result) => {
    dbConn.query(`SELECT sp.special_id, sp.special, sp.special_type, sp.store_id, sp.start_date, sp.expiry_date, sp.special_value, sp.isActive, scg.special_group_id, scg.product_description, scg.special_price FROM store_loyalty.tblspecialssss sp JOIN store_loyalty.tblspecials_combinedgroup scg ON sp.special_id = scg.special_id WHERE sp.special_type = 'Combined Special' AND sp.isActive = 1 AND STR_TO_DATE(sp.start_date, '%a %b %d %Y %H:%i:%s') >= CURDATE()`, (err, res) => {
        if (err) {
            console.log('Error while getting all upcoming product group specials' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

Products.getAllProductSpecials = (result) => {
    dbConn.query('SELECT sp.special_id, sp.special_name, sp.special, sp.special_type, sp.store_id, sp.start_date, sp.expiry_date, sp.special_value, sp.isActive, spi.product_description, spi.special_price FROM store_loyalty.tblspecials sp JOIN store_loyalty.tblspecialitems spi ON sp.special_id = spi.special_id WHERE sp.special_type = "Special"', (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting all Product Group Specials' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}


Products.getAllCombinedSpecials = (result) => {
    dbConn.query('SELECT sp.special_id, sp.special_name, sp.special, sp.special_type, sp.store_id, sp.start_date, sp.expiry_date, sp.special_value, sp.isActive, scg.special_group_id, scg.product_description, scg.special_price FROM store_loyalty.tblspecials sp JOIN store_loyalty.tblspecials_combinedgroup scg ON sp.special_id = scg.special_id WHERE sp.special_type = "Combined Special"', (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting all Product Group Specials' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

Products.getActiveRewards = (req, result) => {
    dbConn.query('SELECT uid, reward_title, description, reward, reward_type, reward_price, store_id, region, start_date, expiry_date, isActive FROM store_loyalty.tblrewards WHERE isActive = 1', (err, res) => {
        if (err) {
            console.log('Error while fetching the active Rewards:' + err);
            result(err, null);
        } else {
            console.log('Fetching the active rewards was successful:', res);
            result(null, res);
        }
    });
}

Products.getActiveSurveys = (req, result) => {
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

module.exports = Products;