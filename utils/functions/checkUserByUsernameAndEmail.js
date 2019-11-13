const logger = require('../../app/middlewares/logMiddleware').logMiddleware;
const userDbRequest = require('../../database/query/User.request');


exports.checkUserByEmail = async function (email) {
    var emailExist = false;
    //Before adding user we are checking if this email is not already taken
    await userDbRequest.findOneByEmail(email)
        .then(
            user => {
                console.log("--------------je verfie email")

                if (user) {
                    //email already-taken
                    emailExist = true;
                }
            })
            .catch((e) => { //if err
            logger.error(JSON.stringify(e));
            res.status(500).json({
                status: 500,
                message: "Error :" + e
            });
        });
        return emailExist;
}


exports.checkUserByUsername = async function(username) {
    var usernameExist = false;
    await userDbRequest.findOneByUsername(username)
    .then(
        user => {
            if (user) {
                //username already-taken we put DataAlreadyTaken to true;
                console.log("username dejà pri")
                usernameExist = true;
            }
        }).catch((e) => { //if err
        logger.error(JSON.stringify(e));
        res.status(500).json({
            status: 500,
            message: "Error :" + e
        });
    });
    return usernameExist;
}