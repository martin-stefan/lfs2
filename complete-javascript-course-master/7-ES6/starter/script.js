// // es6
// const name6 = "Jane Miller"; //cannot change
// let age6  = 16; // replaces var

// Es5
// function drivers(passed) {
//   if (passed) {
//     var fname = 'john';
//     var birthYear = 1990;
//   }
// }

//es6
// function drivers(passed) {
//   if (passed) {
//     let fname = 'john';
//     const birthYear = 1990;
//   }
//   // variables are block scoped, whcih means I cannot access them outside of that if statement
//   //  let can be called from a child component but const cannot
// }

// Blocks and IFFes in es6
// creates a private block
// {
//   const a = 1;
//   let b = 2;
//   var c = 3; // var will not be private in this block

// }

// let first = 'john';
// let last = 'smith';
// const yob = 1990;

// function calc(year) {
//   return 2016 - year;
// }

// // es5
// console.log(first + " " + last + " is " + calc(yob) );

// // es6
// // template literals
// console.log(`${first} ${last} is ${calc(yob)}`)


// const n = `${first} ${last}`;
// console.log(n.startsWith('j'));
// console.log(n.endsWith('h'));
// console.log(n.includes(' '));

// console.log(first.repeat(5));
// console.log(`${first} `.repeat(5));

// es6 arrow functions

// const years = [1990, 1999, 1989];

// // es5
// // var ages = years.map(function(el) {
// //   return 2016 - el;
// // });


// // es6
// const ages = years.map(el => 2016 - el);
// console.log(ages);


// let ages2 = years.map((el, index) => `Age of ${index + 1}: ${2016 - el}`);
// console.log(ages2);

// ages2 = years.map((el, index) => {
//   const now = new Date().getFullYear();
//   const age = now - el;
//   return `Age of ${index + 1}: ${age}`
// })

// console.log(ages2)

// arrow functions share the surrounding this keyword


// es5
// does not work how we want it to
// to make it work, save this to a variable
// var box = {
//   color: 'green',
//   position: 1,
//   clickMe: function() {
//     document.querySelector('.green').addEventListener('click', function() {
//       var str = "this box number is " + this.position + 'and it is' + this.color;
//       alert(str)
//     });
//   }
// }
// box.clickMe();


// es6
// const box = {
//   color: 'green',
//   position: 1,
//   clickMe: function() {
//     document.querySelector('.green').addEventListener('click', () => {
//       var str = "this box number is " + this.position + ' and it is' + this.color;
//       alert(str)
//     });
//   }
// }
// box.clickMe();


// es5
// also does not work
// to make it work, bind the call function
// function Person(name) {
//   this.name = name;
// }

// Person.prototype.myFriends = function(friends) {
//   var arr = friends.map(function(el) {
//     return this.name + ' is friends with ' + el;
//   });
//   console.log(arr);
// }

// var friends = ['bob', 'jane', 'mark'];
// new Person('John').myFriends(friends);

// es6
// function Person(name) {
//     this.name = name;
// }

// Person.prototype.myFriends = function(friends) {
//   var arr = friends.map(el => `${this.name} is friends with ${el}`);
//   console.log(arr);
// }
// var friends = ['bob', 'jane', 'mark'];
// new Person('John').myFriends(friends);

// es5
// var john = ['john', 26];
// var name = john[0];
// var age = john[1];

// es6
// const [name, age] = ['john', 26]
// // for objext
// var obj = {
// }
// const {firstName, lastName} = obj;


// arrays
// const boxes = document.querySelectorAll('.box');


// // es5
// var boxesarr = Array.prototype.slice.call(boxes);
// boxesarr.forEach(function(curr) {
//   curr.style.backgroundColor = 'blue';
// });

// es6
// const boxesArr = Array.from(boxes);
// boxesArr.forEach(curr => curr.style.backgroundColor = 'blue');

// looping over arrays
// es5

//  for (var i = 0; i < boxesArr.length; i++) {
//    if(boxesArr[i].className === 'box blue') {
//      continue;
//    }

//    boxesArr[i].textContent =  'I changed to blue';
//  }

// es6
// for (const cur of boxesArr) {
//   if (cur.className.includes('blue')) {
//     continue;
//   }
//   cur.textContent = 'I changed to blue';
// }

// es5

// var ages = [12, 32, 11, 14];
// var full = ages.map(function(cur) {
//   return cur >= 18;
// });

// full.indexOf(true);;
// ages[full.indexOf(true)];

// es6
// ages.findIndex(cur => cur >= 18);
// ages.find(cur => cur >= 18);

// Spread operator

// es5

// function addFourAges(a, b, c, d) {
//   return a + b + c + d;
// }

// var ages = [12, 11, 14, 16];
// var sum2 = addFourAges.apply(null, ages);

// // es6
// const sum3 = addFourAges(...ages);

// const smithFam = ['john', 'mary'];
// const otherFam = ['jack', 'may'];

// // to join them together
// const bigFamily = [...smithFam, ...otherFam];

// rest paramters (oppsite of spread operator)

// es5
// function isFullAge() {
//   var args = Array.prototype.slice.call(arguments);
//   args.forEach(function(cur) {
//     console.log((2020 - cur) >= 18) ;
//   })
// }

// isFullAge(1990, 1999, 1970);

// es6
// function isFullAge(...years) {
//   years.forEach(cur => console.log((2020 - cur) >= 18))
// }

// isFullAge(1990, 2005, 1999, 1970);

// default parameters

// es5

// function Smith(firstName, lastName, yob) {

//   !lastName ? lastName = "Smith" : lastName = lastName;

//   this.firstName = firstName;
//   this.lastName = lastName;
//   this.yob = yob;
// }

// var john = new Smith('John','', 1990);

// function Smith(firstName, lastName = 'Smith', yob) {
//   this.firstName = firstName;
//   this.lastName = lastName;
//   this.yob = yob;
// }

// var john = new Smith('john');

//  Maps

// const question = new Map();
// // key can be int, string, and bool

// question.set('question', " what is red?");
// question.set(1, 'color');
// question.set(2, 'shape');
// question.set(3, 'yes');
// question.set('correct', 1);
// question.set(true, 'Nice');
// question.set(false, 'Not nice');

// console.log(question.get('question'));
// console.log(question.size);

// // if (question.has(3)) {
// //   question.delete(3);
// // }

// // question.clear();

// question.forEach((value, key) => 
// console.log(key + value));

// for (let [key, value] of question.entries()) {
//   // console.log(`this is ${key} and I am ${value}`);
//   if (typeof(key) === 'number') {
//     console.log(`Answer ${key}: ${value}`);
//   }
// }

// const ans = parseInt(prompt('give answer'));
// console.log(question.get(ans === question.get('correct')));

// Classes

// es5
// var Person = function(name, yob, job) {
//   this.name = name;
//   this.yob = yob;
//   this.job = job;
// }

// Person.prototype.calc = function() {
//   var age = new Date().getFullYear() = this.yob;
//   console.log(age);
// }

// var john = new Person('john', 1999, 'teacher');


// es6 

// class Person {
//   constructor (name, yob, job) {
//     this.name = name;
//     this.yob = yob;
//     this.job = job;
//   }

//   calc() {
//     var age = new Date().getFullYear() = this.yob;
//     console.log(age);
//   }
// }

// const john = new Person('john', 1999, 'teacher');

// classes and sub classes

// es5
// var Person = function(name, yob, job) {
//     this.name = name;
//     this.yob = yob;
//     this.job = job;
// }

// Person.prototype.calc = function() {
//   var age = new Date().getFullYear() = this.yob;
//   console.log(age);
// }

// var Athlete = function(name, yob, job, games, medals) {
//   Person.call(this, name, yob, job);
//   this.games = games;
//   this.medals = medals;
// }


// Athlete.prototype= Object.create(Person.prototype);

// var john = Athlete('john', 1999, 'swimmer', 3, 5);

// class Person {
//   constructor (name, yob, job) {
//     this.name = name;
//     this.yob = yob;
//     this.job = job;
//   }

//   calc() {
//     var age = new Date().getFullYear() = this.yob;
//     console.log(age);
//   }
// }

// class Athlete extends Person {
//   constructor(name, yob, job, games, medals) {
//     super(name, yob, job);
//     this.games = games;
//     this.medals = medals;
//   }
// }