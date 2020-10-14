// This code is used to generate the correct file path for the HTML file 

var path = require("path");

module.exports = function(app) {
 

  // Requests for the HTML GET requests.  

  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

 
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};