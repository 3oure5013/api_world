const jwt = require('jsonwebtoken');
const config = require('../../utils/config/config.json');
const verifyTokenMiddleware = require('../middlewares/tokenVerificationMiddleware');
const signinController = require('./signin.controller');
const message = require('../../utils/config/messages.json').message;
var loginState;
class tokenGenerator {
     loginVerification  (req,res) {
      var loginState = signinController.login(req,res)

       console.log("loginState----------------")
       console.log(loginState)
    //    if(loginState.error == false){
        if(loginState){
           if(loginState.username && loginState.password){
                const secret = config.tokenkey;
                let username = loginState.username;
                let password = loginState.password;
                let token = jwt.sign(
                    {
                        username:username
                    },
                    secret,
                    {
                        //additional parameters to token
                        expiresIn : config.token_valid_time
                    });
                //return the JWT token for the future Api calls
                res.status(200).json({
                    error : false,
                    message : message.success.login,
                    token: token
                })
           }else{
                //username && password don't send
                res.send(400).json({
                    error:true,
                    message : message.error.login_failed
                })
           }
        }else{
            //-------------auth failed   
        }
    }

    
    index(req, res){
        res.status(200).json({
            error:false,
            message : "Bienvenue sur l'api v1"
        })
    }
} 

module.exports = tokenGenerator;
