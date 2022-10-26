//Required packages
const express = require("express"); //npm install express
const https = require("node:https");
const bodyParser = require("body-parser");
var path = require("path");

const app = express();

//Body parser for requests
app.use(bodyParser.urlencoded({extended: true}));

//Allows use of static files in public directory (css, images)
app.use(express.static(path.join(__dirname, 'public')));


//process.env.port listens for Heroku server
//local port 3000 for testing
app.listen(process.env.PORT || 3000, function(){

                  console.log("Running on 3000");
});



app.get("/", function(req, res){

              res.sendFile(path.join(__dirname, "views/index.html"));
});
