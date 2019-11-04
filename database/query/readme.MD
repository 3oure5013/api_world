BISMILAHI RAHMANI RAHIM
ALAHOUMA SOLI ALA MOUHAMADIN WA ALA ALI-HI WA SOHBI-HI ADJ-MA-HIN WA SALAMA TASILIMAN KESIRAN

For one Model follow this instructions : 

-Create Model file on /app/models/ and define your columns and their type in this file
    *Import sequelize and Sequelize from /database/db : 
       EX :  const {sequelize, Sequelize} = require('../../database/db');

    
-Create query file in /database/query/ 
    * Import db connexion file ./database/connexiondb.js
    * import your Model 
    * add your different request, you can just copy User.request.js and edit it

    
-Import the query in your controller