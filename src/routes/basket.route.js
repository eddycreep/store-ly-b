const express = require('express');
const router = express.Router();

const BasketController = require('../controllers/basket.controller');

require('dotenv').config({ path: './configuration.env' });

//get-basket information || check-if-on-loyalty || get-product-prices 

/**
 * @openapi
 * /getcustomerbasket/{:basket_id}:
 *   get:
 *     summary: Get customer basket by ID
 *     tags:
 *       - API
 *     description: Retrieves the customers basket based on the basket ID
 *     parameters:
 *       - in: path
 *         name: basket_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the basket
 *     responses:
 *       200:
 *         description: Customers basket was successfully retrieved, now checking if customer is on loyalty list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 basket_id:
 *                   type: integer
 *                   description: ID of the basket
 *       404:
 *         description: Basket not found
 *       500:
 *         description: Internal server error
 */
router.get('/getcustomerbasket/:basket_id', BasketController.getCustomerBasket); 


/**
 * @openapi
 * /checkloyalty/{:customer_id}:
 *   get:
 *     summary: Determine if customer is on loyalty
 *     tags:
 *       - API
 *     description: Determine if customer is on the loyalty program
 *     parameters:
 *       - in: path
 *         name: customer_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the customer
 *     responses:
 *       200:
 *         description: Customer is on the loyalty program and specials can be applied, now checking product prices
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 customer_id:
 *                   type: integer
 *                   description: ID of the customer
 *       404:
 *         description: The customer is not found on the loyalty program, no specials can be applied
 *       500:
 *         description: Internal server error
 */
router.get('/checkloyalty/:customer_id', BasketController.checkLoyaltyCustomer); 


/**
 * @openapi
 * /checkloyalty/{:customer_id}:
 *   get:
 *     summary: Determine if customer is on loyalty
 *     tags:
 *       - API
 *     description: Determine if customer is on the loyalty program
 *     parameters:
 *       - in: path
 *         name: customer_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the customer
 *     responses:
 *       200:
 *         description: Customer is on the loyalty program and specials can be applied, now checking product prices
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 customer_id:
 *                   type: integer
 *                   description: ID of the customer
 *       404:
 *         description: The customer is not found on the loyalty program, no specials can be applied
 *       500:
 *         description: Internal server error
 */
router.get('/getproductprices/:product_description', BasketController.getProductPrices);

//get-product-specials


/**
 * @openapi
 * /getproductspecial/{:product_description}:
 *   get:
 *     summary: Check individual product specials
 *     tags:
 *       - API
 *     description: Determine if there are any product specials
 *     parameters:
 *       - in: path
 *         name: product_description
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the product
 *     responses:
 *       200:
 *         description: Successfully retrieved product special using the product description
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product_description:
 *                   type: string
 *                   description: Product description
 *       404:
 *         description: The product does not have any specials available.  Now checking if the product is linked to any combined special
 *       500:
 *         description: Internal server error
 */
router.get('/getproductspecial/:product_description', BasketController.getProductSpecials);




/**
 * @openapi
 * /getproductcombinedspecial/:product_description:
 *   get:
 *     summary: Check combined product specials
 *     tags:
 *       - API
 *     description: Determine if there are any combined product specials
 *     parameters:
 *       - in: path
 *         name: product_description
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the product
 *     responses:
 *       200:
 *         description: Successfully retrieved combined products special using the product description
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product_description:
 *                   type: string
 *                   description: Product description
 *       404:
 *         description: The product does not have any specials available
 *       500:
 *         description: Internal server error
 */
router.get('/getproductcombinedspecial/:product_description', BasketController.getProductCombinedSpecials); 


/**
 * @openapi
 * /savebasketinfoitems:
 *   post:
 *     summary: Save basket information items
 *     tags:
 *       - API
 *     description: Adds items to the customer basket in the store loyalty system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               basket_id:
 *                 type: integer
 *                 description: ID of the basket
 *                 example: 101
 *               customer_id:
 *                 type: integer
 *                 description: ID of the customer
 *                 example: 202
 *               product:
 *                 type: string
 *                 description: Name of the product
 *                 example: "Apples"
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the product purchased
 *                 example: 3
 *               sellingPrice:
 *                 type: number
 *                 format: float
 *                 description: Price per unit of the product
 *                 example: 1.99
 *               discountApplied:
 *                 type: number
 *                 format: float
 *                 description: Discount applied to the product
 *                 example: 0.5
 *               totalAmount:
 *                 type: number
 *                 format: float
 *                 description: Total price after discount
 *                 example: 5.47
 *               insertTime:
 *                 type: string
 *                 format: date-time
 *                 description: Time of insertion
 *                 example: "2023-10-05T14:48:00.000Z"
 *     responses:
 *       200:
 *         description: Basket information successfully saved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     basket_id:
 *                       type: integer
 *                     customer_id:
 *                       type: integer
 *                     product:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *                     product_price:
 *                       type: number
 *                       format: float
 *                     discount_applied:
 *                       type: number
 *                       format: float
 *                     final_price:
 *                       type: number
 *                       format: float
 *                     insertion_time:
 *                       type: string
 *                       format: date-time
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed"
 *                 error:
 *                   type: string
 *                   description: Error details
 */
router.post('/savebasketinfoitems', BasketController.saveBasketInfoItems); 


/**
 * @openapi
 * /savefinaltransaction:
 *   post:
 *     summary: Save final transaction details
 *     tags:
 *       - API
 *     description: Adds the final transaction details to the store loyalty system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               basket_id:
 *                 type: integer
 *                 description: ID of the basket
 *                 example: 101
 *               customer_id:
 *                 type: integer
 *                 description: ID of the customer
 *                 example: 202
 *               product:
 *                 type: string
 *                 description: Name of the purchased product
 *                 example: "Apples"
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the product purchased
 *                 example: 3
 *               sellingPrice:
 *                 type: number
 *                 format: float
 *                 description: Original price per unit of the product
 *                 example: 1.99
 *               newDiscountedPrice:
 *                 type: number
 *                 format: float
 *                 description: Discounted price per unit of the product
 *                 example: 1.49
 *               totalAmount:
 *                 type: number
 *                 format: float
 *                 description: Total price before discounts
 *                 example: 5.97
 *               newTotalDiscBasketAmount:
 *                 type: number
 *                 format: float
 *                 description: Total price after discounts
 *                 example: 4.47
 *               purchaseDate:
 *                 type: string
 *                 format: date-time
 *                 description: Date and time of purchase
 *                 example: "2023-10-05T14:48:00.000Z"
 *     responses:
 *       200:
 *         description: Final transaction successfully saved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     basket_id:
 *                       type: integer
 *                     customer_id:
 *                       type: integer
 *                     purchased_product:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *                     product_amount:
 *                       type: number
 *                       format: float
 *                     product_discounted_amount:
 *                       type: number
 *                       format: float
 *                     total_basket_amount:
 *                       type: number
 *                       format: float
 *                     total_disc_basket_amount:
 *                       type: number
 *                       format: float
 *                     purchase_date:
 *                       type: string
 *                       format: date-time
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed"
 *                 error:
 *                   type: string
 *                   description: Error details
 */
router.post('/savefinaltransaction', BasketController.saveFinalTransaction); 

module.exports = router;