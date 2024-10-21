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

Products.getProducts = (result) => {
    dbConn.query('SELECT idx, Stockcode, Product_Description, Category, DepNum, SubNum, Soh, VarPrc, VatPerc, Discount, ExclCost, Markup, GPPerc, ExclSell, ExclSell2, ExclSell3, Markup2, GPPerc2, Markup3, GPPerc3, IncSell, IncSell2, ROS, Discount_Expiry, Special, Special_ExpiryDate, Client_ID, Product_Image FROM store_loyalty.tblproducts', (err, res) => {
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

Products.getSpecialId = (req, result) => {
    dbConn.query('SELECT special_id FROM store_loyalty.tblspecialssss WHERE special = ? AND special_type = ? AND store_id = ? AND special_value = ?', [req.params.special, req.params.special_type, req.params.store_id, req.params.special_value], (err, res) => {
        if (err) {
            console.log('Error while getting the special id' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
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


Products.updateGroupSpecial = (req, result) => {
    const { special, specialType, storeId, startDate, expiryDate, specialValue, isActive } = req.body;
    dbConn.query(`UPDATE store_loyalty.tblspecialssss SET special = ?, special_type = ?, store_id = ?, start_date = ?, expiry_date = ?, special_value = ?, isActive = ? WHERE special_id = ?`, [special, specialType, storeId, startDate, expiryDate, specialValue, isActive], (err, res) => {
        if (err) {
            console.log('Error while getting all upcoming product group specials' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}


Products.updateGroupSpecialProduct = (req, result) => {
    const { product_description, special_price } = req.body;
    dbConn.query(`UPDATE store_loyalty.tblspecials_combinedgroup SET product_description = ?, special_price = ? WHERE special_id = ? AND product_description = ?`, [product_description, special_price], (err, res) => {
        if (err) {
            console.log('Error while updating the Group Product x Price' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

//take button in loggedTickets table
Products.setProductGroupSpecial = (req, result) => {
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

Products.getAllGroupSpecials = (result) => {
    dbConn.query('SELECT sp.special_id, sp.special, sp.special_type, sp.store_id, sp.start_date, sp.expiry_date, sp.special_value, sp.isActive, scg.special_group_id, scg.product_description, scg.special_price FROM store_loyalty.tblspecialssss sp JOIN store_loyalty.tblspecials_combinedgroup scg ON sp.special_id = scg.special_id WHERE sp.special_type = "Combined Special"', (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting all Product Group Specials' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

Products.setReward = (req, result) => {
    const { rewardTitle, description, expiryDate, reward, rewardType, rewardPrice, isActive } = req.body;
    dbConn.query('INSERT INTO store_loyalty.tblrewards (reward_title, description, expiry_date, reward, reward_type, reward_price, isActive)VALUES(?, ?, ?, ?, ?, ?, ?)', [ rewardTitle, description, expiryDate, reward, rewardType, rewardPrice, isActive ], (err, res) => {
        if (err) {
            console.log('Error while adding the Alternative Rewads:' + err);
            result(err, null);
        } else {
            console.log('Adding the ALternative Rewads was successful:', res);
            result(null, res);
        }
    });
}

module.exports = Products;

