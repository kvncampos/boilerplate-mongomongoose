require('dotenv').config();
const process= require('process');
process.removeAllListeners('warning');

// ------------------------------------------------------
// ** Install and Set Up Mongoose **
let mongoose = require("mongoose");
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        // useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to Mongo!');
    })
    .catch((err) => {
        console.error('Error connecting to Mongo', err);
    });


// ------------------------------------------------------
// ** Create a Model **
const personSchema = new mongoose.Schema({
  // name: str, age: number, favoriteFoods: [str]
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  favoriteFoods: [String]
});


let Person = mongoose.model('Person', personSchema);

// ------------------------------------------------------
// ** Create and Save a Record of a Model **
const createAndSavePerson = (done) => {
  let newUser = new Person({
    name: 'John',
    age: 30,
  })
  newUser.save((err, data) => {
    if (err) return console.error(err);
    done(null, data)
    }
  )
};

// ------------------------------------------------------
// ** Create Many Records with model.create() **
let arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  console.log(arrayOfPeople);
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

// ------------------------------------------------------
// ** Use model.find() to Search Your Database **
const findPeopleByName = (personName, done) => {
  Person.find(personName, (err, data) => {
    if (err){ console.log(err)};
    done(null, data);
    }
  );
};

// ------------------------------------------------------
const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
