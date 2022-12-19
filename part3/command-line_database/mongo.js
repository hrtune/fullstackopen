const mongoose = require('mongoose')

const username = 'phonebook'
const password = process.argv[2]
const dbName = 'phonebook'
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://${username}:${password}@cluster0.e9z8waq.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (password && !(name || number)) {
    mongoose
        .connect(url)
        .then((result) => {
          console.log("phonebook:");
          Person.find({}).then((result) => {
            result.forEach((person) => {
              console.log(`${person.name} ${person.number}`);
            });
            mongoose.connection.close();
          });
          // don't put close() here:
          // mongoose.connection.close()
          // https://fullstackopen.com/en/part3/saving_data_to_mongo_db#exercise-3-12
        })
} else if (password && name && number) {
    mongoose
        .connect(url)
        .then((result) => {
            const person = new Person({
                name: name,
                number: number
            })

            return person.save()
        })
        .then(() => {
            console.log(`added ${name} number ${number} to phonebook`);
            mongoose.connection.close()
        })
} else {
    console.log('Usage:');
    console.log(
        "Add person: node mongo.js <password> <person_name> <phone_number>"
    );
    console.log("Show phonebook: node mongo.js <password>");
  process.exit(1); 
}
                
           







