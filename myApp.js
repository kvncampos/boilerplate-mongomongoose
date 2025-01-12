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
  Person.find({name: personName}, (err, data) => {
    if (err){ console.log(err)};
    done(null, data);
    }
  );
};

// ------------------------------------------------------
// ** Use model.findOne() to Return a Single Matching Document from Your Database **

// 1. ** Uses a traditional callback approach, which can lead to callback hell (nested callbacks) if not handled carefully. **
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, doc) => {
    if (err) {
      console.log(err); // Log the error
      done(err); // Pass the error to the callback
    } else {
      console.log("Result:", doc); // Log the result
      done(null, doc); // Pass the document to the callback
    }
  });
};


// 2. ** Uses Promises for handling asynchronous operations, while the second snippet uses callbacks. **
// const findOneByFood = (food) => {
  // Person.findOne({ favoriteFoods: food })
    // .then((doc) => {
      // console.log("Result :", doc);
    // })
    // .catch((err) => {
      // console.log(err);
    // });
// };
// 

// ------------------------------------------------------
// ** Use model.findById() to Search Your Database By _id ** 

let personId = 123

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, doc) => {
    if (err) {
      console.log(err);
      done(err); // Pass the error to the callback
    } 
    else {
      console.log("Result :", doc);
      done(null, doc); // Pass the document to the callback
    }
  });
};


// ------------------------------------------------------
// ** Perform Classic Updates by Running Find, Edit, then Save **
const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

  // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

// ------------------------------------------------------
// ** Perform New Updates on a Document Using model.findOneAndUpdate() **
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName }, // Filter
    { age: ageToSet }, // What to changes
    { new: true }, // Use `new` option instead of `returnNewDocument`
    (err, doc) => {
      if (err) {
        console.log(err);
        done(err); // Pass the error to the callback
      } else {
        console.log("Updated document:", doc);
        done(null, doc); // Pass the updated document to the callback
      }
    }
  );
};

// ------------------------------------------------------
// ** Delete One Document Using model.findByIdAndRemove **
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, docs) => {
    if (err) {
        console.log(err)
        done(null, docs);
    }
    else {
        console.log("Removed User:", docs);
        done(null, docs);
    }
  });
};

// ------------------------------------------------------
// ** Delete Many Documents with model.remove() **

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, data) => {
    if (err) {
      console.log(err);
      done(null, data);
    }
    else {
      console.log(data);
      done(null, data);
    }
  });
};

// ------------------------------------------------------
// ** Chain Search Query Helpers to Narrow Search Results ** 
// Modify the queryChain function to find people who like the food specified by the variable named foodToSearch. Sort them by name, limit the results to two documents, and hide their age. 
// Chain .find(), .sort(), .limit(), .select(), and then .exec(). Pass the done(err, data) callback to exec(). 

const queryChain = (done) => {
  const foodToSearch = "burrito";
  const query = Person.find({favoriteFoods:foodToSearch})
  .sort({name:"asc"})
  .limit(2)
  .select({age: 0})
  .exec((err, people)=>{
    if(err) return console.log(err)
    done(null, people)
  })
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
