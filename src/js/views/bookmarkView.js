import View from './view';
import icons from '../../img/icons.svg';

class bookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet!';
  _message = 'Start by searching for a recipe or an ingredient. Have fun!';

  _generateMarkup() {
    return this._data.map(this._generateSearchResultOptions).join('');
  }
  addHandlerRenderBookmark(handler) {
    window.addEventListener('load', function () {
      handler();
    });
  }
  _generateSearchResultOptions(result) {
    const id = window.location.hash.slice(1);
    return `
    <li class="preview">
    <a class="preview__link ${
      result.id === id ? 'preview__link--active' : ''
    }" href="#${result.id}">
      <figure class="preview__fig">
        <img src="${result.image}" alt="${result.title}" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${result.title}</h4>
        <p class="preview__publisher">${result.publisher}</p>
        <div class="preview__user-generated ${result.key ? '' : 'hidden'}">
          <svg>
          <use href="${icons}#icon-user"></use>
          </svg>
        </div>
      </div>
    </a>
  </li>
        `;
  }
}
export default new bookmarkView();
