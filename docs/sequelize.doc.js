const {sequelize, Sequelize} = require('./db')

    /*----------------------------------------------------------
                           //connection test
    ------------------------------------------------------------*/  
sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
  
  
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});


     /*----------------------------------------------------------
                           //Modeling a table
    ------------------------------------------------------------*/  

const User = sequelize.define('user', {
    // attributes
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING
      // allowNull defaults to true
    }
  }, {
    // options
  })


  // Note: using `force: true` will drop the table if it already exists
User.sync({ force: true }).then(() => {
    // Now the `users` table in the database corresponds to the model definition
    return User.create({
      firstName: 'John',
      lastName: 'Hancock'
    });
  });