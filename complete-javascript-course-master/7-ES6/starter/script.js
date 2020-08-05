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
{
  const a = 1;
  let b = 2;
  var c = 3; // var will not be private in this block

}
