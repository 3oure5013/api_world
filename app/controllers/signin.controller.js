//Bcrypt to hash user password
const bcrypt = require('bcrypt');
const message = require('../../utils/config/messages.json').message;

const logger = require('../middlewares/logMiddleware').logMiddleware;
const userDbRequest = require('../../database/query/User.request')

var dataReturn = {};


exports.login = (req, res) => {
    var username = req.body.username || req.body.email;
    var password = req.body.password;
    return new Promise((resolve, reject) => {

        userDbRequest.findOneWithUsername(username)
            .then( //if all is ok
                user => {
                    const userPasswordFromDataBase = user.password;
                    console.log(userPasswordFromDataBase);
                    bcrypt.compare(password, userPasswordFromDataBase /*this is the password get from database */ , (err, result) => {
                        if (result) {
                            dataReturn = {
                                "error": false,
                                "status": 200,
                                "username": username,
                                "password": userPasswordFromDataBase,
                                "message": "SUCCESS : " + message.success.login
                            };
                            resolve(dataReturn);
                        } else {
                            dataReturn = {
                                "error": true,
                                "status": 404,
                                "message": "ERROR : Mot de pass ne correspond pas"
                            };
                            reject(dataReturn);
                        }
                    });
                }).catch((e) => { //if err
                console.log("something went wrong");
                dataReturn = {
                    "error": true,
                    "status": 404,
                    "message": "ERROR : User not found"
                };
                reject(dataReturn);
            });

    });
}