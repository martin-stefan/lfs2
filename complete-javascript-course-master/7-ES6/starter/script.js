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

const years = [1990, 1999, 1989];

// es5
// var ages = years.map(function(el) {
//   return 2016 - el;
// });


// es6
const ages = years.map(el => 2016 - el);
console.log(ages);


let ages2 = years.map((el, index) => `Age of ${index + 1}: ${2016 - el}`);
console.log(ages2);

ages2 = years.map((el, index) => {
  const now = new Date().getFullYear();
  const age = now - el;
  return `Age of ${index + 1}: ${age}`
})

console.log(ages2)