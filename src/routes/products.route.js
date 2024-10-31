const express = require('express');
const router = express.Router();
const { Request, Response } = require('express')

const ProductsController = require('../controllers/products.controller');

require('dotenv').config({ path: './configuration.env' }); 

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

/**
 * @openapi
 * /getactiveproductspecials:
 *   get:
 *     tags:
 *      - Specials
 *     description: Gets all active product specials
 *     requestBody:
 *      contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetActiveProductSpecialsData'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/GetActiveProductSpecialsResponse'
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad Request
 */
router.get('/getactiveproductspecials', ProductsController.getActiveProductSpecials); //individual

/**
 * @openapi
 * /getupcomingproductspecials:
 *   get:
 *     tags:
 *      - Specials
 *     description: Gets all upcoming product specials
 *     requestBody:
 *      contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetUpcomingProductSpecialsData'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/GetUpcomingProductSpecialsResponse'
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad Request
 */
router.get('/getupcomingproductspecials', ProductsController.getUpcomingProductSpecials);

/**
 * @openapi
 * /getactivecombinedspecials:
 *   get:
 *     tags:
 *      - Specials
 *     description: Gets active combined specials
 *     requestBody:
 *      contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetActiveCombiniedSpecialsData'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/GetActiveCombiniedSpecialsResponse'
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad Request
 */
router.get('/getactivecombinedspecials', ProductsController.getActiveCombinedSpecials); 

/**
 * @openapi
 * /getupcomingcombinedspecials:
 *   get:
 *     tags:
 *      - Specials
 *     description: Gets upcoming combined specials
 *     requestBody:
 *      contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetActiveCombiniedSpecialsData'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/GetActiveCombiniedSpecialsResponse'
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad Request
 */
router.get('/getupcomingcombinedspecials', ProductsController.getUpcomingCombinedSpecials); 

//GET ALL SPECIALS

/**
 * @openapi
 * /getallproductspecials:
 *   get:
 *     tags:
 *      - Specials
 *     description: Gets all product specials
 *     requestBody:
 *      contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetProductSpecialsData'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/GetProductSpecialsResponse'
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad Request
 */
router.get('/getallproductspecials', ProductsController.getAllProductSpecials);

/**
 * @openapi
 * /getallcombinedspecials:
 *   get:
 *     tags:
 *      - Specials
 *     description: Gets all combined specials
 *     requestBody:
 *      contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetCombiniedSpecialsData'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/GetCombiniedSpecialsResponse'
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad Request
 */
router.get('/getallcombinedspecials', ProductsController.getAllCombinedSpecials);

//REWARDS

/**
 * @openapi
 * /getactiverewards:
 *   get:
 *     tags:
 *       - Rewards
 *     description: Get all active rewards
 *     responses:
 *       200:
 *         description: Successfully retrieved active rewards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ActiveRewardResponse'
 *       500:
 *         description: Internal server error
 */
router.get('/getactiverewards', ProductsController.getActiveRewards);

//surveys
router.get('/getactivesurveys', ProductsController.getActiveSurveys)

/**
 * @openapi
 * /getstores:
 *   get:
 *     tags:
 *      - Stores
 *     description: Gets all stores with location
 *     requestBody:
 *      contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetStoreData'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/GetStoreResponse'
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad Request
 */
router.get('/getstores', ProductsController.getStores);


/**
 * @openapi
 * /getcustomers:
 *   get:
 *     tags:
 *      - Customers
 *     description: Gets store customers
 *     requestBody:
 *      contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetCustomerData'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/GetCustomerResponse'
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad Request
 */
router.get('/getcustomers', ProductsController.getCustomers); 


/**
 * @openapi
 * /getloyaltycustomers:
 *   get:
 *     tags:
 *      - Customers
 *     description: Gets all loyalty customers
 *     requestBody:
 *      contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetLoyaltyCustomerData'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/GetLoyaltyCustomerResponse'
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad Request
 */
router.get('/getloyaltycustomers', ProductsController.getLoyaltyCustomers); 

module.exports = router;