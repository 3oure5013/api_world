//BISMILAHI RAHMANI RAHIM
//ALAHOUMA SOLI ALA MOUHALIMANA MOUHALIMA AL-BACHARIYA SOLAWATOU RABI ALEY-HI WA ALA ALI-HI WA SOH-BIHI WA SALIM DA IMAN ABADAN

'use strict'

/* ----------------------------------------------------------------------------------
                                Nodejs Modules
-----------------------------------------------------------------------------------*/
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./utils/config/config.json');
//defining the Express App
const app = express();
const baseUrl = config.base_url;
/* ----------------------------------------------------------------------------------
                                MIDDLEWARE
-----------------------------------------------------------------------------------*/
// Adding helmet to enhance your API's security 
app.use(helmet() );

// Using body parser to parse JSON bodies into JS objects

app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json());

//Enabling CORS
app.use(cors());

//Adding morgan to log HTTP requests
app.use(morgan('combined'));

//Static file 
app.use(express.static('../src/public'));




/* ----------------------------------------------------------------------------------
                            Personal Modules and variables
-----------------------------------------------------------------------------------*/
// const migrate = require('../database/migration');
// console.log(migrate);
 const routes = require('./src/routes/routes');
 const logger = require('./app/middlewares/logMiddleware').logMiddleware;


/* ----------------------------------------------------------------------------------
                                    ROUTES
-----------------------------------------------------------------------------------*/

//Root route
app.get("/",(req,res)=>{
    console.log("----------------------------------------------------")
    console.log("Bienvenue sur api v1")
    console.log("----------------------------------------------------")
    res.send(config.hostname + ":" + config.port + config.baseUrl)
}),

//Other routes(user,...)
routes.configRoutes(baseUrl, app);


//undefined routes (404)
app.use("/*", (req,res)=>{
    res.status(500).json(
        {
            "error":true,
            "status":404,
            "message":"Page not found"
        }
    )
});


/* ----------------------------------------------------------------------------------
                                SERVER LISTENING
-----------------------------------------------------------------------------------*/
app.listen(config.port, config.hostname, ()=>{
    console.log("Applcation démarrer sur http://" + config.hostname+":"+ config.port);
    logger.info("Application démarré sur " + config.hostname+":"+ config.port);

});
