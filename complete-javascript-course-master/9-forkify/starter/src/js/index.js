// Global app controller

import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';



const state = {};

const controlSearch = async () => {
  const query = searchView.getInput();

  if (query) {
    state.search = new Search(query);

    
    await state.search.getResults();

    console.log('here ----> ' + state.search.results);
    searchView.renderResults(state.search.results);
  }
}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});
