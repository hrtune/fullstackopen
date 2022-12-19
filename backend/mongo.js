const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const username = 'notes-app-full'
const password = process.argv[2]; // mongopassword
const dbName = 'noteApp'


const url = `mongodb+srv://${username}:${password}@cluster0.e9z8waq.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

mongoose
    .connect(url)
    .then((result) => {
        console.log('connected');
        Note.find({}).then((result) => {
          result.forEach((note) => {
            console.log(note);
          });
          mongoose.connection.close();
        });
    })
    
// create a note
/*
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected");

    
    const note = new Note({
      content: "HTML is Easy",
      date: new Date(),
      important: true,
    });

    return note.save();
    
  })
  .then(() => {
    console.log("note saved!");
    return mongoose.connection.close();
  })
  .catch((err) => console.log(err));
*/