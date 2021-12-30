const express = require('express');
const { mongoDB } = require('./DB/config');

const mongoInit = mongoDB();

const expressInit = express();

expressInit.use( express.json() ); //PARSE

//*ROUTES && MONGO INIT

( async() =>{
    await mongoInit
    expressInit.get("/", ()=> console.log( "first endpoint" ))
})()

// const globalRoutes = require('./routes/GlobalRoutes');
// globalRoutes( expressInit )

PORT = 5000;
expressInit.listen( PORT, ()=> console.log("Server runing on port " + PORT ));