const connexion = require('../connexiondb'); //connexion to database
const {
  User
} = require('../../app/models/User'); //Users models

/*-------------------------------------------------------
                    Create table
      uncomment this line under to create table
-------------------------------------------------------*/
//const migrate = require('../migration');


/*-------------------------------------------------------
                        Request
-------------------------------------------------------*/
// Find all users
const findAll = () => {
  return User.findAll();
}

// Find one user with id
const findOne = (id) => {
  return User.findOne({
      where: {
        id: id
      }
    });
}

// Create a new user
const insert = (firstName, lastName, userName, birthday, email, passwordHashed, pictureName) => {
  return User.create({
    firstName: firstName,
    lastName: lastName,
    userName: userName,
    birthday: birthday,
    email: email,
    password: passwordHashed,
    pictureName: pictureName,
  });
}

// Delete everyone with his id
const destroy = (id) => {
  return User.destroy({
    where: {
      id: id
    }
  });
}

// Change everyone without a last name to "Doe"
const update = (id, firstName, lastName, userName, birthday, email, passwordHashed, pictureName) => {
  return User.update({
    firstName: firstName,
    lastName: lastName,
    userName: userName,
    birthday: birthday,
    email: email,
    password: passwordHashed,
    pictureName: pictureName,
  }, {
    where: {
      id: id
    }
  });
}

module.exports = {
  insert,
  findOne,
  findAll,
  update,
  destroy
}