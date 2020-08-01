var ctrlAddItem = function() {
  // do stuff
}

// modules

var budgetController = (function() {

  // code

})();


var UIController = (function() {
  //  code
})();


var controller = (function(budgetCtrl, UICtrl) {
  document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

  document.addEventListener('keypress', function(event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(budgetController, UIController);