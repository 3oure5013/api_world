// Bcrypt to hash user password
const path = require('path');
const bcrypt = require('bcrypt');

// Personal modules
const message = require('../../utils/config/messages').message;
const verifyData = require('../../utils/functions/verifyUserData');
const {
  imageUploadFunction
} = require('../../utils/functions/uploadImage');
const logger = require('../middlewares/logMiddleware').logMiddleware;
const userDbRequest = require('../../database/query/User.request')


// Add(Create) One User
exports.addOneUser = async (req, res, next) => {

  const data = req.body
  // user all info
  const firstName = data.firstName
  const lastName = data.lastName
  const userName = data.userName
  const birthday = data.birthday
  const email = data.email
  const password = data.password
  const passwordConfirm = data.passwordConfirm

  // verifyData : we use function to check if all of user data sent by user are OK
  const dataVerificationReturn = await verifyData.verifyUserData(
    firstName,
    lastName,
    userName,
    birthday,
    email,
    password,
    passwordConfirm
  )


  // A dataVerificationReturn: if all we verify the image using imageUploadFunction();

  if (dataVerificationReturn[0] == false) {

    // call a function to verify image sent by user after check the result
    var imageSaveState = imageUploadFunction(req, res);

    //We check the imageSaveState here
    imageSaveState.then(
      (result) => {
        if (result[0] == false) {

          //If all is ok with our image we get the picture name and save
          const pictureName = result[1].pictureName;
          var passwordHashed = bcrypt.hashSync(password, 10);

          /*-------------------------------------------------
                            save in database
                        ----USE DATABASE HERE----
          --------------------------------------------------*/
          //logger
          logger.info(result);

          //Save this data in database
          userDbRequest.insert(
            firstName, lastName, userName, birthday, email, passwordHashed, pictureName
          ).then( //if all is ok
            user => {
              console.log("User's auto-generated ID:", user.id);
              res.status(200).json({
                status: 200,
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                birthday: birthday,
                email: email,
                password: passwordHashed,
                pictureName: pictureName,
                message: message.success.save,
                date: "new Date()"
              })
            }).catch((e) => { //if err
            res.status(500).json({
              status: 500,
              message: "Error :" + e
            });
          });
        } else {
          // Something went wrong when trying to save image get the error message to return to user
          logger.error(result);
          res.send(result)
        }
      });
  }
}

/*--------------------------------------------------
                 // Get All users
--------------------------------------------------*/

exports.getAllUser = (req, res) => {
  //logger
  //Select All user
  userDbRequest.findAll().then( //if all is ok
    users => {
      logger.info("get All user with success");
      res.status(200).json({
        status: 200,
        users: users
      })
    }).catch((e) => { //if err
    res.status(500).json({
      status: 500,
      message: "Error :" + e
    });
  });

}

/*--------------------------------------------------
                            // Get One User
          --------------------------------------------------*/

exports.getOneUser = (req, res) => {
  // id of user to return (Here we can get user by using his username or his id or his email make SQL request whom can take one of all this params)
  const userId = req.params.userId
  //logger
  logger.info("get user " + userId);
  //Select the user by id from database
  userDbRequest.findOne(userId)
    .then( //if all is ok
      user => {
        res.status(200).json({
          status: 200,
          user: user
        })
      }).catch((e) => { //if err
      res.status(500).json({
        status: 500,
        message: "Error :" + e
      });
    });

}


/*--------------------------------------------------
                  // Update One User
          --------------------------------------------------*/
exports.updateOneUser = async (req, res, next) => {

  //The user id
  const userId = req.params.userId
  console.log(userId)

  const data = req.body

  console.log(req.body)
  // user all info
  const firstName = data.firstName
  const lastName = data.lastName
  const userName = data.userName
  const birthday = data.birthday
  const email = data.email
  const password = data.password
  const passwordConfirm = data.passwordConfirm

  // verifyData : we use function to check if all of user data sent by user are OK
  const dataVerificationReturn = await verifyData.verifyUserData(
    firstName,
    lastName,
    userName,
    birthday,
    email,
    password,
    passwordConfirm
  );
  console.log(dataVerificationReturn)
  // A dataVerificationReturn: if all we verify the image using imageUploadFunction();
  if (dataVerificationReturn[0] == false) {
    // call a function to verify image sent by user after check the result
    var imageSaveState = imageUploadFunction(req, res);

    //We check the imageSaveState here
    imageSaveState.then(
      (result) => {
        if (result[0] == false) {

          //If all is ok with our image we get the picture name and save
          const pictureName = result[1].pictureName;
          var passwordHashed = bcrypt.hashSync(password, 10);

          /*-------------------------------------------------
                            save in database
                        ----USE DATABASE HERE----
          --------------------------------------------------*/
          //logger
          logger.info(result);

          //Update the user by id from database
          userDbRequest.update(userId, firstName, lastName, userName, birthday, email, passwordHashed, pictureName)
            .then( //if all is ok
              user => {
                res.status(200).json({
                  status: 200,
                  user: user
                })
              }).catch((e) => { //if err
              res.status(500).json({
                status: 500,
                message: "Error :" + e
              });
            });
        } else {
          // Something went wrong when trying to save image get the error message to return to user
          logger.error(result);
          res.status(500).send(result);
        }
      });

  } else {

    var error = dataVerificationReturn;

    res.status(500).json({
      status: 400,
      message: error
    })
  }
}


/*--------------------------------------------------
            // Delete One User
--------------------------------------------------*/

exports.deleteOneUser = (req, res) => {
  userId = req.params.userId;
  //We check if the user exist if yes we delete else we return unexisting message
  userDbRequest.findOne(userId)
    .then( //if all is ok
      user => {
        //Delete from database
        userDbRequest.destroy(userId)
          .then( //if all is ok
            user => {
              if (user) {
                //Delete from database
                userDbRequest.destroy(userId)
                  .then( //if all is ok
                    user => {
                      res.status(200).json({
                        status: 200,
                        message: "id  = " + userId + " ... " + message.success.delete
                      })
                    }).catch((e) => { //if err
                    res.status(500).json({
                      status: 500,
                      message: "Error :" + e
                    });
                  });
              } else {
                res.status(200).json({
                  status: 404,
                  message: "id  = " + userId + " ... " + message.error.user_not_found
                })
              }

            }).catch((e) => { //if err
            res.status(500).json({
              status: 500,
              message: "Error :" + e
            });
          });
      }).catch((e) => { //if err
      res.status(500).json({
        status: 500,
        message: "Error :" + e
      });
    });
}