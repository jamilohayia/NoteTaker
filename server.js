var express = require("express");

// this variable allows for node to know that we are creating an express server. 

var app = express();

// initial port 

var PORT = process.env.PORT || 8080; 

app.use(express.static(__dirname + '/Develop/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// This code sends our server file to our route files

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// The code to initiate the server

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});