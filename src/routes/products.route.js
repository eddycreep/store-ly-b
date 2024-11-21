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
 *     summary: Get products list
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
 *     summary: Get Active Product Specials
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
 *     summary: Get Upcoming Product Specials
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
 *     summary: Get Active Combined Specials
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
 *     summary: Get Upcoming Combined Specials
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
 *     summary: Get all Product Specials
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
 *     summary: Get Combined Specials
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

/**
 * @openapi
 * /products/getactivespecials:
 *   get:
 *     tags:
 *      - Specials
 *     summary: Get All Active Specials
 *     description: Gets all active specials
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *              schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/GetActiveSpecialsResponse'
 *       500:
 *         description: Internal Server Error
 */
router.get('/getactivespecials', ProductsController.getAllActiveSpecials);

/**
 * @openapi
 * /products/getupcomingspecials:
 *   get:
 *     tags:
 *      - Specials
 *     summary: Get All upcoming Specials
 *     description: Gets all upcoming specials (both individual and combined)
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *              schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/GetUpcomingSpecialsResponse'
 *       500:
 *         description: Internal Server Error
 */
router.get('/getupcomingspecials', ProductsController.getUpcomingSpecials);

//REWARDS
/**
 * @openapi
 * /products/getactiverewards:
 *   get:
 *     tags:
 *       - Rewards
 *     summary: Get Active Rewards
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

/**
 * @openapi
 * /products/get-upcoming-rewards:
 *   get:
 *     tags:
 *       - Rewards
 *     summary: Get Upcoming Rewards
 *     description: Get all Upcoming rewards
 *     responses:
 *       200:
 *         description: Successfully retrieved upcoming rewards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UpcomingRewardResponse'
 *       500:
 *         description: Internal server error
 */
router.get('/get-upcoming-rewards', ProductsController.getUpcomingRewards);

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
 * /products/get-upcoming-surveys:
 *   get:
 *     summary: Retrieve upcoming surveys
 *     tags:
 *       - Surveys
 *     description: Fetches all upcoming surveys from the database
 *     responses:
 *       200:
 *         description: Successfully retrieved all upcoming surveys
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UpcomingSurveyResponse'
 *       500:
 *         description: Internal server error
 */
router.get('/get-upcoming-surveys', ProductsController.getUpcomingSurveys)


/**
 * @openapi
 * /products/getstores:
 *   get:
 *     tags:
 *      - Stores
 *     summary: Get All Stores
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
 *     summary: Get Customers
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
 *     summary: Get Loyalty Customers
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