
//Imports
const UserController = require('../controllers/user.controller')
const uploadPictureMiddleware = require('../../utils/middlewares/uploadPictureMiddleware');
const tokenVerification  = require('../../utils/middlewares/tokenVerificationMiddleware');



//---------------------Routes
exports.users  = function (baseUrl,app){

    //Register
    app.post(baseUrl  + "/user", uploadPictureMiddleware.single('image'), [
        //tokenVerification.checkToken, //add permission
        UserController.addOneUser
    ]);
    
    //Get all users
    app.get( baseUrl  + "/users", [
        tokenVerification.checkToken, //add permission
        UserController.getAllUser
    ]);

    //Get one user by id
    app.get(baseUrl  + "/user/:userId", [
        tokenVerification.checkToken, //add permission
        UserController.getOneUser
    ]);

    //Update one user
    app.put(baseUrl  + "/user/:userId", [
        tokenVerification.checkToken, //add permission
        UserController.updateOneUser
    ]);

    //Delete one user
    app.delete(baseUrl  + "/user/:userId", [
        tokenVerification.checkToken, //add permission
        UserController.deleteOneUser
    ]);

}
