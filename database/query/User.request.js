const connexion = require('../connexiondb'); //connexion to database
const {
  User
} = require('../../app/models/User'); //Users models


// Note: using `force: true` will drop the table if it already exists

// Find all users
const findAll = () => {
  User.findAll().then(users => {
    console.log("All users:", JSON.stringify(users, null, 4));
  });
}
// Find all users
const findOne = (id) => {
  User.findOne({
      where: {
        id: id
      }
    })
    .then(user => {

      console.log("All users:", JSON.stringify(user, null, 4));
      return user;
    });

}


// Create a new user
const insert = () => {
  User.create({
    firstName: "Jane",
    lastName: "Mark"
  }).then(
    jane => {
      console.log("Jane's auto-generated ID:", jane.id);
    });
}


// Delete everyone with his id
const destroy = (id) => {
  User.destroy({
    where: {
      id: id
    }
  }).then(() => {
    console.log("Done");
    return {
      status: 200,
      id: id,
      message: "successful delete",
    };
  });
}
// Change everyone without a last name to "Doe"
const update = (id) => {
  User.update({
    where: {
      id: id
    }
  }).then(() => {
    console.log("Done");
  });
}

module.exports = {
  insert,
  findOne,
  findAll,
  update,
  destroy
}