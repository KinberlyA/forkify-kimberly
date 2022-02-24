import View from './view';
import icons from '../../img/icons.svg';

class pageView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = Number(btn.dataset.goto);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPageNum
    );
    //page 1, there are other pages
    if (currPage === 1 && numPages > 1)
      return `
    <button data-goto=${currPage + 1} class="btn--inline pagination__btn--next">
      <span>${currPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;

    //page 1, no more results
    if (numPages === 1) return '';
    //last page
    if (numPages === currPage)
      return `
    <button  data-goto=${
      currPage - 1
    } class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>${currPage - 1}</span>
    </button>`;
    //other page
    if (currPage !== 1 && numPages > 1)
      return `
    <button data-goto=${currPage - 1} class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>${currPage - 1}</span>
    </button>
    <button data-goto=${currPage + 1} class="btn--inline pagination__btn--next">
      <span>${currPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
    `;
  }
  addHandlerPage(func) {
    document.querySelector('button').addEventListener('click', function () {});
    this._parentElement.target.closest('.btn--inline');
    func();
  }
}
export default new pageView();
