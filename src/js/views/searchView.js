import View from './view';
class searchView extends View {
  _parentElement = document.querySelector('.search');
  _errorMessage = 'No results for that search. Please try again!';
  _message = 'Start by searching for a recipe or an ingredient. Have fun!';

  _clearSearch() {
    this._parentElement.querySelector('.search__field').value = '';
  }
  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearSearch();
    return query;
  }
  addHandlerSearch(func) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      func();
    });
  }
}
export default new searchView();
