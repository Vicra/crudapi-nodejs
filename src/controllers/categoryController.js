const categoryService = require('../services/categoryService')

class CategoryController {
    async getCategories(_, res) {
        let response = {
            success: true,
            message: 'success',
            code: 200
        }
        try {
            response.data = await categoryService.getCategories();
            res.status(response.code).send(response);
        } catch (error) {
            response.success = false;
            response.message = "Exception: " + error;
            response.code = 500;
            res.status(response.code).send(response);
        }
    }
}

module.exports = new CategoryController();