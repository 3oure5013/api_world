const connexion = require('../connexiondb'); //connexion to database
const { User } = require('../../app/models/User'); //Users models


// Note: using `force: true` will drop the table if it already exists

// Find all users
const findAll = ()=>{
    User.findAll().then(users => {
    console.log("All users:", JSON.stringify(users, null, 4));
  });
}
// Find all users
const findOne= (id)=>{
  User.findOne({ 
      where: {
      id : id
    }
  })
  .then
  (user => {
    
  console.log("All users:", JSON.stringify(user, null, 4));
  return user;
});

}


// Create a new user
const insert = (firstName,lastName,userName,birthday,email,passwordHashed,pictureName)=>{
  // Note: using `force: true` will drop the table if it already exists
// User.sync({ force: true }).then(() => {
//   // Now the `users` table in the database corresponds to the model definition
//   return User.create({ 
//     firstName: firstName ,
//     lastName: lastName ,
//     userName: userName,
//     birthday: birthday,
//     email: email,
//     password: passwordHashed,
//     pictureName: pictureName,
//   });
// });  
  return User.create(
    { 
      firstName: firstName ,
      lastName: lastName ,
      userName: userName,
      birthday: birthday,
      email: email,
      password: passwordHashed,
      pictureName: pictureName,
    });
}


// Delete everyone with his id
const destroy = (id)=>{
    User.destroy({
    where: {
      id: id
    }
  }).then(() => {
    console.log("Done");
    return {
      status : 200,
      id : id,
      message : "successful delete",
    };
  });
}
// Change everyone without a last name to "Doe"
const update = (id,lastName)=>{
    User.update(
      {
       lastName: lastName,
      }, 
      {
      where: {
        id: id
      }
  }).then(() => {
    console.log("Done");
  });
}

module.exports={
  insert,
  findAll,
  update,
  destroy
}