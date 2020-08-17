// Global app controller

import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, loader, clearLoader } from './views/base';



const state = {};

const controlSearch = async () => {
  const query = searchView.getInput();

  if (query) {
    state.search = new Search(query);
    searchView.clearInput();
    searchView.clearResults();
    loader(elements.searchResults);

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
      console.log(state.recipe);

    } catch (error) {
      alert('no recipe for you');
    }
  }
}

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));