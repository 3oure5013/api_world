//Database connexion
    /*----------------------------------------------------------
                            Module calling
    ------------------------------------------------------------*/
    const Sequelize = require('sequelize');
    const dbConfig = require('../utils/config/dbConfig.json');
    
    console.log(dbConfig.bd.databaseName +"," + dbConfig.bd.username +"," +dbConfig.bd.password)
    
    // Option 1: Passing parameters separately
    const sequelize = new Sequelize(dbConfig.bd.databaseName, dbConfig.bd.username,dbConfig.bd.password, {
      host: dbConfig.bd.host,
      dialect: dbConfig.bd.dialect, /* this permit to specify type of database between one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
      dialectOptions : {
        timezone : process.env.db_timezone
      },
      port : process.env.db_port,
      pool : dbConfig.options.pool,
      define : {
        timestamp : false 
      },
      benchmark : false,
      logging: false

    });
    
    // Option 2: Passing a connection URI
    //const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname',dbConfig.options.pool);
    
    module.exports = {
      Sequelize,
      sequelize,
  
  }

  

    /*----------------------------------------------------------
                    How to make request with sequelize
    ------------------------------------------------------------*/  
//connexion test
//modeling db
//Queries

