
const jwt = require('jsonwebtoken');

//Personal modules
// const login = require('../../src/controllers/signin.controller');
const message = require('../config/messages.json').message;
const config = require('../config/config.json');
const logger = require('../../utils/middlewares/logMiddleware').logMiddleware;

let checkToken = (req, res, next)=>{
    console.log(req.headers);
    logger.info(JSON.stringify(req.headers));

    //get token from headers (express headers are auto converted to lowercase)
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    try{
        if(token.startsWith('Bearer')){
            //Remove Bearer
            token = token.slice(7, token.length);
            
        }
    }catch(e){
        token = false;
        logger.error("Error token invalid " + JSON.stringify(e) );
    }


    //We verify if token is present and valid
    if(token){
        const secret = config.tokenkey;
        //we verify if the token is valid
        jwt.verify(token, secret,  (err, decoded) =>{
            if(err){
                return res.json({
                    error : true,
                    status : 500,
                    message : message.error.invalid_token
                })
            }else{
                req.decoded = decoded;
                next();
            }
        })
    }else{
        return res.json({
            error : true,
            status : 500,
            message : message.error.missing_token
        })
    }
}

module.exports = {
    checkToken
}