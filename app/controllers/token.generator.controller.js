const jwt = require('jsonwebtoken');
const config = require('../../utils/config/config.json');
const verifyTokenMiddleware = require('../middlewares/tokenVerificationMiddleware');
const signinController = require('./signin.controller');
const message = require('../../utils/config/messages.json').message;

class tokenGenerator {
    loginVerification(req, res) {
        var loginState = signinController.login(req, res)

        loginState.then((loginStateResult) => {

            console.log("loginState----------------")
            console.log(loginStateResult)
            console.log("loginState----------------")

            if(loginStateResult.error == false){
                    const secret = config.tokenkey;
                    let username = loginStateResult.username;
                    let password = loginStateResult.password;
                    //Generation du token
                    let token = jwt.sign(
                        {
                            username:username
                        },
                        secret,
                        {
                            //additional parameters to token , le token est valable un jour
                            expiresIn : config.token_valid_time
                        });
                    //return the JWT token for the future Api calls
                    res.status(200).json({
                        error : false,
                        message : message.success.login,
                        token: token
                    })
            }else{
                //-------------auth failed------------
                res.status(400).json({
                    error:true,
                    message : message.error.login_failed
                })
            }
        }).catch((err) => {
            console.log(err)
            res.status(400).json({
                error:true,
                message : message.error.login_failed,
                err : err
            })
        })

    }


    index(req, res) {
        res.status(200).json({
            error: false,
            message: "Bienvenue sur l'api v1"
        })
    }
}

module.exports = tokenGenerator;