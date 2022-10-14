// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

console.log(galleryItems);
const galleryBox = document.querySelector('.gallery');

const liGaleryArray = [];

galleryItems.map(imgObjekt => {
  const linkGaleryItem = document.createElement('a');
  const imgGaleryItem = document.createElement('img');
  linkGaleryItem.classList.add('gallery__item');
  linkGaleryItem.href = imgObjekt.original;
  imgGaleryItem.src = imgObjekt.preview;
  imgGaleryItem.alt = imgObjekt.description;
  imgGaleryItem.classList.add('gallery__image');
  linkGaleryItem.append(imgGaleryItem);

  liGaleryArray.push(linkGaleryItem);
});

galleryBox.append(...liGaleryArray);

galleryBox.addEventListener('click', etven => {
  etven.preventDefault();
  new SimpleLightbox('.gallery a ', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
    captionSelector: 'img',
    captionType: 'attr',
    captionPosition: 'bottom',
    captionClass: '',
  });
});
