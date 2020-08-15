// Global app controller

import Search from './models/Search';
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
    await state.search.getResults();
    clearLoader();
    searchView.renderResults(state.search.result);

  }

}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});
