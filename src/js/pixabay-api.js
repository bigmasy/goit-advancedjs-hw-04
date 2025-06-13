import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { createGallery } from './render-functions.js';
import axios from 'axios';

const refs = {
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  loadMoreBtn: document.querySelector('.btn-load-more'),
};

const queryParams = {
  key: '50817296-2eab3913ceee07bc816ca0d08',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 15,
  page: 1,
};

export function onFormSubmit(e) {
  e.preventDefault();
  queryParams.page = 1;

  refs.gallery.innerHTML = '';
  const searchedQuery = e.target.elements.user_query.value.trim();
  if (searchedQuery === '') {
    iziToast.warning({
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }
  queryParams.q = searchedQuery;

  loadImages(queryParams);
}

async function loadImages(queryParams) {
  refs.loadMoreBtn.classList.remove('js-btn-load-more');
  refs.loader.classList.add('js-loader');
  axios.defaults.baseURL = 'https://pixabay.com';

  try {
    const { data } = await axios.get('/api/', { params: queryParams });

    if (data.total === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });

      return;
    }
    createGallery(data.hits);
    if (data.totalHits / queryParams.page < queryParams.per_page) {
      iziToast.warning({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      refs.loadMoreBtn.classList.add('js-btn-load-more');
    }
  } catch (error) {
    iziToast.error({
      message: `An error occurred: ${error.message}`,
      position: 'topRight',
    });
  } finally {
    refs.loader.classList.remove('js-loader');
  }
}

export async function loadMoreImages() {
  queryParams.page += 1;
  let image = document.querySelector('.gallery-item');
  let rect = image.getBoundingClientRect();
  await loadImages(queryParams);
  window.scrollBy({
    top: rect.height * 2,
    behavior: 'smooth',
  });
}
