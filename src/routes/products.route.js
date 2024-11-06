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
 * /products/getproducts:
 *   get:
 *     tags:
 *      - Products
 *     description: Gets a list of products
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *              schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/GetProductResponse'
 *       500:
 *         description: Internal server error
 */
router.get('/getproducts', ProductsController.getProducts); 

/**
 * @openapi
 * /products/getactiveproductspecials:
 *   get:
 *     tags:
 *      - Specials
 *     description: Gets all active product specials
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *              schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/GetActiveProductSpecialsResponse'
 *       500:
 *         description: Internal server error
 */
router.get('/getactiveproductspecials', ProductsController.getActiveProductSpecials); //individual

/**
 * @openapi
 * /products/getupcomingproductspecials:
 *   get:
 *     tags:
 *      - Specials
 *     description: Gets all upcoming product specials
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *              schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/GetUpcomingProductSpecialsResponse'
 *       500:
 *         description: Internal Server Error
 */
router.get('/getupcomingproductspecials', ProductsController.getUpcomingProductSpecials);


/**
 * @openapi
 * /products/getactivecombinedspecials:
 *   get:
 *     tags:
 *      - Specials
 *     description: Gets active combined specials
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *              schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/GetActiveCombiniedSpecialsResponse'
 *       500:
 *         description: Internal Server Error
 */
router.get('/getactivecombinedspecials', ProductsController.getActiveCombinedSpecials); 


/**
 * @openapi
 * /products/getupcomingcombinedspecials:
 *   get:
 *     tags:
 *      - Specials
 *     description: Gets upcoming combined specials
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *              schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/GetUpcomingCombiniedSpecialsResponse'
 *       500:
 *         description: Internal Server Error
 */
router.get('/getupcomingcombinedspecials', ProductsController.getUpcomingCombinedSpecials); 

//GET ALL SPECIALS

/**
 * @openapi
 * /products/getallproductspecials:
 *   get:
 *     tags:
 *      - Specials
 *     description: Gets all product specials
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *              schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/GetProductSpecialsResponse'
 *       500:
 *         description: Internal Server Error
 */
router.get('/getallproductspecials', ProductsController.getAllProductSpecials);

/**
 * @openapi
 * /products/getallcombinedspecials:
 *   get:
 *     tags:
 *      - Specials
 *     description: Gets all combined specials
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *              schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/GetCombiniedSpecialsResponse'
 *       500:
 *         description: Internal Server Error
 */
router.get('/getallcombinedspecials', ProductsController.getAllCombinedSpecials);

//REWARDS

/**
 * @openapi
 * /products/getactiverewards:
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

/**
 * @openapi
 * /products/getactivesurveys:
 *   get:
 *     summary: Retrieve active surveys
 *     tags:
 *       - Surveys
 *     description: Fetches all active surveys from the database
 *     responses:
 *       200:
 *         description: Successfully retrieved all active surveys
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ActiveSurveyResponse'
 *       500:
 *         description: Internal server error
 */
router.get('/getactivesurveys', ProductsController.getActiveSurveys)


/**
 * @openapi
 * /products/getstores:
 *   get:
 *     tags:
 *      - Stores
 *     description: Gets all stores with location
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *              schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/GetStoreResponse'
 *       500:
 *         description: Internal server error
 */
router.get('/getstores', ProductsController.getStores);


/**
 * @openapi
 * /products/getcustomers:
 *   get:
 *     tags:
 *      - Customers
 *     description: Gets store customers
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *              schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/GetCustomerResponse'
 *       500:
 *         description: Internal server error
 */
router.get('/getcustomers', ProductsController.getCustomers); 


/**
 * @openapi
 * /products/getloyaltycustomers:
 *   get:
 *     tags:
 *      - Customers
 *     description: Gets all loyalty customers
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *              schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/GetLoyaltyCustomerResponse'
 *       500:
 *         description: Internal server error
 */
router.get('/getloyaltycustomers', ProductsController.getLoyaltyCustomers); 

module.exports = router;