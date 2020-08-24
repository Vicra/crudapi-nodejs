var express = require('express');
var router = express.Router();

const categoryController = require('../controllers/categoryController')

router.get('/', categoryController.getCategories);

module.exports = router;