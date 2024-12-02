const express = require('express');
const router = express.Router();

const BasketController = require('../controllers/basket.controller');

require('dotenv').config({ path: './configuration.env' });

//get-basket information || check-if-on-loyalty || get-product-prices 

/**
 * @openapi
 * /basket/savecustomerbasket:
 *   post:
 *     summary: Save basket information
 *     tags:
 *       - API
 *     description: Adds customer basket in the store loyalty system.
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
 *                 type: array
 *                 description: Name of the products
 *                 example: []
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the product purchased
 *                 example: 3
 *               purchase_date:
 *                 type: string
 *                 description: Date of the purchased basket
 *                 example: '2023-10-14 13:25:00'
 *               total_amount:
 *                 type: number
 *                 description: Total basket amount
 *                 example: 45.99
 *               payment_method:
 *                 type: string
 *                 description: Payment method of the basket
 *                 example: Cash
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
 *                       type: array
 *                     quantity:
 *                       type: integer
 *                     purchase_date:
 *                       type: string
 *                     total_amount:
 *                       type: number
 *                     payment_method:
 *                       type: string
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
router.post('/savecustomerbasket', BasketController.saveCustomerBasket); 


/**
 * @openapi
 * /basket/getproductprices/{product_description}:
 *   get:
 *     summary: Retrieve product prices
 *     tags:
 *       - API
 *     description: Fetch the prices of the purchased
 *     parameters:
 *       - in: path
 *         name: product_description
 *         required: true
 *         schema:
 *           type: string
 *         description: Product description
 *     responses:
 *       200:
 *         description: Product Prices have Returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product_description:
 *                   type: integer
 *                   description: the purchased item
 *       404:
 *         description: The Product cannot be found
 *       500:
 *         description: Internal server error
 */
router.get('/getproductprices/:product_description', BasketController.getProductPrices);


/**
 * @openapi
 * /basket/savecustomerbasketitems:
 *   post:
 *     summary: Save items linked to basket
 *     tags:
 *       - API
 *     description: Saves all purchased items linked to basket
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
 *                 type: array
 *                 description: Name of the products
 *                 example: []
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the product purchased
 *                 example: 3
 *               purchase_date:
 *                 type: string
 *                 description: Date of the purchased basket
 *                 example: '2023-10-14 13:25:00'
 *               total_amount:
 *                 type: number
 *                 description: Total basket amount
 *                 example: 45.99
 *               payment_method:
 *                 type: string
 *                 description: Payment method of the basket
 *                 example: Cash
 *     responses:
 *       200:
 *         description: Basket Items saved successfully
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
 *                       type: array
 *                     quantity:
 *                       type: integer
 *                     purchase_date:
 *                       type: string
 *                     total_amount:
 *                       type: number
 *                     payment_method:
 *                       type: string
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
router.post('/savecustomerbasketitems', BasketController.saveCustomerBasketItems);


/**
 * @openapi
 * /basket/checkloyalty/{CustomerID}:
 *   get:
 *     summary: Determine if customer is on loyalty
 *     tags:
 *       - API
 *     description: Determine if customer is on the loyalty program
 *     parameters:
 *       - in: path
 *         name: CustomerID
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the customer
 *     responses:
 *       200:
 *         description: Customer is on the loyalty program and specials can be applied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 CustomerID:
 *                   type: integer
 *                   description: ID of the customer
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal server error
 */
router.get('/checkloyalty/:CustomerID', BasketController.checkLoyaltyCustomer); 


//get-product-specials

/**
 * @openapi
 * /basket/getproductspecial/{product_description}:
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
 * /basket/getproductcombinedspecial/{product_description}:
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
 * /basket/savefinaltransaction:
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


// TIERS

// router.post('/add-tier-reward', BasketController.addTierReward);

// router.patch('/edit-tier-reward/:uid', BasketController.editTierReward);

// router.delete('/delete-tier-reward/:uid', BasketController.deleteTierReward);


module.exports = router;