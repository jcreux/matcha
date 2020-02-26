const path = require('path');

const express = require('express');

////Requiring Controller
const adminController = require('../controllers/admin');

const router = express.Router();

// GET ADMIN PAGE
router.get('/admin', adminController.getIndex);
// GET ADMIN REPORT PAGE
router.get('/admin/reports/:page', adminController.getReports);
/// SEARCH USER
router.post('/admin/user', adminController.postSearch);
//// DELETE USER
router.get('/admin/delete/:id/:page', adminController.getDel);
module.exports = router;