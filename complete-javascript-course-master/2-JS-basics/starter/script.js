// var hello = "ello";
// console.log(hello);


// bills = [124, 48, 268]
// tips = []

// function calcu(bills) {

//   for (let index = 0; index < bills.length; index++) {
//     if (bills[index] < 50) {
//       tips.push(bills[index] * .20)
//     } else if (bills[index] >= 50 && bills[index] < 200) {
//       tips.push(bills[index] * .15)
//     } else {
//       tips.push(bills[index] * .1)
//     }
    
//   }
// }


// calcu(bills)
// console.log(tips)

// OBJECTS

var john = {
  firstName: "John",
  lastName: "Smith",
  birthYear: 1990,
  calcAge: function(birthYear) {
    this.age =  2018 - this.birthYear
  }

}

john.calcAge()