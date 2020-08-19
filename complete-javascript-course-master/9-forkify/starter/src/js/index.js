// Global app controller

import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import { elements, renderLoader, clearLoader } from './views/base';



const state = {};

const controlSearch = async () => {
  const query = searchView.getInput();

  if (query) {
    state.search = new Search(query);
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchResults);

    try {
      await state.search.getResults();
      clearLoader();
      searchView.renderResults(state.search.result);

    } catch (err) {
      alert('no no') 
      clearLoader();
    }

  }

}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});


elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  
  if (btn) {
    const goPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goPage);
  }
});

// Recipe controller

const controlRecipe = async () => {
  // gets id from url
  const id = window.location.hash.replace('#', '');

  if (id) {
    //  prepare ui for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe)

    if (state.search) {
      searchView.highlightSelected(id);
    }
    // create recipe object
    state.recipe = new Recipe(id);

    try {
      // get recipe data and parse
      await state.recipe.getRecipe();
      state.recipe.parseIng();
  
      // calc servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();
  
      // render recipe
    
      clearLoader();
      recipeView.renderRecipe(state.recipe);

    } catch (error) {
      alert('no recipe for you');
    }
  }
}

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


// list controller

const controlList = () => {
  if (!state.list) {
    state.list = new List();
  }

  state.recipe.ing.forEach(el => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    
    listView.renderItem(item);
  });
  
}

// deleting and updating list
elements.shopping.addEventListener('click', e => {
  const id = e.target.closest('.shopping__item').dataset.itemid;


  // handle delete
  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    // delete from state and UI
    state.list.deleteItem(id);
    listView.deleteItem(id);

  } else if (e.target.matches('.shopping__count--values')) {
    const val = parseFlaot(e.target.value, 10);
    state.list.updateCount(id, val);
  }
});

// Like controller

const controlLike = () => {
  if (!state.likes) state.likes = new Likes();
  const currentId = state.recipe.id;


  if (!state.likes.isLiked(currentId)) {
    // add like to state
    const newLike = state.likes.addLike(
      currentId,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    );


    // toggle like button

    // add like to ui list
    console.log(state.likes);
  } else {
    state.likes.deleteLike(currentId);
    console.log(state.likes);
    //  remove toggle and remove

  }
}


// handling recipe button clicks
elements.recipe.addEventListener('click', e => {
  if (e.target.matches('.btn-decrease, .btn-decrease *')) { //click on button or any child of that button
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.updateServingsIng(state.recipe);
    }
  } else if (e.target.matches('.btn-increase, .btn-increase *')) { 
    state.recipe.updateServings('inc');
    recipeView.updateServingsIng(state.recipe);
  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    // add ingredients to shoping list
    controlList();
  } else if (e.target.matches('.recipe__love, .recipe__love *')) {
    // like controller
    controlLike();
  }

});

