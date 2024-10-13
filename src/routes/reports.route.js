const express = require('express');
const router = express.Router();

const ReportsController = require('../controllers/reports.controller');

require('dotenv').config({ path: './configuration.env' });

router.get('/getloyaltyclients', ReportsController.getLoyaltyClients);

router.get('/getnonloyaltyclients', ReportsController.getNonLoyaltyClients);

module.exports = router;