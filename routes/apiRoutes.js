// fs module to access physical file systm
var fs = require("fs");
var path = require("path");

module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
      res.json(getAllNotes());
    });

    // Post is used to send data to a server to create/update a resource
    app.post("/api/notes", function(req, res) {
      let data = req.body;
      data = pasteNew(data);
      res.json(data);
    });

    // The Delete Method Method deletes the specified resource 

    app.delete("/api/notes/:id", function(req, res) {
      let id = req.params.id;
      deleteNote(id);
      res.end();
    });

    function getAllNotes(){
      return JSON.parse(fs.readFileSync(path.join(__dirname+"/../Develop/db/db.json"), "utf8"));
    }


    // Function to paste a New Note to the application 
  
    function pasteNew(note) {
      let notes = getAllNotes();
      let d = new Date();
      note["id"] = d.getTime();
      notes.push(note);
      overwriteNotes(notes);
      return note;
    }

    // Function to delete a new note 
  
    function deleteNote(id){
      id = parseInt(id);
      let notes = getAllNotes();
      for(let i = 0; i < notes.length; i++){
        if(notes[i].id == id){
          notes.splice(i, 1);
          overwriteNotes(notes);
          break;
        }
      }
    }
  
    function overwriteNotes(newNotes){
      fs.writeFileSync("./db/db.json", JSON.stringify(newNotes));
    }
  };