const  mysql = require('mysql');
const dbConfig = require('../../../utils/dbConfig.json')
console.log(dbConfig.mysql);
/*
    In ../../../utils/dbConfig.json
    Update the database info to use mysql
*/

var connection = mysql.createConnection(
    //Mysql database info
    dbConfig.mysql
);

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;