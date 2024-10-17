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

router.get('/getactivegroupspecials', ProductsController.getActiveGroupSpecials); //GET ACTIVE GROUP SPECIALS
router.get('/getupcomingroupspecials', ProductsController.getUpcomingGroupSpecials); //GET UPCOMING GROUP SPECIALS

router.patch('/updategroupspecial/:special_id', ProductsController.updateGroupSpecial); //update special - tblspecials
router.patch('/updategroupspecialproduct/:special_id', ProductsController.updateGroupSpecialProduct); //update special product x price - tblspecials_combinedgroup

router.post('/setproductgpspecial', ProductsController.setProductGroupSpecial); //SET THE PRODUCTS LINKED TO THE GROUP SPECIAL
router.get('/getallgroupspecials', ProductsController.getAllGroupSpecials);

//REWARDS
router.post('/setreward', ProductsController.setReward); //SET THE PRODUCTS LINKED TO THE GROUP SPECIAL

module.exports = router;