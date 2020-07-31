// module
var budgetController = (function() {

  var x = 23;

  var add = function(a) {
    return x + a;
  }

  return {
    publicTest: function(b) {
      add(b);
    }
  }

})();

var UIController = (function() {
  //  code
})();


var controller = (function(budgetCtrl, UICtrl) {
  
})(budgetController, UIController);