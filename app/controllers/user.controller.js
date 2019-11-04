// Bcrypt to hash user password
const path = require('path');
const bcrypt = require('bcrypt');

// Personal modules
const message = require('../../utils/config/messages').message;
const verifyData = require('../../utils/functions/verifyUserData');
const { imageUploadFunction } = require('../../utils/functions/uploadImage');
const logger = require('../../utils/middlewares/logMiddleware').logMiddleware;


// Add(Create) One User
exports.addOneUser = async (req, res, next) => {

  const data = req.body
  // user all info
  const name = data.name
  const surname = data.surname
  const username = data.username
  const birthday = data.birthday
  const email = data.email
  const password = data.password
  const passwordConfirm = data.passwordConfirm

  // verifyData : we use function to check if all of user data sent by user are OK
  const dataVerificationReturn = await verifyData.verifyUserData(
    name,
    surname,
    username,
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
          res.status(200).json({
            status: 200,
            name: name,
            surname: surname,
            username: username,
            birthday: birthday,
            email: email,
            password: passwordHashed,
            pictureName: pictureName,
            message: message.success.save,
            date : "new Date()"
          })

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
    logger.info("get All user with success");
    
    res.send({
      status: 200,
      message: 'All users'
    })
  }

            /*--------------------------------------------------
                            // Get One User
          --------------------------------------------------*/
  
  exports.getOneUser = (req, res) =>  { 
    // id of user to return (Here we can get user by using his username or his id or his email make SQL request whom can take one of all this params)
    const userId = req.params.userId
    //logger
    logger.info("get user " + userId);
    //Select the user by id from database
    res.send({
      status: 200,
      message: ' user number ' + userId
    })
  }


            /*--------------------------------------------------
                          // Update One User
          --------------------------------------------------*/
  exports.updateOneUser = (req, res) => {
    //Update from database
    res.send({
      status: 200,
      message: 'Update one user'
    })
  }

            /*--------------------------------------------------
                           // Delete One User
          --------------------------------------------------*/

  
  exports.deleteOneUser = (req, res) => {
    //Delete from database
    res.send({
      status: 200,
      message: 'delete one user'
    })
  }
