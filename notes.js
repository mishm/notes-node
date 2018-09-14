console.log('Starting notes ...');

const fs = require('fs');

var fetchNotes = () => {
  try{
        //get existing notes
        var noteString = fs.readFileSync('notes-data.json');
        return JSON.parse(noteString);
  } catch(e){
    return [];
  }
}

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

//add function
var addNote = (title, body) => {

  var notes = fetchNotes();
  var note = {
      title,
      body
  }
//check for duplicates
  var duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0){
    //add new note to notes
    notes.push(note);
    saveNotes(notes);
    return note;
  }
}

var getAll = () => {
  var notes = fetchNotes();
  return notes;
}

var getNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((n) => n.title === title);
  return filteredNotes[0];
}

var removeNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title !== title);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
}

var logNote = (note)  => {
  debugger;
  console.log('Note added!');
  console.log('---');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
}


module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
}
