const express = require('express');

//  initialization of express as app
const app = express();

// Should add env?
PORT = 5000;

//  JSON PARSE ALL INCOMING REQUESTS
app.use(express.json());

app.listen( PORT, ()=> console.log("Server runing on port " + PORT ));