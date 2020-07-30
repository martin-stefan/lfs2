// Function constructor

var john = {
  name: 'john',
  yearOfBirth: 1990,
  job: 'teacher'
};

var Person = function(name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = name;
  this.job = job;
}

// creating a prototype function
Person.prototype.calculateAge = function() {
  console.log(this.yearOfBirth);
}

var jack = new Person('jack', 1999, 'professor');