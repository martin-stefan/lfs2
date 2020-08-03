
// modules

var budgetController = (function() {

  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function(totIncome) {
    if (totIncome > 0) {
      this.percentage = Math.round((this.value / totIncome * 100));
    } else {
      this.percentage = -1;
    }
  };

  Expense.prototype.getPercentage = function() {
    return this.percentage;
  }

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calcTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(curr) {
      sum += curr.value;
    });
    data.totals[type] = sum;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0, 
      inc: 0
    },
    budget: 0,
    percentage: -1
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

    },

    deleteItem: function(type, id) {
      var ids = data.allItems[type].map(function(curr) {
        return curr.id;
      });

      var index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }


    },

    calculateBudget: function() {
      calcTotal('exp');
      calcTotal('inc');

      data.budget = data.totals.inc - data.totals.exp;

      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
      

    },

    calculatePercentages: function() {
      data.allItems.exp.forEach(function(cur) {
        cur.calcPercentage(data.totals.inc);
      });
    },

    getPercentages: function() {
      var all = data.allItems.exp.map(function(cur) {
        return cur.getPercentage();
      });
      return all;
    },

    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      }
    }

    
  };

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
        html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === "exp") {
        element = '.expenses__list';
        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);
      
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

    },

    deleteListItem: function(selectorID) {
      document.getElementById(selectorID).parentNode.removeChild(document.getElementById(selectorID));
    },

    clearFields: function() {
      var fields = document.querySelectorAll(DOMStrings.desc + "," + DOMStrings.inputValue);

      var fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function(current, index, array) {
        current.value = "";
      });

      fieldsArr[0].focus();
    },

    displayBudget: function(obj) {
      document.querySelector('.budget__value').textContent = obj.budget;
      document.querySelector('.budget__income--value').textContent = obj.totalInc;
      document.querySelector('.budget__expenses--value').textContent = obj.totalExp;
      document.querySelector('.budget__expenses--percentage').textContent = obj.percentage + '%';

      if (obj.percentage > 0) {
        document.querySelector('.budget__expenses--percentage').textContent = obj.percentage + '%';
      } else {
        document.querySelector('.budget__expenses--percentage').textContent = '---';
      }
      
    },

    displayPercentages: function(percentages) {
      var fields = document.querySelectorAll(".item__percentage");
      
      var nodeList = function(list, callback) {
        for (var i = 0; i < list.length; i++) {
          callback(list[i], i);
        }
      };

      nodeList(fields, function(current, index) {
        if (percentages[index] > 0) {
          current.textContent = percentages[index] + '%';
        } else {
          current.textContent = "---";
        }
      });
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

    document.querySelector('.container').addEventListener('click', ctrlDelItem);
  };

  var updateBudget = function() {
    budgetCtrl.calculateBudget();

    var budget = budgetCtrl.getBudget();

    UICtrl.displayBudget(budget);

    
  };

  var updatePercentages = function() {
    budgetCtrl.calculatePercentages();
    var percentages = budgetCtrl.getPercentages();

    UICtrl.displayPercentages(percentages);
  };

  var ctrlAddItem = function() {
    var input = UICtrl.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

      var newItem = budgetCtrl.addItem(input.type, input.description, input.value);
  
      UICtrl.addListItem(newItem, input.type);
      UICtrl.clearFields();
  
      updateBudget();

      updatePercentages();

       
      
    }
    
  };

  var ctrlDelItem = function(event) {
    var itemId, splitID, type, ID;

    itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemId) {
      splitID = itemId.split('-');
      type = splitID[0];
      ID = parseInt(splitID[1]);

      budgetCtrl.deleteItem(type, ID);

      UICtrl.deleteListItem(itemId)

      updateBudget()

      updatePercentages();

    }

  };

  return {
    init: function() {
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      eventListeners();
    }
  }
  
})(budgetController, UIController);

controller.init();