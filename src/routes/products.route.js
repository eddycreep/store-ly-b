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
 *     tags:
 *      - Healthcheck
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.get('/healthcheck', (req, res) => res.send("Hello, world!"));


/**
 * @openapi
 * /getproducts:
 *   get:
 *     tags:
 *      - Products
 *     description: Gets a list of products
 *     requestBody:
 *      contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetProductData'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/GetProductResponse'
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad Request
 */
router.get('/getproducts', ProductsController.getProducts); 

router.get('/getproductspecials', ProductsController.getProductSpecials); //individual
router.get('/getupcomingproductspecials', ProductsController.getUpcomingProductSpecials);

router.get('/getactivegroupspecials', ProductsController.getActiveGroupSpecials); //combined
router.get('/getupcomingroupspecials', ProductsController.getUpcomingGroupSpecials); 

//all specials
router.get('/getallproductspecials', ProductsController.getAllProductSpecials);
router.get('/getallcombinedspecials', ProductsController.getAllCombinedSpecials);

//rewards
router.get('/getactiverewards', ProductsController.getActiveRewards);

//surveys
router.get('/getactivesurveys', ProductsController.getActiveSurveys)

module.exports = router;