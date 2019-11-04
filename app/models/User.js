const {sequelize, Sequelize} = require('../../database/db');

    /*----------------------------------------------------------
                    //Modeling user table
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
    },
    userName: {
      type: Sequelize.STRING
      // allowNull defaults to true
    },
    birthday: {
      type: Sequelize.STRING
      // allowNull defaults to true
    },
    email: {
      type: Sequelize.STRING
      // allowNull defaults to true
    },
    password: {
      type: Sequelize.STRING
      // allowNull defaults to true
    },
    pictureName: {
      type: Sequelize.STRING
      // allowNull defaults to true
    },
    createdAt: {
      allowNull: false,
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      allowNull: false,
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  }, {
    // options
  })

  module.exports = {
      User
  }
