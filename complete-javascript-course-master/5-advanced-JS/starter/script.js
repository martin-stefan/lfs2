// Function constructor

// var john = {
//   name: 'john',
//   yearOfBirth: 1990,
//   job: 'teacher'
// };

// var Person = function(name, yearOfBirth, job) {
//   this.name = name;
//   this.yearOfBirth = name;
//   this.job = job;
// }

// // creating a prototype function
// Person.prototype.calculateAge = function() {
//   console.log(this.yearOfBirth);
// }

// var jack = new Person('jack', 1999, 'professor');

// Creating an object


// var personProto = {
//   calculateAge: function() {
//     console.log(2020 - this.yearOfBirth);
//   }
// };

// var john = Object.create(personProto);
// john.name = 'name';
// john.yearOfBirth = 1990;
// john.job = 'teacher';


// var jane = Object.create(personProto, {
//   name: {value: 'Jane'},
//   yearOfBirth: {value: 1992},
//   job: { value: 'designer'}
// })