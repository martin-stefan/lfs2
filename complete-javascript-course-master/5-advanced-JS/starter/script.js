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

// function interviewQuestion(job) {
//   if (job === "designer" ) {
//     return function(name) {
//       console.log(name + " can you please explain what your experience is");
//     }
//   } else if (job === ) {
//     return function(name) {
//       console.log("What subejct do you teach, " + name + "?");
//     }
//   } else {
//     return function(name) {
//       console.log('Hello ' + name);
//     }
//   }
// }

// var teachQuestion = interviewQuestion('teacher');

// teachQuestion('John');

// interviewQuestion('teacher')('john');


// IIFE
// used to create a scope hidden from the outside scope
(function () {

})();

// Closures

// function retirement(retirementAge) {
//   var a = " years left until retirement";
//   return function(yearOfBirth) {
//     var age = 2020 - yearOfBirth;
//     console.log((retirementAge - age) + a);
//   }
// }

// function interview(job) {
//   return function(name) {
//     if (job === 'teacher') {
//       console.log(name + ' is a ' + job);
//     }
//   }
// }
// interview('teacher')('john');

// Bind call apply

// var john = {
//   name: 'john',
//   age: 26,
//   job: 'teacher',
//   presentation: function(style, timeOfDay) {
//     if (style === "formal") {
//       console.log("Hello, my name is" + this.name );
//     } else if (style === "friendly") {
//       console.log("What's up, I'm " + this.name);
//     }
//   }
// }


// // call allows us to steal methods from other objects

// john.presentation('formal', 'morning');

// var emily = {
//   name: "emily";
// }

// john.presentation.call(emily, 'friendly', 'afternoon');

// // bind allows us to make a copy of the method with preset arguments
// var johnFriendly = john.presentation.bind(john, 'friendly');
// johnFriendly('morning');


var Question = function(question, choices, answer) {
  this.question = question;
  this.choices= choices;
  this.answer = answer;
}

var q1 = new Question("How many continents are there", ['0 - Seven', '1 - Two', '2 - Six'], 0);
var q2 = new Question("How many eyes does the average human have", ['0 - One', '1 - Two', '2 - None'], 1);
var q3 = new Question("What do you use to make a room brighter", ['0 - Pillow', '1 - Fork', '2 - Light'], 2);

var questions = [q1, q2, q3];



function ask() {
  var randChoice = Math.floor(Math.random() * 3);
  console.log(questions[randChoice].question);
  console.log(questions[randChoice].choices[0]);
  console.log(questions[randChoice].choices[1]);
  console.log(questions[randChoice].choices[2]);

  var userAnswer = prompt("What is your answer?");

  if (userAnswer == questions[randChoice].answer) {
    console.log('Correct');
  } else {
    console.log('Incorrect');
  }
}

ask();