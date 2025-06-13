import { onFormSubmit } from './js/pixabay-api.js';
import { loadMoreImages } from './js/pixabay-api.js';

const refs = {
  form: document.querySelector('.form'),
  loadMore: document.querySelector('.btn-load-more'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMore.addEventListener('click', loadMoreImages);
