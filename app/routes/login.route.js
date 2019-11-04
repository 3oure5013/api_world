'use strict'
//Modules import
const tokenGeneratorController = require('../controllers/token.generator.controller');

//Instance of token generator 
const tokenGeneratorInstance = new tokenGeneratorController();


//---------------------Routes
exports.login  = function (baseUrl,app){
    //For login
    app.post(baseUrl  + "/login", [
        //add permission
        tokenGeneratorInstance.loginVerification, //generate  a token if user auth successful
    ]);
}