var express = require('express');
var router = express.Router();

const adminController = require('../controllers/adminController')

router.post('/register', adminController.register);
router.post('/login', adminController.login);

module.exports = router;