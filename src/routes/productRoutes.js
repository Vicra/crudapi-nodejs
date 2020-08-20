var express = require('express');
var router = express.Router();

const productController = require('../controllers/productController')

router.get('/', productController.getProducts);

module.exports = router;