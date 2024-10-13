const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/admin.controller');

require('dotenv').config({ path: './configuration.env' });

router.get('/getproductreviews', AdminController.getReviews);

module.exports = router;