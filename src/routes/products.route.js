const express = require('express');
const router = express.Router();

const ProductsController = require('../controllers/products.controller');

require('dotenv').config({ path: './configuration.env' }); 

router.get('/getproducts', ProductsController.getProducts); 

router.post('/setspecial', ProductsController.setSpecial); //SET THE SPECIAL
router.get('/getspecialid/:special/:special_type/:store_id/:special_value', ProductsController.getSpecialId); //GET special id 

router.post('/setproductspecial', ProductsController.setProductSpecial); //SET THE PRODUCT LINKED TO THE SPECIAL 
router.get('/getproductspecials', ProductsController.getProductSpecials);
router.get('/getupcomingproductspecials', ProductsController.getUpcomingProductSpecials);

router.get('/getactivegroupspecials', ProductsController.getUpcomingGroupSpecials); //GET UPCOMING GROUP SPECIALS

router.post('/setproductgpspecial', ProductsController.setProductGroupSpecial); //SET THE PRODUCTS LINKED TO THE GROUP SPECIAL
router.get('/getproductgpspecials', ProductsController.getProductGroupSpecials);

module.exports = router;