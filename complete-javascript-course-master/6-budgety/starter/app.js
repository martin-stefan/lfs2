
// modules

var budgetController = (function() {

  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0, 
      inc: 0
    }
  }

  return {
    addItem: function(type, desc, val) {
      var newItem, ID;

      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      if (type === 'exp') {
        newItem = new Expense(ID, desc, val);
      } else {
        newItem = new Income(ID, desc, val);
      }

      data.allItems[type].push(newItem);
      return newItem;

    }

    
  }

})();


var UIController = (function() {

  var DOMStrings = {
    type: '.add__type', 
    desc: '.add__description',
    inputValue: '.add__value',
    btn: '.add__btn'
  };

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMStrings.type).value,
        description: document.querySelector(DOMStrings.desc).value,
        value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
      };
    },

    addListItem: function(obj, type) {
      var html, newHtml, element;

      if (type === "inc") {
        element = '.income__list'
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === "exp") {
        element = '.expenses__list';
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);
      
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

    },

    clearFields: function() {
      var fields = document.querySelectorAll(DOMStrings.desc + "," + DOMStrings.inputValue);

      var fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function(current, index, array) {
        current.value = "";
      });

      fieldsArr[0].focus();
    },

    getDOMStrings: function() {
      return DOMStrings;
    }
  };
})();


var controller = (function(budgetCtrl, UICtrl) {

  var eventListeners = function() {
    var DOM = UICtrl.getDOMStrings(); 
    document.querySelector(DOM.btn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  }

  var updateBudget = function() {
    
  };

  var ctrlAddItem = function() {
    var input = UICtrl.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

      var newItem = budgetCtrl.addItem(input.type, input.description, input.value);
  
      UICtrl.addListItem(newItem, input.type);
      UICtrl.clearFields();
  
      updateBudget();
    }
    
  };

  return {
    init: function() {
      eventListeners();
    }
  }
  
})(budgetController, UIController);

controller.init();