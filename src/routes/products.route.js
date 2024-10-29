const express = require('express');
const router = express.Router();
const { Request, Response } = require('express')

const ProductsController = require('../controllers/products.controller');

require('dotenv').config({ path: './configuration.env' }); 

// Instantiate an Express application
const app = express();

/**
 * @openapi
 * /healthcheck:
 *   get:
 *     tag:
 *      - Healthcheck
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.get('/healthcheck', (req, res) => res.sendStatus(200));

router.get('/getproducts', ProductsController.getProducts); 

router.get('/getspecialid/:special/:special_type/:store_id/:special_value', ProductsController.getSpecialId); //GET special id 

router.get('/getproductspecials', ProductsController.getProductSpecials);
router.get('/getupcomingproductspecials', ProductsController.getUpcomingProductSpecials);

router.get('/getactivegroupspecials', ProductsController.getActiveGroupSpecials); //GET ACTIVE GROUP SPECIALS
router.get('/getupcomingroupspecials', ProductsController.getUpcomingGroupSpecials); //GET UPCOMING GROUP SPECIALS

router.patch('/updategroupspecial/:special_id', ProductsController.updateGroupSpecial); //update special - tblspecials
router.patch('/updategroupspecialproduct/:special_id', ProductsController.updateGroupSpecialProduct); //update special product x price - tblspecials_combinedgroup

router.get('/getallgroupspecials', ProductsController.getAllGroupSpecials);

//REWARDS
router.post('/setreward', ProductsController.setReward); //SET THE PRODUCTS LINKED TO THE GROUP SPECIAL

module.exports = router;