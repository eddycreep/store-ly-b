var dbConn = require("../../config/db.config");

var Products = function (user) {
    this.idx = user.idx;
    this.Stockcode = user.Stockcode;
    this.Product_Description = user.Product_Description;
    this.Category = user.Drinks;
    this.DepNum = user.DepNum;
    this.SubNum = user.SubNum;
    this.Soh = user.Soh;
    this.VarPrc = user.VarPrc;
    this.VatPerc = user.VatPerc;
    this.Discount = user.Discount;
    this.ExclCost = user.ExclCost;
    this.Markup = user.Markup;
    this.GPPerc = user.GPPerc;
    this.ExclSell = user.ExclSell;
    this.ExclSell2 = user.ExclSell2;
    this.ExclSell3 = user.ExclSell3;
    this.Markup2 = user.Markup2;
    this.GPPerc2 = user.GPPerc2;
    this.Markup3 = user.Markup3;
    this.GPPerc3 = user.GPPerc3;
    this.IncSell = user.IncSell;
    this.IncSell2 = user.IncSell2;
    this.ROS = user.ROS;
    this.Discount_Expiry = user.Discount_Expiry;
    this.Client_ID = user.Client_ID;
    this.Product_Image = user.Product_Image;
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
 *          type: object
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

/**
 * @openapi
 * components:
 *  schemas:
 *      GetActiveProductSpecialsData:
 *          type: array
 *          required:
 *              - special_id, 
 *              - special_name
 *              - special
 *              - special_type
 *              - store_id
 *              - start_date
 *              - expiry_date
 *              - special_value
 *              - isActive
 *              - product_description
 *              - special_price
 *          properties:  
 *              special_id:
 *                  type: number
 *                  default: 1
 *              special_name:
 *                  type: string
 *                  default: Refreshing Specials
 *              special:
 *                  type: number
 *                  default: 10% Off
 *              special_type:
 *                  type: number 
 *                  default: Special
 *              store_id:
 *                  type: string
 *                  default: S004
 *              start_date:
 *                  type: string
 *                  default: 2024-11-05 00:00:00
 *              expiry_date:
 *                  type: string
 *                  default: 2024-11-05 00:00:00
 *              special_value:
 *                  type: string
 *                  default: Amount
 *              isActive:
 *                  type: string
 *                  default: 1
 *              product_description:
 *                  type: string
 *                  default: SWITCH 440ML
 *              special_price:
 *                  type: number
 *                  default: 15.99
 *      GetActiveProductSpecialsResponse:
 *          type: object
 *          properties:
 *              special_id:
 *                  type: number
 *              special_name:
 *                  type: string
 *              special:
 *                  type: number
 *              special_type:
 *                  type: string
 *              store_id:
 *                  type: string
 *              start_date:
 *                  type: string
 *              expiry_date:
 *                  type: string
 *              special_value:
 *                  type: string
 *              isActive:
 *                  type: number
 *              product_description:
 *                  type: string
 *              special_price:
 *                  type: number
 */
Products.getActiveProductSpecials = (result) => {
    dbConn.query(`SELECT sp.special_id, sp.special, sp.special_type, sp.store_id, sp.start_date, sp.expiry_date, sp.special_value, sp.isActive, spi.product_description, spi.special_price FROM store_loyalty.tblspecials sp JOIN store_loyalty.tblspecialitems spi ON sp.special_id = spi.special_id WHERE sp.special_type = 'Special' AND sp.isActive = 1 AND sp.start_date <= CURDATE() AND sp.expiry_date >= CURDATE()`, (err, res) => {
        if (err) {
            console.log('Error while getting all active products specials' + err);
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
 *      GetUpcomingProductSpecialsData:
 *          type: array
 *          required:
 *              - special_id, 
 *              - special_name
 *              - special
 *              - special_type
 *              - store_id
 *              - start_date
 *              - expiry_date
 *              - special_value
 *              - isActive
 *              - product_description
 *              - special_price
 *          properties:  
 *              special_id:
 *                  type: number
 *                  default: 1
 *              special_name:
 *                  type: string
 *                  default: Refreshing Specials
 *              special:
 *                  type: number
 *                  default: 10% Off
 *              special_type:
 *                  type: number 
 *                  default: Special
 *              store_id:
 *                  type: string
 *                  default: S004
 *              start_date:
 *                  type: string
 *                  default: 2024-11-05 00:00:00
 *              expiry_date:
 *                  type: string
 *                  default: 2024-11-05 00:00:00
 *              special_value:
 *                  type: string
 *                  default: Amount
 *              isActive:
 *                  type: string
 *                  default: 1
 *              product_description:
 *                  type: string
 *                  default: SWITCH 440ML
 *              special_price:
 *                  type: number
 *                  default: 15.99
 *      GetUpcomingProductSpecialsResponse:
 *          type: object
 *          properties:
 *              special_id:
 *                  type: number
 *              special_name:
 *                  type: string
 *              special:
 *                  type: number
 *              special_type:
 *                  type: string
 *              store_id:
 *                  type: string
 *              start_date:
 *                  type: string
 *              expiry_date:
 *                  type: string
 *              special_value:
 *                  type: string
 *              isActive:
 *                  type: number
 *              product_description:
 *                  type: string
 *              special_price:
 *                  type: number
 */
Products.getUpcomingProductSpecials = (result) => {
    dbConn.query(`SELECT sp.special_id, sp.special, sp.special_type, sp.store_id, sp.start_date, sp.expiry_date, sp.special_value, sp.isActive, spi.product_description, spi.special_price FROM store_loyalty.tblspecials sp JOIN store_loyalty.tblspecialitems spi ON sp.special_id = spi.special_id WHERE sp.special_type = 'Special' AND sp.isActive = 1 AND sp.start_date >= CURDATE()`, (err, res) => {
        if (err) {
            console.log('Error while getting all upcoming products specials' + err);
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
 *      GetActiveCombiniedSpecialsData:
 *          type: array
 *          required:
 *              - special_id, 
 *              - special_name
 *              - special
 *              - special_type
 *              - store_id
 *              - start_date
 *              - expiry_date
 *              - special_value
 *              - isActive
 *              - product_description
 *              - special_price
 *          properties:  
 *              special_id:
 *                  type: number
 *                  default: 1
 *              special_name:
 *                  type: string
 *                  default: Refreshing Specials
 *              special:
 *                  type: number
 *                  default: 10% Off
 *              special_type:
 *                  type: number 
 *                  default: Special
 *              store_id:
 *                  type: string
 *                  default: S004
 *              start_date:
 *                  type: string
 *                  default: 2024-11-05 00:00:00
 *              expiry_date:
 *                  type: string
 *                  default: 2024-11-05 00:00:00
 *              special_value:
 *                  type: string
 *                  default: Amount
 *              isActive:
 *                  type: string
 *                  default: 1
 *              product_description:
 *                  type: string
 *                  default: SWITCH 440ML
 *              special_price:
 *                  type: number
 *                  default: 15.99
 *      GetActiveCombiniedSpecialsResponse:
 *          type: object
 *          properties:
 *              special_id:
 *                  type: number
 *              special_name:
 *                  type: string
 *              special:
 *                  type: number
 *              special_type:
 *                  type: string
 *              store_id:
 *                  type: string
 *              start_date:
 *                  type: string
 *              expiry_date:
 *                  type: string
 *              special_value:
 *                  type: string
 *              isActive:
 *                  type: number
 *              product_description:
 *                  type: string
 *              special_price:
 *                  type: number
 */
Products.getActiveCombinedSpecials = (result) => {
    dbConn.query(`SELECT sp.special_id, sp.special, sp.special_type, sp.store_id, sp.start_date, sp.expiry_date, sp.special_value, sp.isActive, scg.product_description, scg.special_price FROM store_loyalty.tblspecials sp JOIN store_loyalty.tblspecials_combinedgroup scg ON sp.special_id = scg.special_id WHERE sp.special_type = 'Combined Special' AND sp.isActive = 1 AND sp.start_date <= CURDATE() AND sp.expiry_date >= CURDATE()`, (err, res) => {
        if (err) {
            console.log('Error while getting all active product group specials' + err);
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
 *      GetUpcomingCombiniedSpecialsData:
 *          type: array
 *          required:
 *              - special_id, 
 *              - special_name
 *              - special
 *              - special_type
 *              - store_id
 *              - start_date
 *              - expiry_date
 *              - special_value
 *              - isActive
 *              - product_description
 *              - special_price
 *          properties:  
 *              special_id:
 *                  type: number
 *                  default: 1
 *              special_name:
 *                  type: string
 *                  default: Refreshing Specials
 *              special:
 *                  type: number
 *                  default: 10% Off
 *              special_type:
 *                  type: number 
 *                  default: Special
 *              store_id:
 *                  type: string
 *                  default: S004
 *              start_date:
 *                  type: string
 *                  default: 2024-11-05 00:00:00
 *              expiry_date:
 *                  type: string
 *                  default: 2024-11-05 00:00:00
 *              special_value:
 *                  type: string
 *                  default: Amount
 *              isActive:
 *                  type: string
 *                  default: 1
 *              product_description:
 *                  type: string
 *                  default: SWITCH 440ML
 *              special_price:
 *                  type: number
 *                  default: 15.99
 *      GetUpcomingCombiniedSpecialsResponse:
 *          type: object
 *          properties:
 *              special_id:
 *                  type: number
 *              special_name:
 *                  type: string
 *              special:
 *                  type: number
 *              special_type:
 *                  type: string
 *              store_id:
 *                  type: string
 *              start_date:
 *                  type: string
 *              expiry_date:
 *                  type: string
 *              special_value:
 *                  type: string
 *              isActive:
 *                  type: number
 *              product_description:
 *                  type: string
 *              special_price:
 *                  type: number
 */
Products.getUpcomingCombinedSpecials = (result) => {
    dbConn.query(`SELECT sp.special_id, sp.special, sp.special_type, sp.store_id, sp.start_date, sp.expiry_date, sp.special_value, sp.isActive, scg.product_description, scg.special_price FROM store_loyalty.tblspecials sp JOIN store_loyalty.tblspecials_combinedgroup scg ON sp.special_id = scg.special_id WHERE sp.special_type = 'Combined Special' AND sp.isActive = 1 AND sp.start_date >= CURDATE()`, (err, res) => {
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
 *  schemas:
 *      GetProductSpecialsData:
 *          type: array
 *          required:
 *              - special_id, 
 *              - special_name
 *              - special
 *              - special_type
 *              - store_id
 *              - start_date
 *              - expiry_date
 *              - special_value
 *              - isActive
 *              - product_description
 *              - special_price
 *          properties:  
 *              special_id:
 *                  type: number
 *                  default: 1
 *              special_name:
 *                  type: string
 *                  default: Refreshing Specials
 *              special:
 *                  type: number
 *                  default: 10% Off
 *              special_type:
 *                  type: number 
 *                  default: Special
 *              store_id:
 *                  type: string
 *                  default: S004
 *              start_date:
 *                  type: string
 *                  default: 2024-11-05 00:00:00
 *              expiry_date:
 *                  type: string
 *                  default: 2024-11-05 00:00:00
 *              special_value:
 *                  type: string
 *                  default: Amount
 *              isActive:
 *                  type: string
 *                  default: 1
 *              product_description:
 *                  type: string
 *                  default: SWITCH 440ML
 *              special_price:
 *                  type: number
 *                  default: 15.99
 *      GetProductSpecialsResponse:
 *          type: object
 *          properties:
 *              special_id:
 *                  type: number
 *              special_name:
 *                  type: string
 *              special:
 *                  type: number
 *              special_type:
 *                  type: string
 *              store_id:
 *                  type: string
 *              start_date:
 *                  type: string
 *              expiry_date:
 *                  type: string
 *              special_value:
 *                  type: string
 *              isActive:
 *                  type: number
 *              product_description:
 *                  type: string
 *              special_price:
 *                  type: number
 */
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

/**
 * @openapi
 * components:
 *  schemas:
 *      GetCombiniedSpecialsData:
 *          type: array
 *          required:
 *              - special_id, 
 *              - special_name
 *              - special
 *              - special_type
 *              - store_id
 *              - start_date
 *              - expiry_date
 *              - special_value
 *              - isActive
 *              - special_group_id
 *              - product_description
 *              - special_price
 *          properties:  
 *              special_id:
 *                  type: number
 *                  default: 1
 *              special_name:
 *                  type: string
 *                  default: Refreshing Specials
 *              special:
 *                  type: number
 *                  default: 10% Off
 *              special_type:
 *                  type: number 
 *                  default: Special
 *              store_id:
 *                  type: string
 *                  default: S004
 *              start_date:
 *                  type: string
 *                  default: 2024-11-05 00:00:00
 *              expiry_date:
 *                  type: string
 *                  default: 2024-11-05 00:00:00
 *              special_value:
 *                  type: string
 *                  default: Amount
 *              isActive:
 *                  type: string
 *                  default: 1
 *              special_group_id:
 *                  type: number
 *                  default: 1
 *              product_description:
 *                  type: string
 *                  default: SWITCH 440ML
 *              special_price:
 *                  type: number
 *                  default: 15.99
 *      GetCombiniedSpecialsResponse: 
 *          type: object
 *          properties:
 *              special_id:
 *                  type: number
 *              special_name:
 *                  type: string
 *              special:
 *                  type: number
 *              special_type:
 *                  type: string
 *              store_id:
 *                  type: string
 *              start_date:
 *                  type: string
 *              expiry_date:
 *                  type: string
 *              special_value:
 *                  type: string
 *              isActive:
 *                  type: number
 *              special_group_id:
 *                  type: number
 *              product_description:
 *                  type: string
 *              special_price:
 *                  type: number
 */
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


/**
 * @openapi
 * components:
 *  schemas:
 *      GetActiveSpecialsData:
 *          type: array
 *          required:
 *              - special_id, 
 *              - special_name
 *              - special
 *              - special_type
 *              - store_id
 *              - start_date
 *              - expiry_date
 *              - special_value
 *              - isActive
 *          properties:  
 *              special_id:
 *                  type: number
 *                  default: 1
 *              special_name:
 *                  type: string
 *                  default: Refreshing Specials
 *              special:
 *                  type: number
 *                  default: 10% Off
 *              special_type:
 *                  type: number 
 *                  default: Special
 *              store_id:
 *                  type: string
 *                  default: S004
 *              start_date:
 *                  type: string
 *                  default: 2024-11-05 00:00:00
 *              expiry_date:
 *                  type: string
 *                  default: 2024-11-05 00:00:00
 *              special_value:
 *                  type: string
 *                  default: Amount
 *              isActive:
 *                  type: string
 *                  default: 1
 *      GetActiveSpecialsResponse: 
 *          type: object
 *          properties:
 *              special_id:
 *                  type: number
 *              special_name:
 *                  type: string
 *              special:
 *                  type: number
 *              special_type:
 *                  type: string
 *              store_id:
 *                  type: string
 *              start_date:
 *                  type: string
 *              expiry_date:
 *                  type: string
 *              special_value:
 *                  type: string
 *              isActive:
 *                  type: number
 */
Products.getAllActiveSpecials = (result) => {
    dbConn.query('SELECT special_id, special_name, special, special_type, store_id, start_date, expiry_date, special_value, isActive FROM store_loyalty.tblspecials WHERE isActive = 1 AND start_date <= CURDATE() AND expiry_date >= CURDATE()', (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting all Active Specials' + err);
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
 *      GetUpcomingSpecialsData:
 *          type: array
 *          required:
 *              - special_id, 
 *              - special_name
 *              - special
 *              - special_type
 *              - store_id
 *              - start_date
 *              - expiry_date
 *              - special_value
 *              - isActive
 *          properties:  
 *              special_id:
 *                  type: number
 *                  default: 1
 *              special_name:
 *                  type: string
 *                  default: Refreshing Specials
 *              special:
 *                  type: number
 *                  default: 10% Off
 *              special_type:
 *                  type: number 
 *                  default: Special
 *              store_id:
 *                  type: string
 *                  default: S004
 *              start_date:
 *                  type: string
 *                  default: 2024-11-05 00:00:00
 *              expiry_date:
 *                  type: string
 *                  default: 2024-11-05 00:00:00
 *              special_value:
 *                  type: string
 *                  default: Amount
 *              isActive:
 *                  type: string
 *                  default: 1
 *      GetUpcomingSpecialsResponse: 
 *          type: object
 *          properties:
 *              special_id:
 *                  type: number
 *              special_name:
 *                  type: string
 *              special:
 *                  type: number
 *              special_type:
 *                  type: string
 *              store_id:
 *                  type: string
 *              start_date:
 *                  type: string
 *              expiry_date:
 *                  type: string
 *              special_value:
 *                  type: string
 *              isActive:
 *                  type: number
 */
Products.getUpcomingSpecials = (result) => {
    dbConn.query('SELECT special_id, special_name, special, special_type, store_id, start_date, expiry_date, special_value, isActive FROM store_loyalty.tblspecials WHERE isActive = 1 AND start_date >= CURDATE()', (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting all Active Specials' + err);
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
 *     ActiveRewardResponse:
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
 *           format: date
 *           description: The tier in which the reward is applied to
 *         age_group:
 *           type: string
 *           format: date
 *           description: The age group in which the reward is applied to
 *         isActive:
 *           type: boolean
 *           description: Status of the reward (1 for active, 0 for inactive)
 */
Products.getActiveRewards = (result) => {
    dbConn.query('SELECT reward_id, reward_title, description, reward, reward_type, reward_price, store_id, region, start_date, expiry_date, loyalty_tier, age_group, isActive FROM store_loyalty.tblrewards WHERE isActive = 1 AND start_date <= CURDATE() AND expiry_date >= CURDATE()', (err, res) => {
        if (err) {
            console.log('Error while fetching the active Rewards:' + err);
            result(err, null);
        } else {
            console.log('Fetching the active rewards was successful:', res);
            result(null, res);
        }
    });
}

/**
 * @openapi
 * components:
 *   schemas:
 *     UpcomingRewardResponse:
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
 *           format: date
 *           description: The tier in which the reward is applied to
 *         age_group:
 *           type: string
 *           format: date
 *           description: The age group in which the reward is applied to
 *         isActive:
 *           type: boolean
 *           description: Status of the reward (1 for active, 0 for inactive)
 */
Products.getUpcomingRewards = (result) => {
    dbConn.query('SELECT reward_id, reward_title, description, reward, reward_type, reward_price, store_id, region, start_date, expiry_date, loyalty_tier, age_group, isActive FROM store_loyalty.tblrewards WHERE isActive = 1 AND start_date >= CURDATE()', (err, res) => {
        if (err) {
            console.log('Error while fetching the upcoming Rewards:' + err);
            result(err, null);
        } else {
            console.log('Fetching the upcoming rewards was successful:', res);
            result(null, res);
        }
    });
}

/**
 * @openapi
 * components:
 *   schemas:
 *     ActiveSurveyResponse:
 *       type: object
 *       properties:
 *         survey_id:
 *           type: integer
 *           description: Unique identifier for the survey
 *         survey_title:
 *           type: string
 *           description: Survey Title
 *         survey_category:
 *           type: string
 *           description: Survey Category
 *         store_id:
 *           type: string
 *           description: Store in which the Survey is set
 *         region:
 *           type: string
 *           description: Region for the Survey
 *         start_date:
 *           type: string
 *           description: Survey Start Date
 *         expiry_date:
 *           type: string
 *           description: Survey Expiry Date
 *         isActive:
 *           type: integer
 *           description: Status of the Survey(1 for active, 0 for inactive)
 */
Products.getActiveSurveys = (result) => {
    dbConn.query('SELECT survey_id, survey_title, survey_category, store_id, region, loyalty_tier, start_date, expiry_date, isActive FROM store_loyalty.tblsurvey WHERE isActive = 1 AND start_date <= CURDATE() AND expiry_date >= CURDATE()', (err, res) => {
        if (err) {
            console.log('Error while Fetching all Active Surveys:' + err);
            result(err, null);
        } else {
            console.log('Fetching all Active Surveys was Successful:', res);
            result(null, res);
        }
    });
}


/**
 * @openapi
 * components:
 *   schemas:
 *     UpcomingSurveyResponse:
 *       type: object
 *       properties:
 *         survey_id:
 *           type: integer
 *           description: Unique identifier for the survey
 *         survey_title:
 *           type: string
 *           description: Survey Title
 *         survey_category:
 *           type: string
 *           description: Survey Category
 *         store_id:
 *           type: string
 *           description: Store in which the Survey is set
 *         region:
 *           type: string
 *           description: Region for the Survey
 *         start_date:
 *           type: string
 *           description: Survey Start Date
 *         expiry_date:
 *           type: string
 *           description: Survey Expiry Date
 *         isActive:
 *           type: integer
 *           description: Status of the Survey(1 for active, 0 for inactive)
 */
Products.getUpcomingSurveys = (result) => {
    dbConn.query('SELECT survey_id, survey_title, survey_category, store_id, region, loyalty_tier, start_date, expiry_date, isActive FROM store_loyalty.tblsurvey WHERE isActive = 1 AND start_date >= CURDATE()', (err, res) => {
        if (err) {
            console.log('Error while Fetching all Active Surveys:' + err);
            result(err, null);
        } else {
            console.log('Fetching all Active Surveys was Successful:', res);
            result(null, res);
        }
    });
}


/**
 * @openapi
 * components:
 *  schemas:
 *      GetStoreResponse:
 *          type: object
 *          properties:
 *              id:
 *                  type: number
 *              code:
 *                  type: string
 *              description:
 *                  type: string
 *              address_1:
 *                  type: string
 *              address_2:
 *                  type: string
 *              address_3:
 *                  type: string
 *              address_4:
 *                  type: string
 *              address_5:
 *                  type: number
 *              address_6:
 *                  type: string
 */
Products.getStores = (result) => {
    dbConn.query('SELECT id, code, description, address_1, address_2, address_3, address_4, address_5, address_6  FROM store_loyalty.tblmultistore', (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting all stores ' + err);
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
 *      GetCustomerResponse:
 *          type: object
 *          properties:
 *              ID:
 *                  type: number 
 *              Code:   
 *                  type: string  
 *              Description:
 *                  type: string
 *              Address01:
 *                  type: string
 *              Address02:
 *                  type: number
 *              Address03:
 *                  type: string
 *              Address04:
 *                  type: string
 *              Address05:
 *                  type: string
 *              Address06:
 *                  type: string
 *              Address07:
 *                  type: string
 *              birth_day:
 *                  type: string
 */
Products.getCustomers = (result) => {
    dbConn.query('SELECT ID, Code, Description, Address01, Address02, Address03, Address04, Address05, Address06, Address07, birth_day FROM store_loyalty.tblcustomers', (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting all customers ' + err);
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
 *      GetLoyaltyCustomerResponse:
 *          type: object
 *          properties:
 *              CustomerID:
 *                  type: number
 *              FirstName:
 *                  type: string
 *              LastName:
 *                  type: string
 *              MobileNumber:
 *                  type: string
 *              Age:
 *                  type: string
 *              Gender:
 *                  type: string
 *              Birthday:
 *                  type: string
 *              Ethnicity:
 *                  type: string
 *              EmploymentStatus:
 *                  type: string
 *              Email:
 *                  type: string
 *              LoayltyTier:
 *                  type: string
 */
Products.getLoyaltyCustomers = (result) => {
    dbConn.query('SELECT CustomerID, FirstName, LastName, MobileNumber, Age, Gender, Birthday, Ethnicity, EmploymentStatus, Email, LoyaltyTier FROM store_loyalty.tblloyaltycustomers', (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting all loyalty customers ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

module.exports = Products;