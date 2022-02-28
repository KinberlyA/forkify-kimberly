import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import pageView from './views/pageView.js';
import newRecipeView from './views/newRecipeView.js';

import resultsView from './views/resultsView.js';
import bookmarkView from './views/bookmarkView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import View from './views/view.js';
const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();
    //0) keep the result you selected with orange hue over the row of results
    resultsView.update(model.getSearchResultsPage());
    bookmarkView.update(model.state.bookmarks);

    //1) GRAB DATA
    await model.loadRecipe(id);

    //2) RENDER DATA
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.log(err);
  }
};

const controlSearchResults = async function () {
  try {
    //get user's input data
    const query = searchView.getQuery();
    if (!query) return;
    //spinner is loading while we wait for API data from search
    resultsView.renderSpinner();

    //wait for API data from search
    await model.loadSearchResults(query);
    //after getting data, we display results in RESULTSVIEW and calculate WHAT results to put into VIEW with GETSEARCHRESULTSPAGE
    resultsView.render(model.getSearchResultsPage());
    //allow user to go to next or previous page using state{} data
    pageView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPagination = function (goToPage) {
  //we display MORE results in RESULTSVIEW and calculate WHAT results to put into VIEW with GETSEARCHRESULTSPAGE
  resultsView.render(model.getSearchResultsPage(goToPage));
  //allow user to go to next or previous page using state.search.results data
  pageView.render(model.state.search);
};
const controlServings = function (newServings) {
  //update the recipe servings in the state
  model.updateServings(newServings);
  //update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};
const controlAddBookmark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  //3) Render bookmarks
  bookmarkView.render(model.state.bookmarks);
};
const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};
const controlNewRecipe = async function (newRecipe) {
  try {
    newRecipeView.renderSpinner();
    //retrieve DATA
    await model.uploadRecipe(newRecipe);
    //RENDER NEW RECIPE VIEW
    recipeView.render(model.state.recipe);
    console.log(model.state.recipe);
    bookmarkView.render(model.state.bookmarks);
    //SUCCESS MESSAGE
    newRecipeView.renderMessage();
    //change ID IN URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    //close form window
    setTimeout(function () {
      newRecipeView.removeWindow();
    }, 1000);
  } catch (err) {
    console.log(err);
    newRecipeView.renderError(err.message);
  }
};
const init = function () {
  bookmarkView.addHandlerRenderBookmark(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookMark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  pageView.addHandlerClick(controlPagination);
  newRecipeView.addHandlerUpload(controlNewRecipe);
};
init();
