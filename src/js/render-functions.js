import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
let lightbox = null;
const gallery = document.querySelector('.gallery');

export function createGallery(images) {
  const galleryMarkup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img
            class="gallery-image"
            src="${webformatURL}"
            data-source="${largeImageURL}"
            alt="${tags}"
          />
          <ul class='metadata'>
                <li>
                    <p class='metadata-heading'>Likes</p>
                    <p>${likes}</p>
                </li>
                <li>
                    <p class='metadata-heading'>Views</p>
                    <p>${views}</p>
                </li>
                <li>
                    <p class='metadata-heading'>Comments</p>
                    <p>${comments}</p>
                </li>
                <li>
                    <p metadata-heading>Downloads</p>
                    <p>${downloads}</p>
                </li>
            </ul>
        </a>
        
      </li>
      `;
      }
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', galleryMarkup);
  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery a', {
      captions: true,
      captionsData: 'alt',
      captionDelay: 250,
    });
  }
}
