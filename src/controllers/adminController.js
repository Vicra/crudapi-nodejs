const adminService = require('../services/adminService');
const validatorService = require('../services/validatorService');

const bcrypt = require('bcrypt');
const saltRounds = 10;

class adminController {
    async register(req, res) {
        let response = {
            success: true,
            message: 'success',
            code: 200
        }

        try {
            let errorMessage = [];
            if (!req.body.user) {
                errorMessage.push('Parameter user required.');
            }
            else if (!validatorService.isText(req.body.user)) {
                errorMessage.push('Parameter user has to be text.');
            }

            if (!req.body.password) {
                errorMessage.push('Parameter password required.');
            }
            else if (!validatorService.isPassword(req.body.password)) {
                errorMessage.push('Incorrect password format: Minimum eight characters, at least one letter and one number, no special characters.');
            }

            if (errorMessage.length) {
                response.success = false;
                response.code = 400;
                response.message = errorMessage;
                res.status(response.code).send(response);
            }
            else{
                let user = req.body;
                user.salt = bcrypt.genSaltSync(saltRounds);
                user.password = bcrypt.hashSync(user.password, user.salt);

                response.data = await adminService.createUser(user);
                res.status(response.code).send(response);
            }

        } catch (error) {
            response.success = false;
            if(error.toString().includes('ER_DUP_ENTRY')){
                response.message = "User already exists, please try different user.";
            }
            else{
                response.message = "Exception: " + error;
            }
            response.code = 500;
            res.status(response.code).send(response);
        }
    }

    async login(req, res) {
        let response = {
            success: true,
            message: 'success',
            code: 200
        }
        try {
            let errorMessage = [];
            if (!req.body.user) {
                errorMessage.push('Parameter user required.');
            }
            else if (!validatorService.isText(req.body.user)) {
                errorMessage.push('Parameter user has to be text.');
            }

            if (!req.body.password) {
                errorMessage.push('Parameter password required.');
            }

            if (errorMessage.length) {
                response.success = false;
                response.code = 400;
                response.message = errorMessage;
                res.status(response.code).send(response);
            }
            else{
                let user = await adminService.getUser(req.body.user);
                if (!user.length){
                    response.success = false;
                    response.code = 404;
                    response.message = 'User does not exist';
                    res.status(response.code).send(response);
                }
                else{
                    user = user[0];
                    let inputPassword = bcrypt.hashSync(req.body.password, user.salt);
                    if(inputPassword === user.password){
                        response.data = {
                            user: user.user
                            , id: user.id
                        };
                        res.status(response.code).send(response);
                    }
                    else{
                        response.success = false;
                        response.code = 401;
                        response.message = 'Unauthorized: Wrong password';
                        res.status(response.code).send(response);
                    }
                }
            }
        } catch (error) {
            response.success = false;
            response.message = "Exception: " + error;
            response.code = 500;
            res.status(response.code).send(response);
        }
    }
}

module.exports = new adminController();