console.log('Starting App ...');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
  description: 'Title of note',
  demand: true,
  alias: 't'
}

const bodyOptions = {
  description: 'Body of note',
  demand: true,
  alias: 'b'
}

const argv = yargs
            .command('add','Add a new note.',{title: titleOptions, body: bodyOptions})
            .command('list', 'Lists all notes')
            .command('read', 'Gets a note', {title: titleOptions})
            .command('remove','Removes a note',{ title: titleOptions })
            .help()
            .argv;
var command = argv._[0];
console.log('Command: ', command);

// console.log('Process args: ', process.argv);
console.log('Yargs args: ', argv);

if (command === 'add'){
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    notes.logNote(note);
  }else{
    console.log(`Note has not been added. Does it already exist?`);
  }
}else if (command === 'list') {
  var allNotes = notes.getAll();
  if (allNotes) {
    allNotes.forEach((note) => notes.logNote(note));
  }
}else if (command === 'read') {
  var note = notes.getNote(argv.title);
  notes.logNote(note);
}else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  var msg = noteRemoved ? 'Note has been removed' : 'Note was not found!';
  console.log(msg);
}else {
  console.log('Command not recognised!');
}
