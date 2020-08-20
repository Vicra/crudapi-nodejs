const productService = require('../services/productService')

class ProductController {
    async getProducts(req, res) {
        let response = {
            success: true,
            message: 'success',
            code: 200
        }
        try {
            response.data = await productService.getProducts();
            res.status(response.code).send(response);
        } catch (error) {
            response.success = false;
            response.message = "Exception: " + error;
            response.code = 500;
            res.status(response.code).send(response);
        }
    }
}

module.exports = new ProductController();