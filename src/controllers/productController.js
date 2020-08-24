const productService = require('../services/productService')
const validatorService = require('../services/validatorService')

class ProductController {
    async getProducts(_, res) {
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

    async getProductById(req, res) {
        let response = {
            success: true,
            message: 'success',
            code: 200
        }
        let productId = 0;
        let errorMessage = "";
        if (!req.params.id){
            errorMessage = "Parameter 'id' is require to perform this request.";
        }
        else if (isNaN(req.params.id)){
            errorMessage = "Parameter 'id' need to be a numeric value.";
        }
        else{
            productId = req.params.id;
        }

        if(errorMessage.length){
            response.success = false;
            response.message = "Bad request: " + errorMessage;
            response.code = 400;
            res.status(response.code).send(response);
        }
        else{
            try {
                response.data = await productService.getProductById(productId);
                if (response.data.length){
                    response.data = response.data[0];
                    res.status(response.code).send(response);
                }
                else{
                    response.success = false;
                    response.message = "Not found: this product does not exist on the database.";
                    response.code = 404;
                    res.status(response.code).send(response);
                }
            } catch (error) {
                response.success = false;
                response.message = "Exception: " + error;
                response.code = 500;
                res.status(response.code).send(response);
            }
        }
    }

    async updateProduct(req, res) {
        let response = {
            success: true,
            message: 'success',
            code: 200
        }
        try {
            let errorMessage = [];
            if (!req.params.id) {
                errorMessage.push('Parameter id required.');
            }
            else if (isNaN(req.params.id)) {
                errorMessage.push('Parameter id has to be numeric.');
            }

            if (!req.body.name) {
                errorMessage.push('Parameter name is required.');
            }
            else if (!validatorService.isText(req.body.name)) {
                errorMessage.push('Parameter name has to be a string.');
            }

            if (req.body.description && !validatorService.isText(req.body.description)) {
                errorMessage.push('Parameter description has to be a string.');
            }

            if (!req.body.categoryId) {
                errorMessage.push('Parameter categoryId is required.');
            }
            else if (isNaN(req.body.categoryId)) {
                errorMessage.push('Parameter categoryId has to be numeric.');
            }

            if (!req.body.price) {
                errorMessage.push('Parameter price is required.');
            }
            else if (isNaN(req.body.price)) {
                errorMessage.push('Parameter price has to be numeric.');
            }

            if (!req.body.image) {
                errorMessage.push('Parameter image is required.');
            }
            else if (!validatorService.isURL(req.body.image)) {
                errorMessage.push('Parameter image need to have a URL format.');
            }

            if (errorMessage.length) {
                response.success = false;
                response.code = 400;
                response.message = errorMessage;
                res.status(response.code).send(response);
            }
            else {
                req.body.id = req.params.id;
                await productService.updateProduct(req.body);
                res.status(response.code).send(response);
            }
        } catch (error) {
            response.success = false;
            response.message = "Exception: " + error;
            response.code = 500;
            res.status(response.code).send(response);
        }
    }

    async deleteProduct(req, res){
        let response = {
            success: true,
            message: 'success',
            code: 200
        }
        try {
            let errorMessage = "";
            if (!req.params.id) {
                errorMessage += 'Parameter id required.';
            }
            else if (isNaN(req.params.id)){
                errorMessage += 'Parameter id has to be numeric.';
            }            

            if (errorMessage.length) {
                response.success = false;
                response.code = 400;
                response.message = errorMessage;
                res.status(response.code).send(response);
            }
            else {
                await productService.deleteProduct(req.params.id);
                res.status(response.code).send(response);
            }
        } catch (error) {
            response.success = false;
            response.message = "Exception: " + error;
            response.code = 500;
            res.status(response.code).send(response);
        }
    }

    async createProduct(req, res) {
        let response = {
            success: true,
            message: 'success',
            code: 200
        }
        try {
            let errorMessage = [];
            if (!req.body.name) {
                errorMessage.push('Parameter name is required.');
            }
            else if (!validatorService.isText(req.body.name)) {
                errorMessage.push('Parameter name has to be a string.');
            }

            if (req.body.description && !validatorService.isText(req.body.description)) {
                errorMessage.push('Parameter description has to be a string.');
            }

            if (!req.body.categoryId) {
                errorMessage.push('Parameter categoryId is required.');
            }
            else if (isNaN(req.body.categoryId)) {
                errorMessage.push('Parameter categoryId has to be numeric.');
            }

            if (!req.body.price) {
                errorMessage.push('Parameter price is required.');
            }
            else if (isNaN(req.body.price)) {
                errorMessage.push('Parameter price has to be numeric.');
            }

            if (!req.body.image) {
                errorMessage.push('Parameter image is required.');
            }
            else if (!validatorService.isURL(req.body.image)) {
                errorMessage.push('Parameter image need to have a URL format.');
            }

            if (errorMessage.length) {
                response.success = false;
                response.code = 400;
                response.message = errorMessage;
                res.status(response.code).send(response);
            }
            else {
                req.body.id = req.params.id;
                await productService.createProduct(req.body);
                res.status(response.code).send(response);
            }
        } catch (error) {
            response.success = false;
            response.message = "Exception: " + error;
            response.code = 500;
            res.status(response.code).send(response);
        }
    }
}

module.exports = new ProductController();