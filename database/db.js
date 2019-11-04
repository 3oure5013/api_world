//Database connexion
    /*----------------------------------------------------------
                            Module calling
    ------------------------------------------------------------*/
    const Sequelize = require('sequelize');
    const dbConfig = require('../utils/config/dbConfig.json');
    
    // console.log(dbConfig);
    
    console.log(dbConfig.mariadb.databaseName +"," + dbConfig.mariadb.username +"," +dbConfig.mariadb.password)
    
    // Option 1: Passing parameters separately
    const sequelize = new Sequelize(dbConfig.mariadb.databaseName, dbConfig.mariadb.username,dbConfig.mariadb.password, {
      host: dbConfig.mariadb.host,
      dialect: dbConfig.mariadb.dialect, /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
      pool : dbConfig.options.pool,
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

