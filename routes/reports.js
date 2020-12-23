const express = require('express');

const router = express.Router();

const reportsController = require('../controllers/reports');

router.get('/reports', reportsController.getReports);

module.exports = router;