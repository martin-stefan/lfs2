import { elements } from './base';

export const getInput = () => elements.searchInput.value;
export const clearInput = () => {
  elements.searchInput.value = '';
};

export const clearResults = () => {
  elements.searchResList.innerHTML = '';
  elements.searchResPages.innerHTML = '';
};

export const highlightSelected = id => {
  const resultsArr = Array.from(document.querySelectorAll('.results__link'));
  resultsArr.forEach(el => {
    el.classList.remove('results__link--active');
  });
  document.querySelector(`.results__link[href*="#${id}"]`).classList.add('results__link--active');
};

export const limitTitle = (title, limit = 17) => {
  if (title.length > limit) {
    const newTitle = []
    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      if (cur.length > limit) {
        newTitle.push(cur.slice(0,17))
      }
      return acc + cur.length
    }, 0);

    return `${newTitle.join(' ')}...`
  }
  return title;
};

const renderRecipe = recipe => {
  const markup = `
    <li>
      <a class="results__link" href="#${recipe.recipe_id}">
          <figure class="results__fig">
              <img src="${recipe.image_url}" alt="${recipe.title}">
          </figure>
          <div class="results__data">
              <h4 class="results__name">${limitTitle(recipe.title)}</h4>
              <p class="results__author">${recipe.publisher}</p>
          </div>
      </a>
    </li>
  `;
  elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1: page + 1}>
      <span>Page ${type === 'prev' ? page - 1: page + 1}</span>
      <svg class="search__icon">
          <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left': 'right'}"></use>
      </svg>
    </button>
  `;


const renderButtons = (page, numRes, perPage) => {
  const pages = Math.ceil(numRes / perPage);

  let button;
  if (page === 1 && pages > 1) {
    button = createButton(page, 'next');

  } else if (page < pages) {
    button = `
      ${createButton(page, 'next')}
      ${createButton(page, 'prev')}
    `;

  } else if (page === pages && pages > 1) {
    button = createButton(page, 'prev');
  }

  elements.searchResPages.insertAdjacentHTML('afterBegin', button);
}

export const renderResults = (recipes, page = 1, perPage = 10) => {
  const start = (page - 1) * perPage;
  const end = page * perPage;
  recipes.slice(start, end).forEach(renderRecipe); //automatically passes in current index
  renderButtons(page, recipes.length, perPage);
};