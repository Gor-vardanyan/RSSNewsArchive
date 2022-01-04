const express = require('express');
const cors = require('cors');
const router = require('./routes/GlobalRoutes');

const expressInit = express();

expressInit.use( cors() );
expressInit.use( express.json() ); //PARSE

//*ROUTES
router( expressInit );

PORT = 5000;
expressInit.listen( PORT, ()=> console.log("Server runing on port " + PORT ));